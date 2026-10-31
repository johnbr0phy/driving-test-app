import Anthropic from '@anthropic-ai/sdk';
import type { Firestore } from 'firebase-admin/firestore';
import type { OpportunitiesPayload } from '@/lib/server/opportunities';
import { buildTeachAdmin, type TeachAdminPayload } from '@/lib/server/teachAdmin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { TEST_CATALOG } from '@/lib/testCatalog';
import { REGIONS } from '@/lib/region';

// The daily update at the top of the /admin Today tab: Claude reads the
// page's numbers (plus the previous update's numbers, to say what changed)
// and writes a headline and a few short bullets. Written each weekday morning
// by /api/cron/daily-brief, or on demand from the page. One doc per Eastern
// day in dailyBriefs/{YYYY-MM-DD}; the page shows the newest.

export const BRIEF_MODEL = 'claude-opus-5-5';

export interface DailyBrief {
  date: string;
  headline: string;
  bullets: string[];
  generatedAt: string;
  model: string;
  // The numbers the update was written from, so tomorrow's can compare.
  numbers: BriefNumbers;
}

/** Today's date in Eastern time, the day a brief belongs to. */
export function briefDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(now);
}

type BriefNumbers = ReturnType<typeof briefNumbers>;

/**
 * Teachers and schools (lib/server/teachAdmin), with what is new since the
 * previous update spelled out, so a first class or a first school link is
 * never buried under the revenue numbers.
 */
function schoolNumbers(t: TeachAdminPayload, sinceIso: string | null) {
  const isNew = (iso: string) => !!iso && (!sinceIso || iso > sinceIso);
  const week = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return {
    allTime: {
      teachers: t.totals.teachers,
      classes: t.totals.classes,
      students: t.totals.students,
      studentsWhoAnswered: t.totals.practiced,
      answers: t.totals.answered,
      testsTaken: t.totals.testsTaken,
      schoolsLinkingToUs: t.schoolReferrals.length,
    },
    studentsActiveThisWeek: t.totals.activeThisWeek,
    newClassesSincePreviousUpdate: t.classes
      .filter((c) => isNew(c.createdAt))
      .map((c) => ({ exam: c.examName, school: c.school || null, createdAt: c.createdAt, students: c.students, studentsWhoAnswered: c.practiced })),
    newSchoolsLinkingSincePreviousUpdate: t.schoolReferrals
      .filter((r) => isNew(r.firstSeen))
      .map((r) => ({ site: r.host, kind: r.kind, visits: r.visits, courses: r.courses, landedOn: r.topLanding })),
    classesActiveThisWeek: t.classes
      .filter((c) => c.lastStudentActiveAt && Date.parse(c.lastStudentActiveAt) >= week)
      .slice(0, 5)
      .map((c) => ({ exam: c.examName, school: c.school || null, students: c.students, answers: c.answered, testsTaken: c.testsTaken })),
  };
}

/** The page's payload cut down to what an update can talk about. */
export function briefNumbers(p: OpportunitiesPayload, schools: ReturnType<typeof schoolNumbers> | null = null) {
  const dollars = (cents: number) => Math.round(cents) / 100;
  return {
    last30Days: {
      revenueDollars: dollars(p.scoreboard.revenue.cur30),
      previous30DaysRevenueDollars: p.scoreboard.revenue.prev30 === null ? null : dollars(p.scoreboard.revenue.prev30),
      purchases: p.scoreboard.purchases.cur30,
      newAccounts: p.scoreboard.signups.cur30,
      answers: p.scoreboard.answers.cur30,
      newVisitors: p.scoreboard.visits.cur30,
      visitorsCountedSince: p.scoreboard.visits.since,
    },
    last7Days: {
      revenueDollars: dollars(p.scoreboard.revenue.cur7),
      previous7DaysRevenueDollars: p.scoreboard.revenue.prev7 === null ? null : dollars(p.scoreboard.revenue.prev7),
      purchases: p.scoreboard.purchases.cur7,
      newAccounts: p.scoreboard.signups.cur7,
      previous7DaysNewAccounts: p.scoreboard.signups.prev7,
      answers: p.scoreboard.answers.cur7,
      previous7DaysAnswers: p.scoreboard.answers.prev7,
      newVisitors: p.scoreboard.visits.cur7,
    },
    refunds: p.scoreboard.refunds,
    // Practice is filed by the exam's country; visitors and signups by the visitor's.
    byCountry: (p.countries ?? []).map((c) => ({
      country: c.label,
      examsListed: c.exams,
      examsPracticedIn30d: c.activeExams,
      answers30d: c.answers30d,
      previous30dAnswers: c.answersPrev30d,
      answers7d: c.answers7d,
      newVisitors30d: c.visitors30d,
      signups: c.signups,
      revenue30dDollars: dollars(c.revenue30dCents),
      busiestExams: c.topExams,
    })),
    countryCountingSince: p.countriesSince ?? null,
    busiestExams: p.exams.slice(0, 10).map((e) => ({
      exam: e.label,
      country: e.region,
      hasPremium: e.monetized,
      answers30d: e.answers30d,
      answers7d: e.answers7d,
      people: e.enrolled,
      paywallViews30d: e.paywallHits30d,
      purchases30d: e.purchases30d,
      revenue30dDollars: dollars(e.revenue30dCents),
    })),
    paywalls: p.paywalls.map((w) => ({
      paywall: w.label,
      views30d: w.hits30d,
      purchases30d: w.purchases30d,
      viewsAllTime: w.hitsAll,
      purchasesAllTime: w.purchasesAll,
    })),
    visitorSources7d: p.sources
      .filter((s) => s.visits7d > 0 || (s.visitsPrev7d ?? 0) > 0)
      .map((s) => ({ source: s.label, visitors7d: s.visits7d, previous7d: s.visitsPrev7d, signups: s.signups, buyers: s.buyers })),
    retention: p.cohorts
      .filter((c) => c.week1 !== null)
      .slice(-4)
      .map((c) => ({ signedUp: `${c.start} to ${c.end}`, accounts: c.size, activeInSecondWeek: c.week1, bought: c.bought })),
    trackingProblems: p.health.filter((h) => h.status !== 'ok').map((h) => h.title),
    // Missing when the classes could not be read; the update goes on without them.
    teachersAndSchools: schools,
  };
}

