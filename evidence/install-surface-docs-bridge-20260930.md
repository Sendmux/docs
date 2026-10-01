# npm MCP bridge documentation

Status: local candidate; not published.

Trace: `scripts/check-mcp-docs-contract.mjs:52` checks the exact SDK checkout
and all consumed Git blobs before projecting package and registry facts.
`scripts/mcp-docs-sdk.json` pins SDK `4b245f66d78068d7c326fb184887ffa7fc033feb`.
The snippet records PyPI `2.1.3`, npm `1.0.0`, registry metadata `2.1.4`,
and the existing 54-tool contract independently. `ai-integrations/mcp/index.mdx`
adds stdio bridge setup with Node.js 22 and hosted OAuth.

Red: the new independent-version test failed with `ENOENT` for
`packages/ts/mcp/package.json` when the old checker did not supply the npm
package root. Green: final docs suite 46/46, zero skips; pinned contract check,
confidentiality, external links, Mintlify validation and broken links passed.
No tests removed. The test preserves the PyPI version when npm and registry
metadata advance; temporary Git writes are restricted to owned fixtures.

Placement: Guides / AI integrations / MCP; keep existing page and navigation.
Humanisation: new prose is below the submission floor, preserved byte-for-byte
with manual checks in `install-surface-docs-copy-20260930.jsonl`. Commands,
configuration, tables and generated release facts are frozen technical data.
This file is agent-only evidence excluded by `.mintignore`.

Artifacts: docs MAIN `.claude/artifacts/install-surface/`:
`docs-mcp-versions-red.log`, `docs-mcp-versions-green.log`,
`docs-final-pinned-tests.log`, `docs-final-pinned-contract.log`,
`docs-confidentiality.log`, `docs-external-links.log`,
`docs-final-mint-validate.log`, `docs-final-mint-links.log`.

Browser preview: blocked by client/extension; no rendered acceptance claimed.
SDK README copy approval and hosted OAuth acceptance remain separate blockers.
Publish SDK package/registry first; then release these docs. Preserve upstream
main changes during integration. Rollback: revert this documentation commit.
