# Saved-draft revision safety — local docs candidate

Status: source candidate checked locally; not pushed, merged, deployed or published. Baseline `c32b827f45b4a7878c4dcd484a85e6a87acf95bb`. Scope: one paragraph in the existing 3 October Agent email workflows update, one additive copy ledger and this evidence. Date, tags, RSS title, versions, navigation, original guide and historical ledgers unchanged.

Placement: Product updates → existing Agent email workflows update. Added the reviewed recipients/content, exact-revision and lost-response instructions from `developer-tools/mailbox-api/saved-drafts.mdx:40`; only this new location replaces its semicolon with a full stop. Behaviour anchors: Sending `app/shared/mailbox-draft-enqueue.js:4–19,28–44`, `app/consumer/lib/mailbox-draft-provider-boundary.js:15–23` and `app/shared/mailbox-draft-recovery.js:96–108`. No new behaviour or delivery guarantee claimed.

Canonical manual route: `automation/docs-authoring-workflow.md:73` and the canonical humanisation contract's below-50-word and immutable-history rules. New eligible piece: 37 words, one `ineligible-manual` unit; the 650 previously accepted units remain frozen with their original provenance. Full additive ledger: `automation/ledgers/2026-10-04-monid-changelog-period-current.json`, 651 units across nine pages, zero held rows. Factual, voice, protected-count and hard-ban checks completed; no provider call or fabricated score.

Hashes (SHA256):

- New paragraph: `64f413a6200b22c56bad0f614792a9962784613025248ff1ec85342bd0ca4ebd`.
- Changelog: `e0897235f41bbfe334099f172ac17f6138c87a8fa3b99725ef91ff567d4ce55a`.
- Additive ledger: `01190b86304bcf76cf811d0ace67617e45584a4d00f75f5be005e787d5a2a6d3`.
- Original 650 ledger unchanged: `1797f442f846e8045618d74022800ed9dc1c72f581b1596f5a7636fba8cb4806`.
- Icon-qualified 650 ledger unchanged: `475be721949c4e38eb8de12f97abe553e6f10b6961c42190c9843fdc7efec337`.

Actual affected gates, existing Node24 PATH and installed Mint CLI; each exit 0:

- `npm run confidentiality:check`.
- `npm run external-links:check`.
- `mint broken-links`.
- `mint validate`.
- Product `scripts/repo-rules-gate.mjs --mode working --repo <docs checkout>`, with exactly the new full ledger and `SENDMUX_DOCS_VALIDATED=1` earned by the preceding checks.
- Strict Chromium render of `http://localhost:3000/changelog`: HTTP 200, exact URL, 230 headings, exact single visible paragraph, zero page/console/resource errors.
- `git diff --check`.

First render failed because the source apostrophe in `draft's` renders as `draft’s`. DOM diagnosis proved the sole typography difference; corrected browser expectation only, retaining every original assertion. Original checker and failure retained. Source paragraph and ledger hashes unchanged. Unchanged-page render receipts remain separately qualified to their original inputs; no blanket nine-page rerun claimed.

Owned preview session 36762 exited 0 after Ctrl-C; sampled process tree 82731/82767 independently absent. Checker pages and browser close in `finally`; no user browser tab created. Port 3000 listener-free and plain bind/listen verified on both `127.0.0.1` and `::1`. Immediate first socket verification returned `EADDRINUSE`; retained separately, then the same strict verification passed without source or socket-option changes. Complete process lifetime not claimed. No shared cache or foreign resource cleanup.

Private raw logs, source preparation, original failure, DOM diagnosis, corrected checker and cleanup: `sendmux/.claude/artifacts/monid-readiness/release-current-prep/docs-source-push-readiness-20261004/`. This evidence and `automation/` are excluded from the rendered site by `.mintignore`.

Remaining owning release gates: normal source push/PR/CI and review, deployed API acceptance, exact docs main merge/publication and public readback. Local full tooling/SDK/skills CI prerequisites were not recreated; unchanged receipts retain their original qualification. No OpenAPI/Postman regeneration, provider call, package/version change, main merge, publication or production change performed.
