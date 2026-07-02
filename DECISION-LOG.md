# Decision Log - Attachments, Search, And Events

## Assumptions

1. This docs PR records public documentation and OpenAPI snapshot decisions for the attachment, search, and events change set. [file:openapi-app.json]
2. Backend and SDK implementation details are recorded in their paired PR decision logs; this repo records the public docs contract and generated snapshot state. [file:guides/attachments.mdx]

## Decisions

### Attachment Download URLs

Decision: Keep `MailboxAttachment.download_url` as the public attachment download field and document it as a short-lived URL that should be fetched promptly. [file:guides/attachments.mdx] [file:openapi-app.json]

Reasoning: Agents and browser-like clients need a URL they can fetch without adding request headers. If it expires, the documented workflow is to re-read message or attachment metadata for a fresh URL. [file:guides/attachments.mdx]

### Webhook Attachment Payloads

Decision: Webhook payload documentation keeps attachment identifiers and metadata as the durable contract; webhook payloads do not embed short-lived attachment URLs. [file:openapi-app.json]

Reasoning: Webhook delivery retries and retained payloads can outlive attachment URL expiry, so consumers should re-fetch metadata when they are ready to download.

### Realtime Compatibility

Decision: `MailboxRealtimeMessage.attachments` is optional in the OpenAPI schema for additive compatibility with older or cached realtime events, while current received-message events still include attachment metadata when available. [file:openapi-app.json]

Reasoning: Generated clients should not reject an otherwise valid realtime event solely because the additive attachment field is absent.

### Labels, Folders, And Search

Decision: Public docs rely on existing folder, keyword, filtered list/count, batch update, and snippet-search surfaces instead of introducing duplicate label or search primitives. [file:mailbox-api/introduction.mdx] [file:openapi-app.json]

Reasoning: The existing contract already supports folder moves, keyword labels, attachment-aware filters, sender/date/folder filters, and snippet search.

### MCP Binary Exposure

Decision: Docs teach MCP clients to use attachment metadata plus `download_url`, not raw binary attachment bytes returned from an MCP tool call. [file:guides/attachments.mdx] [research:https://modelcontextprotocol.io/specification/2025-06-18/server/tools]

Reasoning: MCP tools return structured results; attachment bytes are fetched through the URL surfaced in metadata.

### Event Lanes

Decision: The mailbox event stream remains the canonical live event lane for API, SDK, and CLI clients; MCP uses bounded wait tools and metadata refresh workflows instead of an unbounded event subscription inside one tool call. [file:mailbox-api/introduction.mdx] [research:https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events] [research:https://modelcontextprotocol.io/specification/2025-06-18/server/tools]

Reasoning: Server-sent events are the platform stream primitive for clients that can hold a connection open, while MCP tool calls should return bounded structured results.

## Found, Not Fixed

- Credentialed live MCP acceptance must be rerun after the backend PR is deployed; the currently deployed API does not yet return the new attachment metadata and presigned URL behaviour required by the final scenario. [file:DECISION-LOG.md]
