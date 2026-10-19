// All TigerTest transactional and lifecycle emails.
//
// Every email is built from one shared shell (`emailShell`) so the house style
// lives in exactly one place: cream page, 600px white card, 48px tiger, 24px
// heading, 15px/1.7 body, black pill CTA, "John @ TigerTest.io" sign-off.
//
// The canonical layout was previously duplicated inline in
// /api/send-welcome-email, which is why the cron emails had drifted: wrong
// outer padding, wrong footer border, and a "The TigerTest Team" sign-off that
// no live email actually used. That route now renders EMAIL_TEMPLATES.welcome.
//
// Every template is a function of an EmailVoice (lib/email-voice), so the
// exam name, question counts and links match the exam the reader is studying.
// Pass voiceFor("dmv") for the original DMV copy.

import { EmailVoice, dashboardUrl, statsUrl } from "@/lib/email-voice";
import { TEST_REQUEST_PICKS } from "@/lib/test-requests";
import { EXAMS_V2 } from "@/lib/v2/registry";

interface ShellOptions {
  /** <title>, used by some clients as the preview label. */
  title: string;
  /** The 24px heading inside the card. */
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
  return `              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                ${html}
              </p>`;
}

/** Bulleted list in house style. */
export function ul(items: string[]): string {
  return `              <ul style="margin: 0 0 20px; padding-left: 24px; color: #333333; font-size: 16px; line-height: 1.8;">
${items.map((i) => `                <li>${i}</li>`).join("\n")}
              </ul>`;
}

/** The black pill button. */
export function cta(href: string, label: string): string {
  return `              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="${href}" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">${label}</a>
                  </td>
                </tr>
              </table>`;
}

/** Sign-off. Every email is from John, not from a faceless team. */
export function signoff(lead = "Good luck,"): string {
  return `              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                ${lead}<br>
                John @ TigerTest.io
              </p>`;
}

