// All Tigertest transactional and lifecycle emails.
//
// The shared shell follows the approved email journey: the event exam's real
// tiger and light theme, a 560px white card, and a neutral unknown-exam fallback.
// Tables and inline styles keep the layout usable in email clients.

import { EMAIL_INBOX, exitQuestionInbox, topPrepperInbox, emailPreheader } from "@/lib/email-inbox";
import { practiceLabel } from "@/lib/practiceLabel";
import { postalFooterLine } from "@/lib/emailPostal";
import { EmailVoice, dashboardUrl, statsUrl } from "@/lib/email-voice";
import { TEST_REQUEST_PICKS } from "@/lib/test-requests";
import { emailBrand } from "@/lib/email-brand";
import type { TigerExpression } from "@/lib/tigerAssets";
import { EXAMS_V2 } from "@/lib/v2/registry";

interface ShellOptions {
  /** <title>, used by some clients as the preview label. */
  title: string;
  /** Text shown beside the subject in supporting inboxes. */
  preheader: string;
  voice?: EmailVoice;
  expression?: TigerExpression;
  eyebrow?: string;
  /** The main heading inside the card. */
  heading: string;
  /** Inner HTML for the body cell: paragraphs, lists and the CTA. */
  body: string;
  /**
   * Transactional emails (purchase receipt) omit the unsubscribe link, since
   * they are not marketing and there is nothing to opt out of.
   */
  unsubscribe?: boolean;
}

/** Body paragraph in house style. */
export function p(html: string): string {
  return `              <p style="margin: 0 0 17px; color: #3d5155; font-size: 16px; line-height: 1.65;">
                ${html}
              </p>`;
}

/** Bulleted list in house style. */
export function ul(items: string[]): string {
  return `              <ul style="margin: 0 0 20px; padding-left: 24px; color: #333333; font-size: 16px; line-height: 1.8;">
${items.map((i) => `                <li>${i}</li>`).join("\n")}
              </ul>`;
}

/** The shell replaces the neutral button colour with the exam accent. */
export function cta(href: string, label: string): string {
  return `              <table role="presentation" style="margin: 27px 0 19px; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="${href}" style="display: inline-block; padding: 15px 23px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">${label}</a>
                  </td>
                </tr>
              </table>`;
}

/** Sign-off. Every email is from John, not from a faceless team. */
export function signoff(lead = "Good luck,"): string {
  return `              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                ${lead}<br>
                John @ Tigertest.io
              </p>`;
}

