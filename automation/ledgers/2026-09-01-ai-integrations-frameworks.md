# Humanizer ledger — ai-integrations/frameworks

_Pass 1: strength Quality. Pass 2: strength More Human on everything unchanged._
_Run 2026-09-01 · University / Article · via ja-k8s/scripts/undetectable.mjs_

## Outcome

| | count |
|---|---|
| Unique eligible blocks | 55 |
| Returned unchanged after both strengths | 24 |
| Changed, failed protected-token count | 2 |
| Changed, passed token count | 29 |
| — of those, failed side-by-side semantic read | 23 |
| — of those, accepted | 6 |

**Median expansion on changed blocks: 1.97x. Nothing applied to the pages.**

## Side-by-side review of the 29 token-passing blocks

### 1. REJECT — 1.89x

**Reason:** "key or grant" -> "key or access level"; grant is a product concept

**Before**

> Use this section to wire Sendmux into an agent you are building in code. Every framework here reaches Sendmux through MCP, so the tools your agent gets are the tools your key or grant allows.

**After**

> To connect Sendmux to an agent in your code, you'll need to go through MCP. This means the tools available to your agent will depend on the permissions granted by your key or access level. Think of it like a gateway: MCP is the middleman that helps Sendmux talk to your agent, and what your agent can do is determined by what you're allowed to do.

### 2. REJECT — 2.5x

**Reason:** security warning softened: "do not commit to version control" -> "do not share with others"

**Before**

> Replace placeholder keys and tokens before running any snippet. Do not commit `smx_root_`, `smx_mbx_`, or private HTTP bearer tokens to version control.

**After**

> Before you run any code, make sure to swap out the placeholder keys and tokens with your own. This is important because you shouldn't share your private information, like `smx_root_` or `smx_mbx_`, or your private HTTP bearer tokens, with others. Also, remember to keep these details out of your version control system to stay safe.

### 3. REJECT — 2.5x

**Reason:** padding only; expansion without new information

**Before**

> Framework agents run without a browser, so pick the connection your runtime can complete.

**After**

> When it comes to framework agents, they don't need a browser to run, so you should choose a connection that your runtime can handle. This way, your runtime can complete the connection without any issues.

### 4. REJECT — 1.86x

**Reason:** padding only; expansion without new information

**Before**

> The local package installs from PyPI, so a stdio connection needs Python available in the same runtime. Choose private HTTP when your service runs somewhere that cannot install it.

**After**

> When you're setting up a local package, it's going to install from PyPI. For this to work, you need to have Python available in the same runtime, so it can use the stdio connection. But if your service is running in a place where you can't install things, you should choose private HTTP instead.

### 5. REJECT — 2.41x

**Reason:** padding only; expansion without new information

**Before**

> Tool names are generated from the current public API surfaces, so open your framework's tool listing after connecting to see what a given key or grant exposes.

**After**

> When you connect to a framework, take a look at its tool listing to see what tools are available. The names of these tools are created based on the current public API surfaces, so what you see is what a specific key or grant gives you access to. This way, you can easily find out what tools you can use and what they can do.

### 6. REJECT — 2.19x

**Reason:** padding only; expansion without new information

**Before**

> Mastra launches the server as a child process and passes your key through the process environment.

**After**

> So, when Mastra starts the server, it does so as a separate process, known as a child process, and it shares your key with this new process through the environment that the process runs in.

### 7. REJECT — 1.62x

**Reason:** padding only; expansion without new information

**Before**

> Then point `MCPClient` at it and send the bearer token on every request:

**After**

> Next, direct `MCPClient` to the specified location and make sure to include the bearer token in each request that is sent.

### 8. REJECT — 1.6x

**Reason:** padding only; expansion without new information

**Before**

> Load the tools once at startup when the key is the same for every request.

**After**

> Load your tools just one time when your program starts, if the key you're using is the same every time you make a request.

### 9. REJECT — 1.97x

**Reason:** inverts what a durable token is; drops "Sending-resource"; "one-hour" -> vague

**Before**

> A durable `smx_agent_` token includes `mailbox.read` and `email.receive`, not `email.send`. After a named human owner accepts the invite and approves sending, exchange the durable token for a one-hour Sending-resource token and pass that as `SENDMUX_SENDING_API_KEY`.

**After**

