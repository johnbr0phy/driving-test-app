// Static contract checks only. They do not replace the Firestore emulator
// acceptance matrix documented in docs/email-release-operations.md.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const rules = fs.readFileSync(path.join(__dirname, '../firestore.email-release.rules'), 'utf8');

test('candidate rules prohibit client creation of server-owned delivery and purchase fields', () => {
  for (const field of ['signupOrigin', 'firstSignupExamId', 'marketingEmailLease', 'emailsSent', 'lastEmailSent', 'emailVariants', 'exitQuestionEmail', 'unsubscribed', 'unsubscribedAt', 'subscription']) {
    assert.ok(rules.includes(`'${field}'`), `${field} must be protected`);
  }
  assert.match(rules, /allow create: if isOwner\(userId\) && isValidUserData\(\) &&\s*!request\.resource\.data\.keys\(\)\.hasAny\(serverOwnedFields\(\)\)/);
});

test('candidate rules prohibit adding, changing, or deleting server-owned fields on update', () => {
  assert.match(rules, /allow update: if isOwner\(userId\) && isValidUserData\(\) &&\s*!request\.resource\.data\.diff\(resource\.data\)\.affectedKeys\(\)\.hasAny\(serverOwnedFields\(\)\)/);
});

test('candidate rules preserve default deny and do not open delivery or fulfillment collections', () => {
  assert.match(rules, /match \/\{document=\*\*\} \{\s*allow read, write: if false;/);
  assert.doesNotMatch(rules, /match \/(?:emailDeliveries|fulfilledCheckouts)\//);
});

test('candidate preserves ordinary client consent and initial createdAt fields', () => {
  const fields = rules.match(/function serverOwnedFields\(\) \{\s*return \[([\s\S]*?)\];/)[1];
  assert.doesNotMatch(fields, /'emailConsent'|'createdAt'/);
});
