# Select matching documentation evidence

Prepared on 21 September 2026. Source retention and exact documentation/changelog publication approved; all local publication gates passed, push pending.

## Placement

- Placement: Guides → Receiving → Mailboxes → Manage Inbox conversations
- Disposition: keep the account material in its existing pages and add a sibling Inbox task guide.
- Reader task: select conversations beyond the visible page and apply supported Inbox actions.
- Navigation: `mailboxes/inbox` precedes push delivery under Mailboxes.

## Source-backed changes

- Accounts documents visible-page, matching-account, and all-account selection; durable bulk updates; all-custom-account export; and completed/failed counts.
- Variable modes use the exact UI labels **Add or update**, **Remove**, **Replace all**, and **Apply changes**.
- Inbox documents the newest 50 visible conversations, matching/all scopes, context-reset behaviour, supported common actions, durable progress, paginated failures, and Trash behaviour where deletion is supported.
- The changelog contains no stale-variable-fix claim and uses prose paragraphs rather than bullet points.

## Humanisation

Ledger: `automation/ledgers/2026-09-21-select-matching.json`.

Attempt 1 completed for both eligible batches. The Inbox result failed with `frozen-content-mismatch`; the changelog result failed with `ambiguous-paragraph-mapping`. The reviewed source remains unchanged. The nine units are now `pass-source-preserved-manual` after explicit source-bound operator approval, with zero blocked units. No additional provider submission was made. Raw provider output and journals remain private under `.claude/artifacts/select-matching-docs/humanisation/`.

Protected UI labels, the number 50, selection scopes, context-reset conditions, supported-action qualifiers, and completed/failed semantics remain present. Frontmatter, heading hierarchy, component markup, link destinations, and historical changelog entries are unchanged except for the intended additions.

Inbox wording was corrected after review: selection uses the visible controls, and a failed conversation can contain messages already changed by completed batches. The two corrected units received separate source-bound retention approval. Their current hashes and completed manual checks are recorded; the superseded ledger and source are retained privately.

The account export wording was corrected after review: selection scopes apply to bulk changes, while the **Accounts** menu exports all custom accounts. This source-only factual correction was not resubmitted to the provider; the affected changelog unit received explicit source-bound retention approval with its current hash.

## Validation

- `npm test`: 37 passed, zero skipped, with the required SDK pin `9077b5668ac762971e4670270d6f6b38d2af7ab1`. The initial run without `SENDMUX_SDK_CHECKOUT` failed at fixture setup; using the pinned checkout required by CI passed with no source/assertion changes.
- `npm run mcp-docs:check` and `npm run postman:check`: passed. The initial Postman attempt lacked the declared dependency; `npm ci` installed the unchanged lockfile and the gate passed.
- `npm run confidentiality:check`: passed.
- `npm run external-links:check`: passed.
- `mint broken-links`: passed, no broken links.
- `mint validate`: passed.
- Initial `mint dev` attempt did not become ready and was stopped. A fresh diagnostic preview started successfully; all four changed reader pages rendered at the expected URLs with HTTP 200. Screenshot and console receipts: app `.claude/artifacts/select-matching/docs-preview-detailed.log` and `docs-*.png`.
- Preview is not a clean journey: the unchanged Sending accounts card in `sending/template-variables.mdx` uses `icon="mail"` (also present at the docs base commit), and the preview provider returns HTTP 403 for that icon. Navigation-prefetch requests were also cancelled. No uncaught page exceptions were recorded. The pre-existing icon issue is parked, with no unrelated source change.
- `git diff --check`: see final local verification receipt.

## Unchanged public surfaces

- README and website landing material: no change. This release documents dashboard task behaviour rather than a new positioning or onboarding promise.
- Skills: no change. No agent-facing command or workflow contract changed.
- SDK documentation: no change. The dashboard selection and background-operation UI does not change an SDK surface.
- OpenAPI and API reference: no change. No public HTTP schema, endpoint, request, or response contract changed.

## Release state

The operator approved exact reviewed source retention and the separate documentation/changelog publication packet. All five approved source files retain their recorded hashes. The six rejected, unchanged units retain attempt 1 history; the three corrected, never-submitted units retain attempt 0. No retry was submitted and no unavailable detector score is represented as passing. Publication follows the documentation-only direct-main workflow after final checks. Product merge, production migrations and Kubernetes mutations are outside this approval.

Validation receipts and publication verification remain under the app task artifacts; the product candidate is `3e953742d3c7d5e8320e55efcd682f2c0a0f5ad1`, with final browser acceptance at `225cce67bae3d5387f964c488596f425136f0293`. The original stale-variable report remains unreproduced.

Owned-resource cleanup: the detached pinned-SDK verification worktree was removed; both directory and Git registration are absent. Existing preview resources were already removed. `npm ci` reports five high-severity vulnerabilities in the unchanged docs toolchain; dependency changes are parked outside this prose-only publication.
