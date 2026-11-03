# Webhook discriminator snapshot prerequisite

Part of qubrics/qubrics#897. Companion API branch: `agent/sdk-current-contract-897`.

The API producer names its two existing webhook payload variants so the generated snapshot carries explicit `type` discriminator mappings. Previously the inline variants had identical property names and ogen could not infer a discriminator from their enum values. This snapshot is emitted from the producer; no payload fields, event values, prose, hosts or runtime behaviour change.

Validation: API contract regression seen red (exit 1), then green (36/36 including closed-object composition); API `pnpm check:fast` exit 0; `pnpm spec:emit --output <this checkout>/openapi-app.json` exit 0; `npm run postman:emit` exit 0 with no collection diff; `npm run confidentiality:check` exit 0. Normal SDK Go generation against this snapshot exits 0 without generator or current-input binding changes. Remaining generation and CI must pass before delegated merge.

Initial Postman invocation found a missing local dependency (`ERR_MODULE_NOT_FOUND: openapi-to-postmanv2`); `npm ci` installed the committed lockfile, then the same command passed. No dependency changes.

Logs: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-897/current-contract-{postman,confidentiality,go}.log`. Source-only merge authorised; no publish or deploy invoked. Placement/polish: generated schema metadata only, no prose or navigation change.
