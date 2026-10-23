require('tsx/cjs');
const {test}=require('node:test');const assert=require('node:assert/strict');
const {startedCatalogExams,catalogProgress,nextCatalogPractice,answerCatalogPractice}=require('../lib/server/mcpCatalogPractice.ts');
const {getExamById}=require('../lib/exams.ts');const {getExamTrainingSetQuestions}=require('../lib/examTestGenerator.ts');
function database(data){const writes=[];const ref={id:'alice'};return {data,writes,collection(name){assert.equal(name,'users');return{doc(uid){assert.equal(uid,'alice');return ref}}},async runTransaction(fn){return fn({get:async()=>({exists:true,data:()=>data}),update(_,patch){writes.push(patch);for(const [path,value]of Object.entries(patch)){const keys=path.split('.');let o=data;for(const key of keys.slice(0,-1))o=o[key]??=( {} );const key=keys.at(-1);if(value?.constructor?.name==='DeleteTransform')delete o[key];else o[key]=value;}}})}}}
test('catalog discovery follows saved progress and retains exact jurisdiction',()=>{
 const ids=startedCatalogExams({startedExams:['sat','realestate'],examStates:{realestate:'CA'},currentTests:{201:{}},trainingSets:{601:{masteredIds:[],wrongQueue:[]}}}).map(e=>e.id);
 assert.ok(ids.includes('realestate-ca'));assert.ok(!ids.includes('realestate'));assert.ok(!ids.includes('sat'));assert.ok(ids.includes('htl'));
});
test('catalog practice resumes web mastery, hides answers, rejects replay and preserves other fields',async()=>{
 const exam=getExamById('cna'),qs=getExamTrainingSetQuestions(exam,1);const first=qs[0],second=qs[1];const id=exam.trainingSets[0].id;
 const db=database({trainingSets:{[id]:{masteredIds:[first.questionId],wrongQueue:[]},9999:{masteredIds:['other'],wrongQueue:[]}},currentTests:{[exam.idBase+1]:{answers:{0:'A'}}},v2:{sentinel:true},quizProgress:{sentinel:true}});
 const r=await nextCatalogPractice('alice','cna',db,1);assert.equal(r.ok,true);assert.equal(r.data.question.questionId,second.questionId);assert.equal(r.data.question.correctAnswer,undefined);assert.equal(r.data.question.explanation,undefined);
 const same=await nextCatalogPractice('alice','cna',db,1);assert.equal(same.data.attemptId,r.data.attemptId);
 const a=await answerCatalogPractice('alice','cna',second.questionId,second.correctAnswer,r.data.attemptId,db);assert.equal(a.ok,true);assert.equal(a.data.isCorrect,true);assert.ok(db.data.trainingSets[id].masteredIds.includes(second.questionId));
 const replay=await answerCatalogPractice('alice','cna',second.questionId,second.correctAnswer,r.data.attemptId,db);assert.equal(replay.code,'STALE_QUESTION');assert.equal(db.data.trainingAnswerHistory.length,1);assert.deepEqual(db.data.v2,{sentinel:true});assert.deepEqual(db.data.quizProgress,{sentinel:true});assert.deepEqual(db.data.currentTests[exam.idBase+1].answers,{0:'A'});assert.deepEqual(db.data.trainingSets[9999].masteredIds,['other']);
 assert.equal(a.data.progress.weakTopics[0].answered,1);assert.ok(db.writes.some(p=>p['mcpProgressRevisions.catalog']?.constructor?.name==='NumericIncrementTransform'));
});
test('wrong answers stay queued and daily cap does not change progress',async()=>{
 const exam=getExamById('cna'),db=database({});const r=await nextCatalogPractice('alice','cna',db,1);const q=getExamTrainingSetQuestions(exam,1).find(q=>q.questionId===r.data.question.questionId);const wrong=['A','B','C','D'].find(x=>x!==q.correctAnswer);
 const a=await answerCatalogPractice('alice','cna',q.questionId,wrong,r.data.attemptId,db);assert.equal(a.data.isCorrect,false);assert.ok(db.data.trainingSets[exam.trainingSets[0].id].wrongQueue.includes(q.questionId));assert.notEqual(a.data.next.questionId,q.questionId);
 db.data.dailyQuestionCounts={[new Date().toISOString().slice(0,10)]:500};const before=db.writes.length;const limit=await answerCatalogPractice('alice','cna',a.data.next.questionId,'A',a.data.attemptId,db);assert.equal(limit.code,'DAILY_LIMIT');assert.equal(db.writes.length,before);
});
test('invalid exam and set selectors never open the database',async()=>{
 const db={collection(){throw Error('must not access')}};assert.equal((await nextCatalogPractice('alice','../other',db)).code,'EXAM_NOT_FOUND');assert.equal((await nextCatalogPractice('alice','cna',db,999)).code,'INVALID_SET');
});
test('retired pending set is replaced on resume and rejected safely on answer',async()=>{
 const db=database({mcpCatalogPending:{cna:{setNumber:999,questionId:'old',attemptId:'old-token'}}});
 assert.equal((await answerCatalogPractice('alice','cna','old','A','old-token',db)).code,'STALE_QUESTION');
 const r=await nextCatalogPractice('alice','cna',db);assert.equal(r.ok,true);assert.notEqual(r.data.attemptId,'old-token');
});

