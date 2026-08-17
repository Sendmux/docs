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
Sequence fit: <why the parent group appears before and after its neighbours>
```

For an existing page, reconsider its full scope after the planned edit. Prior placement is evidence, not proof that the page remains correctly placed.

Use these placement tests:

- Each level represents a distinct reader choice or task domain.
- Sibling pages answer related questions at the same conceptual level.
- The file path, navigation path, page title, breadcrumb, and related links tell the same story.
- Page count does not determine category boundaries. Create a group only when it clarifies the reader's choice.
- Add a group root only when readers need an introduction or decision page before choosing a child page.
- Prefer the shallowest hierarchy that preserves those distinctions; never flatten distinct tasks merely to reduce depth.

Audit sequence as well as placement whenever a top-level group is added, moved, renamed, or materially changed:

- Order groups by the reader journey and primary audience, not by when content was added.
- Put primary-audience workflows immediately after implementation tools.
- Keep paired core workflows adjacent.
- Put required prerequisites before the task they unblock; optional configuration may follow the core workflow.
- Keep operational guidance after the workflows it observes, then use cases and general integrations, with administration last.

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
