# Documentation Authoring Policy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put a hierarchy-first documentation workflow and guarded QuillBot humanisation process in force for every agent working in `sendmux-docs`. [user] [qa-log:2026-08-17-19:32-Q2]

**Architecture:** Keep `AGENTS.md` as the tracked cross-agent router and place the ordered procedure in `automation/docs-authoring-workflow.md`. Make the ignored local `CLAUDE.md` import `@AGENTS.md`, retain its Claude-only confidentiality rules, and remove instructions that conflict with the shared workflow. [file:.gitignore:4] [qa-log:2026-08-17-19:32-Q2]

**Tech Stack:** Markdown agent instructions, Mintlify `docs.json`, the official QuillBot Premium Humanizer UI, 1Password CLI, and Node.js one-shot contract assertions. [research:https://www.mintlify.com/docs/organize/navigation] [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:80]

## Global Constraints

- Change policy only; do not move current MDX pages or edit `docs.json`. [qa-log:2026-08-17-19:32-Q2]
- Permit autonomous placement changes only inside an existing tab; require operator approval for top-level tab changes. [qa-log:2026-08-17-19:32-Q2]
- Gate new or materially rewritten reader-facing prose through QuillBot; exempt exact technical-token, metadata-only, and punctuation-only edits. [qa-log:2026-08-17-19:32-Q2]
- Treat QuillBot as an untrusted candidate generator and preserve verified facts, keywords, technical entities, code tokens, links, numbers, and SEO intent. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:80]
- Keep `CLAUDE.md` ignored and local. Commit `AGENTS.md`, the workflow, design, and plan only. [file:.gitignore:4]
- Use the repo's docs-only direct-to-`main` fast path after checks; do not open a PR or run diffray. [file:AGENTS.md:7]

## Assumptions

1. The approved design at `docs/superpowers/specs/2026-08-17-docs-authoring-policy-design.md` is authoritative. **Confirmed: yes.** [qa-log:2026-08-17-19:32-Q2]
2. No deterministic MDX comparison utility is added in this change-set. **Confirmed: yes.** [qa-log:2026-08-17-19:32-Q2]
3. The main checkout's ignored `CLAUDE.md` is updated separately from the branch. **Confirmed: yes.** [file:.gitignore:4] [qa-log:2026-08-17-19:32-Q2]

---

### Task 1: Add the tracked authoring workflow

**Files:**

- Create: `automation/docs-authoring-workflow.md`
- Modify: `AGENTS.md:1-51`

**Interfaces:**

- Consumes: the approved design, existing `docs.json`, and existing project gates.
- Produces: one tracked workflow reached from one strong `AGENTS.md` trigger.

- [ ] **Step 1: Run the hierarchy/router assertion before implementation**

Run:

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
const agents = fs.readFileSync('AGENTS.md', 'utf8');
if (/First-time setup|Customize this file/.test(agents)) throw new Error('generic setup placeholder remains');
if (!agents.includes('automation/docs-authoring-workflow.md')) throw new Error('missing workflow router');
if (!fs.existsSync('automation/docs-authoring-workflow.md')) throw new Error('missing workflow file');
const workflow = fs.readFileSync('automation/docs-authoring-workflow.md', 'utf8');
for (const term of ['Tab → group → subgroup → page', 'keep, move, split, or merge', 'Page count does not determine category boundaries', 'top-level tab', 'English (AU)', 'Freeze Words', 'protected occurrence']) {
  if (!workflow.includes(term)) throw new Error(`missing workflow contract: ${term}`);
}
NODE
```

Expected: FAIL with `generic setup placeholder remains`, proving the assertion catches the current policy gap.

- [ ] **Step 2: Replace the generic `AGENTS.md` preamble**

Delete the three first-time setup lines and add this block after `# Documentation project instructions`:

```markdown
## Documentation authoring workflow

- For every new, moved, or materially edited reader-facing documentation page or prose block, read and follow `automation/docs-authoring-workflow.md` from placement audit through QuillBot preservation and release checks.
- Reconsider an existing page's location whenever its scope changes; prior placement is evidence, not proof that the page still belongs there.
```

- [ ] **Step 3: Create `automation/docs-authoring-workflow.md` with the complete procedure**

Use this exact content:

````markdown
# Documentation authoring workflow

Use this workflow for every new, moved, or materially edited reader-facing documentation page or prose block. Complete the placement gate before writing and the QuillBot gate before release when the change qualifies.

