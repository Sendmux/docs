# Tooling security preparation — 2026-10-24

Status: code-only PR; no hosted publication performed. This evidence directory is excluded from site publication by existing configuration.

Based on main `67c2acf14bab7815f120315095ab674ed8e5c7ce`, rechecked against origin before editing. Public prose, API specifications and generated collections unchanged.

- Set CI tooling runtime to Node 22.23.4 and establish it before the first tooling invocation.
- Update existing js-yaml 5.x override to 5.4.1 and compatible fast-uri 3.x lock resolution to 3.1.9.
- Production audit exits 0 with zero findings. Full audit exits 1 with three high package entries from the unchanged Faker/collection/generator chain.

Faker remediation remains blocked by upstream compatibility: generator 6.4.1 still requires collection ^5; collection 5.3.1 still pins Faker 5.5.3. [GHSA-qxc2-j82w-r537](https://github.com/advisories/GHSA-qxc2-j82w-r537) requires Faker 10.5.0, whose API/export migration is incompatible with a blind override. No forced override or generator downgrade.

Native local checks on Node 24.22.1: locked install, confidentiality gate, external-link gate and collection drift check all exit 0. No tests added/changed/removed. Existing CI owns full tooling tests, pinned contracts and Node 22.23.4 qualification. Local raw outputs remain in excluded `.claude/artifacts/node-security-20261024/`.

Review: workflow/package/lock/evidence changes only. No content rendering journey needed for unchanged public surfaces. No hosted collection writes or release command invoked. Source rollback is a revert of this change; any future publication requires its own verified deployment and rollback. No rules change proposed.
