# Documentation authoring policy design

## Assumptions

1. This change establishes the policy and workflow only; it does not reorganise the current Sendmux documentation tree. **Confirmed: yes.** [qa-log:2026-08-17-19:32-Q2]
2. `AGENTS.md` is the tracked cross-agent source, while `CLAUDE.md` remains a local, ignored Claude-specific companion. **Confirmed: yes.** [file:.gitignore:4] [qa-log:2026-08-17-19:32-Q2]
3. Agents may rehome pages or create groups inside an existing tab when the evidence is clear, but a top-level tab change remains an operator decision. **Confirmed: yes.** [qa-log:2026-08-17-19:32-Q2]
4. QuillBot gates new or materially rewritten reader-facing prose; exact technical-token, metadata-only, and punctuation changes do not invoke it. **Confirmed: yes.** [qa-log:2026-08-17-19:32-Q2]

## Outcome

Every future documentation task must decide where content belongs before writing and reconsider the placement of any materially changed page. The decision uses a semantic path such as `tab → group → subgroup → page`, matching the way Cloudflare aligns sidebar hierarchy, breadcrumbs, URL paths, sibling pages, and page tasks. [user] [research:https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/]

Every new or materially rewritten reader-facing prose block must use QuillBot as an untrusted candidate generator. The verified baseline remains authoritative, and publication is blocked until technical meaning, protected terms, and SEO intent survive comparison. [user] [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:80]

## Instruction architecture

### `AGENTS.md`

`AGENTS.md` becomes the tracked router and invariant layer. It removes the generic first-time setup placeholders and tells every agent to follow `automation/docs-authoring-workflow.md` when creating, moving, or materially editing reader-facing documentation. [qa-log:2026-08-17-19:32-Q2]

The short router names both workflow branches so invocation is reliable: information-architecture placement and QuillBot humanisation. Detailed steps remain in the workflow file to avoid duplicating an always-loaded procedure. [qa-log:2026-08-17-19:32-Q2]

### `automation/docs-authoring-workflow.md`

This new tracked file is the detailed source of truth. It follows the myagent.mx pattern of a concise `AGENTS.md` trigger pointing to a complete authoring and release procedure. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/AGENTS.md:3] [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:11]

The workflow has four ordered gates. [user] [file:CLAUDE.md:201]

1. Establish and verify the technical baseline.
2. Decide the information architecture and record the intended hierarchy.
3. Humanise eligible prose through QuillBot while protecting exact content.
4. Verify structure, preservation, links, confidentiality, and rendering before release. [user] [file:CLAUDE.md:201]

### Local `CLAUDE.md`

The local ignored `CLAUDE.md` adds `@AGENTS.md`, removes the Content Rewriter instruction, and retains Claude-only confidentiality material. Its stale three-tab description becomes the current four-tab structure, and its six-page nesting threshold becomes a semantic placement rule. [file:CLAUDE.md:70] [file:CLAUDE.md:91] [file:CLAUDE.md:109] [file:docs.json:27]

Because `CLAUDE.md` is gitignored, the tracked branch does not carry its final mutation. Implementation updates the main checkout's local file explicitly and verifies it there; the tracked `AGENTS.md` and workflow remain the durable cross-agent policy. [file:.gitignore:4] [qa-log:2026-08-17-19:32-Q2]

## Information-architecture gate

Before creating or materially editing a page, the agent must read the complete `docs.json` navigation tree, search all related content, and inspect two or three sibling pages. Mintlify defines `docs.json` as the site's information hierarchy and supports nested groups, roots, directory listings, and collapsed nested sections. [research:https://www.mintlify.com/docs/organize/navigation] [file:docs.json:27]

The plan records one proposed reader path. [user]

```text
Tab → group → subgroup → page
```

For an existing page, the agent records one disposition: keep, move, split, or merge. A material edit always reopens that decision; prior placement is evidence, not proof. [user]

