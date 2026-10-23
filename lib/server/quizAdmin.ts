import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import { isInternalEmail } from "@/lib/internal";
import { QUIZ_PUBLIC_MIN_PLAYS, type QuizCreatedVia, type QuizDoc, type QuizVisibility } from "@/lib/quizzes";

// The /admin Quizzes tab: is Make a quiz working? From the quizzes collection
// (every quiz and its named players in quizzes/{code}/members), the creators'
// users docs (Premium) and Auth records (email), the MCP connector sign-ins in
// oauth_refresh_tokens (who connected Claude or ChatGPT, lib/server/oauth-store)
// and the all-time counters in analytics/quizzes (lib/server/quizzes.ts
// bumpCounter). Quizzes made by internal accounts are left out of everything
// except those counters, which were never split.

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const WEEKS_SHOWN = 12;

export interface QuizAdminQuiz {
  code: string;
  title: string;
  ownerUid: string;
  ownerName: string;
  ownerEmail: string | null;
  ownerPremium: boolean;
  createdVia: QuizCreatedVia;
  visibility: QuizVisibility;
  className: string | null;
  questions: number;
  topics: string[];
  plays: number;
  members: number;
  /** Named players who practiced in the last 7 days. */
  activeThisWeek: number;
  /** Answers from named players (anonymous play only counts in `plays`). */
  answered: number;
  correct: number;
  reports: number;
  featured: boolean;
  /** Shown in the /quizzes library: public and featured or past QUIZ_PUBLIC_MIN_PLAYS plays. */
  listed: boolean;
  createdAt: string;
  updatedAt: string;
  lastPlayerActiveAt: string | null;
}

export interface QuizAdminCreator {
  uid: string;
  name: string;
  email: string | null;
  premium: boolean;
  quizzes: number;
  questions: number;
  plays: number;
  members: number;
  /** Which assistant they connected, if any. */
  connector: string | null;
  firstQuizAt: string;
  lastQuizAt: string;
}

export interface QuizAdminPayload {
  generatedAt: string;
  totals: {
    quizzes: number;
    creators: number;
    premiumCreators: number;
    /** Creators with more than one quiz. */
    repeatCreators: number;
    questions: number;
    plays: number;
    playedQuizzes: number;
    members: number;
    answered: number;
    reports: number;
    listed: number;
    madeThisWeek: number;
    internalQuizzesHidden: number;
  };
  bySource: Record<QuizCreatedVia, number>;
  byVisibility: Record<QuizVisibility, number>;
  /** Accounts that connected Claude or ChatGPT to TigerTest, and how many of them made a quiz. */
  connector: {
    accounts: number;
    madeQuiz: number;
    last30: number;
    byClient: { client: string; accounts: number; madeQuiz: number }[];
  };
  /** analytics/quizzes, all time, internal accounts included. */
  counters: { createdWeb: number; createdImport: number; createdMcp: number; plays: number; questionReports: number };
  weeks: { start: string; quizzes: number; mcp: number; newCreators: number; connections: number }[];
  quizzes: QuizAdminQuiz[];
  creators: QuizAdminCreator[];
}

/** Monday 00:00 UTC of the week holding `t`. */
function weekStart(t: number): number {
  const d = new Date(t);
  const day = (d.getUTCDay() + 6) % 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day);
}

/** "Claude", "ChatGPT" or the client's own registered name. */
function clientLabel(name: string | undefined): string {
  const n = (name ?? "").trim();
  if (/claude|anthropic/i.test(n)) return "Claude";
  if (/chatgpt|openai/i.test(n)) return "ChatGPT";
  return n || "Unknown";
}

async function emailsFor(auth: Auth, uids: string[]): Promise<Map<string, string | null>> {
  const out = new Map<string, string | null>();
  for (let i = 0; i < uids.length; i += 100) {
    const res = await auth.getUsers(uids.slice(i, i + 100).map((uid) => ({ uid })));
    for (const u of res.users) out.set(u.uid, u.email ?? null);
  }
  return out;
}

