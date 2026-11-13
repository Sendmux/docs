# A17 integration contract documentation

Released-snapshot integration: app source includes #896 merge `404f52ee1eb0`; all intentional Qubrics copy from docs main #76 remains. App source adds explicit names to the existing message/calendar discriminated-union variants so generated clients receive the intended mapping, without changing runtime fields. Snapshot SHA256 `16439b3c0d9eee73554202cf909af6aade12b6f8d3390ddee922663ba061de1a`; sending upload-token OR-auth snapshot `3138c5f27e3c0ab8475d1ccaf7378815c12e12918c30a90e77e2115642bc3647`. Postman regenerated from both. Generated technical-token changes require no prose polish. Standards and Spec reviews of the independent tenant-env, Codex export, mail scope and upload-auth follow-ups each returned 0 findings. Protected MCP pin/release snippet remain unchanged until a compatible published release is verified; this remains a release dependency.

Goal: Qubrics integration names are the default in examples, with explicit indefinite support for existing integration names.

Status: source candidate, not merged or published. The release-draft changelog must travel with the coordinated product release.

## Final source-freeze preparation

App source commit `9a70abe5df0c060bce5114cbaa458a6878b44970`, SMTP source commit `20b3129d1dcecaaa3e1f513413d97dd6baabead6` and SDK source commit `722fbab2f98248d17b4878dd5149a35a711d5a18` are final. After Ops released calendar's SDK leases, the preserved calendar candidate's source/coverage decisions were integrated into the separate SDK worktree. Authenticated aliases pass 4/4 tests; related calendar/permission/MCP tests pass 71/71; normal drift and the unmodified commit hook pass for 127 operations. Final SDK Standards and Spec reviews each return 0 findings. The protected MCP pin and release-facts snippet remain unchanged; a compatible publication must be verified before these docs can publish.

Review `4440353952` is corrected in the consolidated changelog draft: only newly emitted mail payloads promise both correlation fields; integrations must accept older retained/queued payloads with only `sendmux_message_id`. The same draft covers equal upload-token headers and the approved `Qubrics-Webhooks/1.0` User-Agent, with conditional allowlist guidance. Both existing rebrand Update blocks remain. Fresh critique, one humanize pass and protected-set preservation are recorded in `docs/changelog-consolidated-polish.md` under the task artifacts.

Canonical order is product commits final, then this genuine consolidated changelog commit/push, then product pushes. SDK source finalisation precedes this docs commit; no timestamp churn or bypass. Consumer backport event-gateway#36 is merged as `a82b49a677b5eb88bcd0747db80a127a4f3b853f`; production slot is now held by calendar-friction-review, with a separate deployment ASK required when pushes are green.

Review `4440311170` is corrected through one shared `snippets/mcp-upgrade-safety.mdx` warning, rendered before all 24 existing MCP package upgrade commands. It preserves the working package environment, dependency state and MCP client/tool configuration before upgrading, identifies the source-documented 2.0.0 removal of local `file_path` and roots attachment inputs, and links the current Qubrics SDK migration/rollback guide before switching agents. Source: SDK `packages/python/mcp/README.md:33-44` and `CHANGELOG.md:59-67`. Commands, existing Qubrics names and surrounding examples are unchanged. No tests were added or removed; unchanged package-install commands were not executed.

The combined final candidate passed confidentiality, external-link validation, `mint validate`, `mint broken-links` and `git diff --check`, all exit 0. Receipts: `docs/upgrade-final-{confidentiality,external-links,mint-validate,broken-links,diff-check}.log`. Actual HTTP preview proof rendered 24/24 guides with the warning before the install command and the expected guidance link attributes (`docs/upgrade-final-render.log`). Independent review returned Standards 0 hard violations / 0 heuristic findings and Spec 0 findings. One humanize pass and the protected-set check retain every migration prerequisite and exact technical token (`docs/upgrade-polish-preservation.md`).

The protected MCP pin and release-facts snippet match HEAD exactly (Git blobs `0e6938ea8cc8e6a1edf6a6c0992557f0e6ab1efb` and `f227900319ce4bf03cb85f1170c77836df1003fb`). Owned preview processes 13437/13695 exited; the unrelated existing listener 79174 remains untouched (`docs/upgrade-final-teardown.log`). All source-write claims are released. The previously guard-blocked shared preview cache remains; no repeated deletion or workaround was attempted. No commit, push, production write, deploy or publication was performed during this final independent preparation.

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

## Automated review source corrections

At head `832ac39811c51d99be18f64004e6e8c658250054`, source findings `4440003023`, `4440003029` and `4440003046` were validated before edits:

