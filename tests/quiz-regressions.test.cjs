require('tsx/cjs');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {readFileSync} = require('node:fs');
const {Firestore} = require('firebase-admin/firestore');
const {createQuiz} = require('../lib/server/quizzes.ts');
const {reportQuizQuestion} = require('../lib/quizProgress.ts');
const {memberBatch,applyMemberProgress} = require('../lib/server/classMembers.ts');
const questions=Array.from({length:3},(_,i)=>({question:`Choose red ${i}`,options:['Red','Blue','Green','Yellow'],correctIndex:0,explanation:'Red was requested.'}));
test('private, default link and public quiz creates pass real SDK document validation without network',async()=>{
 const sdk=new Firestore({projectId:'synthetic-qa-only'});
 try {for(const visibility of [undefined,'private','public']){
 let saved;
 const fake={collection:()=>({where:()=>({count:()=>({get:async()=>({data:()=>({count:0})})})}),doc:(id)=>({create:async(data)=>{sdk.batch().create(sdk.doc('quizzes/'+id),data);saved=data;},set:async()=>{}})})};
 const quiz=await createQuiz({uid:'qa',isPremium:false},{title:'QA colours',questions,visibility,createdVia:'mcp'},fake);
 assert.equal(quiz.visibility,visibility??'link');assert.equal(saved.questions.length,3);
 if(visibility==='public')assert.equal(saved.publicRank,0);else assert.ok(!Object.hasOwn(saved,'publicRank'));
 }}finally{await sdk.terminate();}
});
test('failed HTTP and network reports reject; successful report resolves',async()=>{
 const original=global.fetch;
 try{global.fetch=async()=>new Response('{}',{status:500});await assert.rejects(()=>reportQuizQuestion('ABCDEF','q1','typo'),/Could not send/);
 global.fetch=async()=>{throw new Error('offline')};await assert.rejects(()=>reportQuizQuestion('ABCDEF','q1','typo'),/offline/);
 global.fetch=async()=>new Response('{}',{status:200});await reportQuizQuestion('ABCDEF','q1','typo');
 }finally{global.fetch=original;}
 const ui=readFileSync('components/quiz/QuizPractice.tsx','utf8');assert.match(ui,/await reportQuizQuestion[\s\S]*?setSent\(true\);\s*} catch/);assert.match(ui,/role="alert"/);
});
test('shared class progress preserves prior misses on an all-correct batch',async()=>{
 let saved;const db={runTransaction:async fn=>fn({get:async()=>({exists:true,data:()=>({tests:{}})}),set:(_,data)=>saved=data})};
 assert.equal(await applyMemberProgress(db,{},[{q:'q1',c:'Road.Signs',ok:true}],[]),true);
 assert.ok(!Object.hasOwn(saved,'missed'));assert.ok(!Object.hasOwn(saved,'picks'));assert.ok(saved.byCategory.Road_Signs);
 assert.equal(memberBatch({answers:[{q:'q1',c:'Road Signs',ok:true},{q:'bad/path',c:'Road Signs',ok:true}]}).answers.length,1);
});
test('merged admin changes retain auth, shared cache, new signups chart and quiz metrics',()=>{
 const route=readFileSync('app/api/admin/metrics/route.ts','utf8');assert.match(route,/await requireAdmin\(request\)/);assert.match(route,/cachedAdminPayload\(/);assert.match(route,/analytics\/quizzes/);
 const ui=readFileSync('components/admin/GrowthTab.tsx','utf8');assert.match(ui,/function NewSignupsCard/);assert.match(ui,/function QuizzesCard/);
 const cron=readFileSync('app/api/cron/quizzes-launch/route.ts','utf8');assert.match(cron,/process.env.QUIZZES_CAMPAIGN === "send"/);
});
