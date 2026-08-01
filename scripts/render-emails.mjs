// Renders every email template with realistic sample values and writes each to
// a file, so they can be previewed or saved as Gmail drafts.
import { writeFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const OUT = process.argv[2] || './rendered-emails';
mkdirSync(OUT, { recursive: true });

// The templates file is TypeScript, so compile it to a temp dir and import the
// emitted JS rather than trying to strip types by hand.
const TMP = `${OUT}/.compiled`;
mkdirSync(TMP, { recursive: true });
execSync(
  `npx tsc lib/email-templates.ts --outDir ${TMP} --module es2020 --target es2020 --moduleResolution bundler`,
  { stdio: 'inherit' }
);
const { EMAIL_TEMPLATES } = await import(`${TMP}/email-templates.js`);

const SAMPLE = {
  unsubscribeToken: 'c2FtcGxlLXVzZXItaWQ=',
  greeting: 'Hey there,',
  questionCount: '57',
  paywallName: 'Safety & Emergencies',
  testCount: '2',
};

// Per-email overrides where the generic sample would be impossible. Reaching
// 8/8 means 4 training sets and 4 tests of 50, so 57 questions cannot happen.
const SAMPLE_OVERRIDES = {
  superAmazingUnlocked: { questionCount: '438' },
};

const SUBJECTS = {
  welcome: 'Welcome to TigerTest',
  firstTestReminder: 'Quick check-in from TigerTest',
  secondTestNudge: 'Nice work on test #1!',
  paywallAbandon: 'Safety & Emergencies is still waiting',
  upgradePitch: "You're doing the work 💪",
  purchaseWelcome: "You're in - here's what just unlocked",
  reengagement: 'Test coming up soon?',
  superAmazingUnlocked: 'You unlocked Super Amazing Mode 🎉',
  inactiveShareRequest: 'Did you pass?',
};

const order = Object.keys(SUBJECTS);
const manifest = [];

for (const key of order) {
  const tpl = EMAIL_TEMPLATES[key];
  if (!tpl) {
    console.error(`MISSING TEMPLATE: ${key}`);
    continue;
  }
  let html = tpl;
  for (const [k, v] of Object.entries({ ...SAMPLE, ...(SAMPLE_OVERRIDES[key] || {}) })) {
    html = html.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v);
  }
  const leftover = html.match(/\{\{[^}]+\}\}/g);
  if (leftover) console.error(`  ! ${key} has unreplaced placeholders: ${[...new Set(leftover)].join(', ')}`);

  const file = `${OUT}/${key}.html`;
  writeFileSync(file, html);
  manifest.push({ key, subject: SUBJECTS[key], file, bytes: html.length });
}

console.log(JSON.stringify(manifest, null, 2));
