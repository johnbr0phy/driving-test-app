import type Stripe from 'stripe';
import type { Firestore } from 'firebase-admin/firestore';
import { TEST_CATALOG, TEST_GROUPS } from '@/lib/testCatalog';
import { EXAMS_V2 } from '@/lib/v2/registry';
import { examAnalyticsLabel } from '@/lib/exams';
import { isInternalEmail } from '@/lib/internal';
import { shareDailyCounts } from '@/lib/shareCounts';
import { paywallHitFeature, purchaseExam, purchaseLocationLabel } from '@/lib/purchaseAttribution';

// The /admin Today tab: where the next dollar and the next user come from.
// The /admin Growth tab says how the site is doing; this page says what to do about it:
// which exams earn and which could, which paywalls sell, which channels send
// people, whether they come back, and which numbers can't be trusted yet.
// Everything is read live from Firestore plus three read-only Stripe listings
// (completed checkouts for the paywall each older payment came from, refunds,
// and the webhook's subscribed events). Nothing here writes.

export const VISIT_SOURCES = ['chatgpt', 'perplexity', 'gemini', 'copilot', 'claude', 'ai_other', 'search', 'direct', 'other'] as const;
const AI_SOURCES = new Set(['chatgpt', 'perplexity', 'gemini', 'copilot', 'claude', 'ai_other']);
const SOURCE_LABELS: Record<string, string> = {
  chatgpt: 'ChatGPT', perplexity: 'Perplexity', gemini: 'Gemini', copilot: 'Copilot', claude: 'Claude',
  ai_other: 'Other AI', search: 'Search engines', direct: 'Direct / unknown', other: 'Other sites',
};
const PREMIUM_PRICE_CENTS = 999;

// Current and previous 7 and 30 days. A previous window that starts before
// the series was first recorded is null, not a misleading zero; `since` is
// that first day when it falls inside the last 60 days.
type Win = { cur7: number; prev7: number | null; cur30: number; prev30: number | null; since: string | null };

export interface OpportunitiesPayload {
  generatedAt: string;
  scoreboard: {
    revenue: Win;
    purchases: Win;
    visits: Win;
    signups: Win;
    answers: Win;
    revenuePer1kVisits30d: number | null;
    revenuePer1kAnswers30d: number | null;
    signupToBuyer30d: number | null;
    refunds: { count: number; cents: number } | null;
  };
  exams: {
    id: string;
    label: string;
    group: string;
    monetized: boolean;
    answers7d: number;
    answers30d: number;
    answersPrev30d: number;
    enrolled: number;
    paywallHits30d: number;
    purchases30d: number;
    purchasesAll: number;
    revenueAllCents: number;
    revenue30dCents: number;
    potential30dCents: number | null;
  }[];
  paywalls: {
    feature: string;
    label: string;
    exam: string;
    hits30d: number;
    hitsAll: number;
    signedInHitters: number;
    purchases30d: number;
    purchasesAll: number;
    revenueAllCents: number;
  }[];
  sourcesSince: string | null;
  sources: {
    id: string;
    label: string;
    ai: boolean;
    visits7d: number;
    visitsPrev7d: number | null;
    visits30d: number;
    signups: number;
    buyers: number;
  }[];
  sourceSignupsTracked: number;
  landings: { path: string; signups: number; buyers: number }[];
  cohorts: {
    start: string;
    end: string;
    size: number;
    cameBack: number | null;
    week1: number | null;
    week2: number | null;
    week4: number | null;
    bought: number;
  }[];
  health: { id: string; status: 'ok' | 'warn' | 'bad'; title: string; detail: string }[];
  insights: { kind: 'money' | 'growth' | 'retention' | 'fix'; title: string; detail: string }[];
}

// ─── Dates (UTC day keys, like every daily map in analytics/*) ──────────────
const dayMs = 86_400_000;
const keyOf = (t: number) => new Date(t).toISOString().slice(0, 10);
const dayKey = (iso: unknown): string | null => {
  if (typeof iso !== 'string') return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : keyOf(t);
};
const addDays = (key: string, n: number) => keyOf(Date.parse(key + 'T00:00:00Z') + n * dayMs);

