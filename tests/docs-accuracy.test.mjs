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

test("documents the Rust SDK as one crate with three API modules", async () => {
  const [rust, index, versioning, docsConfig] = await Promise.all([
    readDocsFile("developer-tools/sdks/rust.mdx"),
    readDocsFile("developer-tools/sdks/index.mdx"),
    readDocsFile("developer-tools/sdks/versioning-support.mdx"),
    readDocsFile("docs.json").then(JSON.parse),
  ]);

  assert.match(rust, /title: "Rust SDK"/);
  assert.match(rust, /cargo add sendmux/);
  assert.match(rust, /Rust 1\.82 or newer/);
  assert.match(rust, /sendmux::sending/);
  assert.match(rust, /sendmux::mailbox/);
  assert.match(rust, /sendmux::management/);
  assert.match(rust, /Sending has typed request and response models/);
  assert.match(
    rust,
    /Mailbox and Management expose typed surface clients with raw JSON helpers/,
  );
  assert.match(rust, /EmailSendRequest::new/);
  assert.match(rust, /response\.request_id\(\)/);
  assert.match(rust, /sendmux::Error::Api/);
  assert.match(rust, /error\.request_id/);

  assert.match(index, /"Rust"/);
  assert.match(
    index,
    /\| Rust \| `sendmux` \| `sending`, `mailbox`, and `management` modules inside the `sendmux` crate \|/,
  );
  assert.match(
    versioning,
    /Rust crate is pre-1\.0 on `0\.x` and can introduce breaking changes between minor versions/,
  );

  const sdkGroup = docsConfig.navigation.tabs
    .find(({ tab }) => tab === "Guides")
    .groups.find(({ group }) => group === "Developer tools")
    .pages.find(({ group }) => group === "SDKs");
  assert.deepEqual(sdkGroup.pages.slice(-3), [
    "developer-tools/sdks/ruby",
    "developer-tools/sdks/rust",
    "developer-tools/sdks/versioning-support",
  ]);
});