function emailShell({
  title, preheader, heading, body, voice, expression = 3,
  eyebrow = "YOUR NEXT STUDY STEP", unsubscribe = true,
}: ShellOptions): string {
  const brand = emailBrand(voice?.id, expression);
  const label = brand.known && voice ? `TIGERTEST · ${esc(voice.shortName.toUpperCase())} PRACTICE` : "TIGERTEST";
  const footerLinks = unsubscribe
    ? `<a href="https://www.tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #64777b;">Unsubscribe</a> · <a href="https://www.tigertest.io/privacy" style="color: #64777b;">Privacy Policy</a>`
    : `<a href="https://www.tigertest.io/privacy" style="color: #64777b;">Privacy Policy</a>`;
  const themedBody = body
    .replaceAll("background-color: #1a1a1a", `background-color: ${brand.accent}`)
    .replaceAll("#FF6B35", brand.accent);
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<style>@media only screen and (max-width: 480px) { .email-body { padding: 22px 20px 26px !important; } .email-heading { font-size: 27px !important; } }</style>
</head>
<body style="margin: 0; padding: 0; background-color: ${brand.light}; font-family: Arial, Helvetica, sans-serif;">
${emailPreheader(preheader)}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${brand.light};"><tr><td align="center" style="padding: 30px 12px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 560px; background-color: #ffffff; border: 1px solid ${brand.border}; border-radius: 18px; overflow: hidden;">
<tr><td align="center" style="padding: 28px 28px 12px;">
<img src="${brand.tiger}" width="100" height="100" alt="${brand.known && voice ? esc(voice.shortName) + ' practice tiger' : 'Tigertest tiger'}" style="width: 100px; height: 100px; display: block; border: 0;">
<p style="font-size: 12px; letter-spacing: 2px; font-weight: 700; color: ${brand.accent}; margin: 13px 0 0;">${label}</p>
</td></tr>
<tr><td class="email-body" style="padding: 25px 32px 30px;">
<p style="font-size: 10px; letter-spacing: 1.7px; font-weight: 700; color: ${brand.accent}; margin: 0 0 11px;">${esc(eyebrow)}</p>
<h1 class="email-heading" style="font-size: 29px; line-height: 1.2; letter-spacing: -0.7px; color: ${brand.ink}; margin: 0 0 23px;">${esc(heading)}</h1>
${themedBody}
</td></tr></table>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 540px;"><tr><td style="text-align: center; padding: 22px 14px 10px; font-size: 11px; line-height: 1.75; color: #64777b;">
${unsubscribe ? "You receive study emails because you chose to hear from Tigertest." : "This is an account or service message."}<br>
${footerLinks}${postalFooterLine()}
</td></tr></table>
</td></tr></table></body></html>`;
}

const SITE = "https://www.tigertest.io";
const utm = (campaign: string) =>
  `utm_source=tigertest&utm_medium=email&utm_campaign=${campaign}`;

/**
 * The "what should we build next?" answer grid: two pill links per row, each
 * one click to /api/feedback/test-request, which records the pick and asks
 * for the exact exam. {{unsubscribeToken}} doubles as the user token.
 */
export function testRequestButtons(campaign: string): string {
  const cell = (id: string, label: string) =>
    `                  <td style="width: 50%; padding: 4px;">
                    <a href="${SITE}/api/feedback/test-request?pick=${id}&t={{unsubscribeToken}}&src=email&${utm(campaign)}" style="display: block; padding: 12px 10px; border: 1px solid #e5e5e5; border-radius: 10px; color: #1a1a1a; text-decoration: none; font-size: 14px; font-weight: 500; text-align: center;">${label}</a>
                  </td>`;
  const rows: string[] = [];
  for (let i = 0; i < TEST_REQUEST_PICKS.length; i += 2) {
    const [a, b] = [TEST_REQUEST_PICKS[i], TEST_REQUEST_PICKS[i + 1]];
    rows.push(
      `                <tr>\n${cell(a.id, a.label)}\n${b ? cell(b.id, b.label) : '                  <td style="width: 50%; padding: 4px;"></td>'}\n                </tr>`,
    );
  }
  return `              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
${rows.join("\n")}
              </table>`;
}

/** Tracked dashboard link for this voice. */
const DASH = (v: EmailVoice, campaign: string) => dashboardUrl(v, campaign);
const STATS = (v: EmailVoice, campaign: string) => statsUrl(v, campaign);

export type EmailTemplate = (voice: EmailVoice) => string;

export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  // Sent immediately at signup by /api/send-welcome-email.
  welcome: (v) =>
    emailShell({
      eyebrow: "WELCOME TO TIGERTEST",
      voice: v,
      title: EMAIL_INBOX.welcome(v).subject,
      preheader: EMAIL_INBOX.welcome(v).preheader,
      heading: v.id === "unknown" ? "Pick your test, then test yourself." : `Your first ${practiceLabel(v.shortName)} practice test is waiting.`,
      body: [
        p("{{greeting}}"),
        p("Fear not. Thousands of people have used Tigertest to pass their exams, and the ones who pass on their first try all have one thing in common: they actually tested themselves."),
        p(
          v.id === "unknown"
            ? "So pick your exam and take one practice test today. The questions you miss are your study list."
            : `So take one ${practiceLabel(v.shortName)} practice test today. The questions you miss are your study list.`,
        ),
        cta(DASH(v, "welcome"), v.id === "unknown" ? "Find Your Test" : `Take a ${v.shortName} Practice Test`),
        signoff(),
      ].join("\n"),
    }),

  // Sent at signup instead of `welcome` when the account was made from /teach
  // (the signup's redirect is a /teach page). The voice is unused: a teacher
  // has no exam yet, and picks one when they make a class.
  welcomeTeacher: () =>
    emailShell({
      eyebrow: "YOUR TEACHER ACCOUNT",
      title: EMAIL_INBOX.welcomeTeacher().subject,
      preheader: EMAIL_INBOX.welcomeTeacher().preheader,
      heading: "Welcome to Tigertest",
      unsubscribe: false,
      body: [
        p("{{greeting}}"),
        p(
          `Your Tigertest teacher account is ready. Here is how to set up the class you signed up to create.`,
        ),
        ul([
          "Make a class and pick the test your students are preparing for.",
          "Share the class link. Students join with the name you know them by, no account needed.",
          "See who practiced, their scores, and the topics and questions your class keeps missing.",
        ]),
        cta(`${SITE}/teach/new?${utm("welcome_teacher")}`, "Make your first class"),
        p(`Questions or ideas? Just reply to this email. It comes straight to me.`),
        signoff("Thanks,"),
      ].join("\n"),
    }),

  // Stalled study. 25+ questions answered, no test completed, idle 6h.
  firstTestReminder: (v) =>
    emailShell({
      voice: v,
      title: EMAIL_INBOX.firstTestReminder(v).subject,
      preheader: EMAIL_INBOX.firstTestReminder(v).preheader,
      heading: "Choose your next study step.",
      body: [
        p("You have started practising. A full test can help you choose what to study next."),
        p(v.id === "sat" ? "Allow 2 hr 14 min of test time, plus the 10-minute break. For a shorter session, choose a skill drill instead." : "Open your dashboard, choose an available practice test, then review your answers."),
        cta(DASH(v, "first_test_reminder"), "Open Practice"),
        signoff(),
      ].join("\n"),
    }),

  // Keep the default safe for readers whose entitlement is not supplied.
  secondTestNudge: (v) =>
    emailShell({
      voice: v,
      title: EMAIL_INBOX.secondTestNudge(v).subject,
      preheader: EMAIL_INBOX.secondTestNudge(v).preheader,
      heading: "Choose your next study step.",
      body: [
        p("Your practice result is a starting point, not an official score."),
        p("Review the answers you missed, practise one topic, then try another test when you are ready."),
        cta(DASH(v, "second_test_nudge"), "Continue Practicing"),
        p(`<a href="${STATS(v, "second_test_nudge")}" style="color: #FF6B35;">${EXAMS_V2.some(e => e.id === v.id) ? "Open your free study plan and mistake notebook" : "See your stats options"}</a>.${EXAMS_V2.some(e => e.id === v.id) ? "" : " Full stats may require paid access."}`),
        signoff(),
      ].join("\n"),
    }),

  // Hit a paywall 1-24h ago and walked away. The highest-intent moment there
  // is. DMV only: no other exam has a paywall.
  paywallAbandon: (v) =>
    emailShell({
      voice: v,
      title: EMAIL_INBOX.paywallAbandon(v).subject,
      preheader: EMAIL_INBOX.paywallAbandon(v).preheader,
      heading: "Take another look at {{paywallName}}",
      body: [
        p(
          "You recently opened {{paywallName}}. You can return to your practice when you are ready.",
        ),
        p(
          `<strong style="font-weight: 600;">Premium unlocks more practice:</strong>`,
        ),
        ul([
          "Safety &amp; Emergencies and State Laws, 100 questions",
          "Practice tests C and D",
          "Every question you miss, on repeat",
          "Full stats on exams where these require Premium",
        ]),
        cta(DASH(v, "paywall_abandon"), "Open DMV Practice"),
        p("Check the current price and payment details at checkout."),
        signoff(),
      ].join("\n"),
    }),

  // 24h+ old, 50+ questions or 1+ test, active in the last 14 days. DMV only.
  upgradePitch: (v) =>
    emailShell({
      voice: v,
      title: EMAIL_INBOX.upgradePitch().subject,
      preheader: EMAIL_INBOX.upgradePitch().preheader,
      heading: "You're doing the work 💪",
      body: [
        p(
          "You have been working on your practice questions.",
        ),
        p(
          `The free tier is 2 training sets and 2 practice tests, with more available through Premium. <strong style="font-weight: 600;">Premium unlocks the rest:</strong>`,
        ),
        ul([
          "Safety &amp; Emergencies and State Laws, 100 more questions",
          "Practice tests C and D",
          "Your stats page, showing what you always get wrong",
          "Full stats on other exams where Premium is required",
        ]),
        cta(DASH(v, "upgrade_pitch"), "Open DMV Practice"),
        p("Check the current price and payment details at checkout."),
        signoff(),
      ].join("\n"),
    }),

  // Sent after confirmed payment. Context identifies the purchase page, not
  // the current exam. Unknown purchase context stays account-wide; v2 study
  // plans are free and must never be presented as a paid unlock.
  purchaseWelcome: (v) => {
    const campaign = "purchase_welcome";
    const isV2 = EXAMS_V2.some((e) => e.id === v.id);
    const knownPaidStats = v.id !== "unknown" && !isV2;
    return emailShell({
      eyebrow: "PURCHASE CONFIRMATION",
      expression: 1,
      voice: v,
      title: EMAIL_INBOX.purchaseWelcome(v).subject,
      preheader: EMAIL_INBOX.purchaseWelcome(v).preheader,
      heading: "Your Premium access is ready.",
      unsubscribe: false,
      body: [
        p("Your purchase is confirmed. Premium is active on your Tigertest account, on every device you sign in on."),
        p("Premium includes the DMV's extra training sets and practice tests, and full stats on exams where those require paid access."),
        ...(knownPaidStats ? [p(`Start with your full ${v.shortName} stats.`)] : []),
        ...(isV2 ? [p(`Your ${v.shortName} tests, drills, study plan and mistake notebook were already free. This purchase adds the account-wide Premium features above.`)] : []),
        cta(knownPaidStats ? STATS(v, campaign) : DASH(v, campaign), knownPaidStats ? `Open My ${v.shortName} Stats` : "Open Tigertest"),
        p("Reply if anything looks wrong and a human will read it."),
        signoff("Thanks,"),
      ].join("\n"),
    });
  },

  // 5+ days idle with at least one test completed.
  reengagement: (v) =>
    emailShell({
      voice: v,
      title: EMAIL_INBOX.reengagement(v).subject,
      preheader: EMAIL_INBOX.reengagement(v).preheader,
      heading: EMAIL_INBOX.reengagement(v).subject + ".",
      body: [
        p(
          `Ready for another session? Your ${v.testName} practice is here when you need it.`,
        ),
        p("Choose a practice test or a shorter training session when you are ready."),
        cta(DASH(v, "reengagement"), "Continue Practicing"),
        signoff(),
      ].join("\n"),
    }),

  // Once per account, for the first earned dashboard: DMV, v1 or v2. The
  // campaign supplies that dashboard's voice, not the account's current exam.
  // Avoid fixed counts: v2 dashboards can include extra Basics steps, and
  // the account-wide question count does not describe a single exam.
  superAmazingUnlocked: (v) =>
    emailShell({
      eyebrow: "YOU EARNED THIS",
      expression: 2,
      voice: v,
      title: EMAIL_INBOX.superAmazingUnlocked(v).subject,
      preheader: EMAIL_INBOX.superAmazingUnlocked(v).preheader,
      heading: "You unlocked Super Amazing Mode",
      body: [
        p(
          `You completed every step on your ${v.shortName} dashboard and unlocked Super Amazing Mode. <strong style="font-weight: 600;">You did the work.</strong>`,
        ),
        p(
          "So we turned on the fireworks. You earned them, and retaking a test or practising again will not take them away.",
        ),
        p(
          "You can switch them on or off from the Super Amazing Mode card on your completed dashboard.",
        ),
        cta(DASH(v, "super_amazing"), "Go See The Fireworks"),
        signoff("Genuinely well done,"),
      ].join("\n"),
    }),

  // 20+ days idle with at least one test completed.
  inactiveShareRequest: (v) =>
    emailShell({
      voice: v,
      title: EMAIL_INBOX.inactiveShareRequest(v).subject,
      preheader: EMAIL_INBOX.inactiveShareRequest(v).preheader,
      heading: EMAIL_INBOX.inactiveShareRequest(v).subject,
      body: [
        p(
          `What helped in your ${v.testName} practice, and what could work better? Reply to let me know.`,
        ),
        p(
          `If Tigertest helped, <strong style="font-weight: 600;">please share it with a friend</strong>. It helps other learners find practice for their next test.`,
        ),
        cta(
          "https://www.tigertest.io/?utm_source=tigertest&utm_medium=email&utm_campaign=inactive_share",
          "Visit Tigertest",
        ),
        p("If you are still studying, your practice is here when you need it."),
        signoff("Thanks for using Tigertest,"),
      ].join("\n"),
    }),

  // One-off, whole consented base: SAT and ACT launch, then "what should we
  // build next?". DMV readers are mostly 15 to 17, the exact SAT and ACT
  // cohort, so they get the full launch. Everyone else gets one line about it
  // and leads with the question.
  newTests: (v) => {
    const campaign = "sat_act_launch";
    const sat = `${SITE}/sat-practice-test?${utm(campaign)}`;
    const act = `${SITE}/act-practice-test?${utm(campaign)}`;
    const link = (href: string, label: string) =>
      `<a href="${href}" style="color: #1a1a1a; font-weight: 600; text-decoration: underline;">${label}</a>`;
    const question = [
      p(
        `<strong style="font-weight: 600;">Now a question.</strong> What test are you studying for next, or what do you wish existed? I'm one person building Tigertest and I build what people ask for. One click:`,
      ),
      testRequestButtons(campaign),
      p("Or just hit reply. I read every one."),
    ];

    if (v.id === "dmv") {
      return emailShell({
    voice: v,
        title: EMAIL_INBOX.newTests().subject,
      preheader: EMAIL_INBOX.newTests().preheader,
        heading: "SAT and ACT, the Tigertest way",
        body: [
          p(
            "You used Tigertest for your permit test. For a lot of you, the next big test is the SAT or ACT, so we built both the same way: a full practice test first, then short drills on exactly what you missed.",
          ),
          ul([
            "The digital SAT, timed and adaptive like the real one",
            "The new 2025 ACT, all four sections",
            "Short skill drills that work on your phone",
          ]),
          cta(sat, "Take a free SAT practice test"),
          p(`Taking the ACT instead? ${link(act, "Try the free ACT practice test")}.`),
          p(
            "Both practice tests and every drill are free. No credit card, no account needed to start.",
          ),
          p("Parent who signed up for your teen? Forward this along."),
          ...question,
          signoff("Thanks,"),
        ].join("\n"),
      });
    }

    const studyingSatOrAct = v.id === "sat" || v.id === "act";
    return emailShell({
    voice: v,
      title: EMAIL_INBOX.newTests().subject,
      preheader: EMAIL_INBOX.newTests().preheader,
      heading: "What should we build next?",
      body: [
        p(
          studyingSatOrAct
            ? `Quick note while you prep for the ${v.shortName}: Tigertest now has both the ${link(sat, "digital SAT")} and the ${link(act, "new 2025 ACT")}, each with a free full-length practice test. Plenty of students take both.`
            : `Quick news: Tigertest now has full-length practice tests for the ${link(sat, "SAT")} and the ${link(act, "ACT")}, built the same way as the ${v.testName}. Got a high schooler at home? The practice tests are free.`,
        ),
        ...question,
        signoff("Thanks,"),
      ].join("\n"),
    });
  },

  // One-off announcement of quizzes (lib/quizzes.ts): the person's own
  // material as a practice test, from Claude or ChatGPT through the MCP
  // server; setup and the account's quizzes are both on /create. Sent by
  // /api/cron/quizzes-launch. Tigertest never pays for the questions.
  quizzesLaunch: (v) => {
    const campaign = "quizzes_launch";
    const create = `${SITE}/create?utm_source=email&utm_campaign=${campaign}`;
    const link = (href: string, label: string) =>
      `<a href="${href}" style="color: #1a1a1a; font-weight: 600; text-decoration: underline;">${label}</a>`;
    return emailShell({
    voice: v,
      title: EMAIL_INBOX.quizzesLaunch().subject,
      preheader: EMAIL_INBOX.quizzesLaunch().preheader,
      heading: "Turn your notes into a practice quiz",
      body: [
        p(
          `Connect Tigertest to your own ChatGPT or Claude account. Add your notes, a chapter or a syllabus to a chat with Tigertest enabled, say "make this a Tigertest quiz", and you get a link to a real practice test:`,
        ),
        ul([
          "Timed tests",
          "A training set that keeps bringing back what you miss",
          "Flashcards",
          "A practice score to help you choose what to review",
        ]),
        p("Share the link with your study group or class and see who got what."),
        cta(create, "Make a quiz"),
        p(
          `The steps to connect ChatGPT or Claude, and the quizzes you have made, are at ${link(create, "https://www.tigertest.io/create")}.`,
        ),
        p(`Your ${v.testName} practice is still here, unchanged: ${link(DASH(v, campaign), "open your dashboard")}.`),
        signoff("Thanks,"),
      ].join("\n"),
    });
  },
};

