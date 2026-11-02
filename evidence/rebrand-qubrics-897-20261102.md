# A15: current GitHub repository references

Part of qubrics/qubrics#897 and #894. Base: `3aebf537d97f79211bcf7fba9019642950946150`.

Change only repository identity tokens: docs preparation checks out `qubrics/qubrics-sdk` and `qubrics/skills`; agent-skill installation instructions use `qubrics/skills`; the MailWizz archive URL uses `qubrics/mailwizz-smtp-proxy`. Existing names, package commands, service hosts, external-link attributes and historical ledgers/changelog stay intact. The existing guide test expects the new canonical install repository.

Verification (MAIN control-plane `.claude/artifacts/`):

- `SENDMUX_SKILLS_ROOT=/Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-qubrics-897 node --test tests/agent-access-docs.test.mjs`: 4 passed, 0 failed, 0 skipped; `rebrand-qubrics-897-docs-tests-final.log`.
- Initial invocation omitted that documented environment variable and failed `SENDMUX_SKILLS_ROOT must name the approved canonical skills checkout`. Supplied the fixture dependency; no assertion weakened.
- `npm run confidentiality:check`: passed; `rebrand-qubrics-897-docs-confidentiality.log`.
- `npm run external-links:check`: passed; `rebrand-qubrics-897-docs-links.log`.
- `git diff --check`: passed. Full repository gates run in existing PR CI.

Polish pass: skipped — exact technical-token corrections, per `automation/docs-authoring-workflow.md` section 4. No new prose, claims or placement change.

Coordination: Ops Watch assigned `developer-tools/cli.mdx` line 40 (tap owner) and line 49 (SDK release URL) to #904 at 18:10 AEDT. This branch does not edit that claimed file; the corpus acceptance requires the companion #904 change too.

State: source-only PR preparation; no merge, docs publication or deployment performed. CI and final independent code-review results are reported with the PR handoff.