const COUNTRY_NAMES = REGIONS.filter((r) => r.code !== 'US').map((r) => r.name).join(', ');

const SYSTEM = `You write the morning update for John, who runs Tigertest (tigertest.io), a site of free practice tests: the US DMV permit test plus about ${Math.floor(TEST_CATALOG.length / 10) * 10} other exams, with country pages and local exams for ${COUNTRY_NAMES} too. A $9.99 one-time Premium unlock (US dollars) is sold only on the DMV, SAT and ACT, and on US exams' stats pages; other countries' exams are free and cannot sell.

John does not like reading much text. Write:
- line 1: one headline sentence, at most 15 words, saying the single most important thing today
- then 3 to 5 lines starting with "- ", each at most 25 words

What to cover, most important first. A milestone beats everything: a first ever (the first class a teacher made, the first school linking to us, a first sale on a new paywall) is the headline, named specifically (which school, which exam). teachersAndSchools.newClassesSincePreviousUpdate and newSchoolsLinkingSincePreviousUpdate list what is new since the previous update; any entry there is news, and when allTime.classes or allTime.schoolsLinkingToUs equals the number new, it is the first ever. Teachers and schools matter more than their small numbers suggest: one class brings a room of students and the next class. After that: money (revenue and purchases, and which paywall sold), what changed since the previous update, a country that is growing or still empty (byCountry; name it, and the exam driving it), anything unusual (a spike, a drop, an exam suddenly busy), and one concrete thing worth doing. Skip anything that has not changed and is not actionable.

Rules: use only the numbers given, never estimate or invent one. Round to whole numbers and say "$120", "about 1,400". Plain everyday words, no jargon like "cohort", "conversion rate" or "funnel". No em-dashes, no bold, no headings, nothing before the headline or after the last bullet. If the data is too thin to say something, say less rather than padding.`;

/** Asks Claude for today's update. Throws when the key is missing or the model declines. */
export async function writeBrief(numbers: BriefNumbers, previous: DailyBrief | null): Promise<{ headline: string; bullets: string[] }> {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');
  const client = new Anthropic();
  const today = briefDate();
  const user = [
    `Today is ${today}.`,
    `Today's numbers:\n${JSON.stringify(numbers, null, 1)}`,
    previous
      ? `The previous update was written on ${previous.date}. It said:\n${previous.headline}\n${previous.bullets.map((b) => `- ${b}`).join('\n')}\n\nIts numbers were:\n${JSON.stringify(previous.numbers, null, 1)}`
      : 'There is no previous update; this is the first one.',
  ].join('\n\n');

  const response = await client.beta.messages.create({
    model: BRIEF_MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'medium' },
    system: SYSTEM,
    messages: [{ role: 'user', content: user }],
  });
  if (response.stop_reason === 'refusal') {
    throw new Error(`Claude declined to write the update (${response.stop_details?.category ?? 'no category'})`);
  }
  return parseBrief(response.content.flatMap((b) => (b.type === 'text' ? [b.text] : [])).join('\n'));
}

/** Headline line plus "- " bullet lines; tolerates "•" or "*" bullets and stray markdown bold. */
export function parseBrief(text: string): { headline: string; bullets: string[] } {
  const lines = text
    .split('\n')
    .map((l) => l.trim().replace(/\*\*/g, ''))
    .filter(Boolean);
  const isBullet = (l: string) => /^[-•*]\s+/.test(l);
  const headline = lines.find((l) => !isBullet(l))?.replace(/^#+\s*/, '') ?? '';
  const bullets = lines.filter(isBullet).map((l) => l.replace(/^[-•*]\s+/, ''));
  if (!headline || bullets.length === 0) throw new Error(`Unexpected update format: ${text.slice(0, 200)}`);
  return { headline, bullets: bullets.slice(0, 5) };
}

export async function latestBrief(db: Firestore, before?: string): Promise<DailyBrief | null> {
  let query = db.collection('dailyBriefs').orderBy('date', 'desc').limit(1);
  if (before) query = db.collection('dailyBriefs').where('date', '<', before).orderBy('date', 'desc').limit(1);
  const snap = await query.get();
  return snap.empty ? null : (snap.docs[0].data() as DailyBrief);
}

/** Writes and saves today's update, replacing one already written today. */
export async function createBrief(db: Firestore, payload: OpportunitiesPayload): Promise<DailyBrief> {
  const date = briefDate();
  const previous = await latestBrief(db, date);
  let schools: ReturnType<typeof schoolNumbers> | null = null;
  try {
    schools = schoolNumbers(await buildTeachAdmin(db, await getInternalUids()), previous?.generatedAt ?? null);
  } catch (error) {
    console.error('[daily-brief] classes unavailable', error);
  }
  const numbers = briefNumbers(payload, schools);
  const { headline, bullets } = await writeBrief(numbers, previous);
  const brief: DailyBrief = { date, headline, bullets, generatedAt: new Date().toISOString(), model: BRIEF_MODEL, numbers };
  await db.doc(`dailyBriefs/${date}`).set(brief);
  return brief;
}
