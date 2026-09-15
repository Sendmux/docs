import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { changedRenderedFields, checkContract, renderSnippet } from "../scripts/check-mcp-docs-contract.mjs";

const candidate = process.env.SENDMUX_SDK_CHECKOUT;
if (!candidate) throw new Error("SENDMUX_SDK_CHECKOUT must name the pinned SDK checkout used by fixture tests");
const checker = resolve("scripts/check-mcp-docs-contract.mjs");
const owned = ["scripts/check-mcp.mjs", "packages/python/mcp/pyproject.toml", "packages/python/mcp/server.json", "packages/python/mcp/sendmux_mcp/mcp-contract.json"];
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

function commit(root, message) {
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["-c", "user.name=Test", "-c", "user.email=test@example.com", "commit", "-qm", message], { cwd: root });
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
}

function fixture(t, label) {
  const root = mkdtempSync(join(tmpdir(), `mcp-docs-contract-${label}-`));
  process.stderr.write(`# fixture-owned ${label} ${root}\n`);
  t.after(() => { rmSync(root, { recursive: true, force: true }); assert.equal(existsSync(root), false, `fixture absent: ${label}`); });
  for (const path of owned) { mkdirSync(dirname(join(root, path)), { recursive: true }); cpSync(join(candidate, path), join(root, path)); }
  execFileSync("git", ["init", "-q"], { cwd: root });
  return { root, pin: commit(root, "fixture") };
}

function docsFixture(t, label, pin, snippet) {
  const root = mkdtempSync(join(tmpdir(), `mcp-docs-cli-${label}-`));
  process.stderr.write(`# fixture-owned cli-${label} ${root}\n`);
  t.after(() => { rmSync(root, { recursive: true, force: true }); assert.equal(existsSync(root), false, `CLI fixture absent: ${label}`); });
  mkdirSync(join(root, "scripts"), { recursive: true }); mkdirSync(join(root, "snippets"), { recursive: true });
  writeJson(join(root, "scripts/mcp-docs-sdk.json"), { commit: pin }); writeFileSync(join(root, "snippets/mcp-release-facts.mdx"), snippet);
  return root;
}

const runCli = (cwd, sdkDir, mode) => spawnSync(process.execPath, [checker, mode, "--sdk", sdkDir], { cwd, encoding: "utf8" });

