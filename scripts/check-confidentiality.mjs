import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const shippedFilePatterns = [
  /\.mdx$/,
  /^docs\.json$/,
  /^openapi-(app|sending)\.json$/,
  /^style\.css$/,
];

const skippedDirectories = new Set([
  ".git",
  ".github",
  ".claude",
  "drafts",
  "images",
  "logo",
  "node_modules",
  "postman",
]);

const hardForbiddenTerms = [
  { label: "Parcelvoy", pattern: wordPattern("Parcelvoy") },
  { label: "K3s", pattern: wordPattern("K3s") },
  { label: "K8s", pattern: wordPattern("K8s") },
  { label: "Kubernetes", pattern: wordPattern("Kubernetes") },
  { label: "HAProxy", pattern: wordPattern("HAProxy") },
  { label: "Hetzner", pattern: wordPattern("Hetzner") },
  { label: "Cloudflare", pattern: wordPattern("Cloudflare") },
  { label: "Cloudflare Workers", pattern: phrasePattern("Cloudflare Workers") },
  { label: "Hyperdrive", pattern: wordPattern("Hyperdrive") },
  { label: "D1", pattern: wordPattern("D1") },
  { label: "KV", pattern: wordPattern("KV") },
  { label: "R2", pattern: wordPattern("R2") },
  { label: "Cloudflare Workflows", pattern: phrasePattern("Cloudflare Workflows") },
  { label: "Durable Objects", pattern: phrasePattern("Durable Objects") },
  { label: "Cloudflare Queues", pattern: phrasePattern("Cloudflare Queues") },
  { label: "Stalwart", pattern: wordPattern("Stalwart") },
  { label: "Postmark", pattern: wordPattern("Postmark") },
  { label: "ProxySQL", pattern: wordPattern("ProxySQL") },
  { label: "Redis", pattern: wordPattern("Redis") },
  { label: "Valkey", pattern: wordPattern("Valkey") },
  { label: "Next.js", pattern: phrasePattern("Next.js") },
  { label: "OpenNext", pattern: wordPattern("OpenNext") },
  { label: "Drizzle", pattern: wordPattern("Drizzle") },
  { label: "Lucia", pattern: wordPattern("Lucia") },
  { label: "PostgreSQL", pattern: wordPattern("PostgreSQL") },
  { label: "MariaDB", pattern: wordPattern("MariaDB") },
  { label: "MySQL", pattern: wordPattern("MySQL") },
  { label: "ClickHouse", pattern: wordPattern("ClickHouse") },
  { label: "Rust", pattern: wordPattern("Rust") },
  { label: "Wrangler", pattern: wordPattern("Wrangler") },
];

const sdkAllowlistExamples = [
  "TypeScript",
  "Python",
  "Go",
  "PHP",
  "Ruby",
  "@sendmux/",
  "sendmux-",
  "sendmux.ai/go",
  "sendmux/",
  "sendmux",
  "sendmux-mcp",
];

const findings = [];

for await (const file of shippedFiles(root)) {
  const text = await readFile(file, "utf8");
  const lines = text.split(/\r?\n/);
  for (const [index, line] of lines.entries()) {
    for (const term of hardForbiddenTerms) {
      if (term.pattern.test(line)) {
        findings.push({
          file: path.relative(root, file),
          line: index + 1,
          term: term.label,
          text: line.trim(),
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Confidentiality check failed. Hard-forbidden terms found in shipped docs files:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} ${finding.term}: ${finding.text}`);
  }
  console.error(
    `\nSDK/CLI/MCP allowlist examples that do not fail this grep: ${sdkAllowlistExamples.join(", ")}.`
  );
  process.exit(1);
}

console.log(
  `Confidentiality check passed. Hard-forbidden backend/infra terms absent; SDK/CLI/MCP public names are allowlisted.`
);

async function* shippedFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(root, fullPath);
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        yield* shippedFiles(fullPath);
      }
      continue;
    }
    if (shippedFilePatterns.some((pattern) => pattern.test(relativePath))) {
      yield fullPath;
    }
  }
}

function wordPattern(term) {
  return new RegExp(`(^|[^A-Za-z0-9_])${escapeRegex(term)}($|[^A-Za-z0-9_])`, "i");
}

function phrasePattern(term) {
  return new RegExp(escapeRegex(term).replaceAll("\\ ", "\\s+"), "i");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
