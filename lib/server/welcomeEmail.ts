import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { EMAIL_TEMPLATES } from '@/lib/email-templates';
import { isKnownExamId, voiceFor } from '@/lib/email-voice';
import { unsubscribeToken, listUnsubscribeHeaders } from '@/lib/unsubscribe';
import { marketingAllowed, sendDurableEmail } from '@/lib/server/durableEmail';

export const WELCOME_KEY = 'welcome';
export const WELCOME_MAX_AGE_MS = 24 * 60 * 60 * 1000;
export type WelcomeResult = { ok: true } | { ok: false; reason: 'not_new' | 'unknown_user' | 'no_email' | 'already_sent' | 'ineligible' | 'send_failed'; quotaExhausted?: boolean; error?: string };
export async function sendWelcomeEmail(uid: string): Promise<WelcomeResult> {
  let record;
  try { record = await getAdminAuth().getUser(uid); }
  catch { return { ok: false, reason: 'unknown_user' }; }
  const age = Date.now() - new Date(record.metadata.creationTime).getTime();
  if (!Number.isFinite(age) || age < 0 || age > WELCOME_MAX_AGE_MS) return { ok: false, reason: 'not_new' };
  if (!record.email || record.disabled) return { ok: false, reason: 'no_email' };
  const data = (await getAdminDb().collection('users').doc(uid).get()).data() ?? {};
  const teacher = data.signupOrigin?.source === 'authenticated_signup' && data.signupOrigin?.teacher === true;
  const examId = data.firstSignupExamId;
  if (!teacher && !marketingAllowed(data)) return { ok: false, reason: 'ineligible' };
  const firstName = record.displayName?.trim().split(/\s+/)[0]?.replace(/[<>&"]/g, '');
  const html = EMAIL_TEMPLATES[teacher ? 'welcomeTeacher' : 'welcome'](voiceFor(examId))
    .replace(/{{greeting}}/g, firstName ? `Hey ${firstName},` : 'Hey there,')
    .replace(/{{unsubscribeToken}}/g, teacher ? '' : unsubscribeToken(uid));
  try {
    const outcome = await sendDurableEmail({ uid, dedupeKey: WELCOME_KEY, emailKey: WELCOME_KEY,
      payload: { to: record.email, subject: teacher || !isKnownExamId(examId) ? 'Welcome to Tigertest' : `Start your ${voiceFor(examId).shortName} practice`, html,
        replyTo: process.env.EMAIL_REPLY_TO ?? 'john@johnbrophy.net',
        kind: teacher ? 'transactional' : 'campaign', ...(teacher ? {} : { headers: listUnsubscribeHeaders(uid) }) },
      gapMs: 24 * 60 * 60_000,
      eligible: current => teacher ? current.signupOrigin?.teacher === true : current.firstSignupExamId === examId,
    });
    if (outcome === 'sent') return { ok: true };
    return { ok: false, reason: outcome === 'already_sent' ? 'already_sent' : 'ineligible' };
  } catch (error: any) {
    return { ok: false, reason: 'send_failed', error: error.message, quotaExhausted: error.quotaExhausted === true };
  }
}
