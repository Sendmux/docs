# MCP discovery HTTP contract

Status: local candidate; not published.

Trace: `scripts/check-mcp-discovery.mjs:5` requests
`https://sendmux.ai/.well-known/mcp.json` without following redirects and
requires exact HTTP 200, application/json, valid JSON, Sendmux identity and
the existing `https://mcp.sendmux.ai/mcp` endpoint. `package.json` exposes the
check; the existing prepare-docs action runs it before publication.

Red: before publication, the actual hosted path returned
`https://sendmux.ai/.well-known/mcp.json must return HTTP 200, got 404`.
Green: the checker passed against the website production build. Seven test
results cover valid discovery and rejection of missing paths, redirects,
HTML fallback, malformed JSON and a different endpoint. Final docs suite:
46/46, zero skips. No pre-existing test removed or weakened.

Artifacts: docs MAIN `.claude/artifacts/install-surface/`:
`docs-live-discovery-red.log`, `docs-local-discovery.log`,
`docs-final-pinned-tests.log`. Website MAIN:
`site-production-final-link-headers.log`, `site-distribution-receipt.json`.

No customer prose added; this file is agent-only evidence excluded by
`.mintignore`. Website discovery must deploy before this live docs gate.
Live HTTP acceptance remains pending. Rollback: revert this check commit.
