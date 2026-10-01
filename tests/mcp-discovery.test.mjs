import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import test from 'node:test';
import { checkMcpDiscovery } from '../scripts/check-mcp-discovery.mjs';

const metadata = { name: 'Sendmux', description: 'Hosted MCP server for authorised Sendmux Management, Mailbox, and Sending tools.', url: 'https://mcp.sendmux.ai/mcp' };

async function serve(t, status, contentType, body) {
  const server = createServer((request, response) => {
    if (request.url !== '/.well-known/mcp.json') { response.writeHead(404).end(); return; }
    response.writeHead(status, { 'Content-Type': contentType, Location: '/elsewhere' });
    response.end(body);
  }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  return `http://127.0.0.1:${server.address().port}`;
}

test('MCP discovery serves valid JSON with the hosted endpoint', async t => {
  const origin = await serve(t, 200, 'application/json; charset=utf-8', JSON.stringify(metadata));
  assert.deepEqual(await checkMcpDiscovery(origin), metadata);
});

test('MCP discovery rejects missing paths, redirects, HTML, malformed JSON, and wrong endpoints', async t => {
  for (const [name, status, type, body, message] of [
    ['missing', 404, 'application/json', '{}', /HTTP 200/],
    ['redirect', 308, 'application/json', '{}', /HTTP 200/],
    ['HTML fallback', 200, 'text/html', '<html>Missing</html>', /application\/json/],
    ['malformed JSON', 200, 'application/json', '{', /JSON/],
    ['wrong endpoint', 200, 'application/json', JSON.stringify({ ...metadata, url: 'https://example.com/mcp' }), /hosted endpoint/],
  ]) {
    await t.test(name, async t => {
      const origin = await serve(t, status, type, body);
      await assert.rejects(checkMcpDiscovery(origin), message);
    });
  }
});
