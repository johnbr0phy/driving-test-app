require('tsx/cjs');
const { test }=require('node:test');
const assert=require('node:assert/strict');
const Module=require('node:module');
const {voiceFor}=require('../lib/email-voice.ts');
const original=Module._load;
const now=Date.now(), day=86400000;
let users,batch, reengagement,inactive;
try {
 Module._load=function(request,parent,main){
  if(request==='@/lib/cron-email') return {buildAuthMap:async()=>new Map(),getEligibleUsers:async()=>users,verifyCronSecret:()=>true,emailedRecently:()=>false,processBatch:async o=>{batch=o;return{eligible:o.users.length,sent:0};}};
  return original.call(this,request,parent,main);
 };
 reengagement=require('../app/api/cron/reengagement/route.ts').GET;
 inactive=require('../app/api/cron/inactive-share-request/route.ts').GET;
} finally {Module._load=original;}
function user(days,v2){
 const iso=new Date(now-days*day).toISOString();
 const completedTests=v2?[]:[{state:'CCMA',completedAt:iso}];
 const raw={primaryExam:'dmv',completedTests,lastUpdated:iso,...(v2?{v2:{results:[{examId:'sat',completedAt:iso}],updatedAt:iso}}:{})};
 return{uid:'u',email:'u@example.com',creationTime:new Date(now-90*day),examId:'unknown',voice:voiceFor('unknown'),emailsSent:[],lastEmailSent:null,lastActiveAt:new Date(iso),lastUpdated:new Date(iso),completedTests,questionsAnswered:0,raw};
}
test('legacy return and share routes do not activate V2-only audiences',async()=>{
 for(const [route,days]of[[reengagement,6],[inactive,25]]){
  users=[user(days,true)]; await route({}); assert.equal(batch.users.length,0);
 }
});
test('existing v1 audience uses event exam and cancels resumed V2 study',async()=>{
 for(const [route,days]of[[reengagement,6],[inactive,25]]){
  users=[user(days,false)]; await route({}); assert.equal(batch.users.length,1); assert.equal(batch.users[0].examId,'ccma');
  assert.equal(batch.eligible({...users[0].raw,v2:{updatedAt:new Date().toISOString()}},batch.users[0]),false);
 }
});
