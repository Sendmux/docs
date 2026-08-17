# Guides navigation order design

## Goal

Make the Guides sidebar follow a developer-first reader journey, with AI integrations immediately after Developer tools and the primary Sending and Receiving workflows adjacent.

## Approved order

1. Getting started
2. Developer tools
3. AI integrations
4. Sending
5. Receiving
6. Domains
7. Monitoring
8. Webhooks
9. Use cases
10. Integrations
11. Account and billing

## Design rationale

- Onboarding and implementation tools come first.
- AI integrations follows Developer tools because developers are the primary audience and AI-agent setup is a primary implementation path.
- Sending and Receiving are the primary product workflows, so they remain adjacent.
- Domains follows because the shared domain supports the quickstart without custom-domain setup.
- Monitoring and Webhooks follow the workflows they observe and automate.
- Use cases and general integrations are expansion paths.
- Account and billing is administrative and belongs last.

## Rule design

- Keep one concise, developer-first ordering principle in repository `AGENTS.md`.
- Keep audience-priority sequence mechanics in `automation/docs-authoring-workflow.md`.
- Do not duplicate the rule in `CLAUDE.md`; it already imports `AGENTS.md`.
- Require future top-level navigation changes to reconsider neighbouring groups, not only the changed page's category.

## Compatibility and verification

- Reorder existing objects in `docs.json`; do not rename groups or change page paths.
- Preserve every icon, page entry, nested group, and existing redirect exactly.
- Verify the exact group order, icon coverage, unchanged redirect map, Mintlify validation, broken links, confidentiality, external-link safety, and rendered sidebar order.
