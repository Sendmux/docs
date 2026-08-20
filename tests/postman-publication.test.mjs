import assert from "node:assert/strict";
import test from "node:test";

import { publishCollectionsTransactionally } from "../scripts/lib/postman-publication.mjs";

const publications = [
  {
    mapping: { label: "Management", collectionUid: "workspace-management" },
    collection: { version: 2 },
  },
  {
    mapping: { label: "Sending", collectionUid: "workspace-sending" },
    collection: { version: 2 },
  },
];

test("backs up every hosted collection before the first replacement and verifies each readback", async () => {
  const events = [];
  const hosted = new Map([
    ["workspace-management", { version: 1 }],
    ["workspace-sending", { version: 1 }],
  ]);

  const evidence = await publishCollectionsTransactionally({
    publications,
    fetchHostedCollection: async (mapping) => {
      events.push(`get:${mapping.label}`);
      return structuredClone(hosted.get(mapping.collectionUid));
    },
    replaceHostedCollection: async (mapping, collection) => {
      events.push(`put:${mapping.label}`);
      hosted.set(mapping.collectionUid, structuredClone(collection));
    },
    writeBackup: async (backup) => {
      events.push("backup");
      assert.equal(backup.collections.length, 2);
    },
    collectionsMatch: (left, right) =>
      JSON.stringify(left) === JSON.stringify(right),
  });

  assert.deepEqual(events, [
    "get:Management",
    "get:Sending",
    "backup",
    "put:Management",
    "get:Management",
    "put:Sending",
    "get:Sending",
  ]);
  assert.deepEqual(evidence.updated, ["Management", "Sending"]);
  assert.equal(evidence.rolledBack, false);
});

test("restores every attempted collection in reverse order when publication verification fails", async () => {
  const events = [];
  const originals = new Map([
    ["workspace-management", { version: 1 }],
    ["workspace-sending", { version: 1 }],
  ]);
  const hosted = new Map(
    [...originals].map(([key, value]) => [key, structuredClone(value)]),
  );
  let breakSendingReadback = true;

  await assert.rejects(
    publishCollectionsTransactionally({
      publications,
      fetchHostedCollection: async (mapping) => {
        events.push(`get:${mapping.label}`);
        if (
          mapping.label === "Sending" &&
          breakSendingReadback &&
          hosted.get(mapping.collectionUid).version === 2
        ) {
          breakSendingReadback = false;
          return { version: 999 };
        }
        return structuredClone(hosted.get(mapping.collectionUid));
      },
      replaceHostedCollection: async (mapping, collection) => {
        events.push(`put:${mapping.label}:${collection.version}`);
        hosted.set(mapping.collectionUid, structuredClone(collection));
      },
      writeBackup: async () => events.push("backup"),
      collectionsMatch: (left, right) =>
        JSON.stringify(left) === JSON.stringify(right),
    }),
    /publication failed; all attempted collections were restored and verified/,
  );

  assert.deepEqual(hosted, originals);
  assert.deepEqual(events.slice(-4), [
    "put:Sending:1",
    "get:Sending",
    "put:Management:1",
    "get:Management",
  ]);
});

test("fails loudly when rollback cannot be verified", async () => {
  const hosted = new Map([
    ["workspace-management", { version: 1 }],
    ["workspace-sending", { version: 1 }],
  ]);
  let publicationPuts = 0;

  await assert.rejects(
    publishCollectionsTransactionally({
      publications,
      fetchHostedCollection: async (mapping) =>
        structuredClone(hosted.get(mapping.collectionUid)),
      replaceHostedCollection: async (mapping, collection) => {
        publicationPuts += 1;
        if (publicationPuts === 2) throw new Error("provider unavailable");
        if (collection.version === 1 && mapping.label === "Management")
          throw new Error("rollback unavailable");
        hosted.set(mapping.collectionUid, structuredClone(collection));
      },
      writeBackup: async () => undefined,
      collectionsMatch: (left, right) =>
        JSON.stringify(left) === JSON.stringify(right),
    }),
    /rollback was incomplete.*Management/s,
  );
});