> When you're setting up a strong `smx_agent_` token, it needs to include things like `mailbox.read` and `email.receive`, but it won't have `email.send`. So, here's what you do: after a real person who owns the account says it's okay and agrees to let emails be sent, you trade the strong token for a special one-hour token that lets you send things. Then, you use this new token as the `SENDMUX_SENDING_API_KEY`.

### 10. REJECT — 1.5x

**Reason:** `sendmux-mcp` relabelled "the feature"; it is an entry point

**Before**

> Confirm the surfaces the server started with. `sendmux-mcp` requires `SENDMUX_MCP_SURFACES`; the single-surface entry points do not.

**After**

> Check the surfaces that the server initially used. The `sendmux-mcp` feature needs the `SENDMUX_MCP_SURFACES` setting, but this isn't required for the single-surface entry points.

### 11. REJECT — 2.36x

**Reason:** padding only; expansion without new information

**Before**

> Check the key prefix. Mailbox accepts `smx_mbx_` or a scoped `smx_agent_`, Sending accepts a send-capable `smx_mbx_` or an owner-approved Sending-resource `smx_agent_`, and Management requires `smx_root_`.

**After**

> Check the key prefix to make sure it's correct. For a mailbox, you can use either `smx_mbx_` or `smx_agent_` with a scope. If you're sending something, you'll need a key that can send, like `smx_mbx_`, or a special sending resource key, `smx_agent_`, that's been approved by the owner. But for management, you'll need a key that starts with `smx_root_`.

### 12. REJECT — 2.0x

**Reason:** padding only; expansion without new information

**Before**

> Start the workflow with `mailbox_list_granted_mailboxes` and pass the returned `mailbox_id` to tools that act on one mailbox.

**After**

> To get started with the workflow, begin by using `mailbox_list_granted_mailboxes`. This will give you the `mailbox_id` that you need. Then, you can pass this `mailbox_id` to other tools that work with just one mailbox.

### 13. ACCEPT — 1.63x

**Before**

> The adapter launches the server and passes your key through the subprocess environment. Values written as `${VAR}` are expanded from the current environment, so the key never appears in source.

**After**

> When the adapter starts the server, it sends your key through the environment of the subprocess. Any values that are written like `${VAR}` are looked up in the current environment, which means your key is never visible in the source code. This helps keep your key safe and secure.

### 14. REJECT — 1.81x

**Reason:** padding only; expansion without new information

**Before**

> Run more than one surface by switching to the `sendmux-mcp` entry point and naming the surfaces:

**After**

> To use multiple surfaces, you can switch to the `sendmux-mcp` entry point and then name each surface. This allows you to run more than one surface at a time.

### 15. REJECT — 2.44x

**Reason:** fabricates a reader problem state ("you are having some trouble with your graph")

**Before**

> Use this when your graph runs somewhere it cannot spawn a process. Start the server yourself:

**After**

> So you're having some trouble with your graph, and it's not able to spawn a process where it's running. In this case, you can try starting the server manually - this should help get things up and running smoothly.

### 16. ACCEPT — 1.08x

**Before**

> Then connect with the streamable HTTP transport and send the bearer token:

**After**

> Next, link up with the streamable HTTP transport and include the bearer token.

### 17. ACCEPT — 1.74x

**Before**

> Set `tool_name_prefix=True` on `MultiServerMCPClient` when you connect Sendmux alongside other MCP servers. It prefixes tool names with the server name and prevents collisions.

**After**

> When you're connecting Sendmux with other MCP servers, make sure to set `tool_name_prefix=True` on `MultiServerMCPClient`. This is really important because it adds the server name to the start of each tool name, which helps prevent them from getting mixed up.

### 18. REJECT — 2.42x

**Reason:** padding only; expansion without new information

**Before**

> Run more than one surface by switching to the `sendmux-mcp` entry point:

**After**

> To run multiple surfaces, you need to switch to a different entry point, specifically `sendmux-mcp`. This allows you to manage and run more than one surface at a time.

### 19. ACCEPT — 1.32x

**Before**

> Open your MCP tool listing after connecting to confirm the exact names your key exposes. Tool names are generated from the current public API surfaces.

**After**

> When you connect and open your MCP tool list, double-check the exact names that your key is showing. These tool names are created based on what's currently available in the public API surfaces.

### 20. REJECT — 2.5x

**Reason:** appends two invented closing sentences not in the baseline

**Before**

