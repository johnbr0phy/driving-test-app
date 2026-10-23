// Run: node --test tests/quiz-connector-flow.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {readFileSync} = require('node:fs');
const React = require('react');
// tsx respects this repo's JSX-preserve setting; supply React for its Node transform.
global.React = React;
const {renderToStaticMarkup} = require('react-dom/server');
const {CreateSources} = require('../components/quiz/create/CreateSources.tsx');
test('assistant route renders setup guidance without question transfer controls',()=>{
 const html=renderToStaticMarkup(React.createElement(CreateSources));
 assert.match(html,/href="\/connect#add-to-chatgpt"/); assert.match(html,/saves the quiz to TigerTest through the connector/);
 assert.match(html,/not an automatic connection/); assert.doesNotMatch(html,/<textarea|Copy the prompt|Paste the reply|Build the quiz/);
});
test('creation offers only the two assistant setup paths and preserves existing owner editing',()=>{
 const html=renderToStaticMarkup(React.createElement(CreateSources));
 for(const label of ['Use ChatGPT','Use Claude'])assert.ok(html.includes(label));
 for(const provider of ['chatgpt','claude'])assert.ok(html.includes(`href="/connect#add-to-${provider}"`));
 assert.doesNotMatch(html,/Quizlet|Write your own|<textarea|role="tab"/);
 const create=readFileSync('app/create/page.tsx','utf8');assert.doesNotMatch(create,/QuizEditor|draft|onReady|Quizlet/);assert.match(create,/<MyQuizzes/);
 const edit=readFileSync('app/q/[code]/edit/page.tsx','utf8');assert.match(edit,/<QuizEditor/);assert.match(edit,/mode="edit"/);
 const help=readFileSync('app/connect/page.tsx','utf8');for(const provider of ['chatgpt','claude'])assert.ok(help.includes(`id="add-to-${provider}"`));
 const footer=readFileSync('components/Footer.tsx','utf8');assert.match(footer,/<Link href="\/connect"[^>]*>\s*Make a quiz/);assert.doesNotMatch(footer,/<Link href="\/create"/);
});
test('product help and email no longer offer the assistant copy/paste round trip',()=>{
 for(const file of ['app/connect/page.tsx','lib/email-templates.ts','lib/llmsTxt.ts','lib/quizWritingGuide.ts','lib/quizzes.ts']){
 const text=readFileSync(file,'utf8');assert.doesNotMatch(text,/quizAssistantPrompt|parseAssistantQuiz|paste the reply back|copied prompt|Copy our question-writing prompt/i,file);
 }
 const help=readFileSync('app/connect/page.tsx','utf8');assert.match(help,/const MCP_URL = "https:\/\/www.tigertest.io\/api\/mcp"/);assert.match(help,/help.openai.com\/en\/articles\/12584461/);assert.match(help,/support.claude.com\/en\/articles\/11175166/);
});
