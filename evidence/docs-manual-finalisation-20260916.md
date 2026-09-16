# Manual documentation finalisation evidence — 2026-09-16

## Scope and authority

- Worktree parent: `a2fc040521fda6a4233bf3b29b8d5f7a46b80888`
- Original source baseline: `e4535b4518d8a321a451c4c1691dfb32b4462c7a`
- Operator exception: manual source retention for exactly 17 original units, approved 2026-09-16; only the three recorded semicolons could change.
- Publication, generated snapshot adoption, remote operations, and the final MCP release-facts pin remain owned by ROOT.
- Provider calls: zero. No source, raw, or final score was invented.

## Result

The 17-unit ledger has 17 unique `pass-source-preserved-manual` rows and zero `blocked-manual-review` rows. Fourteen units are byte-identical to their reviewed source. These three units replace one semicolon with one colon and change nothing else:

- `atlassian-p3`
- `oauth-p1`
- `sending-attachments-p4`

The private ledger SHA-256 is `bb5dcc0523538633df9084630b12527db89ca9af174d1ef75549fc7071f6f6fd`. The private preservation receipt records per-file and per-unit source/final hashes, the operator exception, actual manual checks, historical attempt provenance, and separate dispositions for all other inventoried ineligible/frozen units.

For the 11 historically submitted units, the ledger retains actual pre-attempt-2 source scores of 26 (Atlassian), 26 (OAuth), and 23 (Sending). The Atlassian raw score remains absent; OAuth and Sending retain their actual raw score of 1; all final scores remain absent because no acceptable provider candidate existed. The six historically unsubmitted units retain absent transport, attempt, and score fields.

## Correctness and preservation

The finalisation check bound each source hash to the retained manifests or prose inventory, each final hash to the current unit, and every attempted unit's protected anchors and inline technical tokens to the final text. It passed with this summary:

`17 unique units; 14 byte-identical; 3 semicolon-to-colon only; all retained anchors and inline tokens present; current final hashes match ledger.`

Whole-file source changes are exactly one `;` to `:` substitution in each owned page. Frontmatter, headings, code, links, tables, list/component structure, factual wording, qualifications, warnings, and every other byte remain unchanged.

The pre-existing dirty `changelog.mdx` remains byte-identical at SHA-256 `c84c0340f84d60afae07f9add4b1c2179bbd2e690559b458ad2e8c679766e589` and was not staged. The 33 historical humanisation artifacts remain byte-identical: their sorted file-hash list still hashes to `050b965d48d442a315e610c27648cefcbc96b15e2aa6085e82dfee15ed9b750c`.

The `sending-upload-token` no-send-access qualification is retained under the owning OpenAPI authentication split cited in `.claude/task-5-walter-repairability-review.md`. This is contract evidence, not a new production negative-authentication journey.

## Documentation workflow

- Placement: existing Guides → AI integrations → MCP → Client setup → Atlassian; Developer tools → OAuth; Guides → Sending → Attachments.
- Disposition: keep all three pages in place; reader tasks and navigation do not change.
- Humanisation: finalised through the approved manual source-retention exception; 17 `pass-source-preserved-manual`, zero blocked rows.
- Preservation: protected terms, claims, code tokens, numbers, links, and structure retain their reviewed source occurrences; only the three authorised punctuation bytes differ.
- Technical documentation self-review: the bounded unit set retains verified facts, second-person active developer-docs voice, Australian English, timeless wording, usable procedure structure, and descriptive links. This was not authority for broader wording changes.

## Checks

| Check | Result |
| --- | --- |
| Exact 17-unit source/final hash, occurrence, protected-anchor, and one-character whole-file diff check | Pass |
| `git diff --check` | Pass |
| `SENDMUX_SDK_CHECKOUT=/Users/rj/Desktop/GIT-REPOS/sendmux-docs/.claude/artifacts/task5-docs-sdk-46c36fe npm test` | Pass: 37/37, zero skipped |
| `npm run confidentiality:check` | Pass |
| `npm run external-links:check` | Pass |
| `npm run postman:check` | Pass |
| `mint validate` | Pass |
| `mint broken-links` | Pass |
| `node scripts/check-mcp-docs-contract.mjs --check --sdk /Users/rj/Desktop/GIT-REPOS/sendmux-docs/.claude/artifacts/task5-docs-sdk-46c36fe` | Pass against the retained exact pinned SDK commit `46c36fe4e23d6c8432a63a7548fa396a8079e4bf` |
| Same MCP contract check against `/Users/rj/Desktop/GIT-REPOS/sendmux-sdk-mcp-2-release` | Expected publication-gate failure: release worktree `d77a69b54946acceb0425751278a50227c5c7dde` does not match the generated pin `46c36fe4e23d6c8432a63a7548fa396a8079e4bf` |

The first bare `npm test` invocation failed before the MCP contract tests because `tests/mcp-docs-contract.test.mjs:10` requires `SENDMUX_SDK_CHECKOUT`. The fixture-bound rerun above is the canonical invocation and passed all 37 tests. The bare `npm run mcp-docs:check` likewise reported the required missing SDK checkout; the explicit retained-pin check passed.

Tests: +none −none. This change adds no behaviour or test surface; the existing repository suite and exact preservation check cover it.

Journeys: not run. This is a three-byte punctuation-only finalisation with no changed route, interaction, code sample, or rendered structure; the separate independent reviewer still owns final acceptance.

## Resource teardown

No server, browser, process, container, namespace, provider, email, database, or production resource was created. All 43 exact fixture/Postman temporary paths printed by the initial and configured check runs were individually verified absent after use.

## Completion

⏸ coded and locally committed by the containing commit; not published

Correctness: source → retained manifest/inventory → current final unit traced for all 17 rows; only three authorised punctuation bytes changed.

Tests: existing suite 37/37 with exact SDK fixture; static, Postman, Mintlify, diff, and preservation checks pass; no added or removed tests.

Journeys: not run — punctuation-only, no behavioural or structural change; independent review pending.

Evidence: this file plus private `.claude/manual-finalisation-17-ledger.jsonl`, `.claude/manual-finalisation-17-preservation.json`, and `.claude/manual-finalisation-17-report.md`.

Status: local preparation only; ROOT owns generated snapshot adoption, the release-facts pin, remote integration, and publication.

Torn down: 43 exact temporary paths verified absent; no persistent handle was created.

Parked: fresh generated MCP release-facts pin; ROOT publication; independent review; production/manual Atlassian acceptance.
