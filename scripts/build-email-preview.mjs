// Builds a single self-contained HTML page previewing every lifecycle email
// alongside the trigger that fires it. Regenerate after any copy change:
//   node scripts/render-emails.mjs <dir> && node scripts/build-email-preview.mjs <dir> <out.html>
import { readFileSync, writeFileSync } from 'fs';

const DIR = process.argv[2];
const OUT = process.argv[3];
const TIGER = process.argv[4]; // path to a small png to inline

const tigerData = `data:image/png;base64,${readFileSync(TIGER).toString('base64')}`;

const EMAILS = [
  {
    key: 'welcome', stage: 1, name: 'Welcome', status: 'unchanged',
    subject: 'Welcome to TigerTest',
    trigger: 'Account created', timing: 'Immediate', volume: '671 / mo',
    words: [132, 132],
    note: 'Untouched. The only email that was already live and working, so it keeps its original wording and renders byte-for-byte identical to what production sends today.',
  },
  {
    key: 'paywallAbandon', stage: 2, name: 'Paywall abandon', status: 'new',
    subject: 'Safety & Emergencies is still waiting',
    trigger: 'Hit a paywall 1–24h ago · not premium · 10+ questions answered',
    timing: 'Hourly', volume: '209 / mo', words: [101, 80],
    note: 'The highest-intent moment in the product and previously the only one with no email at all. Buyers purchase within minutes of a paywall view; the ones who leave return 9% of the time.',
  },
  {
    key: 'firstTestReminder', stage: 3, name: 'Stalled study', status: 'changed',
    subject: 'Quick check-in from TigerTest',
    trigger: '25+ questions answered · 0 tests · idle 6h–3d',
    timing: 'Hourly', volume: '173 / mo', words: [130, 62],
    note: 'Was "24h after signup with 0 tests", which fired a day after most people had already left and ignored whether they had ever answered a question.',
  },
  {
    key: 'upgradePitch', stage: 4, name: 'Upgrade pitch', status: 'changed',
    subject: "You're doing the work 💪",
    trigger: '24h+ old · 50+ questions or 1+ test · active within 14 days',
    timing: 'Daily 11:00 UTC', volume: '~330 / mo', words: [158, 82],
    note: 'Was "3+ days old and 2+ completed tests". That excluded 569 users who answered 25+ questions and never finished a test, and questions answered is what separates buyers (median 400) from everyone else (median 12).',
  },
  {
    key: 'secondTestNudge', stage: 5, name: 'Second test nudge', status: 'live',
    subject: 'Nice work on test #1!',
    trigger: 'Exactly 1 test completed in the last 48h',
    timing: 'Daily 14:00 UTC', volume: '88 / mo', words: [138, 71],
    note: 'Trigger unchanged. Already behavioural and same-day, so only the copy was cut.',
  },
  {
    key: 'reengagement', stage: 6, name: 'Lapsed reengagement', status: 'live',
    subject: 'Test coming up soon?',
    trigger: '5+ days idle · 1+ test completed',
    timing: 'Daily 09:00 UTC', volume: 'low', words: [89, 53],
    note: 'Deliberately left alone beyond the trim. With a 9% return rate, better copy here cannot pay off structurally.',
  },
  {
    key: 'inactiveShareRequest', stage: 7, name: 'Share request', status: 'live',
    subject: 'Did you pass?',
    trigger: '20+ days idle · 1+ test completed',
    timing: 'Daily 15:00 UTC', volume: 'low', words: [110, 67],
    note: 'Not a revenue email. It depended on lastUpdated, which always read as null until the date-parsing fix.',
  },
  {
    key: 'purchaseWelcome', stage: 8, name: 'Post-purchase', status: 'new',
    subject: "You're in - here's what just unlocked",
    trigger: 'Stripe checkout completed',
    timing: 'Immediate', volume: '16 / mo', words: [130, 95],
    note: 'Transactional, so no unsubscribe link. Sent from the webhook, wrapped so a mail failure can never fail the purchase.',
  },
  {
    key: 'superAmazingUnlocked', stage: 9, name: 'Super Amazing Mode', status: 'new',
    subject: 'You unlocked Super Amazing Mode 🎉',
    trigger: 'Reached 8/8 for the first time',
    timing: 'Hourly', volume: '~12 / mo', words: [null, 106],
    note: 'The only email with nothing to sell. 91 people have ever reached 8/8, 12 of them active in the last 30 days, so it stays rare and therefore worth getting. The unlock latches in the store, so retaking a test cannot re-fire it.',
  },
];

