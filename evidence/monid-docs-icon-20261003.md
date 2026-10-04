# Webhook guide icon correction

Status: rendered and visually approved locally; not committed, pushed or published.
Base: `a40f474a710a15d4396ffd3c5fa7fed4efca6552`.

The strict nine-page local preview failed because the existing `rotate-ccw` and `scroll-text` Card icons requested unavailable assets. Exact failure evidence: MAIN Sendmux `.claude/artifacts/monid-readiness/release-current-prep/docs-verification-current-20261003/resource-failure-diagnostic.log:1–4` (HTTP403).

Canonical per [Mintlify appearance settings](https://www.mintlify.com/docs/organize/settings-appearance): omitted `icons.library` selects Font Awesome. [Card `iconType`](https://www.mintlify.com/docs/components/cards) selects style, not another library. Prior researched source and HTTP200 replacement-asset evidence are retained in MAIN Sendmux `release-current-prep/docs-icon-current-20261003/handoff.md:6–19`; this source-only lane made no network calls.

Exact changes in `webhooks/setup.mdx`:

- Line96: `icon="rotate-ccw"` becomes `icon="rotate-left"`.
- Line111: `icon="scroll-text"` becomes `icon="scroll"`.

Replay keeps the counterclockwise meaning; logs keep the document meaning. No card title, body, href, order, column count, whitespace, frontmatter, wording or layout changed. Global icon-library change was rejected because it would affect every existing icon.

Original page SHA256: `15395713bd795ceca96b96b9e98db5d59b73a41018fc937b472d5d730a7d06b1`.
Corrected page SHA256: `209195ef489d4e8676c9490a022daf924428a31d76a72ff421f4f7166ce82c1d`.

Humanisation: skipped — exact technical-token correction, `automation/docs-authoring-workflow.md:59–63`. No paid rewrite or new prose disposition. New `automation/ledgers/2026-10-03-monid-icon-technical-correction.json` binds the new page hash and carries all21 existing unit evidence objects unchanged, with zero blocked rows. Original current and historical ledgers retain their original bytes and whole-page hashes; those old hashes are not represented as proof of the corrected page.

For an icon-only working diff, give `scripts/repo-rules-gate.mjs` the new21-unit ledger alone. Current consumer requires exactly one matching ledger per changed page and exact current page hash (`sendmux-monid-readiness-review-20261003/scripts/repo-rules-gate.mjs:567–578`). For the larger release diff, give each changed page exactly one ledger: assemble a new additive full inventory or explicitly partition ledger pages; do not combine this page with its old650-unit ledger entry or weaken the gate.

Owning docs `AGENTS.md:205,223–227` requires validation, frontmatter review and actual `mint dev` review before push; it imposes no pre-edit visual approval. Sendmux `AGENTS.md:276` separately requires Roshan's explicit approval of the actual localhost implementation before any visual push. Roshan approved the rendered Webhook replay and Delivery logs icons in Brave at `http://localhost:3000/webhooks/setup#related-guides` on 4 October 2026. Approval covers those two icon names only; no other UI authority inferred.

Accepted root checks: confidentiality, external links, `mint broken-links`, `mint validate` and the new650-only copy-evidence consumer each exited0. The unchanged strict nine-page render checker exited0; all nine pages rendered, including corrected setup assets. Logs: MAIN Sendmux `release-current-prep/docs-preview-current-20261004/{preview,strict-render}.log`. Published SDK pin `4b245f66d78068d7c326fb184887ffa7fc033feb` and immutable MCP2.2.0 remain unchanged. Normal docs CI `.github/actions/prepare-docs/action.yml:7–87` still owns pinned SDK/skills acceptance, tooling tests, MCP contract/discovery, external links and Postman drift. API-first publication order and exact release approval remain separate. Icon-only changes require no generated spec/collection regeneration.

Source-only child ran no runtime. Root subsequently ran the preview/render and displayed the actual implementation in Brave. Preview session61588 stopped with Ctrl-C, exit0; recorded PIDs49720/49782 absent and port3000 listener-free/reusable. Owned Brave tab1168374423 closed; checker session82743 exited0 with its browser closed in finally. Complete descendant lifetime was not captured. No commit, push or publication. `automation/` and `evidence/` remain excluded by `.mintignore:16–19`.

## Additive full release evidence

Future full-release consumer: `automation/ledgers/2026-10-03-monid-pr-prerequisites-icon-current.json` alone. It copies the existing650-unit current ledger, changing only setup's whole-page `candidateSha256` and adding two entries to its existing `priorEvidence` array. Those entries bind the unchanged old full ledger (`1797f442f846e8045618d74022800ed9dc1c72f581b1596f5a7636fba8cb4806`) and the21-unit technical correction (`dc13f66847439261c26fe2de2dc50394df9e49f3a1e05a2aa211c2db44601201`). Every existing row, disposition, prior metadata and other page hash remains unchanged; zero holds.

The consumer accepts `.pages[file].candidateSha256`, `.pages[file].proseUnits` and `.units` (`repo-rules-gate.mjs:567–595`). `priorEvidence` preserves provenance using an existing ledger field; no unsupported amendment field or gate-code change. Supply only this new full ledger for the release inventory: each of nine pages then has exactly one matching ledger. Historical and21-unit ledgers remain available as bound evidence, without being simultaneous consumer inputs.

Full-ledger assembly is source evidence only. Technical checks, actual localhost render and explicit visual approval are accepted as qualified above; owning release prerequisites and exact publication approval remain outstanding.