## 1. Read before writing

1. Read repository-root `AGENTS.md`, local `CLAUDE.md` when present, and the active session plan.
2. Read the complete `navigation` tree in `docs.json`; do not inspect only the page's current group.
3. Search all MDX, snippets, OpenAPI prose, and redirects for the subject and its synonyms.
4. Read two or three sibling pages that serve the same reader task.
5. Verify technical and product claims from their owning source. The verified pre-QuillBot copy is the frozen baseline.

## 2. Decide the information architecture

Record this block in the task plan before creating or materially editing content:

```text
Placement: Tab → group → subgroup → page
Disposition: keep, move, split, or merge
Reader task: <one sentence>
Sibling fit: <why these neighbouring pages belong together>
```

For an existing page, reconsider its full scope after the planned edit. Prior placement is evidence, not proof that the page remains correctly placed.

Use these placement tests:

- Each level represents a distinct reader choice or task domain.
- Sibling pages answer related questions at the same conceptual level.
- The file path, navigation path, page title, breadcrumb, and related links tell the same story.
- Page count does not determine category boundaries. Create a group only when it clarifies the reader's choice.
- Add a group root only when readers need an introduction or decision page before choosing a child page.
- Prefer the shallowest hierarchy that preserves those distinctions; never flatten distinct tasks merely to reduce depth.

When one option clearly passes every test, you may keep, move, split, merge, or create a group inside an existing tab without another approval. Adding, removing, renaming, or redefining a top-level tab is an information-architecture decision for the operator.

When moving a page:

1. Align its file path with the approved hierarchy.
2. Add a top-level Mintlify redirect in `docs.json` from every old public path to the new path.
3. Update affected root-relative internal links, cards, and related-page navigation.
4. Verify that no duplicate page remains under the old category.

## 3. Structure the page around the reader's task

Use only sections that help the reader complete the task. Where applicable, progress from what the feature is, to how it works, configuration, ongoing operations, troubleshooting, and related next steps.

Keep one reader intent per page. Split a page when its sections serve different navigation destinations or reader goals; merge pages when they duplicate one task and neither has an independent purpose.

## 4. Determine whether QuillBot is required

QuillBot is required when the change adds reader-facing prose, changes sentence meaning or structure, or replaces a complete visible sentence or paragraph in shipped MDX, OpenAPI-rendered prose, snippets, or changelog prose.

QuillBot is not required for an exact technical-token correction, metadata-only edit, punctuation-only edit, generated artifact, code-only change, or agent-only instruction. Record `QuillBot: skipped — <exact exemption>` when skipping it.

## 5. Humanise eligible prose with QuillBot

Treat QuillBot as an untrusted candidate generator, never as a source of facts.

1. Use only the official QuillBot interface through browser or computer-use capability. Never use the local `quillbot-api` repository or a private or undocumented endpoint.
2. Reuse the operator's authenticated QuillBot Premium session. Before each submission, visibly verify Humanizer and English (AU).
3. If signed out, retrieve the username and concealed credential from the `QuillBot Agents` item in the `AgentSecrets` vault with `op` inside the browser-control process. Keep credentials in memory only. Never print, log, persist, commit, screenshot, or expose them in snapshots or errors.
4. Stop the QuillBot-gated change for MFA, CAPTCHA, additional consent, ambiguous UI, unavailable Premium access, unavailable Humanizer or English (AU), failed authentication, or missing output. Never request a pasted credential or use an undocumented fallback.
5. Inventory exact protected spans: supplied SEO and long-tail keywords, technical entities, code tokens, commands, URLs, source links, numbers, units, product/protocol/provider names, schema fields, and verified factual claims.
6. Add supported terms and keywords to Freeze Words. Freeze Words does not replace the final comparison because symbols, special characters, and dashes may be unsupported.
7. Partition at H2/H3 boundaries and process one section sequentially. Submit only contiguous prose paragraphs and FAQ-answer prose.
8. Keep frontmatter, headings, FAQ questions, code, tables, list structure, image markup, and link destinations outside QuillBot.
9. Require returned paragraph count and order to match. Otherwise discard the section output and retry paragraph by paragraph.
10. Compare each candidate with its source paragraph. Restore every changed or removed protected span, then review grammar and meaning.
11. Keep only useful flow and rhythm changes. If factual equivalence, qualification, grammar, or placement remains uncertain, retain the exact baseline sentence.
12. Never accept a new claim, example, recommendation, number, capability, keyword, entity, or source introduced by QuillBot.

