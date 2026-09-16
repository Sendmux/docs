# Combined routing API snapshots

Recorded 2026-09-16 16:04 Australia/Melbourne.

## Scope and provenance

Generated-snapshot-only prerequisite for the reviewed combined SDK release. Base: `e4535b4518d8a321a451c4c1691dfb32b4462c7a`. The four changed API/Postman artifacts match integrated commit `a2fc040521fda6a4233bf3b29b8d5f7a46b80888` byte for byte. No reader-authored page, MCP release pin, package version, workflow or publisher changed.

Snapshot SHA-256:

- `openapi-app.json`: `2e32e665c99d26d47b4c208ee2de76b6249a47129afdecab19ccf8f50712d409`
- `openapi-sending.json`: `c1f82f9b8944026571d9e66ae84d4bef90e6c575cc8a57127afcdc6e90aa7b0e`

The Management contract adds provider variables, the variable-update permission indicator, a list-specific provider model, and nullable applied delivery-group IDs in delivery logs. The Sending contract accepts one delivery-group ID or a non-empty array of up to 50 IDs. Source behaviour and cross-language consumers are covered by the combined implementation evidence in the SDK repository.

## Verification

- `npm ci --no-audit --no-fund`: pass; existing faker deprecation warning retained.
- `npm run postman:emit`: regenerated collections; only Management and Sending changed, Mailbox unchanged.
- `npm run postman:check`: pass.
- `npm run confidentiality:check`: pass; newly changed schema descriptions manually inspected.
- `npm run external-links:check`: pass.
- `npm test`: 12 passed, zero failures, zero skipped.
- `mint broken-links`: no broken links.
- `mint validate`: build validation passed.
- `git diff --check`: pass.
- Exact-byte comparison of all four artifacts against integrated commit: pass.

Local browser preview: navigation reached `/api/sending-accounts/update-a-sending-account`, rendered `variables`, replacement/omission/empty-map semantics and `update_variables`; `/api/emails/send-a-single-email` rendered `delivery_group` and the 50-ID bound. Screenshot inspected, no blank render or layout fault observed. Browser error-log readback was empty. No credential or API request was submitted. This is a docs render check, not production backend acceptance.

## Boundaries and cleanup

Humanisation: skipped, generated-artifact exemption. No tests added or removed by this tranche. No new rules needed.

The optional browser CLI was unavailable; native browser automation performed the preview instead. The optional CI monitor helper is absent; remote verification uses the existing GitHub CLI fallback.

Preview owner PID 46074, child/process group 46148 and Postman temporary directory were verified absent. Browser tab 1168359568 was closed and its absence verified. Local execution sessions 68626, 71998 and 86081 finished successfully.

Status at commit: local checks complete, ready for the repository's approved docs-only direct-main fast path. Remote CI and publication readback follow the push. Hosted Postman publication, full documentation finalisation, package releases, application deployment and production/manual acceptance remain separate gates.