test('HTL legacy staining splits match the browser without replacing existing own progress',async()=>{
 const exam=getExamById('htl');
 const original={masteredIds:['HTL-STN-001','HTL-STN-013','HTL-STN-019'],wrongQueue:['HTL-STN-002']};
 const db=database({trainingSets:{204:original,208:{masteredIds:[],wrongQueue:[]},9999:{masteredIds:['unrelated'],wrongQueue:[]}}});
 const progress=catalogProgress(exam,db.data);
 assert.equal(progress.sets.find(s=>s.setNumber===4).mastered,1);
 assert.equal(progress.sets.find(s=>s.setNumber===4).wrongQueueSize,1);
 assert.equal(progress.sets.find(s=>s.setNumber===5).mastered,1);
 assert.equal(progress.sets.find(s=>s.setNumber===6).mastered,0,'own empty set beats inherited legacy mastery');
 assert.equal(db.data.trainingSets[206],undefined,'progress lookup does not mutate source');
 const r=await nextCatalogPractice('alice','htl',db,4);
 assert.equal(r.ok,true);assert.notEqual(r.data.question.questionId,'HTL-STN-001');assert.notEqual(r.data.question.questionId,'HTL-STN-002','fresh questions precede retries');
 const q=getExamTrainingSetQuestions(exam,4).find(q=>q.questionId===r.data.question.questionId);
 const answer=await answerCatalogPractice('alice','htl',q.questionId,q.correctAnswer,r.data.attemptId,db);
 assert.equal(answer.ok,true);
 assert.ok(db.data.trainingSets[206].masteredIds.includes('HTL-STN-001'));
 assert.ok(db.data.trainingSets[206].masteredIds.includes(q.questionId));
 assert.deepEqual(db.data.trainingSets[206].wrongQueue,['HTL-STN-002']);
 assert.deepEqual(db.data.trainingSets[207].masteredIds,['HTL-STN-013']);
 assert.deepEqual(db.data.trainingSets[208],{masteredIds:[],wrongQueue:[]});
 assert.deepEqual(db.data.trainingSets[204],original);
 assert.deepEqual(db.data.trainingSets[9999],{masteredIds:['unrelated'],wrongQueue:[]});
});

test('practicing another exam does not materialize unrelated HTL legacy sets',async()=>{
 const db=database({trainingSets:{204:{masteredIds:['HTL-STN-001'],wrongQueue:[]}}});
 const exam=getExamById('cna');const r=await nextCatalogPractice('alice','cna',db,1);
 const q=getExamTrainingSetQuestions(exam,1).find(q=>q.questionId===r.data.question.questionId);
 const a=await answerCatalogPractice('alice','cna',q.questionId,q.correctAnswer,r.data.attemptId,db);
 assert.equal(a.ok,true);assert.equal(db.data.trainingSets[206],undefined);
 assert.deepEqual(db.data.trainingSets[204],{masteredIds:['HTL-STN-001'],wrongQueue:[]});
 assert.ok(db.writes.every(p=>!Object.keys(p).some(key=>/^trainingSets\.20[5-9]$|^trainingSets\.21[01]$/.test(key))));
});
