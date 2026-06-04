> **First-time setup**: Customize this file for your project. Prompt the user to customize this file for their project.
> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Postman collections

- `postman/*.postman_collection.json` are **generated artifacts — never hand-edit them.** They are produced from the committed `openapi-app.json` + `openapi-sending.json` by `scripts/emit-postman-collections.mjs`.
- After any change to those specs, run `npm run postman:emit` and commit the updated `postman/` files in the same change.
- CI (`.github/workflows/verify.yml`) runs `npm run postman:check` on every push + PR and **fails on drift** — a spec update cannot merge without the matching collection regeneration.
- The producer repos keep `openapi-app.json` / `openapi-sending.json` in sync with the live APIs; this repo only owns the spec → collection transform.

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

## Content boundaries

{/_ Define what should and shouldn't be documented _/}
{/_ Example: Don't document internal admin features _/}
