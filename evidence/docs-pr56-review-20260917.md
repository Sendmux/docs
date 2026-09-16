# PR56 review corrections

Recorded 2026-09-17 07:45 Australia/Melbourne. This receipt covers the corrections over `afcbf4db36f9451e5eda4cce30f94a8ecb4964b2`, not public release.

Correctness: Both pinned checkout steps remove persisted credentials before later steps. The SMTP rejection paragraph now excludes shared-domain routing, which bypasses hint parsing at proxy `app/haraka/plugins/queue/bullmq.js:239–248`. The existing malformed-hint shared-domain tests cover this behavior. Evidence spacing changes preserve every non-whitespace byte.

Tests: No tests added or removed. Seven owning gates passed: 37/37 tooling tests with zero failures or skips, MCP contract, confidentiality, external links, generated Postman parity, broken links and build validation. The exact SDK fixture was `8a204d91eab96652ec39e9e59cef6280ef88b925`. ROOT repeated confidentiality and whitespace checks before commit.

Journeys: The affected SMTP paragraph rendered in a native browser at the exact local route and fragment, without horizontal overflow or console errors. Two browser-extension warnings were retained. This is a local desktop paragraph check, not production, mobile or an email-send journey. The initial preview expired during an interruption without inspection; the resumed preview supplied the missing check.

Editorial: The new atomic technical-reference paragraph has a hash-bound `ineligible-technical` row in `automation/ledgers/2026-09-17-smtp-routing-qualification.jsonl`; source and final hash are `2448e2deaf1402cf40981f5401bbb2941d08c66da3d6445b1941fc3c028db269`. No provider call or invented score. All 32 historical private evidence files and 153 unrelated tracked files remained unchanged.

Torn down: Both preview sessions ended normally. Recorded process handles/groups, both preview ports, 42 exact temporary paths, the detached SDK fixture path and registration, and the owned browser tab were verified absent. Shared resources were untouched.

Evidence: MAIN `.claude/artifacts/docs-pr56-review-20260917/` retains raw gate logs, preservation manifests, preview logs and cleanup receipts. The detailed private review report has SHA-256 `f6bf86435e2fedcb1d4fceb757d6db0b87205c1d6b24455015802498c9358adf`.

Status: Locally verified branch corrections; post-push CI/review settlement, compatible backend acceptance, public documentation and hosted Postman publication remain required. No new parked implementation work.
