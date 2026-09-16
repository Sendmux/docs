# MCP 2.1.0 documentation producer pin

Checkpoint: 2026-09-16 19:45. Status: locally verified; coordinated publication remains pending.

## Change and source

`scripts/mcp-docs-sdk.json` selects immutable SDK commit `8a204d91eab96652ec39e9e59cef6280ef88b925`, the published MCP 2.1.0 producer. The canonical `scripts/check-mcp-docs-contract.mjs` generator changes only the package version in `snippets/mcp-release-facts.mdx`, from 1.8.0 to 2.1.0. No protocol, tool count, resource URL, transport, limit, navigation, prose, or checker behavior changed.

Placement: unchanged MCP overview in Guides → AI integrations. Humanisation: skipped — metadata-only pin and generated artifact. The approved pages, editorial ledgers, preservation receipt, and existing dirty changelog remain byte-identical; seven protected hashes passed again before commit.

## Verification

- RED: pin-only `npm run mcp-docs:check` exited 1 with `stale snippet .../snippets/mcp-release-facts.mdx: changed fields: package.version`.
- GREEN: canonical `npm run mcp-docs:emit` regenerated the snippet; `npm run mcp-docs:check` passed against the exact detached producer checkout.
- `npm test`: 37 passed, zero failed or skipped. Tests: +0 / −0; this metadata adoption reuses the existing behavior-sensitive checker.
- Confidentiality, external-link, Postman drift, `mint broken-links`, and `mint validate` gates passed.
- Native browser preview at `http://localhost:3000/ai-integrations/mcp#mcp` displayed a readable, nonblank MCP facts block with package version 2.1.0. Inspected developer logs contained no errors and two unrelated browser-extension warnings. This was a local visual check, not a signed-in production journey or a complete network-capture assertion.
- Brave did not support content export. Visual and accessibility evidence remains in the session tool transcript; no portable screenshot or HTML export is claimed.

Raw outputs: `.claude/artifacts/docs-native-mcp-21/pin-only-red.log`, `local-gates.log`, and `protected-before.sha256` in the same directory.

## Cleanup and remaining gates

The owned preview tab `1168359648` was closed and absent from the subsequent tab inventory. Preview session `43529` terminated after Ctrl-C; listener PID `49455` and port 3000 were absent. Gate owner/children `44299`, `44345`, `44411`, `48397`, `48413`, `48429`, `48481`, and `48607`, plus their process groups and the preview PID/group, returned ESRCH. All 42 temporary path strings identified in the retained gate log were absent.

The clean, read-only detached SDK fixture at `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/.claude/artifacts/docs-mcp-21-sdk-8a204d9` was removed using `git worktree remove`; its filesystem path and Git registration were both verified absent. Older retained fixtures and historical evidence were preserved.

Only the pin, generated snippet, and this evidence are committed. Remaining native releases, Go module adoption, coordinated docs publication, app/proxy rollout, production verification, and the user's final Atlassian connection remain required for the full goal.
