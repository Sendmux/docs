# Provider-variable correction documentation

Recorded 2026-09-17 08:57 Australia/Melbourne. Locally verified preparation, not public release.

Correctness: Four approved paragraphs document the app's empty bulk-replace confirmation and the proxy's protected-message substitution exclusions. The guide remains under Guides → Sending → Send email → Template variables. No navigation, existing prose, generated snapshot or API contract changed.

Source: App `bulk-provider-variables-dialog.tsx:61–73/:148–159` validates before requesting confirmation; cancellation performs no write. Proxy `app/consumer/lib/email-content-processing.js:57–82/:830–833/:1004/:1208–1224/:1319–1323/:1347` excludes attachments, protected MIME ancestry and attached messages on normal and fallback paths. The wording does not claim end-to-end arbitrary-byte preservation.

Tests: No tests added or removed. Fresh confidentiality, external-link and whitespace gates passed. `mint validate` and `mint broken-links` passed. Product behaviour tests were read, not rerun for this prose-only correction; their owning release gates remain separate.

Journeys: Both changed pages rendered at their exact local URLs at desktop 1440×1000 and mobile 390×844 sizes. All four paragraphs were visible, nonblank and within the outer viewport. Existing internal code/table scrolling remains. The console readback contained four browser-extension warnings and no application errors; this was not an instrumented failed-request/pageerror-history assertion. Search was not activated.

Editorial: The four hash-bound rows in `automation/ledgers/2026-09-17-provider-variables-review.jsonl` contain one atomic `ineligible-technical` and three below-submission-floor `ineligible-manual` dispositions. Source and final bytes match. No provider call, invented score, historical-ledger rewrite or unresolved manual-review row was introduced.

Preservation: Before adding this receipt, all 156 unrelated tracked files, six prior tracked ledgers and 32 historical private receipts were byte-identical. Removing exactly the four approved paragraph additions reconstructed both baseline page hashes. Final source SHA-256: guide `174210f1eb5738efa856536534ad71db99c4de6fa4dcc85dfeb36792a8851a36`; changelog `952ca8986c196545a4254241f1ab80c6fec5cc0d90278ca2ae94450bec7fc09f`; new ledger `f4e1339149b50f1bb67cedf5200a8a210324c5ab5d13d3cfe135705cc349ed02`.

Torn down: The owned tab was closed and its filtered readback was empty; the user's existing browser remained open. All ten recorded signed process/group handles returned ESRCH and port 65533 returned ECONNREFUSED. Mintlify had listened on all interfaces, not loopback only. No container, temporary checkout or browser profile was created.

Evidence: Private `.claude/pr527-pr65-doc-correction-report.md` and `.claude/pr527-pr65-doc-correction-final-receipt.json` retain exact handles, source preservation and gate results. Raw Mintlify log SHA-256 `488fcfee72ce31dfb06a9bffc841aed52f69e554bcd670a28c32d5a932e935d1`; preview log `8731569e5fa46eb520dde55e7dddd9c8c91be68a3453382a21ef25d5f7b975f0`. Screenshots are in the tool transcript, not fabricated filesystem paths.

Status: Final docs commit and preparation-branch push must follow both product commit timestamps. Public documentation and hosted Postman publication still require compatible backend acceptance. No unrelated work was added.