export async function buildQuizAdmin(db: Firestore, auth: Auth, internalUids: Set<string>): Promise<QuizAdminPayload> {
  const now = Date.now();
  const weekAgo = now - WEEK_MS;
  const monthAgo = now - 30 * DAY_MS;

  const [quizSnap, countersDoc, tokenSnap, clientSnap] = await Promise.all([
    db.collection("quizzes").get(),
    db.doc("analytics/quizzes").get(),
    db.collection("oauth_refresh_tokens").select("userId", "clientId", "createdAt").get(),
    db.collection("oauth_clients").select("clientName").get(),
  ]);

  const allQuizzes = quizSnap.docs.map((d) => d.data() as QuizDoc);
  const ownerUids = [...new Set(allQuizzes.map((q) => q.ownerUid))];
  const emails = await emailsFor(auth, ownerUids);
  const isInternal = (uid: string) => internalUids.has(uid) || isInternalEmail(emails.get(uid));
  const quizzes = allQuizzes.filter((q) => !isInternal(q.ownerUid));
  const internalQuizzesHidden = allQuizzes.length - quizzes.length;

  // Named players, and Premium for each creator.
  const creatorUids = [...new Set(quizzes.map((q) => q.ownerUid))];
  const [memberSnaps, userSnaps] = await Promise.all([
    Promise.all(quizzes.map((q) => db.collection("quizzes").doc(q.code).collection("members").select("lastActive", "answered", "correct").get())),
    creatorUids.length ? db.getAll(...creatorUids.map((uid) => db.collection("users").doc(uid)), { fieldMask: ["subscription.isPremium"] }) : Promise.resolve([]),
  ]);
  const premium = new Set(userSnaps.filter((s) => s.exists && s.data()?.subscription?.isPremium === true).map((s) => s.id));

  // Connector sign-ins: the first time each account connected, and with which assistant.
  const clientNames = new Map(clientSnap.docs.map((d) => [d.id, clientLabel(d.data().clientName)]));
  const connections = new Map<string, { at: string; client: string }>();
  for (const d of tokenSnap.docs) {
    const t = d.data() as { userId?: string; clientId?: string; createdAt?: string };
    if (!t.userId || internalUids.has(t.userId)) continue;
    const at = t.createdAt ?? "";
    const prev = connections.get(t.userId);
    if (!prev || at < prev.at) connections.set(t.userId, { at, client: clientNames.get(t.clientId ?? "") ?? "Unknown" });
  }

  const firstWeek = weekStart(now) - (WEEKS_SHOWN - 1) * WEEK_MS;
  const weeks = Array.from({ length: WEEKS_SHOWN }, (_, i) => ({
    start: new Date(firstWeek + i * WEEK_MS).toISOString().split("T")[0],
    quizzes: 0,
    mcp: 0,
    newCreators: 0,
    connections: 0,
  }));
  const weekIndex = (iso: string | undefined) => {
    const t = iso ? Date.parse(iso) : NaN;
    if (!Number.isFinite(t) || t < firstWeek) return -1;
    return Math.min(WEEKS_SHOWN - 1, Math.floor((t - firstWeek) / WEEK_MS));
  };
  for (const c of connections.values()) {
    const i = weekIndex(c.at);
    if (i >= 0) weeks[i].connections++;
  }

  const rows: QuizAdminQuiz[] = quizzes.map((q, idx) => {
    let activeThisWeek = 0;
    let answered = 0;
    let correct = 0;
    let lastPlayerActiveAt: string | null = null;
    for (const m of memberSnaps[idx].docs) {
      const d = m.data() as { lastActive?: string; answered?: number; correct?: number };
      answered += d.answered ?? 0;
      correct += d.correct ?? 0;
      if (d.lastActive) {
        if (Date.parse(d.lastActive) >= weekAgo) activeThisWeek++;
        if (!lastPlayerActiveAt || d.lastActive > lastPlayerActiveAt) lastPlayerActiveAt = d.lastActive;
      }
    }
    const i = weekIndex(q.createdAt);
    if (i >= 0) {
      weeks[i].quizzes++;
      if (q.createdVia === "mcp") weeks[i].mcp++;
    }
    const topics = [...new Set(q.questions.map((x) => x.topic).filter((t): t is string => !!t))];
    return {
      code: q.code,
      title: q.title,
      ownerUid: q.ownerUid,
      ownerName: q.ownerName,
      ownerEmail: emails.get(q.ownerUid) ?? null,
      ownerPremium: premium.has(q.ownerUid),
      createdVia: q.createdVia,
      visibility: q.visibility,
      className: q.className ?? null,
      questions: q.questions.length,
      topics,
      plays: q.plays ?? 0,
      members: memberSnaps[idx].size,
      activeThisWeek,
      answered,
      correct,
      reports: q.reports ?? 0,
      featured: !!q.featured,
      listed: q.visibility === "public" && (!!q.featured || (q.plays ?? 0) >= QUIZ_PUBLIC_MIN_PLAYS),
      createdAt: q.createdAt,
      updatedAt: q.updatedAt,
      lastPlayerActiveAt,
    };
  });
  rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const byCreator = new Map<string, QuizAdminCreator>();
  for (const r of rows) {
    const c = byCreator.get(r.ownerUid) ?? {
      uid: r.ownerUid,
      name: r.ownerName,
      email: r.ownerEmail,
      premium: r.ownerPremium,
      quizzes: 0,
      questions: 0,
      plays: 0,
      members: 0,
      connector: connections.get(r.ownerUid)?.client ?? null,
      firstQuizAt: r.createdAt,
      lastQuizAt: r.createdAt,
    };
    c.quizzes++;
    c.questions += r.questions;
    c.plays += r.plays;
    c.members += r.members;
    if (r.createdAt < c.firstQuizAt) c.firstQuizAt = r.createdAt;
    if (r.createdAt > c.lastQuizAt) c.lastQuizAt = r.createdAt;
    byCreator.set(r.ownerUid, c);
  }
  const creators = [...byCreator.values()].sort((a, b) => b.quizzes - a.quizzes || b.plays - a.plays || b.lastQuizAt.localeCompare(a.lastQuizAt));
  for (const c of creators) {
    const i = weekIndex(c.firstQuizAt);
    if (i >= 0) weeks[i].newCreators++;
  }

  const byClient = new Map<string, { client: string; accounts: number; madeQuiz: number }>();
  let connectorMadeQuiz = 0;
  let connectorLast30 = 0;
  for (const [uid, c] of connections) {
    const e = byClient.get(c.client) ?? { client: c.client, accounts: 0, madeQuiz: 0 };
    e.accounts++;
    if (byCreator.has(uid)) {
      e.madeQuiz++;
      connectorMadeQuiz++;
    }
    if (Date.parse(c.at) >= monthAgo) connectorLast30++;
    byClient.set(c.client, e);
  }

  const bySource: Record<QuizCreatedVia, number> = { web: 0, mcp: 0, import: 0 };
  const byVisibility: Record<QuizVisibility, number> = { private: 0, link: 0, public: 0, class: 0 };
  for (const r of rows) {
    bySource[r.createdVia] = (bySource[r.createdVia] ?? 0) + 1;
    byVisibility[r.visibility] = (byVisibility[r.visibility] ?? 0) + 1;
  }

  const raw = countersDoc.exists ? (countersDoc.data() as Record<string, unknown>) : {};
  const count = (key: string) => (typeof raw[key] === "number" ? (raw[key] as number) : 0);
  const sum = (f: (r: QuizAdminQuiz) => number) => rows.reduce((n, r) => n + f(r), 0);

  return {
    generatedAt: new Date(now).toISOString(),
    totals: {
      quizzes: rows.length,
      creators: creators.length,
      premiumCreators: creators.filter((c) => c.premium).length,
      repeatCreators: creators.filter((c) => c.quizzes > 1).length,
      questions: sum((r) => r.questions),
      plays: sum((r) => r.plays),
      playedQuizzes: rows.filter((r) => r.plays > 0).length,
      members: sum((r) => r.members),
      answered: sum((r) => r.answered),
      reports: sum((r) => r.reports),
      listed: rows.filter((r) => r.listed).length,
      madeThisWeek: rows.filter((r) => Date.parse(r.createdAt) >= weekAgo).length,
      internalQuizzesHidden,
    },
    bySource,
    byVisibility,
    connector: {
      accounts: connections.size,
      madeQuiz: connectorMadeQuiz,
      last30: connectorLast30,
      byClient: [...byClient.values()].sort((a, b) => b.accounts - a.accounts),
    },
    counters: {
      createdWeb: count("created_web"),
      createdImport: count("created_import"),
      createdMcp: count("created_mcp"),
      plays: count("plays"),
      questionReports: count("questionReports"),
    },
    weeks,
    quizzes: rows,
    creators,
  };
}