> CrewAI does not document custom request headers for its HTTP transports, and private HTTP mode requires `SENDMUX_MCP_HTTP_BEARER_TOKEN` unless you start it with `--allow-unauthenticated-http`. Use the stdio connection above when the crew needs an authenticated Sendmux connection.

**After**

> When using CrewAI, it's worth noting that custom request headers for HTTP transports aren't documented. If you're working with private HTTP mode, you'll need to include the `SENDMUX_MCP_HTTP_BEARER_TOKEN` unless you start it with the `--allow-unauthenticated-http` option. In cases where the crew requires an authenticated Sendmux connection, it's recommended to use the stdio connection mentioned earlier. This approach helps ensure a secure and authenticated connection, which is particularly important when working with sensitive data or configurations. By following this guideline, you can maintain the integrity and security of your CrewAI setup.

### 21. REJECT — 1.71x

**Reason:** padding only; expansion without new information

**Before**

> HTTP is the better fit for most AI SDK deployments, because serverless and edge runtimes usually cannot spawn a process. Start the server where your key can live:

**After**

> When it comes to deploying AI SDKs, HTTP is usually the way to go. This is because serverless and edge runtimes often don't have the ability to spawn a new process. So, you'll want to start the server in a place where your key can be safely stored.

### 22. ACCEPT — 1.31x

**Before**

> Fetch the tools, pass them to the model, and close the client when the call finishes.

**After**

> Get the tools and hand them over to the model. Once the call is done, go ahead and close the client.

### 23. REJECT — 2.44x

**Reason:** padding only; expansion without new information

**Before**

> When you stream, close the client in `onEnd` so the connection does not outlive the response:

**After**

> When you're streaming, make sure to close the client when you're done, like in the `onEnd` part, so the connection doesn't stay open longer than it needs to. This way, you can keep the connection from outlasting the response.

### 24. REJECT — 2.23x

**Reason:** appends two invented closing sentences not in the baseline

**Before**

> Spreading several tool sets into one object lets later sets override earlier tools with the same name. Keep Sendmux in its own client, or namespace the others, when you connect more than one MCP server.

**After**

> When you're combining multiple tool sets into a single object, it's essential to remember that later sets can override earlier tools that share the same name. To avoid any potential conflicts, consider keeping Sendmux in its own separate client or namespace the other tools when connecting to multiple MCP servers. This approach will help prevent naming clashes and ensure a smoother operation. By doing so, you can maintain better control over your tools and avoid any unexpected overrides.

### 25. REJECT — 2.29x

**Reason:** same token inversion as 9; adds "we will call SENDMUX_SENDING_API_KEY"

**Before**

> A durable `smx_agent_` token includes `mailbox.read` and `email.receive`, not `email.send`. After a named human owner accepts the invite and approves sending, exchange the durable token for a one-hour Sending-resource token and start the server with it as `SENDMUX_SENDING_API_KEY`.

**After**

> So when we're talking about a strong `smx_agent_` token, it's got a couple of important things included - `mailbox.read` and `email.receive`. But one thing it doesn't have is `email.send`. Now, let's say we've got a real person who's in charge, and they've accepted an invite and given the okay for sending to happen. At that point, we can swap out the strong token for a special one-hour token that's just for sending, and we can start up the server with this new token, which we'll call `SENDMUX_SENDING_API_KEY`.

### 26. REJECT — 1.14x

**Reason:** expands SDK to "software development kit", breaking page-wide term use

**Before**

> The SDK manages the subprocess for you and passes your key through its environment.

**After**

> The software development kit takes care of the subprocess and sends your key through its environment.

### 27. REJECT — 2.35x

**Reason:** appends an invented closing sentence

**Before**

> The SDK can hold a tool for approval before it runs. Pair this with the Sendmux sending gate when a human should see the message first.

**After**

> The SDK has the ability to hold a tool in approval mode before it actually runs. This can be paired with the Sendmux sending gate, which allows a human to review the message first before it's sent. This way, you can ensure that a person sees the message before it's processed by the tool, giving you more control over the workflow.

### 28. REJECT — 2.5x

**Reason:** FACTUAL ERROR: says tool_filter hides *surfaces*; it hides *tools*

**Before**

> Confirm the surfaces the server started with. `sendmux-mcp` requires `SENDMUX_MCP_SURFACES`; the single-surface entry points do not. Check `tool_filter` as well, since it hides everything it does not name.

**After**

