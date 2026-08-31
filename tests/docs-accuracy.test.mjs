import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readDocsFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("documents every supported CLI release archive", async () => {
  const cli = await readDocsFile("developer-tools/cli.mdx");

  assert.match(cli, /https:\/\/github\.com\/Sendmux\/sendmux-sdk\/releases/);
  for (const platform of [
    "linux-x64",
    "linux-arm64",
    "darwin-x64",
    "darwin-arm64",
    "win32-x64",
  ]) {
    assert.ok(cli.includes("`" + platform + "`"), platform);
  }
});

test("links service status from each relevant troubleshooting page", async () => {
  for (const path of [
    "monitoring/dashboard-logs.mdx",
    "monitoring/deliverability.mdx",
    "api/errors.mdx",
  ]) {
    const page = await readDocsFile(path);
    assert.match(
      page,
      /<Card title="Service status" icon="chart-line" href="https:\/\/status\.sendmux\.ai">/,
      path,
    );
  }
});
