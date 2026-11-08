/**
 * Shared Resend client + send wrapper.
 *
 * Two rules this file exists to enforce:
 *
 * 1. NEVER hardcode an API key. The key must come from RESEND_API_KEY.
 *    (A key was previously committed as a fallback literal in five files of a
 *    public repo — see git history. Anything hardcoded here is public.)
 *
 * 2. resend.emails.send() does NOT throw on API errors — it resolves with
 *    `{ data: null, error }`. Calling it as `await resend.emails.send(...)`
 *    and moving on treats a rejected send (quota exhausted, bad address,
 *    suppressed recipient) as a success. Always go through sendEmail() below,
 *    which surfaces those as real failures.
 */

import { Resend } from "resend";
import {
  reserveSend,
  releaseSend,
  markQuotaExhausted,
  type SendKind,
} from "@/lib/email-quota";

let client: Resend | null = null;

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set — refusing to send email with no configured key."
    );
  }
  if (!client) client = new Resend(key);
  return client;
}

export interface SendResult {
  ok: boolean;
  id?: string;
  /** Resend rejected the send because the account is out of daily quota (or rate limited). */
  quotaExhausted: boolean;
  error?: string;
  /** The provider may have accepted the message. Retry only with the same key. */
  uncertain?: boolean;
}

/** Error names/messages Resend uses when the account is over its send allowance. */
function looksLikeQuotaError(name?: string, message?: string): boolean {
  const haystack = `${name ?? ""} ${message ?? ""}`.toLowerCase();
  return (
    haystack.includes("daily_quota_exceeded") ||
    haystack.includes("monthly_quota_exceeded") ||
    (haystack.includes("quota") && !haystack.includes("rate"))
  );
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
  /** Where a human reply lands. Campaign mail sets this so "hit reply" works. */
  replyTo?: string;
  /** Extra SMTP headers, e.g. List-Unsubscribe for one-click opt-out. */
  headers?: Record<string, string>;
  /** Stable, event-scoped key. Resend retains keys for 24 hours. */
  idempotencyKey?: string;
  /**
   * Which budget this send is charged to. "campaign" stops early so the
   * transactional reserve survives; "transactional" may use the full plan
   * limit. See lib/email-quota.
   */
  kind: SendKind;
}

export const DEFAULT_FROM = "Tigertest <noreply@tigertest.io>";

/** Match nonempty {{...}} placeholders without retrying a scan at every '{'. */
function containsUnresolvedTemplate(html: string): boolean {
  let cursor = 0;
  while (cursor < html.length) {
    const start = html.indexOf("{{", cursor);
    if (start === -1) return false;
    const end = html.indexOf("}", start + 2);
    if (end === -1) return false;
    if (end > start + 2 && html[end + 1] === "}") return true;
    // No start before this closing brace can match. Resume after it so each
    // character is scanned at most twice, including long runs of open braces.
    cursor = end + 1;
  }
  return false;
}

/**
 * Send one email, charged against the account-wide daily budget, and report the
 * true outcome. Never throws — inspect the returned SendResult.
 */
export async function sendEmail(payload: SendEmailPayload): Promise<SendResult> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, quotaExhausted: false, error: "RESEND_API_KEY is not configured", uncertain: false };
  }
  // Refuse design fixtures and incomplete substitutions before charging quota.
  if (containsUnresolvedTemplate(payload.html) || /example\.invalid|(?:src|href)=["']asset:|\[Verified postal address/i.test(payload.html)) {
    return { ok: false, quotaExhausted: false, error: "Email contains unresolved template or preview content", uncertain: false };
  }
  if (payload.kind === "campaign" && !process.env.EMAIL_POSTAL_ADDRESS?.trim()) {
    return { ok: false, quotaExhausted: false, error: "EMAIL_POSTAL_ADDRESS is required for campaign mail", uncertain: false };
  }
  if (!(await reserveSend(payload.kind))) {
    return {
      ok: false,
      quotaExhausted: true,
      error: "Daily email budget exhausted — send skipped",
    };
  }

  try {
    const { data, error } = await getResend().emails.send({
      from: payload.from ?? DEFAULT_FROM,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
      ...(payload.headers ? { headers: payload.headers } : {}),
    }, payload.idempotencyKey ? { idempotencyKey: payload.idempotencyKey } : undefined);

    if (error) {
      const quotaExhausted = looksLikeQuotaError(error.name, error.message);
      // Latch the budget when Resend says we're done for the day; otherwise
      // hand the reserved slot back so it isn't lost to a one-off failure.
      const status = (error as { statusCode?: number }).statusCode;
      const uncertain = (typeof status === "number" && status >= 500) ||
        error.name === "application_error" || error.name === "internal_server_error" ||
        error.name === "concurrent_idempotent_requests" || error.name === "invalid_idempotent_request";
      if (quotaExhausted) await markQuotaExhausted();
      else if (!uncertain) await releaseSend();
      return {
        ok: false,
        quotaExhausted,
        error: `${error.name ?? "error"}: ${error.message ?? "unknown"}`,
        uncertain,
      };
    }

    if (!data?.id) {
      return { ok: false, quotaExhausted: false, uncertain: true, error: "Provider returned no message id; delivery outcome is unknown" };
    }
    return { ok: true, id: data.id, quotaExhausted: false };
  } catch (err: any) {
    // Network/config failures (and a missing API key) land here.
    const message = err?.message ?? String(err);
    const quotaExhausted = looksLikeQuotaError(err?.name, message);
    // A timeout can happen after acceptance. Keep the budget reservation and
    // let the durable sender retry the SAME immutable request and key only.
    if (quotaExhausted) await markQuotaExhausted();
    return { ok: false, quotaExhausted, error: message, uncertain: !quotaExhausted };
  }
}
