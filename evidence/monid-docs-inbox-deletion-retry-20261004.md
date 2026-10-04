# Inbox deletion retry guidance — source preparation

Status: reviewed source applied and affected checks accepted locally against `3a1774dd8d73330768b8457ddce6eb3873d85a07`. Scope: one additive paragraph in the existing retirement Step, one fresh full copy ledger and this excluded internal evidence. No provider call, paid rewrite, new UI/control, main merge, deployment or publication performed. Normal signed source commit/push and ongoing review remain separately recorded in the private execution receipt.

Review comment `4176851799` correctly identifies omitted deletion `503`/`Retry-After` guidance. Actual handler `src/app/api/v1/mailboxes/[public_id]/route.ts:261–283` emits the pending-accounting `503`; `src/app/api/v1/_lib/errors.ts:113–116` sets the seconds header. Shared deletion `src/server/mailboxes.ts:1372–1392` pauses before soft-delete, and `src/server/mailbox-lifecycle-operations.ts:254–268,434–438` retries accounting recovery. Matching public collection: `postman/sendmux-management.postman_collection.json:2735–2753`.

A subsequent DELETE may return `404` after recovery completes. `src/server/api-v1/mailboxes.ts:638–645` also returns that status for deleted, unknown or foreign IDs. Public retained-cost schema `src/schemas/mailbox-usage.ts:39–49` has usage finality, not deletion status; `developer-tools/mailbox-costs.mdx:38–42` preserves original-team identity and pending reconciliation. Accordingly, the proposed paragraph gives header-directed retry timing and says `404` alone does not confirm deletion. It promises neither retry-until-200 nor 404-as-success, and exposes no private lifecycle fields.

Review comment `4176851804` is a false positive: Monid names the requested external connector platform, not Sendmux's implementation. Connector `monid-sendmux/README.md:18–32` identifies that public platform. The existing paragraph is explicitly retained in original ledger `automation/ledgers/2026-10-03-monid-pr-prerequisites-current.json:1895–1900,1919–1927`, tied to Roshan's exact reviewed-source retention at MAIN task directives line74. No new allowlist entry or confidentiality exemption is added; that paragraph remains byte-identical.

Manual eligibility: original651 units frozen with provenance to `automation/ledgers/2026-10-04-monid-changelog-period-current.json`; sole new piece20 readable words after frozen inline code is removed, under the canonical50-word submission floor (`humanisation-finalisation.md:22`, docs workflow73). New unit `developer-tools/integration-connections.mdx#p024`, line130, is `ineligible-manual`; all existing guide paragraphs, Monid wording, headings, links, metadata and protected counts preserved. Manual factual/voice/hard-ban/preservation checks completed; no paid call or inherited score/disposition.

Preparation-only computation invoked the existing pure collector and unit validator against proposed bytes:652 units/nine pages/651 frozen/one manual/zero errors. Actual affected commands subsequently each exited0 with the existing Node24/Mint installation: `npm run confidentiality:check`, `npm run external-links:check`, `mint broken-links`, `mint validate`, then the product `repo-rules-gate.mjs --mode working --repo <docs checkout>` using exactly the new full ledger and the validation declaration earned by those preceding CLI results. `git diff --check` also exited0. No complete tooling/SDK/skills CI suite was recreated; unchanged receipts retain their original input qualifications.

Strict Chromium changed-page render exited0: HTTP200, exact `http://localhost:3000/developer-tools/integration-connections` URL, nonblank headings, exactly one visible complete reviewed paragraph, zero page/console/resource errors. Inline code markup becomes literal displayed text; content assertions preserve every word/token. Existing nine-page and icon approval receipts remain qualified separately; no new icon edit or visual design introduced.

Owned preview session14951 exited0 through Ctrl-C; sampled process tree15579/15614 independently absent. Checker pages/browser close in `finally`, no user tab created. `lsof` port3000 listener check returned1/empty; a normal server successfully bound/listened/closed on both `127.0.0.1` and `::1`, exit0. Full-lifetime absence not claimed. No generic kill, shared-cache pruning or foreign resource teardown. Actual logs/checker/process capture/cleanup retained under `sendmux/.claude/artifacts/monid-readiness/release-current-prep/docs-retry-review-prep-current-20261004/execution/`.

SHA256 bindings:

- Original page: `25bd60198d13b3a2a6df6ee602bbab1da18131e8ea7a331d968803b499a11d4f`.
- Proposed page: `4d18d33cd968bec21f9bc595039aa472a5754095edfe6b5c7b5ab248a9f8cf7d`.
- New raw indented unit: `163bd6f1958b361a24205311db6f1fc652f2b4d61deb5fffe9e3e906a035ea22`.
- New full ledger: `ba535b27ab4ec0f70fc0a6211c5f5fb8d21f44f4c873275ca565e9609d0f6bda`.
- Prior651 ledger unchanged: `01190b86304bcf76cf811d0ace67617e45584a4d00f75f5be005e787d5a2a6d3`.

Remaining: normal signed commit/push, exact PR/owning CI and review acceptance, then the separately approved release/API-first/publication path. Root owns review replies. No previous candidate's gate or render result is relabelled, and no deployed/public availability inferred from local acceptance.
