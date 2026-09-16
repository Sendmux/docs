# Pro allowance documentation release preparation

Recorded: 2026-09-16 20:02

Status: local release draft, not published. Application commit4506336c implements the policy and the approved design. The operator approved the signed-in localhost design, then requested and received the verified Billing transaction empty-state adjustment. Production rollout remains separately gated.

Placement: existing Account and billing > Billing and limits, Sending > Sending accounts, and global Product updates. Page scope and navigation remain unchanged.

Changes: the three existing policy pages describe team-visible allowances over six resources, Request increase at80% usage, repeated administrator decisions, and unchanged billing/email-volume rules. Changelog prepends one draft update; confirm its date at actual publication and preserve all older entries. No private starting-cap table or public API shape was added.

Source: application src/server/team-resource-limits.ts supplies finitePro policy and repeated request/approval; src/server/billing/stripe-billing-runtime.ts preserves saved allowances; src/server/api-keys.ts serialises same-key replacement; rendered Billing/resource components supply customer behaviour. Real disposable integration tests cover359cases; latest full unit4261cases and production-build signed-in journey1/1 pass. No actual production delivery has been asserted.

Validation: prior unchanged docs tooling suite12/12, confidentiality, external-link, Mintlify and broken-link checks passed. After adding the changelog draft, confidentiality, external-link, Mintlify build validation and diff checks passed again. All draft prose assertions match the app source, prior history is preserved, no new external link exists.

Humanisation: five policy units plus three changelog reference paragraphs use the scoped atomic technical-reference exception or frozen-table rule in automation/docs-authoring-workflow.md. Every clause is a source-backed product assertion or reader instruction; no promotional/narrative prose or provider call. Headings, Update metadata and exact CTA are frozen. Canonical hash rows below carry zero blocked units. Private full reports are MAIN sendmux/.claude/artifacts/pro-resource-allowances/docs-implementation-report.md and changelog-humanisation-ledger.json; the earlier report predates this changelog draft.

Release: app push gate requires docs pushed after the product commit. Docs repo normally publishes directly to main. The operator explicitly approved a temporary unpublished docs branch so the app PR can be reviewed before live publication. Push only agent/pro-resource-allowances; main publication and product rollout remain separately gated.

