# Developer-First Guides Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy a developer-first Guides sidebar that places AI integrations immediately after Developer tools while preserving every existing URL, redirect, icon, and group definition.

**Architecture:** Move the complete AI integrations object within `navigation.tabs[0].groups` in `docs.json`; do not edit the object itself. Replace the repository ordering invariant with a developer-first version in `AGENTS.md`, then add primary-audience priority to the existing sequence audit in `automation/docs-authoring-workflow.md` without duplicating the exact menu.

**Tech Stack:** Mintlify, JSON navigation configuration, Markdown agent instructions, Node.js contract assertions.

## Global Constraints

- Use this exact order: Getting started → Developer tools → AI integrations → Sending → Receiving → Domains → Monitoring → Webhooks → Use cases → Integrations → Account and billing.
- Preserve all existing page paths, nested groups, icons, redirects, and non-Guides tabs.
- Keep `docs.json` as the source of truth for the exact menu; agent instructions encode the durable developer-first rationale.
- Do not edit reader-facing MDX prose; QuillBot is skipped for navigation configuration and agent-only instructions.
- Push the verified documentation-only change directly to `main` under the repository fast path.

---

### Task 1: Establish the developer-first order contract

**Files:**
- Read: `docs.json`

**Interfaces:**
- Consumes: `navigation.tabs[0].groups` from `docs.json`.
- Produces: a red-capable assertion for the approved ordered group-name list.

- [ ] **Step 1: Run the approved-order assertion before editing.**

```js
const expected = [
  "Getting started",
  "Developer tools",
  "AI integrations",
  "Sending",
  "Receiving",
  "Domains",
  "Monitoring",
  "Webhooks",
  "Use cases",
  "Integrations",
  "Account and billing",
];
```

Run this expectation against the Guides group names from `docs.json`.

- [ ] **Step 2: Confirm the assertion fails for the current order.**

Expected failure: AI integrations appears after Integrations instead of immediately after Developer tools.

### Task 2: Apply the developer-first sequence

**Files:**
- Modify: `docs.json:31-199`
- Modify: `AGENTS.md:7`
- Modify: `automation/docs-authoring-workflow.md:36-41`

**Interfaces:**
- Consumes: the approved design and existing complete AI integrations group object.
- Produces: the developer-first sidebar order and durable audience-priority instructions.

- [ ] **Step 1: Move the complete AI integrations object.**

Place it immediately after Developer tools. Keep its `icon`, pages, MCP root, client setup root, directory mode, and client-page list unchanged.

- [ ] **Step 2: Replace the repository ordering invariant.**

Use this single line in `AGENTS.md`:

```markdown
- Order top-level documentation groups for this developer-first audience: onboarding → developer tools → AI workflows → adjacent core workflows → configuration → operations → use cases and general integrations → administration; reassess neighbouring groups whenever one changes.
```

- [ ] **Step 3: Add audience priority to the sequence audit.**

Use these ordered checks in `automation/docs-authoring-workflow.md`:

```markdown
- Order groups by the reader journey and primary audience, not by when content was added.
- Put primary-audience workflows immediately after implementation tools.
- Keep paired core workflows adjacent.
- Put required prerequisites before the task they unblock; optional configuration may follow the core workflow.
- Keep operational guidance after the workflows it observes, then use cases and general integrations, with administration last.
```

### Task 3: Verify and deploy

**Files:**
- Verify: `docs.json`
- Verify: `AGENTS.md`
- Verify: `automation/docs-authoring-workflow.md`

**Interfaces:**
- Consumes: the completed documentation-only diff.
- Produces: a validated and deployed developer-first navigation sequence.

- [ ] **Step 1: Re-run the order contract.**

Expected: PASS with the exact 11-group sequence.

- [ ] **Step 2: Verify structural preservation.**

Compare each Guides group object by name against commit `3171bb5`, ignoring only top-level array order. Assert all 11 top-level groups retain icons, redirects are unchanged, and all non-Guides tabs are unchanged.

- [ ] **Step 3: Run repository checks.**

Run `git diff --check`, `mint validate`, `mint broken-links --check-redirects`, `npm run confidentiality:check`, and `npm run external-links:check`.

- [ ] **Step 4: Verify the rendered sidebar.**

Run `mint dev --no-open`, inspect the Guides sidebar in a named browser session, assert the exact heading order and one rendered SVG icon per heading, then stop both resources and verify they are gone.

- [ ] **Step 5: Commit, push, and verify production.**

Commit only `docs.json`, `AGENTS.md`, `automation/docs-authoring-workflow.md`, and this plan's tracking update. Push `agent/semantic-ia` to `main`, then verify the live order, 11 icons, and all 36 migration redirects.