// ── The question that got away ───────────────────────────────────────────────
// Sent by /api/cron/exit-question to someone who stopped studying right after
// a question and has not been back for a few days: the question, the answer,
// the why, and a nudge back. Bank text goes into raw HTML, so it is escaped.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export interface ExitQuestionContent {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  /** Whether they got it right before leaving. */
  isCorrect: boolean;
}

export function exitQuestionSubject(c: ExitQuestionContent, v?: EmailVoice): string {
  if (v) return exitQuestionInbox(v, c.isCorrect).subject;
  return c.isCorrect ? "Keep your practice going" : "A question worth another look";
}

/** Match the app's answer review without inventing an unavailable selected choice. */
function questionCard(v: EmailVoice, c: ExitQuestionContent): string {
  const brand = emailBrand(v.id);
  const badge = c.isCorrect ? "Correct last time" : "Incorrect last time";
  const badgeBg = c.isCorrect ? "#f0fdf4" : "#fef2f2";
  const badgeInk = c.isCorrect ? "#166534" : "#991b1b";
  const options = c.options.length ? c.options : c.answer ? [c.answer] : [];
  const rows = options.map((option, index) => {
    const correct = option === c.answer;
    const border = correct ? "#22c55e" : "#d1d5db";
    const fill = correct ? "#f0fdf4" : "#ffffff";
    const color = correct ? "#14532d" : "#6b7280";
    const label = c.options.length ? `${String.fromCharCode(65 + index)})` : "";
    return `<tr><td style="padding: 0 0 12px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 2px solid ${border}; border-radius: 8px; background-color: ${fill};"><tr>
<td width="26" valign="top" style="padding: 16px 0 16px 16px; font-size: 18px; font-weight: 700; color: ${color};">${label}</td>
<td style="padding: 16px; font-size: 15px; line-height: 1.5; color: ${color};">${esc(option)}${correct ? '<span style="display: block; font-size: 11px; font-weight: 700; margin-top: 5px; color: #15803d;">Correct answer</span>' : ""}</td>
</tr></table></td></tr>`;
  }).join("\n");
  const explanation = c.explanation ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 12px; border: 1px solid ${brand.border}; border-radius: 8px; background-color: ${brand.light};"><tr><td style="padding: 16px;">
<p style="margin: 0 0 8px; color: ${brand.ink}; font-size: 15px; font-weight: 700;">Explanation</p>
<p style="margin: 0; color: ${brand.ink}; font-size: 15px; line-height: 1.6;">${esc(c.explanation)}</p>
</td></tr></table>` : "";
  return `<table data-question-review="true" role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;"><tr><td style="padding: 20px;">
<span style="display: inline-block; border-radius: 6px; padding: 6px 9px; background-color: ${badgeBg}; color: ${badgeInk}; font-size: 12px; font-weight: 700;">${badge}</span>
<h2 style="font-size: 20px; line-height: 1.4; margin: 17px 0 20px; color: #111827; font-weight: 700;">${esc(c.question)}</h2>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
${explanation}
</td></tr></table>`;
}

export function exitQuestionEmail(v: EmailVoice, c: ExitQuestionContent): string {
  const campaign = "exit_question";
  const name = v.id === "unknown" ? "" : `${v.shortName} `;
  return emailShell({
    voice: v,
    eyebrow: "PICK UP YOUR PRACTICE",
    title: exitQuestionSubject(c, v),
    preheader: exitQuestionInbox(v, c.isCorrect).preheader,
    heading: c.isCorrect ? `Keep your ${name}practice going.` : `A ${name}question worth another look.`,
    body: [
      p(c.isCorrect
        ? `You got your last ${name}question right. Here is a quick refresher before your next session.`
        : `This was the last ${name}question you answered. You did not get it right that time. Here is a quick review.`),
      questionCard(v, c),
      p(c.isCorrect
        ? "Continue when you are ready. Your next study step can be a small one."
        : "When you are ready, you can continue with another practice session."),
      cta(DASH(v, campaign), `Continue ${name}Practice`),
      signoff(),
    ].join("\n"),
  });
}

/** A short list with a tick per line, each item kept to one line on a phone. */
function checklist(items: string[]): string {
  const rows = items.map((item, i) => `<tr>
<td width="30" valign="top" style="padding: ${i ? 11 : 0}px 0 0; font-size: 17px; line-height: 1.4; font-weight: 700; color: #FF6B35;">&#10003;</td>
<td valign="top" style="padding: ${i ? 11 : 0}px 0 0; font-size: 16px; line-height: 1.4; color: #1f2d30;">${item}</td>
</tr>`).join("\n");
  return `              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 6px; border: 1px solid #ebe7e0; border-radius: 12px; background-color: #faf8f5;"><tr><td style="padding: 18px 20px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
${rows}
</table>
</td></tr></table>`;
}

/** What the top prepper email says about one person (lib/topPrepper.ts). */
export interface TopPrepperContent {
  /** Questions answered on Tigertest. */
  answers: number;
  /** They have answered more than this percent of people who practise. */
  pct: number;
  /** The locked thing they opened, as the paywall named it; may be empty. */
  item: string;
}

/**
 * Sent by /api/cron/top-prepper. The button opens the test's dashboard with
 * `?unlock=1`, which opens the paywall there, so checkout is one tap away.
 */
export function topPrepperEmail(v: EmailVoice, c: TopPrepperContent): string {
  const inbox = topPrepperInbox(c.pct);
  const name = v.id === "unknown" ? "" : `${v.shortName} `;
  const unlock = `${DASH(v, "top_prepper")}&unlock=1`;
  return emailShell({
    voice: v,
    expression: 1,
    eyebrow: "YOU ARE A TOP PREPPER",
    title: inbox.subject,
    preheader: inbox.preheader,
    heading: "You are smashing it.",
    body: [
      p(`You have answered <strong style="font-weight: 700;">${c.answers.toLocaleString("en-US")} practice questions</strong> on Tigertest. That is more than ${c.pct}% of the people who practice here.`),
      p(c.item
        ? `You opened <strong style="font-weight: 600;">${esc(c.item)}</strong> a little while ago and it was locked. Premium opens it, along with:`
        : "A little while ago you opened a part that was locked. Premium opens it, along with:"),
      checklist(v.id === "dmv"
        ? ["Training sets 3 and 4", "Practice tests 3 and 4", "Every question you keep missing", "Premium on every other test here"]
        : [`The final ${name}training set`, `The final ${name}practice test`, "Every question you keep missing", "Premium on every other test here"]),
      cta(unlock, `Unlock ${name}Premium`),
      p("Pay once and it's yours. No subscription."),
      signoff("Keep going,"),
    ].join("\n"),
  });
}
