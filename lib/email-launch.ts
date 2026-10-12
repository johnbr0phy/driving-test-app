/**
 * The SAT/ACT launch email as a four-way split test (v1, v3, v4, v5; a
 * parent-angle v2 was cut because few parents sign up).
 *
 * Each DMV reader gets one variant, picked from their uid so a retry or a
 * second run always lands on the same one. Every link goes through
 * /api/email/click, which records the variant that was clicked before
 * redirecting, and the variant is stamped on the user doc at send time
 * (users/{uid}.emailVariants.newTests2026). /admin/v2 compares them.
 *
 * Readers studying anything other than the DMV are not in the test: these
 * pitches are written for teens just past the permit test.
 */

export const LAUNCH_EXPERIMENT = "newTests2026";

const SITE = "https://tigertest.io";
const SAT = "#1450d2";
const SAT_LIGHT = "#ebf1ff";
const ACT = "#b6203a";
const ACT_LIGHT = "#fcebee";
const TEXT = "color: #4a4a4a; font-size: 16px; line-height: 1.6;";

export interface LaunchVariant {
  id: string;
  name: string;
  subject: string;
  /** Inbox preview line after the subject. */
  preheader: string;
  html: () => string;
}

/** A tracked link: records the click against this variant, then redirects. */
function track(variant: string, path: string): string {
  return `${SITE}/api/email/click?c=${LAUNCH_EXPERIMENT}&v=${variant}&t={{unsubscribeToken}}&to=${encodeURIComponent(path)}`;
}

function tiger(exam: "sat" | "act", expression: number, size = 128): string {
  const [color, light, label] = exam === "sat" ? [SAT, SAT_LIGHT, "SAT"] : [ACT, ACT_LIGHT, "ACT"];
  return `<td align="center" valign="bottom" style="padding: 0 6px;">
                    <img src="${SITE}/tigers/${exam}/tiger_face_0${expression}.png" width="${size}" height="${size}" alt="${label} tiger" style="display: block; width: ${size}px; height: ${size}px; border: 0;" />
                    <span style="display: inline-block; margin-top: 8px; padding: 4px 14px; border-radius: 50px; background-color: ${light}; color: ${color}; font-size: 13px; font-weight: 700; letter-spacing: 0.06em;">${label}</span>
                  </td>`;
}

function hero(sat: number, act: number | null): string {
  const cells = act === null ? tiger("sat", sat, 168) : `${tiger("sat", sat)}\n${tiger("act", act)}`;
  return `<table role="presentation" align="center" style="border-collapse: collapse; margin: 0 auto;"><tr>
${cells}
                </tr></table>`;
}

const p = (html: string, small = false) =>
  `<p style="margin: 0 0 18px; ${TEXT}${small ? " font-size: 15px;" : ""}">${html}</p>`;

const button = (href: string, label: string) =>
  `<table role="presentation" style="margin: 26px 0 22px; border-collapse: collapse;"><tr><td>
                <a href="${href}" style="display: inline-block; padding: 15px 30px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px;">${label}</a>
              </td></tr></table>`;

const link = (href: string, label: string, color = "#1a1a1a") =>
  `<a href="${href}" style="color: ${color}; font-weight: 600; text-decoration: underline;">${label}</a>`;

