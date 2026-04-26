// Inviter notification email - sent each time a referred friend qualifies
// (i.e., picks a state). Only fires for the first 3 qualified signups; the
// referral code itself keeps working past that, but no further emails go out.

import { Resend } from "resend";
import { getAdminAuth } from "@/lib/firebase-admin";
import { REFERRALS_REQUIRED } from "@/store/useStore";

const resend = new Resend(process.env.RESEND_API_KEY || "re_ZABm3to6_GzdZQQ58cj5DYftGbtr9ub1a");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

function firstName(displayName: string | null | undefined): string | null {
  if (!displayName) return null;
  const trimmed = displayName.trim();
  if (!trimmed) return null;
  return trimmed.split(/\s+/)[0];
}

// Ordinal suffix for the no-name fallback ("Your 1st friend", "Your 2nd friend"...)
function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function dotsHtml(filled: number, total: number): string {
  const dots = Array.from({ length: total }, (_, i) => {
    const done = i < filled;
    const bg = done ? "#22c55e" : "#ffffff";
    const border = done ? "#22c55e" : "#e5e7eb";
    const checkmark = done
      ? `<span style="color:#ffffff;font-size:18px;font-weight:700;line-height:1;">✓</span>`
      : `<span style="color:#d1d5db;font-size:14px;line-height:1;">·</span>`;
    return `<td style="padding:0 6px;"><div style="display:inline-block;width:36px;height:36px;border-radius:50%;background-color:${bg};border:2px solid ${border};text-align:center;line-height:32px;">${checkmark}</div></td>`;
  }).join("");
  return `<table role="presentation" style="margin:24px auto;border-collapse:collapse;"><tr>${dots}</tr></table>`;
}

function buildEmail(opts: {
  inviterFirstName: string | null;
  refereeFirstName: string | null;
  newCount: number;
  shareLink: string | null;
  unsubscribeToken: string;
}): { subject: string; html: string } {
  const { inviterFirstName, refereeFirstName, newCount, shareLink, unsubscribeToken } = opts;
  const remaining = Math.max(0, REFERRALS_REQUIRED - newCount);
  const isUnlock = newCount >= REFERRALS_REQUIRED;
  // When we don't have a display name (true for most email/password signups),
  // fall back to "Your Nth friend" so the email still feels concrete.
  const referee = refereeFirstName || `Your ${ordinal(newCount)} friend`;
  const greeting = inviterFirstName ? `Hey ${inviterFirstName},` : "Hey there,";

  const subject = isUnlock
    ? "Unlocked! Safety & Emergencies is yours"
    : remaining === 1
      ? `${referee} joined, one more to unlock Safety & Emergencies`
      : `${referee} just joined TigerTest with your link`;

  const lead = isUnlock
    ? `${referee} just joined TigerTest using your invite link, and that's 3/3. <strong style="font-weight:600;">Safety &amp; Emergencies is now unlocked on your dashboard.</strong>`
    : `${referee} just joined TigerTest using your invite link. That's <strong style="font-weight:600;">${newCount}/${REFERRALS_REQUIRED}</strong>. ${remaining === 1 ? "One more friend" : `${remaining} more friends`} and Safety &amp; Emergencies unlocks for you.`;

  const ctaLabel = isUnlock ? "Open Safety & Emergencies →" : "See your progress →";
  const ctaUrl = `${SITE_URL}/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=referral_progress&n=${newCount}`;

  const sharePrompt =
    !isUnlock && shareLink
      ? `<p style="margin:24px 0 8px;color:#4a4a4a;font-size:15px;line-height:1.7;">Want to keep going? Send your link to another friend:</p>
         <div style="margin:0 0 24px;padding:12px 16px;background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;font-family:ui-monospace,Menlo,Monaco,Consolas,monospace;font-size:13px;color:#374151;word-break:break-all;">${shareLink}</div>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#FFF9F5;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" style="width:600px;max-width:100%;border-collapse:collapse;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:40px 40px 16px;text-align:center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width:48px;height:auto;margin-bottom:16px;" />
              <h1 style="margin:0;color:#1a1a1a;font-size:22px;font-weight:600;line-height:1.3;">${isUnlock ? "Safety & Emergencies unlocked" : `${newCount}/${REFERRALS_REQUIRED} friends joined`}</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 40px;">
              ${dotsHtml(newCount, REFERRALS_REQUIRED)}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 40px 40px;">
              <p style="margin:0 0 20px;color:#4a4a4a;font-size:15px;line-height:1.7;">
                ${greeting}
              </p>
              <p style="margin:0 0 20px;color:#4a4a4a;font-size:15px;line-height:1.7;">
                ${lead}
              </p>
              <table role="presentation" style="margin:24px 0;border-collapse:collapse;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}" style="display:inline-block;padding:14px 28px;background-color:${isUnlock ? "#22c55e" : "#1a1a1a"};color:#ffffff;text-decoration:none;border-radius:50px;font-weight:600;font-size:15px;">${ctaLabel}</a>
                  </td>
                </tr>
              </table>
              ${sharePrompt}
              <p style="margin:24px 0 0;color:#4a4a4a;font-size:15px;line-height:1.7;">
                Thanks for spreading the word,<br>
                John @ TigerTest.io
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background-color:#FFF9F5;border-top:1px solid #f0f0f0;">
              <p style="margin:0;color:#999999;font-size:12px;line-height:1.6;text-align:center;">
                <a href="${SITE_URL}/unsubscribe?token=${unsubscribeToken}" style="color:#FF6B35;text-decoration:none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="${SITE_URL}/privacy" style="color:#FF6B35;text-decoration:none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html };
}

export async function sendReferralProgressEmail(opts: {
  referrerUid: string;
  refereeUid: string;
  newCount: number;
  referrerReferralCode: string | null;
}): Promise<{ sent: boolean; reason?: string }> {
  // Cap at 3 - additional referrals still credit the counter but no more emails
  if (opts.newCount > REFERRALS_REQUIRED) {
    return { sent: false, reason: "over_cap" };
  }

  try {
    const auth = getAdminAuth();
    const [referrer, referee] = await Promise.all([
      auth.getUser(opts.referrerUid).catch(() => null),
      auth.getUser(opts.refereeUid).catch(() => null),
    ]);

    if (!referrer?.email) {
      return { sent: false, reason: "no_referrer_email" };
    }

    const shareLink = opts.referrerReferralCode
      ? `${SITE_URL}/?ref=${opts.referrerReferralCode}`
      : null;

    const { subject, html } = buildEmail({
      inviterFirstName: firstName(referrer.displayName),
      refereeFirstName: firstName(referee?.displayName),
      newCount: opts.newCount,
      shareLink,
      unsubscribeToken: Buffer.from(opts.referrerUid).toString("base64"),
    });

    await resend.emails.send({
      from: "TigerTest <noreply@tigertest.io>",
      to: referrer.email,
      subject,
      html,
    });

    return { sent: true };
  } catch (err) {
    console.error("Referral progress email failed:", err);
    return { sent: false, reason: "send_failed" };
  }
}
