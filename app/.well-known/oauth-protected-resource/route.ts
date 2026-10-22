import { NextResponse } from 'next/server';
import { RESOURCE_CORS_HEADERS, protectedResourceMetadata } from '@/lib/server/mcpResourceMetadata';

// RFC 9728 protected-resource metadata for /api/mcp (lib/server/mcpResourceMetadata.ts).
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: RESOURCE_CORS_HEADERS });
}

export async function GET(): Promise<NextResponse> {
  return protectedResourceMetadata();
}
