# Documentation authoring workflow

Use this workflow for every new, moved, or materially edited reader-facing documentation page or prose block. Complete the placement gate before writing and the provider-neutral humanisation gate before release when the change qualifies.

## 1. Read before writing

1. Read repository-root `AGENTS.md`, local `CLAUDE.md` when present, and the active session plan.
2. Read the complete `navigation` tree in `docs.json`; do not inspect only the page's current group.
3. Search all MDX, snippets, OpenAPI prose, and redirects for the subject and its synonyms.
4. Read two or three sibling pages that serve the same reader task.
5. Verify technical and product claims from their owning source. The verified pre-humanisation copy is the frozen baseline.

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

## 4. Determine whether humanisation is required

Humanisation is required when the change adds reader-facing prose, changes sentence meaning or structure, or replaces a complete visible sentence or paragraph in shipped MDX, OpenAPI-rendered prose, snippets, or changelog prose.

Humanisation is not required for an exact technical-token correction, metadata-only edit, punctuation-only edit, generated artifact, code-only change, or agent-only instruction. Record `Humanisation: skipped — <exact exemption>` when skipping it.

This workflow enables the canonical contract's `ineligible-technical` disposition for documentation and technical guides. Apply the contract's complete criteria before the guard and only to one atomic technical-reference paragraph or list item. Do not exempt a whole page or section, or any explanatory, tutorial, transitional, or promotional prose, merely because it discusses a technical subject. Preserve a qualifying unit byte-identically and record its source evidence, protected assertions, manual checks, and eligibility reason in the ledger.

Historical `reference-class` ledgers remain byte-identical evidence only. They do not authorise a current material edit, current source fallback, or release while any prose unit is eligible.

## 5. Apply the fail-loud guard

Follow `/Users/rj/Desktop/GIT-REPOS/ja-k8s/AA-claude-prompts/humanisation-finalisation.md`. When the inventory contains eligible prose, invoke `/Users/rj/Desktop/GIT-REPOS/ja-k8s/scripts/humanise.mjs run` as one plain command and require its exact `humanisation-provider-unavailable` failure. Never use an external humanisation service, secret, MCP humaniser, browser interface, historical output, reviewed-source fallback, or inline rewrite.

This workflow additionally protects supplied SEO and long-tail keywords, technical entities, code tokens, commands, URLs, source links, numbers, units, product/protocol/provider names, schema fields, verified factual claims, frontmatter, heading hierarchy, code, tables, list structure, image markup, FAQ questions, link destinations, Australian English, and the repository's concise developer-docs voice.

Record every eligible unit as `blocked-manual-review` with reason `humanisation-provider-unavailable` and zero candidate attempts. Preserve every ineligible unit byte-identically with its existing manual checks. Any eligible unit blocks release. Do not publish the frozen baseline as if it passed humanisation.

## 6. Pass the preservation gate

Fail the gate if any protected occurrence is reduced without an explicit, task-authorised correction. Eligible output cannot advance while the guard is active; never weaken the gate or substitute the frozen baseline as a passing humanisation result.

Compare the frozen baseline and final copy and confirm:

- Frontmatter, heading hierarchy, code, tables, list structure, image markup, FAQ questions, and link destinations retain their intended structure.
- Supplied keyword, technical-entity, source-link, factual-claim, number, unit, product/protocol/provider, and schema-field occurrence counts do not decrease.
- Every factual rewrite remains equivalent to its verified baseline and source.
- No qualification, limit, warning, prerequisite, or reader instruction changes accidentally.
- The final copy still satisfies the page's title, description, keywords, direct-answer structure, and internal-link intent.

Read baseline and final copy side by side once more. The gate passes only when every difference is intentional and supported.

## 7. Verify and report

Run every repository gate that applies, including confidentiality, external-link, Mintlify validation, broken links, and rendered preview checks. Humanisation evidence never replaces technical verification or browser review.

Report:

```text
Placement: <tab → group → subgroup → page>
Disposition: <keep | move | split | merge>
Humanisation: <skipped — exact exemption or ineligible-technical | held — <N> blocked-manual-review units, reason humanisation-provider-unavailable>
Preservation: <protected counts unchanged; claims verified>
Status: <checks and release state>
```
