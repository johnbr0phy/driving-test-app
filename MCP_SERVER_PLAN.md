# TigerTest MCP Server Plan

A spec for building a remote MCP server that lets users log into TigerTest and complete practice tests and training sets from inside any MCP client (Claude Desktop, Claude Code, etc.).

## 1. Goal

Expose TigerTest's question bank, test generation, and progress tracking as MCP tools so a user can:

- Sign in with their existing TigerTest account (Firebase Auth)
- Pick a state
- Run any of the 4 practice tests end to end
- Run any of the 4 training sets in a mastery loop
- Have all progress sync back to Firestore so the web app reflects it immediately
- See stats, weak areas, and pass probability

CDL track is out of scope for v1 (testIds 101+). Add later.

## 2. Architecture Decisions

- **Transport**: Streamable HTTP MCP server hosted as a Next.js Route Handler at `/api/mcp`. Single endpoint, MCP spec compliant. Same deployment as the existing app (Vercel).
- **SDK**: `@modelcontextprotocol/sdk` (TypeScript)
- **Auth**: OAuth 2.1 with PKCE per MCP spec, bridged to Firebase Auth. The MCP server mints its own short-lived bearer tokens bound to the user's Firebase UID.
- **Identity store**: Reuse Firebase Auth. No new user accounts.
- **Data store**: Reuse existing Firestore `users/{uid}` document. Same shape as `useStore.ts` writes today.
- **Server logic**: Extract pure progress mutators out of `store/useStore.ts` into a new `/lib/server/progress.ts` that reads and writes Firestore directly via `firebase-admin`. Both the web app and MCP server call into the same logic.
- **Question generation**: Reuse `lib/testGenerator.ts` as-is. It is already pure and server-safe.
- **Session model**: Stateless. Every tool call carries enough info (testId, setId, questionId) for the server to look up state in Firestore. No in-memory MCP session.

## 3. New File Layout

```
app/api/mcp/
  route.ts                       # MCP endpoint (Streamable HTTP)
  oauth/
    authorize/route.ts           # OAuth authorize endpoint
    token/route.ts               # Token exchange endpoint
    register/route.ts            # Dynamic client registration
    callback/page.tsx            # Firebase Auth bridge UI
  .well-known/
    oauth-authorization-server/route.ts   # OAuth discovery metadata

lib/server/
  progress.ts                    # Firestore-backed test/training mutators
  mcp-auth.ts                    # Bearer token validation, user context
  mcp-tools.ts                   # Tool handler registrations
  oauth-store.ts                 # Token + client storage in Firestore
```

No changes to existing client code. The web app continues to use Zustand. Firestore writes from both sides converge on the same document shape.

## 4. Phased Implementation

### Phase 1: Pure logic extraction (no MCP yet)

Extract pure functions from `store/useStore.ts` into `lib/server/progress.ts`. Each takes `userId` and a Firestore handle, reads the current user doc, applies the change, writes back.

Functions to port:
- `setSelectedState(userId, stateCode)`
- `setLanguage(userId, lang)` (en | es)
- `startTest(userId, testId, questions)`
- `setTestAnswer(userId, testId, questionIndex, answer)`
- `clearCurrentTest(userId, testId)` (for `abandon_practice_test`)
- `completeTest(userId, testId, score, questions, answers)`
- `answerTrainingSetQuestion(userId, setId, questionId, isCorrect)`
- `resetTrainingSet(userId, setId)`
- `incrementDailyQuestionCount(userId)` + `checkDailyQuestionCap(userId)` (enforce 500/day)
- Read-only: `getUser(userId)` (returns selectedState, language, subscription), `getProgress(userId)`, `getTestAttemptStats(userId, testId)`, `getTrainingSetProgress(userId, setId)`, `getQuestionPerformance(userId)`, `getPassProbability(userId)`

Important rules:
- Match the exact Firestore document shape that `saveToFirestore()` writes today (so web client reads it cleanly).
- Use Firestore transactions for read-modify-write (mastery updates, wrongQueue updates) to avoid race conditions when MCP and web are both active.
- Convert all Date fields to ISO strings (matches existing convention).
- Honor `subscription.isPremium` for Test 4 / Set 4 access. Return a typed error if locked.

