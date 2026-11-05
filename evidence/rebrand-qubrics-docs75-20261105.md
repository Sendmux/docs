# Docs #75: Qubrics rename

Status: coded, not merged or published. Acceptance remains blocked; no production mutation performed.
Source baseline: `03210aa92d7a81e1ca207f0a35102172696a1f1c` (`origin/main`).
Worktree: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs-rebrand-qubrics-docs75`, branch `agent/rebrand-qubrics-docs75`.
Remote verified as `https://github.com/qubrics/docs.git`; issue #75 assigned to `roshanjonah`.

## Scope and contracts

Spec: qubrics/qubrics `specs/rebrand-qubrics/spec.md`, A3/A5/A10-A18/A19. Display names and verified app/smtp/mail/A2A addresses change; accepted legacy contract identifiers remain exact. No package, version, module, CLI binary or marketplace identity was invented.

PR [#78](https://github.com/qubrics/docs/pull/78) was read first and is OPEN at `944a2a2c305dbdad5d687dbf0ee050556e9611e2`. It overlaps CLI/SDK/framework/client examples, webhook/header/environment/MCP aliases, changelog, OpenAPI snapshots and Postman collections. Its source, protected SDK pin and publication freeze are unchanged by this PR. The branding diff must be reconciled with #78 before either overlapping branch publishes; neither PR silently supersedes the other.

Source changes rename display copy and app/sending/mail/A2A setup addresses, central site name/canonicals/support/GitHub destinations and brand assets. Existing tab/group order stays intact. One compatibility page follows quickstart; the rename entry stays in the navbar-only changelog. The old X account URL, published package names, binary/formula/plugin labels, API identifiers, SDK/MCP runtime defaults and source-owned generated facts remain unchanged until their owners qualify replacements. Downloadable Postman collection titles/defaults change through their owning generator; filenames and credential variable names remain exact, and no hosted workspace sync runs.

The approved SITE candidate provides the Qubrics light/dark SVG logos (`SITE_qubrics.ai` source commit `f383dca6`, `public/logo-light.svg` and `public/logo-dark.svg`). Favicon and MailWizz diagram reuse the same logo emblem. Consent screenshot is cropped to the Product lines controls its caption describes, retaining all three surfaces, selections, permission controls and Authorise/Cancel. It contains no fabricated UI.

## Acceptance readback

| #75 requirement | Measured candidate evidence | Release status |
| --- | --- | --- |
| No page says Sendmux except changelog/compatibility | Display prose renamed across 86 existing MDX pages; current literal remnants include published PHP/Ruby namespaces, `SendmuxApiError`, `SendmuxToolkit`, `X-Sendmux-*`, signed Registry identity and marketplace UI labels. Current sending OpenAPI still contains old display text owned by overlapping #78. Screenshot OCR found one old-brand sentence; crop removes it while retaining task controls. | BLOCKED: accepted contracts are preserved; unpublished tooling and #78 prevent claiming literal acceptance. |
| Every host/package/CLI/install matches spec | New app/smtp/mail/A2A setup addresses use qubrics.com. New spec-named npm/PyPI/RubyGems/Packagist packages measured HTTP404; existing releases remain available. Skills marketplace/plugin still `sendmux`; Homebrew formula remains `sendmux`. MCP snippet is pinned at SDK `4b245f66d78068d7c326fb184887ffa7fc033feb`, resource `https://mcp.sendmux.ai/mcp`; latest PyPI metadata alone does not qualify a pin update. | BLOCKED by producer releases/qualification and #78. |
| docs.qubrics.com redirect configured and lands on qubrics.com/docs | Cloudflare read-only API finds no qubrics.com dynamic-redirect entry-point ruleset. Existing sendmux.ai rule preserves path/query in one301. Live docs.qubrics.com returned522/timeout; qubrics.com/docs returned522. | Not configured; explicit Ops ASK required. Target availability belongs to #901/SITE owner. |
| Changelog published | New 5 November2026 rename entry renders locally with exact `Qubrics (formerly Sendmux)` heading and compatibility link. | Unpublished; merge itself auto-publishes and requires Ops ASK. |

Registry audit and exact identifier classes: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/.claude/artifacts/rebrand-qubrics-docs75/contracts-audit.md`. Producer tickets still open at audit: SDK#343/#344, Skills#34, Homebrew#14 and PHP#4. Rust crate stays `sendmux`; spec names no approved new Rust crate or new Snap Store identity.

## Validation and copy

- `npm run confidentiality:check`: exit0, no forbidden terms in shipped surfaces.
- `npm run external-links:check`: initially exit1 on four new first-party Qubrics links. Root cause: `scripts/check-external-links.mjs:137` recognised only sendmux.ai. Extended its exact-host/subdomain predicate to qubrics.com; rerun exit0. Eight boundary assertions retain rejection of `notqubrics.com`, `qubrics.com.evil.test`, unrelated hosts and invalid URLs.
- `node --test tests/postman-collection-boundaries.test.mjs tests/docs-accuracy.test.mjs tests/webhook-verifier-example.test.mjs`: exit0, six tests passed, zero skipped after the review fixes. No assertions weakened, tests added or deleted.
- `mint validate` and `mint broken-links`: final copy exit0; review-fix reruns recorded in `mint-validate-review-fixes.log` and `mint-broken-links-review-fixes.log`.
- Chrome Agent preview `http://localhost:3075`: desktop home title `Welcome to Qubrics - Qubrics`; compatibility page title `Existing integrations - Qubrics`; mobile viewport390 has scrollWidth390; changelog exact former-name heading visibly renders; MailWizz image remains2400×1260. No page/hydration/console errors in inspected pages.
- Fresh-reader copy critique: compatibility page, new changelog entry and metadata passed every applicable polish rubric line. One humanize pass followed; protected hosts, identifiers, claims, headings, frontmatter and link destinations preserved. Compatibility sentence counts5,14,26,6,25,16,13,17,8; em dashes0, semicolons0, curly quotes0. Existing exact name/host substitutions use docs-authoring-workflow section4 token-correction exemption.
- `git diff --check`: exit0.

Independent standards/spec review found the same mechanical-substitution cause in five claim classes: released SDK defaults, pinned MCP defaults, Google Workspace app search name deferred by spec A19/#932, MailWizz selectable extension/server labels, and Postman defaults disagreeing with generated downloads. Restored the actual released/pinned default tokens and selectable legacy labels. Changed Postman definitions at `scripts/emit-postman-collections.mjs` and regenerated all three local collections; `npm run postman:check` and the existing collection-boundary test pass. OpenAPI inputs and hosted collection state remain unchanged. Protected package/header/environment/error-class/webhook/Registry identifiers had no occurrence reductions in the independent audit. No additional Microsoft lookup-label issue found.

Read-only release recheck after these fixes: `qubrics.com/docs` and `docs.qubrics.com` both still return HTTP522. PR #78 remains OPEN with its publication freeze. Required source CI and release review must settle on the correction commit before any publication ASK; green source CI cannot resolve these acceptance blockers. No task-owned build cache remains in this worktree; `node_modules` points to MAIN, so its shared cache is left alone.

Local logs/screenshots: `.claude/artifacts/rebrand-qubrics-docs75/` in MAIN. Bulk runs are not duplicated here. During image editing, an ungrouped resize affected both inputs; restored original from immutable HEAD and grouped the overlay resize, then verified dimensions and final image. No malformed image retained.

## Publication and rollback boundary

`README.md:45` says default-branch changes auto-deploy. GitHub deployment `7564973459` at baseline `03210aa92d7a81e1ca207f0a35102172696a1f1c` reports success to `https://sendmux.ai/docs`. Therefore merging this PR is itself publication and remains held for Ops approval.

Named source rollback: revert this PR's merge commit on main and observe successful Mintlify deployment restoring baseline docs. If main advances first, retain the then-current successful publication as rollback anchor rather than overwriting unrelated work. No DNS, Custom Domain, hostname or SITE proxy setting changes are authorised.

Named redirect rollback: disable only the newly created docs.qubrics.com redirect rule and read back `enabled:false`; baseline has no such rule. Preserve all other rules. Proposed forward rule mirrors existing docs.sendmux.ai: HTTPS docs.qubrics.com/* to https://qubrics.com/docs/${1},301, query preserved. Re-read current phase immediately before any approved create; do not overwrite concurrent rules.

Official canonical mechanism: [Cloudflare Single Redirects via API](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-api/). Read-only zone ID `456f796588a2c18a670572a8fd5b0364`; source legacy rule `2e57b1e764e2476899ce01467643faa8` in ruleset `e9dec9c3dd4f49a5bb11885ed13eb6ea` on sendmux.ai. No rule has been created by this task.

`rebrand-qubrics-901` owns the SITE proxy recheck after authorised docs publication. This PR does not claim that measurement.

## Completion state

Correctness: display rename is separate from retained contracts and unpublished producer names.
Tests: five focused existing tests pass; no new harness or dependency.
Journeys: local desktop/mobile docs inspected; public target522 prevents live acceptance.
Status: coded, not merged, unpublished; all four acceptance boxes remain open.
Parked: none. Producer release, PR78 reconciliation, live target and publication/redirect approvals are blockers, not deferred scope.