function emailShell({
  title,
  heading,
  body,
  unsubscribe = true,
}: ShellOptions): string {
  const footerLinks = unsubscribe
    ? `<a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>`
    : `<a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://www.tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">${heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
${body}
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                ${footerLinks}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const SITE = "https://tigertest.io";
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

/** "your DMV test" in the DMV voice, "your citizenship test" elsewhere. */
const your = (v: EmailVoice) => `your ${v.testName}`;

export type EmailTemplate = (voice: EmailVoice) => string;

export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  // Sent immediately at signup by /api/send-welcome-email.
  welcome: (v) =>
    emailShell({
      title: "Welcome to TigerTest",
      heading: "Welcome to TigerTest",
      body: [
        // The DMV wording is the one email that was already live and working,
        // so it is unchanged in the DMV voice; other exams swap in their test
        // name, their test length, and one line on what the bank is built from.
        p("{{greeting}}"),
        p(
          `Fear not. Thousands of people have used TigerTest to pass their ${v.testName}, and the ones who pass on their first try all have one thing in common: they actually tested themselves.`,
        ),
        ...(v.sourceLine ? [p(v.sourceLine)] : []),
        p(
          `<strong style="font-weight: 600;">The best way to prep is to spend 30 minutes doing practice tests.</strong> Answer questions one after the other, without instant feedback. That's exactly what the real test feels like.`,
        ),
        p(
          `After ${v.questionsPerTest} questions, you'll have a really accurate picture of how ready you are.`,
        ),
        cta(DASH(v, "welcome"), "Take Your First Practice Test"),
        p(
          "You can use our training mode later to drill down on the stuff you got wrong. But start with a full test first - it's the fastest way to see where you actually stand.",
        ),
        signoff(),
      ].join("\n"),
    }),

  // Stalled study. 25+ questions answered, no test completed, idle 6h.
  firstTestReminder: (v) =>
    emailShell({
      title: "Take 5 minutes to try a test",
      heading: "You were on a roll",
      body: [
        p(
          "You've answered {{questionCount}} questions in training. You haven't taken a full test yet, and that's the part that tells you whether you're ready.",
        ),
        p(
          `<strong style="font-weight: 600;">30 minutes, ${v.questionsPerTest} questions.</strong> Even if you bomb it, you'll know exactly what to study.`,
        ),
        cta(DASH(v, "first_test_reminder"), "Start Practice Test"),
        signoff(),
      ].join("\n"),
    }),

  // Completed exactly one test in the last 48 hours.
  secondTestNudge: (v) =>
    emailShell({
      title: "One test down - here's what to do next",
      heading: "Nice work on test #1! 🎉",
      body: [
        p(
          `One test down. <a href="${STATS(
            v,
            "second_test_nudge",
          )}" style="color: #FF6B35; text-decoration: none; font-weight: 500;">Your stats</a> show which question types tripped you up.`,
        ),
        p(
          `<strong style="font-weight: 600;">Now take another one.</strong> The first test showed what you don't know. The second shows whether you're actually improving.`,
        ),
        cta(DASH(v, "second_test_nudge"), "Take Another Practice Test"),
        p("If you bombed the first one, don't sweat it. Most people do."),
        signoff(),
      ].join("\n"),
    }),

  // Hit a paywall 1-24h ago and walked away. The highest-intent moment there
  // is. DMV only: no other exam has a paywall.
  paywallAbandon: (v) =>
    emailShell({
      title: "{{paywallName}} is still waiting",
      heading: "You stopped at {{paywallName}}",
      body: [
        p(
          "You've answered {{questionCount}} questions, then hit {{paywallName}} and stopped. It's one of the two sections that decide most tests.",
        ),
        p(
          `<strong style="font-weight: 600;">$9.99 opens it for good:</strong>`,
        ),
        ul([
          "Safety &amp; Emergencies and State Laws, 100 questions",
          "Practice tests C and D",
          "Every question you miss, on repeat",
          "SAT and ACT Premium too, for whatever test is next",
        ]),
        cta(DASH(v, "paywall_abandon"), "Pick Up Where You Left Off"),
        p("One payment, no subscription. A retest costs more."),
        signoff(),
      ].join("\n"),
    }),

  // 24h+ old, 50+ questions or 1+ test, active in the last 14 days. DMV only.
  upgradePitch: (v) =>
    emailShell({
      title: "You're serious about this - here's what unlocks next",
      heading: "You're doing the work 💪",
      body: [
        p(
          "{{questionCount}} questions answered. That's more than most people manage.",
        ),
        p(
          `The free tier is 2 training sets and 2 practice tests, so you've probably hit the limit. <strong style="font-weight: 600;">$9.99, once, unlocks the rest:</strong>`,
        ),
        ul([
          "Safety &amp; Emergencies and State Laws, 100 more questions",
          "Practice tests C and D",
          "Your stats page, showing what you always get wrong",
          "SAT and ACT Premium too: Practice Test 2 and every drill",
        ]),
        cta(DASH(v, "upgrade_pitch"), "Upgrade to Premium - $9.99"),
        signoff(),
      ].join("\n"),
    }),

  // Sent by the Stripe webhook the moment a purchase lands. Transactional, so
  // no unsubscribe link. Leads with the exam the buyer paid from (DMV, SAT or
  // ACT), then links every exam Premium covers, because the SAT and ACT
  // dashboards are hard to find from the DMV side of the site.
  purchaseWelcome: (v) => {
    const campaign = "purchase_welcome";
    const link = (path: string, label: string) =>
      `<a href="${SITE}${path}?${utm(campaign)}" style="color: #1a1a1a; font-weight: 600; text-decoration: underline;">${label}</a>`;
    const premiumV2 = EXAMS_V2.filter((e) => e.premium);
    const lead = premiumV2.find((e) => e.id === v.id);

    const lockedDrillCount = (id: string) => premiumV2.find((e) => e.id === id)!.premium!.lockedDrills.length;

    const dmvLine = `${link("/dashboard", "DMV permit test")}: Safety &amp; Emergencies and State Laws, practice tests C and D, and your stats page`;
    // The exam they bought from goes first, then the other v2 exams, then the DMV.
    const v2Lines = [...premiumV2]
      .sort((a, b) => Number(b.id === v.id) - Number(a.id === v.id))
      .map((e) => `${link(`${e.slug}/dashboard`, `${e.shortName} practice`)}: Practice Test 2 and ${lockedDrillCount(e.id)} more skill drills`);
    const lines = lead ? [...v2Lines, dmvLine] : [dmvLine, ...v2Lines];

    return emailShell({
      title: "You're in - here's what just unlocked",
      heading: "You're in 🎉",
      unsubscribe: false,
      body: [
        p(
          "Thanks for buying Premium. It's live on your account now, on every device you sign in on, and it covers every exam below:",
        ),
        ul(lines),
        lead
          ? p(
              `Start with ${lead.shortName} Practice Test 2. It never appears in the drills, so your score is an honest read on how ready you are.`,
            )
          : p("Open your stats after the next test. It tells you where to spend your study time."),
        lead
          ? cta(`${SITE}${lead.slug}/dashboard?${utm(campaign)}`, `Open Your ${lead.shortName} Dashboard`)
          : cta(DASH(v, campaign), "Start With Safety & Emergencies"),
        p(
          `Taking the ${[...premiumV2.filter((e) => e.id !== v.id).map((e) => e.shortName), ...(lead ? ["permit test"] : [])].join(" or ")} ${lead ? "too" : "later"}? Bookmark the links above. Your Premium is already there.`,
        ),
        p(
          "One-time payment, nothing to cancel. Reply if anything looks wrong and a human will read it.",
        ),
        signoff(lead ? "Good luck on test day," : "Good luck at the DMV,"),
      ].join("\n"),
    });
  },

  // 5+ days idle with at least one test completed.
  reengagement: (v) =>
    emailShell({
      title: "Test coming up soon?",
      heading: "Test coming up soon?",
      body: [
        p(
          `Haven't seen you in a while. If ${your(v)} is close, a week away from practice questions is enough to forget the details.`,
        ),
        p("Take one more test and see if you're still sharp."),
        cta(DASH(v, "reengagement"), "Continue Practicing"),
        signoff(),
      ].join("\n"),
    }),

  // Fired once, the first time someone completes all 8 steps. Pure
  // celebration: nothing to buy, nothing to do. The unlock is latched in the
  // store, so retaking a test can never re-trigger this. DMV only: the latch
  // only exists on the DMV dashboard.
  superAmazingUnlocked: (v) =>
    emailShell({
      title: "You unlocked Super Amazing Mode",
      heading: "SUPER AMAZING MODE 🎉",
      body: [
        p(
          `You just finished all ${v.stepCount} steps. Every training set, every practice test, {{questionCount}} questions answered. That is the whole thing, done.`,
        ),
        p(
          `Almost nobody gets here. Most people take one test, decide they're probably fine, and wing it at the DMV. <strong style="font-weight: 600;">You did the work.</strong>`,
        ),
        p(
          `So we turned on the fireworks. Actual fireworks, on every page, forever. They're yours now and they are not going anywhere, even if you retake a test for fun.`,
        ),
        cta(DASH(v, "super_amazing"), "Go See The Fireworks"),
        p(
          "Go pass that test. You're more ready than almost anyone walking into the DMV today.",
        ),
        signoff("Genuinely well done,"),
      ].join("\n"),
    }),

  // 20+ days idle with at least one test completed.
  inactiveShareRequest: (v) =>
    emailShell({
      title: "Did you pass?",
      heading: "Did you pass?",
      body: [
        p(
          `We haven't seen you in a while, so we're guessing you went out and passed ${your(v)}. Congrats!`,
        ),
        p(
          `If TigerTest helped, <strong style="font-weight: 600;">please share it with a friend</strong>. Word of mouth is the #1 way people find us.`,
        ),
        cta(
          "https://tigertest.io/?utm_source=tigertest&utm_medium=email&utm_campaign=inactive_share",
          "Share TigerTest.io",
        ),
        p("And if you haven't taken your test yet, no rush. We're still here."),
        signoff("Thanks for using TigerTest,"),
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
        `<strong style="font-weight: 600;">Now a question.</strong> What test are you studying for next, or what do you wish existed? I'm one person building TigerTest and I build what people ask for. One click:`,
      ),
      testRequestButtons(campaign),
      p("Or just hit reply. I read every one."),
    ];

    if (v.id === "dmv") {
      return emailShell({
        title: "SAT and ACT, the TigerTest way",
        heading: "SAT and ACT, the TigerTest way",
        body: [
          p(
            "You used TigerTest for your permit test. For a lot of you, the next big test is the SAT or ACT, so we built both the same way: a full practice test first, then short drills on exactly what you missed.",
          ),
          ul([
            "The digital SAT, timed and adaptive like the real one",
            "The new 2025 ACT, all four sections",
            "Short skill drills that work on your phone",
          ]),
          p(`<strong style="font-weight: 600;">Practice Test 1 is free.</strong> No credit card.`),
          cta(sat, "Take a free SAT practice test"),
          p(`Taking the ACT instead? ${link(act, "Try the free ACT practice test")}.`),
          p(
            "Premium is still $9.99, one time, and now covers the SAT and ACT too. Already bought it for your permit test? You're already unlocked.",
          ),
          p("Parent who signed up for your teen? Forward this along."),
          ...question,
          signoff("Thanks,"),
        ].join("\n"),
      });
    }

    const studyingSatOrAct = v.id === "sat" || v.id === "act";
    return emailShell({
      title: "What should we build next?",
      heading: "What should we build next?",
      body: [
        p(
          studyingSatOrAct
            ? `Quick note while you prep for the ${v.shortName}: TigerTest now has both the ${link(sat, "digital SAT")} and the ${link(act, "new 2025 ACT")}, each with a free full-length practice test. Plenty of students take both.`
            : `Quick news: TigerTest now has full-length practice tests for the ${link(sat, "SAT")} and the ${link(act, "ACT")}, built the same way as the ${v.testName}. Got a high schooler at home? Practice Test 1 is free.`,
        ),
        ...question,
        signoff("Thanks,"),
      ].join("\n"),
    });
  },
};
