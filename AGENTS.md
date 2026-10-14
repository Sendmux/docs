# AGENTS.md

This is the tracked source of agent instructions. Local `CLAUDE.md` must remain a gitignored symlink to `AGENTS.md`. Both files must remain excluded from publication by `.mintignore`.

## 🚨 CRITICAL — MUST FOLLOW BEFORE EVERY DEPLOYMENT 🚨

### Internal architecture confidentiality (default-deny)

**NEVER name any internal tech, infrastructure, vendor, library, language, or implementation detail in any file that ships to `docs.sendmux.ai`.** This is a security and competitive-moat requirement, not a style preference. Mirrors the same rule in `/Users/rj/Desktop/GIT-REPOS/sendmux/CLAUDE.md:56-66`. If it's not on the allowlist below, it is forbidden in every shipped surface:

- All `*.mdx` files (guides, intros, error pages, snippets)
- `docs.json` (page descriptions, group names, anchors)
- OpenAPI `summary` / `description` / `tag` fields rendered into endpoint pages
- Frontmatter (`title`, `description`, `keywords`)
- Image alt text, captions, code-block titles
- Any text Mintlify renders to the public site

**Specifically forbidden — never write these on a docs page**: Parcelvoy, K3s/K8s, HAProxy, Hetzner, Cloudflare (Workers / Hyperdrive / D1 / KV / R2 / Workflows / Durable Objects / Queues), Stalwart, Postmark, ProxySQL, Redis, Valkey, Next.js, OpenNext, Drizzle, Lucia, PostgreSQL, MariaDB, MySQL, ClickHouse, TypeScript, Python, Go, Wrangler, any internal service / host / pod / worker name, any file path inside the product source repo.

**Allowlist (OK to name in user-facing docs)**: Amazon SES.

**SDK / CLI / MCP allowlist delta (approved for public developer docs):** SDK language names and public package, import, registry, binary, and server names are allowed when they describe customer-facing developer tooling, not Sendmux's internal implementation. Allowed examples: TypeScript, Python, Go, PHP, Ruby, Rust, `@sendmux/*`, `sendmux-*`, `sendmux.ai/go`, `sendmux/*`, `sendmux`, and `sendmux-mcp`. This does not allow naming the backend/app/infrastructure implementation language, runtime, datastore, host, or vendor stack.

**Use instead**:

- "our infrastructure" / "our platform"
- "our email platform" / "our sending system"
- "upstream provider" (when referring to delivery vendors generically)
- "your configured provider" (when referring to BYO providers)
- "background processing" instead of any queue/worker tech
- "managed datastore" instead of any database product

**Pre-deployment gate (MANDATORY before `git push` or any deploy)**:

1. Run `npm run confidentiality:check` over the shipped docs surfaces. Block the deploy if any hard-forbidden backend/infra term is found in a shipped file.
2. Inspect every newly added or modified MDX page, `docs.json` change, and any OpenAPI spec change for leaked internal terminology.
3. If a leak is found: STOP, fix it, and warn the user before continuing.

Exception: preserve `docs.json` `api.examples.languages` sample-language identifiers. They are generated API example config, not prose; the product repo gate exempts only that JSON path.
The SDK / CLI / MCP allowlist above also means the grep gate must not fail solely because public developer-tooling pages mention SDK language names or public package names; manual inspection still blocks any sentence that uses those names to reveal Sendmux's backend/app/infrastructure implementation.

`CLAUDE.md` itself, `.claude/`, drafts (`drafts/`, `*.draft.mdx`), and any file listed in `.mintignore` are exempt — they are not shipped. **`CLAUDE.md` MUST stay in `.gitignore`** so this ruleset is never published. (`.gitignore` line 4, `.mintignore` line 8.)

To add a new allowlist entry, the user must explicitly approve it in writing.

---

## Project

