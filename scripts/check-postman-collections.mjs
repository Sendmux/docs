#!/usr/bin/env node

// Drift gate: regenerates the Postman collections into a temp dir from the
// committed OpenAPI specs and fails if they differ from the committed snapshots
// under postman/. Run in CI (push + pull_request) so the published collections
// can never drift from openapi-app.json / openapi-sending.json.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const snapshotDir = resolve(args.snapshotDir ?? join(repoRoot, "postman"));
const tempDir = mkTempDir();
const generatedDir = join(tempDir, "postman");

try {
  execFileSync("node", ["scripts/emit-postman-collections.mjs", "--output-dir", generatedDir], {
    cwd: repoRoot,
    stdio: "inherit",
  });

  const generatedFiles = listCollectionFiles(generatedDir);
  const snapshotFiles = listCollectionFiles(snapshotDir);

  if (generatedFiles.join("\n") !== snapshotFiles.join("\n")) {
    throw new Error(
      [
        "Postman collection file set drift detected.",
        `Generated files: ${generatedFiles.join(", ") || "(none)"}`,
        `Snapshot files:  ${snapshotFiles.join(", ") || "(none)"}`,
        "Run npm run postman:emit, commit the updated postman/ files, then rerun npm run postman:check.",
      ].join("\n"),
    );
  }

  for (const fileName of generatedFiles) {
    const snapshotPath = join(snapshotDir, fileName);
    const generatedPath = join(generatedDir, fileName);

    assertFile(snapshotPath);
    assertFile(generatedPath);

    const canonicalSnapshot = `${stableStringify(readJson(snapshotPath))}\n`;
    const canonicalGenerated = `${stableStringify(readJson(generatedPath))}\n`;

    if (canonicalSnapshot !== canonicalGenerated) {
      const keepPath = resolve(repoRoot, ".tmp/postman", fileName);
      mkdirSync(dirname(keepPath), { recursive: true });
      writeFileSync(keepPath, canonicalGenerated);
      throw new Error(
        [
          "Postman collection drift detected.",
          `Generated: ${keepPath}`,
          `Snapshot:  ${snapshotPath}`,
          "Run npm run postman:emit, commit the updated postman/ files, then rerun npm run postman:check.",
        ].join("\n"),
      );
    }
  }

  console.log(`Postman collections match ${snapshotDir}`);
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

function mkTempDir() {
  const path = join(tmpdir(), `sendmux-postman-${process.pid}`);
  rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
  return path;
}

function assertFile(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing Postman collection snapshot: ${path}`);
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function listCollectionFiles(path) {
  return readdirSync(path)
    .filter((entry) => entry.endsWith(".postman_collection.json"))
    .sort((left, right) => left.localeCompare(right));
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === "--snapshot-dir" && value) {
      parsed.snapshotDir = value;
      index += 1;
      continue;
    }

    throw new Error("Usage: node scripts/check-postman-collections.mjs [--snapshot-dir <path>]");
  }

  return parsed;
}

function stableStringify(value) {
  return JSON.stringify(sortKeys(value), null, 2);
}

function sortKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortKeys(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, sortKeys(child)]),
  );
}
