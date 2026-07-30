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
}

/** Error names/messages Resend uses when the account is over its send allowance. */
function looksLikeQuotaError(name?: string, message?: string): boolean {
  const haystack = `${name ?? ""} ${message ?? ""}`.toLowerCase();
  return (
    haystack.includes("daily_quota_exceeded") ||
    haystack.includes("rate_limit_exceeded") ||
    haystack.includes("quota") ||
    haystack.includes("too many requests")
  );
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
  /**
   * Which budget this send is charged to. "campaign" stops early so the
   * transactional reserve survives; "transactional" may use the full plan
   * limit. See lib/email-quota.
   */
  kind: SendKind;
}

export const DEFAULT_FROM = "TigerTest <noreply@tigertest.io>";

/**
 * Send one email, charged against the account-wide daily budget, and report the
 * true outcome. Never throws — inspect the returned SendResult.
 */
export async function sendEmail(payload: SendEmailPayload): Promise<SendResult> {
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
    });

    if (error) {
      const quotaExhausted = looksLikeQuotaError(error.name, error.message);
      // Latch the budget when Resend says we're done for the day; otherwise
      // hand the reserved slot back so it isn't lost to a one-off failure.
      await (quotaExhausted ? markQuotaExhausted() : releaseSend());
      return {
        ok: false,
        quotaExhausted,
        error: `${error.name ?? "error"}: ${error.message ?? "unknown"}`,
      };
    }

    return { ok: true, id: data?.id, quotaExhausted: false };
  } catch (err: any) {
    // Network/config failures (and a missing API key) land here.
    const message = err?.message ?? String(err);
    const quotaExhausted = looksLikeQuotaError(err?.name, message);
    await (quotaExhausted ? markQuotaExhausted() : releaseSend());
    return { ok: false, quotaExhausted, error: message };
  }
}
