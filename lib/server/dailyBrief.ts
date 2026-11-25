import Anthropic from '@anthropic-ai/sdk';
import type { Firestore } from 'firebase-admin/firestore';
import type { OpportunitiesPayload } from '@/lib/server/opportunities';
import { buildTeachAdmin, type TeachAdminPayload } from '@/lib/server/teachAdmin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { TEST_CATALOG } from '@/lib/testCatalog';
import { REGIONS } from '@/lib/region';
import { mergeMentions, searchMentions, type WebMention } from '@/lib/server/webMentions';
import { SONNET_PRICES, allowanceUsd, usageCostUsd } from '@/lib/apiBudget';
import { readSpend, recordSpend } from '@/lib/server/apiBudget';

// The daily update at the top of the /admin Today tab: Claude reads the
// page's numbers (plus the previous update's numbers, to say what changed)
// and writes a headline and a few short bullets. Written each weekday morning
// by /api/cron/daily-brief, or on demand from the page. One doc per Eastern
// day in dailyBriefs/{YYYY-MM-DD}; the page shows the newest.

// Sonnet since Dec 2026: the update summarises numbers it is given, so the larger model added cost, not quality.
export const BRIEF_MODEL = 'claude-sonnet-5-5';

export interface DailyBrief {
  date: string;
  headline: string;
  bullets: string[];
  generatedAt: string;
  model: string;
  // The numbers the update was written from, so tomorrow's can compare.
  numbers: BriefNumbers;
  // Pages on the web that talk about Tigertest (lib/server/webMentions),
  // kept across updates; missing when the search failed or predates it.
  mentions?: WebMention[];
  mentionsError?: string;
}

/** Today's date in Eastern time, the day a brief belongs to. */
export function briefDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(now);
}

type BriefNumbers = ReturnType<typeof briefNumbers> & {
  // New pages found on the web since the previous update.
  newWebMentions?: Omit<WebMention, 'isNew'>[];
};

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

/**
 * Homepage searches (/home-v2, app/api/analytics/search) since the previous
 * update, or the last 24 hours for the first one: what people typed that
 * found no test, and what found tests but had none opened. These are the
 * tests to build next, or a search alias we are missing.
 */
async function searchNumbers(db: Firestore, sinceIso: string | null) {
  const day = 24 * 60 * 60 * 1000;
  // A Monday update covers the weekend; never reach back more than a week.
  const since = new Date(Math.max(sinceIso ? Date.parse(sinceIso) : Date.now() - day, Date.now() - 7 * day));
  const sinceDay = since.toISOString().slice(0, 10);
  const snap = await db.collection('searchQueries').where('lastAt', '>=', since.toISOString()).get();
  const rows = snap.docs.map((d) => {
    const v = d.data();
    const daily = (v.daily ?? {}) as Record<string, number>;
    const picks = (v.picks ?? {}) as Record<string, number>;
    return {
      query: String(v.q ?? ''),
      // By UTC day, so the first day may reach a little before `since`.
      timesTyped: Object.entries(daily).reduce((s, [d, n]) => (d >= sinceDay ? s + n : s), 0),
      timesTypedAllTime: v.count ?? 0,
      foundNothing: (v.lastResults ?? 0) === 0,
      testsOpened: Object.keys(picks),
      countries: Object.keys(v.byRegion ?? {}),
    };
  });
  rows.sort((a, b) => b.timesTyped - a.timesTyped || b.timesTypedAllTime - a.timesTypedAllTime);
  const strip = ({ foundNothing: _f, testsOpened: _t, ...r }: (typeof rows)[number]) => r;
  return {
    since: since.toISOString(),
    searches: rows.reduce((s, r) => s + r.timesTyped, 0),
    foundNothing: rows.filter((r) => r.foundNothing).slice(0, 40).map(strip),
    foundTestsButNoneOpened: rows.filter((r) => !r.foundNothing && r.testsOpened.length === 0).slice(0, 20).map(strip),
  };
}

/** The page's payload cut down to what an update can talk about. */
export function briefNumbers(
  p: OpportunitiesPayload,
  schools: ReturnType<typeof schoolNumbers> | null = null,
  searches: Awaited<ReturnType<typeof searchNumbers>> | null = null,
) {
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
    // Missing when the searches could not be read.
    homepageSearches: searches,
  };
}

const COUNTRY_NAMES = REGIONS.filter((r) => r.code !== 'US').map((r) => r.name).join(', ');