function windows(now: number) {
  const today = keyOf(now);
  const ago = (n: number) => addDays(today, -n);
  return {
    today,
    ago,
    sum(map: Record<string, number> | undefined, from: number, to: number) {
      if (!map) return 0;
      const a = ago(from), b = ago(to);
      let n = 0;
      for (const [d, c] of Object.entries(map)) if (d >= a && d <= b && typeof c === 'number') n += c;
      return n;
    },
    win(map: Record<string, number> | undefined, firstDay?: string | null): Win {
      const first = firstDay ?? (map ? Object.keys(map).sort()[0] ?? null : null);
      const covers = (fromDaysAgo: number) => !first || first <= ago(fromDaysAgo);
      return {
        cur7: this.sum(map, 6, 0),
        prev7: covers(13) ? this.sum(map, 13, 7) : null,
        cur30: this.sum(map, 29, 0),
        prev30: covers(59) ? this.sum(map, 59, 30) : null,
        since: first && first > ago(59) ? first : null,
      };
    },
  };
}

// ─── Stripe (read-only, best effort) ────────────────────────────────────────
interface StripeFacts {
  locationByPaymentIntent: Map<string, string | null>;
  refundedByPaymentIntent: Map<string, number>;
  webhookEvents: string[] | null;
  error: string | null;
}

