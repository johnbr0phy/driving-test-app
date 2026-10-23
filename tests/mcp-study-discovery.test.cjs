require('tsx/cjs');const {test}=require('node:test');const assert=require('node:assert/strict');
const {listInProgressTests,studyProgress}=require('../lib/server/mcpStudyProgress.ts');const {registerTools}=require('../lib/server/mcp-tools.ts');
const docs={alice:{selectedState:'CA',startedExams:['cna','timestables'],v2:{drills:{'timestables:table-2':{masteredIds:[],wrongQueue:[],seen:1,correct:0}}}},bob:{selectedState:'TX',startedExams:['htl']}};
const reads=[];const db={collection(name){assert.equal(name,'users');return{doc(uid){reads.push(uid);return{async get(){return{exists:!!docs[uid],data:()=>docs[uid]}}}}}}};
test('discovery reads only authenticated account and separates exams; no data for another account leaks',async()=>{
 const a=await listInProgressTests('alice',db);assert.equal(a.ok,true);const ids=a.data.tests.map(x=>x.id);assert.ok(ids.includes('dmv'));assert.ok(ids.includes('cna'));assert.ok(ids.includes('timestables'));assert.ok(!ids.includes('htl'));assert.match(JSON.stringify(a),/CA DMV/);assert.doesNotMatch(JSON.stringify(a),/TX DMV/);assert.deepEqual(reads,['alice']);
 const b=await listInProgressTests('bob',db);assert.ok(b.data.tests.some(x=>x.id==='htl'));assert.ok(!b.data.tests.some(x=>x.id==='cna'));
 assert.equal((await listInProgressTests('missing',db)).code,'USER_NOT_FOUND');
});
test('study tools register authenticated-only inputs without replacing compatible DMV or quiz tools',()=>{
 const entries=new Map();registerTools({registerTool:(n,c,h)=>entries.set(n,{c,h}),registerPrompt(){}},{userId:'alice'});
 for(const name of ['list_in_progress_tests','get_study_progress','start_study_practice','submit_study_answer']){const e=entries.get(name);assert.ok(e,name);assert.ok(!Object.keys(e.c.inputSchema).includes('userId'));assert.ok(!Object.keys(e.c.inputSchema).includes('uid'));}
 for(const name of ['quiz_me','answer','start_practice_test','submit_practice_test','get_progress','create_quiz'])assert.ok(entries.has(name),name);
 assert.ok(entries.get('submit_study_answer').c.inputSchema.attemptId);assert.match(entries.get('start_study_practice').c.description,/Timed\/adaptive/);
});
test('unknown progress ids are not interpreted as arbitrary document paths',async()=>{assert.equal((await studyProgress('alice','../bob',db)).code,'EXAM_NOT_FOUND');});

