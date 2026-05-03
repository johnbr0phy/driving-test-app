/*
 * Firestore-backed storage for the MCP OAuth 2.1 + PKCE flow.
 *
 * All Date fields are stored as ISO 8601 strings (matches lib/server/progress.ts).
 * All read-modify-write paths use Firestore transactions for atomicity.
 *
 * ─── Collections ─────────────────────────────────────────────────────────────
 *
 * oauth_clients/{clientId}
 *   {
 *     clientId:                  string                  // UUID v4
 *     clientName:                string                  // human-readable name supplied at registration
 *     redirectUris:              string[]                // exact-match list (no wildcards)
 *     tokenEndpointAuthMethod:   'none'                  // PKCE-only public client
 *     createdAt:                 string                  // ISO timestamp
 *   }
 *
 * oauth_codes/{code}
 *   {
 *     code:                      string                  // random 32-byte hex (the doc id)
 *     userId:                    string                  // verified Firebase UID
 *     clientId:                  string
 *     codeChallenge:             string                  // base64url(SHA-256(verifier)) from /authorize
 *     codeChallengeMethod:       'S256'
 *     redirectUri:               string                  // must exactly match the URI passed at /authorize and /token
 *     scope:                     string
 *     expiresAt:                 string                  // ISO; 5 minutes after creation
 *   }
 *
 *   consumeAuthCode is atomic (transactional read+delete). Single-use only —
 *   replay attempts return null. Configure a Firestore TTL policy on
 *   `expiresAt` to auto-clean unconsumed codes.
 *
 * oauth_refresh_tokens/{tokenHash}
 *   {
 *     tokenHash:                 string                  // sha256 hex of plaintext refresh token (the doc id)
 *     userId:                    string
 *     clientId:                  string
 *     expiresAt:                 string                  // ISO; 30 days after creation
 *     revoked:                   boolean
 *     createdAt:                 string                  // ISO timestamp
 *   }
 *
 *   Plaintext refresh tokens are NEVER stored. Configure a Firestore TTL on
 *   `expiresAt` to auto-clean expired tokens.
 *
 * oauth_pending_auth/{state}
 *   {
 *     state:                     string                  // random 32-byte hex (the doc id, also the OAuth `state` param)
 *     clientId:                  string
 *     redirectUri:               string                  // exact-match against registered URIs
 *     codeChallenge:             string                  // forwarded to oauth_codes after Firebase login
 *     codeChallengeMethod:       'S256'
 *     scope:                     string
 *     clientState:               string | null           // the upstream client's `state` param, echoed back on redirect
 *     expiresAt:                 string                  // ISO; 10 minutes after creation
 *     createdAt:                 string                  // ISO timestamp
 *   }
 *
 *   Used to bridge /authorize → Firebase login → /api/mcp/oauth/complete.
 *   consumePendingAuth is atomic. Configure a Firestore TTL on `expiresAt`.
 */

import { randomUUID } from 'crypto';
import { getAdminDb } from '@/lib/firebase-admin';

const COLLECTION_CLIENTS = 'oauth_clients';
const COLLECTION_CODES = 'oauth_codes';
const COLLECTION_REFRESH = 'oauth_refresh_tokens';
const COLLECTION_PENDING = 'oauth_pending_auth';

const AUTH_CODE_TTL_MS = 5 * 60 * 1000; // 5 min
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const PENDING_AUTH_TTL_MS = 10 * 60 * 1000; // 10 min

export interface Client {
  clientId: string;
  clientName: string;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none';
  createdAt: string;
}

export interface AuthCode {
  code: string;
  userId: string;
  clientId: string;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
  redirectUri: string;
  scope: string;
  expiresAt: string;
}

export interface RefreshToken {
  tokenHash: string;
  userId: string;
  clientId: string;
  expiresAt: string;
  revoked: boolean;
  createdAt: string;
}