/** Pull the inner markup out of a rendered email and inline the logo. */
function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
  return m[1].replace(/https:\/\/tigertest\.io\/tiger\.png/g, tigerData).trim();
}

const STATUS_LABEL = { new: 'New', changed: 'Re-gated', live: 'Copy only', unchanged: 'Unchanged' };

const cards = EMAILS.map((e) => {
  const body = extractBody(readFileSync(`${DIR}/${e.key}.html`, 'utf8'));
  const [before, after] = e.words;
  const cut = Math.round(((before - after) / before) * 100);
  // Brand-new emails have no "before"; untrimmed ones show a single number
  // rather than a struck-through no-op.
  const length =
    before === null || before === after
      ? `${after} words`
      : `<s>${before}</s> ${after} words <span class="cut">−${cut}%</span>`;
  return `<section class="entry" id="${e.key}">
  <header class="spec">
    <div class="spec-head">
      <span class="stage">${e.stage}</span>
      <h2>${e.name}</h2>
      <span class="tag tag-${e.status}">${STATUS_LABEL[e.status]}</span>
    </div>
    <p class="subject">${e.subject}</p>
    <dl class="meta">
      <div><dt>Fires when</dt><dd>${e.trigger}</dd></div>
      <div><dt>Cadence</dt><dd>${e.timing}</dd></div>
      <div><dt>Reach</dt><dd>${e.volume}</dd></div>
      <div><dt>Length</dt><dd>${length}</dd></div>
    </dl>
    <p class="note">${e.note}</p>
  </header>
  <div class="render">
${body}
  </div>
</section>`;
}).join('\n');

const nav = EMAILS.map(
  (e) => `<a href="#${e.key}"><span class="n">${e.stage}</span>${e.name}</a>`
).join('\n      ');

// The trim comparison covers only emails that existed before this pass. Brand
// new ones have no "before" and would understate the cut if folded in.
const trimmed = EMAILS.filter((e) => e.words[0] !== null);
const totalBefore = trimmed.reduce((s, e) => s + e.words[0], 0);
const totalAfter = trimmed.reduce((s, e) => s + e.words[1], 0);
const countNew = EMAILS.filter((e) => e.status === 'new').length;
const countChanged = EMAILS.filter((e) => e.status === 'changed').length;

