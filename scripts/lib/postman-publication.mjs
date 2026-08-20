export async function publishCollectionsTransactionally({
  publications,
  fetchHostedCollection,
  replaceHostedCollection,
  writeBackup,
  collectionsMatch,
}) {
  const originals = [];
  for (const publication of publications) {
    originals.push({
      mapping: publication.mapping,
      collection: await fetchHostedCollection(publication.mapping),
    });
  }

  await writeBackup({
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    collections: originals.map(({ mapping, collection }) => ({
      label: mapping.label,
      collectionUid: mapping.collectionUid,
      collection,
    })),
  });

  const originalsByUid = new Map(
    originals.map(({ mapping, collection }) => [
      mapping.collectionUid,
      collection,
    ]),
  );
  const attempted = [];

  try {
    for (const publication of publications) {
      attempted.push(publication);
      await replaceHostedCollection(
        publication.mapping,
        publication.collection,
      );
      const readback = await fetchHostedCollection(publication.mapping);
      if (!collectionsMatch(publication.collection, readback)) {
        throw new Error(
          `Postman readback did not match ${publication.mapping.label}.`,
        );
      }
    }
  } catch (publicationError) {
    const rollbackErrors = [];
    for (const publication of [...attempted].reverse()) {
      const original = originalsByUid.get(publication.mapping.collectionUid);
      try {
        await replaceHostedCollection(publication.mapping, original);
        const readback = await fetchHostedCollection(publication.mapping);
        if (!collectionsMatch(original, readback)) {
          throw new Error(
            `Rollback readback did not match ${publication.mapping.label}.`,
          );
        }
      } catch (rollbackError) {
        rollbackErrors.push({
          label: publication.mapping.label,
          error: rollbackError,
        });
      }
    }

    if (rollbackErrors.length > 0) {
      throw new Error(
        `Postman publication failed and rollback was incomplete for: ${rollbackErrors
          .map(({ label }) => label)
          .join(", ")}.`,
        {
          cause: new AggregateError(
            [publicationError, ...rollbackErrors.map(({ error }) => error)],
            "Postman publication and rollback errors",
          ),
        },
      );
    }

    throw new Error(
      "Postman publication failed; all attempted collections were restored and verified.",
      {
        cause: publicationError,
      },
    );
  }

  return {
    updated: publications.map(({ mapping }) => mapping.label),
    rolledBack: false,
  };
}
