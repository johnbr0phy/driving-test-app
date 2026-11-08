import fs from 'node:fs';
import {initializeTestEnvironment, assertSucceeds, assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,updateDoc,getDoc,deleteDoc,deleteField,collection,getDocs} from 'firebase/firestore';

const projectId='demo-email-rules';
if(!process.env.FIRESTORE_EMULATOR_HOST?.startsWith('127.0.0.1:')) throw Error('Local emulator required');
const env=await initializeTestEnvironment({projectId,firestore:{rules:fs.readFileSync('firestore.email-release.rules','utf8')}});
const owner=env.authenticatedContext('owner',{email:'owner@example.test'}).firestore();
const other=env.authenticatedContext('other',{email:'other@example.test'}).firestore();
const anon=env.unauthenticatedContext().firestore();
const admin=env.authenticatedContext('admin',{email:'john@johnbrophy.net'}).firestore();
const base={selectedState:'CA',lastUpdated:'2026-11-08T00:00:00.000Z',currentTests:{},completedTests:[],testAttempts:[],training:{},emailConsent:true,createdAt:'2026-11-08T00:00:00.000Z'};
const fields=['signupOrigin','firstSignupExamId','marketingEmailLease','emailsSent','lastEmailSent','emailVariants','exitQuestionEmail','unsubscribed','unsubscribedAt','subscription'];
const actual={signupOrigin:'landing',firstSignupExamId:'ca-dmv',marketingEmailLease:{id:'lease'},emailsSent:['welcome'],lastEmailSent:'2026-11-08',emailVariants:{welcome:'a'},exitQuestionEmail:{sent:true},unsubscribed:false,unsubscribedAt:'2026-11-08',subscription:{status:'active'}};
const results=[];
async function test(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:String(e)});console.log('FAIL',name,String(e));}}
async function seed(path,data){await env.withSecurityRulesDisabled(async c=>setDoc(doc(c.firestore(),path),data));}
const path='users/owner';const ref=doc(owner,path);
try{
await test('owner valid create',async()=>assertSucceeds(setDoc(ref,base)));
await test('owner progress update',async()=>assertSucceeds(updateDoc(ref,{currentTests:{ca:{progress:2}},lastUpdated:'2026-11-08T00:01:00Z'})));
await test('owner consent update',async()=>assertSucceeds(updateDoc(ref,{emailConsent:false})));
for(const field of fields){
 await test(field+' create denied',async()=>{await env.clearFirestore();await assertFails(setDoc(ref,{...base,[field]:actual[field]}));});
 await test(field+' add denied',async()=>{await seed(path,base);await assertFails(updateDoc(ref,{[field]:actual[field]}));});
 await test(field+' change denied',async()=>{await seed(path,{...base,[field]:actual[field]});await assertFails(updateDoc(ref,{[field]:'tampered'}));});
 await test(field+' nested change denied',async()=>{await seed(path,{...base,[field]:{nested:{value:'original'}}});await assertFails(updateDoc(ref,{[field+'.nested.value']:'tampered'}));});
 await test(field+' delete denied',async()=>{await seed(path,{...base,[field]:actual[field]});await assertFails(updateDoc(ref,{[field]:deleteField()}));});
 await test(field+' retained progress allowed',async()=>{await seed(path,{...base,[field]:actual[field]});await assertSucceeds(updateDoc(ref,{currentTests:{ca:{progress:3}}}));});
}
await seed(path,{...base,...actual});
await test('all protected fields retained allowed',async()=>assertSucceeds(updateDoc(ref,{emailConsent:false,completedTests:['ca']})));
await test('owner read allowed',()=>assertSucceeds(getDoc(ref)));
await test('owner delete denied',()=>assertFails(deleteDoc(ref)));
for(const [name,db] of [['other user',other],['anonymous',anon]]){
 for(const [op,fn] of [['read',()=>getDoc(doc(db,path))],['update',()=>updateDoc(doc(db,path),{emailConsent:true})],['delete',()=>deleteDoc(doc(db,path))],['list',()=>getDocs(collection(db,'users'))],['create',()=>setDoc(doc(db,'users/new-owner'),base)]]){
 await test(name+' '+op+' denied',()=>assertFails(fn()));
 }
}
for(const col of ['emailDeliveries','fulfilledCheckouts','emailQuotaReservations']){
 await seed(col+'/sample',{status:'sent'});
 for(const [name,db] of [['owner',owner],['other',other],['anonymous',anon],['admin client',admin]]){
 for(const [op,fn] of [['read',()=>getDoc(doc(db,col+'/sample'))],['list',()=>getDocs(collection(db,col))],['create',()=>setDoc(doc(db,col+'/new'),{status:'sent'})],['update',()=>updateDoc(doc(db,col+'/sample'),{status:'changed'})],['delete',()=>deleteDoc(doc(db,col+'/sample'))]]){
 await test(col+' '+name+' '+op+' denied',()=>assertFails(fn()));
 }
 }
}
await test('admin user read allowed',()=>assertSucceeds(getDoc(doc(admin,path))));
await test('admin user delete allowed',()=>assertSucceeds(deleteDoc(doc(admin,path))));
await seed(path,base);
await test('admin nonowner user update denied',()=>assertFails(updateDoc(doc(admin,path),{emailConsent:false})));
await seed('school_accounts/school',{adminUid:'owner',name:'School'});
await test('public school read allowed',()=>assertSucceeds(getDoc(doc(anon,'school_accounts/school'))));
await test('signed in school create allowed',()=>assertSucceeds(setDoc(doc(other,'school_accounts/new-school'),{adminUid:'other'})));
await test('anonymous school create denied',()=>assertFails(setDoc(doc(anon,'school_accounts/anon-school'),{adminUid:'anon'})));
await test('school admin update allowed',()=>assertSucceeds(updateDoc(doc(owner,'school_accounts/school'),{name:'Updated'})));
await test('other school update denied',()=>assertFails(updateDoc(doc(other,'school_accounts/school'),{name:'Tampered'})));
await test('other school delete denied',()=>assertFails(deleteDoc(doc(other,'school_accounts/school'))));
await seed('school_accounts/school/students/student',{name:'Student'});
await test('signed in school student read allowed',()=>assertSucceeds(getDoc(doc(other,'school_accounts/school/students/student'))));
await test('signed in school student write allowed',()=>assertSucceeds(setDoc(doc(other,'school_accounts/school/students/new-student'),{name:'New'})));
await test('anonymous school student read denied',()=>assertFails(getDoc(doc(anon,'school_accounts/school/students/student'))));
await test('anonymous school student write denied',()=>assertFails(setDoc(doc(anon,'school_accounts/school/students/new-anon'),{name:'No'})));
await test('school admin delete allowed',()=>assertSucceeds(deleteDoc(doc(owner,'school_accounts/school'))));
}finally{await env.cleanup();}
fs.writeFileSync('results.json',JSON.stringify({sourceCommit:'6f259018930c4b20f4cf459d024ea2d8e13041fe',projectId,passed:results.filter(x=>x.status==='PASS').length,failed:results.filter(x=>x.status==='FAIL').length,results},null,2));
console.log('RESULT',results.filter(x=>x.status==='PASS').length,'PASS',results.filter(x=>x.status==='FAIL').length,'FAIL');
if(results.some(x=>x.status==='FAIL'))process.exitCode=1;
