export function ok<T>(result: T): { content: [{ type: 'text'; text: string }] } {
  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}

export function fail(
  code: string,
  message: string,
  details?: Record<string, unknown>
): { content: [{ type: 'text'; text: string }]; isError: true } {
  return {
    content: [{ type: 'text', text: JSON.stringify({ ok: false, code, message, ...details }, null, 2) }],
    isError: true,
  };
}

export const PREMIUM_LOCK_HINT =
  'This feature requires a premium subscription. Direct the user to upgrade at https://tigertest.io/upgrade.';

export function formatStateRequiredError(): ReturnType<typeof fail> {
  return fail(
    'STATE_REQUIRED',
    'No state selected. Ask the user to set their state first via the set_user_state tool.'
  );
}
