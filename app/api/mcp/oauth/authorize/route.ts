import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { getClient, savePendingAuth } from '@/lib/server/oauth-store';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function errorResponse(
  error: string,
  description: string,
  status: number
): NextResponse {
  return NextResponse.json(
    { error, error_description: description },
    { status, headers: CORS_HEADERS }
  );
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;

  const response_type = searchParams.get('response_type');
  const client_id = searchParams.get('client_id');
  const redirect_uri = searchParams.get('redirect_uri');
  const code_challenge = searchParams.get('code_challenge');
  const code_challenge_method = searchParams.get('code_challenge_method');
  const state = searchParams.get('state');
  const scope = searchParams.get('scope') ?? 'mcp';

  if (response_type !== 'code') {
    return errorResponse('unsupported_response_type', 'Only response_type=code is supported.', 400);
  }

  if (!client_id) {
    return errorResponse('invalid_request', 'client_id is required.', 400);
  }

  if (!redirect_uri) {
    return errorResponse('invalid_request', 'redirect_uri is required.', 400);
  }

  if (!code_challenge) {
    return errorResponse('invalid_request', 'code_challenge is required.', 400);
  }

  if (code_challenge_method !== 'S256') {
    return errorResponse('invalid_request', 'code_challenge_method must be S256.', 400);
  }

  const client = await getClient(client_id);
  if (!client) {
    return errorResponse('invalid_client', 'Unknown client_id.', 400);
  }

  // Exact-match redirect_uri — no prefix or wildcard matching (open redirect prevention)
  if (!client.redirectUris.includes(redirect_uri)) {
    return errorResponse('invalid_request', 'redirect_uri does not match any registered URI.', 400);
  }

  const pendingState = randomBytes(32).toString('hex');

  await savePendingAuth({
    state: pendingState,
    clientId: client_id,
    redirectUri: redirect_uri,
    codeChallenge: code_challenge,
    scope,
    clientState: state,
  });

  const issuer = process.env.MCP_OAUTH_ISSUER_URL;
  if (!issuer) {
    return errorResponse('server_error', 'MCP_OAUTH_ISSUER_URL is not configured.', 500);
  }

  const loginUrl = new URL('/oauth/login', issuer);
  loginUrl.searchParams.set('pending', pendingState);

  return NextResponse.redirect(loginUrl.toString(), { status: 302, headers: CORS_HEADERS });
}
