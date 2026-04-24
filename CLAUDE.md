# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sendmux documentation site built on [Mintlify](https://mintlify.com). Sendmux is an intelligent email layer that routes emails through multiple delivery providers. Docs are hosted at `https://docs.sendmux.ai`.

## Commands

- `mint dev` — local preview at `http://localhost:3000`
- `mint broken-links` — check for broken links
- `mint update` — update Mintlify CLI if dev environment isn't working

Install CLI: `npm i -g mint`

## Architecture

- **`docs.json`** — central config: navigation, theme, API specs, fonts, anchors
- **Pages** — MDX files with YAML frontmatter (`title`, `description`; add `keywords` for SEO)
- **`style.css`** — global typography overrides (letter-spacing, font smoothing)
- **`.mintignore`** — excludes `drafts/`, `*.draft.mdx`, `CLAUDE.md` from builds

### Navigation structure (3 tabs)

1. **Guides** (`guides/`) — getting started, sending emails, AI integrations
2. **Sending API** (`sending-api/`) — auto-generated from `https://smtp.sendmux.ai/api/v1/openapi.json`
3. **Management API** (`api-reference/`) — auto-generated from `https://app.sendmux.ai/api/v1/openapi.json`

API reference pages for endpoints (e.g. `POST /emails/send`) are generated from remote OpenAPI specs, not local files. Only the overview/introduction pages are local MDX.

### Two separate APIs

| API | Base URL | Purpose |
|-----|----------|---------|
| Sending API | `smtp.sendmux.ai/api/v1` | Email delivery (send, batch send) |
| Management API | `app.sendmux.ai/api/v1` | Read-only: providers, metrics, logs, billing |

## Content patterns

Mirror the patterns Mintlify uses in [their own docs repo](https://github.com/mintlify/docs).

### Frontmatter by page type

| Field | When to use |
|-------|-------------|
| `title`, `description`, `keywords` | Every page (3–7 keywords) |
| `sidebarTitle` | When `title` is too long for the sidebar |
| `icon` | Group landing pages (Lucide icon name, e.g. `rocket`, `key`) |
| `openapi` | API endpoint pages — auto-renders request/response from the spec |
| `mode: "frame"` | Landing pages without normal chrome |
| `noindex: true` | Internal or meta pages excluded from search |

### Navigation (`docs.json`)

- Tabs → Groups → Pages. Nest with `{ "group": "X", "root": "path/index", "pages": [...] }` once a group exceeds ~6 pages.
- Use `index.mdx` as a group's `root` when nesting.
- Give each top-level group a Lucide `icon`.

### Page skeleton

1. One-paragraph intro (what + why).
2. Prerequisites — `<Info>` or `<Note>` callout if any.
3. Body: `<Steps>` for tutorials; H2/H3 for reference.
4. Next steps — 2–4 `<Card>` elements inside `<Columns>` linking to related pages.

### Components (preferred usage)

- `<CodeGroup>` for multi-language samples (curl/JS/Python). Matching titles sync tabs across the page.
- `<Steps>` for sequenced tutorials — not manual `1. 2. 3.` lists.
- `<Tabs>` for non-code content toggles (platforms, UI modes).
- `<Card>` + `<Columns>` for landing pages and "Next steps" grids.
- `<Note>` / `<Tip>` / `<Warning>` / `<Info>` for inline emphasis — one line each.
- `<Accordion>` / `<AccordionGroup>` for FAQs and optional detail.
- `<ParamField>` / `<ResponseField>` for hand-authored reference tables.

### Images

Wrap in `<Frame>`, always include alt text, store under `images/<section>/`.

```mdx
<Frame caption="Short caption">
  <img src="/images/guides/dashboard.png" alt="Dashboard with metrics panel open" />
</Frame>
```

### Reusable fragments

Put repeated prereqs, next-steps, or legal blurbs in `snippets/*.mdx` and import them:

```mdx
import Prereqs from '/snippets/prereqs.mdx'

<Prereqs />
```

### API reference — hybrid pattern

- Handwritten `overview.mdx` per resource: intent, use cases, list of endpoints with root-relative links.
- Endpoint pages use `openapi: "POST /emails/send"` in frontmatter — Mintlify renders request/response panels from the spec. Any hand-written prose (rate limits, edge cases) sits below the frontmatter.

### Redirects

When a page moves or is renamed, add an entry to `redirects.json` (referenced from `docs.json`). Never break an external link.

## Writing conventions

- Active voice, second person ("you")
- Sentence case for headings and code block titles
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths
- One idea per sentence
- AU/British spelling in user-facing content (organised, colour, behaviour, customise, authorise)
- Kebab-case for new MDX file names
- Root-relative paths for internal links (`/guides/quickstart`, not `../quickstart` or absolute URLs)
- Language tags on every code block; alt text on every image
- Component intros start with the action: "Use `<Steps>` to…" over "The Steps component…"
- No promotional language, no editorialising ("it's important to note", "in conclusion"), no emoji

## Before declaring docs work complete

- Run `mint broken-links`
- Run `mint validate` to check OpenAPI references
- Verify frontmatter on every new/changed page (`title`, `description`)
- Read changes in `mint dev` to catch formatting regressions