## 6. Pass the preservation gate

Fail the gate if any protected occurrence is reduced without an explicit, task-authorised correction. Restore the missing occurrence or retain the baseline sentence; never weaken the gate.

Compare the frozen baseline and final copy and confirm:

- Frontmatter, heading hierarchy, code, tables, list structure, image markup, FAQ questions, and link destinations retain their intended structure.
- Supplied keyword, technical-entity, source-link, factual-claim, number, unit, product/protocol/provider, and schema-field occurrence counts do not decrease.
- Every factual rewrite remains equivalent to its verified baseline and source.
- No qualification, limit, warning, prerequisite, or reader instruction changes accidentally.
- The final copy still satisfies the page's title, description, keywords, direct-answer structure, and internal-link intent.

Read baseline and final copy side by side once more. The gate passes only when every difference is intentional and supported.

## 7. Verify and report

Run every repository gate that applies, including confidentiality, external-link, Mintlify validation, broken links, and rendered preview checks. A QuillBot pass never replaces technical verification or browser review.

Report:

```text
Placement: <tab → group → subgroup → page>
Disposition: <keep | move | split | merge>
QuillBot: <run — preserved | skipped — exact exemption>
Preservation: <protected counts unchanged; claims verified>
Status: <checks and release state>
```
````

- [ ] **Step 4: Re-run the hierarchy/router assertion**

Run the exact Node command from Step 1.

Expected: exit `0` with no output.

- [ ] **Step 5: Commit the tracked workflow**

```bash
git add AGENTS.md automation/docs-authoring-workflow.md
git commit -m "docs: add hierarchy-first authoring workflow"
```

Expected: one commit containing only the tracked router and workflow.

---

### Task 2: Update the persistent local Claude companion

**Files:**

- Modify outside branch: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/CLAUDE.md:1-109`
- Keep as baseline: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs-docs-authoring-policy/CLAUDE.md`

**Interfaces:**

- Consumes: tracked `AGENTS.md` and `automation/docs-authoring-workflow.md` after integration.
- Produces: a persistent local Claude file that imports the tracked policy without duplicating it.

- [ ] **Step 1: Run the local Claude assertion before editing**

Run:

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
const claude = fs.readFileSync('/Users/rj/Desktop/GIT-REPOS/sendmux-docs/CLAUDE.md', 'utf8');
for (const term of ['@AGENTS.md', 'Navigation structure (4 tabs)', '**Mailbox API** (`mailbox-api/`)', 'automation/docs-authoring-workflow.md', 'Page count does not determine category boundaries']) {
  if (!claude.includes(term)) throw new Error(`missing local Claude contract: ${term}`);
}
if (/content-rewriter\/SKILL\.md/.test(claude)) throw new Error('Content Rewriter instruction remains');
NODE
```

Expected: FAIL with `missing local Claude contract: @AGENTS.md`.

- [ ] **Step 2: Apply the exact local-only changes**

In `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/CLAUDE.md`:

1. Add `@AGENTS.md` on its own line after `# CLAUDE.md`.
2. Change `### Navigation structure (3 tabs)` to `### Navigation structure (4 tabs)`.
3. Insert this item between Management API and Sending API, then renumber Sending API to `4`:

```markdown
3. **Mailbox API** (`mailbox-api/`) — endpoint pages generated from `openapi-app.json`. Local MDX is limited to `introduction.mdx` and `errors.mdx`.
```

4. Replace the Content Rewriter bullet with:

```markdown
- Follow `automation/docs-authoring-workflow.md` for placement and QuillBot preservation before shipping new or materially rewritten reader-facing docs copy.
```

5. Replace the numeric nesting rule with:

```markdown
- Tabs → Groups → nested Groups → Pages. Page count does not determine category boundaries; each level must represent a distinct reader choice or task domain.
- Use `{ "group": "X", "root": "path/index", "pages": [...] }` when readers need an introduction or decision page before choosing a child page.
```

- [ ] **Step 3: Re-run the local Claude assertion**

Run the exact Node command from Step 1.

Expected: exit `0` with no output.

- [ ] **Step 4: Review the local-only delta**

Run:

