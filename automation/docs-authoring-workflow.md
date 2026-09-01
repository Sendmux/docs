# Documentation authoring workflow

Use this workflow for every new, moved, or materially edited reader-facing documentation page or prose block. Complete the placement gate before writing and the Humanizer gate before release when the change qualifies.

## 1. Read before writing

1. Read repository-root `AGENTS.md`, local `CLAUDE.md` when present, and the active session plan.
2. Read the complete `navigation` tree in `docs.json`; do not inspect only the page's current group.
3. Search all MDX, snippets, OpenAPI prose, and redirects for the subject and its synonyms.
4. Read two or three sibling pages that serve the same reader task.
5. Verify technical and product claims from their owning source. The verified pre-Humanizer copy is the frozen baseline.

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

## 4. Determine whether Humanizer is required

Humanizer is required when the change adds reader-facing prose, changes sentence meaning or structure, or replaces a complete visible sentence or paragraph in shipped MDX, OpenAPI-rendered prose, snippets, or changelog prose.

Humanizer is not required for an exact technical-token correction, metadata-only edit, punctuation-only edit, generated artifact, code-only change, or agent-only instruction. Record `Humanizer: skipped — <exact exemption>` when skipping it.

This workflow enables the canonical contract's `ineligible-technical` disposition for documentation and technical guides. Apply the contract's complete criteria before any provider request and only to one atomic technical-reference paragraph or list item. Do not exempt a whole page or section, or any explanatory, tutorial, transitional, or promotional prose, merely because it discusses a technical subject. Preserve a qualifying unit byte-identically and record its source evidence, protected assertions, manual checks, and eligibility reason in the ledger.

### Reference-class pages

A page earns the `reference-class` disposition by surviving a failed Humanizer run, never by assertion.

Qualify a page when all four hold:

- Its reader task is to make a named external system work against a Sendmux surface: API reference, SDK reference, MCP or framework integration, client setup.
- Its prose exists to sequence and qualify code, configuration, and exact identifiers. No section persuades, compares, or markets.
- A completed Humanizer run over its eligible units is recorded in a ledger under `automation/ledgers/`, carrying every unit's before text, after text, and verdict.
- That run failed on at least half the units. Count a unit failed when the provider returned it unchanged, when the output reduced a protected occurrence, or when the output changed a fact, a warning, a prerequisite, or a reader instruction.

For a qualifying page:

- Keep the frozen baseline byte-identically.
- Run the section 6 preservation gate against the baseline regardless. Structure, protected occurrences, and factual equivalence still apply.
- Add a voice pass against the voice profile covering em dashes, hype words, Australian English, and sentence length.
- Report `Humanizer: reference-class — <N> units, ledger at <path>`.

The disposition covers one page and lapses when that page changes materially. It never covers a landing page, a use-case page, a comparison page, a changelog entry, or any page whose job is to persuade.

First recorded application: `ai-integrations/frameworks/*` on 2026-09-01, ledger at `automation/ledgers/2026-09-01-ai-integrations-frameworks.md`. Fifty-five eligible units, forty-nine failed across two provider strengths.

## 5. Humanise eligible prose

Follow `/Users/rj/Desktop/GIT-REPOS/ja-k8s/AA-claude-prompts/undetectable-finalisation.md` and route all transport through `/Users/rj/Desktop/GIT-REPOS/ja-k8s/scripts/undetectable.mjs`. Never use a humaniser MCP, browser interface, private endpoint, or alternative provider.

Use the `University` / `Article` mapping. This workflow additionally protects supplied SEO and long-tail keywords, technical entities, code tokens, commands, URLs, source links, numbers, units, product/protocol/provider names, schema fields, verified factual claims, frontmatter, heading hierarchy, code, tables, list structure, image markup, FAQ questions, link destinations, Australian English, and the repository's concise developer-docs voice.

Any eligible unit that cannot pass the canonical acceptance checks blocks release and requires manual review. Do not publish the frozen baseline as if it passed Humanizer.

## 6. Pass the preservation gate

Fail the gate if any protected occurrence is reduced without an explicit, task-authorised correction. Restore the missing occurrence inside an accepted output or mark the unit blocked for manual review; never weaken the gate or substitute the frozen baseline as a passing Humanizer output.

Compare the frozen baseline and final copy and confirm:

- Frontmatter, heading hierarchy, code, tables, list structure, image markup, FAQ questions, and link destinations retain their intended structure.
- Supplied keyword, technical-entity, source-link, factual-claim, number, unit, product/protocol/provider, and schema-field occurrence counts do not decrease.
- Every factual rewrite remains equivalent to its verified baseline and source.
- No qualification, limit, warning, prerequisite, or reader instruction changes accidentally.
- The final copy still satisfies the page's title, description, keywords, direct-answer structure, and internal-link intent.

Read baseline and final copy side by side once more. The gate passes only when every difference is intentional and supported.

## 7. Verify and report

Run every repository gate that applies, including confidentiality, external-link, Mintlify validation, broken links, and rendered preview checks. A Humanizer pass never replaces technical verification or browser review.

Report:

```text
Placement: <tab → group → subgroup → page>
Disposition: <keep | move | split | merge>
Humanizer: <run — preserved | skipped — exact exemption or ineligible-technical | reference-class — <N> units, ledger at <path> | held — <N> blocked-manual-review units>
Preservation: <protected counts unchanged; claims verified>
Status: <checks and release state>
```
