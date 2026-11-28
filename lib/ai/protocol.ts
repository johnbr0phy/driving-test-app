/** Small, explicit protocol bridge. Unsupported content fails instead of dropping exam evidence. */
export type Block = { type: string; [key: string]: unknown };
export interface Message { role: 'user' | 'assistant'; content: string | Block[] }
export interface Ask {
  model: string; max_tokens: number; system?: string | Block[]; messages: Message[];
  tools?: Block[]; output_config?: { effort?: string; format?: { type: string; schema: object } };
  tool_choice?: { type: string; name?: string }; stop_sequences?: string[];
}
export interface Reply {
  id: string; type: 'message'; role: 'assistant'; model: string; content: Block[];
  stop_reason: string; stop_sequence: string | null;
  usage: { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number; cache_read_input_tokens?: number; server_tool_use?: { web_search_requests: number } };
}

export function toResponses(ask: Ask, model: string) {
  const input: unknown[] = [];
  for (const m of ask.messages) {
    if (typeof m.content === 'string') { input.push({ role: m.role, content: m.content }); continue; }
    for (const b of m.content) {
      if (b.type === 'text') input.push({ role: m.role, content: String(b.text) });
      else if (b.type === 'tool_use') input.push({ type: 'function_call', call_id: b.id, name: b.name, arguments: JSON.stringify(b.input) });
      else if (b.type === 'tool_result') {
        const text = typeof b.content === 'string' ? b.content : JSON.stringify(b.content);
        input.push({ type: 'function_call_output', call_id: b.tool_use_id, output: text ?? '' });
      } else if (b.type === 'server_tool_use' || b.type === 'web_search_tool_result') {
        input.push({ role: m.role, content: JSON.stringify(b) });
      } else if (b.type === 'thinking' || b.type === 'redacted_thinking') {
        // Private reasoning is provider-specific. The public tool calls and their results are retained.
      } else throw new Error(`Unsupported cross-provider content: ${b.type}`);
    }
  }
  const tools = (ask.tools ?? []).map((t) => {
    if (String(t.type).startsWith('web_search_')) return { type: 'web_search' };
    if (!t.input_schema) throw new Error(`Unsupported cross-provider tool: ${t.type ?? t.name}`);
    return { type: 'function', name: t.name, description: t.description, parameters: t.input_schema, strict: false };
  });
  const format = ask.output_config?.format;
  return { model, input, instructions: typeof ask.system === 'string' ? ask.system : ask.system?.map((b) => {
    if (b.type !== 'text') throw new Error('Unsupported system content');
    return b.text;
  }).join('\n'), max_output_tokens: ask.max_tokens, store: false, service_tier: 'default',
  reasoning: { effort: ask.output_config?.effort === 'low' ? 'low' : 'high' },
  ...(tools.length ? { tools, max_tool_calls: 1, parallel_tool_calls: false } : {}),
  ...(tools.some((t) => t.type === 'web_search') ? { include: ['web_search_call.action.sources'] } : {}),
  ...(format ? { text: { format: { type: 'json_schema', name: 'result', schema: format.schema, strict: true } } } : {}),
  ...(ask.tool_choice?.type === 'tool' ? { tool_choice: { type: 'function', name: ask.tool_choice.name } } : {}) };
}

export function fromResponses(r: Record<string, any>): Reply {
  if (r.status !== 'completed') throw new Error('OpenAI response did not complete');
  const content: Block[] = [];
  let searches = 0;
  for (const o of r.output ?? []) {
    if (o.type === 'function_call') content.push({ type: 'tool_use', id: o.call_id, name: o.name, input: JSON.parse(o.arguments) });
    if (o.type === 'web_search_call') {
      searches++;
      content.push({ type: 'web_search_tool_result', content: (o.action?.sources ?? []).map((s: { url: string }) => ({ type: 'web_search_result', url: s.url })) });
    }
    if (o.type === 'message') for (const c of o.content ?? []) {
      if (c.type === 'refusal') throw new Error('OpenAI declined the request');
      if (c.type === 'output_text') content.push({ type: 'text', text: c.text,
        citations: (c.annotations ?? []).filter((a: { type: string }) => a.type === 'url_citation').map((a: { url: string; title: string }) => ({ type: 'web_search_result_location', url: a.url, title: a.title })) });
    }
  }
  if (!content.length) throw new Error('Empty OpenAI response');
  return { id: r.id, type: 'message', role: 'assistant', model: r.model, content,
    stop_reason: content.some((b) => b.type === 'tool_use') ? 'tool_use' : 'end_turn', stop_sequence: null,
    usage: { input_tokens: r.usage?.input_tokens ?? 0, output_tokens: r.usage?.output_tokens ?? 0,
      server_tool_use: { web_search_requests: searches } } };
}
