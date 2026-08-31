import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const checker = fileURLToPath(
  new URL("../scripts/check-confidentiality.mjs", import.meta.url),
);

test("limits the Rust allowlist to SDK docs without weakening other terms", async () => {
  const backendLeak = await runChecker({
    "index.mdx": "Our backend uses Rust.\n",
  });
  assert.notEqual(backendLeak.status, 0);
  assert.match(backendLeak.stderr, /index\.mdx:1 Rust/);

  const sdkPage = await runChecker({
    "developer-tools/sdks/rust.mdx": "Use the Rust SDK.\n",
  });
  assert.equal(sdkPage.status, 0, sdkPage.stderr);

  const cliLeak = await runChecker({
    "developer-tools/cli.mdx": "The CLI backend uses Rust.\n",
  });
  assert.notEqual(cliLeak.status, 0);
  assert.match(cliLeak.stderr, /developer-tools\/cli\.mdx:1 Rust/);

  const sdkInfrastructureLeak = await runChecker({
    "developer-tools/sdks/rust.mdx": "The SDK runs on Cloudflare.\n",
  });
  assert.notEqual(sdkInfrastructureLeak.status, 0);
  assert.match(sdkInfrastructureLeak.stderr, /Cloudflare/);
});

test("allows only the Rust SDK navigation path in docs.json", async () => {
  const sdkNavigation = await runChecker({
    "docs.json": '{"pages":["developer-tools/sdks/rust"]}\n',
  });
  assert.equal(sdkNavigation.status, 0, sdkNavigation.stderr);

  const configLeak = await runChecker({
    "docs.json": '{"description":"Our backend uses Rust."}\n',
  });
  assert.notEqual(configLeak.status, 0);
  assert.match(configLeak.stderr, /docs\.json:1 Rust/);
});

async function runChecker(files) {
  const fixtureRoot = await mkdtemp(
    join(tmpdir(), "sendmux-confidentiality-check-"),
  );

  try {
    for (const [relativePath, contents] of Object.entries(files)) {
      const file = join(fixtureRoot, relativePath);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, contents);
    }

    return spawnSync(process.execPath, [checker], {
      cwd: fixtureRoot,
      encoding: "utf8",
    });
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
}