Placement uses these tests. [user] [research:https://www.mintlify.com/docs/organize/navigation]

- Each hierarchy level represents a distinct reader choice or task domain. [research:https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/]
- Sibling pages answer related questions at the same conceptual level. [research:https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/]
- The file path, navigation path, page title, breadcrumb, and related-page links tell the same story. [research:https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/]
- Page count never determines category boundaries; a group exists because it clarifies the reader's choice. [qa-log:2026-08-17-19:32-Q2]
- A group root exists only when readers need an introduction or decision page before its children. Mintlify supports roots at top-level and nested groups. [research:https://www.mintlify.com/docs/organize/navigation]
- A page move adds a Mintlify redirect and updates affected internal links. [file:CLAUDE.md:156]

The agent may keep, move, split, merge, or create groups inside an existing tab when one option is clearly supported by these tests. Adding, removing, or redefining a top-level tab changes the site's primary information architecture and requires the operator's approval. [qa-log:2026-08-17-19:32-Q2]

Page structure follows the reader's task rather than a rigid template. Where applicable, it progresses from what the feature is, to how it works, to configuration, ongoing operations, troubleshooting, and related next steps. Cloudflare's reference page follows that progression through explanation, configuration, export, edit, and delete sections. [research:https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/]

## QuillBot gate

### Trigger

Run QuillBot for every new or materially rewritten reader-facing prose block in shipped MDX, OpenAPI-rendered prose, snippets, and changelog prose. Exact technical-token corrections, metadata-only edits, punctuation-only edits, generated artifacts, code, and agent-only instructions do not trigger it. [qa-log:2026-08-17-19:32-Q2]

A material rewrite changes sentence meaning or structure, adds or removes reader-facing prose, or replaces a complete visible sentence or paragraph. A typo, punctuation adjustment, or exact technical-token substitution is not material. [qa-log:2026-08-17-19:32-Q2]

Technical and factual verification happens before QuillBot. The pre-QuillBot copy becomes the frozen baseline; QuillBot may improve flow but may not establish facts. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:60] [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:82]

### Official browser workflow

Use only the official authenticated QuillBot interface through browser or computer-use capability. Reuse the operator's authenticated Premium session, select Humanizer and English (AU), and never use the local `quillbot-api` repository or a private or undocumented endpoint. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:82]

If signed out, retrieve the `QuillBot Agents` username and concealed credential from the `AgentSecrets` vault through `op` inside the browser-control process. Credentials remain in memory and never enter chat, files, screenshots, logs, snapshots, or error output. MFA, CAPTCHA, ambiguous UI, unavailable Premium access, or failed authentication blocks the QuillBot-gated change. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:84]

### Protected input and sequential processing

Before submission, inventory exact protected spans: supplied keywords, technical entities, code tokens, commands, URLs, source links, numbers, units, product/protocol/provider names, schema fields, and verified factual claims. Use Freeze Words for supported terms and keywords, while retaining the post-output comparison because QuillBot does not support symbols, special characters, or dashes as freeze words. [research:https://help.quillbot.com/hc/en-us/articles/35296453136279-What-are-freeze-words-in-Humanizer]

Partition at H2/H3 boundaries and process one section sequentially. Submit only contiguous prose paragraphs and FAQ-answer prose. Keep frontmatter, headings, FAQ questions, code, tables, list structure, image markup, and link destinations outside QuillBot. Returned paragraph count and order must match; otherwise retry paragraph by paragraph. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:89]

Compare each candidate with its source paragraph. Restore every changed or removed protected span, then review grammar and meaning. Keep only useful rhythm and flow changes. If equivalence remains uncertain, retain the exact baseline sentence. QuillBot may not add a claim, example, recommendation, number, capability, keyword, or source. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:91]

### Preservation completion criterion

The gate passes only when all of the following are true. [user] [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:96]

- Frontmatter, heading hierarchy, code, tables, list structure, image markup, FAQ questions, and link destinations retain their intended structure. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:89]
- No supplied keyword, technical entity, source link, factual claim, number, unit, or schema-field occurrence is lost without an explicit task-authorised correction. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:98]
- Every accepted factual rewrite remains equivalent to its verified baseline and source. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:93]
- A final side-by-side read confirms that no meaning, qualification, or reader instruction changed accidentally. [file:/Users/rj/Desktop/GIT-REPOS/SITE_myagent.mx/automation/babylovegrowth-daily-import-prompt.md:106]

This task adds no executable comparison tool. The workflow uses exact inventories, occurrence comparison, and side-by-side review; a reusable deterministic MDX comparator is a separate tooling change. [qa-log:2026-08-17-19:32-Q2]

## Verification design

Implementation verification covers the instruction change rather than public page rendering because this change-set does not modify shipped MDX or `docs.json`. [qa-log:2026-08-17-19:32-Q2]

- Confirm `AGENTS.md` has one strong trigger to the workflow and contains no generic setup placeholders. [file:AGENTS.md:1]
- Confirm tracked files contain no Content Rewriter instruction and that local `CLAUDE.md` imports `@AGENTS.md`. [file:CLAUDE.md:91]
- Confirm the workflow handles both a new page and a materially changed existing page, including keep/move/split/merge outcomes. [user]
- Confirm a simulated QuillBot result that drops a keyword, technical entity, URL, number, or factual qualification fails the written preservation gate. [user]
- Run the repository's confidentiality, external-link, Mintlify validation, and broken-link checks; record any check that does not apply or cannot run. [file:CLAUDE.md:201]
- Review the final tracked diff and the separate local `CLAUDE.md` diff before handoff. [file:.gitignore:4]

## Explicit exclusions

- No current MDX page or `docs.json` navigation entry moves in this change-set. [qa-log:2026-08-17-19:32-Q2]
- No QuillBot API, browser automation script, preservation utility, dependency, or generated artifact is added. [qa-log:2026-08-17-19:32-Q2]
- No dependency advisory is fixed; `npm ci` surfaced two pre-existing high-severity advisories that belong to a separate dependency task. [file:package-lock.json:1]
- No Codegraph index is created. [qa-log:2026-08-17-19:32-Q2]
