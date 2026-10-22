// Run: node --test tests/quiz-connector-flow.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {readFileSync} = require('node:fs');
const React = require('react');
// tsx respects this repo's JSX-preserve setting; supply React for its Node transform.
global.React = React;
const {renderToStaticMarkup} = require('react-dom/server');
const {UseAssistant,CreateSources} = require('../components/quiz/create/CreateSources.tsx');
const {parseTermList,termsToQuestions} = require('../lib/quizzes.ts');
test('assistant route renders setup guidance without question transfer controls',()=>{
 const html=renderToStaticMarkup(React.createElement(UseAssistant));
 assert.match(html,/href="\/connect"/); assert.match(html,/saves the quiz to TigerTest through the connector/);
 assert.match(html,/not an automatic connection/); assert.doesNotMatch(html,/<textarea|Copy the prompt|Paste the reply|Build the quiz/);
});
test('creation keeps connector, Quizlet and manual routes distinct',()=>{
 const html=renderToStaticMarkup(React.createElement(CreateSources,{onReady(){}}));
 for(const label of ['Use ChatGPT or Claude','Import from Quizlet','Write your own'])assert.ok(html.includes(label));
 const pairs=parseTermList('red\tfirst colour\nblue\tsecond colour\ngreen\tthird colour\nyellow\tfourth colour');
 assert.equal(termsToQuestions(pairs).length,4);
});
test('product help and email no longer offer the assistant copy/paste round trip',()=>{
 for(const file of ['app/connect/page.tsx','lib/email-templates.ts','lib/llmsTxt.ts','lib/quizWritingGuide.ts','lib/quizzes.ts']){
 const text=readFileSync(file,'utf8');assert.doesNotMatch(text,/quizAssistantPrompt|parseAssistantQuiz|paste the reply back|copied prompt|Copy our question-writing prompt/i,file);
 }
 const help=readFileSync('app/connect/page.tsx','utf8');assert.match(help,/help.openai.com\/en\/articles\/12584461/);assert.match(help,/support.claude.com\/en\/articles\/11175166/);
});
