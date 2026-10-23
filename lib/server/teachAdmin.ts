import type { Firestore } from "firebase-admin/firestore";
import { classExamNameById } from "@/lib/classes";
import { isInternalEmail } from "@/lib/internal";
import type { MemberDoc } from "@/lib/server/classReport";
import { SCHOOL_KIND_LABELS, type SchoolKind } from "@/lib/schoolHosts";

// The /admin Teachers tab: is the instructor channel working? From the classes
// collection (every class and its members) plus the analytics/teach counters
// written by lib/teachTracking.ts (landing views, create-class clicks, class
// link views), and the schoolReferrals hosts (lib/schoolReferral.ts): teachers
// who posted a Tigertest link in an LMS without making a class. Classes made
// by internal accounts are left out.

/** The day the analytics/teach counters started; earlier visits weren't counted. */
export const TEACH_TRACKING_SINCE = "2026-10-19";

/** The day the dashboard teacher nudge (components/TeachNudge.tsx) started being counted. */
export const NUDGE_TRACKING_SINCE = "2026-10-20";

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const WEEKS_SHOWN = 12;

export interface TeachFunnelStep {
  key: string;
  label: string;
  detail: string;
  total: number;
  last30: number;
  /** Counted by the browser tracker, so only since TEACH_TRACKING_SINCE. */
  tracked: boolean;
}

export interface TeachAdminClass {
  code: string;
  name: string;
  examName: string;
  teacherName: string;
  teacherEmail: string | null;
  school: string;
  createdAt: string;
  students: number;
  /** Students with at least one answer. */
  practiced: number;
  activeThisWeek: number;
  answered: number;
  correct: number;
  testsTaken: number;
  joinViews: number;
  joinReferrers: { host: string; count: number }[];
  teacherViews: number;
  teacherLastViewedAt: string | null;
  lastStudentActiveAt: string | null;
}

export interface TeachAdminPayload {
  generatedAt: string;
  trackingSince: string;
  totals: {
    teachers: number;
    classes: number;
    classesWithStudents: number;
    classesActiveThisWeek: number;
    students: number;
    practiced: number;
    activeThisWeek: number;
    answered: number;
    testsTaken: number;
    internalClassesHidden: number;
  };
  funnel: TeachFunnelStep[];
  /** The "Teachers can use it free" row at the top of exam dashboards: browsers shown it, then copied or tapped its /teach link. */
  nudge: {
    since: string;
    shown: number;
    copied: number;
    tapped: number;
    last30: { shown: number; copied: number; tapped: number };
    byExam: { examId: string; examName: string; shown: number; copied: number; tapped: number }[];
  };
  weeks: { start: string; classes: number; joins: number; landingViews: number; answeringStudents: number }[];
  landingSources: { key: string; count: number }[];
  landingReferrers: { key: string; count: number }[];
  exams: { examName: string; classes: number; students: number; answered: number }[];
  classes: TeachAdminClass[];
  schoolReferrals: { host: string; kind: string; visits: number; courses: number; topLanding: string | null; firstSeen: string; lastSeen: string }[];
}

type Counter = { total?: number; daily?: Record<string, number> };

function sumSince(c: Counter | undefined, sinceDay: string): number {
  return Object.entries(c?.daily ?? {}).reduce((n, [day, v]) => (day >= sinceDay ? n + (v ?? 0) : n), 0);
}

function sortedCounts(m: Record<string, number> | undefined, decode = false) {
  return Object.entries(m ?? {})
    .map(([key, count]) => ({ key: decode ? key.replace(/_/g, ".") : key, count }))
    .sort((a, b) => b.count - a.count);
}

/** Monday 00:00 UTC of the week holding `t`. */
function weekStart(t: number): number {
  const d = new Date(t);
  const day = (d.getUTCDay() + 6) % 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day);
}

