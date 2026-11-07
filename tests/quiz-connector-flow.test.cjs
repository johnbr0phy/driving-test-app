// Run: node --test tests/quiz-connector-flow.test.cjs
// /create is the one page for making quizzes through a connected assistant
// (it absorbed /connect in #548). These checks keep the copy/paste prompt
// round trip from coming back and keep the two setup paths and owner editing.
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {readFileSync} = require('node:fs');

const create = readFileSync('app/create/page.tsx', 'utf8');

test('/connect permanently redirects to /create', () => {
  const config = readFileSync('next.config.ts', 'utf8');
  assert.match(config, /\{ source: "\/connect", destination: "\/create", permanent: true \}/);
});

test('creation offers only the two assistant setup paths and keeps owner editing', () => {
  for (const provider of ['claude', 'chatgpt']) {
    assert.ok(create.includes(`href="#add-to-${provider}"`), `link to ${provider} setup`);
    assert.ok(create.includes(`id="add-to-${provider}"`), `${provider} setup section`);
  }
  assert.match(create, /<CreateYourQuizzes \/>/);
  assert.doesNotMatch(create, /QuizEditor|<textarea|Quizlet|Copy the prompt|Paste the reply|Build the quiz/);
  const edit = readFileSync('app/q/[code]/edit/page.tsx', 'utf8');
  assert.match(edit, /<QuizEditor/);
  assert.match(edit, /mode="edit"/);
  const footer = readFileSync('components/Footer.tsx', 'utf8');
  assert.match(footer, /<Link href="\/create"[^>]*>\s*\{t\("footer\.makeAQuiz"\)\}/);
});

test('product help and email no longer offer the assistant copy/paste round trip', () => {
  for (const file of ['app/create/page.tsx', 'lib/email-templates.ts', 'lib/llmsTxt.ts', 'lib/quizWritingGuide.ts', 'lib/quizzes.ts']) {
    const text = readFileSync(file, 'utf8');
    assert.doesNotMatch(text, /quizAssistantPrompt|parseAssistantQuiz|paste the reply back|copied prompt|Copy our question-writing prompt/i, file);
  }
  assert.match(create, /const MCP_URL = "https:\/\/www\.tigertest\.io\/api\/mcp"/);
  assert.match(create, /help\.openai\.com\/en\/articles\/12584461/);
  assert.match(create, /support\.claude\.com\/en\/articles\/11175166/);
});

test('in-progress guidance and canonical setup survive the merge', () => {
  assert.match(create, /Keep learning your tests in progress/);
  assert.match(create, /Continue timed or adaptive test sittings on the website/);
  assert.match(create, /Unsynced browser work may need repeating/);
  assert.match(create, /components\/connect\/CopyUrl/);
  assert.match(create, /\/og\/connect/);
  assert.doesNotMatch(create, /Get quizzed on the DMV test/);
});
