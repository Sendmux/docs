import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const config = JSON.parse(
  readFileSync(resolve("scripts/mcp-docs-sdk.json"), "utf8"),
);

if (!/^[0-9a-f]{40}$/.test(config.commit)) {
  throw new Error("MCP SDK pin must be one complete 40-character commit ID");
}

process.stdout.write(`${config.commit}\n`);
