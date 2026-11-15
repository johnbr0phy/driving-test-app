require('tsx/cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const Module=require('node:module');
const cron=require('../lib/cron-email.ts');
const {voiceFor}=require('../lib/email-voice.ts');
const original=Module._load;
let users,batch,GET;
try{
 Module._load=function(request,parent,main){
  if(request==='@/lib/cron-email')return{...cron,buildAuthMap:async()=>new Map(),getEligibleUsers:async()=>users,verifyCronSecret:()=>true,processBatch:async o=>{batch=o;return{eligible:o.users.length,sent:0};}};
  return original.call(this,request,parent,main);
 };
 ({GET}=require('../app/api/cron/paywall-abandon/route.ts'));
}finally{Module._load=original;}
const now=Date.now(),hour=3600000;
function user(location='stats_page',classes=[]){
 const hit={location,itemId:'full_stats',label:'Stats',lastAt:new Date(now-2*hour).toISOString()};
 const raw={primaryExam:'ccma',paywallHits:{hit},trainingAnswerHistory:Array.from({length:10},(_,i)=>({questionId:`U-${i+1}`,isCorrect:true,answeredAt:new Date(now-24*hour).toISOString()})),classMemberships:classes};
 return{uid:'u',email:'u@example.com',emailsSent:[],subscription:{},lastEmailSent:null,lastActiveAt:new Date(now-hour),raw,examId:'ccma',voice:voiceFor('ccma'),questionsAnswered:999,lastPaywallHit:cron.latestPaywallHit(raw.paywallHits)};
}
test('paywall follows verified DMV event and scopes question evidence',async()=>{
 users=[user()];await GET({});assert.equal(batch.users.length,1);assert.equal(batch.users[0].examId,'dmv');assert.equal(batch.users[0].questionsAnswered,10);
 users=[{...user(),raw:{...user().raw,trainingAnswerHistory:[]}}];await GET({});assert.equal(batch.users.length,0);
 users=[user('ccma_stats')];await GET({});assert.equal(batch.users.length,0);
});
test('class stats access suppresses initial and freshly changed paywall recovery; quizzes do not grant it',async()=>{
 const membership={code:'class',memberId:'member',examId:'dmv'};
 users=[user('stats_page',[membership])];await GET({});assert.equal(batch.users.length,0);
 users=[user('stats_page',[{...membership,kind:'quiz'}])];await GET({});assert.equal(batch.users.length,1);
 const selected=batch.users[0];
 assert.equal(batch.eligible({...selected.raw,classMemberships:[membership]},selected),false);
 assert.equal(batch.eligible({...selected.raw,subscription:{isPremium:true}},selected),false);
});
test('DMV test-only learners retain their existing minimum-answer eligibility',async()=>{
 const u=user();u.raw.trainingAnswerHistory=[];
 u.raw.completedTests=[{state:'CA',completedAt:new Date(now-3*hour).toISOString(),answers:Array.from({length:10},(_,i)=>({questionId:`U-${i+1}`,userAnswer:'A',isCorrect:true}))}];
 users=[u];await GET({});assert.equal(batch.users.length,1);assert.equal(batch.users[0].questionsAnswered,10);
});
test('every exam that sells Premium gets the follow-up, about the exam of the paywall', async()=>{
 const {paywallExam}=require('../lib/paywallAbandon.ts');
 // DMV keeps its two paywall places.
 assert.equal(paywallExam({location:'dashboard',itemId:'set_3'}),'dmv');
 assert.equal(paywallExam({location:'stats_page',itemId:'full_stats'}),'dmv');
 assert.equal(paywallExam({location:'results_page',itemId:'test_4'}),null);
 // v1 locked steps and stats, v2 locked drills.
 assert.equal(paywallExam({location:'cdl_dashboard',itemId:'exam_cdl_test_6'}),'cdl');
 assert.equal(paywallExam({location:'ccma_stats',itemId:'full_stats'}),'ccma');
 assert.equal(paywallExam({location:'nclex_dashboard',itemId:'v2_nclex_test_2'}),'nclex');
 // A free v2 exam sells nothing, so it never gets the email.
 assert.equal(paywallExam({location:'sat_dashboard',itemId:'v2_sat_test_2'}),null);
 const cdl={...user('cdl_dashboard'),raw:{...user().raw,paywallHits:{h:{location:'cdl_dashboard',itemId:'exam_cdl_test_6',label:'CDL Practice Test 6',lastAt:new Date(now-2*hour).toISOString()}},
   trainingAnswerHistory:Array.from({length:12},(_,i)=>({questionId:`CDL-GK-${String(i+1).padStart(3,'0')}`,isCorrect:true,answeredAt:new Date(now-24*hour).toISOString()}))}};
 cdl.lastPaywallHit=cron.latestPaywallHit(cdl.raw.paywallHits);
 users=[cdl];await GET({});
 assert.equal(batch.users.length,1);assert.equal(batch.users[0].examId,'cdl');assert.equal(batch.users[0].questionsAnswered,12);
 assert.ok(batch.users[0].voice.premiumBenefits.length>0);
 // A class student of that exam already has every step.
 users=[{...cdl,raw:{...cdl.raw,classMemberships:[{code:'c',memberId:'m',examId:'cdl'}]}}];await GET({});assert.equal(batch.users.length,0);
});
test('paywall email lists the exam\'s own Premium steps, never the DMV\'s', ()=>{
 const {EMAIL_TEMPLATES}=require('../lib/email-templates.ts');
 const html=EMAIL_TEMPLATES.paywallAbandon(voiceFor('cdl'));
 assert.match(html,/Open CDL Practice/);
 assert.doesNotMatch(html,/State Laws|Practice tests C and D|DMV/);
 assert.match(EMAIL_TEMPLATES.paywallAbandon(voiceFor('dmv')),/State Laws/);
 for (const id of ['cdl','ccma','nclex','moto']) assert.ok(voiceFor(id).premiumBenefits.length>0, id);
 assert.equal(voiceFor('sat').hasPremium,false);
});