```bash
diff -u /Users/rj/Desktop/GIT-REPOS/sendmux-docs-docs-authoring-policy/CLAUDE.md /Users/rj/Desktop/GIT-REPOS/sendmux-docs/CLAUDE.md
```

Expected: only the import, four-tab correction, Mailbox API item, QuillBot pointer, and semantic navigation rules differ. `diff` exits `1` for the intentional difference. Do not commit `CLAUDE.md`.

---

### Task 3: Verify the policy change

**Files:**

- Verify: `AGENTS.md`
- Verify: `automation/docs-authoring-workflow.md`
- Verify: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/CLAUDE.md`
- Verify: `docs/superpowers/specs/2026-08-17-docs-authoring-policy-design.md`
- Verify: `docs/superpowers/plans/2026-08-17-docs-authoring-policy.md`

**Interfaces:**

- Consumes: completed Tasks 1 and 2.
- Produces: evidence that hierarchy decisions and QuillBot preservation are explicit and repository checks remain green.

- [ ] **Step 1: Run both instruction assertions**

Run the Node commands from Task 1 Step 1 and Task 2 Step 1.

Expected: both exit `0` with no output.

- [ ] **Step 2: Exercise the preservation failure boundary**

Compare this baseline and rejected candidate against the workflow:

```text
Baseline: Send 10 requests to POST /emails/send and retain the X-Sendmux-Event-Id header.
Candidate: Send requests to the email endpoint and retain the event header.
```

Expected: reject the candidate because it removes the protected number `10`, method/path `POST /emails/send`, and schema field `X-Sendmux-Event-Id`. Restore all three exact spans or retain the baseline sentence.

- [ ] **Step 3: Run repository checks**

Run:

```bash
npm run confidentiality:check
npm run external-links:check
npx mint validate
npx mint broken-links
git diff --check main...HEAD
```

Expected: every command exits `0`. If `npx mint` cannot run, use the installed `mint` binary with the same subcommands and report any unavailable command without claiming it passed.

- [ ] **Step 4: Review scope and tracked diff**

Run:

```bash
git status --short
git diff --stat main...HEAD
git diff main...HEAD -- AGENTS.md automation/docs-authoring-workflow.md docs/superpowers
```

Expected: tracked changes are limited to `AGENTS.md`, `automation/docs-authoring-workflow.md`, the approved design, and this plan. No MDX page, `docs.json`, dependency, lock file, or executable script changes.

- [ ] **Step 5: Confirm the implementation plan is committed**

```bash
git log -1 --oneline -- docs/superpowers/plans/2026-08-17-docs-authoring-policy.md
```

Expected: the plan's dedicated `docs: plan authoring policy implementation` commit is shown.

---

### Task 4: Integrate through the docs-only fast path

**Files:**

- Integrate tracked commits into: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs` on `main`
- Preserve local-only: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/CLAUDE.md`

**Interfaces:**

- Consumes: green verification evidence and a clean, current main checkout.
- Produces: the tracked policy on `origin/main` and the local Claude companion in force in the main checkout.

- [ ] **Step 1: Confirm the fast path applies**

Run:

```bash
git diff --name-only main...HEAD
```

Expected: only documentation and agent-instruction Markdown files appear; no executable code or tooling. State `→ rules-evolution skipped — cosmetic/doc-only change-set.` and `→ Docs-only fast path: no PR or diffray.`

- [ ] **Step 2: Confirm main can fast-forward safely**

Run:

```bash
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs status --short --branch
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs fetch origin main
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs merge-base --is-ancestor origin/main agent/docs-authoring-policy
```

Expected: main has no tracked changes and the ancestry check exits `0`. The ignored local `CLAUDE.md` does not make the worktree dirty.

- [ ] **Step 3: Fast-forward main and push**

Run:

```bash
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs merge --ff-only agent/docs-authoring-policy
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs push origin main
```

Expected: `main` advances to the implementation head and `origin/main` accepts the push. No public MDX content changes.

- [ ] **Step 4: Verify the shipped state**

Run:

```bash
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs status --short --branch
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs rev-parse HEAD
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs rev-parse origin/main
git -C /Users/rj/Desktop/GIT-REPOS/sendmux-docs check-ignore -v CLAUDE.md
```

Expected: main is clean and matches `origin/main`; `CLAUDE.md` remains ignored and contains the approved local changes.

Do not remove the worktree or session records until the post-merge Session Handoff gate is approved.
