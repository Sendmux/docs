#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const apiKey = process.env.POSTMAN_API_KEY?.trim();
const mappingsPath = join(repoRoot, "postman/hosted-collections.json");
const postmanDir = join(repoRoot, "postman");
const apiBaseUrl = "https://api.getpostman.com";

if (!apiKey) {
  throw new Error(
    [
      "POSTMAN_API_KEY is required for hosted Postman collection checks.",
      "Use a repo/CI secret or retrieve it locally from 1Password before running this script.",
    ].join("\n"),
  );
}

const mappings = JSON.parse(await readFile(mappingsPath, "utf8"));
const drift = [];

for (const mapping of mappings) {
  validateMapping(mapping);

  const localCollection = await readJson(join(postmanDir, mapping.fileName));

  if (args.write) {
    await updateHostedCollection(mapping, localCollection);
    console.log(`Updated hosted Postman collection: ${mapping.label}`);
    continue;
  }

  const hostedCollection = await getHostedCollection(mapping);
  const localCanonical = `${stableStringify(normaliseCollection(localCollection))}\n`;
  const hostedCanonical = `${stableStringify(normaliseCollection(hostedCollection))}\n`;

  if (localCanonical !== hostedCanonical) {
    const localKeepPath = join(repoRoot, ".tmp/postman-hosted", `${mapping.fileName}.local.normalized.json`);
    const hostedKeepPath = join(repoRoot, ".tmp/postman-hosted", `${mapping.fileName}.hosted.normalized.json`);
    await writeText(localKeepPath, localCanonical);
    await writeText(hostedKeepPath, hostedCanonical);
    drift.push({ mapping, localKeepPath, hostedKeepPath });
  }
}

if (args.write) {
  console.log("Hosted Postman collections synced from postman/*.postman_collection.json.");
} else if (drift.length > 0) {
  const messages = drift.map(({ mapping, localKeepPath, hostedKeepPath }) =>
    [
      `${mapping.label} hosted collection drift detected.`,
      `  Local:  ${localKeepPath}`,
      `  Hosted: ${hostedKeepPath}`,
    ].join("\n"),
  );
  throw new Error(
    [
      "Hosted Postman collection drift detected.",
      ...messages,
      "Run npm run postman:hosted:sync, then rerun npm run postman:hosted:check.",
    ].join("\n"),
  );
} else {
  console.log("Hosted Postman collections match postman/*.postman_collection.json.");
}

function parseArgs(argv) {
  const parsed = { write: false };

  for (const arg of argv) {
    if (arg === "--write") {
      parsed.write = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      process.stdout.write(
        [
          "Usage: node scripts/check-hosted-postman-collections.mjs [--write]",
          "",
          "Default mode checks hosted Postman collections for drift.",
          "--write updates hosted Postman collections from postman/*.postman_collection.json.",
          "",
        ].join("\n"),
      );
      process.exit(0);
    }

    throw new Error("Usage: node scripts/check-hosted-postman-collections.mjs [--write]");
  }

  return parsed;
}

function validateMapping(mapping) {
  for (const key of ["label", "fileName", "collectionUid"]) {
    if (typeof mapping[key] !== "string" || mapping[key].trim() === "") {
      throw new Error(`Invalid hosted collection mapping: missing ${key}`);
    }
  }
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function getHostedCollection(mapping) {
  const response = await postmanFetch(`/collections/${mapping.collectionUid}`);
  if (!response.collection || typeof response.collection !== "object") {
    throw new Error(`Postman API response for ${mapping.label} did not include a collection object.`);
  }
  return response.collection;
}

async function updateHostedCollection(mapping, localCollection) {
  const collection = cloneJson(localCollection);
  collection.info = {
    ...collection.info,
    _postman_id: collectionIdFromUid(mapping.collectionUid),
  };

  await postmanFetch(`/collections/${mapping.collectionUid}`, {
    method: "PUT",
    body: JSON.stringify({ collection }),
  });
}

async function postmanFetch(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
      ...(options.headers ?? {}),
    },
  });

  const body = await response.text();
  let parsed = {};
  if (body.trim()) {
    try {
      parsed = JSON.parse(body);
    } catch {
      throw new Error(`Postman API returned non-JSON ${response.status} response for ${path}: ${body.slice(0, 200)}`);
    }
  }

  if (!response.ok) {
    throw new Error(`Postman API ${response.status} for ${path}: ${JSON.stringify(parsed)}`);
  }

  return parsed;
}

function collectionIdFromUid(uid) {
  const [, ...parts] = uid.split("-");
  return parts.join("-");
}

async function writeText(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

function normaliseCollection(collection) {
  return sortKeys(normaliseValue(collection));
}

function normaliseValue(value, contextKey = "") {
  if (Array.isArray(value)) {
    return value
      .map((item) => normaliseValue(item))
      .filter((item) => item !== undefined);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if (contextKey === "description" && typeof value.content === "string") {
    return value.content;
  }

  const omitted = new Set([
    "_postman_id",
    "createdAt",
    "id",
    "isPublic",
    "lastUpdatedBy",
    "originalRequest",
    "owner",
    "responseTime",
    "uid",
    "updatedAt",
  ]);

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !omitted.has(key))
      .map(([key, child]) => {
        if (contextKey === "request" && key === "name") {
          return undefined;
        }

        if (contextKey === "url" && key === "raw" && hasStructuredUrl(value)) {
          return undefined;
        }

        if (key === "disabled" && child === false) {
          return undefined;
        }

        if (key === "type" && child === "any") {
          return undefined;
        }

        const normalised = normaliseValue(child, key);
        if (normalised === undefined) {
          return undefined;
        }

        if (key === "description" && normalised === "") {
          return undefined;
        }

        if (Array.isArray(normalised) && normalised.length === 0 && ["event", "query", "variable"].includes(key)) {
          return undefined;
        }

        return [key, normalised];
      })
      .filter(Boolean),
  );
}

function hasStructuredUrl(value) {
  return Array.isArray(value.host) || Array.isArray(value.path) || Array.isArray(value.query);
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

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}
