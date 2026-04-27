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

1. **Guides** (`guides/`) — getting started, domains, sending emails, webhooks, AI integrations. All conceptual + procedural content lives here.
2. **Management API** (`api-reference/`) — endpoint pages auto-generated from `https://app.sendmux.ai/api/v1/openapi.json`. Local MDX is limited to `introduction.mdx` (one tab-level intro) + `errors.mdx` (the canonical error reference). No per-resource overview pages.
3. **Sending API** (`sending-api/`) — endpoint pages auto-generated from `https://smtp.sendmux.ai/api/v1/openapi.json`. Local MDX is limited to `introduction.mdx` + `errors.mdx`.

### Two separate APIs

| API | Base URL | Purpose |
|-----|----------|---------|
| Sending API | `smtp.sendmux.ai/api/v1` | Email delivery (send, batch send) |
| Management API | `app.sendmux.ai/api/v1` | Read + manage: providers, metrics, logs, billing, domains, mailboxes, API keys, webhooks |

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

### API reference — pure auto-rendered

The Management API and Sending API tabs follow Mintlify's own pattern (see [github.com/mintlify/docs](https://github.com/mintlify/docs)): **one** introduction page at the tab root, **one** errors page, and every endpoint group below them is composed of auto-generated pages from the OpenAPI spec — no handwritten per-resource overviews.

- **Allowed local MDX in `api-reference/`** and `sending-api/`: `introduction.mdx` and `errors.mdx` only. These sit under an "Overview" group at the top of the tab.
- **Endpoint groups** (Domains, Providers, Emails, Billing, Webhooks, etc.) contain only OpenAPI-rendered entries — strings like `"POST /emails/send"` in `docs.json`. No per-resource overview pages, no concept docs, no "see X guide" pointer pages.
- **Where conceptual + procedural content lives**: the Guides tab. If a resource needs a "what it is, how it works, how to use it" walkthrough, that's a guide page (e.g. `guides/domain-management.mdx`, `guides/webhooks-setup.mdx`). The contract reference for that resource (event types, wire payload shape, permissions table) lives at the bottom of the same guide under a `## Reference` section so a guide reader has the contract one scroll away.
- **Endpoint pages with hand-written prose**: if an endpoint genuinely needs explanation beyond what OpenAPI renders, use the `openapi:` frontmatter and put the prose below — but the page must still live in the OpenAPI-driven group, not as a separate concept page. Prefer adding the prose to the relevant guide instead.

Anti-pattern (do not introduce): a per-resource `overview.mdx` or `introduction.mdx` inside `api-reference/` that duplicates content guides already cover. This was the drift Step F-cleanup removed; future drift in the same direction silently breaks tab consistency (some groups have overviews, others don't) and forces readers to tab-switch for context.

### Redirects

When a page moves or is renamed, add an entry to the top-level `redirects` array in `docs.json` (Mintlify supports redirects directly in the central config — there's no separate `redirects.json` file). Never break an external link.

```json
"redirects": [
  { "source": "/old-path", "destination": "/new-path" }
]
```

### MDX traps to avoid

Mintlify uses strict MDX, so a single bad construct in one file can silently fail that page's build (the rest of the site still ships, the broken page returns 404 with no obvious error). The traps that actually bit this codebase:

- **No `<email@domain>` autolinks.** Inside an `<Accordion>` / `<Steps>` / any JSX component body, `<contact@sendmux.ai>` parses as a JSX element opening tag and breaks the page. Use the explicit Markdown form instead: `[contact@sendmux.ai](mailto:contact@sendmux.ai)`. Same rule applies to `<https://...>` URL autolinks inside JSX — wrap in `[label](url)`.
- **No naked `{token}` placeholders outside backticks.** MDX evaluates `{...}` as a JavaScript expression. Always wrap placeholder syntax in inline code: `` `{token}._domainkey.{your-domain}` ``. Plain prose `the {token} value` would try to evaluate `token` as a JS variable and fail.
- **Tabular forms with empty leading cells** (`| | a | b |`) render unevenly across themes. Give every column a header label.
- **Mixed quote styles inside one JSX attribute block** (`title='X "Y"'` next to `title="X 'Y'"`) compile but make diffs noisy. Pick one and stick with it per file.

Before pushing any docs change, run the validation gates listed in [Before declaring docs work complete](#before-declaring-docs-work-complete). `mint broken-links` and `mint dev` together catch the autolink trap; CI doesn't.

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
