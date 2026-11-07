// Run: node --test tests/checkout-line-item.test.cjs
// The Stripe Checkout line item names the exam the buyer came from.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { checkoutLineItem } = require('../lib/purchaseAttribution.ts');

test('a v1 exam stats checkout names that exam, not the DMV', () => {
  const item = checkoutLineItem('cna_stats');
  assert.equal(item.name, 'Tigertest Premium');
  assert.match(item.description, /full CNA stats/);
  assert.doesNotMatch(item.description, /DMV/);
});

test('a native-language exam uses its English short name', () => {
  const item = checkoutLineItem('grinsure_stats');
  assert.doesNotMatch(item.description, /DMV/);
  assert.match(item.description, /^One-time payment\. Unlocks your full .+ stats/);
});

test('a v2 exam names that exam', () => {
  assert.match(checkoutLineItem('sat_stats').description, /full SAT stats/);
  assert.match(checkoutLineItem('sat_dashboard').description, /every SAT practice test and drill/);
});

test('DMV paywalls keep the DMV sets and tests', () => {
  for (const loc of ['training_set_4', 'practice_test_4', 'stats_page']) {
    assert.match(checkoutLineItem(loc).description, /DMV Training Sets 3-4 and Practice Tests 3-4/);
  }
});

test('shared or missing locations get the generic line', () => {
  for (const loc of ['results_page', 'drill', 'upgrade_page', null, undefined, 'nonsense']) {
    const { description } = checkoutLineItem(loc);
    assert.doesNotMatch(description, /DMV/);
    assert.match(description, /every locked test, drill and stat/);
  }
});

test('checkout prices every currency inline with the line item', () => {
  const src = readFileSync(path.join(__dirname, '../app/api/stripe/checkout/route.ts'), 'utf8');
  assert.match(src, /product_data: lineItem/);
  assert.doesNotMatch(src, /PREMIUM_PRICE_ID/);
});
