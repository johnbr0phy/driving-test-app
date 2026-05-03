import { NextRequest, NextResponse } from 'next/server';
import {
  consumeAuthCode,
  lookupRefreshToken,
  revokeRefreshToken,
  saveRefreshToken,
} from '@/lib/server/oauth-store';
import {
  mintAccessToken,
  mintRefreshToken,
  hashRefreshToken,
} from '@/lib/server/mcp-auth';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function oauthError(
  error: 'invalid_grant' | 'invalid_request' | 'invalid_client' | 'unsupported_grant_type',
  description: string
): NextResponse {
  return NextResponse.json(
    { error, error_description: description },
    { status: 400, headers: CORS_HEADERS }
  );
}

/**
 * Compute base64url(SHA-256(input)) using Web Crypto SubtleCrypto.
 * PKCE spec requires base64url (RFC 4648 §5): replace + with -, / with _, strip = padding.
 * Node 20+ exposes globalThis.crypto.subtle.
 */
async function pkceS256(verifier: string): Promise<string> {
  const encoded = new TextEncoder().encode(verifier);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', encoded);
  const base64 = Buffer.from(digest).toString('base64');
  // Convert standard base64 → base64url
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function handleAuthorizationCode(form: URLSearchParams): Promise<NextResponse> {
  const code = form.get('code');
  const redirect_uri = form.get('redirect_uri');
  const client_id = form.get('client_id');
  const code_verifier = form.get('code_verifier');

  if (!code || !redirect_uri || !client_id || !code_verifier) {
    return oauthError('invalid_request', 'code, redirect_uri, client_id, and code_verifier are required.');
  }

  // Atomic consume — single-use. If this returns null, the code is gone.
  const authCode = await consumeAuthCode(code);
  if (!authCode) {
    return oauthError('invalid_grant', 'Authorization code is invalid or expired.');
  }

  // Validate redirect_uri exact match
  if (authCode.redirectUri !== redirect_uri) {
    return oauthError('invalid_grant', 'redirect_uri does not match the one used at authorization.');
  }

  // Validate client_id
  if (authCode.clientId !== client_id) {
    return oauthError('invalid_client', 'client_id does not match the one used at authorization.');
  }

  // PKCE S256 verification — base64url(SHA-256(verifier)) must match stored challenge
  const computedChallenge = await pkceS256(code_verifier);
  if (computedChallenge !== authCode.codeChallenge) {
    return oauthError('invalid_grant', 'PKCE code_verifier does not match code_challenge.');
  }

  const accessToken = mintAccessToken(authCode.userId, authCode.scope);
  const { token: refreshToken, hash: refreshTokenHash } = mintRefreshToken();

  await saveRefreshToken({
    tokenHash: refreshTokenHash,
    userId: authCode.userId,
    clientId: authCode.clientId,
  });

  return NextResponse.json(
    {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: refreshToken,
      scope: authCode.scope,
    },
    { status: 200, headers: CORS_HEADERS }
  );
}

async function handleRefreshToken(form: URLSearchParams): Promise<NextResponse> {
  const refresh_token = form.get('refresh_token');
  const client_id = form.get('client_id');

  if (!refresh_token || !client_id) {
    return oauthError('invalid_request', 'refresh_token and client_id are required.');
  }

  const tokenHash = hashRefreshToken(refresh_token);
  const storedToken = await lookupRefreshToken(tokenHash);

  if (!storedToken) {
    return oauthError('invalid_grant', 'Refresh token is invalid, expired, or revoked.');
  }

  if (storedToken.clientId !== client_id) {
    return oauthError('invalid_client', 'client_id does not match the refresh token.');
  }

  // Rotate: revoke old, mint new pair
  await revokeRefreshToken(tokenHash);

  const accessToken = mintAccessToken(storedToken.userId);
  const { token: newRefreshToken, hash: newRefreshTokenHash } = mintRefreshToken();

  await saveRefreshToken({
    tokenHash: newRefreshTokenHash,
    userId: storedToken.userId,
    clientId: storedToken.clientId,
  });

  return NextResponse.json(
    {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: newRefreshToken,
      scope: 'mcp',
    },
    { status: 200, headers: CORS_HEADERS }
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let form: URLSearchParams;
  try {
    const formData = await request.formData();
    // Convert FormData to URLSearchParams for uniform access
    form = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        form.set(key, value);
      }
    }
  } catch {
    return oauthError('invalid_request', 'Request body must be application/x-www-form-urlencoded.');
  }

  const grant_type = form.get('grant_type');

  if (grant_type === 'authorization_code') {
    return handleAuthorizationCode(form);
  }

  if (grant_type === 'refresh_token') {
    return handleRefreshToken(form);
  }

  return oauthError('unsupported_grant_type', 'grant_type must be authorization_code or refresh_token.');
}
