require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { voiceFor, resolveUserExamId, examIdFromSignupUrl, isKnownExamId } = require('../lib/email-voice.ts');
const { studyContexts, latestStudyContext, selectJourneyCandidate } = require('../lib/email-lifecycle.ts');
const now = Date.parse('2026-11-08T12:00:00Z');
const at = new Date(now - 1000).toISOString();
test('event identity precedes immutable signup, never mutable primaryExam', () => {
 assert.equal(resolveUserExamId({primaryExam:'dmv',firstSignupExamId:'ccma'},'sat'),'sat');
 assert.equal(resolveUserExamId({primaryExam:'dmv',firstSignupExamId:'ccma'},'invalid'),'ccma');
 assert.equal(resolveUserExamId({primaryExam:'dmv'}),'unknown');
 assert.equal(voiceFor('invalid').dashboardPath,'/tests');
 assert.equal(voiceFor(null).hasPremium,false);
});
test('signup supports exact variants and explicit DMV, neutral unknown', () => {
 assert.equal(isKnownExamId('realestate-ca'), true);
 assert.equal(examIdFromSignupUrl('/signup?redirect=/real-estate/ca/dashboard'),'realestate-ca');
 assert.equal(examIdFromSignupUrl('/dmv/dashboard'),'dmv');
 assert.equal(examIdFromSignupUrl('/signup'),'unknown');
});
test('v1 state and v2 event identities remain separate; save time is not an event', () => {
 const raw = { primaryExam:'dmv', completedTests:[{state:'CCMA',completedAt:at},{state:'INVALID',completedAt:at}], v2:{updatedAt:at,results:[{examId:'sat',completedAt:new Date(now - 2000).toISOString()}]} };
 assert.equal(latestStudyContext(raw,now).examId,'ccma');
 assert.deepEqual(studyContexts({v2:{updatedAt:at}},now),[]);
 assert.equal(studyContexts(raw,now).find(c=>c.examId==='sat').lifetimeHistoryComplete,false);
});
test('invalid/future events and simultaneous different exams fail closed',()=>{
 assert.equal(latestStudyContext({completedTests:[{state:'CA',completedAt:'bad'},{state:'CA',completedAt:new Date(now+1).toISOString()}]},now),null);
 assert.equal(latestStudyContext({completedTests:[{state:'CA',completedAt:at},{state:'CCMA',completedAt:at}]},now),null);
});
test('proposal selector has 48h cap, expiry and deterministic priority',()=>{
 const a={key:'study',examId:'ccma',dueAt:now-1,expiresAt:now+1,priority:2};
 const b={...a,key:'welcome',priority:1};
 assert.equal(selectJourneyCandidate([a,b],now,null).key,'welcome');
 assert.equal(selectJourneyCandidate([a,b],now,now-47*3600000),null);
 assert.equal(selectJourneyCandidate([{...a,expiresAt:now-1}],now,null),null);
});

test('authenticated signup origin preserves exact DMV and state-variant pages', () => {
  const { signupOrigin } = require('../lib/server/signupOrigin.ts');
  assert.equal(signupOrigin('https://www.tigertest.io/dmv').examId, 'dmv');
  const { ALL_EXAMS } = require('../lib/exams.ts');
  const variant = ALL_EXAMS.find(exam => exam.id === 'realestate-ca');
  assert.ok(variant);
  assert.equal(signupOrigin(`https://www.tigertest.io/signup?redirect=${encodeURIComponent(variant.slug + '/dashboard')}`).examId, variant.id);
  assert.equal(signupOrigin('https://www.tigertest.io/signup?redirect=https://evil.invalid/dmv').examId, undefined);
});

test('analytics current-exam inference remains distinct from immutable email identity', () => {
  const { resolveCurrentExamId } = require('../lib/email-voice.ts');
  assert.equal(resolveCurrentExamId({primaryExam:'ccma'}),'ccma');
  assert.equal(resolveCurrentExamId({primaryExam:'sat'}),'sat');
  assert.equal(resolveUserExamId({primaryExam:'ccma'}),'unknown');
});