const SYSTEM = `You write the morning update for John, who runs Tigertest (tigertest.io), a site of free practice tests: the US DMV permit test plus about ${Math.floor(TEST_CATALOG.length / 10) * 10} other exams, with country pages and local exams for ${COUNTRY_NAMES} too. A $9.99 one-time Premium unlock (a local price outside the US, revenue reported in US dollars) is sold on the DMV and on every exam's stats page in every country (the SAT and ACT went fully free on Oct 31, 2026).

John does not like reading much text. Write:
- line 1: one headline sentence, at most 15 words, saying the single most important thing today
- then 3 to 5 lines starting with "- ", each at most 25 words
- then, when homepageSearches has anything worth acting on, one last line starting with "- Searches:" (at most 35 words)

What to cover, most important first. A milestone beats everything: a first ever (the first class a teacher made, the first school linking to us, a first sale on a new paywall) is the headline, named specifically (which school, which exam). teachersAndSchools.newClassesSincePreviousUpdate and newSchoolsLinkingSincePreviousUpdate list what is new since the previous update; any entry there is news, and when allTime.classes or allTime.schoolsLinkingToUs equals the number new, it is the first ever. Teachers and schools matter more than their small numbers suggest: one class brings a room of students and the next class. After that: money (revenue and purchases, and which paywall sold), what changed since the previous update, a country that is growing or still empty (byCountry; name it, and the exam driving it), anything unusual (a spike, a drop, an exam suddenly busy), and one concrete thing worth doing. Question quality (answer keys, student reports, exam changes) is handled by automated runs and is not part of this update. Skip anything that has not changed and is not actionable.

The "Searches:" line is about tests to build next. homepageSearches lists what people typed on the homepage search since the previous update that found no test (foundNothing) or found tests but opened none. For each, work out the real exam the person meant (expand acronyms, fix typos, use their country) and check it against the list of tests we already have. If we have it, it is a search fix: say "add <query> as a name for <test>". If we do not, and it is a real exam many people take with a written multiple-choice part, suggest building it, best first, with how many times it was typed. Ignore gibberish, names and stray letters. Say when a query is ambiguous rather than guessing. Leave the line out when there is nothing worth acting on.

newWebMentions lists pages found on the web since the previous update where people talk about Tigertest (a Reddit thread, a forum post, a school page, an article). Real people recommending or complaining about Tigertest is news: give it a bullet naming the site and what they said, and make it the headline when it is a first or clearly matters (a big thread, a school, a complaint about a wrong answer). Do not list every link; the page shows them under the update.

Some exams are free by policy and never sell Premium: school, college-entrance and children's tests (SAT, PSAT, ACT, AP, GED, GCSE, KS2, 11+, NAPLAN, selective and OC tests, JNVST, AISSEE, JAMB, WASSCE, JEE, NEET, CUET, MHT-CET, NDA, Times Tables and the like). An exam with hasPremium false is usually one of these. Never suggest adding a paywall, Premium or a price to them; a busy free exam is good news for reach, not missed money.

Voice: write like a cheerful, sharp British colleague with a cup of tea, not a dashboard. Warm and a little playful, with the odd dry British turn of phrase ("cracking", "not too shabby", "a quiet one", "bit of a damp squib"), but at most one or two per update, and never at the cost of clarity. Lean positive: lead with what is going well and why it matters, and make the one thing worth doing sound worth getting up for. But be honest: when something is bad (sales down, an exam gone quiet, a wrong answer key, a broken job), say so plainly and do not dress it up. Vary it day to day: read the previous update and do not reuse its opening words, its sentence shapes or its turns of phrase. No exclamation marks in every line, no emoji, no forced puns, British spelling.

Rules: use only the numbers given, never estimate or invent one. Round to whole numbers and say "$120", "about 1,400". Plain everyday words, no jargon like "cohort", "conversion rate" or "funnel". No em-dashes, no bold, no headings, nothing before the headline or after the last bullet. If the data is too thin to say something, say less rather than padding.`;

