# Provider variables and per-message routing documentation evidence

Status: prepared on `agent/mailbox-variables-routing`; prepared as a local integration commit; not pushed or published. The coordinated release hold remains binding.

## Placement and contract

Placement: Guides → Sending → Send email → Template variables; existing HTTP/SMTP guides link to that reference. Sending accounts and Delivery groups retain configuration guidance; Sending API → Overview → Errors retains the error reference. Delivery log display/export guidance stays under Monitoring.

Disposition: one new reference page; existing pages remain in place. The complete navigation was reviewed. No top-level tab changed. Generated endpoint detail remains in API tabs.

The guides document all seven existing tags and their actual sources/fallbacks, selected-provider custom variables, raw nonrecursive substitution, exact key/value/count bounds, shared Amazon SES variables-only editing, bulk merge/replace/remove, HTTP/SMTP routing syntax, credential authority, forced shared-domain routing, errors, stripping and nullable log snapshots. Multiple requested groups form an eligible-provider union, not an ordered fallback list.

The unpublished changelog block describes account variables, per-message groups and encoded-subject substitution. Its date must match the eventual coordinated release if that occurs later.

## Generated contract artifacts

Snapshots were emitted from refreshed product worktrees, including the held app modernisation base and generated migration 0103. Final local product identities are app `29691304c1415ccee287a364c94914479b58e54b` and proxy `c2633d5bb265f386a994360e54a766827b8501ba`; their source-generated snapshot checks passed:

- `openapi-app.json`: SHA-256 `2e32e665c99d26d47b4c208ee2de76b6249a47129afdecab19ccf8f50712d409`.
- `openapi-sending.json`: SHA-256 `c1f82f9b8944026571d9e66ae84d4bef90e6c575cc8a57127afcdc6e90aa7b0e`.
- Postman collections were regenerated from those snapshots in this change. Mailbox collection output is unchanged.

Both product spec checks used this explicit docs checkout and passed. The SDK release owner must regenerate from the combined snapshots after integrating reviewed commits; published versions remain immutable.

## Humanisation and preservation

The docs workflow enables the canonical per-unit technical-reference exemption. Each qualifying paragraph/list item is source-backed and byte-identical to its frozen source; no blanket page exemption was used.

- `automation/ledgers/2026-09-16-mailbox-variables-routing.json`: 49 units; 47 technical reference units and 2 short manual units; zero blocked units.
- `automation/ledgers/2026-09-16-mailbox-variables-routing-changelog.json`: 3 technical reference units; zero blocked units.
- All eight frozen guide/config files match final bytes. All three changelog source/final prose hashes match. Protected structure, identifiers, limits, scope qualifiers and links are unchanged.
- Frozen source and review artifacts: `.claude/artifacts/mailbox-variables-routing/docs-humanisation/` in the main docs checkout. No provider call was required for these eligible dispositions.

## Verification

All checks passed without skipped tests:

- Tooling: 12 tests, 0 failures, 0 skipped (`docs-tests-final.log`).
- Confidentiality and external links (`confidentiality-final.log`, `external-links-final.log`).
- Postman regeneration drift (`postman-final.log`).
- Mintlify validation and broken links (`mint-validate-final.log`, `mint-links-final.log`).
- Seven changed guide pages were read in the native browser preview with expected URLs and no errors (`preview-journeys.json`).
- The new changelog block rendered at `http://localhost:3147/changelog`, with the three expected sections and no browser console errors (`preview-changelog-result.json`).

Raw verification logs live under `.claude/artifacts/mailbox-variables-routing/` in the main docs checkout. Preview tabs were closed; exact server PIDs 57899/57900 and 76868/76879 were verified gone (`preview-cleanup.json`, `preview-changelog-cleanup.json`).

Internal release evidence is explicitly excluded from the documentation build by `.mintignore`.

## Release and parked items

No hosted Postman write or documentation publication occurred. Product/SDK release integration, final versions, major reviews, migration/deployment order and production acceptance remain with the coordinated release. Docs-only direct-main publication must wait for that hold to be lifted.

The unchanged docs lockfile reports five high-severity dependency advisories during installation. Dependency changes are outside this feature and were not made.

The app generic workspace scanner has a pre-existing worktree-basename and substring false positive for approved SDK names and `Go` inside `Google`. The owning docs confidentiality suite passed again (`confidentiality-precommit-owner-20260916.log`); the generic run had no AU-spelling finding, and the preserved manual prose ledger remains valid. No historical wording or scanner was changed.
