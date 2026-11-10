require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { EMAIL_INBOX, SERVICE_INBOX, exitQuestionInbox, emailPreheader, inboxLabel, emailText } = require('../lib/email-inbox.ts');
const { EMAIL_TEMPLATES, exitQuestionEmail, exitQuestionSubject } = require('../lib/email-templates.ts');
const { voiceFor } = require('../lib/email-voice.ts');
const { practiceLabel } = require('../lib/practiceLabel.ts');
const { ALL_EXAMS } = require('../lib/exams.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { LAUNCH_VARIANTS, SENDING_VARIANTS, PROPOSED_LAUNCH_VARIANTS, pickLaunchVariant } = require('../lib/email-launch.ts');
const allIds = ['unknown', 'dmv', ...ALL_EXAMS.map(e => e.id), ...EXAMS_V2.map(e => e.id)];
const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

test('every shared template renders its defined preheader before its artwork', () => {
  for (const id of allIds) {
    const voice = voiceFor(id);
    for (const [key, render] of Object.entries(EMAIL_TEMPLATES)) {
      const inbox = EMAIL_INBOX[key](voice);
      const html = render(voice);
      assert.ok(html.includes(emailPreheader(inbox.preheader)), `${id}/${key}`);
      assert.ok(html.indexOf('data-email-preheader') < html.indexOf('<img'), `${id}/${key}`);
      assert.match(html, new RegExp(`<title>${escape(inbox.subject).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`), `${id}/${key}`);
      assert.ok([...inbox.subject].length <= 70, `${id}/${key}: ${inbox.subject}`);
      assert.ok(inbox.preheader.length <= 130, `${id}/${key}: ${inbox.preheader}`);
      assert.doesNotMatch(inbox.subject, /[\r\n]/);
    }
  }
});

test('study subjects use the supplied event exam; unknown stays neutral', () => {
  for (const id of allIds.filter(id => id !== 'unknown')) {
    const v = voiceFor(id);
    for (const key of ['welcome', 'firstTestReminder', 'secondTestNudge', 'reengagement', 'superAmazingUnlocked', 'inactiveShareRequest']) {
      // Before "practice" a descriptive trailing "test" or "exam" is dropped (lib/practiceLabel.ts).
      assert.ok(EMAIL_INBOX[key](v).subject.includes(practiceLabel(v.shortName)), `${id}/${key}`);
      assert.doesNotMatch(EMAIL_INBOX[key](v).subject, /\b(test|exam) practice\b/, `${id}/${key}`);
    }
  }
  const v = voiceFor(undefined);
  assert.equal(EMAIL_INBOX.welcome(v).subject, 'Welcome to Tigertest');
  assert.equal(EMAIL_INBOX.firstTestReminder(v).subject, 'Try a practice test');
  assert.equal(EMAIL_INBOX.reengagement(v).subject, 'Continue your practice');
  for (const fn of [EMAIL_INBOX.welcome, EMAIL_INBOX.firstTestReminder, EMAIL_INBOX.reengagement]) {
    assert.doesNotMatch(JSON.stringify(fn(v)), /DMV|unknown|undefined|0 questions/);
  }
});

test('question subjects and preheaders reflect the recorded answer, not a guessed reason for leaving', () => {
  for (const isCorrect of [true, false]) {
    const v = voiceFor('ccma');
    const content = { question: 'Example?', options: ['A', 'B'], answer: 'A', explanation: '', isCorrect };
    const inbox = exitQuestionInbox(v, isCorrect);
    assert.equal(exitQuestionSubject(content, v), inbox.subject);
    assert.ok(exitQuestionEmail(v, content).includes(emailPreheader(inbox.preheader)));
    assert.match(inbox.subject, /CCMA/);
    assert.doesNotMatch(inbox.subject + inbox.preheader, /failed|quit|gave up|pass|explanation|upcoming|soon/i);
  }
  assert.equal(exitQuestionInbox(voiceFor('ccma'), false).subject, 'A CCMA question worth another look');
  assert.equal(exitQuestionInbox(voiceFor('ccma'), true).subject, 'Keep your CCMA practice going');
});

test('receipt previews distinguish paid v1 stats from free v2 study tools', () => {
  assert.equal(EMAIL_INBOX.purchaseWelcome(voiceFor('ccma')).subject, 'Tigertest Premium: purchase confirmed');
  assert.match(EMAIL_INBOX.purchaseWelcome(voiceFor('ccma')).preheader, /full CCMA stats/);
  for (const id of ['sat', 'teas', undefined]) {
    const inbox = EMAIL_INBOX.purchaseWelcome(voiceFor(id));
    assert.match(inbox.preheader, /account-wide Premium/);
    assert.doesNotMatch(inbox.preheader, /full .* stats|study plan|mistake notebook|unlocked/);
  }
});

test('no generic study message implies a test date, a failed answer, or an official outcome', () => {
  for (const key of ['welcome', 'firstTestReminder', 'secondTestNudge', 'reengagement', 'inactiveShareRequest']) {
    const inbox = EMAIL_INBOX[key](voiceFor('ccma'));
    assert.doesNotMatch(inbox.subject + inbox.preheader, /Did you pass|coming up|soon|you failed|your mistakes|full-length|50 questions/i);
  }
  assert.match(EMAIL_INBOX.upgradePitch().subject, /DMV Premium/);
  assert.doesNotMatch(EMAIL_INBOX.paywallAbandon(voiceFor('dmv'), 'State Laws').subject, /waiting|unlocked|free/);
});

test('service copy identifies the action without unsupported timing or a school dashboard promise', () => {
  assert.equal(SERVICE_INBOX.reset.subject, 'Reset your Tigertest password');
  assert.match(SERVICE_INBOX.schoolEnquiry.subject, /received.*school enquiry/);
  assert.match(SERVICE_INBOX.schoolProgress('Alex').subject, /8 practice sections/);
  assert.doesNotMatch(SERVICE_INBOX.schoolProgress('Alex').preheader, /view|dashboard|passed/i);
  assert.doesNotMatch(SERVICE_INBOX.reset.preheader + SERVICE_INBOX.schoolEnquiry.preheader, /1 hour|business day|24 hours/);
});

test('untrusted dynamic header labels are single-line and preview HTML is escaped', () => {
  assert.equal(inboxLabel('  School\r\nBcc: somebody\telse ', 'School'), 'School Bcc: somebody else');
  assert.equal(inboxLabel(null, 'Your school'), 'Your school');
  assert.ok(SERVICE_INBOX.schoolInvite('x'.repeat(400)).subject.length < 80);
  assert.ok(SERVICE_INBOX.schoolProgress('x'.repeat(400)).subject.length < 90);
  assert.match(emailPreheader('<img onerror="x"> &'), /&lt;img onerror=&quot;x&quot;&gt; &amp;/);
  assert.doesNotMatch(emailPreheader('<img onerror="x"> &'), /<img/);
});

test('new launch copy is held and historical subjects and enrollment remain unchanged', () => {
  assert.deepEqual(SENDING_VARIANTS.map(v => v.id), ['v4', 'v5']);
  assert.equal(LAUNCH_VARIANTS.find(v => v.id === 'v4').subject, 'What would you score on the SAT today?');
  assert.equal(LAUNCH_VARIANTS.find(v => v.id === 'v5').subject, 'I built the SAT and ACT');
  assert.deepEqual(PROPOSED_LAUNCH_VARIANTS.map(v => v.id), ['v6', 'v7']);
  assert.equal(PROPOSED_LAUNCH_VARIANTS[0].preheader, PROPOSED_LAUNCH_VARIANTS[1].preheader);
  for (const draft of PROPOSED_LAUNCH_VARIANTS) {
    assert.doesNotMatch(draft.html(), /scored like the real|Also new|140\+|\$9\.99|permit test was step one|api\/email\/click/);
    assert.match(draft.html(), /not official exam scores/);
    assert.ok(!SENDING_VARIANTS.some(v => v.id === draft.id));
    assert.notEqual(pickLaunchVariant('same-person', draft.id).id, draft.id);
  }
});

test('sender routes use shared subject definitions and recorded question exam', () => {
  const sources = {
    'first-test-reminder': 'firstTestReminder', 'second-test-nudge': 'secondTestNudge',
    'reengagement': 'reengagement', 'super-amazing': 'superAmazingUnlocked',
    'inactive-share-request': 'inactiveShareRequest',
  };
  for (const [route, key] of Object.entries(sources)) {
    const source = fs.readFileSync(`app/api/cron/${route}/route.ts`, 'utf8');
    assert.ok(source.includes(`subject: (u) => EMAIL_INBOX.${key}(u.voice).subject`), route);
  }
  assert.match(fs.readFileSync('app/api/cron/exit-question/route.ts', 'utf8'), /subject: .*voiceFor\(exits.get\(u.uid\)!\.exit.examId\)/);
  assert.match(fs.readFileSync('app/api/stripe/webhook/route.ts', 'utf8'), /subject: EMAIL_INBOX.purchaseWelcome\(voiceFor\(fulfillment\?\.examId\)\).subject/);
});

// Render the actual local template functions without loading route dependencies
// or executing a Firestore/provider call. Next routes cannot export helper APIs.
test('legacy service templates escape hostile names and emails without adding links', () => {
  const ts = require('typescript');
  const paths = [
    ['app/api/schools/[schoolId]/students/route.ts', 'buildInviteEmail', 1],
    ['app/api/schools/[schoolId]/students/[uid]/progress/route.ts', 'buildPassEmail', 3],
  ];
  const hostile = '<a href="https://bad.example/">Name</a><img src=x onerror="bad">';
  for (const [path, name, count] of paths) {
    const source = fs.readFileSync(path, 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const helper = compiled.match(new RegExp('function ' + name + '\\([\\s\\S]*?\\n}'))?.[0];
    assert.ok(helper, name);
    const render = new Function('email_inbox_1', helper + '\nreturn ' + name + ';')({ SERVICE_INBOX, emailPreheader, emailText });
    const html = render(...Array(count).fill(hostile));
    assert.ok(html.includes('&lt;a href=&quot;https://bad.example/'), name);
    assert.doesNotMatch(html, /<a href="https:\/\/bad\.example|<img src=x/);
    for (const match of html.matchAll(/href="([^\"]+)"/g)) assert.equal(new URL(match[1]).hostname, 'www.tigertest.io');
    assert.doesNotMatch(html, /tracked automatically|View Dashboard|ready for the real DMV exam|cover everything/);
  }
});

test("a short name ending in a descriptive test or exam never doubles before practice", () => {
  assert.equal(practiceLabel("Nigerian Army recruitment test"), "Nigerian Army recruitment");
  assert.equal(practiceLabel("LTO exam"), "LTO");
  assert.equal(practiceLabel("Police Exam"), "Police Exam");
  assert.equal(practiceLabel("DMV"), "DMV");
});
