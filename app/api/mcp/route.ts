import { NextRequest } from 'next/server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { extractBearerToken, verifyAccessToken } from '@/lib/server/mcp-auth';
import { registerTools } from '@/lib/server/mcp-tools';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, mcp-session-id',
} as const;

function unauthorized(): Response {
  return new Response(JSON.stringify({ error: 'invalid_token' }), {
    status: 401,
    headers: {
      ...CORS_HEADERS,
      'WWW-Authenticate': 'Bearer realm="mcp", error="invalid_token"',
      'Content-Type': 'application/json',
    },
  });
}

async function handleMcpRequest(req: NextRequest): Promise<Response> {
  const authHeader = req.headers.get('authorization');
  const token = extractBearerToken(authHeader);
  if (!token) return unauthorized();

  const result = verifyAccessToken(token);
  if (!result.ok) return unauthorized();

  const ctx = { userId: result.userId };

  const server = new McpServer({ name: 'tigertest', version: '1.0.0' });
  registerTools(server, ctx);

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless
  });

  await server.connect(transport);

  const response = await transport.handleRequest(req);

  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleMcpRequest(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleMcpRequest(req);
}

export async function DELETE(req: NextRequest): Promise<Response> {
  return handleMcpRequest(req);
}
