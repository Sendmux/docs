# A17 integration contract documentation

Goal: Qubrics integration names are the default in examples, with explicit indefinite support for existing integration names.

Status: source candidate, not merged or published. The release-draft changelog must travel with the coordinated product release.

## Scope and sources

- Base: `3aebf537d97f79211bcf7fba9019642950946150`.
- Ticket: `qubrics/qubrics#904`; specification A17 in `qubrics/qubrics#903`.
- Forty-six existing MDX pages now use the Qubrics environment, header, tool and message-field names in technical examples.
- `ai-integrations/mcp/index.mdx` owns the compatibility reference: Qubrics environment precedence, eight equal-valued header pairs, identical MCP alias handlers and equal message fields.
- Existing webhook bodies remain immutable: older retained payloads and deliveries queued before the release can contain only `sendmux_message_id`. Source: event-gateway retry sends persisted `job.payload_body` unchanged (`src/consumers/tenant-webhook-fanout/index.ts:1018`).
- `developer-tools/cli.mdx` contains the coordinated `#897 lines 40,49` handoff: `qubrics/tap/sendmux` and `https://github.com/qubrics/qubrics-sdk/releases`.
- `openapi-sending.json` matches the SMTP source-generated contract; its Sending Postman collection was regenerated with `npm run postman:emit`.
- The app snapshot, MCP SDK pin and release-facts snippet remain unchanged while calendar-api owns those paths. A later coordinated source handoff must update them before publication.

## Copy preparation

Placement: existing Guides > Developer tools / AI integrations / Sending / Webhooks task pages. Disposition: keep. Configuration stays with the relevant tool, signing with verification, and the shared compatibility reference has two incoming guide links. No navigation changes.

Token-only corrections and generated artifacts are exempt from the prose polish pass. New compatibility prose received a fresh-reader critique, one humanize pass and a protected-set comparison. The 36 distinct protected code tokens and complete eight-row header table remain exact. The later queued-delivery qualifier is an intentional source-backed correction, freshly critiqued by the coordinating agent.

The release-draft changelog received a separate fresh-reader critique: every applicable rubric line passed, with Thumb-stop, Share and Visual not applicable. One humanize pass retained its two sentences and all six contract-token families. Literal scans: em dashes 0, semicolons 0, curly quotes 0, banned terms 0, comparative framing 0, diminishment 0. Existing-name support remains indefinite.

## Verification

All commands below exited 0 against this candidate; logs live in `.claude/artifacts/rebrand-qubrics-904/docs/`.

- `npm run confidentiality:check` — `confidentiality-final.log`.
- `npm run external-links:check` — `external-links-final.log`.
- `npm run postman:check` after regeneration — `postman-check-final.log`.
- `npm run mcp-discovery:check` — `mcp-discovery-final.log`.
- `mint broken-links` — `broken-links-final.log`.
- `mint validate` — `mint-validate-final.log`.
- `npm run mcp-docs:check -- --sdk /Users/rj/Desktop/GIT-REPOS/sendmux-sdk-rebrand-904-docs-pin` — `mcp-docs-pin-final.log`.
- `git diff --check` — clean.

The MCP checker requires an explicit `--sdk PATH` or `SENDMUX_SDK_CHECKOUT` and an exact HEAD match to `scripts/mcp-docs-sdk.json`. Its initial invocation lacked that environment input. A separate detached checkout at the unchanged pin `4b245f66d78068d7c326fb184887ffa7fc033feb` passed, preserving every calendar-owned checkout and file.

`mint dev --no-open` rendered the compatibility table, CLI environment settings/Homebrew reference and signature-verification samples. Browser receipts: `render-compatibility.png`, `render-compatibility-final.log`, `render-cli-final.log`, `render-signatures-final.log`. The signature page recorded no failed requests. Initial exact heading lookup failed because the rendered heading includes a zero-width anchor character; the final heading lookup and screenshot passed. Source props and rendered text both contain the candidate's names.

## Release conditions and parked work

No merge, deploy or publish performed. Coordinated app snapshot and MCP contract-pin updates remain required after their owner hands off the paths. General Sendmux copy, package names and hostnames remain assigned to other rebrand tickets. npm installation reported three inherited high vulnerabilities; dependencies and lockfile are unchanged.

Two-axis code review against the fixed base returned Standards 0 findings / 0 blockers and Spec 0 findings / 0 blockers. The coordinating agent owns commit, branch push, PR against `main`, CI and the eventual release approval handback. This evidence records source qualification only.

## PR78 CI fixture reconciliation

CI run `41408332332` at source commit `6523cd3be4b96f17eb7cb430e58bee2bed83595b` failed three tests. A focused local run of the same files reproduced all three before editing: `node --test tests/docs-accuracy.test.mjs tests/executable-docs.test.mjs tests/webhook-verifier-example.test.mjs` exited 1; `pr78-focused-red.log` records the failures.

Canonical per A17 (`qubrics` specification `specs/rebrand-qubrics/spec.md:24`): Qubrics names are documented, old integration names remain supported, and emitted headers have both twins. Per the explicit Ops Watch `#897 lines 40,49` handoff, the CLI release link is `https://github.com/qubrics/qubrics-sdk/releases`. The source changes are intentional; tests must follow those authorised contract names.

Before test edits, the old assertion / intended behaviour / replacement assertion are:

- `tests/docs-accuracy.test.mjs:11` pins the old `Sendmux/sendmux-sdk/releases` URL. The approved #897 line49 handoff uses `qubrics/qubrics-sdk/releases`; replace only that exact URL matcher. Keep all five supported-platform assertions.
- `tests/executable-docs.test.mjs:39` supplies only `SENDMUX_API_KEY`, while the A17 example at `sending/attachments.mdx:67` reads `QUBRICS_API_KEY`, producing `QUBRICS_API_KEY: unbound variable`. Supply the documented Qubrics variable and model the upload intent's equal-valued new/retained token headers. Keep the attachment-ID, no-stdout, private argv, method, URL and header assertions; assert that both emitted token names reach curl through standard input.
- `tests/webhook-verifier-example.test.mjs:18` supplies only old header names, while `webhooks/verify-signatures.mdx:29` reads `X-Qubrics-Signature-V2` and `X-Qubrics-Timestamp`. The valid request therefore fails before its HMAC check (`false !== true`), and negative cases can pass for the wrong reason. Feed the unchanged positive and adversarial cases the documented four Qubrics headers. Preserve the exact timestamp boundaries, raw-body tampering, event-ID mismatch, malformed JSON/header, missing header, unsafe timestamp and wrong-secret assertions.

Adjacent test scan found no further product examples pinned to superseded header/env names outside these files. `SENDMUX_SDK_CHECKOUT` and `SENDMUX_SKILLS_ROOT` in other tests are existing CI-tooling inputs; leave them unchanged.

After these fixture and exact-token assertion changes, the same focused command exited 0: 7 tests passed, 0 failed, 0 skipped (`pr78-focused-green.log`). Before the fix, 4 passed and 3 failed. No test cases or negative assertions were removed, weakened or skipped; no source prose changed. The upload fixture extension models both emitted token headers, while its existing secret-in-argv checks still cover the API key, token and capability URL. This is a test-only reconciliation, not a runtime behaviour change.
