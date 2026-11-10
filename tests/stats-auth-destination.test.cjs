require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const Module = require('node:module');
const { safeAuthDestination, signupForDestination } = require('../lib/authDestination.ts');
let auth = { user: null, loading: true }, store = { loadedUid: null, firestoreLoaded: false }, hydrated = false;
let useAccountNavigation;
const original = Module._load;
try {
  Module._load = function(request, parent, main) {
    if (request === '@/contexts/AuthContext') return { useAuth: () => auth };
    if (request === '@/hooks/useHydration') return { useHydration: () => hydrated };
    if (request === '@/store/useStore') return { useStore: selector => selector(store) };
    return original.call(this, request, parent, main);
  };
  ({ useAccountNavigation } = require('../hooks/useAccountNavigation.ts'));
} finally { Module._load = original; }

test('receipt stats destination and UTM survive signup/login switch unchanged', () => {
  for (const path of ['/stats', '/ccma/stats', '/real-estate/ca/stats']) {
    const query = 'utm_source=tigertest&utm_campaign=purchase_welcome&tab=yours';
    const signup = new URL(signupForDestination(path, query), 'https://tigertest.io');
    const destination = safeAuthDestination(signup.searchParams.get('redirect'));
    const login = new URL(`/login?redirect=${encodeURIComponent(destination)}`, 'https://tigertest.io');
    assert.equal(safeAuthDestination(login.searchParams.get('redirect')), `${path}?${query}`);
  }
});
test('unsafe auth redirects cannot leave origin or recurse through auth screens', () => {
  for (const raw of ['https://evil.example', '//evil.example', '/\\evil.example', '/%5cevil.example', '/%2fevil.example', '/%0aevil', 'javascript:alert(1)', '/login', '/signup?redirect=//evil', '/%6cogin', '/%73ignup', '/safe/../login', '/safe/%2e%2e/signup', '/safe/./stats', '/%']) {
    assert.equal(safeAuthDestination(raw), '/dmv/dashboard', raw);
  }
  assert.equal(safeAuthDestination('/ccma/stats?tab=community#questions'), '/ccma/stats?tab=community#questions');
});
test('mocked fresh-browser auth cannot route from persisted cloud flags or before hydration', () => {
  auth = { user: { uid: 'buyer' }, loading: true };
  store = { loadedUid: null, firestoreLoaded: true };
  hydrated = false;
  assert.equal(useAccountNavigation().ready, false);
  hydrated = true;
  assert.equal(useAccountNavigation().ready, false);
  // Auth settled, but an old persisted boolean is not proof of this account's read.
  auth.loading = false;
  assert.equal(useAccountNavigation().ready, false);
  assert.equal(useAccountNavigation().loadFailed, true);
  store.loadedUid = 'someone-else';
  assert.equal(useAccountNavigation().ready, false);
  store.loadedUid = 'buyer';
  assert.equal(useAccountNavigation().ready, true);
  assert.equal(useAccountNavigation().loadFailed, false);
});
test('mocked signed-out browser settles even when isGuest defaults false', () => {
  auth = { user: null, loading: false }; store = { loadedUid: null, firestoreLoaded: false, isGuest: false }; hydrated = true;
  const result = useAccountNavigation();
  assert.equal(result.ready, true);
  assert.equal(result.user, null); // The stats gate checks user, not isGuest alone.
});
test('actual stats/auth components use exact destination and wait for current account; community remains open', () => {
  const dmv = readFileSync('app/stats/page.tsx', 'utf8');
  const exam = readFileSync('components/exam/ExamStatsPage.tsx', 'utf8');
  const login = readFileSync('app/login/page.tsx', 'utf8');
  const signup = readFileSync('app/signup/page.tsx', 'utf8');
  assert.match(dmv, /signupForDestination\("\/stats", searchParams.toString\(\)\)/);
  assert.match(dmv, /if \(!accountReady\) return;[\s\S]*if \(!user \|\| isGuest\)/);
  assert.match(exam, /signupForDestination\(pathname \?\? routes.stats, searchParams.toString\(\)\)/);
  assert.match(exam, /accountReady && \(!user \|\| isGuest\) && !wantsCommunity/);
  assert.doesNotMatch(exam, /router.push\(routes.signup\)/);
  assert.match(login, /if \(!accountReady \|\| !user\) return;\s*router.replace\(redirectTo \?\? "\/dmv\/dashboard"\)/);
  assert.match(signup, /pendingDestination && accountReady && user/);
  for (const source of [login, signup]) assert.match(source, /safeAuthDestination\(searchParams.get\("redirect"\), ""\) \|\| null/);
});

test('missing or unsafe redirect stays absent until final navigation; no invented DMV signup origin', () => {
  for (const raw of [null, '', 'https://evil.example']) {
    const explicit = safeAuthDestination(raw, '') || null;
    assert.equal(explicit, null);
    assert.equal(explicit ? `/signup?redirect=${encodeURIComponent(explicit)}` : '/signup', '/signup');
    assert.equal(explicit ?? '/dmv/dashboard', '/dmv/dashboard');
  }
});
test('DMV state prerequisite is collected at the exact stats URL, without losing the return target', () => {
  const dmv = readFileSync('app/stats/page.tsx', 'utf8');
  assert.match(dmv, /if \(!selectedState\) return[\s\S]*<DmvStatePrompt \/>/);
  assert.doesNotMatch(dmv, /router\.(push|replace)\(['"]\/dmv\/dashboard/);
});
