// Run: node --test tests/achievement-celebration.test.cjs
require('tsx/cjs');
require.extensions['.css'] = (module) => { module.exports = {}; };
const assert = require('node:assert/strict');
const { test } = require('node:test');
const React = require('react');
global.React = React;
const { renderToStaticMarkup } = require('react-dom/server');
const { AchievementCelebration } = require('../components/AchievementCelebration.tsx');
const { queueAchievementCelebration, takeAchievementCelebration } = require('../lib/achievementCelebration.ts');

const render = (props) => renderToStaticMarkup(React.createElement(AchievementCelebration, {
  eyebrow: 'Basics complete', title: 'All your basics are green!',
  description: 'You learned all 4 skills in 2s, 5s and 10s.',
  detail: '4 of 4 basics skills learned', ...props,
}, React.createElement('a', { href: '/times-tables/dashboard?completed=basics%3AtwoFiveTen' }, 'See your progress')));

test('saved achievements are static by default with an explicit dashboard action', () => {
  const html = render({ examId: 'timestables' });
  assert.match(html, /data-achievement="saved"/);
  assert.match(html, /See your progress/);
  assert.match(html, /\/times-tables\/dashboard\?completed=basics%3AtwoFiveTen/);
  assert.match(html, /4 of 4 basics skills learned/);
  assert.match(html, /aria-labelledby=/);
  assert.match(html, /<h2/);
  assert.doesNotMatch(html, /<canvas/);
});

test('earned mode is explicit and allows the completion page main heading', () => {
  const html = render({ examId: 'timestables', earned: true, headingLevel: 1 });
  assert.match(html, /data-achievement="earned"/);
  assert.match(html, /<h1[^>]*tabindex="-1"/);
  assert.match(html, /timestables.*tiger_face_01/);
  assert.match(html, /alt=""/);
});

test('adult exams use their own tiger and specific accomplishment text', () => {
  const html = render({ examId: 'nclex', eyebrow: 'Drill mastered', title: 'Every question. Mastered.', description: 'You answered every question in Safety correctly.', detail: '20 of 20 questions mastered' });
  assert.match(html, /nclex.*tiger_face_01/);
  assert.match(html, /Drill mastered/);
  assert.match(html, /Safety/);
  assert.match(html, /20 of 20 questions mastered/);
  assert.doesNotMatch(html, /Basics complete|4 of 4/);
});

test('server rendering and restored result ids cannot queue a new earned event', () => {
  assert.equal(typeof window, 'undefined');
  queueAchievementCelebration('server-result');
  assert.equal(takeAchievementCelebration('server-result'), false);
  assert.equal(takeAchievementCelebration('saved-result'), false);
});

test('a client completion is claimed once, independent of another result', () => {
  global.window = {};
  try {
    queueAchievementCelebration('first');
    queueAchievementCelebration('first');
    queueAchievementCelebration('second');
    assert.equal(takeAchievementCelebration('unknown'), false);
    assert.equal(takeAchievementCelebration('first'), true);
    assert.equal(takeAchievementCelebration('first'), false);
    assert.equal(takeAchievementCelebration('second'), true);
    assert.equal(takeAchievementCelebration('second'), false);
  } finally { delete global.window; }
});
