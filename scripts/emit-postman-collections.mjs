#!/usr/bin/env node

// Generates the Sendmux Postman collections from the committed OpenAPI specs
// (openapi-app.json + openapi-sending.json). Those specs are kept in sync with
// the live Management/Mailbox API (in Sendmux/sendmux) and the live Sending API
// (in Sendmux/smtp-proxy) by each producer repo's own OpenAPI snapshot gate, so
// this repo only needs the deterministic spec -> collection transform.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Converter from "openapi-to-postmanv2";

const { convert } = Converter;

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const outputDir = resolve(args.outputDir ?? join(repoRoot, "postman"));

const conversionOptions = {
  folderStrategy: "Tags",
  requestNameSource: "Fallback",
  parametersResolution: "Example",
  includeAuthInfoInExample: true,
  alwaysInheritAuthentication: true,
  enableOptionalParameters: false,
  keepImplicitHeaders: false,
  includeDeprecated: false,
  schemaFaker: false,
};

const collectionDefinitions = [
  {
    name: "Sendmux Management API",
    fileName: "sendmux-management.postman_collection.json",
    source: "app",
    baseVariable: "management_base_url",
    defaultBaseUrl: "https://app.sendmux.ai/api/v1",
    includePath: (path) => !path.startsWith("/mailbox") && path !== "/openapi.json",
  },
  {
    name: "Sendmux Mailbox API",
    fileName: "sendmux-mailbox.postman_collection.json",
    source: "app",
    baseVariable: "mailbox_base_url",
    defaultBaseUrl: "https://app.sendmux.ai/api/v1",
    includePath: (path) => path.startsWith("/mailbox"),
  },
  {
    name: "Sendmux Sending API",
    fileName: "sendmux-sending.postman_collection.json",
    source: "sending",
    baseVariable: "sending_base_url",
    defaultBaseUrl: "https://smtp.sendmux.ai/api/v1",
    includePath: (path) => path !== "/openapi.json",
  },
];

const appSpec = readOpenApi(join(repoRoot, "openapi-app.json"));
const sendingSpec = readOpenApi(join(repoRoot, "openapi-sending.json"));

mkdirSync(outputDir, { recursive: true });

for (const definition of collectionDefinitions) {
  const source = definition.source === "app" ? appSpec : sendingSpec;
  const splitSpec = splitSpecForCollection(source, definition);
  const collection = await convertSpec(splitSpec);
  const postProcessed = postProcessCollection(collection, definition);
  const outputPath = join(outputDir, definition.fileName);

  writeFileSync(outputPath, `${stableStringify(postProcessed)}\n`);
  console.log(`Wrote ${outputPath}`);
}

