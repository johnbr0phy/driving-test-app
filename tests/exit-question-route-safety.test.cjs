require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const original = Module._load;
const now = Date.now(), day = 86400_000;
const iso = days => new Date(now - days * day).toISOString();
const raw = { language: 'en', lastUpdated: iso(5), completedTests: [], trainingAnswerHistory: [1,2,3].map(n => ({ questionId:`U-${n}`, answeredAt:iso(8-n), isCorrect:n===3 })) };
const base = { uid:'u', email:'u@example.com', emailsSent:[], lastEmailSent:null, lastActiveAt:new Date(iso(5)), raw };
let users = [base], batch;
let GET;
try {
  Module._load = function(request,parent,main) {
    if (request === '@/lib/cron-email') return {
      DAY_MS: day, buildAuthMap:async()=>new Map(), verifyCronSecret:()=>true, emailedRecently:()=>false,
      getEligibleUsers:async()=>users,
      processBatch:async o=>{ batch=o; return {eligible:o.users.length,sent:0}; },
    };
    if (request === '@/lib/testGenerator') return { getQuestionsData:()=>[1,2,3].map(n=>({questionId:`U-${n}`})) };
    if (request === '@/lib/server/classQuestions') return { classQuestionLookup:()=>()=>({question:'Question?',options:['Yes','No'],answer:'Yes',explanation:'Because.'}) };
    return original.call(this,request,parent,main);
  };
  ({ GET }=require('../app/api/cron/exit-question/route.ts'));
} finally { Module._load=original; }
const req=dry=>({ nextUrl:{searchParams:new URLSearchParams(dry?'dry=1':'')} });
process.env.EXIT_QUESTION_CAMPAIGN='send';
test('exit uses actual question and fresh predicate cancels resumed or changed study',async()=>{
  await GET(req(false)); assert.equal(batch.users.length,1);
  assert.equal(batch.eligible(raw,base),true);
  assert.equal(batch.eligible({...raw,lastUpdated:iso(1)},base),false);
  assert.equal(batch.eligible({...raw,v2:{updatedAt:iso(4)}},base),false);
  assert.equal(batch.eligible({...raw,language:'es'},base),false);
  assert.equal(batch.eligible({...raw,trainingAnswerHistory:[]},base),false);
});
test('newer v2 activity excludes older v1 question and dry-run never dispatches',async()=>{
  batch=undefined;
  users=[{...base,raw:{...raw,v2:{updatedAt:iso(4)}}}];
  const result=await GET(req(true));
  assert.equal((await result.json()).eligible,0); assert.equal(batch,undefined);
});
