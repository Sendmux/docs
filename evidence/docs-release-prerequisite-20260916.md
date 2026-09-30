# OAuth documentation branch prerequisite

Recorded 2026-09-16 23:00 AEST. This is prepared branch evidence, not public release or deployment acceptance.

## Scope and preservation

The app's ordered changelog prerequisite consumes the existing OAuth draft without changing its wording or date. The draft is committed after app product head `622bee68b81e2ae67d466cde896d3f566c89ffbc`; final publication must still reconcile the actual rollout date and released native package facts. No docs-main merge or hosted Postman write is authorised by this receipt alone.

- Prepared docs source: `21e794e7eeea3dffffe1897e06184ba4bfa3992c`.
- Full changelog SHA256: `c84c0340f84d60afae07f9add4b1c2179bbd2e690559b458ad2e8c679766e589`.
- Unchanged 45-word OAuth unit SHA256: `0101ad3db715afd233af47c192d77e21b2397873babc205d0c055a51de19e063`; its existing manual disposition remains limited to those exact bytes.
- App snapshot SHA256: `2e32e665c99d26d47b4c208ee2de76b6249a47129afdecab19ccf8f50712d409`.
- Sending snapshot SHA256: `c1f82f9b8944026571d9e66ae84d4bef90e6c575cc8a57127afcdc6e90aa7b0e`.
- The prepared branch contains the already-reviewed combined snapshots. Integrating published snapshot commit `b5d425cf40d1f1af8add6af446a565a515b40f2d` requires only its evidence file; no generated schema, collection, or reader-facing content needs replacement.

## Fresh verification

All seven commands exited 0: `npm test` (37 passed; zero failures, cancellations, skips, or todo cases), `npm run confidentiality:check`, `npm run external-links:check`, `npm run postman:check`, the pinned MCP docs check, `mint validate`, and `mint broken-links`.

The MCP check used an exact, clean detached checkout of published producer `8a204d91eab96652ec39e9e59cef6280ef88b925`. Before/after verification found all 153 tracked files byte-identical, with only the pre-existing changelog draft dirty. ROOT inspected command results and the draft diff; `git diff --check` passed. No test was added, deleted, or weakened.

Receipts: MAIN `.claude/artifacts/docs-release-prerequisite-20260916/`, including per-command logs, `preservation.json`, and `cleanup-gates.json`. The verifier confirmed 21 recorded process/group handles and 40 exact generated fixture paths absent. The temporary SDK checkout was shared read-only with the app's completed card/unit checks and is removed after both consumers finish.

## Remaining acceptance

No new rendered preview was run for this byte-preserved prerequisite; the previously reviewed docs rendering is retained history, not a fresh public-site check. Final native-version adoption, actual release-date alignment, normal PR/review/merge for the executable docs checker, public rendering and byte checks, app/worker/proxy/hosted MCP rollout, production contract canaries, and the user's fresh Atlassian connection result remain open. Engineering evidence is excluded from the rendered site by `.mintignore`; this receipt adds no reader-facing prose or humanisation request.
