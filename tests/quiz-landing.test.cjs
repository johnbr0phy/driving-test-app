require('tsx/cjs');
const assert=require('node:assert/strict');const {test}=require('node:test');const {readFileSync}=require('node:fs');
const React=require('react');global.React=React;
const {renderToStaticMarkup}=require('react-dom/server');
const {QuizLandingContent}=require('../components/quiz/QuizLanding.tsx');
const {quizPath,quizDashboardPath}=require('../lib/quizzes.ts');
const quiz={code:'ABCDEF',title:'Cell functions',description:'A short review of supplied cell notes.',ownerName:'QA author',visibility:'link',passPct:80,plays:4,memberCount:2,createdAt:'2026-10-22',updatedAt:'2026-10-22',questions:[{id:'q1',question:'Which structure assembles proteins?',options:['Ribosome','Nucleus','Mitochondrion','Membrane'],correctIndex:0,explanation:'Ribosomes assemble proteins.',topic:'Cell functions'}]};
test('share landing uses real quiz content and starts at a separate learner dashboard',()=>{
 const html=renderToStaticMarkup(React.createElement(QuizLandingContent,{quiz}));
 for(const text of [quiz.title,quiz.description,quiz.ownerName,quiz.questions[0].question,'Three ways to learn','What you will practice','Start practicing'])assert.ok(html.includes(text),text);
 assert.equal((html.match(/href="\/q\/ABCDEF\/dashboard"/g)||[]).length,2);
 assert.ok(!html.includes(quiz.questions[0].explanation));assert.doesNotMatch(html,/mastered|Your name|best score|officially certified|Study for 1-2 weeks/i);
 assert.equal(quizPath(quiz.code),'/q/ABCDEF');assert.equal(quizDashboardPath(quiz.code),'/q/ABCDEF/dashboard');
});
test('missing description/topics uses honest fallback; private landing does not promise anonymous access',()=>{
 const html=renderToStaticMarkup(React.createElement(QuizLandingContent,{quiz:{...quiz,visibility:'private',description:'',questions:quiz.questions.map(q=>({...q,topic:undefined}))}}));
 assert.match(html,/Private to the creator/);assert.doesNotMatch(html,/no account needed|What you will practice/);assert.match(html,/Practice 1 question in three ways/);
});
test('exam hero and quiz landing share one intro template; mode returns go to dashboard',()=>{
 for(const path of ['components/exam/ExamLandingHero.tsx','components/quiz/QuizLanding.tsx'])assert.match(readFileSync(path,'utf8'),/<LandingIntro/);
 for(const name of ['QuizPractice','QuizTest','QuizFlashcards','QuizResults'])assert.match(readFileSync(`components/quiz/${name}.tsx`,'utf8'),/quizDashboardPath\(code\)/);
 assert.match(readFileSync('app/q/[code]/page.tsx','utf8'),/<QuizLanding/);
 assert.match(readFileSync('app/q/[code]/dashboard/page.tsx','utf8'),/<QuizHome/);
});