> To confirm the surfaces the server started with, you need to check the `SENDMUX_MCP_SURFACES` setting, which is required for `sendmux-mcp`. However, if you're using single-surface entry points, this isn't necessary. Additionally, don't forget to look at `tool_filter` because it will hide any surfaces that aren't explicitly named in its configuration. This means you should verify that the surfaces you're expecting are included in `tool_filter` to ensure they're not being hidden.

### 29. ACCEPT — 1.48x

**Before**

> For a per-request key over private HTTP, supply `header_provider` instead. It runs at session creation and merges its headers into every tool call.

**After**

> When you're using a private HTTP connection and need a key for each request, use `header_provider` as an alternative. This runs when the session is created and adds its headers to every tool call.

## Returned unchanged at both strengths

- These pages cover frameworks you build agents with. To configure Sendmux in a coding assistant such as Claude Code or Cursor, use
- Local stdio is the shortest path for a single service. Private HTTP suits containers, serverless runtimes, and any framework whose MCP client sends headers but cannot spawn a process.
- Give an agent the narrowest surface that completes its task. A mailbox-scoped key confines the agent to the mail you granted it. A `smx_root_` key does not.
- Run more than one surface in a single server by using the `sendmux-mcp` entry point instead:
- Use this when your Mastra service runs somewhere it cannot spawn a process. Start the server yourself:
- When the key changes per tenant, per customer, or per agent, build the client at request time and pass its toolsets into the call instead of binding them to the agent.
- A mailbox-scoped key is the isolation boundary. An agent holding one structurally cannot read another tenant's mail, so provision a key per mailbox rather than sharing one across tenants.
- `get_tools()` returns LangChain tools you can hand to a prebuilt agent or bind to a model inside your own graph.
- Mailbox-scoped keys are the isolation boundary. Build a client per tenant rather than sharing one across the graph, so the agent working one tenant structurally cannot read another tenant's mail.
- Stdio is the recommended connection for CrewAI, because the adapter passes your key through the subprocess environment.
- Pass tool names to the adapter when an agent should only reach part of a surface. A triage agent that never sends is safer than one that could.
- Use manual management when the crew outlives a single block. Always stop the adapter.
- Mailbox-scoped keys are the isolation boundary. Build the server parameters per tenant so the crew working one tenant structurally cannot read another tenant's mail.
- Call `mcp_server_adapter.stop()` in a `finally` block, or use the context manager so the connection closes for you.
- Mailbox-scoped keys are the isolation boundary. Create the client per request with that tenant's key so the agent working one tenant structurally cannot read another tenant's mail. Close it when the request ends.
- Close the client in `finally`, or in `onEnd` when streaming. Every request that opens a client has to close one.
- Use this when the agent runs somewhere it cannot spawn a process. Start the server yourself:
- `tool_filter` narrows what the model can see at all. Use it to build a read-only triage agent, then add the sending tools only to the agent that is meant to reply.
- Mailbox-scoped keys are the isolation boundary. Open a server per tenant so the agent working one tenant structurally cannot read another tenant's mail.
- Raise `client_session_timeout_seconds`, and set `max_retry_attempts` so transient list and call failures retry with backoff.
- The toolset launches the server and passes your key through the subprocess environment.
- `tool_filter` limits the toolset to named tools. A triage agent that never sends is safer than one that could.
- Mailbox-scoped keys are the isolation boundary. Build a toolset per tenant so the agent working one tenant structurally cannot read another tenant's mail.
- ADK blocks stdio MCP servers declared in external agent configuration unless you set `ADK_ALLOW_CONFIG_STDIO_MCP_SERVERS=1`. Define the toolset in code, or opt in only for configurations you trust.

## Held — contain link destinations, never submitted

- mastra.mdx: Use this page to connect a <a href="https://mastra.ai" rel="nofollow noopener noreferrer" 
- langgraph.mdx: Use this page to load Sendmux tools into a <a href="https://langchain-ai.github.io/langgra
- crewai.mdx: Use this page to give a <a href="https://www.crewai.com" rel="nofollow noopener noreferrer
- ai-sdk.mdx: Use this page to connect the <a href="https://ai-sdk.dev" rel="nofollow noopener noreferre
- openai-agents-sdk.mdx: Use this page to attach Sendmux to an <a href="https://openai.github.io/openai-agents-pyth
- google-adk.mdx: Use this page to give a <a href="https://google.github.io/adk-docs/" rel="nofollow noopene