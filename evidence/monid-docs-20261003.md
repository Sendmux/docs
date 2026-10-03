# Agent-email documentation source candidate

Goal: Deploy complete Sendmux agent-email workflows, publish matching API/tooling/docs/skills, and submit a tested Monid connector PR; Monid controls final listing.

Status: local source candidate; no deployed API or public documentation release claimed. Product source commit: `da17913ef1fbe4831b4d71713cfef01ca8a1265d`. The later standalone-layout correction changes packaging and verification, preserving this candidate's API and guide contracts.

The App snapshot covers 83 paths and 109 operations. Guides document saved drafts and revisions, scheduling, message content and attachment text, integration inbox lifecycle, mailbox costs and webhook signature verification. Generated Postman collections use the owning emitter. Existing unrelated billing documentation and changelog history remain preserved.

Current copy evidence: `automation/ledgers/2026-10-03-monid-pr-prerequisites-current.json`, 650 units across nine pages, zero held. Approved source retention remains source retention, not a passing detector score. Historical ledgers are unchanged. Placement and preservation follow `automation/docs-authoring-workflow.md`.

Current-owner technical checks passed: Mintlify validation and broken links, confidentiality, external links, all nine frontmatter checks, Postman generation drift and existing MCP/discovery contract checks. Retained executable checks cover 49 tests with zero skips. Evidence: product MAIN `.claude/artifacts/monid-readiness/release-current-prep/docs-verification-current-20261003/handoff.md` and adjacent `verification-results.json`.

Rendered preview: all nine pages loaded with HTTP 200 and content headings, but strict acceptance FAILED on two unchanged baseline icon requests on `webhooks/setup.mdx`: `scroll-text.svg` and `rotate-ccw.svg` under the external Font Awesome asset path returned HTTP 403. No errors suppressed. Original log and diagnostic URL evidence are retained in adjacent `inspect-render.log` and `resource-failure-diagnostic.log`; signature/changelog follow-up records remain separate.

Cleanup verified: owned preview PIDs 66263 and 66299 absent; port 3000 reusable. Browser inspection closes its browser in `finally`. Evidence: adjacent `preview-cleanup.log`. Complete process-lifetime sampling is not claimed.

Published MCP facts remain pinned to `4b245f66d78068d7c326fb184887ffa7fc033feb`. Changed SDK source `7e867c5bd7b7c85add27c7c04e036997ae57dbc4` requires a fresh package release; this candidate does not attribute its changed tools to published 2.2.0.

Remaining: resolve rendered-docs blocker, normal source/CI review, deployed API acceptance, approved publication and independent public readback. Nothing shipped.