export async function buildTeachAdmin(db: Firestore, internalUids: Set<string>): Promise<TeachAdminPayload> {
  const now = Date.now();
  const since30 = now - 30 * DAY_MS;
  const since30Day = new Date(since30).toISOString().split("T")[0];
  const weekAgo = now - WEEK_MS;

  const [classSnap, statsSnap, referralSnap] = await Promise.all([
    db.collection("classes").get(),
    db.doc("analytics/teach").get(),
    db.collection("schoolReferrals").get(),
  ]);
  const stats = (statsSnap.data() ?? {}) as {
    steps?: Record<string, Counter>;
    landingSources?: Record<string, number>;
    landingReferrers?: Record<string, number>;
    nudgeExams?: Record<string, { shown?: number; copy?: number; link?: number }>;
  };

  let internalClassesHidden = 0;
  const kept = classSnap.docs.filter((d) => {
    const c = d.data();
    const internal = internalUids.has(c.teacherUid) || isInternalEmail(c.teacherEmail);
    if (internal) internalClassesHidden++;
    return !internal;
  });

  const memberLists = await Promise.all(kept.map((d) => d.ref.collection("members").get().then((s) => s.docs.map((m) => m.data() as MemberDoc))));

  const firstWeek = weekStart(now) - (WEEKS_SHOWN - 1) * WEEK_MS;
  const weeks = Array.from({ length: WEEKS_SHOWN }, (_, i) => ({
    start: new Date(firstWeek + i * WEEK_MS).toISOString().split("T")[0],
    classes: 0,
    joins: 0,
    landingViews: 0,
    answeringStudents: 0,
  }));
  const weekIndex = (iso: string | null | undefined) => {
    const t = iso ? Date.parse(iso) : NaN;
    if (!Number.isFinite(t) || t < firstWeek) return -1;
    return Math.min(WEEKS_SHOWN - 1, Math.floor((t - firstWeek) / WEEK_MS));
  };
  for (const [day, v] of Object.entries(stats.steps?.landing_view?.daily ?? {})) {
    const i = weekIndex(`${day}T12:00:00Z`);
    if (i >= 0) weeks[i].landingViews += v ?? 0;
  }

  const teachers = new Set<string>();
  const examTotals = new Map<string, { classes: number; students: number; answered: number }>();
  let joins30 = 0;
  let practiced30 = 0;
  let tested30 = 0;
  let classes30 = 0;
  let practicedAll = 0;
  let testedAll = 0;

  const classes: TeachAdminClass[] = kept.map((d, i) => {
    const c = d.data();
    const members = memberLists[i];
    teachers.add(c.teacherUid);
    if (Date.parse(c.createdAt) >= since30) classes30++;
    const wi = weekIndex(c.createdAt);
    if (wi >= 0) weeks[wi].classes++;

    let practiced = 0;
    let activeThisWeek = 0;
    let answered = 0;
    let correct = 0;
    let testsTaken = 0;
    let lastStudentActiveAt: string | null = null;
    for (const m of members) {
      const recent = Date.parse(m.joinedAt) >= since30;
      const tests = Object.values(m.tests ?? {}).reduce((n, t) => n + (t.attempts ?? 0), 0);
      const did = (m.answered ?? 0) > 0;
      answered += m.answered ?? 0;
      correct += m.correct ?? 0;
      testsTaken += tests;
      if (did) {
        practiced++;
        practicedAll++;
        if (recent) practiced30++;
        if (m.lastActive && Date.parse(m.lastActive) >= weekAgo) activeThisWeek++;
        if (m.lastActive && (!lastStudentActiveAt || m.lastActive > lastStudentActiveAt)) lastStudentActiveAt = m.lastActive;
        const ai = weekIndex(m.lastActive);
        if (ai >= 0) weeks[ai].answeringStudents++;
      }
      if (tests > 0) {
        testedAll++;
        if (recent) tested30++;
      }
      if (recent) joins30++;
      const ji = weekIndex(m.joinedAt);
      if (ji >= 0) weeks[ji].joins++;
    }

    const examName = classExamNameById(c.examId, c.state);
    const e = examTotals.get(examName) ?? { classes: 0, students: 0, answered: 0 };
    e.classes++;
    e.students += members.length;
    e.answered += answered;
    examTotals.set(examName, e);

    return {
      code: c.code,
      name: c.name,
      examName,
      teacherName: c.teacherName ?? "",
      teacherEmail: c.teacherEmail ?? null,
      school: c.school ?? "",
      createdAt: c.createdAt,
      students: members.length,
      practiced,
      activeThisWeek,
      answered,
      correct,
      testsTaken,
      joinViews: c.joinViews ?? 0,
      joinReferrers: sortedCounts(c.joinReferrers, true).map(({ key, count }) => ({ host: key, count })),
      teacherViews: c.teacherViews ?? 0,
      teacherLastViewedAt: c.teacherLastViewedAt ?? null,
      lastStudentActiveAt,
    };
  });
  classes.sort((a, b) => (b.lastStudentActiveAt ?? b.createdAt).localeCompare(a.lastStudentActiveAt ?? a.createdAt));

  const steps = stats.steps ?? {};
  const tracked = (key: string, label: string, detail: string): TeachFunnelStep => ({
    key,
    label,
    detail,
    total: steps[key]?.total ?? 0,
    last30: sumSince(steps[key], since30Day),
    tracked: true,
  });
  const students = classes.reduce((n, c) => n + c.students, 0);

  return {
    generatedAt: new Date(now).toISOString(),
    trackingSince: TEACH_TRACKING_SINCE,
    totals: {
      teachers: teachers.size,
      classes: classes.length,
      classesWithStudents: classes.filter((c) => c.students > 0).length,
      classesActiveThisWeek: classes.filter((c) => c.activeThisWeek > 0).length,
      students,
      practiced: practicedAll,
      activeThisWeek: classes.reduce((n, c) => n + c.activeThisWeek, 0),
      answered: classes.reduce((n, c) => n + c.answered, 0),
      testsTaken: classes.reduce((n, c) => n + c.testsTaken, 0),
      internalClassesHidden,
    },
    funnel: [
      tracked("landing_view", "Saw the /teach page", "browsers shown the teacher landing"),
      tracked("new_open", "Clicked Create a class", "clicked Create on /teach, or opened /teach/new"),
      tracked("new_form", "Reached the class form", "signed in and saw the form"),
      { key: "class_created", label: "Made a class", detail: "classes created", total: classes.length, last30: classes30, tracked: false },
      tracked("join_view", "Opened a class link", "browsers that opened a /c/ link, once per class"),
      { key: "joined", label: "Joined a class", detail: "students who typed their name", total: students, last30: joins30, tracked: false },
      { key: "practiced", label: "Answered a question", detail: "students with at least one answer", total: practicedAll, last30: practiced30, tracked: false },
      { key: "tested", label: "Finished a practice test", detail: "students with a full test", total: testedAll, last30: tested30, tracked: false },
    ],
    nudge: {
      since: NUDGE_TRACKING_SINCE,
      shown: steps.nudge_shown?.total ?? 0,
      copied: steps.nudge_copy?.total ?? 0,
      tapped: steps.nudge_link?.total ?? 0,
      last30: {
        shown: sumSince(steps.nudge_shown, since30Day),
        copied: sumSince(steps.nudge_copy, since30Day),
        tapped: sumSince(steps.nudge_link, since30Day),
      },
      byExam: Object.entries(stats.nudgeExams ?? {})
        .map(([examId, v]) => ({ examId, examName: classExamNameById(examId), shown: v.shown ?? 0, copied: v.copy ?? 0, tapped: v.link ?? 0 }))
        .sort((a, b) => b.copied - a.copied || b.shown - a.shown),
    },
    weeks,
    landingSources: sortedCounts(stats.landingSources),
    landingReferrers: sortedCounts(stats.landingReferrers, true).slice(0, 15),
    exams: [...examTotals.entries()].map(([examName, v]) => ({ examName, ...v })).sort((a, b) => b.students - a.students || b.classes - a.classes),
    classes,
    schoolReferrals: referralSnap.docs
      .map((d) => {
        const r = d.data();
        const top = sortedCounts(r.landings)[0]?.key;
        return {
          host: d.id,
          kind: SCHOOL_KIND_LABELS[r.kind as SchoolKind] ?? r.kind ?? "",
          visits: r.visits ?? 0,
          courses: Object.keys(r.courses ?? {}).length,
          // Landings are stored with '/' as '|'.
          topLanding: top ? top.replace(/\|/g, "/") : null,
          firstSeen: r.firstSeen ?? "",
          lastSeen: r.lastSeen ?? "",
        };
      })
      .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen)),
  };
}
