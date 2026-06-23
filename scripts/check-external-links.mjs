import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const findings = [];

for await (const file of mdxFiles(root)) {
  const relativePath = path.relative(root, file);
  const lines = (await readFile(file, "utf8")).split(/\r?\n/);
  const searchableLines = [];
  let isFence = false;

  for (const [index, line] of lines.entries()) {
    const lineNumber = index + 1;

    if (/^\s*```/.test(line)) {
      isFence = !isFence;
      searchableLines.push("");
      continue;
    }
    if (isFence) {
      searchableLines.push("");
      continue;
    }

    searchableLines.push(line);
    checkMarkdownLinks({ line, lineNumber, relativePath });
    checkReferenceDefinitions({ line, lineNumber, relativePath });
  }

  checkHtmlAnchors({ content: searchableLines.join("\n"), relativePath });
}

if (findings.length > 0) {
  console.error("External link check failed. Non-Sendmux links must be SEO-safe nofollow links:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} ${finding.message}`);
  }
  console.error(
    '\nUse explicit MDX HTML: <a href="https://example.com" rel="nofollow noopener noreferrer" target="_blank">label</a>.'
  );
  process.exit(1);
}

console.log(
  "External link check passed. Non-Sendmux authored MDX links are nofollow, noopener, noreferrer, and open in a new tab."
);

async function* mdxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (![".git", ".github", ".claude", "drafts", "images", "logo", "node_modules"].includes(entry.name)) {
        yield* mdxFiles(fullPath);
      }
      continue;
    }
    if (entry.name.endsWith(".mdx")) {
      yield fullPath;
    }
  }
}

function checkMarkdownLinks({ line, lineNumber, relativePath }) {
  const linkPattern = /!?\[[^\]]*]\((https?:\/\/[^)\s]+)(?:\s+["'][^)]*["'])?\)/g;
  for (const match of line.matchAll(linkPattern)) {
    const href = match[1];
    if (!isSendmuxUrl(href)) {
      findings.push({
        file: relativePath,
        line: lineNumber,
        message: `external Markdown link cannot set rel: ${href}`,
      });
    }
  }
}

function checkReferenceDefinitions({ line, lineNumber, relativePath }) {
  const match = line.match(/^\s*\[[^\]]+]:\s+(https?:\/\/\S+)/);
  if (!match) {
    return;
  }
  const href = match[1];
  if (!isSendmuxUrl(href)) {
    findings.push({
      file: relativePath,
      line: lineNumber,
      message: `external reference link cannot set rel: ${href}`,
    });
  }
}

function checkHtmlAnchors({ content, relativePath }) {
  const anchorPattern = /<a\b[\s\S]*?href=["'](https?:\/\/[^"']+)["'][\s\S]*?>/gi;
  for (const match of content.matchAll(anchorPattern)) {
    const tag = match[0];
    const href = match[1];
    const lineNumber = lineNumberForOffset(content, match.index ?? 0);
    if (isSendmuxUrl(href)) {
      continue;
    }

    const rel = tag.match(/\brel=["']([^"']*)["']/i)?.[1] ?? "";
    const target = tag.match(/\btarget=["']([^"']*)["']/i)?.[1] ?? "";
    const relValues = new Set(rel.split(/\s+/).filter(Boolean));
    const missingRel = ["nofollow", "noopener", "noreferrer"].filter((value) => !relValues.has(value));

    if (target !== "_blank" || missingRel.length > 0) {
      const reasons = [];
      if (target !== "_blank") {
        reasons.push('missing target="_blank"');
      }
      if (missingRel.length > 0) {
        reasons.push(`missing rel value(s): ${missingRel.join(", ")}`);
      }
      findings.push({
        file: relativePath,
        line: lineNumber,
        message: `${reasons.join("; ")} for ${href}`,
      });
    }
  }
}

function lineNumberForOffset(content, offset) {
  return content.slice(0, offset).split("\n").length;
}

function isSendmuxUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  return url.hostname === "sendmux.ai" || url.hostname.endsWith(".sendmux.ai");
}
