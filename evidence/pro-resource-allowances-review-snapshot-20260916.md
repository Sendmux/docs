# Temporary allowance review snapshot alignment

Recorded: 2026-09-16 22:04

## Scope and publication boundary

This separate commit aligns only the temporary `agent/pro-resource-allowances` review branch with application commit `4506336cd92d91aad2c42fae6935335cab84f6c0`. The user authorised a temporary docs branch for app PR preparation without publishing unreleased policy; root explicitly authorised this generated-snapshot correction within that scope.

**Do not merge or publish this correction to docs main.** Preserve policy-doc commit `edb598d` separately and exclude this snapshot-only correction when preparing eventual policy publication. It does not change the application's API implementation or undo any other feature release. No main working tree, main ref or public documentation was written.

## Cause and canonical correction

App PR 526 CI failed `spec:check` because the docs branch inherited mailbox metadata schemas from `e4535b4` and provider-variable/delivery-group schemas from `b5d425c`; its app source does not contain those separate feature branches. There are 24 differing JSON paths, grouped under mailbox list/query/sync/thread metadata, provider variables and allowed actions/list schema, and delivery-log delivery groups. The allowance app emits JSON semantically identical to docs snapshot `e8e44918fe1185bf751c27aec5c7efe64afb22ce`.

Canonical per app `scripts/check-openapi-snapshot.mjs:16-38`: regenerate from the producer and replace the matching docs snapshot. Ran the actual `scripts/emit-openapi-spec.ts` from source `4506336c` directly into this worktree's `openapi-app.json`.

Canonical per docs `AGENTS.md:20-26`: regenerate Postman from the committed specs with `npm run postman:emit`. Only the Management collection changed. Mailbox and Sending collections remained byte-identical; `openapi-sending.json` remains unchanged because it belongs to the separate Sending API producer.

The inherited combined-release snapshot in docs main at `b5d425c` remains untouched with SHA-256 `2e32e665c99d26d47b4c208ee2de76b6249a47129afdecab19ccf8f50712d409`. Its provenance remains in `evidence/combined-routing-snapshots-20260916.md`.

## CI limitation

The app workflow `.github/workflows/deploy.yml:32-43` selects a same-name docs branch only for an in-repository PR. A main push selects docs main, which still carries the other feature schemas. This correction unblocks this PR's snapshot check only; it does not establish merge/main-build readiness. Reconcile the producer release dependencies and docs-main contract before claiming release readiness. Do not bypass the gate or publish these branch-specific removals.

Hosted Postman publication is unchanged and remains manual dispatch on exact main (`.github/workflows/publish-postman.yml:3-15`). No hosted operation was invoked.

## Verification

- `npm ci --no-audit --no-fund`: passed, 85 dependencies installed from the existing lockfile; existing faker deprecation warning. Initial Postman generation failed with `ERR_MODULE_NOT_FOUND` for `openapi-to-postmanv2` because this worktree had no installed dependencies; installing the existing lockfile resolved it without source/dependency changes.
- `npm run postman:emit`: passed; generated all three collections, only Management changed.
- `npm test`: **12 passed, 0 failed, 0 skipped**. No tests added, removed or altered.
- `npm run postman:check`: passed.
- `npm run confidentiality:check`: passed.
- `npm run external-links:check`: passed.
- `mint validate`: passed.
- `mint broken-links`: passed, no broken links.
- `SENDMUX_DOCS_REPO=/Users/rj/Desktop/GIT-REPOS/sendmux-docs-pro-resource-allowances pnpm spec:check` from the allowance app: passed.
- Generated snapshot equals the producer's canonical saved output byte-for-byte, and `e8e4491` semantically. Exactly 24 inherited future-schema differences confirmed.
- `git diff --check`: passed. Original `edb598d` reader-authored policy/changelog content remains unchanged.

Humanisation: skipped, generated-artifact exemption; this evidence is an engineering surface. No brand prose or provider calls. Browser preview was not rerun for a branch-only generated contract correction; Mintlify build/link validation passed and no UI or reader-authored page changed.

## Artifact hashes

- `openapi-app.json`: `7807ce9239527497bfe35d62dd931096e46200027aa34e414920f86176ee2990`
- `postman/sendmux-management.postman_collection.json`: `e8d903508e922951e9a562cd0e0867328d411ade2b448976a2c5aa148108e58a`

Local retained evidence: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/.claude/artifacts/pro-resource-allowances/review-snapshot-before.json`, `review-snapshot-semantic-diff.json`, `review-snapshot-validation.json`.

Status: local correction, not pushed or published by this step. Root owns push and app CI rerun. No background process, browser, container or hosted resource was created.