Verify by writing a small Node script that calls these functions against a test Firestore user and confirming the web app shows the updates after refresh.

### Phase 2: OAuth scaffolding

Build a minimal OAuth 2.1 server that bridges to Firebase Auth.

Endpoints:
- `GET /.well-known/oauth-authorization-server` returns issuer, authorize URL, token URL, registration URL, supported grant types (`authorization_code`, `refresh_token`), code challenge methods (`S256`), scopes.
- `POST /api/mcp/oauth/register` (RFC 7591 Dynamic Client Registration). Issues `client_id` and stores client metadata in Firestore (`oauth_clients/{clientId}`). No client secret required for public clients (PKCE).
- `GET /api/mcp/oauth/authorize` validates `client_id`, `redirect_uri`, `code_challenge`. Stores the pending auth request in Firestore keyed by a one-time `state` value, then redirects the user's browser to `/api/mcp/oauth/callback?state=...` which renders the Firebase login UI.
- `/api/mcp/oauth/callback` page: user signs in with Firebase (existing flow). On success, server-side action exchanges the Firebase ID token for an MCP authorization code, stores it in Firestore (`oauth_codes/{code}`) with the Firebase UID + PKCE challenge, redirects back to the MCP client's `redirect_uri` with `?code=...&state=...`.
- `POST /api/mcp/oauth/token` validates the code + PKCE verifier, mints a JWT access token (short-lived, 1h) and refresh token (long-lived, 30d). Both bound to Firebase UID. Refresh tokens stored in Firestore so they can be revoked.

Token format: signed JWT with `sub` = Firebase UID, `iat`, `exp`, `scope`. Sign with a secret in env var `MCP_TOKEN_SECRET`.

Verify with MCP Inspector: it should walk the full OAuth dance and end up with a working bearer token.

### Phase 3: MCP server skeleton

Mount `@modelcontextprotocol/sdk` Streamable HTTP server at `/api/mcp/route.ts`.

- On every request, extract `Authorization: Bearer <jwt>`, verify signature, decode `sub` (UID). Return 401 if missing/invalid.
- Attach `userId` and a Firebase Admin handle to the request context so all tool handlers can access them.
- Register a single `ping` tool that returns `{ ok: true, userId }` so we can confirm the auth chain works end to end.

Verify by adding the server to Claude Desktop's config and calling `ping`.

### Phase 4: Read-only tools

Add tools that only read state. These are low-risk and let the AI orient itself before mutating anything.

Tool list (Phase 4):

1. **`list_states`** - Returns all 51 supported states with code, name, passingScore, writtenTestQuestions. Static, no auth needed beyond the bearer.
2. **`get_user_state`** - Returns the user's currently selected state (or null).
3. **`get_progress`** - Returns the user's current progress: tests completed, accuracy, average score, pass probability, training set mastery counts.
4. **`get_test_attempt_stats`** - Args: `testId` (1-4). Returns first score, best score, attempt count, last attempt date for that test.
5. **`get_training_set_progress`** - Args: `setId` (1-4). Returns mastered count, total (50), wrong queue length, complete flag.
6. **`get_weak_areas`** - Returns top N (default 10) questions the user has answered wrong most often, with question text and category, sorted by accuracy ascending.

### Phase 5: Practice test tools

One-question-at-a-time. The 50 questions are generated and persisted up front, then served sequentially. Feedback is withheld until the full test is submitted, matching the simulated-DMV-exam framing of the web app.

Tools:

7. **`start_practice_test`** - Args: `testId` (1-4). Validates state and unlock (Test 4 = premium). If `currentTests[testId]` exists, leaves it alone. Otherwise calls `generateTest`, applies `shuffleQuestionOptions`, persists 50 questions. Returns first question (no correctAnswer/explanation), with `imageUrl` if applicable.

8. **`get_next_test_question`** - Args: `testId`. Returns next unanswered question, or `complete: true` when all 50 are answered (signals the AI to call `submit_practice_test`).

