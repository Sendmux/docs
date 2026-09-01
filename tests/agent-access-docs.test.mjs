import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function activeMdxFiles(directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;

    const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) {
      files.push(...(await activeMdxFiles(entryUrl)));
    } else if (entry.name.endsWith(".mdx") && entry.name !== "changelog.mdx") {
      files.push(entryUrl);
    }
  }

  return files;
}

test("active docs do not teach the retired agent registration ceremony", async () => {
  const staleTerms = /proof[-_ ]of[-_ ]work|claim_token|claim token|identity_assertion|identity assertion|pre-claim|pre claim/i;
  const staleFiles = [];

  for (const file of await activeMdxFiles()) {
    const content = await readFile(file, "utf8");
    if (staleTerms.test(content)) staleFiles.push(path.relative(new URL("../", import.meta.url).pathname, file.pathname));
  }

  assert.deepEqual(staleFiles, []);
});

test("agent access leads with durable reads and owner-approved sending", async () => {
  const guide = await readFile(new URL("../ai-integrations/agent-access.mdx", import.meta.url), "utf8");

  assert.match(guide, /sendmux agent:register <profile>/);
  assert.match(guide, /sendmux agent:invite-owner owner@example\.com --profile <profile>/);
  assert.match(guide, /durable read token/i);
  assert.match(guide, /does not expire/i);
  assert.match(guide, /owner must accept.*explicitly approve sending/is);
  assert.match(guide, /expires_in["'`: ]+3600/i);
  assert.match(guide, /untrusted content/i);
});

test("agent workflow docs explain the storage transition", async () => {
  const files = [
    "ai-integrations/agent-access.mdx",
    "ai-integrations/agent-skills.mdx",
    "developer-tools/cli.mdx",
  ];

  for (const file of files) {
    const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(content, /500 MiB/, `${file} must state the pre-owner storage cap`);
    assert.match(content, /at least 5 GiB/, `${file} must state the owner-approved storage floor`);
  }

  const guide = await readFile(new URL("../ai-integrations/agent-access.mdx", import.meta.url), "utf8");
  assert.match(guide, /revoking sending.*does not (?:reduce|shrink).*storage/is);
});