- CrewAI's documented `server_params_for` merges `os.environ` after the tenant key. A bounded repro executes the actual documented function with the installed `mcp.StdioServerParameters` and conflicting inherited fixture credentials; it fails `tenant key replaced by inherited generic key` (`crewai-tenant-red.log`). MCP `ServerConfig.api_key_for` also prefers surface-specific keys to the generic key, and `env_value` prefers Qubrics names to legacy names. The canonical fix removes exactly eight generic/mailbox/management/sending API-key names for both brands, preserves unrelated environment entries and then sets the tenant key. Merely reversing the dictionary merge would leave inherited surface keys able to override the tenant key.
- Codex's documented command-prefix bearer assignment reaches only the server. A bounded shell repro of that block, with the terminal server call returning immediately, fails `bearer token unavailable to Codex child environment` / `QUBRICS_MCP_HTTP_BEARER_TOKEN: unbound variable` (`codex-bearer-red.log`). Export the existing token value before the server, keep that foreground server running and export the same token in the shell that starts Codex.
- The app mail-event schema makes both message correlation values nullable (`src/app/api/v1/_lib/schemas/webhooks.ts:46` and `:51`); its calendar discriminant has a separate payload (`:134`). Scope the field statement to mail, say values can be null and distinguish calendar payloads; preserve the retained/queued-delivery qualifier and indefinite support.

Version findings `4440003015`, `4440003033` and `4440003041` remain **BLOCKED** on the verified SDK release/version and contract handoff. The current pinned release-facts snippet says `2.1.3`; it does not prove Qubrics alias support. No minimum version, pin or snippet may be invented. The independently actionable install issue uses pip's documented `--upgrade` option (https://pip.pypa.io/en/stable/cli/pip_install/) in each existing MCP installation snippet; framework dependencies retain their original install command so only the MCP package is explicitly upgraded. Existing tests do not pin these install-command strings.

Findings `4440003074` and `4440003079` are already fixed in `832ac39811c51d99be18f64004e6e8c658250054`. Finding `4440003069` belongs to the SMTP source owner; generated OpenAPI/Postman files are untouched in this docs batch.

The CrewAI fix's finite eight-name filter follows SDK `packages/python/mcp/sendmux_mcp/config.py:71`, `:115`, `:179` and `packages/python/core/sendmux_core/environment.py:15`. The original documented function failed with conflicting inherited credentials; the same actual-function repro now exits 0 (`crewai-tenant-green.log`): tenant key retained, seven inherited key aliases removed, unrelated environment entry preserved. No crew or network request is launched. Other per-tenant framework mappings do not merge the parent environment; no further instances of this confirmed override cause were found.

The same shell-environment repro now exits 0 (`codex-bearer-green.log`), and an independent client-shell run also exits 0 (`codex-separate-shell-green.log`). Both processes inherit the existing `local-mcp-token` value through the documented exported variable. These bounded existing-example probes add no dependency or committed harness.

All 24 existing MCP pip installation snippets now explicitly use `pip install --upgrade sendmux-mcp` (`mcp-upgrades-scan.log`). This does not qualify the currently published version for aliases: minimum-version findings remain BLOCKED until release proof. `scripts/mcp-docs-sdk.json` and `snippets/mcp-release-facts.mdx` are unchanged, as Ops required.

Fresh-reader critique passed all applicable rubric lines for the mail-field and Codex instructions; one humanize pass touched only these new prose blocks. The protected-set check retains nullable mail-only semantics, separate calendar payloads, exact field/token names, retained and queued-event caveats and indefinite support (`review-polish-preservation.log`). Exact install-command/code corrections need no prose polish.

Post-fix checks exited 0: confidentiality, external links, focused existing executable/docs/verifier tests (7 passed, none skipped), Mintlify broken links and validation, and `git diff --check`. Receipts are `review-confidentiality.log`, `review-external-links.log`, `review-focused-green.log`, `review-broken-links.log` and `review-mint-validate.log`. Rendered CrewAI code shows the eight-name filter (`review-render-crewai.log`), Codex shows both exports (`review-render-codex-final.log`), and the compatibility note says mail-only/null/calendar exactly (`review-render-mail-final.log`). The preview and owned browser tab were stopped; only the unrelated existing CCS listener remains on port 3000. The already-reported generated-cache deletion tool restriction remains; no deletion workaround was attempted.

Final source-review follow-up: SMTP `ebb10b196411cc7217f5b6b671dc07c3f26372b9` rejects unequal present upload-token twins, including blanks, and SDK `ff4bb8601de885703e2cbff4af6a62f1b15d5791` fixes generated PHP discriminator identifiers and native contract checks. Both product commits precede this genuine changelog clarification; their pushes follow the docs push. The source-owned snapshots, protected pin and release-facts snippet are unchanged.

