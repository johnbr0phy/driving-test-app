import { NextRequest, NextResponse } from 'next/server';
import { registerClient } from '@/lib/server/oauth-store';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function isValidUrl(s: string): boolean {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'Request body must be valid JSON.' },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'Request body must be a JSON object.' },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { client_name, redirect_uris } = body as Record<string, unknown>;

  if (typeof client_name !== 'string' || client_name.trim().length === 0) {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'client_name is required.' },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (
    !Array.isArray(redirect_uris) ||
    redirect_uris.length === 0 ||
    !redirect_uris.every((u) => typeof u === 'string' && isValidUrl(u))
  ) {
    return NextResponse.json(
      { error: 'invalid_redirect_uri', error_description: 'redirect_uris must be a non-empty array of valid URLs.' },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { clientId } = await registerClient({
    clientName: client_name.trim(),
    redirectUris: redirect_uris as string[],
  });

  const issuedAt = Math.floor(Date.now() / 1000);

  return NextResponse.json(
    {
      client_id: clientId,
      client_id_issued_at: issuedAt,
      client_name: client_name.trim(),
      redirect_uris,
      token_endpoint_auth_method: 'none',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
    },
    { status: 201, headers: CORS_HEADERS }
  );
}
