# Documentation project instructions

## Documentation authoring workflow

- For every new, moved, or materially edited reader-facing documentation page or prose block, read and follow `automation/docs-authoring-workflow.md` from placement audit through the canonical `AA-claude-prompts/humanisation-finalisation.md` provider-neutral guard, preservation, and release checks; any eligible prose unit blocks release.
- Reconsider an existing page's location whenever its scope changes; prior placement is evidence, not proof that the page still belongs there.
- Order top-level documentation groups for this developer-first audience: onboarding → developer tools → AI workflows → adjacent core workflows → configuration → operations → use cases and general integrations → administration; reassess neighbouring groups whenever one changes.

## About this project

- **Docs-only fast path:** After required local checks, push documentation-only changes directly to `main`; never open a PR or request AI review unless the diff includes executable code or tooling.
- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Postman collections

- `postman/*.postman_collection.json` are **generated artifacts — never hand-edit them.** They are produced from the committed `openapi-app.json` + `openapi-sending.json` by `scripts/emit-postman-collections.mjs`.
- After any change to those specs, run `npm run postman:emit` and commit the updated `postman/` files in the same change.
- CI (`.github/workflows/verify.yml`) runs tooling tests and `npm run postman:check` on every push + PR; it never receives a hosted Postman credential.
- Hosted collections are mapped in `postman/hosted-collections.json` and publish only from the exact `main` commit through `.github/workflows/publish-postman.yml`.
- Configure the protected `production-postman` environment before merge: require reviewers, set environment variable `POSTMAN_PUBLISH_PROTECTED=true`, and store `POSTMAN_PRODUCTION_API_KEY` as an environment secret, never a repository secret.
- The publisher backs up every hosted collection before the first write, verifies each readback, restores attempted writes on failure, and retains workflow evidence for 30 days. Do not run `postman:hosted:sync` locally without explicit recovery approval.
- The producer repos keep `openapi-app.json` / `openapi-sending.json` in sync with the live APIs; this repo only owns the spec → collection transform.

## External links

- Sendmux-owned links are root-relative, `sendmux.ai`, or `*.sendmux.ai`.
- Any other MDX link MUST use explicit `<a>` HTML with `rel="nofollow noopener noreferrer"` and `target="_blank"`.
- Never use Markdown syntax for non-Sendmux external links; it cannot set `rel`.
- CI runs `npm run external-links:check` and blocks unsafe external links.

## Terminology

{/_ Add product-specific terms and preferred usage _/}
{/_ Example: Use "workspace" not "project", "member" not "user" _/}

## Style preferences

{/_ Add any project-specific style rules below _/}

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- Never use Markdown bullet items in `changelog.mdx`; write standalone prose paragraphs.

## Content boundaries

{/_ Define what should and shouldn't be documented _/}
{/_ Example: Don't document internal admin features _/}
