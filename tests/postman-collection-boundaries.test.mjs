import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

test("Postman collections separate team administration from mailbox-scoped requests", async () => {
  await mkdir(resolve(".claude/artifacts/monid-stable-docs"), { recursive: true });
  const output = await mkdtemp(resolve(".claude/artifacts/monid-stable-docs/postman-boundaries-"));
  try {
    execFileSync(process.execPath, ["scripts/emit-postman-collections.mjs", "--output-dir", output]);
    const requests = (items) => items.flatMap((item) =>
      item.request ? [item.request] : requests(item.item ?? []),
    );
    const management = requests(JSON.parse(await readFile(`${output}/sendmux-management.postman_collection.json`)).item);
    const mailbox = requests(JSON.parse(await readFile(`${output}/sendmux-mailbox.postman_collection.json`)).item);
    for (const path of ["mailboxes", "mailbox-send-policies"]) {
      assert.ok(management.some((request) => request.url.path[0] === path), `${path} requires Management authentication`);
      assert.ok(mailbox.every((request) => request.url.path[0] !== path), `${path} must not require a mailbox credential`);
    }
    assert.ok(management.every((request) => request.url.path[0] !== "mailbox"));
    assert.ok(mailbox.every((request) => request.url.path[0] === "mailbox"));
    assert.ok(mailbox.some((request) => request.url.path[1] === "drafts"));
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});
