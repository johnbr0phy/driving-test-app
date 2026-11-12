import type { EmailVoice } from "@/lib/email-voice";
import { practiceLabel } from "@/lib/practiceLabel";
import { EXAMS_V2 } from "@/lib/v2/registry";

export interface InboxCopy { subject: string; preheader: string }

/** Plain single-line labels: never place form input or newlines in a header. */
export function inboxLabel(value: unknown, fallback: string, limit = 60): string {
  const clean = typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim()
    : "";
  return clean ? [...clean].slice(0, limit).join("") : fallback;
}

const exam = (v: EmailVoice) => v.id === "unknown" ? "" : `${inboxLabel(v.shortName, "")} `;
/** Before "practice": "Try a Nigerian Army recruitment practice test", never "... test practice test". */
const practice = (v: EmailVoice) => v.id === "unknown" ? "" : `${inboxLabel(practiceLabel(v.shortName), "")} `;

/** One source for delivery subjects and rendered inbox previews. No send policy lives here. */
export const EMAIL_INBOX = {
  welcome: (v: EmailVoice): InboxCopy => ({
    subject: v.id === "unknown" ? "Welcome to Tigertest" : `Start your ${practice(v)}practice`,
    preheader: "Take one practice test today. The questions you miss are your study list.",
  }),
  welcomeTeacher: (): InboxCopy => ({
    subject: "Set up your first Tigertest class",
    preheader: "Choose a test, share your class link, and follow your students' practice.",
  }),
  firstTestReminder: (v: EmailVoice): InboxCopy => ({
    subject: `Try a ${practice(v)}practice test`,
    preheader: "Use a practice result to choose your next study topic.",
  }),
  secondTestNudge: (v: EmailVoice): InboxCopy => ({
    subject: `Your next ${exam(v)}study step`,
    preheader: "Review your answers, then choose a topic or another practice test.",
  }),
  paywallAbandon: (v: EmailVoice, feature?: string): InboxCopy => ({
    subject: feature ? `Revisit ${inboxLabel(feature, "your practice")}` : `Explore ${exam(v)}Premium features`,
    preheader: "Review the Premium features and current price before you decide.",
  }),
  upgradePitch: (): InboxCopy => ({
    subject: "What DMV Premium includes",
    preheader: "See the extra training sets, practice tests, and full stats.",
  }),
  purchaseWelcome: (v: EmailVoice): InboxCopy => ({
    subject: "Tigertest Premium: purchase confirmed",
    preheader: v.id !== "unknown" && !EXAMS_V2.some(e => e.id === v.id)
      ? `Your Premium access is active. Open your full ${exam(v)}stats.`
      : "Your account-wide Premium access is active. See what your purchase includes.",
  }),
  reengagement: (v: EmailVoice): InboxCopy => ({
    subject: `Continue your ${practice(v)}practice`,
    preheader: "Choose one small study step when you are ready.",
  }),
  superAmazingUnlocked: (v: EmailVoice): InboxCopy => ({
    subject: v.id === "unknown" ? "Super Amazing Mode unlocked" : `${inboxLabel(v.shortName, "Tigertest")}: Super Amazing Mode unlocked`,
    preheader: "Open your completed dashboard to see the fireworks.",
  }),
  inactiveShareRequest: (v: EmailVoice): InboxCopy => ({
    subject: `How was your ${practice(v)}practice?`,
    preheader: "Reply with your feedback, or share Tigertest with a friend.",
  }),
  newTests: (): InboxCopy => ({
    subject: "Free SAT and ACT practice on Tigertest",
    preheader: "Explore practice tests and drills, then tell us what to build next.",
  }),
  quizzesLaunch: (): InboxCopy => ({
    subject: "Turn your notes into a practice quiz",
    preheader: "Use Tigertest with your own ChatGPT or Claude account.",
  }),
};

export function exitQuestionInbox(v: EmailVoice, isCorrect: boolean): InboxCopy {
  return isCorrect ? {
    subject: `Keep your ${practice(v)}practice going`,
    preheader: "Revisit your last question and its answer before your next session.",
  } : {
    subject: `A ${exam(v)}question worth another look`,
    preheader: "Review your last question and the correct answer, then try another session.",
  };
}

/** The top prepper email: the number is the person's own, computed at send time. */
export function topPrepperInbox(pct: number): InboxCopy {
  return {
    subject: `You've out-practiced ${pct}% of Tigertest`,
    preheader: "Your numbers so far, and the one part you have not opened yet.",
  };
}

/** Account/service mail stays literal and is never a marketing subject test. */
export const SERVICE_INBOX = {
  reset: { subject: "Reset your Tigertest password", preheader: "Use the reset link to choose a new password for your account." },
  schoolEnquiry: { subject: "We received your Tigertest school enquiry", preheader: "Your enquiry is saved. Thank you for telling us about your school." },
  schoolInvite: (schoolName: string): InboxCopy => ({
    subject: `${inboxLabel(schoolName, "Your school", 50)} invited you to Tigertest`,
    preheader: "Create a Tigertest account with the email address that received this invitation.",
  }),
  schoolProgress: (studentName: string): InboxCopy => ({
    subject: `${inboxLabel(studentName, "A student", 45)} completed all 8 practice sections`,
    preheader: "A practice milestone was recorded for your school, not an official exam result.",
  }),
};

/** Hidden preview appears before the artwork, without leaking raw HTML from a label. */
export function emailText(value: unknown): string {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function emailPreheader(text: string): string {
  const safe = emailText(text);
  return `<div data-email-preheader="true" style="display: none; max-height: 0; max-width: 0; overflow: hidden; opacity: 0; color: transparent; font-size: 1px; line-height: 1px; mso-hide: all;">${safe}</div>`;
}
