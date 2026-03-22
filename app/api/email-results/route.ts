import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_ZABm3to6_GzdZQQ58cj5DYftGbtr9ub1a");

function buildResultsEmail({
  email,
  score,
  total,
  percentage,
  passed,
  stateName,
  testId,
  weakCategories,
}: {
  email: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  stateName: string;
  testId: number;
  weakCategories: { category: string; wrong: number; total: number; accuracy: number }[];
}) {
  const statusColor = passed ? "#16a34a" : "#FF6B35";
  const statusText = passed ? "PASSED ✓" : "NOT YET";
  const statusBg = passed ? "#f0fdf4" : "#fff7f5";

  const weakCategoryRows = weakCategories.slice(0, 5).map((cat) => `
    <tr>
      <td style="padding: 10px 12px; font-size: 14px; color: #333; border-bottom: 1px solid #f0f0f0;">${cat.category}</td>
      <td style="padding: 10px 12px; font-size: 14px; color: #e53e3e; font-weight: 600; text-align: right; border-bottom: 1px solid #f0f0f0;">${cat.wrong} wrong (${cat.accuracy}% accuracy)</td>
    </tr>
  `).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your TigerTest Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 52px; height: auto; margin-bottom: 12px;" />
              <div style="color: #aaa; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px;">tigertest.io</div>
              <div style="color: #666; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">DMV PRACTICE TEST RESULTS</div>
            </td>
          </tr>

          <!-- Score card -->
          <tr>
            <td style="padding: 32px 40px 24px; text-align: center; background-color: ${statusBg};">
              <div style="font-size: 72px; font-weight: 900; color: ${statusColor}; line-height: 1;">${percentage}%</div>
              <div style="font-size: 16px; font-weight: 700; color: ${statusColor}; letter-spacing: 2px; margin-top: 4px;">${statusText}</div>
              <div style="font-size: 15px; color: #666; margin-top: 8px;">${score} out of ${total} correct · ${stateName} · Test ${testId}</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 40px;">

              ${!passed ? `
              <p style="margin: 0 0 20px; color: #333; font-size: 15px; line-height: 1.7;">
                You didn't pass this time — but here's the thing: most people who pass on their first real DMV test have taken <strong>3-5 practice tests</strong> first. You're already ahead of the people who walk in cold.
              </p>
              ` : `
              <p style="margin: 0 0 20px; color: #333; font-size: 15px; line-height: 1.7;">
                Great score — you're in strong shape for the real test. Keep that momentum going with a couple more practice runs to make sure it sticks.
              </p>
              `}

              ${weakCategories.length > 0 ? `
              <h3 style="margin: 0 0 12px; font-size: 15px; font-weight: 700; color: #1a1a1a;">📚 Your weak spots this test:</h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #f0f0f0; margin-bottom: 24px;">
                ${weakCategoryRows}
              </table>
              <p style="margin: 0 0 24px; color: #555; font-size: 14px; line-height: 1.6;">
                Focus on these categories in your next study session. TigerTest Premium lets you drill these specific topics in Training Mode — targeting your weak spots is the fastest way to push your score above 80%.
              </p>
              ` : `
              <p style="margin: 0 0 24px; color: #555; font-size: 14px; line-height: 1.6;">
                Looking good across the board. Keep it up!
              </p>
              `}

              <!-- CTA -->
              <table role="presentation" style="margin: 0 0 28px; border-collapse: collapse; width: 100%;">
                <tr>
                  <td style="background: linear-gradient(135deg, #FF6B35 0%, #e55a27 100%); border-radius: 8px; text-align: center; padding: 2px;">
                    <a href="https://tigertest.io/dashboard?utm_source=results-email&utm_medium=email&utm_campaign=email-results" style="display: block; padding: 14px 28px; color: #ffffff; text-decoration: none; border-radius: 7px; font-weight: 700; font-size: 16px;">
                      Keep Practicing on TigerTest →
                    </a>
                  </td>
                </tr>
              </table>

              <div style="background: #FFF9F5; border: 1px solid #ffe0cc; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 13px; font-weight: 700; color: #FF6B35; margin-bottom: 6px;">🚀 TigerTest Premium — $9.99 one-time</div>
                <ul style="margin: 0; padding-left: 18px; color: #555; font-size: 13px; line-height: 1.8;">
                  <li>All 4 practice tests (not just 3)</li>
                  <li>Targeted training sets by category</li>
                  <li>Full performance stats and history</li>
                  <li>One payment — no subscription</li>
                </ul>
              </div>

              <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.6;">
                Good luck on the real thing,<br>
                <strong>John @ TigerTest</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999; font-size: 12px; line-height: 1.6; text-align: center;">
                You requested this results summary on tigertest.io.<br>
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return html;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, score, total, percentage, passed, stateName, testId, weakCategories } = body;

    if (!email || typeof score !== "number" || typeof total !== "number") {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    const html = buildResultsEmail({
      email,
      score: score || 0,
      total: total || 50,
      percentage: percentage || 0,
      passed: passed || false,
      stateName: stateName || "Your State",
      testId: testId || 1,
      weakCategories: weakCategories || [],
    });

    const result = await resend.emails.send({
      from: "TigerTest <noreply@tigertest.io>",
      to: email,
      subject: `Your TigerTest results: ${percentage}% — ${passed ? "Passed ✓" : "Keep going!"}`,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email results error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