Sendmux documentation site built on [Mintlify](https://mintlify.com). Sendmux is an intelligent email layer that routes emails through multiple delivery providers. Docs are hosted at `https://docs.sendmux.ai`.

## Commands

- `mint dev` — local preview at `http://localhost:3000`
- `mint broken-links` — check for broken links
- `mint update` — update Mintlify CLI if dev environment isn't working
- `npm run postman:emit` — regenerate `postman/*.postman_collection.json` from the committed `openapi-app.json` + `openapi-sending.json` (never hand-edit the collections)
- `npm run postman:check` — drift-check the collections; this is the CI gate (`.github/workflows/verify.yml`), and it fails if a spec changed without the matching collection regen
- Hosted Postman checks/sync use `POSTMAN_API_KEY` from the 1Password item `Sendmux Local Production ENV`; retrieve it with `op` only, never paste or store it.

Install CLI: `npm i -g mint`

## Architecture

- **`docs.json`** — central config: navigation, theme, API specs, fonts, anchors
- **Pages** — MDX files with YAML frontmatter (`title`, `description`; add `keywords` for SEO)
- **`style.css`** — global typography overrides (letter-spacing, font smoothing)
- **`.mintignore`** — excludes `drafts/`, `*.draft.mdx`, `CLAUDE.md` from builds

### Navigation structure (4 tabs)

1. **Guides** (`guides/`) — getting started, domains, sending emails, webhooks, AI integrations. All conceptual + procedural content lives here.
2. **Management API** (`api-reference/`) — endpoint pages auto-generated from `https://app.sendmux.ai/api/v1/openapi.json`. Local MDX is limited to `introduction.mdx` (one tab-level intro) + `errors.mdx` (the canonical error reference). No per-resource overview pages.
3. **Mailbox API** (`mailbox-api/`) — endpoint pages generated from `openapi-app.json`. Local MDX is limited to `introduction.mdx` and `errors.mdx`.
4. **Sending API** (`sending-api/`) — endpoint pages auto-generated from `https://smtp.sendmux.ai/api/v1/openapi.json`. Local MDX is limited to `introduction.mdx` + `errors.mdx`.

### Two separate APIs

| API            | Base URL                 | Purpose                                                                                  |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| Sending API    | `smtp.sendmux.ai/api/v1` | Email delivery (send, batch send)                                                        |
| Management API | `app.sendmux.ai/api/v1`  | Read + manage: providers, metrics, logs, billing, domains, mailboxes, API keys, webhooks |

## Content patterns

Mirror the patterns Mintlify uses in [their own docs repo](https://github.com/mintlify/docs).

### Shipped copy quality

These rules are mandatory for every file that ships to `docs.sendmux.ai`.

- Write concise, clear, plain English while preserving necessary technical terminology, identifiers, units, numbers and factual qualifications. The `humanize` skill runs once, inside the polish pass below.
- Follow `automation/docs-authoring-workflow.md` for placement, the polish pass, and preservation before shipping new or materially rewritten reader-facing docs copy.
- Keep copy concise, plain, and clear. Cut filler before adding detail.
- Balance sibling card and UI block copy so matching blocks wrap to the same number of lines where practical.
- Keep customer explanations and walkthroughs in **Guides**. Keep API endpoint detail in generated API reference tabs.

### Frontmatter by page type

| Field                              | When to use                                                      |
| ---------------------------------- | ---------------------------------------------------------------- |
| `title`, `description`, `keywords` | Every page (3–7 keywords)                                        |
| `sidebarTitle`                     | When `title` is too long for the sidebar                         |
| `icon`                             | Group landing pages (Lucide icon name, e.g. `rocket`, `key`)     |
| `openapi`                          | API endpoint pages — auto-renders request/response from the spec |
| `mode: "frame"`                    | Landing pages without normal chrome                              |
| `noindex: true`                    | Internal or meta pages excluded from search                      |

### Navigation (`docs.json`)

- Tabs → Groups → nested Groups → Pages. Page count does not determine category boundaries; each level must represent a distinct reader choice or task domain.
- Use `{ "group": "X", "root": "path/index", "pages": [...] }` when readers need an introduction or decision page before choosing a child page.
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

### Clutter-free page organisation

- Before shipping a long guide, scan the rendered structure for wall-of-text or wall-of-code sections. If a page has many sibling setup blocks, optional reference tables, or troubleshooting entries, prefer `<AccordionGroup>` with clear `<Accordion>` titles and short descriptions.
- Use `<Steps>` for required sequences and keep them visible. Use accordions for optional client-specific setup, FAQs, troubleshooting, and reference detail.
- For inspiration, compare against Mintlify's own docs in `/Users/rj/Desktop/GIT-REPOS/mintlify-docs`, especially `components/accordions.mdx`, `components/expandables.mdx`, and any page with a dense "all clients" or resource list.
- Do this before the final `mint dev` pass. The rendered page should be easy to scan with most optional detail collapsed by default.

### Images

Wrap in `<Frame>`, always include alt text, store under `images/<section>/`.

```mdx
<Frame caption="Short caption">
  <img
    src="/images/guides/dashboard.png"
    alt="Dashboard with metrics panel open"
  />
</Frame>
```

### Reusable fragments

Put repeated prereqs, next-steps, or legal blurbs in `snippets/*.mdx` and import them:

```mdx
import Prereqs from "/snippets/prereqs.mdx";

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

### Changelog (Product updates)

`changelog.mdx` at repo root → `https://docs.sendmux.ai/changelog`. RSS auto-published at `/changelog/rss.xml` (`rss: true` frontmatter).

- **Source-of-truth split**: the product repo (`sendmux/CLAUDE.md` → "Product Changelog") owns _what shipped_; this repo owns _format_. Entries arrive from that protocol already code-sourced and scrubbed — never invent content here.
- **Canonical entry shape**: the `{/* */}` template comment in `changelog.mdx` is the single example — follow it, don't duplicate it here.
- **Format rules**: `<Update label="D Month YYYY">` (date only, no version), newest first; `tags` only from the closed set `New features` / `Improvements` / `Bug fixes` (drives the filter — no new strings); sections ordered named-feature `##` → `## Improvements` → `## Bug fixes`; `rss.title` = standalone one-liner; AU spelling, second person, sentence case.
- **Never use bullet points in changelog entries.** Write every item as a standalone prose paragraph inside its `<Update>` block.
- **Page setup (fixed)**: frontmatter `title: "Product updates"` + user-safe `description` + `rss: true`, **no `noindex`** (indexed by design); one `docs.json` `navbar.links` entry, **absent from every `navigation.tabs` group** (never in a sidebar).
- **Confidentiality**: the top-of-file confidentiality rule applies in full — the changelog is the highest-traffic leak surface; any internal tech/vendor/host/path name is a deploy blocker.
- **Accuracy**: every line traces to a commit/PR/PRD or it doesn't ship — drop it and flag the product-repo author.

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
- If `openapi-app.json` / `openapi-sending.json` or `postman/` changed: run `npm run postman:check`

---

# Public docs-authoring guide

(content of the former tracked AGENTS.md — kept here, no longer public)


## Documentation authoring workflow

- For every new, moved, or materially edited reader-facing documentation page or prose block, read and follow `automation/docs-authoring-workflow.md` from placement audit through the polish pass in `/Users/rj/Desktop/GIT-REPOS/ja-k8s/AA-claude-prompts/polish-pass.md`, preservation, and release checks.
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