export interface PendingAuth {
  state: string;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
  scope: string;
  clientState: string | null;
  expiresAt: string;
  createdAt: string;
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export async function registerClient(params: {
  clientName: string;
  redirectUris: string[];
}): Promise<{ clientId: string; clientSecret: null }> {
  const db = getAdminDb();
  const clientId = randomUUID();
  const client: Client = {
    clientId,
    clientName: params.clientName,
    redirectUris: params.redirectUris,
    tokenEndpointAuthMethod: 'none',
    createdAt: new Date().toISOString(),
  };
  await db.collection(COLLECTION_CLIENTS).doc(clientId).set(client);
  return { clientId, clientSecret: null };
}

export async function getClient(clientId: string): Promise<Client | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION_CLIENTS).doc(clientId).get();
  if (!snap.exists) return null;
  return snap.data() as Client;
}

// ─── Auth codes ──────────────────────────────────────────────────────────────

export async function saveAuthCode(params: {
  code: string;
  userId: string;
  clientId: string;
  codeChallenge: string;
  redirectUri: string;
  scope: string;
}): Promise<void> {
  const db = getAdminDb();
  const expiresAt = new Date(Date.now() + AUTH_CODE_TTL_MS).toISOString();
  const doc: AuthCode = {
    code: params.code,
    userId: params.userId,
    clientId: params.clientId,
    codeChallenge: params.codeChallenge,
    codeChallengeMethod: 'S256',
    redirectUri: params.redirectUri,
    scope: params.scope,
    expiresAt,
  };
  await db.collection(COLLECTION_CODES).doc(params.code).set(doc);
}

/**
 * Atomically reads + deletes an auth code. Returns null if the code is
 * missing or expired. The transactional read+delete is critical — it
 * prevents the #1 OAuth attack vector (code replay).
 */
export async function consumeAuthCode(code: string): Promise<AuthCode | null> {
  const db = getAdminDb();
  const ref = db.collection(COLLECTION_CODES).doc(code);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return null;

    const data = snap.data() as AuthCode;
    tx.delete(ref);

    if (Date.parse(data.expiresAt) <= Date.now()) {
      return null;
    }
    return data;
  });
}

// ─── Refresh tokens ──────────────────────────────────────────────────────────

export async function saveRefreshToken(params: {
  tokenHash: string;
  userId: string;
  clientId: string;
}): Promise<void> {
  const db = getAdminDb();
  const now = new Date();
  const doc: RefreshToken = {
    tokenHash: params.tokenHash,
    userId: params.userId,
    clientId: params.clientId,
    expiresAt: new Date(now.getTime() + REFRESH_TOKEN_TTL_MS).toISOString(),
    revoked: false,
    createdAt: now.toISOString(),
  };
  await db.collection(COLLECTION_REFRESH).doc(params.tokenHash).set(doc);
}

export async function lookupRefreshToken(tokenHash: string): Promise<RefreshToken | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION_REFRESH).doc(tokenHash).get();
  if (!snap.exists) return null;

  const data = snap.data() as RefreshToken;
  if (data.revoked) return null;
  if (Date.parse(data.expiresAt) <= Date.now()) return null;
  return data;
}

export async function revokeRefreshToken(tokenHash: string): Promise<void> {
  const db = getAdminDb();
  const ref = db.collection(COLLECTION_REFRESH).doc(tokenHash);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return;
    tx.update(ref, { revoked: true });
  });
}

// ─── Pending authorization (login bridge state) ──────────────────────────────

export async function savePendingAuth(params: {
  state: string;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  scope: string;
  clientState: string | null;
}): Promise<void> {
  const db = getAdminDb();
  const now = new Date();
  const doc: PendingAuth = {
    state: params.state,
    clientId: params.clientId,
    redirectUri: params.redirectUri,
    codeChallenge: params.codeChallenge,
    codeChallengeMethod: 'S256',
    scope: params.scope,
    clientState: params.clientState,
    expiresAt: new Date(now.getTime() + PENDING_AUTH_TTL_MS).toISOString(),
    createdAt: now.toISOString(),
  };
  await db.collection(COLLECTION_PENDING).doc(params.state).set(doc);
}

/**
 * Atomically reads + deletes a pending-auth record. Returns null if missing or
 * expired. Single-use — prevents replay of the login bridge state token.
 */
export async function consumePendingAuth(state: string): Promise<PendingAuth | null> {
  const db = getAdminDb();
  const ref = db.collection(COLLECTION_PENDING).doc(state);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return null;

    const data = snap.data() as PendingAuth;
    tx.delete(ref);

    if (Date.parse(data.expiresAt) <= Date.now()) {
      return null;
    }
    return data;
  });
}