function coherentVersionChange(root) {
  const contractPath = join(root, owned[3]); const contract = readJson(contractPath);
  const parts = contract.package.version.split(".").map(Number); parts[2] += 1; contract.package.version = parts.join("."); writeJson(contractPath, contract);
  const pyproject = join(root, owned[1]); writeFileSync(pyproject, readFileSync(pyproject, "utf8").replace(/version = "[^"]+"/, `version = "${contract.package.version}"`));
  const registryPath = join(root, owned[2]); const registry = readJson(registryPath); registry.version = contract.package.version; registry.packages.find((entry) => entry.identifier === contract.package.identity).version = contract.package.version; writeJson(registryPath, registry);
  return contract;
}

test("public CLI enforces config pin and fixed snippet path", async (t) => {
  const sdk = fixture(t, "cli-pin"); const baseline = renderSnippet((await checkContract({ sdkDir: sdk.root, pin: sdk.pin })).projection); const docs = docsFixture(t, "pin", sdk.pin, baseline);
  assert.equal(runCli(docs, sdk.root, "--check").status, 0);
  assert.notEqual(spawnSync(process.execPath, [checker, "--check", "--sdk", sdk.root, "--pin", sdk.pin], { cwd: docs }).status, 0);
  writeJson(join(docs, "scripts/mcp-docs-sdk.json"), { commit: "main" }); assert.match(runCli(docs, sdk.root, "--check").stderr, /40-character/);
  writeJson(join(docs, "scripts/mcp-docs-sdk.json"), {}); assert.match(runCli(docs, sdk.root, "--check").stderr, /40-character/);
});

test("trust boundary rejects malformed, wrong-head, missing-input, changed-blob, and jointly changed inputs", async (t) => {
  const sdk = fixture(t, "trust"); await assert.rejects(checkContract({ sdkDir: sdk.root, pin: "main" }), /40-character/); await assert.rejects(checkContract({ sdkDir: sdk.root, pin: "0".repeat(40) }), /resolves to/);
  const missing = fixture(t, "missing"); rmSync(join(missing.root, owned[3])); await assert.rejects(checkContract({ sdkDir: missing.root, pin: missing.pin }), /ENOENT|no such file/i);
  const changed = fixture(t, "changed"); writeFileSync(join(changed.root, owned[3]), `${readFileSync(join(changed.root, owned[3]), "utf8")}\n`); await assert.rejects(checkContract({ sdkDir: changed.root, pin: changed.pin }), /differs from pinned Git blob/);
  const joint = fixture(t, "mutant-no-git-blob-check"); coherentVersionChange(joint.root); assert.equal(readJson(join(joint.root, owned[3])).package.version, readJson(join(joint.root, owned[2])).version, "RED mutant/no-git-blob-check accepts coherent uncommitted inputs"); await assert.rejects(checkContract({ sdkDir: joint.root, pin: joint.pin }), /differs from pinned Git blob/, "GREEN Git-blob check rejects mutant fixture");
});

test("private and unrelated committed changes do not affect projection", async (t) => {
  const sdk = fixture(t, "privacy"); const baseline = renderSnippet((await checkContract({ sdkDir: sdk.root, pin: sdk.pin })).projection);
  const contractPath = join(sdk.root, owned[3]); const contract = readJson(contractPath); contract.provenance = { marker: "PRIVATE_PROVENANCE_MARKER" }; contract.unrelated_fixture = "UNRELATED_SCHEMA_MARKER"; writeJson(contractPath, contract);
  const registryPath = join(sdk.root, owned[2]); const registry = readJson(registryPath); registry.websiteUrl = "https://REGISTRY-MARKER.invalid"; writeJson(registryPath, registry);
  const pin = commit(sdk.root, "private markers"); assert.equal(renderSnippet((await checkContract({ sdkDir: sdk.root, pin })).projection), baseline);
});

test("field-specific drift reports version, protocol sets, and count independently", async (t) => {
  for (const field of ["package.version", "protocols", "runtime_protocols", "tools.count"]) {
    const sdk = fixture(t, field.replaceAll(".", "-")); const before = await checkContract({ sdkDir: sdk.root, pin: sdk.pin }); const oldSnippet = renderSnippet(before.projection); let contract = readJson(join(sdk.root, owned[3]));
    if (field === "package.version") contract = coherentVersionChange(sdk.root);
    const next = new Date(`${contract.runtime_protocols.at(-1)}T00:00:00Z`); next.setUTCDate(next.getUTCDate() + 1); const date = next.toISOString().slice(0, 10);
    if (field === "protocols") { contract.protocols.push(date); contract.runtime_protocols.push(date); }
    if (field === "runtime_protocols") contract.runtime_protocols.push(date);
    if (field === "tools.count") { contract.tools.by_surface.mailbox.push({ ...structuredClone(contract.tools.by_surface.mailbox[0]), name: "fixture_future_tool" }); contract.tools.count += 1; }
    writeJson(join(sdk.root, owned[3]), contract); const pin = commit(sdk.root, field); const current = renderSnippet((await checkContract({ sdkDir: sdk.root, pin })).projection); const expected = field === "protocols" ? ["protocols", "runtime_protocols"] : [field]; assert.deepEqual(changedRenderedFields(oldSnippet, current), expected);
    const docs = docsFixture(t, `drift-${field.replaceAll(".", "-")}`, pin, oldSnippet); const run = runCli(docs, sdk.root, "--check"); assert.notEqual(run.status, 0); assert.match(run.stderr, new RegExp(`changed fields: ${expected.join(", ")}$`, "m"));
  }
});

test("validates protocol dates, subsets, and tool count", async (t) => {
  for (const [label, mutate, error] of [["empty", (c) => { c.protocols = []; }, /non-empty/], ["duplicate", (c) => { c.runtime_protocols.push(c.runtime_protocols[0]); }, /unique/], ["invalid-date", (c) => { c.protocols[0] = "2027-02-30"; }, /real ISO dates/], ["subset", (c) => { c.protocols = ["2099-01-01"]; }, /accepted at runtime/], ["count", (c) => { c.tools.count += 1; }, /must equal/]]) {
    const sdk = fixture(t, label); const path = join(sdk.root, owned[3]); const contract = readJson(path); mutate(contract); writeJson(path, contract); const pin = commit(sdk.root, label); await assert.rejects(checkContract({ sdkDir: sdk.root, pin }), error);
  }
});
