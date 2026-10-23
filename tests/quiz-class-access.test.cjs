require('tsx/cjs');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {classProofs, quizAccess, quizClassLocked} = require('../lib/server/quizAccess.ts');
const {createQuiz, QuizError} = require('../lib/server/quizzes.ts');

const MEMBER = 'a'.repeat(32);
// classes/K7QF2 with one member; classes/B2C3D owned by someone else.
const classes = {K7QF2: {teacherUid: 'teach', name: 'Period 3', teacherName: 'Ms. Smith', examId: 'dmv', state: 'CA', createdAt: '2026-10-01', members: {[MEMBER]: {}}},
  B2C3D: {teacherUid: 'other', name: 'Not yours', teacherName: 'Mr. X', examId: 'dmv', createdAt: '2026-10-02', members: {}}};
function fakeDb(classList = classes) {
  return {
    collection: (name) => ({
      doc: (id) => ({
        get: async () => ({exists: name === 'classes' && !!classList[id], data: () => classList[id]}),
        collection: () => ({doc: (m) => ({get: async () => ({exists: !!classList[id]?.members?.[m]})})}),
        create: async () => {},
        set: async () => {},
      }),
      where: (_f, _op, uid) => ({
        count: () => ({get: async () => ({data: () => ({count: 0})})}),
        get: async () => ({docs: Object.entries(classList).filter(([, c]) => c.teacherUid === uid).map(([code, c]) => ({data: () => ({...c, code})}))}),
      }),
    }),
  };
}
const quiz = {code: 'ABCDEF', title: 'Signs', ownerUid: 'teach', ownerName: 'Jo', visibility: 'class', classCode: 'K7QF2', classTeacherName: 'Ms. Smith'};

test('a class quiz opens for the owner and the class only', async () => {
  const db = fakeDb();
  assert.equal(await quizAccess(quiz, {uid: 'teach'}, new Map(), db), 'open');
  assert.equal(await quizAccess(quiz, null, classProofs(`K7QF2:${MEMBER}`), db), 'open');
  assert.equal(await quizAccess(quiz, null, classProofs(`k7qf2:${MEMBER}`), db), 'open');
  assert.equal(await quizAccess(quiz, null, new Map(), db), 'class');
  assert.equal(await quizAccess(quiz, {uid: 'someone'}, classProofs(`K7QF2:${'b'.repeat(32)}`), db), 'class');
  // A membership of another class proves nothing about this one.
  assert.equal(await quizAccess(quiz, null, classProofs(`B2C3D:${MEMBER}`), db), 'class');
  assert.equal(await quizAccess({...quiz, visibility: 'link'}, null, new Map(), db), 'open');
  assert.equal(await quizAccess({...quiz, visibility: 'private'}, null, new Map(), db), 'private');
  const locked = quizClassLocked(quiz);
  assert.equal(locked.teacherName, 'Ms. Smith');
  assert.ok(!JSON.stringify(locked).includes('K7QF2'));
});

const questions = Array.from({length: 3}, (_, i) => ({question: `Q${i}`, options: ['A', 'B', 'C', 'D'], correctIndex: 0}));
test('a class quiz must name a class the owner teaches', async () => {
  const one = await createQuiz({uid: 'teach', isPremium: false}, {title: 'T', questions, visibility: 'class', createdVia: 'mcp'}, fakeDb());
  assert.equal(one.classCode, 'K7QF2');
  assert.equal(one.className, 'Period 3');
  await assert.rejects(() => createQuiz({uid: 'teach', isPremium: false}, {title: 'T', questions, visibility: 'class', classCode: 'B2C3D', createdVia: 'mcp'}, fakeDb()), (e) => e instanceof QuizError && e.status === 403);
  await assert.rejects(() => createQuiz({uid: 'nobody', isPremium: false}, {title: 'T', questions, visibility: 'class', createdVia: 'mcp'}, fakeDb()), (e) => e.reason === 'NO_CLASSES');
  const two = {...classes, C4D5E: {...classes.K7QF2, name: 'Period 4', members: {}}};
  await assert.rejects(() => createQuiz({uid: 'teach', isPremium: false}, {title: 'T', questions, visibility: 'class', createdVia: 'mcp'}, fakeDb(two)), (e) => e.reason === 'CLASS_REQUIRED' && e.classes.length === 2);
});
