// DRY RUN. Mirrors the filters in every app/api/cron/*/route.ts against live
// Firestore data and reports exactly who would be emailed on the first run
// after deploy, and how long each backlog takes to drain. Sends nothing.
import { readFileSync } from 'fs';
import admin from 'firebase-admin';

const env = {};
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const eq = line.indexOf('=');
  if (eq === -1) continue;
  const k = line.slice(0, eq).trim();
  if (!k || k.startsWith('#')) continue;
  env[k] = line.slice(eq + 1).trim();
}
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_KEY)) });
const db = admin.firestore();
const auth = admin.auth();

const INCLUDE_LEGACY = env.INCLUDE_LEGACY_CONSENT?.replace(/"/g, '') === 'true';
const MAX_BATCH = 50;
const DAY = 86400000;
const now = Date.now();

const authMap = new Map();
let pageToken;
do {
  const r = await auth.listUsers(1000, pageToken);
  for (const u of r.users) if (u.email) authMap.set(u.uid, { email: u.email, creationTime: new Date(u.metadata.creationTime) });
  pageToken = r.pageToken;
} while (pageToken);

const toDate = (v) => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};
const latestPaywallHit = (hits) => {
  if (!hits || typeof hits !== 'object') return null;
  let best = null;
  for (const [key, h] of Object.entries(hits)) {
    if (!h?.lastAt) continue;
    const at = new Date(h.lastAt);
    if (isNaN(at.getTime())) continue;
    if (!best || at > best.at) best = { key, itemId: h.itemId || '', at };
  }
  return best;
};

const snap = INCLUDE_LEGACY
  ? await db.collection('users').get()
  : await db.collection('users').where('emailConsent', '==', true).get();

const users = [];
snap.forEach((doc) => {
  const a = authMap.get(doc.id);
  if (!a) return;
  const d = doc.data();
  if (d.unsubscribed === true) return;
  if (!INCLUDE_LEGACY && d.emailConsent !== true) return;
  const el = a.email.toLowerCase();
  if (el.includes('@johnbrophy.net') || el.includes('@stensul.com')) return;
  const s = d._stats || {};
  const completed = Array.isArray(d.completedTests) ? d.completedTests : [];
  const lastTest = completed.reduce((latest, t) => {
    const dt = toDate(t?.completedAt);
    if (!dt) return latest;
    return !latest || dt > latest ? dt : latest;
  }, null);
  const lastActiveAt = new Date(Math.max(
    toDate(d.lastUpdated)?.getTime() ?? 0,
    lastTest?.getTime() ?? 0,
    a.creationTime.getTime()
  ));
  users.push({
    lastActiveAt,
    creationTime: a.creationTime,
    completedTests: completed,
    lastTest,
    emailsSent: Array.isArray(d.emailsSent) ? d.emailsSent : [],
    subscription: d.subscription || {},
    lastEmailSent: toDate(d.lastEmailSent),
    lastUpdated: toDate(d.lastUpdated),
    questionsAnswered: (s.trainingQuestionsAnswered || 0) + (s.testQuestionsAnswered || 0),
    lastPaywallHit: latestPaywallHit(d.paywallHits),
    superAmazingUnlockedAt: toDate(d.superAmazingUnlockedAt),
  });
});

const capped = (u, gap = DAY) => !!u.lastEmailSent && now - u.lastEmailSent.getTime() < gap;
// getEligibleUsers() applies this to every campaign except the two win-backs.
const active3d = (u) => now - u.lastActiveAt.getTime() <= 3 * DAY;

