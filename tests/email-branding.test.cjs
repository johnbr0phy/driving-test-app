require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const { emailBrand } = require('../lib/email-brand.ts');
const { EMAIL_TEMPLATES } = require('../lib/email-templates.ts');
const { voiceFor } = require('../lib/email-voice.ts');

test('email colours stay in step with the real app light themes', () => {
  execFileSync(process.execPath, ['scripts/build-email-brand.cjs', '--check']);
  assert.equal(emailBrand('ccma').accent, '#197f8e');
  assert.equal(emailBrand('sat').accent, '#1450d2');
  assert.equal(emailBrand('dmv').accent, '#c25105');
});

test('exam and state-family tigers exist, unknown identity uses site artwork', () => {
  for (const id of ['ccma', 'dmv', 'sat', 'realestate-ca', undefined]) {
    const brand = emailBrand(id);
    const asset = new URL(brand.tiger).pathname;
    assert.ok(fs.existsSync('public' + asset), asset);
  }
  assert.match(emailBrand('dmv').tiger, /tigers\/driving\//);
  assert.match(emailBrand('realestate-ca').tiger, /tigers\/realestate\//);
  assert.equal(emailBrand('unknown').tiger, 'https://www.tigertest.io/tiger_face_03.png');
});

test('safe welcome and followup copy avoids guarantees, fixed exam timing and implied entitlement', () => {
  const ccma = EMAIL_TEMPLATES.secondTestNudge(voiceFor('ccma'));
  assert.match(ccma, /Full stats may require paid access/);
  assert.doesNotMatch(ccma, /Your stats<\/a> show/);
  const sat = EMAIL_TEMPLATES.firstTestReminder(voiceFor('sat'));
  assert.match(sat, /2 hr 14 min/);
  assert.doesNotMatch(sat, /30 minutes/);
  const unknown = EMAIL_TEMPLATES.welcome(voiceFor(undefined));
  assert.doesNotMatch(unknown, /DMV|0 questions|0 steps|0 tests/);
  assert.match(unknown, /\/tests\?/);
});

test('purchase confirmation never sells the free SAT plan and invents no Common Mistakes availability', () => {
  for (const id of ['ccma', 'dmv', 'sat', undefined]) {
    const html = EMAIL_TEMPLATES.purchaseWelcome(voiceFor(id));
    assert.doesNotMatch(html, /Common Mistakes|unsubscribe\?token/);
    if (id === 'sat') assert.match(html, /were already free/);
    if (!id) assert.doesNotMatch(html, /your full .* stats/i);
  }
});

test('every contextual template uses event branding; milestone uses celebration, not Premium crown', () => {
  for (const id of ['ccma', 'dmv', 'sat', 'realestate-ca', undefined]) {
    const v = voiceFor(id);
    for (const [name, render] of Object.entries(EMAIL_TEMPLATES)) {
      const html = render(v);
      if (name === 'welcomeTeacher') {
        assert.ok(html.includes('https://www.tigertest.io/tiger_face_03.png'));
        assert.doesNotMatch(html, /unsubscribe\?token/);
        continue;
      }
      const expression = name === 'superAmazingUnlocked' ? 2 : name === 'purchaseWelcome' ? 1 : 3;
      assert.ok(html.includes(emailBrand(v.id, expression).tiger), `${id}/${name}`);
      assert.ok(html.includes(emailBrand(v.id).accent), `${id}/${name}`);
      assert.doesNotMatch(html, /border-top:\s*(?:[4-9]|\d{2,})px/);
      if (name === 'superAmazingUnlocked') {
        assert.doesNotMatch(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1], /🎉/);
        assert.match(html, /tiger_face_02.png/);
      }
    }
  }
});

test('question review marks only the true answer and supports free response without inventing choices', () => {
  const { exitQuestionEmail } = require('../lib/email-templates.ts');
  const c = { question: 'A < B?', options: [], answer: '<safe>', explanation: '', isCorrect: true };
  const html = exitQuestionEmail(voiceFor('ccma'), c);
  assert.match(html, /Correct last time/);
  assert.match(html, /&lt;safe&gt;/);
  assert.match(html, /Correct answer/);
  assert.doesNotMatch(html, />Explanation<|A\)<\/td>|You selected/);
});

test('copy does not blame the learner or invent prices, payment terms or lifetime-first results', () => {
  const { exitQuestionEmail, exitQuestionSubject } = require('../lib/email-templates.ts');
  for (const isCorrect of [true, false]) {
    const c = { question: 'Example?', options: ['A', 'B'], answer: 'A', explanation: 'Example only.', isCorrect };
    const html = exitQuestionEmail(voiceFor('ccma'), c);
    assert.doesNotMatch(html + exitQuestionSubject(c), /vanished|disappeared|revenge|little bit you|mostly|mic drop/i);
    assert.match(html, /Continue CCMA Practice/);
  }
  for (const key of ['paywallAbandon', 'upgradePitch', 'purchaseWelcome']) {
    assert.doesNotMatch(EMAIL_TEMPLATES[key](voiceFor('dmv')), /\$9\.99|nothing to cancel|one.time payment|no subscription/i);
  }
  assert.doesNotMatch(EMAIL_TEMPLATES.secondTestNudge(voiceFor('ccma')), /Your first practice result/);
});
