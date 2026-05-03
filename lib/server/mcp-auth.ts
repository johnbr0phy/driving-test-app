/*
 * MCP OAuth bearer token primitives.
 *
 * Pure functions: JWT mint/verify, refresh-token mint/hash, and bearer-header
 * extraction. No Firestore, no request handling — those live in oauth-store.ts
 * and the OAuth route handlers.
 *
 * ─── Token lifecycle ─────────────────────────────────────────────────────────
 *
 * Access token (JWT, HS256, signed with process.env.MCP_TOKEN_SECRET):
 *   {
 *     sub:   <Firebase UID>,
 *     scope: "mcp" | <custom scope>,
 *     iss:   <process.env.MCP_OAUTH_ISSUER_URL>,
 *     iat:   <issued-at, seconds since epoch>,
 *     exp:   <iat + 3600>          // 1 hour
 *   }
 *
 * Refresh token: 32 random bytes, hex-encoded (64 chars). Plaintext is returned
 * to the OAuth client exactly once (in the /token response). Only the SHA-256
 * hash is persisted in Firestore (oauth_refresh_tokens/{hash}). Lifetime is
 * 30 days, enforced by oauth-store.ts via expiresAt + Firestore TTL.
 *
 * Rotating MCP_TOKEN_SECRET invalidates all live access tokens (refresh tokens
 * survive — they are validated by Firestore lookup, not signature).
 */

import jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';

const ACCESS_TOKEN_TTL_SECONDS = 60 * 60; // 1h
const DEFAULT_SCOPE = 'mcp';

interface TokenClaims {
  sub: string;
  scope: string;
  iss: string;
  iat: number;
  exp: number;
}

export type VerifyResult =
  | { ok: true; userId: string; scope: string }
  | { ok: false; code: 'INVALID_TOKEN' | 'EXPIRED' | 'MALFORMED'; message: string };

function getSecret(): string {
  const secret = process.env.MCP_TOKEN_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error('MCP_TOKEN_SECRET is not set in environment.');
  }
  return secret;
}

function getIssuer(): string {
  const issuer = process.env.MCP_OAUTH_ISSUER_URL;
  if (!issuer || issuer.length === 0) {
    throw new Error('MCP_OAUTH_ISSUER_URL is not set in environment.');
  }
  return issuer;
}

export function mintAccessToken(userId: string, scope?: string): string {
  const now = Math.floor(Date.now() / 1000);
  const claims: TokenClaims = {
    sub: userId,
    scope: scope ?? DEFAULT_SCOPE,
    iss: getIssuer(),
    iat: now,
    exp: now + ACCESS_TOKEN_TTL_SECONDS,
  };
  return jwt.sign(claims, getSecret(), { algorithm: 'HS256' });
}

export function verifyAccessToken(token: string): VerifyResult {
  if (!token || typeof token !== 'string') {
    return { ok: false, code: 'MALFORMED', message: 'Token is empty or not a string.' };
  }
  try {
    const decoded = jwt.verify(token, getSecret(), { algorithms: ['HS256'] });
    if (typeof decoded !== 'object' || decoded === null) {
      return { ok: false, code: 'MALFORMED', message: 'Token payload is not an object.' };
    }
    const payload = decoded as Partial<TokenClaims>;
    if (typeof payload.sub !== 'string' || payload.sub.length === 0) {
      return { ok: false, code: 'MALFORMED', message: 'Token missing sub claim.' };
    }
    const scope = typeof payload.scope === 'string' ? payload.scope : DEFAULT_SCOPE;
    return { ok: true, userId: payload.sub, scope };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { ok: false, code: 'EXPIRED', message: 'Access token has expired.' };
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return { ok: false, code: 'INVALID_TOKEN', message: err.message };
    }
    return { ok: false, code: 'INVALID_TOKEN', message: 'Token verification failed.' };
  }
}

export function mintRefreshToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString('hex');
  const hash = hashRefreshToken(token);
  return { token, hash };
}

export function hashRefreshToken(plaintext: string): string {
  return createHash('sha256').update(plaintext, 'utf8').digest('hex');
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const token = match[1].trim();
  return token.length > 0 ? token : null;
}
