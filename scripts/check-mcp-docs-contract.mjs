import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const owned = ["scripts/check-mcp.mjs", "packages/python/mcp/pyproject.toml", "packages/python/mcp/server.json", "packages/python/mcp/sendmux_mcp/mcp-contract.json"];

function git(sdkDir, args) {
  const result = spawnSync("git", ["-C", sdkDir, ...args], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr.trim() || `git ${args.join(" ")} failed`);
  return result.stdout;
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(`${value}T00:00:00Z`).toISOString().startsWith(value);
}

export function renderSnippet(p) {
  const transports = p.transports.map((value) => value === "streamable-http" ? "Streamable HTTP" : value).join(", ");
  return `<Info>\n  Package identity: \`${p.identity}\`\n\n  Package version: \`${p.version}\`\n\n  Hosted resource: \`${p.resource}\`\n\n  Hosted transport: ${transports}\n\n  Curated tool count: ${p.toolCount}\n\n  Certified protocol versions: ${p.protocols.map((v) => `\`${v}\``).join(", ")}\n\n  Runtime-accepted protocol versions: ${p.runtimeProtocols.map((v) => `\`${v}\``).join(", ")}. Runtime acceptance provides compatibility; it does not certify each version.\n</Info>\n`;
}

const renderedFields = [["package.identity", "Package identity:"], ["package.version", "Package version:"], ["hosted.resource", "Hosted resource:"], ["hosted.transports", "Hosted transport:"], ["tools.count", "Curated tool count:"], ["protocols", "Certified protocol versions:"], ["runtime_protocols", "Runtime-accepted protocol versions:"]];

export function changedRenderedFields(actual, expected) {
  const lineFor = (text, label) => text.split(/\r?\n/).find((line) => line.trimStart().startsWith(label));
  return renderedFields.flatMap(([field, label]) => lineFor(actual, label) === lineFor(expected, label) ? [] : [field]);
}

export async function checkContract({ sdkDir, pin }) {
  if (!/^[0-9a-f]{40}$/.test(pin)) throw new Error("SDK pin must be one complete 40-character commit ID");
  const resolved = git(sdkDir, ["rev-parse", "HEAD"]).trim();
  if (resolved !== pin) throw new Error(`SDK checkout resolves to ${resolved}, expected ${pin}`);
  for (const path of owned) {
    const disk = readFileSync(resolve(sdkDir, path));
    const blob = Buffer.from(git(sdkDir, ["show", `${pin}:${path}`]));
    if (!disk.equals(blob)) throw new Error(`${path} differs from pinned Git blob ${pin}`);
  }
  const { verifyRegistryVersion } = await import(pathToFileURL(resolve(sdkDir, "scripts/check-mcp.mjs")));
  verifyRegistryVersion(resolve(sdkDir, "packages/python/mcp"));
  const contract = JSON.parse(readFileSync(resolve(sdkDir, owned[3]), "utf8"));
  const { package: pkg, protocols, runtime_protocols: runtimeProtocols, tools, hosted, uploads } = contract;
  assert.match(pkg.identity, /\S/, "package.identity");
  assert.match(pkg.version, /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/, "package.version");
  for (const [name, values] of [["protocols", protocols], ["runtime_protocols", runtimeProtocols]]) {
    assert.ok(Array.isArray(values) && values.length > 0, `${name} must be non-empty`);
    assert.equal(new Set(values).size, values.length, `${name} must be unique`);
    assert.ok(values.every(validDate), `${name} must contain real ISO dates`);
  }
  assert.ok(protocols.every((value) => runtimeProtocols.includes(value)), "certified protocols must be accepted at runtime");
  const count = Object.values(tools.by_surface).reduce((sum, entries) => sum + entries.length, 0);
  assert.equal(tools.count, count, "tools.count must equal tools.by_surface total");
  assert.ok(Number.isInteger(tools.count) && tools.count >= 0, "tools.count must be a non-negative integer");
  assert.equal(hosted.resource, "https://mcp.sendmux.ai/mcp", "hosted.resource");
  assert.deepEqual(hosted.transports, ["streamable-http"], "hosted.transports");
  assert.ok(Number.isInteger(uploads.inline_decoded_max_bytes), "uploads.inline_decoded_max_bytes");
  assert.equal(uploads.mailbox.tool, "mailbox_upload_attachment", "uploads.mailbox.tool");
  assert.ok(uploads.mailbox.modes.includes("presign_upload_url"), "uploads.mailbox presigned mode");
  assert.equal(uploads.mailbox.presigned_max_bytes, uploads.mailbox.request_schema_max_bytes, "mailbox upload limits");
  assert.equal(uploads.sending.presigned_tool, "sending_create_attachment_upload", "uploads.sending.presigned_tool");
  assert.equal(uploads.sending.limit_authority, "upload intent response max_size_bytes", "uploads.sending.limit_authority");
  return { contract, projection: { identity: pkg.identity, version: pkg.version, protocols, runtimeProtocols, toolCount: tools.count, resource: hosted.resource, transports: hosted.transports } };
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args.includes("--write") ? "write" : args.includes("--check") ? "check" : null;
  if (!mode || args.some((arg) => ["--pin", "--snippet"].includes(arg))) throw new Error("Usage: check-mcp-docs-contract.mjs --check|--write [--sdk PATH]");
  const value = (flag) => {
    const index = args.indexOf(flag);
    return index < 0 ? undefined : args[index + 1];
  };
  const config = JSON.parse(readFileSync(resolve("scripts/mcp-docs-sdk.json"), "utf8"));
  const pin = config.commit;
  const sdkDir = value("--sdk") ?? process.env.SENDMUX_SDK_CHECKOUT;
  if (!sdkDir) throw new Error(`Missing SDK checkout for ${pin}; set SENDMUX_SDK_CHECKOUT or pass --sdk PATH`);
  const snippet = resolve("snippets/mcp-release-facts.mdx");
  const result = await checkContract({ sdkDir: resolve(sdkDir), pin });
  const rendered = renderSnippet(result.projection);
  if (mode === "write") return writeFileSync(snippet, rendered);
  const actual = readFileSync(snippet, "utf8");
  if (actual !== rendered) throw new Error(`stale snippet ${snippet}: changed fields: ${changedRenderedFields(actual, rendered).join(", ")}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
