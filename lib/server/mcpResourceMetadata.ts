import { NextResponse } from 'next/server';

// OAuth 2.0 Protected Resource Metadata (RFC 9728) for the MCP server, served
// at /.well-known/oauth-protected-resource and the path-suffixed
// /.well-known/oauth-protected-resource/api/mcp. Current MCP clients (Claude,
// ChatGPT, Meta's Muse connector client, MCP Inspector) read it to learn which
// authorization server protects /api/mcp before starting OAuth; the 401 from
// /api/mcp points here with a `resource_metadata` hint.

export const RESOURCE_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, mcp-protocol-version',
};

export function protectedResourceMetadata(): NextResponse {
  const issuer = (process.env.MCP_OAUTH_ISSUER_URL ?? '').replace(/\/$/, '');
  if (!issuer) {
    return NextResponse.json(
      { error: 'server_error', error_description: 'MCP_OAUTH_ISSUER_URL is not configured.' },
      { status: 500, headers: RESOURCE_CORS_HEADERS },
    );
  }
  return NextResponse.json(
    {
      resource: `${issuer}/api/mcp`,
      authorization_servers: [issuer],
      scopes_supported: ['mcp'],
      bearer_methods_supported: ['header'],
      resource_name: 'Tigertest',
      resource_documentation: `${issuer}/developers`,
    },
    { headers: { ...RESOURCE_CORS_HEADERS, 'Cache-Control': 'public, max-age=3600' } },
  );
}