test('private custom quizzes are visible only to their owner; all lookups use the injected database', async () => {
 const saved=(code)=>({masteredIds:[`${code}-q1`],wrongQueue:[],answers:[{q:`${code}-q1`,ok:true,t:'2026-01-01T00:00:00Z'}],tests:[],known:[],lastPlayedAt:'2026-01-01T00:00:00Z'});
 const quiz=(code,ownerUid,visibility,title)=>({code,ownerUid,visibility,title,questions:[{id:'q1',question:'Fixture',options:['a','b','c','d'],correctIndex:0,topic:'Example'}]});
 const records={
  'users/alice':{quizProgress:{progress:{AAAAAA:saved('AAAAAA'),BBBBBB:saved('BBBBBB'),CCCCCC:saved('CCCCCC'),DDDDDD:saved('DDDDDD')},recent:[{code:'EEEEEE'},{code:'../../other'}]}},
  'users/bob':{quizProgress:{progress:{AAAAAA:saved('AAAAAA'),BBBBBB:saved('BBBBBB')}}},
  'quizzes/AAAAAA':quiz('AAAAAA','alice','private','Alice private'),
  'quizzes/BBBBBB':quiz('BBBBBB','bob','private','Bob secret'),
  'quizzes/CCCCCC':quiz('CCCCCC','bob','link','Shared by link'),
  'quizzes/DDDDDD':quiz('DDDDDD','bob','public','Public example'),
 };
 const lookedUp=[];
 const injected={collection(name){assert.ok(['users','quizzes','mcpQuizPlay'].includes(name));return{doc(id){assert.ok(!id.includes('/'),'do not turn untrusted codes into document paths');const path=`${name}/${id}`;return{async get(){lookedUp.push(path);return{exists:Object.hasOwn(records,path),data:()=>records[path]}}};}}}};
 const alice=await listInProgressTests('alice',injected);
 assert.equal(alice.ok,true);
 assert.deepEqual(alice.data.tests.map(t=>t.id).sort(),['quiz:AAAAAA','quiz:CCCCCC','quiz:DDDDDD']);
 assert.doesNotMatch(JSON.stringify(alice),/Bob secret|correctIndex|Fixture/);
 assert.ok(!lookedUp.includes('users/bob'));
 const denied=await studyProgress('alice','quiz:BBBBBB',injected);
 assert.equal(denied.code,'QUIZ_PRIVATE');
 assert.doesNotMatch(JSON.stringify(denied),/Bob secret/);
 const own=await studyProgress('alice','quiz:AAAAAA',injected);
 assert.equal(own.ok,true);assert.equal(own.data.progress.mastered,1);assert.equal(own.data.weakTopics[0].accuracy,100);
 assert.ok(lookedUp.includes('mcpQuizPlay/alice_AAAAAA'));
 const bob=await listInProgressTests('bob',injected);
 assert.deepEqual(bob.data.tests.map(t=>t.id),['quiz:BBBBBB']);
 const invalid=await studyProgress('alice','quiz:../../other',injected);
 assert.equal(invalid.code,'QUIZ_NOT_FOUND');
});

test('incompatible selector combinations are rejected before opening any database', async () => {
 const {readFileSync}=require('node:fs');const path=require('node:path');const {createRequire}=require('node:module');const ts=require('typescript');
 const filename=path.resolve(__dirname,'../lib/server/mcp-tools.ts');const localRequire=createRequire(filename);let databaseCalls=0;
 const blocked=()=>{databaseCalls++;throw Error('must not reach a database-backed provider for incompatible selectors');};
 const overrides={
  '@/lib/firebase-admin':{getAdminDb:blocked},
  '@/lib/server/mcpCatalogPractice':{nextCatalogPractice:blocked},
  '@/lib/server/mcpV2Practice':{nextV2Practice:blocked},
  '@/lib/server/mcpQuizPlay':{loadPlayableQuiz:blocked},
  '@/lib/server/progress':{getUser:blocked},
 };
 const code=ts.transpileModule(readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true},fileName:filename}).outputText;
 const loaded={};new Function('require','exports',code)((id)=>{
  const actual=localRequire(id.startsWith('@/')?path.resolve(__dirname,'..',id.slice(2)):id);
  return overrides[id]?{...actual,...overrides[id]}:actual;
 },loaded);
 const entries=new Map();loaded.registerTools({registerTool:(n,c,h)=>entries.set(n,{c,h}),registerPrompt(){}},{userId:'synthetic-selector-only'});
 for(const args of [
  {examId:'sat',setNumber:1}, {examId:'cna',drillKey:'reading'},
  {examId:'sat',setNumber:1,drillKey:'reading'}, {examId:'dmv',setNumber:1},
  {examId:'quiz:AAAAAA',drillKey:'reading'}, {examId:'quiz:AAAAAA',setNumber:1},
 ]) {
  const response=await entries.get('start_study_practice').h(args);
  assert.equal(response.isError,true);
  assert.equal(JSON.parse(response.content[0].text).code,'INVALID_SELECTOR',JSON.stringify(args));
 }
 assert.equal(databaseCalls,0);
 // Prove the import boundary is actually stubbed, not a silent assignment
 // to tsx's read-only export getter.
 await assert.rejects(()=>entries.get('start_study_practice').h({examId:'sat'}),/must not reach a database-backed provider/);
 assert.equal(databaseCalls,1);
});
