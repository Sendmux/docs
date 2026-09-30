# Combined release documentation preparation

Recorded 2026-09-17 01:39 Australia/Melbourne. Preparation for reviewers; public release remains ordered after compatible backend acceptance.

- App correction commit: `3c91ee00d040b0b0cdcc38e534aab67f3d29b443`, timestamp 1789573028. Proxy correction: `9a7bdb6d9fb7a7fe7d1f27df52fab422d7beaeb8`. This docs commit follows both product changes.
- Exactly two unpublished changelog date labels advance to 17 September 2026. All prose, frontmatter and historical labels are byte-identical; all 108 dates remain newest-first.
- The canonical app emitter changes only the provider PATCH description to permit shared-account variables-only editing. The corresponding Management Postman description is generated, not hand-edited; API structure is unchanged.
- Fresh canonical app snapshot check, all-three Postman parity, confidentiality and whitespace checks pass. The earlier complete seven-gate receipt includes 37 tests, zero skips, Mintlify validation and broken-link checks on these same generated references. Only date metadata changed afterward. MAIN `.claude/artifacts/docs-final-20260917/report.md` retains that full receipt.
- Independent narrow verification: `.claude/docs-final-delta-verification-20260917.md`, SHA256 `df680d26669938a25faff1876ae512381823cf5c75bdae58aca60a634e8c447d`. Its first inline source-path lookup failed with ENOENT; the corrected actual-source assertion and canonical emitter check passed. The failure remains recorded.

## Exact prepared artifacts

| File | SHA256 |
| --- | --- |
| `changelog.mdx` | `b030a679c5985510d16d5cb1967e22efe8feeaa5da7eb9c0a7723020f44aa270` |
| `openapi-app.json` | `09b00ae13c88fe4ecc1bb3fd965bb30efd79447d5ea68b5334816a7452d40b58` |
| `postman/sendmux-management.postman_collection.json` | `e9e2972a29e4d775bee9a92bf6d9895294bc639daa6aa1f935938ca4160458ee` |

Placement: existing Product updates and generated Management API provider PATCH reference; unchanged.
Humanisation: skipped for metadata-only labels and generated artifacts under `automation/docs-authoring-workflow.md`; no approved prose or historical ledger was rewritten.
Preservation: the accepted 17-unit and separate ineligible-manual ledgers remain byte-identical. No provider call was made.
Tests: no added or removed tests in this metadata/generated-only delta.
Journeys: prior rendered receipts remain historical; final public output and hosted Postman acceptance remain open.
Torn down: reviewer verified 13 exact process handles, 3 groups and 2 temporary directories absent; no browser or server was started for this delta.
Status: branch preparation only, not public release. ROOT retains normal PR/CI/review, backend-first publication and published-byte verification; no hosted collection was changed locally.
Parked: none added.