function shell(v: { subject: string; preheader: string }, heroHtml: string, heading: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${v.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${v.preheader}</div>
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" style="width: 100%; max-width: 560px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 36px 36px 8px; text-align: center; background-color: ${SAT_LIGHT}; background: linear-gradient(180deg, ${SAT_LIGHT} 0%, #ffffff 100%);">
              ${heroHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 36px 32px;">
              <h1 style="margin: 0 0 16px; color: #1a1a1a; font-size: 26px; line-height: 1.25; font-weight: 700;">${heading}</h1>
              ${body}
              <p style="margin: 8px 0 0; ${TEXT}">John @ TigerTest.io</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 36px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="${SITE}/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;&bull;&nbsp;
                <a href="${SITE}/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
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

const SAT_PAGE = "/sat-practice-test";
const ACT_PAGE = "/act-practice-test";

/** Other tests a permit-age reader may be facing soon, most timely first. */
const MORE_TESTS: [string, string][] = [
  ["Food Handler card", "/food-handler-practice-test"],
  ["ASVAB", "/asvab-practice-test"],
  ["Hunter Safety", "/hunter-safety-practice-test"],
  ["Motorcycle permit", "/motorcycle-practice-test"],
  ["ACCUPLACER", "/accuplacer-practice-test"],
  ["CPR and First Aid", "/cpr-practice-test"],
];

/** The same "and more" lines under every variant, so it doesn't skew the test. */
function moreTests(id: string): string {
  const links = MORE_TESTS.map(([label, path]) => link(track(id, path), label)).join(" &nbsp;&bull;&nbsp; ");
  return (
    p("<strong>Also new on TigerTest:</strong>") +
    p(links) +
    p(link(track(id, "/tests"), "See all 40+ practice tests"))
  );
}

function variant(
  id: string,
  name: string,
  subject: string,
  preheader: string,
  build: (v: { sat: string; act: string }) => { hero: string; heading: string; body: string }
): LaunchVariant {
  return {
    id,
    name,
    subject,
    preheader,
    html: () => {
      const parts = build({ sat: track(id, SAT_PAGE), act: track(id, ACT_PAGE) });
      return shell({ subject, preheader }, parts.hero, parts.heading, parts.body + moreTests(id));
    },
  };
}

/**
 * Every variant in the test. Drop one from this list to stop sending it.
 * Ids stay fixed (no renumbering) so recorded results keep their meaning.
 */
export const LAUNCH_VARIANTS: LaunchVariant[] = [
  variant("v1", "Next step", "Permit test: done. SAT: next.", "Same TigerTest format, now for the SAT and ACT. First practice test is free.", ({ sat, act }) => ({
    hero: hero(3, 3),
    heading: "Permit test: done.<br>SAT: next.",
    body:
      p("You prepped for your permit test with TigerTest. Now do it for the SAT and ACT.") +
      p("<strong>Full-length timed tests. Short drills for your phone.</strong> Practice Test 1 is free.") +
      button(sat, "Take a free SAT practice test") +
      p(`Taking the ACT instead? ${link(act, "Start here", ACT)}.`, true),
  })),
  variant("v3", "Price", "SAT and ACT prep. $9.99. Once.", "Prep courses cost hundreds. TigerTest Premium covers the SAT, ACT and your permit test.", ({ sat, act }) => ({
    hero: hero(1, 1),
    heading: "SAT and ACT prep.<br>$9.99. Once.",
    body:
      p("Prep courses cost hundreds. TigerTest Premium is <strong>$9.99, one time</strong>, and covers the SAT, the ACT and your permit test.") +
      p("Start with a free full-length practice test.") +
      button(sat, "Try it free") +
      p(`${link(sat, "SAT", SAT)} &nbsp;&bull;&nbsp; ${link(act, "ACT", ACT)}`, true),
  })),
  variant("v4", "The score", "What would you score on the SAT today?", "Find out in one sitting. Full-length, timed, adaptive. Free.", ({ sat, act }) => ({
    hero: hero(5, null),
    heading: "What would you score on the SAT today?",
    body:
      p("Find out in one sitting. <strong>Full-length, timed, adaptive</strong>, scored like the real thing.") +
      p("Free. No credit card.") +
      button(sat, "Get my score") +
      p(`Taking the ACT? ${link(act, "Get your ACT score", ACT)}.`, true),
  })),
  variant("v5", "From John", "I built the SAT and ACT", "The permit test was step one. Here's what's next.", ({ sat, act }) => ({
    hero: hero(2, 2),
    heading: "I built the SAT and ACT",
    body:
      p("Hey, it's John from TigerTest.") +
      p("The permit test was step one. For most of you the SAT or ACT is next, so I built both the TigerTest way. Your first practice test is free.") +
      button(sat, "Take the SAT") +
      p(`Or ${link(act, "take the ACT", ACT)}. What should I build after that? Hit reply.`, true),
  })),
];

export function getLaunchVariant(id: unknown): LaunchVariant | null {
  return LAUNCH_VARIANTS.find((v) => v.id === id) ?? null;
}

/**
 * Stable variant for a user: FNV-1a of the uid, mod the variant count.
 * NEW_TESTS_WINNER=v3 (say) sends everyone not yet emailed that variant,
 * for when the test has a clear winner and the rest of the list is waiting.
 */
export function pickLaunchVariant(uid: string, winner = process.env.NEW_TESTS_WINNER): LaunchVariant {
  const forced = getLaunchVariant(winner);
  if (forced) return forced;
  let h = 0x811c9dc5;
  for (let i = 0; i < uid.length; i++) {
    h ^= uid.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return LAUNCH_VARIANTS[h % LAUNCH_VARIANTS.length];
}
