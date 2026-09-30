# Docs release checks evidence

## Scope

Branch `agent/release-checks-docs` starts from `origin/main` commit `2b8a5884cd2fbef0ee23b048dd408d9beae4c1e2`.

The change moves the credential-free SDK and docs checks into `.github/actions/prepare-docs/action.yml`. Both verification and hosted Postman publication call that action. No hosted collection was published, no credential was retrieved, and no GitHub configuration changed.

## Trace

- `.github/workflows/verify.yml:23` checks out without persisted credentials, then calls the shared action at line 28.
- `.github/actions/prepare-docs/action.yml:7` validates the pinned SDK commit through `scripts/read-mcp-docs-sdk-pin.mjs`.
- `.github/actions/prepare-docs/action.yml:14` checks out the exact SDK commit with `persist-credentials: false`.
- `.github/actions/prepare-docs/action.yml:22` installs Node.js 22 with npm caching, then installs dependencies and runs tooling tests, MCP docs drift, external-link safety, and Postman drift checks.
- `.github/workflows/publish-postman.yml:21` checks out the dispatch commit without persisted credentials.
- `.github/workflows/publish-postman.yml:28` binds the dispatch SHA to the current `main` SHA through the read-only GitHub commits API. Its token exists only in that guard step.
- `.github/workflows/publish-postman.yml:50` runs the same shared preparation before either Postman secret-bearing step.

## Test evidence

Added behavior test:

- `tests/executable-docs.test.mjs:24` executes the pin reader against a complete 40-character commit and malformed configuration.
- Red: exit 1 with `Cannot find module .../scripts/read-mcp-docs-sdk-pin.mjs` before the executable existed. Receipt: `.claude/artifacts/release-checks-docs/red-pin-cli.log`.
- Green: 1 test passed, 0 failed. Receipt: `.claude/artifacts/release-checks-docs/green-pin-cli.log`.

Removed test mechanism:

- `tests/executable-docs.test.mjs:15` no longer extracts inline workflow YAML with a regular expression. The behavior remains covered through the executable pin-reader test above.

Realistic negative candidate:

- A copied Postman snapshot omitted `sendmux-sending.postman_collection.json`.
- The production drift checker exited 1 with `Postman collection file set drift detected` and reported the differing generated and snapshot file sets.
- Receipt: `.claude/artifacts/release-checks-docs/red-postman-drift.log`.

Clean preparation path:

- `SENDMUX_SDK_CHECKOUT=.tmp/mcp-docs-sdk npm test`: 37 passed, 0 failed.
- `SENDMUX_SDK_CHECKOUT=.tmp/mcp-docs-sdk npm run mcp-docs:check`: passed.
- `npm run external-links:check`: passed.
- `npm run postman:check`: all three committed collections matched generated output.
- Receipt: `.claude/artifacts/release-checks-docs/shared-preparation-clean.log`.

Workflow validation:

- actionlint v1.7.7 accepted both workflow files.
- `check-jsonschema` accepted the composite action against `https://json.schemastore.org/github-action.json`.
- The live read-only GitHub commits API returned the same `main` SHA as `origin/main`: `2b8a5884cd2fbef0ee23b048dd408d9beae4c1e2`.
- Receipts: `.claude/artifacts/release-checks-docs/actionlint.log`, `.claude/artifacts/release-checks-docs/action-schema.log`, and `.claude/artifacts/release-checks-docs/github-main.json`.

Repository gates:

- `npm run confidentiality:check`: passed.
- `mint broken-links`: passed with no broken links.
- `mint validate`: passed.
- `mint dev --port 3017`: preview served `/` successfully; retained HTML receipt contains 281,049 bytes. The exact preview process was stopped and verified absent.
- Receipts: `.claude/artifacts/release-checks-docs/confidentiality.log`, `.claude/artifacts/release-checks-docs/mint-broken-links.log`, `.claude/artifacts/release-checks-docs/mint-validate.log`, and `.claude/artifacts/release-checks-docs/mint-home.html`.

## Preserved publication controls

- `production-postman` environment remains on the publication job.
- Dispatch remains restricted to `refs/heads/main`.
- Publication remains serialized with `cancel-in-progress: false`.
- The protected-context flag and exact checked-out dispatch SHA remain required.
- The current `main` check now uses a read-only API response instead of credentials persisted by checkout.
- `POSTMAN_PRODUCTION_API_KEY` remains scoped only to hosted sync and independent readback.
- Backup, readback, and automatic rollback remain implemented by the existing hosted sync command and its tested publication library.
- Publication evidence remains uploaded on every outcome with hidden files included and 30-day retention.

## Completion state

Correctness: Both workflows call one credential-free preparation action; the publication guard binds the checked-out dispatch commit to current `main` before tests or mutation.

Tests: Added the pin-reader behavior case and observed it fail before implementation and pass after implementation. Removed the source-text workflow extraction while retaining its behavior coverage. The full suite passed 37/37.

Journeys: CI configuration has no local GitHub-hosted runner harness. Workflow syntax/schema, every shared command, the live read-only exact-main API boundary, and the Mint preview were exercised locally.

Status: Ready for review; not merged and not published.

Torn down: Mint preview process `13983` was stopped and `kill -0` confirmed it was gone.

Parked: None.
