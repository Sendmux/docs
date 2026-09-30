# Pro resource allowance release reconciliation

Product source: `a1b91954f08d2d1605cb69e0589e6c99d10bddb4`, committed 2026-09-30T22:45:16+10:00.
Docs base: `cff4bbe259ed9f10990c75be4295d913c4a75149` (fresh origin/main).
Publication label: 30 September 2026; root supplied intended actual release date. Reconfirm label if publication slips.

Status: reconciled release candidate, committed after product source; not pushed or published by this preparation. Coordinated product rollout/publication remains root-owned.

## Policy, placement and preservation

Applied only approved policy from `edb598d` and reservation sentence from `5965f5b`. Body paragraphs and table cells remain byte-identical; the changelog date label is the sole approved metadata adjustment. Existing historical approval evidence `pro-resource-allowances-20260916.md` is retained byte-identically. No new public prose or humanisation retry. Zero blocked copy units; prior policy dispositions and reservation manual exemption remain applicable.

Placement: Guides → Account and billing → Billing and limits → Billing/Team limits; Guides → Sending → Sending accounts; global Product updates. Disposition keep. Page scopes, navigation, related tasks and hierarchy unchanged.

Every newer current-main billing assertion/ledger and changelog entry is preserved. Removing the one inserted allowance block yields current-main changelog byte-for-byte. Current API specs, all three Postman collections and navigation remain byte-identical to current main. Fresh reconciled product matches all 191 schemas; no API additions/removals.

Public release ancestry excludes historical snapshot-removal commit `349b2e3` and its review-only evidence. A separate forward-only review merge may retain the old temporary remote branch ancestry solely for PR snapshot CI; never publish that review history to main.

## Fresh validation

- Tooling: `SENDMUX_SDK_CHECKOUT=<pinned SDK checkout> pnpm test` — exit 0, 37 passed, 0 failed, 0 skipped.
- Fixture source: SDK `9077b5668ac762971e4670270d6f6b38d2af7ab1`, required by `scripts/mcp-docs-sdk.json` and `.github/actions/prepare-docs/action.yml`.
- `pnpm mcp-docs:check`, `pnpm postman:check`, `pnpm confidentiality:check`, `pnpm external-links:check` — each exit 0.
- `mint validate`, `mint broken-links` — each exit 0, build valid and no broken links.
- Product `SENDMUX_DOCS_REPO=<isolated docs checkout> pnpm spec:check` — exit 0.
- Exact source/history/approval/contract preservation and `git diff --check` — exit 0.

No tests added, changed, deleted or skipped. No hosted Postman publication, provider call or production mutation. Fresh rendered browser preview was not repeated: approved source/navigation unchanged; fresh build/link checks performed. Temporary SDK fixture worktree removed after checks. Main docs user checkout untouched.

Private receipts: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/pr-526-review-deploy/docs-reconcile.md`, `docs-final-gates.json`, `docs-final-mint-gates.json`, `docs-final-*.log`, `docs-reconcile.diff`.
