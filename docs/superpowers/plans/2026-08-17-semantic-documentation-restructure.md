# Semantic Documentation Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy a task-oriented documentation hierarchy while preserving every moved public URL with a permanent Mintlify redirect.

**Architecture:** Keep the four existing tabs. Reorganise conceptual documentation within Guides using shallow nested groups, semantic file paths, group roots where readers need a chooser, and OpenAPI-only endpoint pages in API tabs. Split the Mailbox API monolith into focused Guides pages and the MCP client monolith into a chooser plus one page per client without changing verified technical prose.

**Tech Stack:** Mintlify MDX, `docs.json`, Node.js contract checks, `mint` CLI.

## Global Constraints

- Keep the four top-level tabs unchanged.
- Give every top-level Guides category a distinct Lucide icon.
- Preserve all factual and technical prose during moves and splits; QuillBot is skipped only for exact relocation, headings, metadata, and link destination changes.
- Every old public path in the redirect manifest must have exactly one permanent redirect; Mintlify defaults omitted `permanent` values to `true` and serves them as `308`.
- Keep OpenAPI specs, Postman collections, `changelog.mdx`, product behaviour, and dependency files unchanged.
- Use root-relative internal links and preserve old heading IDs where an old URL may include a fragment.

---

## Redirect manifest

| Old path | New path |
| --- | --- |
| `/guides/account-settings` | `/account/account-settings` |
| `/guides/agent-access` | `/ai-integrations/agent-access` |
| `/guides/agent-skills` | `/ai-integrations/agent-skills` |
| `/guides/api-keys` | `/account/api-keys` |
| `/guides/attachments` | `/sending/attachments` |
| `/guides/billing` | `/account/billing` |
| `/guides/connect-google-microsoft-accounts` | `/sending/accounts/google-microsoft` |
| `/guides/dashboard-logs` | `/monitoring/dashboard-logs` |
| `/guides/deliverability` | `/monitoring/deliverability` |
| `/guides/delivery-groups` | `/sending/accounts/delivery-groups` |
| `/guides/domain-management` | `/domains` |
| `/guides/domain-settings` | `/domains/settings` |
| `/guides/http-provider` | `/sending/accounts/http-provider` |
| `/guides/idempotency` | `/sending/idempotency` |
| `/guides/mailbox-push-delivery` | `/mailboxes/push-delivery` |
| `/guides/mailboxes` | `/mailboxes` |
| `/guides/mcp-clients` | `/ai-integrations/mcp/clients` |
| `/guides/mcp` | `/ai-integrations/mcp` |
| `/guides/postman-collection` | `/developer-tools/postman` |
| `/guides/quickstart` | `/getting-started/quickstart` |
| `/guides/sending-accounts` | `/sending/accounts` |
| `/guides/sending-via-http` | `/sending/http` |
| `/guides/sending-via-smtp` | `/sending/smtp` |
| `/guides/team-limits` | `/account/team-limits` |
| `/guides/teams-access` | `/account/teams-and-access` |
| `/guides/webhook-replay` | `/webhooks/replay` |
| `/guides/webhooks-setup` | `/webhooks/setup` |
| `/guides/webhooks-verify-signatures` | `/webhooks/verify-signatures` |
| `/sdks` | `/developer-tools/sdks` |
| `/sdks/typescript` | `/developer-tools/sdks/typescript` |
| `/sdks/python` | `/developer-tools/sdks/python` |
| `/sdks/go` | `/developer-tools/sdks/go` |
| `/sdks/php` | `/developer-tools/sdks/php` |
| `/sdks/ruby` | `/developer-tools/sdks/ruby` |
| `/sdks/versioning-support` | `/developer-tools/sdks/versioning-support` |
| `/cli` | `/developer-tools/cli` |

## Final Guides hierarchy