The changelog now states trimmed token equality explicitly. Fresh-reader critique corrected implicit trimming; one humanize pass retained the two existing sentences and every technical token. Final confidentiality, external links, Mint validation and broken-links checks exit 0. Chrome Agent rendered the exact paragraph at `/changelog`; no page errors appeared. Receipts: `docs-token-polish.md`, `docs-token-render-final.log`, `docs-token-confidentiality.log`, `docs-token-external-links.log`, `docs-token-mint-validate-final.log`, `docs-token-broken-links.log`. Own browser tab/session closed and preview PID2910/listener37904 verified absent. No publication or production mutation.

## Published-core compatibility follow-up

Final SDK source commit `8f4c78f050725b6d57a6b71d39178dee40c1774e` preserves the Python Sending SDK's declared `sendmux-core>=1.3.1,<2.0.0` dependency contract. Generator-owned wrappers resolve environment settings locally; the canonical isolated LangChain cohort installs published core 1.3.1 with source Sending and LangChain, retains provenance checks and passes dependency validation. Canonical Python verification passes 190 tests with zero skips. PHP formatting and the Ruby SDK's two existing-manifest dependency floors are also corrected; the unchanged commit hook passes all generators, 127-operation coverage and drift. Source receipt: `sdk-pr345-ff4-diagnosis.md`, `sdk-pr345-second-python-check-final.log:4168-4177` and `sdk-pr345-second-final-commit.log`.

This genuine changelog follow-up tells Python Sending SDK users they can retain supported core versions. Fresh-reader critique passes all applicable rubric lines after a second-person correction; one humanize pass and the protected-set check preserve Python, Sending SDK, Qubrics and sendmux-core exactly. It does not claim the other SDKs were dynamically tested with published core, identify an unverified alias release or change the protected SDK pin/release-facts snippet. Four final docs checks and diff check exit 0; Chrome Agent renders the sentence at `/changelog` without page errors. Receipts: `docs/python-cohort-polish.md`, `docs/cohort-final-{confidentiality,links,validate,broken-links}.log`, `docs/cohort-render-changelog-ready.log`. The initial accessibility snapshot raced a navigation; one settled-page observation succeeded without changing the source.

Review 5738257944's mailbox example now reads the established `QUBRICS_MBX_KEY` export, matching the client guides. Exact-token correction: Standards 0 / Spec 0 and four docs checks green; `docs/mailbox-token-followup.md`.

SDK source was committed before this docs commit; the docs push precedes the SDK product push. No amend, force-push, timestamp-only change, hook bypass, production mutation or publication. Compatible SDK/MCP publication remains the release dependency for the protected docs pin and release-facts snippet.

## SDK legacy-call compatibility follow-up

SDK source `491003792dd742cb2c83e4a09501abdf4f4458c9` is frozen after normal `pnpm drift:check` generation/hooks and independent Standards 0 / Spec 0 reviews. Its public red/green cases cover empty Qubrics settings falling back to legacy settings, PHP/Ruby delegated-upload positional calls, Go's retained keyed upload-token field and Python's absent/null/string correlation-field round trips. Source anchors: `packages/ts/core/src/generated-client.ts:22,40`, `scripts/generate-php.mjs:392,519`, `scripts/generate-ruby.mjs:476`, `go/sending/oas_parameters_gen.go:24`, and `packages/python/management/sendmux_management/models/webhook_event_data.py:204`. Detailed SDK receipts remain in that source commit's evidence section at line 198.

One genuine paragraph adds these compatibility details to the existing integration entry. Fresh-reader critique, one humanize pass and exact protected-token preservation are recorded in `docs/sdk-compatibility-followup-polish.md`. Existing changelog content, navigation, both OpenAPI inputs and the protected MCP pin/release-facts snippet are unchanged.

Required confidentiality, external-link, Mint validation, broken-link and whitespace checks exited 0. Chrome Agent rendered the exact paragraph at `http://[::1]:3000/changelog`; page logs contain no errors. The first snapshot raced navigation; one settled-page observation succeeded. Receipts: `docs/compat-followup-{confidentiality,external-links,mint-validate,broken-links,browser-ready}.log`. Owned preview PID 73479 exited 0 and is absent; owned browser page closed and Playwriter session 24 deleted. Only the unrelated existing IPv4 listener 79174 remains on port 3000. The earlier command-guard block on shared preview-cache teardown remains without retry or workaround.

Canonical order: final SDK commit, this genuine docs commit/push, then SDK push. Required exact-head remote CI remains a separate gate. No merge, package/Snap rerun or publication, deploy or production write; production remains frozen. Snap's old CLI producer remains a release dependency, and the protected MCP pin awaits a verified compatible publication.