function readOpenApi(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing OpenAPI source: ${path}`);
  }

  return assertOpenApi31(path, JSON.parse(readFileSync(path, "utf8")));
}

function splitSpecForCollection(source, definition) {
  const paths = Object.fromEntries(
    Object.entries(source.paths ?? {})
      .filter(([path]) => definition.includePath(path))
      .sort(([left], [right]) => left.localeCompare(right)),
  );

  if (Object.keys(paths).length === 0) {
    throw new Error(`No paths matched ${definition.name}`);
  }

  const usedTags = collectUsedTags(paths);

  return sortKeys({
    ...cloneJson(source),
    info: {
      ...(source.info ?? {}),
      title: definition.name,
    },
    servers: [{ url: `{{${definition.baseVariable}}}`, description: "Base URL" }],
    tags: source.tags?.filter((tag) => typeof tag.name === "string" && usedTags.has(tag.name)),
    paths,
  });
}

function convertSpec(spec) {
  return new Promise((resolveCollection, reject) => {
    convert({ type: "json", data: spec }, conversionOptions, (err, result) => {
      if (err) {
        reject(new Error(err.message));
        return;
      }

      if (!result?.result) {
        reject(new Error(result?.reason ?? "Postman conversion failed"));
        return;
      }

      const collection = result.output?.find((item) => item.type === "collection")?.data;

      if (!collection || typeof collection !== "object" || Array.isArray(collection)) {
        reject(new Error("Postman conversion did not return a collection object"));
        return;
      }

      resolveCollection(collection);
    });
  });
}

function postProcessCollection(collection, definition) {
  const stableResponses = normaliseResponseExamples(collection);
  const withoutIds = removeGeneratedIds(stableResponses);
  const withVariables = replaceVariableStrings(withoutIds, [
    ["{{baseUrl}}", `{{${definition.baseVariable}}}`],
    ["{{bearerToken}}", "{{sendmux_api_key}}"],
    ["Bearer <token>", "Bearer {{sendmux_api_key}}"],
  ]);
  const withStableExamples = normaliseJsonStringExamples(withVariables);

  withStableExamples.info = {
    ...asRecord(withStableExamples.info),
    name: definition.name,
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  };
  withStableExamples.auth = {
    type: "bearer",
    bearer: [{ key: "token", value: "{{sendmux_api_key}}", type: "string" }],
  };
  withStableExamples.variable = [
    { key: "sendmux_api_key", value: "", type: "string" },
    { key: definition.baseVariable, value: definition.defaultBaseUrl, type: "string" },
  ];

  assertOnlySafeVariables(withStableExamples, definition);

  return sortKeys(withStableExamples);
}

function assertOnlySafeVariables(collection, definition) {
  const variables = collectTemplateVariables(collection);
  const allowed = new Set(["sendmux_api_key", definition.baseVariable]);
  const unexpected = [...variables].filter((variable) => !allowed.has(variable)).sort();

  if (unexpected.length > 0) {
    throw new Error(`${definition.name} contains unexpected Postman variables: ${unexpected.join(", ")}`);
  }
}

function collectUsedTags(paths) {
  const tags = new Set();

  for (const pathItem of Object.values(paths)) {
    for (const operation of Object.values(pathItem)) {
      if (!operation || typeof operation !== "object" || Array.isArray(operation)) {
        continue;
      }

      const operationTags = operation.tags;
      if (!Array.isArray(operationTags)) {
        continue;
      }

      for (const tag of operationTags) {
        if (typeof tag === "string") {
          tags.add(tag);
        }
      }
    }
  }

  return tags;
}

function normaliseResponseExamples(value) {
  if (Array.isArray(value)) {
    return value.map((item) => normaliseResponseExamples(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const record = asRecord(value);

  if ("originalRequest" in record && "code" in record) {
    return normaliseResponseExamples({
      _postman_previewlanguage: record._postman_previewlanguage,
      body: "",
      code: record.code,
      cookie: record.cookie ?? [],
      header: record.header ?? [],
      name: record.name,
      status: record.status,
    });
  }

  return Object.fromEntries(Object.entries(record).map(([key, child]) => [key, normaliseResponseExamples(child)]));
}

function normaliseJsonStringExamples(value) {
  if (typeof value === "string") {
    return normaliseJsonString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normaliseJsonStringExamples(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, normaliseJsonStringExamples(child)]));
}

function normaliseJsonString(value) {
  const trimmed = value.trim();

  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) {
    return value;
  }

  try {
    return JSON.stringify(normaliseJsonExample(JSON.parse(value)), null, 2);
  } catch {
    return value;
  }
}

function normaliseJsonExample(value) {
  if (Array.isArray(value)) {
    return value.length === 0 ? [] : [normaliseJsonExample(value[0])];
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const entries = Object.entries(value);

  if (entries.length > 0 && entries.every(([key]) => /^key_\d+$/.test(key))) {
    return { key_0: normaliseJsonExample(entries[0]?.[1]) };
  }

  return Object.fromEntries(
    entries
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, normaliseJsonExample(child)]),
  );
}

function removeGeneratedIds(value) {
  if (Array.isArray(value)) {
    return value.map((item) => removeGeneratedIds(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== "id" && key !== "_postman_id")
      .map(([key, child]) => [key, removeGeneratedIds(child)]),
  );
}

function replaceVariableStrings(value, replacements) {
  if (typeof value === "string") {
    return replacements.reduce((current, [from, to]) => current.split(from).join(to), value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceVariableStrings(item, replacements));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, replaceVariableStrings(child, replacements)]),
  );
}

function collectTemplateVariables(value, variables = new Set()) {
  if (typeof value === "string") {
    for (const match of value.matchAll(/\{\{([^}]+)}}/g)) {
      variables.add(match[1]);
    }

    return variables;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectTemplateVariables(item, variables);
    }

    return variables;
  }

  if (value && typeof value === "object") {
    for (const child of Object.values(value)) {
      collectTemplateVariables(child, variables);
    }
  }

  return variables;
}

function assertOpenApi31(path, document) {
  if (document.openapi !== "3.1.0") {
    throw new Error(`${path} must be OpenAPI 3.1.0, got ${document.openapi}`);
  }

  if (!document.paths || typeof document.paths !== "object") {
    throw new Error(`${path} must include OpenAPI paths`);
  }

  return document;
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === "--output-dir" && value) {
      parsed.outputDir = value;
      index += 1;
      continue;
    }

    throw new Error("Usage: node scripts/emit-postman-collections.mjs [--output-dir <path>]");
  }

  return parsed;
}

function asRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value;
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
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
