const { test } = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
const { validateDates, paymentWindow, reconcile } = require('../scripts/reconcile-checkout.ts');

test('GA property calendar days bound the ledger across DST and fractional timezones', () => {
  assert.throws(() => validateDates('2026-02-30', '2026-04-01'));
  assert.throws(() => validateDates('2026-04-01', '2026-03-01'));
  assert.deepEqual(paymentWindow('2026-11-01', '2026-11-01', 'America/New_York'), {
    from: '2026-11-01T04:00:00.000Z', until: '2026-11-02T05:00:00.000Z',
  });
  assert.deepEqual(paymentWindow('2026-03-08', '2026-03-08', 'America/New_York'), {
    from: '2026-03-08T05:00:00.000Z', until: '2026-03-09T04:00:00.000Z',
  });
  assert.equal(paymentWindow('2026-01-01', '2026-01-31', 'Asia/Kathmandu').from, '2025-12-31T18:15:00.000Z');
});

test('matches distinct purchases, exposes refunds, omissions and repeats, and returns aggregate fields only', () => {
  const row = (id, count, device = 'desktop') => ({
    dimensionValues: [{ value: id }, { value: device }], metricValues: [{ value: String(count) }],
  });
  const result = reconcile([row('one', 2), row('one', 1, 'mobile'), row('two', 1, 'mobile'),
    row('(not set)', 3), row('internal', 3), row('cs_test_ignore', 1)], [
    { stripeSessionId: 'one', status: 'partially_refunded', exam: 'rbt', guestCheckout: 'existing_account', checkoutDevice: 'mobile' },
    { stripeSessionId: 'one', status: 'partially_refunded' }, { stripeSessionId: 'three', status: 'refunded' },
    { status: 'succeeded' }, { stripeSessionId: 'internal', userId: 'employee', status: 'succeeded' },
  ], new Set(['employee']));
  assert.deepEqual(result.totals, { matched: 1, paidOnly: 1, gaOnly: 1 });
  assert.equal(result.duplicateGaEvents, 2);
  assert.equal(result.duplicatePaymentRecords, 1);
  assert.equal(result.gaEventsWithoutUsableId, 3);
  assert.equal(result.paymentsWithoutId, 1);
  assert.equal(result.refunded, 1);
  assert.equal(result.partiallyRefunded, 1);
  assert.deepEqual(result.byDevice.mobile, { matched: 1, paidOnly: 0, gaOnly: 1 });
  assert.equal(result.byBuyerState.unknown.paidOnly, 1);
  assert.equal(result.byExam.rbt.matched, 1);
  assert.doesNotMatch(JSON.stringify(result), /"one"|"two"|"three"|employee|cs_test/);
});
