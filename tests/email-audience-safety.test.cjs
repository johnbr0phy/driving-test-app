require('tsx/cjs');
const assert=require('node:assert/strict');
const {test}=require('node:test');
const Module=require('node:module');
const original=Module._load;
let docs=[],getEligibleUsers;
try {
 Module._load=function(request,parent,main){
  if(request==='@/lib/firebase-admin') return {getAdminDb:()=>({collection:()=>({where(){return this;},get:async()=>({docs})})})};
  return original.call(this,request,parent,main);
 };
 ({getEligibleUsers}=require('../lib/cron-email.ts'));
} finally{Module._load=original;}
const now=Date.now(),day=86400000;
const auth=new Map([['u',{email:'u@example.com',creationTime:new Date(now-90*day)}]]);
const row=data=>({id:'u',data:()=>data});
test('candidate prefilter does not apply signup DMV expiry to later CCMA activity',async()=>{
 docs=[row({emailConsent:true,firstSignupExamId:'dmv',lastUpdated:new Date(now-4*day).toISOString(),completedTests:[{state:'CCMA',completedAt:new Date(now-4*day).toISOString()}]})];
 const users=await getEligibleUsers(auth);
 assert.equal(users.length,1);
 const {withStudyContext}=require('../lib/email-lifecycle.ts');
 assert.equal(withStudyContext(users[0]).voice.inactiveDays,14);
});
test('missing consent remains blocked even with legacy query flag and broad stale records are skipped',async()=>{
 docs=[row({lastUpdated:new Date().toISOString()})];
 assert.equal((await getEligibleUsers(auth,true)).length,0);
 docs=[row({emailConsent:true,lastUpdated:new Date(now-15*day).toISOString()})];
 assert.equal((await getEligibleUsers(auth)).length,0);
});
