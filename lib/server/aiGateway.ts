import { createServer } from 'node:http';
import type { AiSession } from '@/lib/server/ai';
import { AiUnavailable } from '@/lib/ai/budget';
import type { Reply } from '@/lib/ai/protocol';

function events(reply: Reply): string {
  const event = (type: string, data: object) => `event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`;
  let s = event('message_start', { message: { ...reply, content: [], stop_reason: null, usage: { ...reply.usage, output_tokens: 0 } } });
  reply.content.forEach((b, index) => {
    s += event('content_block_start', { index, content_block: b.type === 'text' ? { ...b, text: '' } : b.type === 'tool_use' ? { ...b, input: {} } : b });
    if (b.type === 'text') s += event('content_block_delta', { index, delta: { type: 'text_delta', text: b.text } });
    if (b.type === 'tool_use') s += event('content_block_delta', { index, delta: { type: 'input_json_delta', partial_json: JSON.stringify(b.input) } });
    s += event('content_block_stop', { index });
  });
  return s + event('message_delta', { delta: { stop_reason: reply.stop_reason, stop_sequence: reply.stop_sequence }, usage: reply.usage }) + event('message_stop', {});
}


export function createAiGateway(ai: Pick<AiSession, 'create'>, token: string) {
  return createServer(async (req, res) => {
    if (req.headers['x-api-key'] !== token && req.headers.authorization !== `Bearer ${token}`) { res.writeHead(401).end(); return; }
    try {
      const buffers: Buffer[] = []; let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 8_000_000) throw new Error('Request too large');
        buffers.push(chunk);
      }
      const body = JSON.parse(Buffer.concat(buffers).toString());
      if (req.url?.split('?')[0] === '/v1/messages/count_tokens') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ input_tokens: Buffer.byteLength(JSON.stringify(body)) + 8192 })); return;
      }
      if (req.url?.split('?')[0] !== '/v1/messages') { res.writeHead(404).end(); return; }
      // Strip client-only settings and unsupported provider fallback/pricing hints.
      const reply = await ai.create({ model: body.model, max_tokens: Math.min(body.max_tokens, 16000),
        system: body.system, messages: body.messages, tools: body.tools, output_config: body.output_config,
        tool_choice: body.tool_choice, stop_sequences: body.stop_sequences });
      res.setHeader('Content-Type', body.stream ? 'text/event-stream' : 'application/json');
      res.end(body.stream ? events(reply) : JSON.stringify(reply));
    } catch (e) {
      const budget = e instanceof AiUnavailable;
      res.writeHead(budget ? 402 : 500, { 'Content-Type': 'application/json' });
      // Do not emit provider responses or prompts into logs.
      res.end(JSON.stringify({ type: 'error', error: { type: budget ? 'billing_error' : 'api_error', message: budget ? 'Both AI providers are unavailable or out of budget' : 'AI request failed' } }));
    }
  });
}
