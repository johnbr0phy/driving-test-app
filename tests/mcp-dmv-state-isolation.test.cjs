// Only synthetic Firestore transactions; no real credentials or network.
require('tsx/cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {setSelectedState}=require('../lib/server/progress.ts');
const {getExamById}=require('../lib/exams.ts');

function database(initial) {
 let data=initial===undefined?undefined:structuredClone(initial);
 const writes=[];let transactions=0;const ref={id:'alice'};
 return {writes,get data(){return data;},get transactions(){return transactions;},collection(name){assert.equal(name,'users');return{doc(uid){assert.equal(uid,'alice');return ref;}}},async runTransaction(fn){
  transactions++;
  const record=(payload,kind)=>{
   const increment=kind==='update'?payload['mcpProgressRevisions.catalog']:payload.mcpProgressRevisions.catalog;
   assert.equal(increment.constructor.name,'NumericIncrementTransform');assert.equal(increment.operand,1);
   writes.push({kind,payload});
   const {mcpProgressRevisions,...rest}=payload;delete rest['mcpProgressRevisions.catalog'];
   data={...data,...rest,mcpProgressRevisions:{...data?.mcpProgressRevisions,catalog:(data?.mcpProgressRevisions?.catalog??0)+1}};
  };
  return fn({get:async(r)=>{assert.equal(r,ref);return{exists:data!==undefined,data:()=>data};},update:(r,p)=>{assert.equal(r,ref);record(p,'update');},set:(r,p,o)=>{assert.equal(r,ref);assert.deepEqual(o,{merge:true});record(p,'set');}});
 }};
}

test('changing DMV state preserves registry exams, jurisdiction variants and all other namespaces atomically',async()=>{
 const cna=getExamById('cna'), ca=getExamById('realestate-ca');
 const fixture={
  selectedState:'NY',
  currentTests:{1:{answers:{0:'A'}},[cna.idBase+1]:{answers:{0:'B'},startedAt:'saved'},[ca.idBase+1]:{answers:{1:'C'}}},
  trainingSets:{1:{masteredIds:['UNIV-001'],wrongQueue:[]},[cna.trainingSets[0].id]:{masteredIds:[`${cna.questionIdPrefix}001`],wrongQueue:[]},[ca.trainingSets[0].id]:{masteredIds:[],wrongQueue:[`${ca.questionIdPrefix}001`]}},
  completedTests:[{testNumber:1,state:'NY'},{testNumber:cna.idBase+1,state:cna.stateCode},{testNumber:ca.idBase+1,state:ca.stateCode}],
  testAttempts:[{testNumber:1,state:'NY'},{testNumber:cna.idBase+1,state:cna.stateCode},{testNumber:ca.idBase+1,state:ca.stateCode}],
  trainingAnswerHistory:[{questionId:'UNIV-001',isCorrect:true},{questionId:`${cna.questionIdPrefix}001`,isCorrect:true},{questionId:`${ca.questionIdPrefix}001`,isCorrect:false}],
  training:{questionsAnswered:['UNIV-001'],correctCount:1,incorrectCount:0,currentStreak:1,bestStreak:1,totalCorrectAllTime:1,masteredQuestionIds:['UNIV-001'],lastQuestionId:'UNIV-001'},
  v2:{drills:{'sat:craft':{masteredIds:['SAT-001']}}},quizProgress:{progress:{AAAAAA:{masteredIds:['AAAAAA-q1']}}},
  mcpCatalogPending:{cna:{questionId:'CNA-002',attemptId:'pending',setNumber:1}},
  mcpProgressRevisions:{catalog:4,v2:8,quiz:3},subscription:{isPremium:true},examStates:{realestate:'CA'},startedExams:['cna','realestate'],
 };
 const db=database(fixture);const result=await setSelectedState('alice','CA',db);
 assert.equal(result.ok,true);assert.equal(db.transactions,1);assert.equal(db.writes.length,1);
 assert.equal(db.data.selectedState,'CA');
 assert.deepEqual(db.data.currentTests,{[cna.idBase+1]:fixture.currentTests[cna.idBase+1],[ca.idBase+1]:fixture.currentTests[ca.idBase+1]});
 assert.deepEqual(db.data.trainingSets,{[cna.trainingSets[0].id]:fixture.trainingSets[cna.trainingSets[0].id],[ca.trainingSets[0].id]:fixture.trainingSets[ca.trainingSets[0].id]});
 assert.deepEqual(db.data.completedTests,fixture.completedTests.slice(1));assert.deepEqual(db.data.testAttempts,fixture.testAttempts.slice(1));
 assert.deepEqual(db.data.trainingAnswerHistory,fixture.trainingAnswerHistory.slice(1));
 assert.deepEqual(db.data.training,{questionsAnswered:[],correctCount:0,incorrectCount:0,currentStreak:0,bestStreak:0,totalCorrectAllTime:0,masteredQuestionIds:[],lastQuestionId:null});
 for(const key of ['v2','quizProgress','mcpCatalogPending','subscription','examStates','startedExams'])assert.deepEqual(db.data[key],fixture[key],key);
 assert.deepEqual(db.data.mcpProgressRevisions,{catalog:5,v2:8,quiz:3});
});

test('first DMV state uses merge creation with a revision and empty DMV defaults',async()=>{
 const db=database();const result=await setSelectedState('alice','TX',db);
 assert.equal(result.ok,true);assert.equal(db.writes[0].kind,'set');assert.equal(db.data.selectedState,'TX');
 assert.deepEqual(db.data.currentTests,{});assert.deepEqual(db.data.trainingSets,{});assert.deepEqual(db.data.completedTests,[]);
 assert.deepEqual(db.data.mcpProgressRevisions,{catalog:1});
});
