# Guides navigation order design

## Goal

Make the Guides sidebar follow the reader journey, with the primary Sending and Receiving workflows adjacent near the top.

## Approved order

1. Getting started
2. Developer tools
3. Sending
4. Receiving
5. Domains
6. Monitoring
7. Webhooks
8. Use cases
9. Integrations
10. AI integrations
11. Account and billing

## Design rationale

- Onboarding and implementation tools come first.
- Sending and Receiving are the primary product workflows, so they remain adjacent.
- Domains follows because the shared domain supports the quickstart without custom-domain setup.
- Monitoring and Webhooks follow the workflows they observe and automate.
- Use cases and integrations are expansion paths.
- Account and billing is administrative and belongs last.

## Rule design

- Keep the durable ordering principle in repository `AGENTS.md`.
- Add the sequence audit mechanics to `automation/docs-authoring-workflow.md`.
- Do not duplicate the rule in `CLAUDE.md`; it already imports `AGENTS.md`.
- Require future top-level navigation changes to reconsider neighbouring groups, not only the changed page's category.

## Compatibility and verification

- Reorder existing objects in `docs.json`; do not rename groups or change page paths.
- Preserve every icon, page entry, nested group, and existing redirect exactly.
- Verify the exact group order, icon coverage, unchanged redirect map, Mintlify validation, broken links, confidentiality, external-link safety, and rendered sidebar order.
