import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

function fixture(t, label) {
  const root = mkdtempSync(join(tmpdir(), `mcp-docs-executable-${label}-`));
  process.stderr.write(`# fixture-owned executable-${label} ${root}\n`);
  t.after(() => { rmSync(root, { recursive: true, force: true }); assert.equal(existsSync(root), false, `executable fixture absent: ${label}`); });
  return root;
}

function workflowRun(name) {
  const source = readFileSync(resolve(".github/workflows/verify.yml"), "utf8");
  const match = source.match(new RegExp(`      - name: ${name}\\n(?:        [^\\n]+\\n)*?        run: \\|\\n((?:          .*(?:\\n|$))+)`));
  assert.ok(match, `workflow step exists: ${name}`);
  return match[1].replace(/^          /gm, "");
}

function bashBlockAfter(heading) {
  const source = readFileSync(resolve("sending/attachments.mdx"), "utf8");
  const start = source.indexOf(`${heading}\n`);
  assert.notEqual(start, -1, `heading exists: ${heading}`);
  const match = source.slice(start).match(/```bash\n([\s\S]*?)\n```/);
  assert.ok(match, `bash block exists after ${heading}`);
  return match[1];
}

test("real MCP SDK pin workflow step emits a healthy pin and fails malformed input", (t) => {
  const step = workflowRun("Read MCP SDK pin");
  for (const [label, config, status] of [["healthy", { commit: "a".repeat(40) }, 0], ["malformed", {}, 1]]) {
    const root = fixture(t, `workflow-${label}`); mkdirSync(join(root, "scripts")); writeFileSync(join(root, "scripts/mcp-docs-sdk.json"), `${JSON.stringify(config)}\n`);
    const output = join(root, "github-output"); const run = spawnSync("/bin/bash", ["-e", "-c", step], { cwd: root, env: { ...process.env, GITHUB_OUTPUT: output }, encoding: "utf8" });
    assert.equal(run.status, status, `${label}: ${run.stderr}`);
    if (status === 0) assert.equal(readFileSync(output, "utf8"), `commit=${config.commit}\n`); else assert.equal(existsSync(output), false);
  }
});

test("delegated upload example consumes intent privately and adopts the upload response attachment ID", (t) => {
  const root = fixture(t, "delegated-upload"); const bin = join(root, "bin"); mkdirSync(bin); writeFileSync(join(root, "invoice.pdf"), "fixture bytes");
  const curl = `#!/bin/bash\nset -eu\nprintf '%s\\0' "$@" >> "$TRACE_DIR/argv"\nprintf '\\n' >> "$TRACE_DIR/argv"\ninput="$(cat)"\nprintf '%s' "$input" >> "$TRACE_DIR/stdin"\nprintf '\\n---\\n' >> "$TRACE_DIR/stdin"\nif printf '%s\\n' "$@" | grep -qx POST; then\n  printf '%s' '{"data":{"upload_id":"upl_abcdefghijklmnopqrstuvwx","upload_url":"https://capability.invalid/secret-path","method":"PUT","expires_at":"2099-01-01T00:00:00.000Z","max_size_bytes":18874368,"headers":{"Content-Type":"application/pdf","Content-Length":"13","X-Sendmux-Upload-Token":"secret-upload-token"}}}'\nelse\n  printf '%s' '{"data":{"attachment_id":"att_abcdefghijklmnopqrstuvwx","filename":"invoice.pdf","content_type":"application/pdf","size_bytes":13,"expires_at":"2099-01-01T00:00:00.000Z"}}'\nfi\n`;
  writeFileSync(join(bin, "curl"), curl); chmodSync(join(bin, "curl"), 0o755);
  const script = `${bashBlockAfter("## Delegated uploads")}\ntest "$ATTACHMENT_ID" = att_abcdefghijklmnopqrstuvwx`;
  const run = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", script], { cwd: root, env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, TRACE_DIR: root, SENDMUX_API_KEY: "secret-api-key" }, encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr); assert.equal(run.stdout, "");
  const argv = readFileSync(join(root, "argv"), "utf8"); const stdin = readFileSync(join(root, "stdin"), "utf8");
  for (const secret of ["secret-api-key", "secret-upload-token", "https://capability.invalid/secret-path"]) assert.equal(argv.includes(secret), false, `${secret} absent from curl argv`);
  assert.match(stdin, /Authorization: Bearer secret-api-key/); assert.match(stdin, /request = "PUT"/); assert.match(stdin, /url = "https:\/\/capability\.invalid\/secret-path"/); assert.match(stdin, /header = "Content-Type: application\/pdf"/); assert.match(stdin, /header = "Content-Length: 13"/); assert.match(stdin, /header = "X-Sendmux-Upload-Token: secret-upload-token"/);
});
