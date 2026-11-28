import { BasicsSkillState, DrillState, QuestionTally, TestResultV2, TestSessionV2 } from "./types";
import type { V2Data } from "@/store/useV2Store";

// Pure merge of two copies of the v2 store (this device and the account),
// kept free of Firebase imports so it can be tested in isolation.

function answeredCount(s: TestSessionV2) {
  return s.stages.reduce((n, st) => n + Object.keys(st.answers).length, 0);
}

function mergeDrill(a: DrillState | undefined, b: DrillState | undefined): DrillState {
  if (!a) return b!;
  if (!b) return a;
  const masteredIds = Array.from(new Set([...a.masteredIds, ...b.masteredIds]));
  const newer = a.seen >= b.seen ? a : b;
  return {
    masteredIds,
    ...(a.pendingAttemptOnly && b.pendingAttemptOnly ? { pendingAttemptOnly: true as const } : {}),
    wrongQueue: newer.wrongQueue.filter((id) => !masteredIds.includes(id)),
    seen: Math.max(a.seen, b.seen),
    correct: Math.max(a.correct, b.correct),
  };
}

/**
 * Combine this device's data with the account's. Nothing is lost:
 * results and mastered questions are unions, the further-along copy of an
 * in-progress test wins, and a test already finished elsewhere is dropped.
 * Goals prefer the account, since that is the last one set on any device.
 */
export function mergeV2(local: V2Data, remote: V2Data): V2Data {
  const results: TestResultV2[] = [];
  const seen = new Set<string>();
  for (const r of [...remote.results, ...local.results]) {
    const k = `${r.key}@${r.completedAt}`;
    if (!seen.has(k)) {
      seen.add(k);
      results.push(r);
    }
  }

  const drills: Record<string, DrillState> = {};
  for (const k of new Set([...Object.keys(local.drills), ...Object.keys(remote.drills)])) {
    drills[k] = mergeDrill(local.drills[k], remote.drills[k]);
  }

  const sessions: Record<string, TestSessionV2> = {};
  for (const k of new Set([...Object.keys(local.sessions), ...Object.keys(remote.sessions)])) {
    const a = local.sessions[k];
    const b = remote.sessions[k];
    const pick = !a ? b : !b ? a : a.stage !== b.stage ? (a.stage > b.stage ? a : b) : answeredCount(a) >= answeredCount(b) ? a : b;
    const finishedLater = results.some((r) => r.key === pick.key && r.completedAt > pick.startedAt);
    if (!finishedLater) sessions[k] = pick;
  }

  // A skill learned on either side stays learned; keep the earlier completion.
  const basics: Record<string, BasicsSkillState> = {};
  for (const k of new Set([...Object.keys(local.basics ?? {}), ...Object.keys(remote.basics ?? {})])) {
    const a = local.basics?.[k];
    const b = remote.basics?.[k];
    basics[k] = !a ? b! : !b ? a : a.completedAt <= b.completedAt ? a : b;
  }

  // Both copies may hold the same answers, so a tally keeps the larger count.
  const questionStats: Record<string, Record<string, QuestionTally>> = {};
  for (const examId of new Set([...Object.keys(local.questionStats ?? {}), ...Object.keys(remote.questionStats ?? {})])) {
    const a = local.questionStats?.[examId] ?? {};
    const b = remote.questionStats?.[examId] ?? {};
    const merged: Record<string, QuestionTally> = {};
    for (const id of new Set([...Object.keys(a), ...Object.keys(b)])) {
      merged[id] = { n: Math.max(a[id]?.n ?? 0, b[id]?.n ?? 0), w: Math.max(a[id]?.w ?? 0, b[id]?.w ?? 0) };
    }
    questionStats[examId] = merged;
  }

  return { sessions, results, drills, basics, goals: { ...local.goals, ...remote.goals }, questionStats };
}

/** The same data with one exam's sessions, results, drills and goal removed. */
export function withoutExamV2(data: V2Data, examId: string): V2Data {
  const goals = { ...data.goals };
  delete goals[examId];
  const questionStats = { ...(data.questionStats ?? {}) };
  delete questionStats[examId];
  return {
    sessions: Object.fromEntries(Object.entries(data.sessions).filter(([, v]) => v.examId !== examId)),
    results: data.results.filter((r) => r.examId !== examId),
    drills: Object.fromEntries(Object.entries(data.drills).filter(([k]) => !k.startsWith(`${examId}:`))),
    basics: Object.fromEntries(Object.entries(data.basics ?? {}).filter(([k]) => !k.startsWith(`${examId}:`))),
    goals,
    questionStats,
  };
}

type MapKey = "sessions" | "drills" | "basics" | "goals" | "questionStats";
const MAP_KEYS: MapKey[] = ["sessions", "drills", "basics", "goals", "questionStats"];

/**
 * Re-apply what changed on this device while the account copy was loading.
 * V2Sync takes a snapshot (`before`), awaits the account, then writes the
 * merged copy back; anything done in between (a test started with Start
 * module, a drill answer, a goal) is in `after` but not in `before`, and
 * would otherwise be overwritten: the test you just started vanished and the
 * start screen came back. Entries that changed win, entries removed during
 * the load are removed, and new results are added.
 */
export function withLocalChanges(merged: V2Data, before: V2Data, after: V2Data): V2Data {
  const out: V2Data = { ...merged };
  for (const key of MAP_KEYS) {
    const b = (before[key] ?? {}) as Record<string, unknown>;
    const a = (after[key] ?? {}) as Record<string, unknown>;
    if (a === b) continue;
    const next = { ...((merged[key] ?? {}) as Record<string, unknown>) };
    for (const k of Object.keys(a)) if (a[k] !== b[k]) next[k] = a[k];
    for (const k of Object.keys(b)) if (!(k in a)) delete next[k];
    (out as Record<MapKey, unknown>)[key] = next;
  }
  if (after.results !== before.results) {
    const known = new Set(before.results);
    const added = after.results.filter((r) => !known.has(r));
    const ids = new Set(merged.results.map((r) => `${r.examId}|${r.completedAt}`));
    out.results = [...merged.results, ...added.filter((r) => !ids.has(`${r.examId}|${r.completedAt}`))];
  }
  return out;
}
