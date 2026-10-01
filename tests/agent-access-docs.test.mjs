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
  assert.match(guide, /revoking sending.*does not itself change.*storage allocation/is);
});

test("agent skills guide offers every installable skill from the canonical pack", async () => {
  const skillsRoot = process.env.SENDMUX_SKILLS_ROOT;
  assert.ok(skillsRoot, "SENDMUX_SKILLS_ROOT must name the approved canonical skills checkout");
  const catalog = JSON.parse(await readFile(path.join(skillsRoot, "skills.sh.json"), "utf8"));
  const names = catalog.groupings.flatMap((group) => group.skills).sort();
  const guide = await readFile(new URL("../ai-integrations/agent-skills.mdx", import.meta.url), "utf8");
  const table = guide.split("## What the pack teaches\n")[1].split("\n## ")[0];
  const documented = [...table.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1]).sort();
  assert.deepEqual(documented, names, "the guide must list every canonical skill exactly once");
  // Only executable examples; the client table also contains a skill-name placeholder.
  const examples = [...guide.matchAll(/```bash\n([\s\S]*?)```/g)].map((match) => match[1]).join("\n");
  const installs = [...examples.matchAll(/^npx skills add (\S+)(?: --skill (\S+))?$/gm)];
  for (const [, repository, skill] of installs) {
    assert.equal(repository, "Sendmux/skills", "installation must use the canonical repository");
    if (skill) assert.ok(names.includes(skill), `unknown installable skill ${skill}`);
  }
  for (const skill of ["agent-email-inbox", "email-for-ai-agents"]) {
    assert.ok(installs.some((match) => match[2] === skill), `${skill} needs a focused install command`);
  }
});