9. **`submit_test_answer`** - Args: `testId`, `questionIndex`, `answer`. Records via `progress.setTestAnswer`. Does NOT return correctness. Returns the next question in the same payload to save round trips.

10. **`submit_practice_test`** - Args: `testId`. Scores all 50 via `progress.completeTest`. Returns full breakdown with correct answers, explanations, category stats.

11. **`resume_practice_test`** - Args: `testId`. Returns metadata about in-progress test (answeredCount, nextIndex). Useful after a break.

12. **`abandon_practice_test`** - Args: `testId`. Clears `currentTests[testId]`. Requires AI confirmation.

13. **`get_test_results`** - Args: `testId`. Returns most recent completed `TestSession`.

### Phase 6: Training set tools

One-question-at-a-time loop. Stateless from the AI's perspective (server tracks mastery + wrong queue).

Tools:

14. **`start_training_set`**
    - Args: `setId` (1-4)
    - Behavior: Validates state, unlock. Returns the first question (same as calling `get_next_training_question` immediately after).

15. **`get_next_training_question`**
    - Args: `setId`
    - Behavior: Reads user's current `trainingSets[setId]` (mastered IDs + wrong queue). Calls `getNextTrainingSetQuestion`. Applies `shuffleQuestionOptions`. Returns the question (without correct answer or explanation), plus progress context. Includes `imageUrl` if applicable.
    - Returns: `{ setId, question: { questionId, question, options: { A, B, C, D }, category, imageUrl? }, progress: { mastered: 12, total: 50, wrongQueueSize: 3 } }`. Returns `{ question: null, complete: true }` when set is fully mastered.

16. **`submit_training_answer`**
    - Args: `setId`, `questionId`, `answer` (`"A" | "B" | "C" | "D"`)
    - Behavior: Looks up the question by ID, checks correctness, calls `progress.answerTrainingSetQuestion`. Returns immediate feedback (training mode shows correctness per question, unlike practice tests).
    - Returns: `{ isCorrect, correctAnswer, explanation, progress: { mastered, total, wrongQueueSize, complete } }`

17. **`reset_training_set`**
    - Args: `setId`, `confirm: true` (required)
    - Behavior: Clears `masteredIds` and `wrongQueue` for that set. Required `confirm: true` param prevents accidents.

### Phase 7: State and language tools

18. **`set_user_state`**
    - Args: `stateCode` (2 letters), `confirm: true` (required)
    - Behavior: Calls `progress.setSelectedState`. Destructive: clears all progress. Tool description must spell this out. The required `confirm: true` parameter forces the AI to ask the user first.

19. **`set_language`**
    - Args: `lang` (`"en"` or `"es"`)
    - Behavior: Calls `progress.setLanguage`. Affects which question file (`questions.json` vs `questions_es.json`) future calls pull from. Non-destructive. Persists to Firestore so the web app picks it up too.

## 5. Tool Naming and Discoverability

All tools prefixed with nothing (MCP servers are namespaced by server name in the client). Descriptions should be written for the AI, not the user, e.g.:

> `start_practice_test`: Begins one of the 4 TigerTest DMV practice tests for the user's selected state. Returns all 50 questions at once. After the user has answered all of them, call `submit_practice_test` with their answers. Test 4 requires a premium subscription.

Each tool's input schema should use Zod (or equivalent) with tight types so the client validates before sending.

## 6. Firestore Data Model Notes

No schema migration required. The existing `users/{uid}` document already holds everything we need. Two small additions:

- `oauth_clients/{clientId}` collection: `{ clientId, clientName, redirectUris, createdAt }`
- `oauth_codes/{code}` collection: `{ code, userId, clientId, codeChallenge, redirectUri, expiresAt }` (TTL: 5 minutes)
- `oauth_refresh_tokens/{tokenHash}` collection: `{ userId, clientId, expiresAt, revoked }` (TTL: 30 days)

Use Firestore TTL policies to auto-expire codes and refresh tokens.

## 7. Security

