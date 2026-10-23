/** Client-side guard against replacing newer assistant progress with a stale browser snapshot. */
export type McpProgressScope = 'catalog' | 'v2' | 'quiz';

export interface ProgressSyncConflict {
  uid: string;
  scope: McpProgressScope;
  expectedRevision: number | null;
  actualRevision: number;
}

export class McpProgressConflictError extends Error {
  readonly code = 'MCP_PROGRESS_CONFLICT';

  constructor(readonly conflict: ProgressSyncConflict) {
    super('Progress changed in another session. Cloud saving is paused until you reload.');
    this.name = 'McpProgressConflictError';
  }
}

const revisions = new Map<string, number>();
const authoritativeLoads = new Set<string>();
const blocked = new Map<string, McpProgressConflictError>();
const listeners = new Set<() => void>();
const EMPTY_CONFLICTS: readonly ProgressSyncConflict[] = [];
let conflicts: readonly ProgressSyncConflict[] = EMPTY_CONFLICTS;
const keyFor = (uid: string, scope: McpProgressScope) => JSON.stringify([uid, scope]);

function revisionOf(data: Record<string, unknown> | undefined, scope: McpProgressScope): number {
  const value = (data?.mcpProgressRevisions as Partial<Record<McpProgressScope, unknown>> | undefined)?.[scope];
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

function conflict(uid: string, scope: McpProgressScope, expectedRevision: number | undefined, actualRevision: number): never {
  const key = keyFor(uid, scope);
  let error = blocked.get(key);
  if (!error) {
    error = new McpProgressConflictError({ uid, scope, expectedRevision: expectedRevision ?? null, actualRevision });
    blocked.set(key, error);
    conflicts = [...conflicts, error.conflict];
    for (const listener of listeners) listener();
  }
  throw error;
}

/** A conflict stays blocked for this page session, even if another component loads fresh data. */
export function throwIfMcpProgressConflict(uid: string, scope: McpProgressScope): void {
  const error = blocked.get(keyFor(uid, scope));
  if (error) throw error;
}

/** Call on a successful account load, before replacing any local store data. */
export function captureMcpProgressRevision(uid: string, scope: McpProgressScope, data: Record<string, unknown> | undefined): void {
  throwIfMcpProgressConflict(uid, scope);
  const key = keyFor(uid, scope);
  const actual = revisionOf(data, scope);
  const expected = revisions.get(key);
  if (expected !== undefined && expected !== actual) conflict(uid, scope, expected, actual);
  // Never let a later load bless an old save already in flight. A full explicit
  // reload starts a new session and establishes its own per-store baseline.
  if (expected === undefined && actual > 0) authoritativeLoads.add(key);
  revisions.set(key, actual);
}

/** Call INSIDE the same Firestore transaction that will write the browser snapshot. */
export function assertMcpProgressRevision(uid: string, scope: McpProgressScope, data: Record<string, unknown> | undefined): void {
  throwIfMcpProgressConflict(uid, scope);
  const key = keyFor(uid, scope);
  const expected = revisions.get(key);
  const actual = revisionOf(data, scope);
  if ((expected === undefined && actual > 0) || (expected !== undefined && expected !== actual)) {
    conflict(uid, scope, expected, actual);
  }
  // Existing accounts without MCP changes, and brand-new accounts, remain
  // backward compatible. Positive revisions always require a prior load.
  if (expected === undefined) revisions.set(key, 0);
}

export function isMcpProgressConflict(error: unknown): error is McpProgressConflictError {
  return error instanceof McpProgressConflictError;
}

/** One-shot after the first load: do not union stale account data over an MCP reset. */
export function shouldPreferRemoteMcpProgress(uid: string, scope: McpProgressScope, syncedUid: string | null): boolean {
  const key = keyFor(uid, scope);
  const preferRemote = syncedUid === uid && authoritativeLoads.has(key);
  // Later same-revision SPA mounts can have fresh, debounced browser work.
  // Changed revisions are already blocked by capture, not silently merged.
  authoritativeLoads.delete(key);
  return preferRemote;
}

export function subscribeProgressSyncConflicts(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export const getProgressSyncConflicts = () => conflicts;
export const getServerProgressSyncConflicts = () => EMPTY_CONFLICTS;