const page = `<title>TigerTest lifecycle emails</title>
<style>
  :root {
    --ground: #EFEBE4;
    --surface: #FFFFFF;
    --edge: #DAD3C8;
    --ink: #1A1815;
    --muted: #6E675C;
    --accent: #C2410C;
    --new: #166534;
    --new-bg: #DCF0E1;
    --changed: #92400E;
    --changed-bg: #F7E7CE;
    --live: #55504A;
    --live-bg: #E3DED5;
    --stage-bg: #1A1815;
    --stage-ink: #EFEBE4;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --ground: #171512;
      --surface: #201D19;
      --edge: #35302A;
      --ink: #F2EEE8;
      --muted: #9A9186;
      --accent: #FF8A4C;
      --new: #86E5A6;
      --new-bg: #17301F;
      --changed: #F0C077;
      --changed-bg: #35270F;
      --live: #A9A197;
      --live-bg: #2A2621;
      --stage-bg: #F2EEE8;
      --stage-ink: #171512;
    }
  }
  :root[data-theme="dark"] {
    --ground: #171512; --surface: #201D19; --edge: #35302A; --ink: #F2EEE8;
    --muted: #9A9186; --accent: #FF8A4C; --new: #86E5A6; --new-bg: #17301F;
    --changed: #F0C077; --changed-bg: #35270F; --live: #A9A197; --live-bg: #2A2621;
    --stage-bg: #F2EEE8; --stage-ink: #171512;
  }
  :root[data-theme="light"] {
    --ground: #EFEBE4; --surface: #FFFFFF; --edge: #DAD3C8; --ink: #1A1815;
    --muted: #6E675C; --accent: #C2410C; --new: #166534; --new-bg: #DCF0E1;
    --changed: #92400E; --changed-bg: #F7E7CE; --live: #55504A; --live-bg: #E3DED5;
    --stage-bg: #1A1815; --stage-ink: #EFEBE4;
  }

  body {
    margin: 0;
    background: var(--ground);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 48px 24px 96px;
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr);
    gap: 48px;
    align-items: start;
  }
  .masthead { grid-column: 1 / -1; border-bottom: 1px solid var(--edge); padding-bottom: 28px; }
  .masthead h1 { margin: 0 0 6px; font-size: 30px; font-weight: 650; letter-spacing: -0.02em; text-wrap: balance; }
  .masthead p { margin: 0; color: var(--muted); max-width: 62ch; }
  .totals {
    margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px 28px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums;
  }
  .totals b { color: var(--ink); font-weight: 600; }

  nav { position: sticky; top: 24px; display: flex; flex-direction: column; gap: 2px; }
  nav a {
    display: flex; align-items: baseline; gap: 10px;
    padding: 7px 10px; border-radius: 6px;
    color: var(--muted); text-decoration: none; font-size: 13.5px;
  }
  nav a:hover { background: var(--surface); color: var(--ink); }
  nav a:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  nav .n {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px; color: var(--accent); min-width: 9px;
  }

  .feed { display: flex; flex-direction: column; gap: 56px; min-width: 0; }
  .entry { scroll-margin-top: 24px; }

  .spec { margin-bottom: 16px; }
  .spec-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .stage {
    background: var(--stage-bg); color: var(--stage-ink);
    width: 22px; height: 22px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px;
  }
  .spec h2 { margin: 0; font-size: 19px; font-weight: 620; letter-spacing: -0.01em; }
  .tag {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em;
    padding: 3px 8px; border-radius: 4px;
  }
  .tag-new { background: var(--new-bg); color: var(--new); }
  .tag-changed { background: var(--changed-bg); color: var(--changed); }
  .tag-live, .tag-unchanged { background: var(--live-bg); color: var(--live); }

  .subject {
    margin: 10px 0 14px; font-size: 15px; color: var(--ink);
    padding-left: 12px; border-left: 2px solid var(--accent);
  }
  .meta {
    margin: 0 0 12px; display: grid; gap: 6px 32px;
    grid-template-columns: repeat(auto-fit, minmax(180px, auto));
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px;
  }
  .meta div { min-width: 0; }
  .meta dt { color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; font-size: 10.5px; }
  .meta dd { margin: 2px 0 0; color: var(--ink); font-variant-numeric: tabular-nums; }
  .meta s { color: var(--muted); }
  .cut { color: var(--accent); }
  .note { margin: 0; color: var(--muted); font-size: 13.5px; max-width: 68ch; }

  .render {
    background: #FFF9F5; border: 1px solid var(--edge); border-radius: 10px;
    overflow-x: auto; padding: 4px 0;
  }
  .render table { max-width: 100%; }

  @media (max-width: 860px) {
    .wrap { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 32px 16px 64px; }
    nav { position: static; flex-direction: row; flex-wrap: wrap; gap: 4px; }
    nav a { background: var(--surface); }
  }
</style>

<div class="wrap">
  <div class="masthead">
    <h1>TigerTest lifecycle emails</h1>
    <p>All eight emails in the journey, each shown with the trigger that fires it. Rendered from <code>lib/email-templates.ts</code>, so this is exactly what recipients receive.</p>
    <div class="totals">
      <span><b>${EMAILS.length}</b> emails</span>
      <span><b>${countNew}</b> new</span>
      <span><b>${countChanged}</b> re-gated</span>
      <span>existing copy <b>${totalBefore} → ${totalAfter}</b> words (−${Math.round(
        ((totalBefore - totalAfter) / totalBefore) * 100
      )}%)</span>
    </div>
  </div>

  <nav>
      ${nav}
  </nav>

  <main class="feed">
${cards}
  </main>
</div>
`;

writeFileSync(OUT, page);
console.log(`wrote ${OUT} (${Math.round(page.length / 1024)} KB)`);