- All MCP tool handlers must extract `userId` from the verified bearer token. Never accept `userId` as a tool argument.
- Rate limit per UID at the MCP route level (e.g. 60 requests/min). Use Firestore counters or an in-memory LRU.
- Daily question cap per user (e.g. 500 questions answered/day) to prevent runaway AI loops. Enforce in `progress.ts` mutators.
- OAuth client secret not used for public clients; rely on PKCE.
- Sign access tokens with `MCP_TOKEN_SECRET` (new env var). Rotate by versioning the secret.
- Validate `redirect_uri` exactly matches what was registered.
- Store refresh tokens hashed (SHA-256), not plaintext.
- Never return `correctAnswer` or `explanation` in question-fetch tools. Only after submission.

## 8. Environment Variables (additions)

```
MCP_TOKEN_SECRET           # JWT signing key for access tokens
MCP_OAUTH_ISSUER_URL       # Public URL of the MCP server (e.g. https://tigertest.com)
```

`FIREBASE_SERVICE_ACCOUNT_KEY` already exists.

## 9. Testing Plan

- **Unit**: `lib/server/progress.ts` mutators against the Firestore emulator. Every mutator gets at least one happy-path and one premium-locked test.
- **Integration**: Spin up the MCP server locally, run MCP Inspector, walk OAuth flow, call each tool, assert response shape.
- **End to end**: Connect from Claude Desktop. Manually run scenarios:
  - "Sign me in and start practice test 1 for California"
  - "I'll answer the questions, then submit"
  - "Start training set 2 and quiz me one at a time"
  - "Show my weak areas"
  - "What's my pass probability?"
- **Cross-client sync**: Run a training set via MCP, then open the web app and confirm mastery counts match.
- **Concurrency**: Two parallel MCP sessions answering the same training set. Confirm Firestore transactions prevent lost updates.

## 10. Resolved Decisions

All open questions resolved. Implementation should follow these:

- **Practice test delivery**: One question at a time (`start_practice_test`, `get_next_test_question`, `submit_test_answer`, then `submit_practice_test` to grade). Withhold correctness until final submission to preserve the simulated-exam framing.
- **Training set delivery**: Already one at a time with immediate feedback per question (matches web mastery loop).
- **CDL track**: Out of scope for v1. DMV only. Add CDL in a follow-up PR with parallel tools.
- **Language**: Default to user's `language` field in Firestore. Add a `set_language` tool for explicit override during a session. Both English and Spanish question files are loaded in `lib/testGenerator.ts` already.
- **Image questions**: Tool responses include `imageUrl` field when a question references a road sign. Use the existing URLs served by `lib/signImages.ts`. Text-only clients see the URL string; image-capable clients render it.
- **Question text formatting**: Plain text. No markdown. Let the client format.
- **Test session expiry**: No expiry. `currentTests[testId]` persists indefinitely until submitted, abandoned, or replaced. Matches web behavior.
- **Daily question cap**: 500 questions/day per user, enforced inside `progress.ts` mutators. Returns a typed error code (`RATE_LIMIT_DAILY`) when hit. Resets at user's local midnight (use the same `activeDates` date scheme already in the store).
- **Per-minute rate limit**: 60 requests/min per UID at the route level (in addition to the daily cap).

## 11. Suggested First PR

Scope: just enough to prove the auth + tool chain works end to end.

- Phase 1 partial: extract `getProgress(userId)` and `setSelectedState(userId, code)` to `lib/server/progress.ts`
- Phase 2 full: complete OAuth flow with Firebase bridge
- Phase 3 full: MCP server skeleton with `ping` tool
- Phase 4 partial: implement `list_states`, `get_user_state`, `get_progress`, `set_user_state`

Once that ships and a real user can sign in via Claude Desktop and read their progress, build out the test and training tools in subsequent PRs.

## 12. Out of Scope (v1)

- CDL track (testIds 101-112)
- School/admin endpoints
- Stripe/billing tools (but premium gating is enforced)
- Sharing, social, leaderboards
- Email or notification tools
- Question authoring tools (the agentic-rewrite system stays internal)
