// Run: node --test tests/mcp-v2-practice.test.cjs
// Real banks, pure graders and synthetic transactional Firestore. No network or credentials.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  discoverV2Practice, nextV2Practice, answerV2Practice,
  presentV2PracticeQuestion, parseV2PracticeAnswer,
} = require('../lib/server/mcpV2Practice.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { getBank } = require('../lib/v2/bank.ts');
const { drillKey, drillQuestions, EMPTY_DRILL } = require('../lib/v2/training.ts');
const { isCorrect } = require('../lib/v2/grading.ts');
const { basicsFor, basicsKey } = require('../lib/v2/basics.ts');
const { createSession } = require('../lib/v2/session.ts');
const copy = (x) => x === undefined ? undefined : structuredClone(x);
const exam = (id) => EXAMS_V2.find((e) => e.id === id);
const uid = 'synthetic-only';

class FakeDb {
  constructor(user = {}) {
    this.docs = new Map(user === null ? [] : [[`users/${uid}`, copy(user)]]);
    this.writes = [];
    this.lock = Promise.resolve();
  }
  collection(name) { return { doc: (id) => ({ path: `${name}/${id}` }) }; }
  runTransaction(fn) {
    // Serialize concurrent synthetic transactions to model commit conflict retries.
    const run = this.lock.then(async () => {
      const writes = [];
      const result = await fn({
        get: async (ref) => ({ exists: this.docs.has(ref.path), data: () => copy(this.docs.get(ref.path)) }),
        set: (ref, data) => writes.push({ op: 'set', path: ref.path, data: copy(data) }),
        update: (ref, data) => {
          if (Object.hasOwn(data, 'mcpProgressRevisions.v2')) {
            assert.equal(data['mcpProgressRevisions.v2'].constructor.name, 'NumericIncrementTransform');
            assert.equal(data['mcpProgressRevisions.v2'].operand, 1);
          }
          writes.push({ op: 'update', path: ref.path, data: copy(data) });
        },
        delete: (ref) => writes.push({ op: 'delete', path: ref.path }),
      });
      for (const write of writes) {
        if (write.op === 'delete') this.docs.delete(write.path);
        else if (write.op === 'set') this.docs.set(write.path, write.data);
        else {
          const data = this.docs.get(write.path);
          for (const [key, value] of Object.entries(write.data)) {
            const keys = key.split('.'); let target = data;
            for (const part of keys.slice(0, -1)) target = target[part] ??= {};
            target[keys.at(-1)] = key === 'mcpProgressRevisions.v2' ? (target[keys.at(-1)] ?? 0) + value.operand : value;
          }
        }
        this.writes.push(write);
      }
      return result;
    });
    this.lock = run.catch(() => {});
    return run;
  }
  user() { return this.docs.get(`users/${uid}`); }
  pending(id) { return this.docs.get(`mcpV2Practice/${uid}_${id}`); }
}
const state = (masteredIds = [], wrongQueue = []) => ({ masteredIds, wrongQueue, seen: masteredIds.length + wrongQueue.length, correct: masteredIds.length });
const start = (db, id, drill) => nextV2Practice(uid, id, db, { practice: true, ...(drill ? { drillKey: drill } : {}) });
const correctResponse = (id, pending) => {
  const q = getBank(id).questions.find((q) => q.id === pending.questionId);
  return q.format === 'numeric' ? q.numeric.answers[0] : ['single', 'multi', 'order'].includes(q.format) ? q.correct.map((index) => pending.optionOrder.indexOf(index)) : q.correct;
};
const respond = (db, id, raw) => {
  const pending = copy(db.pending(id));
  return answerV2Practice(uid, id, pending.questionId, raw ?? correctResponse(id, pending), db, pending.attemptId);
};

test('discovers all 15 registered exams and progress including Basics-only accounts', () => {
  assert.equal(discoverV2Practice({}).length, 0);
  assert.equal(discoverV2Practice({primaryExam:'sat'}).length, 0, 'last dashboard alone is not saved started progress');
  const all = discoverV2Practice({ startedExams: EXAMS_V2.map((e) => e.id) });
  assert.equal(all.length, EXAMS_V2.length);
  for (const row of all) {
    assert.ok(row.drills.length > 0, row.id);
    assert.ok(row.drills.every((d) => d.total > 0), row.id);
    assert.ok(row.url.endsWith('/dashboard'));
  }
  const d = exam('timestables').drills[0];
  const skill = basicsFor(d)[0];
  const rows = discoverV2Practice({ v2: { basics: { [basicsKey('timestables', skill.id)]: { done: true } } } });
  assert.deepEqual(rows.map((r) => r.id), ['timestables']);
});

test('every registered exam can serve a real free drill question without exposing the answer', async () => {
  for (const e of EXAMS_V2) {
    const db = new FakeDb();
    const result = await start(db, e.id);
    assert.equal(result.ok, true, e.id);
    const q = result.data.question;
    assert.ok(q?.questionId && q.attemptId, e.id);
    for (const key of ['correct', 'correctAnswer', 'explanation', 'numeric']) assert.equal(Object.hasOwn(q, key), false, `${e.id}:${key}`);
    assert.equal(result.data.answerWith.tool, 'submit_study_answer');
    assert.equal(result.data.answerWith.examId, e.id);
    assert.equal(db.writes.some((w) => w.path.startsWith('users/')), false, 'serving does not create learning progress');
    const answer = await respond(db, e.id);
    assert.equal(answer.ok, true, e.id);
    assert.equal(answer.data.isCorrect, true, e.id);
    assert.equal(answer.data.progress.mastered, 1, e.id);
  }
});

test('all eight formats map displayed answers faithfully and reject malformed selections', () => {
  const basic = { id: 'TEST', section: 'a', test: 0, module: 1, domain: 'x', difficulty: 1, stem: 'Question', explanation: 'Explanation' };
  const fixtures = [
    [{ ...basic, format: 'single', options: ['wrong', 'right'], correct: [1] }, [1, 0], 'A', [1]],
    [{ ...basic, format: 'multi', options: ['yes', 'no', 'yes'], correct: [0, 2], select: 2 }, [2, 1, 0], 'A,C', [2, 0]],
    [{ ...basic, format: 'numeric', numeric: { answers: ['0.75'] } }, [], '3/4', '3/4'],
    [{ ...basic, format: 'order', options: ['first', 'second', 'third'], correct: [0, 1, 2] }, [2, 0, 1], 'B,C,A', [0, 1, 2]],
    [{ ...basic, format: 'highlight', passage: '{{red}} {{green}} {{blue}}', correct: [0, 2] }, [], 'A,C', [0, 2]],
    [{ ...basic, format: 'matrix', rows: ['one', 'two'], columns: ['yes', 'no'], correct: [1, 1] }, [], 'B,B', [1, 1]],
    [{ ...basic, format: 'cloze', blanks: [['a', 'b'], ['a', 'b', 'c']], correct: [1, 2] }, [], 'B,C', [1, 2]],
    [{ ...basic, format: 'bowtie', groups: [{label:'Action',pick:1,options:['a','b']},{label:'Condition',pick:1,options:['c','d']},{label:'Monitor',pick:1,options:['e','f']}], correct: [0, 3, 4] }, [], 'A,D,E', [0, 3, 4]],
  ];
  for (const [q, order, raw, expected] of fixtures) {
    const value = parseV2PracticeAnswer(q, raw, order);
    assert.deepEqual(value, expected, q.format);
    assert.equal(isCorrect(q, value), true, q.format);
    assert.equal(parseV2PracticeAnswer(q, 'Z', order), null, q.format);
    assert.equal(parseV2PracticeAnswer(q, [-1], order), null, q.format);
    assert.equal(parseV2PracticeAnswer(q, [Infinity], order), null, q.format);
  }
  for (const n of [0, 1, 3, 4, 7]) assert.equal(parseV2PracticeAnswer(fixtures[n][0], 'A,A', fixtures[n][1]), null);
  assert.equal(parseV2PracticeAnswer(fixtures[0][0], 'A B', fixtures[0][1]), null);
  assert.equal(parseV2PracticeAnswer(fixtures[1][0], 'A', fixtures[1][1]), null);
  assert.equal(parseV2PracticeAnswer(fixtures[3][0], 'A B', fixtures[3][1]), null);
  assert.equal(parseV2PracticeAnswer(fixtures[5][0], 'A', []), null);
  assert.equal(parseV2PracticeAnswer(fixtures[6][0], 'C C', []), null);
  assert.equal(parseV2PracticeAnswer(fixtures[7][0], 'A B C', []), null);
});

test('complex real questions preserve shared cases, item updates, markers and figures', () => {
  const bank = getBank('nclex');
  const caseItem = bank.questions.find((q) => q.stimulusId && q.passage && q.format === 'highlight');
  assert.ok(caseItem);
  const shown = presentV2PracticeQuestion('nclex', caseItem, [], 'attempt');
  assert.match(shown.stimulus.text, /New information/);
  assert.match(shown.stimulus.text, /The case so far/);
  assert.match(shown.stimulus.text, /\[A: /);
  assert.doesNotMatch(shown.stimulus.text, /\{\{/);
  const figureItem = EXAMS_V2.flatMap((e) => getBank(e.id).questions.map((q) => ({e,q}))).find(({q}) => q.figure);
  assert.ok(figureItem);
  const figureShown = presentV2PracticeQuestion(figureItem.e.id, figureItem.q, (figureItem.q.options ?? []).map((_,i) => i), 'attempt');
  assert.match(figureShown.figure.src, /^https?:\/\//);
  assert.equal(figureShown.figure.alt, figureItem.q.figure.alt);
});

test('full sessions hand off by default; explicit practice preserves all session and unrelated fields', async () => {
  const e = exam('sat'); const session = createSession(e, getBank(e.id).questions, 1);
  const user = { subscription: { isPremium: false }, selectedState: 'CA', trainingSets: { 2: state(['dmv']) },
    v2: { sessions: { [session.key]: session }, goals: { sat: 1400 }, basics: { 'sat:saved': {done:true} }, results: [], drills: { 'aws:concepts': state(['unrelated-question']) } } };
  const db = new FakeDb(user);
  const handoff = await nextV2Practice(uid, e.id, db);
  assert.equal(handoff.data.mode, 'web');
  assert.equal(handoff.data.webSessions[0].testNumber, 1);
  assert.equal(db.writes.length, 0);
  const practice = await start(db, e.id);
  assert.equal(practice.data.mode, 'practice');
  assert.equal(practice.data.webSessions.length, 1);
  await respond(db, e.id);
  assert.deepEqual(db.user().v2.sessions, user.v2.sessions);
  assert.deepEqual(db.user().v2.basics, user.v2.basics);
  assert.deepEqual(db.user().v2.goals, user.v2.goals);
  assert.deepEqual(db.user().trainingSets, user.trainingSets);
  assert.deepEqual(db.user().v2.drills['aws:concepts'], user.v2.drills['aws:concepts']);
  const writes = db.writes.filter((w) => w.path === `users/${uid}`);
  assert.equal(writes.length, 1);
  assert.equal(db.user().mcpProgressRevisions.v2, 1);
  assert.equal(writes[0].data['mcpProgressRevisions.v2'].operand, 1);
  assert.ok(Object.keys(writes[0].data).every((k) => k.startsWith('v2.drills.') || ['v2.updatedAt','lastUpdated','mcpProgressRevisions.v2'].includes(k) || k.startsWith('dailyQuestionCounts.')));
});

test('premium locks, own-progress grandfathering, Basics grandfathering and legacy carryover match the site', async () => {
  const e = exam('act'); const locked = e.drills.find((d) => e.premium.lockedDrills.includes(d.key) && d.legacyKey);
  const pool = drillQuestions(getBank(e.id).questions, locked, e);
  const legacy = { [`${e.id}:${locked.legacyKey}`]: state(pool.slice(0,2).map((q) => q.id)) };
  const blocked = new FakeDb({v2:{drills:legacy}});
  assert.equal((await start(blocked,e.id,locked.key)).code, 'PREMIUM_REQUIRED', 'legacy progress does not unlock a new paid drill');
  assert.equal(blocked.writes.length, 0);
  const existing = new FakeDb({v2:{drills:{ [drillKey(e.id,locked.key)]: copy(EMPTY_DRILL) }}});
  assert.equal((await start(existing,e.id,locked.key)).ok, true, 'even an existing empty own drill is grandfathered');
  const skill = basicsFor(locked)[0];
  const learned = new FakeDb({v2:{drills:legacy,basics:{[basicsKey(e.id,skill.id)]:{done:true}}}});
  const run = await start(learned,e.id,locked.key);
  assert.equal(run.ok,true);
  assert.equal(run.data.progress.mastered,2,'legacy mastered items seed a newly open drill');
  assert.ok(!legacy[`${e.id}:${locked.legacyKey}`].masteredIds.includes(run.data.question.questionId));
  await respond(learned,e.id);
  assert.equal(learned.user().v2.drills[drillKey(e.id,locked.key)].masteredIds.length,3);
  assert.deepEqual(learned.user().v2.drills[`${e.id}:${locked.legacyKey}`],legacy[`${e.id}:${locked.legacyKey}`]);
});

test('pending attempt is stable, shuffled choices grade correctly and concurrent retries count once', async () => {
  const db = new FakeDb();
  const one = await start(db,'aws'); const two = await start(db,'aws');
  assert.deepEqual(one.data.question,two.data.question);
  const pending = copy(db.pending('aws')); const answer = correctResponse('aws',pending);
  const outcomes = await Promise.all([1,2].map(() => answerV2Practice(uid,'aws',pending.questionId,answer,db,pending.attemptId)));
  assert.equal(outcomes.filter((x) => x.ok).length,1);
  assert.equal(outcomes.find((x) => !x.ok).code,'STALE_QUESTION');
  assert.equal(db.user().v2.drills[drillKey('aws',pending.drill)].seen,1);
  assert.equal(Object.values(db.user().dailyQuestionCounts)[0],1);
  assert.equal((await answerV2Practice(uid,'aws',pending.questionId,answer,db)).code,'ATTEMPT_REQUIRED');
  assert.equal((await answerV2Practice('another-user','aws',pending.questionId,answer,db,pending.attemptId)).code,'USER_NOT_FOUND');
  db.docs.set('users/another-user', {startedExams:['aws']});
  assert.equal((await answerV2Practice('another-user','aws',pending.questionId,answer,db,pending.attemptId)).code,'STALE_QUESTION');
  assert.deepEqual(db.docs.get('users/another-user'),{startedExams:['aws']});
});

test('last wrong item repeats with a new token, rejects replay and then masters its targeted drill', async () => {
  const e=exam('timestables'), drill=e.drills[0], pool=drillQuestions(getBank(e.id).questions,drill,e);
  const target=pool.find((q) => q.format==='numeric');
  const mastered=pool.filter((q) => q.id!==target.id).map((q) => q.id);
  const db=new FakeDb({v2:{drills:{[drillKey(e.id,drill.key)]:state(mastered)}}});
  await start(db,e.id,drill.key); const old=copy(db.pending(e.id));
  const wrong=await respond(db,e.id,'-999999');
  assert.equal(wrong.data.isCorrect,false);
  assert.equal(wrong.data.next.questionId,target.id);
  assert.notEqual(wrong.data.next.attemptId,old.attemptId);
  const replay=await answerV2Practice(uid,e.id,old.questionId,'-999999',db,old.attemptId);
  assert.equal(replay.code,'STALE_QUESTION');
  const right=await respond(db,e.id);
  assert.equal(right.data.progress.complete,true);
  assert.equal(right.data.complete,true);
  assert.equal(right.data.next,null);
  assert.equal(db.pending(e.id),undefined);
  assert.equal(db.user().v2.drills[drillKey(e.id,drill.key)].seen,mastered.length+2);
});

test('invalid answers, unknown targets and exhausted daily cap make no progress writes', async () => {
  const db=new FakeDb();
  assert.equal((await start(db,'not-an-exam')).code,'EXAM_NOT_FOUND');
  assert.equal((await start(db,'sat','missing')).code,'DRILL_NOT_FOUND');
  assert.equal((await start(new FakeDb(null),'sat')).code,'USER_NOT_FOUND');
  await start(db,'aws'); const pending=copy(db.pending('aws')); const writes=db.writes.length;
  assert.equal((await answerV2Practice(uid,'aws',pending.questionId,'Z',db,pending.attemptId)).code,'BAD_ANSWER');
  assert.equal(db.writes.length,writes);
  db.user().dailyQuestionCounts={ [new Date().toISOString().slice(0,10)]:500 };
  assert.equal((await respond(db,'aws')).code,'RATE_LIMIT_DAILY');
  assert.equal(db.writes.length,writes);
  assert.equal(db.user().v2,undefined);
});

test('held-out test questions never enter study drills and complete available work does not claim test completion', async () => {
  for(const e of EXAMS_V2) {
    const heldOut=e.tests.filter((t) => t.heldOut).map((t) => t.number);
    for(const d of e.drills) assert.ok(drillQuestions(getBank(e.id).questions,d,e).every((q) => !heldOut.includes(q.test)),`${e.id}:${d.key}`);
  }
  const e=exam('sat'); const drills={};
  for(const d of e.drills.filter((d) => !e.premium.lockedDrills.includes(d.key))) drills[drillKey(e.id,d.key)]=state(drillQuestions(getBank(e.id).questions,d,e).map((q) => q.id));
  const result=await start(new FakeDb({v2:{drills}}),e.id);
  assert.equal(result.data.complete,true);
  assert.equal(result.data.scope,'available_drills');
  assert.ok(result.data.lockedDrills.length>0);
  assert.match(result.data.message,/does not complete Basics lessons or full practice tests/);
});

test('every real question round-trips its canonical key through displayed-index mapping and existing grading', () => {
  const formats=new Set(); let checked=0;
  for(const e of EXAMS_V2) for(const q of getBank(e.id).questions) {
    const order=(q.options ?? []).map((_,i) => i).reverse();
    const response=q.format==='numeric' ? q.numeric.answers[0] : ['single','multi','order'].includes(q.format) ? q.correct.map((i) => order.indexOf(i)) : q.correct;
    const value=parseV2PracticeAnswer(q,response,order);
    assert.notEqual(value,null,`${e.id}:${q.id}:${q.format}`);
    assert.equal(isCorrect(q,value),true,`${e.id}:${q.id}:${q.format}`);
    formats.add(q.format); checked++;
  }
  assert.equal(formats.size,8);
  assert.ok(checked>3000);
});

test('each real complex format completes a canonical shared drill transaction, not merely a formatter test', async () => {
  for(const format of ['single','multi','numeric','order','highlight','matrix','cloze','bowtie']) {
    let selection;
    for(const e of EXAMS_V2) {
      for(const d of e.drills) {
        const pool=drillQuestions(getBank(e.id).questions,d,e);
        const q=pool.find((q) => q.format===format);
        if(q) {selection={e,d,pool,q};break;}
      }
      if(selection) break;
    }
    assert.ok(selection,format);
    const {e,d,pool,q}=selection;
    const before=state(pool.filter((p) => p.id!==q.id).map((p) => p.id));
    const db=new FakeDb({v2:{drills:{[drillKey(e.id,d.key)]:before}}});
    const started=await start(db,e.id,d.key);
    assert.equal(started.data.question.questionId,q.id,format);
    const count=db.writes.length;
    assert.equal((await respond(db,e.id,'Z')).code,'BAD_ANSWER',format);
    assert.equal(db.writes.length,count,format);
    const finished=await respond(db,e.id);
    assert.equal(finished.data.isCorrect,true,format);
    assert.equal(finished.data.scope,'drill');
    assert.equal(finished.data.progress.mastered,pool.length,format);
    assert.equal(finished.data.next,null,format);
  }
});
