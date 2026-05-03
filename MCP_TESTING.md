# MCP Server — Manual Test Recipe

This guide walks you through verifying the TigerTest MCP server end-to-end on your local machine. The server is mounted at `/api/mcp` with OAuth 2.1 + PKCE bridged to Firebase Auth.

At the end of this recipe you will have:
- A registered OAuth client
- A signed-in Firebase user
- An access token bound to that user's UID
- A working `ping` call from MCP Inspector and from Claude Desktop

## 1. Local environment setup

The MCP server needs two new env vars on top of your existing Firebase setup. Both belong in `.env.local` (gitignored).

```bash
# Generate a 32-byte signing secret for JWT access tokens
openssl rand -hex 32
```

Open `.env.local` and set:

```
MCP_TOKEN_SECRET=<paste the 64-hex-char output of openssl rand>
MCP_OAUTH_ISSUER_URL=http://localhost:3000
```

`MCP_OAUTH_ISSUER_URL` is the public URL of the MCP server. For local dev, `http://localhost:3000` is correct. In production set it to your real origin (e.g. `https://tigertest.io`) — the OAuth discovery document and all redirects derive from this value.

`FIREBASE_SERVICE_ACCOUNT_KEY` must already be set (it's used by the rest of the app).

## 2. Start the dev server

```bash
npm run dev
```

Confirm the discovery endpoint comes up:

```bash
curl http://localhost:3000/.well-known/oauth-authorization-server | jq
```

Expected response (CORS headers also present):

```json
{
  "issuer": "http://localhost:3000",
  "authorization_endpoint": "http://localhost:3000/api/mcp/oauth/authorize",
  "token_endpoint": "http://localhost:3000/api/mcp/oauth/token",
  "registration_endpoint": "http://localhost:3000/api/mcp/oauth/register",
  "scopes_supported": ["mcp"],
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["none"]
}
```

If you get `500 server_error: MCP_OAUTH_ISSUER_URL is not configured`, your env var is not loaded — restart `npm run dev` after editing `.env.local`.

## 3. Register a client manually (smoke test)

You don't need to do this for MCP Inspector or Claude Desktop — they use Dynamic Client Registration automatically. But it's useful for verifying the endpoint:

```bash
curl -X POST http://localhost:3000/api/mcp/oauth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "client_name": "manual-smoke-test",
    "redirect_uris": ["http://localhost:6274/oauth/callback"]
  }' | jq
```

Expected response (HTTP 201):

```json
{
  "client_id": "<uuid>",
  "client_id_issued_at": 1714560000,
  "client_name": "manual-smoke-test",
  "redirect_uris": ["http://localhost:6274/oauth/callback"],
  "token_endpoint_auth_method": "none",
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"]
}
```

The client doc is now in Firestore at `oauth_clients/{client_id}`.

## 4. Walk the OAuth flow with MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) is the canonical tool for poking MCP servers.

```bash
npx @modelcontextprotocol/inspector
```

In the Inspector UI:

1. Set transport type to **Streamable HTTP**
2. Set the URL to `http://localhost:3000/api/mcp`
3. Click **Connect**

Inspector will:

1. Discover `/.well-known/oauth-authorization-server`
2. Dynamically register a client (`POST /api/mcp/oauth/register`)
3. Open `/api/mcp/oauth/authorize?response_type=code&...&code_challenge=...&code_challenge_method=S256` in your browser
4. The authorize endpoint creates a one-time `pending` token and redirects you to `/oauth/login?pending=<token>`
5. The login page shows "Authorize Access — Sign in to authorize <client> ..." — sign in with Firebase email/password or Google. (If you're already signed in, it auto-completes.)
6. The page POSTs your Firebase ID token + the pending token to `/api/mcp/oauth/complete`. The server verifies the ID token, mints an authorization code, and returns a redirect URL.
7. Your browser is redirected back to Inspector's callback URL with `?code=...&state=...`
8. Inspector POSTs `grant_type=authorization_code` + `code_verifier` to `/api/mcp/oauth/token`. The server PKCE-verifies and returns access + refresh tokens.
9. Inspector calls the MCP server with `Authorization: Bearer <access>` and lists tools.

You should see exactly one tool: **`ping`**.

Click **Run** with empty args. Expected response:

```json
{
  "ok": true,
  "userId": "<your firebase UID>",
  "timestamp": "2026-05-03T12:34:56.789Z"
}
```

If `userId` matches your Firebase UID, the entire OAuth-to-MCP chain is working.

## 5. Add the server to Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows). Add an entry under `mcpServers`:

```json
{
  "mcpServers": {
    "tigertest": {
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

For a deployed instance, swap the URL for your production origin (e.g. `https://tigertest.io/api/mcp`). HTTPS is required by Claude Desktop in production.

Restart Claude Desktop. The first time you invoke a TigerTest tool it will prompt you to authorize — same Firebase login flow as MCP Inspector. After authorization, ask Claude:

> Call the ping tool on tigertest.

Expected: Claude calls `ping`, you see `ok: true` and your UID.

## 6. Expected `ping` response shape

```json
{
  "ok": true,
  "userId": "<firebase UID, string>",
  "timestamp": "<ISO 8601 UTC string>"
}
```

The MCP SDK wraps this as a `text` content block:

```json
{
  "content": [
    { "type": "text", "text": "{\"ok\":true,\"userId\":\"...\",\"timestamp\":\"...\"}" }
  ]
}
```

## 7. Common error scenarios

| Trigger | HTTP | Body |
|---|---|---|
| MCP request with no `Authorization` header | 401 | `{ "error": "invalid_token" }` + `WWW-Authenticate: Bearer realm="mcp", error="invalid_token"` |
| MCP request with malformed bearer | 401 | same as above |
| MCP request with expired JWT | 401 | same as above (the JWT verifier maps `EXPIRED` → 401) |
| MCP request with JWT signed under a rotated `MCP_TOKEN_SECRET` | 401 | same as above |
| `/oauth/authorize` with `response_type` ≠ `code` | 400 | `{ "error": "unsupported_response_type", "error_description": "Only response_type=code is supported." }` |
| `/oauth/authorize` with unknown `client_id` | 400 | `{ "error": "invalid_client", ... }` |
| `/oauth/authorize` with a `redirect_uri` that doesn't exact-match a registered URI | 400 | `{ "error": "invalid_request", "error_description": "redirect_uri does not match any registered URI." }` |
| `/oauth/authorize` with `code_challenge_method` ≠ `S256` | 400 | `{ "error": "invalid_request", "error_description": "code_challenge_method must be S256." }` |
| `/oauth/token` replay of a consumed `code` | 400 | `{ "error": "invalid_grant", "error_description": "Authorization code is invalid or expired." }` (the code was atomically deleted on first consume) |
| `/oauth/token` with mismatched `redirect_uri` vs. the original `/authorize` request | 400 | `{ "error": "invalid_grant", "error_description": "redirect_uri does not match the one used at authorization." }` |
| `/oauth/token` with bad PKCE `code_verifier` | 400 | `{ "error": "invalid_grant", "error_description": "PKCE code_verifier does not match code_challenge." }` (note: the auth code is gone — single-use is intentional) |
| `/oauth/token` with revoked / expired refresh token | 400 | `{ "error": "invalid_grant", "error_description": "Refresh token is invalid, expired, or revoked." }` |
| `/oauth/complete` POST with invalid Firebase ID token | 401 | `{ "error": "Invalid or expired Firebase ID token" }` |
| `/oauth/login` page hit without a `pending` query param | renders | "Invalid Link — Missing authorization request..." |

## 8. Token & TTL reference

| Token | TTL | Storage |
|---|---|---|
| OAuth `pending` (state in /authorize → /complete) | 10 min | `oauth_pending_auth/{state}` (Firestore TTL recommended) |
| Authorization code | 5 min | `oauth_codes/{code}` (Firestore TTL recommended); single-use, atomic consume |
| Access token (JWT, HS256) | 1 hour | not stored — verified by signature |
| Refresh token | 30 days | `oauth_refresh_tokens/{sha256(token)}`; rotated on each use |

Configure Firestore TTL policies on the `expiresAt` field of `oauth_codes`, `oauth_refresh_tokens`, and `oauth_pending_auth` to auto-clean expired records. Without TTLs the data accumulates but expired records are never accepted (each lookup checks `expiresAt`).

## 9. Quick smoke test — non-OAuth bearer rejection

The fastest way to confirm the MCP route's auth gate works without running the OAuth dance:

```bash
# No bearer
curl -i -X POST http://localhost:3000/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
# → 401 invalid_token

# Garbage bearer
curl -i -X POST http://localhost:3000/api/mcp \
  -H 'Authorization: Bearer not-a-real-jwt' \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
# → 401 invalid_token
```

Both should respond `401` with the `WWW-Authenticate` header.