const CAMPAIGNS = [
  ['paywallAbandon', 4 * 3600000, (u) => {
    if (!active3d(u)) return false;
    if (u.subscription?.isPremium) return false;
    if (u.questionsAnswered < 10) return false;
    const h = u.lastPaywallHit;
    if (!h) return false;
    const age = now - h.at.getTime();
    return age >= 3600000 && age <= DAY;
  }],
  ['firstTestReminder', DAY, (u) => {
    if (!active3d(u)) return false;
    if (u.completedTests.length > 0) return false;
    if (u.questionsAnswered < 25) return false;
    if (!u.lastUpdated) return false;
    const idle = now - u.lastUpdated.getTime();
    return idle >= 6 * 3600000 && idle <= 3 * DAY;
  }],
  ['upgradePitch', DAY, (u) => {
    if (!active3d(u)) return false;
    if (u.creationTime.getTime() > now - DAY) return false;
    if (u.subscription?.isPremium) return false;
    return u.questionsAnswered >= 50 || u.completedTests.length >= 1;
  }],
  ['secondTestNudge', DAY, (u) => {
    if (!active3d(u)) return false;
    if (u.completedTests.length !== 1) return false;
    const c = toDate(u.completedTests[0]?.completedAt);
    return !!c && c.getTime() > now - 2 * DAY;
  }],
  ['reengagement', DAY, (u) => {
    if (u.creationTime.getTime() > now - 7 * DAY) return false;
    if (u.completedTests.length === 0) return false;
    if (!u.lastTest) return false;
    if (u.lastActiveAt.getTime() < now - 30 * DAY) return false;   // 30d ceiling
    return u.lastTest.getTime() <= now - 5 * DAY;
  }],
  ['inactiveShareRequest', DAY, (u) => {
    if (u.completedTests.length === 0) return false;
    const lastActivity = Math.max(u.lastTest?.getTime() || 0, u.lastUpdated?.getTime() || 0);
    if (lastActivity < now - 45 * DAY) return false;                // 45d ceiling
    return lastActivity <= now - 20 * DAY;
  }],
  ['superAmazingUnlocked', 4 * 3600000, (u) => {
    if (!active3d(u)) return false;
    if (!u.superAmazingUnlockedAt) return false;
    return now - u.superAmazingUnlockedAt.getTime() <= 7 * DAY;
  }],
];

console.log(`INCLUDE_LEGACY_CONSENT=${INCLUDE_LEGACY}`);
console.log(`Reachable pool after the query fix (3-day rule applied per campaign): ${users.length}\n`);
console.log('FIRST RUN AFTER DEPLOY');
console.log('  campaign               eligible   day 1   backlog   drains in');

let totalBacklog = 0;
for (const [key, gap, pred] of CAMPAIGNS) {
  const matches = users.filter((u) => pred(u) && !u.emailsSent.includes(key) && !capped(u, gap));
  const day1 = Math.min(matches.length, MAX_BATCH);
  const backlog = Math.max(0, matches.length - MAX_BATCH);
  totalBacklog += backlog;
  const days = backlog ? `${Math.ceil(matches.length / MAX_BATCH)} days` : 'same day';
  console.log(
    `  ${key.padEnd(22)}${String(matches.length).padStart(8)}${String(day1).padStart(8)}` +
      `${String(backlog).padStart(10)}   ${days}`
  );
}
console.log(`\nTotal queued behind the 50/run cap: ${totalBacklog}`);

// How stale is the backlog? Staleness is the real spam question.
console.log('\nHOW OLD IS THE AUDIENCE (days since last activity)');
for (const [key, gap, pred] of CAMPAIGNS) {
  const matches = users.filter((u) => pred(u) && !u.emailsSent.includes(key) && !capped(u, gap));
  if (!matches.length) continue;
  const ages = matches
    .map((u) => {
      const seen = Math.max(u.lastTest?.getTime() || 0, u.lastUpdated?.getTime() || 0);
      return seen ? (now - seen) / DAY : null;
    })
    .filter((v) => v !== null)
    .sort((a, b) => a - b);
  if (!ages.length) continue;
  const q = (p) => ages[Math.min(ages.length - 1, Math.floor((p / 100) * ages.length))].toFixed(0);
  const over60 = ages.filter((a) => a > 60).length;
  console.log(
    `  ${key.padEnd(22)} p50 ${q(50).padStart(4)}d   p90 ${q(90).padStart(4)}d   ` +
      `older than 60d: ${over60}/${ages.length}`
  );
}
process.exit(0);
