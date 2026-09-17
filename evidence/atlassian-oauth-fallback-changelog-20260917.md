# OAuth fallback changelog

Prepared 2026-09-17 18:04; not published.

## Scope and preservation

- Adds one 17 September 2026 Bug fixes entry to `changelog.mdx`.
- Describes standard OAuth fallback URL support without changing setup instructions or claiming completed Atlassian acceptance.
- Existing entries, frontmatter, links and navigation are unchanged.
- Placement remains Product updates, outside sidebar groups.
- Engineering release notes are exempt from brand humanisation under the operator's current explicit instruction.

## Verification

- Confidentiality and external-link checks passed.
- Build validation and broken-link checks passed; retained logs are in `.claude/artifacts/atlassian-oauth-fallback-20260917/`.
- Fresh preview and page refresh displayed the entry with no browser console errors.
- Preview tab closed; the owned preview process and child were verified absent, with its port no longer listening.
- No executable code, generated contract, package version or tests changed.

## Release status

Product source commit `123c4f68690ea2e221bb3e3a6eb9c3483265648f` precedes this changelog commit. Its production-build browser candidate passed all 43 cases. Documentation publication and public-page readback remain open; the broader release and user-run Atlassian acceptance gates are unchanged.
