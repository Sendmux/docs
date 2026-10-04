import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../webhooks/verify-signatures.mdx", import.meta.url), "utf8");
const source = page.match(/```js\n([\s\S]*?)```/)[1];
const { verifySendmuxWebhook } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const secret = "whsec_local_example_test";
const now = Date.UTC(2026, 8, 29, 7);
const body = '{ "id": "evt_example", "type": "message.received", "note": "日本語" }\n';

function request({ timestamp = now / 1000, timestampHeader = String(timestamp), bytes = body, signed = bytes, header, eventId = "evt_example" } = {}) {
  const mac = createHmac("sha256", secret).update(`${timestamp}.`).update(signed).digest("hex");
  return new Request("https://receiver.example/webhook", {
    method: "POST",
    headers: {
      "X-Sendmux-Timestamp": timestampHeader,
      "X-Sendmux-Signature-V2": header ?? `v1=${mac}`,
      "X-Sendmux-Event-Id": eventId,
      "X-Sendmux-Event-Type": "message.received",
    },
    body: bytes,
  });
}

test("the published verifier accepts the exact signed bytes within its freshness window", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now });
  for (const offset of [-300, 0, 300]) {
    const result = await verifySendmuxWebhook(request({ timestamp: now / 1000 + offset }), secret);
    assert.equal(result.ok, true);
    assert.equal(result.eventId, "evt_example");
    assert.equal(result.body.note, "日本語");
  }
});

test("the published verifier rejects tampering, stale/future timestamps and ambiguous headers", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now });
  for (const input of [
    { bytes: body.replace("日本語", "changed"), signed: body },
    { timestamp: now / 1000 - 301 },
    { timestamp: now / 1000 + 301 },
    { eventId: "evt_changed" },
    { bytes: "not JSON" },
    { header: "" },
    { header: `t=${now / 1000},t=${now / 1000},v1=${"a".repeat(64)}` },
    { timestampHeader: "" },
    { timestampHeader: "9007199254740999" },
  ]) {
    assert.equal((await verifySendmuxWebhook(request(input), secret)).ok, false);
  }
  assert.equal((await verifySendmuxWebhook(request(), "wrong-secret")).ok, false);
});
