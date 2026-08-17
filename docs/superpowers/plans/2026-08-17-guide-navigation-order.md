# Guides Navigation Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the approved reader-journey order for the Guides sidebar and make sequence review a durable documentation-authoring requirement.

**Architecture:** Reorder the existing top-level Guides group objects in `docs.json` without changing their contents or URLs. Keep the concise invariant in `AGENTS.md` and the audit procedure in `automation/docs-authoring-workflow.md`; `CLAUDE.md` remains unchanged because it imports `AGENTS.md`.

**Tech Stack:** Mintlify, JSON navigation configuration, Markdown agent instructions, Node.js contract assertions.

## Global Constraints

- Use this exact order: Getting started → Developer tools → Sending → Receiving → Domains → Monitoring → Webhooks → Use cases → Integrations → AI integrations → Account and billing.
- Preserve all existing page paths, nested groups, icons, and redirects.
- Do not edit reader-facing MDX prose; QuillBot is not required for navigation configuration or agent-only instructions.
- Push the verified documentation-only change directly to `main` under the repository fast path.

---

### Task 1: Establish the navigation-order contract

**Files:**
- Read: `docs.json`

**Interfaces:**
- Consumes: `navigation.tabs[0].groups` from `docs.json`.
- Produces: a red-capable assertion for the approved ordered group-name list.

- [x] **Step 1: Run the approved-order assertion before editing.**

  Run a Node.js script that compares the Guides group names with the exact approved sequence.

- [x] **Step 2: Confirm the assertion fails for the old order.**

  Expected: the script exits non-zero and prints the old order, where Use cases follows Developer tools and Sending appears later.

### Task 2: Reorder navigation and encode the durable rule

**Files:**
- Modify: `docs.json:31-199`
- Modify: `AGENTS.md:3-7`
- Modify: `automation/docs-authoring-workflow.md:14-45`

**Interfaces:**
- Consumes: the existing Guides group objects and the approved design.
- Produces: the approved sidebar order and an authoring-time sequence audit.

- [x] **Step 1: Reorder the existing top-level Guides objects.**

  Move whole objects only. Keep every nested `pages`, `root`, `directory`, and `icon` value unchanged.

- [x] **Step 2: Add the repository-level ordering invariant.**

  Add one imperative under **Documentation authoring workflow** requiring top-level groups to follow the reader journey and paired workflows to remain adjacent.

- [x] **Step 3: Add sequence fit to the placement audit.**

  Extend the recorded placement block with `Sequence fit`, then require authors to audit neighbouring group order whenever a top-level group is added, moved, renamed, or materially changed.

### Task 3: Verify and deploy

**Files:**
- Verify: `docs.json`
- Verify: `AGENTS.md`
- Verify: `automation/docs-authoring-workflow.md`

**Interfaces:**
- Consumes: the completed documentation-only diff.
- Produces: a validated and deployed navigation-order change.

- [x] **Step 1: Re-run the order contract.**

  Expected: PASS with the exact 11-group sequence.

- [x] **Step 2: Verify structural preservation.**

  Compare group objects by name before and after normalising array order. Assert all 11 top-level groups retain icons and the redirects map is unchanged.

- [x] **Step 3: Run repository checks.**

  Run `mint validate`, `mint broken-links --check-redirects`, `npm run confidentiality:check`, and `npm run external-links:check`.

- [x] **Step 4: Verify the production-build sidebar.**

  Run the Mintlify preview, inspect the Guides sidebar order and icons in a browser, then tear down the preview and browser processes.

- [ ] **Step 5: Commit and push through the docs-only fast path.**

  Commit only the planned files, push `agent/semantic-ia` to `main`, and verify the live Guides sidebar after deployment.