```json
[
  {
    "id": "team-limits#p001",
    "eligibility": "ineligible-technical",
    "editableCharacters": 286,
    "sourceSha256": "884a3ea1a1aa0770075f47409ae7cc8c2640ff0c51930389540faaec14011e44",
    "finalSha256": "884a3ea1a1aa0770075f47409ae7cc8c2640ff0c51930389540faaec14011e44",
    "changedFromSource": false,
    "transport": null,
    "attempt": 0,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "source-backed assertions and reader instructions only",
      "meaning and claim scope preserved",
      "Australian English checked",
      "hard bans checked"
    ],
    "disposition": "ineligible-technical"
  },
  {
    "id": "team-limits#p002",
    "eligibility": "ineligible-technical",
    "editableCharacters": 336,
    "sourceSha256": "8d01d4beec33a16e939801f096683a72609f9d90f5a2f50be5e543bcd2fb38f2",
    "finalSha256": "8d01d4beec33a16e939801f096683a72609f9d90f5a2f50be5e543bcd2fb38f2",
    "changedFromSource": false,
    "transport": null,
    "attempt": 0,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "source-backed assertions and reader instructions only",
      "meaning and claim scope preserved",
      "Australian English checked",
      "hard bans checked"
    ],
    "disposition": "ineligible-technical"
  },
  {
    "id": "team-limits#p003",
    "eligibility": "ineligible-technical",
    "editableCharacters": 211,
    "sourceSha256": "c8b8c296ccabbedd8ab67bf4a91a35056af2517004efed44fe0a7abe3a6d76f9",
    "finalSha256": "c8b8c296ccabbedd8ab67bf4a91a35056af2517004efed44fe0a7abe3a6d76f9",
    "changedFromSource": false,
    "transport": null,
    "attempt": 0,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "source-backed assertions and reader instructions only",
      "meaning and claim scope preserved",
      "Australian English checked",
      "hard bans checked"
    ],
    "disposition": "ineligible-technical"
  },
  {
    "id": "billing#table-pro",
    "eligibility": "excluded-frozen",
    "editableCharacters": 0,
    "sourceSha256": "f96798d55aaae015fc89af1046ed82bed49bb81e5ce6a69171380d09c47fa25c",
    "finalSha256": "f96798d55aaae015fc89af1046ed82bed49bb81e5ce6a69171380d09c47fa25c",
    "changedFromSource": false,
    "transport": null,
    "attempt": 0,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "table content is frozen by the workflow",
      "meaning and claim scope preserved",
      "hard bans checked"
    ],
    "disposition": "excluded-frozen"
  },
  {
    "id": "sending-accounts#table-pro",
    "eligibility": "excluded-frozen",
    "editableCharacters": 0,
    "sourceSha256": "f24bcb2f3cd3f8ac2f2a554d71df13573ed596e785adc677185ded41e91f413f",
    "finalSha256": "f24bcb2f3cd3f8ac2f2a554d71df13573ed596e785adc677185ded41e91f413f",
    "changedFromSource": false,
    "transport": null,
    "attempt": 0,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "table content is frozen by the workflow",
      "meaning and claim scope preserved",
      "hard bans checked"
    ],
    "disposition": "excluded-frozen"
  },
  {
    "id": "changelog-pro-allowances#p001",
    "eligibility": "ineligible-technical",
    "editableCharacters": 153,
    "sourceSha256": "99a203368c2fdaf7efc3ad77eb29cb626c040ddd32c493a3d8812fd145ed0275",
    "finalSha256": "99a203368c2fdaf7efc3ad77eb29cb626c040ddd32c493a3d8812fd145ed0275",
    "changedFromSource": false,
    "transport": null,
    "attempt": null,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "source-backed assertions and reader instructions only",
      "meaning and claim scope verified",
      "Australian English checked",
      "hard bans checked",
      "existing changelog history preserved"
    ],
    "disposition": "ineligible-technical",
    "sourceEvidence": [
      "src/components/team-resource-limit-usage.tsx",
      "src/server/team-resource-limits.ts",
      "src/server/billing/stripe-billing-runtime.ts",
      "src/server/api-keys.ts",
      "tests/integration/pro-checkout-confirmation.test.ts",
      "tests/integration/api-key-rotation-concurrency.test.ts"
    ],
    "eligibilityReason": "Each atomic reference paragraph consists only of product behaviour assertions or reader instructions, without promotional or narrative prose; scoped exception enabled by automation/docs-authoring-workflow.md."
  },
  {
    "id": "changelog-pro-allowances#p002",
    "eligibility": "ineligible-technical",
    "editableCharacters": 263,
    "sourceSha256": "a1e6702c2d327a6bc643f79add8a3e532d3eae572d58ef409ded274968161dff",
    "finalSha256": "a1e6702c2d327a6bc643f79add8a3e532d3eae572d58ef409ded274968161dff",
    "changedFromSource": false,
    "transport": null,
    "attempt": null,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "source-backed assertions and reader instructions only",
      "meaning and claim scope verified",
      "Australian English checked",
      "hard bans checked",
      "existing changelog history preserved"
    ],
    "disposition": "ineligible-technical",
    "sourceEvidence": [
      "src/components/team-resource-limit-usage.tsx",
      "src/server/team-resource-limits.ts",
      "src/server/billing/stripe-billing-runtime.ts",
      "src/server/api-keys.ts",
      "tests/integration/pro-checkout-confirmation.test.ts",
      "tests/integration/api-key-rotation-concurrency.test.ts"
    ],
    "eligibilityReason": "Each atomic reference paragraph consists only of product behaviour assertions or reader instructions, without promotional or narrative prose; scoped exception enabled by automation/docs-authoring-workflow.md."
  },
  {
    "id": "changelog-pro-allowances#p003",
    "eligibility": "ineligible-technical",
    "editableCharacters": 227,
    "sourceSha256": "ae559033c05f3a8d1224f476d29c3767726bb2c38cf3621b6daf9487e9d9397e",
    "finalSha256": "ae559033c05f3a8d1224f476d29c3767726bb2c38cf3621b6daf9487e9d9397e",
    "changedFromSource": false,
    "transport": null,
    "attempt": null,
    "scoreSource": null,
    "scoreRaw": null,
    "scoreFinal": null,
    "repairs": [],
    "manualChecks": [
      "source-backed assertions and reader instructions only",
      "meaning and claim scope verified",
      "Australian English checked",
      "hard bans checked",
      "existing changelog history preserved"
    ],
    "disposition": "ineligible-technical",
    "sourceEvidence": [
      "src/components/team-resource-limit-usage.tsx",
      "src/server/team-resource-limits.ts",
      "src/server/billing/stripe-billing-runtime.ts",
      "src/server/api-keys.ts",
      "tests/integration/pro-checkout-confirmation.test.ts",
      "tests/integration/api-key-rotation-concurrency.test.ts"
    ],
    "eligibilityReason": "Each atomic reference paragraph consists only of product behaviour assertions or reader instructions, without promotional or narrative prose; scoped exception enabled by automation/docs-authoring-workflow.md."
  }
]
```