/** Asks Claude for today's update. Throws when the key is missing or the model declines. */
export async function writeBrief(
  numbers: BriefNumbers,
  previous: DailyBrief | null,
  onUsage?: (usage: Anthropic.Beta.BetaUsage) => void,
): Promise<{ headline: string; bullets: string[] }> {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');
  const client = new Anthropic();
  const today = briefDate();
  const user = [
    `Today is ${today}.`,
    `Today's numbers:\n${JSON.stringify(numbers, null, 1)}`,
    `Tests we already have (for the searches line):\n${TEST_CATALOG.map((t) => `${t.name} (${t.shortName})`).join('; ')}`,
    previous
      ? `The previous update was written on ${previous.date}. It said:\n${previous.headline}\n${previous.bullets.map((b) => `- ${b}`).join('\n')}\n\nIts numbers were:\n${JSON.stringify(previous.numbers, null, 1)}`
      : 'There is no previous update; this is the first one.',
  ].join('\n\n');

  const response = await client.beta.messages.create({
    model: BRIEF_MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: SYSTEM,
    messages: [{ role: 'user', content: user }],
  });
  onUsage?.(response.usage);
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
  return { headline, bullets: bullets.slice(0, 6) };
}

export async function latestBrief(db: Firestore, before?: string): Promise<DailyBrief | null> {
  let query = db.collection('dailyBriefs').orderBy('date', 'desc').limit(1);
  if (before) query = db.collection('dailyBriefs').where('date', '<', before).orderBy('date', 'desc').limit(1);
  const snap = await query.get();
  return snap.empty ? null : (snap.docs[0].data() as DailyBrief);
}

/** Most one update may cost; the month's share is JOB_BUDGETS_USD['daily-brief'] (lib/apiBudget.ts). */
export const BRIEF_RUN_CAP_USD = 1;

/** True when this month's API budget still covers an update. */
export async function briefBudgetLeft(db: Firestore): Promise<boolean> {
  return allowanceUsd(await readSpend(db), 'daily-brief', BRIEF_RUN_CAP_USD) > 0;
}

/** Writes and saves today's update, replacing one already written today. */
export async function createBrief(db: Firestore, payload: OpportunitiesPayload): Promise<DailyBrief> {
  if (!(await briefBudgetLeft(db))) throw new Error('The API budget for the daily update is used up this month');
  const date = briefDate();
  let costUsd = 0;
  const onUsage = (usage: Anthropic.Beta.BetaUsage) => {
    costUsd += usageCostUsd(usage, SONNET_PRICES);
  };
  const previous = await latestBrief(db, date);
  // The web search is the costly part, so it runs on Mondays only (Eastern);
  // other days keep the links already found. Runs while the numbers are gathered.
  const monday = new Date(`${date}T12:00:00Z`).getUTCDay() === 1;
  const mentionsSearch = (monday ? searchMentions(BRIEF_MODEL, date, onUsage) : Promise.resolve([])).then(
    (found) => ({ found, error: null as string | null }),
    (error) => {
      console.error('[daily-brief] web mentions unavailable', error);
      return { found: null, error: error instanceof Error ? error.message : 'Web search failed' };
    },
  );
  let schools: ReturnType<typeof schoolNumbers> | null = null;
  try {
    schools = schoolNumbers(await buildTeachAdmin(db, await getInternalUids()), previous?.generatedAt ?? null);
  } catch (error) {
    console.error('[daily-brief] classes unavailable', error);
  }
  let searches: Awaited<ReturnType<typeof searchNumbers>> | null = null;
  try {
    searches = await searchNumbers(db, previous?.generatedAt ?? null);
  } catch (error) {
    console.error('[daily-brief] searches unavailable', error);
  }
  const numbers: BriefNumbers = briefNumbers(payload, schools, searches);
  const search = await mentionsSearch;
  // New means not in the previous day's update; a rewrite today keeps this morning's finds.
  const earlierToday = ((await db.doc(`dailyBriefs/${date}`).get()).data() as DailyBrief | undefined)?.mentions ?? [];
  const found = [...(search.found ?? []), ...earlierToday.map(({ isNew: _n, ...m }) => m)];
  const mentions = mergeMentions(found, previous?.mentions ?? []);
  numbers.newWebMentions = mentions.filter((m) => m.isNew).map(({ isNew: _n, ...m }) => m);
  let written: { headline: string; bullets: string[] };
  try {
    written = await writeBrief(numbers, previous, onUsage);
  } finally {
    await recordSpend(db, 'daily-brief', costUsd).catch((error) => console.error('[daily-brief] could not record API spend', error));
  }
  const { headline, bullets } = written;
  const brief: DailyBrief = {
    date, headline, bullets, generatedAt: new Date().toISOString(), model: BRIEF_MODEL, numbers, mentions,
    ...(search.error ? { mentionsError: search.error } : {}),
  };
  await db.doc(`dailyBriefs/${date}`).set(brief);
  return brief;
}
