# Focused skill documentation and release freshness

Status: local candidate; not published.

Trace: `ai-integrations/agent-skills.mdx:73` adds canonical install commands
for `agent-email-inbox` and `email-for-ai-agents`. The workflow table lists
every skill in the approved canonical catalogue. The client installation
table and canonical repository identity remain unchanged.

`.github/actions/prepare-docs/action.yml` resolves the latest skills release,
downloads its `acceptance.json`, checks out the exact accepted revision,
checks the release tag against that revision, and invokes the shared receipt
verifier before tests consume the catalogue. Missing/stale acceptance fails
closed rather than comparing against a mutable local branch.

Red: the new catalogue check failed with
`the guide must list every canonical skill exactly once`, reporting both
focused skill rows missing. Green: final docs suite 46/46, zero skips;
confidentiality, external links, Mintlify validation and broken links passed.
No tests removed. This source check retains the only coverage of documented
install commands and catalogue completeness, as required by the task.

Placement: Guides / AI integrations / Agent Skills; keep existing page.
Humanisation: changed eligible prose totals eight words, below the submission
floor; exact source retained with manual checks in
`install-surface-docs-copy-20260930.jsonl`. Install commands and tables are
frozen. This file is agent-only evidence excluded by `.mintignore`.

Artifacts: docs MAIN `.claude/artifacts/install-surface/`:
`docs-agent-contract-red.log`, `docs-agent-contract-green.log`,
`docs-final-pinned-tests.log`, `docs-final-mint-validate.log`,
`docs-final-mint-links.log`.

Release prerequisite: publish canonical skills with a verified acceptance
asset before this workflow goes live. Browser preview is blocked; no rendered
or published acceptance claimed. Rollback: revert this documentation commit.