async function readStripe(stripe: Stripe | null): Promise<StripeFacts> {
  const facts: StripeFacts = {
    locationByPaymentIntent: new Map(),
    refundedByPaymentIntent: new Map(),
    webhookEvents: null,
    error: null,
  };
  if (!stripe) return { ...facts, error: 'Stripe is not configured' };
  try {
    for await (const s of stripe.checkout.sessions.list({ limit: 100, status: 'complete' })) {
      const pi = typeof s.payment_intent === 'string' ? s.payment_intent : s.payment_intent?.id;
      if (pi) facts.locationByPaymentIntent.set(pi, s.metadata?.location || null);
    }
    for await (const r of stripe.refunds.list({ limit: 100 })) {
      const pi = typeof r.payment_intent === 'string' ? r.payment_intent : r.payment_intent?.id;
      if (pi && r.status !== 'failed' && r.status !== 'canceled') {
        facts.refundedByPaymentIntent.set(pi, (facts.refundedByPaymentIntent.get(pi) || 0) + r.amount);
      }
    }
    const hooks = await stripe.webhookEndpoints.list({ limit: 20 });
    const site = (process.env.NEXT_PUBLIC_SITE_URL || 'tigertest.io').replace(/^https?:\/\//, '').replace(/\/$/, '');
    const ours = hooks.data.filter((h) => h.url.includes('/api/stripe/webhook') && h.url.includes(site.replace(/^www\./, '')));
    facts.webhookEvents = (ours.length > 0 ? ours : hooks.data.filter((h) => h.url.includes('/api/stripe/webhook')))
      .filter((h) => h.status === 'enabled')
      .flatMap((h) => h.enabled_events);
  } catch (err) {
    facts.error = err instanceof Error ? err.message : 'Stripe read failed';
  }
  return facts;
}

// ─── Main ───────────────────────────────────────────────────────────────────
export async function buildOpportunities(
  db: Firestore,
  stripe: Stripe | null,
  internalUids: Set<string>,
  now = Date.now(),
): Promise<OpportunitiesPayload> {
  const w = windows(now);
  const [usersSnap, paymentsSnap, questionsDoc, funnelDoc, paywallsDoc, sharesDoc, originsSnap, studyTimesDoc, stripeFacts] = await Promise.all([
    db.collection('users').select('createdAt', 'activeDates', 'lastUpdated', 'subscription', 'paywallHits').get(),
    db.collection('payments').get(),
    db.doc('analytics/questions').get(),
    db.doc('analytics/funnel').get(),
    db.doc('analytics/paywalls').get(),
    db.doc('analytics/shares').get(),
    db.collection('signupOrigins').get(),
    db.doc('globalStats/studyTimes').get(),
    readStripe(stripe),
  ]);

  // ── Users ──────────────────────────────────────────────────────────────
  type U = { id: string; signup: string | null; active: Set<string>; premium: boolean; purchasedAt: string | null; hitFeatures: Set<string> };
  const users: U[] = [];
  const signupsByDay: Record<string, number> = {};
  for (const doc of usersSnap.docs) {
    if (internalUids.has(doc.id)) continue;
    const d = doc.data();
    const active = new Set<string>(
      (Array.isArray(d.activeDates) ? d.activeDates : []).filter((x: unknown) => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x)),
    );
    const signup = dayKey(d.createdAt) ?? ([...active].sort()[0] || null) ?? dayKey(d.lastUpdated);
    if (signup) signupsByDay[signup] = (signupsByDay[signup] || 0) + 1;
    const hitFeatures = new Set<string>(Object.keys((d.paywallHits as Record<string, unknown>) || {}).map(paywallHitFeature));
    users.push({
      id: doc.id,
      signup,
      active,
      premium: d.subscription?.isPremium === true,
      purchasedAt: typeof d.subscription?.purchasedAt === 'string' ? d.subscription.purchasedAt : null,
      hitFeatures,
    });
  }
  const userById = new Map(users.map((u) => [u.id, u]));

  // ── Payments, with the paywall each came from ──────────────────────────
  type P = { day: string | null; net: number; refunded: number; location: string | null; exam: string; userId: string | null };
  const payments: P[] = [];
  let paymentsMissingLocation = 0;
  let paymentsLocatedFromStripe = 0;
  const paidUserIds = new Set<string>();
  for (const doc of paymentsSnap.docs) {
    const p = doc.data();
    const userId = typeof p.userId === 'string' ? p.userId : null;
    if ((userId && internalUids.has(userId)) || isInternalEmail(p.email as string | undefined)) continue;
    if (userId) paidUserIds.add(userId);
    const amount = typeof p.amount === 'number' ? p.amount : 0;
    const refunded = Math.max(
      typeof p.refundedCents === 'number' ? p.refundedCents : 0,
      stripeFacts.refundedByPaymentIntent.get(doc.id) || 0,
    );
    let location: string | null = typeof p.location === 'string' ? p.location : null;
    if (!('location' in p)) {
      paymentsMissingLocation++;
      if (stripeFacts.locationByPaymentIntent.has(doc.id)) {
        location = stripeFacts.locationByPaymentIntent.get(doc.id) ?? null;
        paymentsLocatedFromStripe++;
      }
    }
    payments.push({
      day: dayKey(p.createdAt),
      net: Math.max(0, amount - refunded),
      refunded,
      location,
      exam: typeof p.exam === 'string' ? p.exam : purchaseExam(location),
      userId,
    });
  }
  // Premium accounts with no payment record (granted before payments
  // existed, or by hand) count at list price on their purchase day, like the /admin Growth tab.
  let premiumWithoutPayment = 0;
  for (const u of users) {
    if (!u.premium || paidUserIds.has(u.id)) continue;
    premiumWithoutPayment++;
    payments.push({ day: dayKey(u.purchasedAt), net: PREMIUM_PRICE_CENTS, refunded: 0, location: null, exam: 'dmv', userId: u.id });
  }
  const revenueByDay: Record<string, number> = {};
  const purchasesByDay: Record<string, number> = {};
  for (const p of payments) {
    if (!p.day) continue;
    revenueByDay[p.day] = (revenueByDay[p.day] || 0) + p.net;
    purchasesByDay[p.day] = (purchasesByDay[p.day] || 0) + 1;
  }
  const inLast = (day: string | null, n: number) => !!day && day >= w.ago(n - 1) && day <= w.today;

  // ── Aggregates ─────────────────────────────────────────────────────────
  const questions = (questionsDoc.data() || {}) as Record<string, any>;
  const steps = ((funnelDoc.data() || {}).steps || {}) as Record<string, { daily?: Record<string, number> }>;
  const paywallsData = (paywallsDoc.data() || {}) as Record<string, any>;
  const byPaywall = (paywallsData.byPaywall || {}) as Record<string, { total?: number; daily?: Record<string, number> }>;

  const revenue = w.win(revenueByDay);
  const visits = w.win(steps.visit?.daily);
  const answers = w.win(questions.daily);
  const purchases = w.win(purchasesByDay);
  const signups = w.win(signupsByDay);
  // Per-source visit counts started a few days after the visit step itself.
  const sourceSince = Object.keys(steps)
    .filter((k) => k.startsWith('visit_'))
    .map((k) => Object.keys(steps[k]?.daily || {}).sort()[0])
    .filter(Boolean)
    .sort()[0] ?? null;
  const refundTotals = stripeFacts.error
    ? null
    : [...stripeFacts.refundedByPaymentIntent.values()].reduce(
        (acc, cents) => ({ count: acc.count + 1, cents: acc.cents + cents }),
        { count: 0, cents: 0 },
      );

  // ── Exams ──────────────────────────────────────────────────────────────
  const groupOf = new Map<string, string>();
  for (const g of TEST_GROUPS) for (const t of g.tests) groupOf.set(t.id, g.title);
  const byExam = (questions.byExam || {}) as Record<string, { daily?: Record<string, number> }>;
  const examIds = Array.from(new Set([...TEST_CATALOG.map((t) => t.id), ...Object.keys(byExam)]));
  const enrolledEntries = await Promise.all(
    examIds.map(async (id) => {
      try {
        return [id, (await db.collection('enrollments').where('exam', '==', id).count().get()).data().count] as const;
      } catch {
        return [id, 0] as const;
      }
    }),
  );
  const enrolled = new Map(enrolledEntries);
  const hitsByExam = new Map<string, number>();
  for (const [key, rec] of Object.entries(byPaywall)) {
    const exam = purchaseExam(key.split(':')[0]);
    hitsByExam.set(exam, (hitsByExam.get(exam) || 0) + w.sum(rec?.daily, 29, 0));
  }
  const dmvAnswers30 = w.sum(byExam.dmv?.daily, 29, 0);
  const dmvRevenue30 = payments.filter((p) => p.exam === 'dmv' && inLast(p.day, 30)).reduce((n, p) => n + p.net, 0);
  const dmvCentsPerAnswer = dmvAnswers30 > 0 ? dmvRevenue30 / dmvAnswers30 : 0;
  const isMonetized = (id: string) => id === 'dmv' || !!EXAMS_V2.find((e) => e.id === id)?.premium;

  const exams = examIds
    .map((id) => {
      const daily = byExam[id]?.daily;
      const mine = payments.filter((p) => p.exam === id);
      const monetized = isMonetized(id);
      const answers30d = w.sum(daily, 29, 0);
      return {
        id,
        label: TEST_CATALOG.find((t) => t.id === id)?.shortName ?? examAnalyticsLabel(id),
        group: groupOf.get(id) ?? 'Other exams',
        monetized,
        answers7d: w.sum(daily, 6, 0),
        answers30d,
        answersPrev30d: w.sum(daily, 59, 30),
        enrolled: enrolled.get(id) || 0,
        paywallHits30d: hitsByExam.get(id) || 0,
        purchases30d: mine.filter((p) => inLast(p.day, 30)).length,
        purchasesAll: mine.length,
        revenueAllCents: mine.reduce((n, p) => n + p.net, 0),
        revenue30dCents: mine.filter((p) => inLast(p.day, 30)).reduce((n, p) => n + p.net, 0),
        // What a free exam's last 30 days of practice would have earned at
        // the DMV's revenue per answer. A ceiling on demand, not a forecast.
        potential30dCents: monetized ? null : Math.round(answers30d * dmvCentsPerAnswer),
      };
    })
    .sort((a, b) => b.answers30d - a.answers30d || b.enrolled - a.enrolled);

  // ── Paywalls: hits and purchases on the same feature key ───────────────
  const features = new Map<string, { hits30d: number; hitsAll: number }>();
  for (const [key, rec] of Object.entries(byPaywall)) {
    const f = paywallHitFeature(key);
    const row = features.get(f) ?? { hits30d: 0, hitsAll: 0 };
    row.hits30d += w.sum(rec?.daily, 29, 0);
    row.hitsAll += typeof rec?.total === 'number' ? rec.total : 0;
    features.set(f, row);
  }
  for (const p of payments) if (p.location && !features.has(p.location)) features.set(p.location, { hits30d: 0, hitsAll: 0 });
  const paywalls = [...features.entries()]
    .map(([feature, h]) => {
      const sold = payments.filter((p) => p.location === feature);
      return {
        feature,
        label: purchaseLocationLabel(feature),
        exam: purchaseExam(feature),
        hits30d: h.hits30d,
        hitsAll: h.hitsAll,
        signedInHitters: users.filter((u) => u.hitFeatures.has(feature)).length,
        purchases30d: sold.filter((p) => inLast(p.day, 30)).length,
        purchasesAll: sold.length,
        revenueAllCents: sold.reduce((n, p) => n + p.net, 0),
      };
    })
    .sort((a, b) => b.revenueAllCents - a.revenueAllCents || b.hits30d - a.hits30d);
  const unattributed = payments.filter((p) => !p.location);
  if (unattributed.length > 0) {
    paywalls.push({
      feature: '(unknown)',
      label: 'No paywall recorded',
      exam: 'dmv',
      hits30d: 0,
      hitsAll: 0,
      signedInHitters: 0,
      purchases30d: unattributed.filter((p) => inLast(p.day, 30)).length,
      purchasesAll: unattributed.length,
      revenueAllCents: unattributed.reduce((n, p) => n + p.net, 0),
    });
  }

  // ── Sources: visits from the funnel, signups and buyers from origins ───
  const sourceSignups = new Map<string, { signups: number; buyers: number }>();
  const landingSignups = new Map<string, { signups: number; buyers: number }>();
  let sourceSignupsTracked = 0;
  for (const doc of originsSnap.docs) {
    if (internalUids.has(doc.id)) continue;
    const source = doc.get('source');
    const landing = doc.get('landing');
    const bought = userById.get(doc.id)?.premium === true;
    if (typeof source === 'string') {
      sourceSignupsTracked++;
      const row = sourceSignups.get(source) ?? { signups: 0, buyers: 0 };
      row.signups++;
      if (bought) row.buyers++;
      sourceSignups.set(source, row);
    }
    if (typeof landing === 'string') {
      const row = landingSignups.get(landing) ?? { signups: 0, buyers: 0 };
      row.signups++;
      if (bought) row.buyers++;
      landingSignups.set(landing, row);
    }
  }
  const sources = VISIT_SOURCES.map((id) => ({
    id,
    label: SOURCE_LABELS[id],
    ai: AI_SOURCES.has(id),
    visits7d: w.sum(steps[`visit_${id}`]?.daily, 6, 0),
    visitsPrev7d: sourceSince && sourceSince > w.ago(13) ? null : w.sum(steps[`visit_${id}`]?.daily, 13, 7),
    visits30d: w.sum(steps[`visit_${id}`]?.daily, 29, 0),
    signups: sourceSignups.get(id)?.signups || 0,
    buyers: sourceSignups.get(id)?.buyers || 0,
  })).sort((a, b) => b.visits30d - a.visits30d);
  const landings = [...landingSignups.entries()]
    .map(([path, r]) => ({ path, ...r }))
    .sort((a, b) => b.signups - a.signups)
    .slice(0, 15);

  // ── Retention: weekly signup cohorts ───────────────────────────────────
  // A cohort is seven signup days. "Came back" is any active day after the
  // signup day within 30 days; week N is any active day 7N to 7N+6 days after.
  // A window that hasn't fully passed for the cohort's last day is null.
  const cohorts = Array.from({ length: 10 }, (_, i) => {
    const end = w.ago(i * 7);
    const start = w.ago(i * 7 + 6);
    const members = users.filter((u) => u.signup && u.signup >= start && u.signup <= end);
    const rate = (fromDay: number, toDay: number) => {
      if (addDays(end, toDay) > w.today) return null;
      if (members.length === 0) return 0;
      const back = members.filter((u) => {
        const a = addDays(u.signup!, fromDay), b = addDays(u.signup!, toDay);
        for (const d of u.active) if (d >= a && d <= b) return true;
        return false;
      }).length;
      return back / members.length;
    };
    return {
      start,
      end,
      size: members.length,
      cameBack: rate(1, 29),
      week1: rate(7, 13),
      week2: rate(14, 20),
      week4: rate(28, 34),
      bought: members.filter((u) => u.premium).length,
    };
  }).reverse();

  // ── Data health ────────────────────────────────────────────────────────
  const health: OpportunitiesPayload['health'] = [];
  const webhookHasRefunds = stripeFacts.webhookEvents?.some((e) => e === 'charge.refunded' || e === '*') ?? null;
  health.push({
    id: 'payment-location',
    status: paymentsMissingLocation === 0 ? 'ok' : paymentsLocatedFromStripe === paymentsMissingLocation ? 'warn' : 'bad',
    title: 'Revenue by exam and paywall',
    detail:
      paymentsMissingLocation === 0
        ? 'Every payment records the paywall and exam it came from.'
        : `${paymentsMissingLocation} payments predate the webhook saving their paywall. ${paymentsLocatedFromStripe} were matched back to Stripe checkout metadata for this page; new purchases save it directly.`,
  });
  health.push({
    id: 'refunds',
    status: stripeFacts.error ? 'bad' : webhookHasRefunds ? 'ok' : 'warn',
    title: 'Refunds',
    detail: stripeFacts.error
      ? `Could not read Stripe: ${stripeFacts.error}`
      : `${refundTotals?.count ?? 0} refunds in Stripe, subtracted from revenue here. ${
          webhookHasRefunds
            ? 'The webhook receives charge.refunded, so payments are marked as they happen.'
            : 'Add the charge.refunded event to the Stripe webhook so payments are marked refunded in Firestore (Stripe Dashboard, Developers, Webhooks).'
        }`,
  });
  health.push({
    id: 'premium-without-payment',
    status: premiumWithoutPayment === 0 ? 'ok' : 'warn',
    title: 'Premium accounts with no payment',
    detail:
      premiumWithoutPayment === 0
        ? 'Every Premium account has a Stripe payment.'
        : `${premiumWithoutPayment} Premium accounts have no Stripe payment (granted by hand or before payments were recorded). Counted at $9.99 on their purchase day.`,
  });
  health.push({
    id: 'signup-source',
    status: sourceSignupsTracked > 0 ? 'ok' : 'warn',
    title: 'Signups by source and landing page',
    detail:
      sourceSignupsTracked > 0
        ? `${sourceSignupsTracked} accounts carry their first visit's source and landing page.`
        : 'New accounts start carrying their first visit source and landing page with this release. Until then, sources show visits only.',
  });
  const sharesData = sharesDoc.data() || {};
  const legacyShareDays = Object.keys(sharesData).filter((k) => k.startsWith('daily.')).length;
  const nestedShareDays = Object.keys((sharesData.daily as object) || {}).length;
  const shareTotal = Object.values(shareDailyCounts(sharesData)).reduce((a, b) => a + b, 0);
  health.push({
    id: 'shares',
    status: legacyShareDays > 0 && nestedShareDays === 0 ? 'warn' : 'ok',
    title: 'Share clicks',
    detail:
      legacyShareDays > 0 && nestedShareDays === 0
        ? `${shareTotal} share clicks, all saved under broken field names ("daily.<date>"), which is why the classic admin always said "none today". Fixed in the share route; both shapes are read.`
        : `${shareTotal} share clicks. Shares carry no exam or channel yet.`,
  });
  const studyTimes = studyTimesDoc.data();
  const sampled = typeof studyTimes?.sampledUsers === 'number' ? studyTimes.sampledUsers : null;
  const statsAt = typeof studyTimes?.updatedAt === 'string' ? Date.parse(studyTimes.updatedAt) : NaN;
  const statsStale = Number.isNaN(statsAt) || Date.now() - statsAt > 36 * 60 * 60 * 1000;
  const statsDate = Number.isNaN(statsAt)
    ? null
    : new Date(statsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });
  health.push({
    id: 'stats-cron',
    status: sampled === null ? 'warn' : statsStale || sampled < usersSnap.size * 0.95 ? 'bad' : 'ok',
    title: 'Nightly community stats',
    detail:
      sampled === null
        ? 'The 3am stats job has not reported how many accounts it read.'
        : statsStale
          ? `The 3am stats job last finished ${statsDate ?? 'at an unknown date'} (it read ${sampled.toLocaleString('en-US')} accounts), so most-missed questions, FastPass difficulty and study times are out of date. Check the aggregate-stats logs in Vercel.`
          : sampled >= usersSnap.size * 0.95
            ? `The 3am stats job read ${sampled.toLocaleString('en-US')} accounts last night.`
            : `The 3am stats job read ${sampled.toLocaleString('en-US')} of ${usersSnap.size.toLocaleString('en-US')} accounts, so most-missed questions, FastPass difficulty and study times leave out the rest.`,
  });
  const rateLimited30 = w.sum(questions.rateLimited?.daily, 29, 0);
  health.push({
    id: 'rate-limit',
    status: rateLimited30 === 0 ? 'ok' : 'warn',
    title: 'Answers dropped by the rate limit',
    detail: `${rateLimited30.toLocaleString('en-US')} answers in the last 30 days were over the per-IP cap and not counted.`,
  });
  health.push({
    id: 'not-tracked',
    status: 'warn',
    title: 'Still not tracked',
    detail:
      'Test starts and abandons, real exam outcomes (only an opt-in "I passed" on the unsubscribe page), MCP and mobile-app usage, and which exam a signup came for. GA4 purchase value is hard-coded at $9.99.',
  });

  // ── What to do next ────────────────────────────────────────────────────
  // Plain readings of the numbers above, strongest lever first. Each one
  // only appears when the data behind it exists.
  const insights: OpportunitiesPayload['insights'] = [];
  const dollars = (cents: number) => `$${Math.round(cents / 100).toLocaleString('en-US')}`;
  const pctOf = (n: number, d: number) => `${Math.round((n / d) * 100)}%`;
  if (revenue.prev30 !== null && revenue.prev30 > 0) {
    const change = revenue.cur30 / revenue.prev30 - 1;
    const answerChange = answers.prev30 ? answers.cur30 / answers.prev30 - 1 : null;
    insights.push({
      kind: 'money',
      title: `Revenue ${change >= 0 ? 'up' : 'down'} ${Math.abs(Math.round(change * 100))}% on the previous 30 days`,
      detail: `${dollars(revenue.cur30)} from ${purchases.cur30} purchases, against ${dollars(revenue.prev30)}.${
        answerChange !== null
          ? ` Practice went ${answerChange >= 0 ? 'up' : 'down'} ${Math.abs(Math.round(answerChange * 100))}% over the same time, so ${
              answerChange > change ? 'each answer is earning less: usage is growing where there is nothing to buy' : 'revenue is keeping pace with practice'
            }.`
          : ''
      }`,
    });
  }
  const rated = paywalls.filter((p) => p.hitsAll >= 30 && p.feature !== '(unknown)');
  const bestRate = [...rated].sort((a, b) => b.purchasesAll / b.hitsAll - a.purchasesAll / a.hitsAll)[0];
  const mostSeen = [...rated].sort((a, b) => b.hitsAll - a.hitsAll)[0];
  const totalSold = payments.length;
  if (mostSeen && totalSold > 0) {
    insights.push({
      kind: 'money',
      title: `${mostSeen.label} sell ${pctOf(mostSeen.purchasesAll, totalSold)} of Premium`,
      detail: `${mostSeen.purchasesAll} of ${totalSold} purchases from ${mostSeen.hitsAll.toLocaleString('en-US')} paywall views (${(
        (mostSeen.purchasesAll / Math.max(1, mostSeen.hitsAll)) * 100
      ).toFixed(1)} per 100).${
        bestRate && bestRate.feature !== mostSeen.feature
          ? ` ${bestRate.label} converts best: ${((bestRate.purchasesAll / bestRate.hitsAll) * 100).toFixed(1)} purchases per 100 views, so it deserves more traffic.`
          : ''
      } A lock on the next step of something people are already doing is what sells.`,
    });
  }
  const v2Monetized = exams.filter((e) => e.monetized && e.id !== 'dmv');
  const v2Sales = v2Monetized.reduce((n, e) => n + e.purchasesAll, 0);
  const v2Hits = v2Monetized.reduce((n, e) => n + e.paywallHits30d, 0);
  if (v2Monetized.length > 0 && v2Sales === 0 && v2Hits > 0) {
    insights.push({
      kind: 'money',
      title: `${v2Monetized.map((e) => e.label).join(' and ')} Premium has not sold yet`,
      detail: `${v2Hits} paywall views in 30 days, no purchases, ${v2Monetized.reduce((n, e) => n + e.enrolled, 0)} people practicing. They share the DMV's $9.99 unlock; an exam-named price of their own is the first thing to test once traffic allows.`,
    });
  }
  const free = exams.filter((e) => !e.monetized && e.answers30d > 0);
  const freeAnswers = free.reduce((n, e) => n + e.answers30d, 0);
  const allAnswers30 = answers.cur30;
  if (free.length > 0 && allAnswers30 > 0) {
    const potential = free.reduce((n, e) => n + (e.potential30dCents || 0), 0);
    const top = free.slice(0, 3);
    const deep = [...free].filter((e) => e.enrolled >= 5).sort((a, b) => b.answers30d / b.enrolled - a.answers30d / a.enrolled)[0];
    insights.push({
      kind: 'growth',
      title: `${pctOf(freeAnswers, allAnswers30)} of practice is on free exams, from ${free.reduce((n, e) => n + e.enrolled, 0)} people`,
      detail: `${top.map((e) => `${e.label} ${e.answers30d.toLocaleString('en-US')}`).join(', ')} answers lead. At the DMV's revenue per answer that is about ${dollars(potential)} a month, ${
        potential < revenue.cur30 / 4 ? 'too little to justify paywalls yet: these exams need visitors first' : 'worth a paywall on the busiest ones'
      }.${deep ? ` ${deep.label} users answer ${Math.round(deep.answers30d / deep.enrolled)} questions each, so professional exams can carry a higher price than $9.99 when they do.` : ''}`,
    });
  }
  const aiVisits = sources.filter((s) => s.ai);
  const ai7 = aiVisits.reduce((n, s) => n + s.visits7d, 0);
  const visits7 = sources.reduce((n, s) => n + s.visits7d, 0);
  if (visits7 > 0) {
    const top = sources[0];
    insights.push({
      kind: 'growth',
      title: `AI answer engines sent ${pctOf(ai7, visits7)} of new visitors this week`,
      detail: `${ai7} of ${visits7.toLocaleString('en-US')} first visits. ${top ? `${top.label} is the biggest source (${pctOf(top.visits7d, visits7)}).` : ''} ${
        sourceSignupsTracked > 0 ? '' : 'Signups and purchases by source fill in from this release on.'
      }`.trim(),
    });
  }
  const buyers = users.filter((u) => u.premium && u.signup && u.purchasedAt);
  const buyersLater = buyers.filter((u) => (dayKey(u.purchasedAt) ?? '') > u.signup!).length;
  const ripe = cohorts.filter((c) => c.cameBack !== null && c.size >= 20);
  if (ripe.length > 0) {
    const back = ripe.reduce((n, c) => n + (c.cameBack || 0), 0) / ripe.length;
    const wk1 = ripe.reduce((n, c) => n + (c.week1 || 0), 0) / ripe.length;
    insights.push({
      kind: 'retention',
      title: `${Math.round(back * 100)}% of new accounts ever come back after their first day`,
      detail: `${Math.round(wk1 * 100)}% are active in their second week.${
        buyers.length > 0
          ? ` ${pctOf(buyersLater, buyers.length)} of buyers paid on a later day than they signed up, so every return visit is another chance to sell.`
          : ''
      }`,
    });
  }

  return {
    generatedAt: new Date(now).toISOString(),
    scoreboard: {
      revenue,
      purchases,
      visits,
      signups,
      answers,
      revenuePer1kVisits30d: visits.cur30 > 0 ? (revenue.cur30 / visits.cur30) * 1000 : null,
      revenuePer1kAnswers30d: answers.cur30 > 0 ? (revenue.cur30 / answers.cur30) * 1000 : null,
      signupToBuyer30d: signups.cur30 > 0 ? purchases.cur30 / signups.cur30 : null,
      refunds: refundTotals,
    },
    exams,
    paywalls,
    sourcesSince: sourceSince,
    sources,
    sourceSignupsTracked,
    landings,
    cohorts,
    health,
    insights,
  };
}