```text
Guides
├── Getting started [icon: play]
│   ├── Welcome
│   └── Quickstart
├── Developer tools [icon: code]
│   ├── SDKs [root]
│   │   ├── TypeScript
│   │   ├── Python
│   │   ├── Go
│   │   ├── PHP
│   │   ├── Ruby
│   │   └── Versioning and support
│   ├── CLI
│   ├── Postman collections
│   └── Mailbox API guides
│       ├── Targeting and capabilities
│       ├── Operations and usage
│       ├── Threads
│       ├── Search and batch operations
│       ├── Message content
│       ├── Attachments
│       └── Synchronisation
├── Use cases [icon: bullseye]
├── Integrations [icon: plug]
├── AI integrations [icon: robot]
│   ├── Agent access
│   ├── Agent skills
│   └── MCP [root]
│       └── Client setup [root + card directory]
├── Account and billing [icon: users]
│   ├── Account and access
│   └── Billing and limits
├── Sending [icon: paper-plane]
│   ├── Send email
│   └── Sending accounts [root]
├── Domains [icon: globe]
├── Receiving [icon: inbox]
│   └── Mailboxes [root]
├── Monitoring [icon: chart-line]
└── Webhooks [icon: link]
```

### Task 1: Establish red-capable navigation contracts

**Files:**
- Read: `docs.json`
- Read: the paths in the redirect manifest

- [ ] **Step 1: Run a pre-change contract that requires the final top-level icons, semantic destinations, redirects, and unchanged four tabs.**

  Run an inline Node.js assertion against `docs.json`. It must fail because `/getting-started/quickstart`, the new nested groups, and their redirects do not exist yet.

- [ ] **Step 2: Record the exact failing assertion in the session scratchpad.**

  Expected failure: `missing final navigation page: getting-started/quickstart`.

### Task 2: Move existing conceptual pages to semantic paths

**Files:**
- Move: `guides/*.mdx` to the destinations represented by the redirect manifest
- Move: `sdks/*.mdx` to `developer-tools/sdks/*.mdx`
- Move: `cli/index.mdx` to `developer-tools/cli.mdx`
- Preserve: `index.mdx`, `use-cases/**`, `integrations/**`

- [ ] **Step 1: Create the semantic directories.**

  Create `getting-started/`, `developer-tools/sdks/`, `developer-tools/mailbox-api/`, `ai-integrations/mcp/clients/`, `account/`, `sending/accounts/`, `domains/`, `mailboxes/`, `monitoring/`, and `webhooks/`.

- [ ] **Step 2: Move each existing page exactly once according to the redirect manifest.**

  Preserve file contents and git history; do not duplicate the old files.

- [ ] **Step 3: Update every root-relative internal link to the final destination.**

  Search all MDX, JSON, and snippets for every old path. Redirect sources in `docs.json` are the only permitted remaining occurrences.

- [ ] **Step 4: Verify content preservation.**

  Compare the moved files with `git show HEAD:<old-path>` after normalising only approved internal-link destination changes. Frontmatter fields, heading hierarchy, code, tables, list structure, technical entities, numbers, and factual prose must otherwise match.

### Task 3: Split Mailbox API detail into focused Guides pages

**Files:**
- Modify: `mailbox-api/introduction.mdx`
- Create: `developer-tools/mailbox-api/targeting-and-capabilities.mdx`
- Create: `developer-tools/mailbox-api/operations-and-usage.mdx`
- Create: `developer-tools/mailbox-api/threads.mdx`
- Create: `developer-tools/mailbox-api/search-and-batch.mdx`
- Create: `developer-tools/mailbox-api/message-content.mdx`
- Create: `developer-tools/mailbox-api/attachments.mdx`
- Create: `developer-tools/mailbox-api/sync.mdx`

- [ ] **Step 1: Keep only orientation and shared API behaviour in the introduction.**

  Retain its existing opening, Base URL, Authentication, Current endpoints, Response format, Rate limiting, Conventions, and OpenAPI specification sections.

- [ ] **Step 2: Relocate exact section bodies to task pages.**

  Map Mailbox targeting + Capability discovery to `targeting-and-capabilities`; Operational resources to `operations-and-usage`; Thread APIs to `threads`; Retrieval precision APIs to `search-and-batch`; Message body APIs to `message-content`; Attachments to `attachments`; Sync APIs to `sync`.

- [ ] **Step 3: Add metadata, task-level headings, and title-only next-step cards.**

  Do not introduce or alter technical claims. Record `QuillBot: skipped — exact prose relocation plus metadata, headings, and link destinations only`.

- [ ] **Step 4: Verify no source section was lost or duplicated.**

  Compare all non-frontmatter prose blocks from the original introduction against the union of the reduced introduction and seven new pages.

