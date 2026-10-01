# Pro capacity copy hotfix

Goal: Publish reviewed Pro capacity copy and mandatory humanize instructions.
Base: `68764cd2e697350139131bc9eb1a91e9e0c69489`.

## Scope and authority

Exact approved copy items13–21 update Team limits, Billing, Sending accounts and the existing 1 October2026 allowance entry. No navigation, API, billing behaviour or auto top-up changes. Existing account and changelog content remains unchanged outside those approved units.

The product release source is `aef94c0dbbc293542bf340d53c0ccc60fe3dd7ef`. This change clarifies its published resource policy without adding shipped behaviour.

Operator's explicit `Approved` closes visual review, exact-source retention after unusable provider output, declining further automated rewrite attempts, isolated billing/changelog changes despite another live file lease and normal docs publication. Private approval receipt hash: `a8323a9b40537fa9179443e8caad664eb9890c1409e83c74c0eee16a2a0115d9`. Other sessions' leases and working files remain untouched.

## Agent instructions

`AGENTS.md` is the tracked source of existing owner-local guidance, with mandatory humanize discovery/use before drafting or finalising public text. Necessary technical terminology, identifiers, units, numbers and factual qualifications remain required.

Local `CLAUDE.md` remains a gitignored symlink. Existing `.mintignore` excludes both agent files and `evidence/` from publication. Local `/AGENTS` and `/CLAUDE` return404.

## Placement and preservation

Keep Guides → Account and billing → Billing and limits for charges/resource limits, Guides → Sending → Sending accounts for account capacity, and the navbar changelog for shipped changes. Full navigation and related pages reviewed. Reader tasks, frontmatter, headings, links, tables and page placements remain intact except the exact approved visible table-cell replacements.

Preservation check: all four page bodies match the frozen approved expected files; auto top-up guide and unrelated changelog entries remain byte-identical to base.

## Humanisation

[evidence ledger](pro-copy-hotfix-humanisation-20261001.json) records seven `pass-source-preserved-manual` units and two `excluded-frozen` table units, zero blocked units.

Two attempt1 outputs completed with `frozen-content-mismatch`. Outputs altered protected wording, invented/lost claims and split/dropped units. Canonical sentence-repair prohibition required restoring reviewed source. Source/raw/final detector scores remain43 and62, replayed only from identical content hashes. These scores reject transformed acceptance. Operator explicitly approved retaining exact source and declined further automated rewriting. No retry, fabricated passing score or unapproved provider wording.

Provider outputs, manifests and journals remain private. Historical ledgers unchanged. This evidence and agent-only instruction exempt from prose humanisation.

## Verification

Changed-doc candidate checks all exit0: confidentiality, external links, `mint validate`, `mint broken-links`, `git diff --check` and exact approved-copy preservation.

Tooling receipt remains valid:37 tests pass,0 skipped with SDK pin `9077b5668ac762971e4670270d6f6b38d2af7ab1`; Postman and MCP contract drift exit0. Their code, specs, snippets, lockfile and SDK inputs did not change. First invocation lacked required SDK environment; corrected invocation passed without altering tests.

Real-browser localhost Billing table and changed changelog paragraphs render reviewed wording. Other two changed guides previously reviewed. Actual visual approval is included in operator's consolidated receipt.

Private logs and detailed receipts: product MAIN `.claude/artifacts/pr-526-review-deploy/copy-hotfix-docs/`.

## Release

Owning docs-only fast path: normal fast-forward push from isolated branch to `main`, no PR or local MAIN mutation. Release requires exact remote commit, provider status and actual live HTML readback of four changed pages, with agent routes unavailable.

Rollback: revert this single commit and publish normally through the same owning docs workflow. No runtime migration or rollout.
