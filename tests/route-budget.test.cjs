// Vercel refuses a deployment with more than 2,048 routes. Measured with a
// real `vercel build` on Nov 14 2026 (303 routes): a static page costs none,
// however many there are; a dynamic route (a folder with [brackets]) costs
// about 3; each middleware matcher, redirect, rewrite and header rule costs 1.
// In Nov 2026 about 650 per-exam dynamic routes took production down. This
// fails long before that can happen again: put the new pages behind a shared
// dynamic route (app/[slug]/...) instead of one dynamic folder per exam.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const LIMIT = 2048;
const BUDGET = 1200;

function dynamicRoutes(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) dynamicRoutes(full, out);
    else if (/^(page|route)\.tsx?$/.test(entry.name) && full.includes('[')) out.push(path.relative(ROOT, full));
  }
  return out;
}

test('the deployment stays far below Vercel\'s 2,048-route limit', () => {
  const dynamic = dynamicRoutes(path.join(ROOT, 'app'));
  const matcher = fs.readFileSync(path.join(ROOT, 'middleware.ts'), 'utf8').match(/matcher:\s*\[([\s\S]*?)\]/);
  const matchers = matcher ? (matcher[1].match(/"[^"]+"/g) || []).length : 0;
  // Redirects, rewrites and headers from next.config.ts plus Next's own fixed
  // rules: 126 in the measured build. 200 leaves room for more redirects.
  const estimate = dynamic.length * 3 + matchers + 200;
  assert.ok(
    estimate < BUDGET,
    `About ${estimate} of ${LIMIT} routes (${dynamic.length} dynamic route files). ` +
      'Move per-exam dynamic folders behind a shared route before adding more.',
  );
});