### Task 4: Split MCP setup into a chooser and client pages

**Files:**
- Modify: `ai-integrations/mcp/clients/index.mdx`
- Create: `ai-integrations/mcp/clients/{claude,claude-code,cursor,codex,chatgpt,hoot,gemini-cli,qwen-code,kiro,opencode,zed,visual-studio,vs-code,windsurf-cascade,cline,roo-code,warp,jetbrains-ai-assistant,continue,lm-studio,github-copilot-cli,github-copilot-coding-agent}.mdx`

- [ ] **Step 1: Keep chooser content on the root page.**

  Preserve the existing intro, warning, Agent skills note, setup cards, compatibility matrix, mode anchors, verification steps, and next-step cards. Remove the 46 client accordion bodies after they have been relocated.

- [ ] **Step 2: Create one page per unique client.**

  Each page uses the exact existing sentence `Use this page to connect Sendmux MCP to your AI client.`, then includes each available mode as an H2 and the exact former accordion body beneath it.

- [ ] **Step 3: Preserve shared mode prerequisites.**

  Copy the exact hosted endpoint, local package/key setup, or private HTTP server setup before the corresponding client instructions.

- [ ] **Step 4: Verify the split mechanically.**

  Assert that all 46 original `(mode, client)` accordion bodies appear exactly once across the 22 client pages and no client body remains in the chooser.

### Task 5: Build final navigation and permanent redirects

**Files:**
- Modify: `docs.json`

- [ ] **Step 1: Replace only the Guides tab hierarchy with the approved tree.**

  Keep the other three tabs and global navigation unchanged. Add `directory: "card"` to the MCP client root group. Every top-level Guides group must include the icon named in the hierarchy.

- [ ] **Step 2: Refine Mailbox API endpoint groups.**

  Split `Mailbox` into `Mailboxes` (`GET /mailbox/mailboxes`), `Session and identity` (the remaining mailbox/session/identity endpoints), and split attachment upload/download endpoints from `Messages` into `Attachments`.

- [ ] **Step 3: Append the redirect manifest to the existing redirects.**

  Use exact source and destination pairs. Omit `permanent` or set it to `true`; never set it to `false`. Preserve all existing redirects.

- [ ] **Step 4: Run the contract from Task 1.**

  Expected: PASS with four unchanged tabs, all required icons, all final pages, 36 unique new permanent redirects, no redirect cycles, and no redirect destination that is itself a redirect source.

### Task 6: Validate content, links, redirects, and rendering

**Files:**
- Verify: all changed MDX and `docs.json`

- [ ] **Step 1: Check stale paths and page inventory.**

  Assert that no old path remains outside `redirects[].source`, every navigated MDX file exists, and every public MDX file is navigated except the intentional navbar-only changelog and snippet fragments.

- [ ] **Step 2: Run repository gates.**

  Run `npm run confidentiality:check`, `npm run external-links:check`, `mint validate`, `mint broken-links --check-redirects`, and `git diff --check`.

- [ ] **Step 3: Preview the sidebar and destination pages.**

  Run `mint dev`, record its PID, inspect the Guides and Mailbox API sidebars and representative new pages, then stop the server and verify the PID is gone.

- [ ] **Step 4: Run preservation checks.**

  Confirm moved/split prose and protected technical tokens are unchanged except for approved metadata, headings, and internal links.

### Task 7: Ship and verify production redirects

**Files:**
- Commit: the complete documentation-only change-set

- [ ] **Step 1: Run the documentation-only close gate.**

  Skip rules evolution as a documentation-only change-set. Use the repository fast path: no PR and no diffray.

- [ ] **Step 2: Commit, fast-forward `main`, and push.**

  Push only after every Task 6 check passes.

- [ ] **Step 3: Verify deployment and redirects.**

  For every redirect manifest pair, request the canonical old URL without following redirects and require `308` with the exact new `Location`. Then follow redirects and require final `200` on the expected destination. Repeat against the legacy `docs.sendmux.ai` host to verify its canonical-domain hop still reaches the same destination.

- [ ] **Step 4: Confirm the new navigation live.**

  Inspect representative live pages from every changed high-level category and confirm all top-level category icons render.
