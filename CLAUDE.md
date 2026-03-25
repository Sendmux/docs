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
- **Pages** — MDX files with YAML frontmatter (`title`, `description`)
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

## Writing conventions

- Active voice, second person ("you")
- Sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths
- One idea per sentence
