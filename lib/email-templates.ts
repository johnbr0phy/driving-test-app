// Auto-extracted from functions/src/index.ts
// DO NOT edit HTML here — edit functions/src/index.ts and re-sync

export const EMAIL_TEMPLATES: Record<string, string> = {
  welcome: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TigerTest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Welcome to TigerTest</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                {{greeting}}
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Welcome to TigerTest.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Trust us - <strong style="font-weight: 600;">the best way to prep is to spend 30 minutes doing practice tests</strong>. Set some time aside. Practice actually answering questions one after the other where you don't get instant feedback on whether you're right or wrong.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                That's what the real test feels like. And after 50 questions, you'll get a really accurate idea of how ready you are.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=welcome" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Take Your First Practice Test</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                You can use our training mode later to drill down on the stuff you got wrong. But start with a full test first - it's the fastest way to see where you actually stand.
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Good luck,<br>
                The TigerTest Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  firstTestReminder: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Take 5 minutes to try a test</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">You signed up yesterday</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Quick check-in.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                You signed up for TigerTest yesterday but haven't taken a practice test yet.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                We get it - it feels easier to keep reading or put it off. But here's what we've learned from 560+ users: the ones who pass on their first try are the ones who actually test themselves, not just study.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7; font-weight: 600;">
                Set aside 30 minutes today. Take one practice test. See where you stand.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=first_test_reminder" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Start Practice Test</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Even if you bomb it (and some people do on their first try), you'll know exactly what to focus on. Way more useful than guessing whether you're ready.
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                The TigerTest Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #FFF9F5; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  secondTestNudge: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>One test down - here's what to do next</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Nice work on test #1! 🎉</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Nice work finishing your first practice test.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Want to see what you got wrong? <a href="https://tigertest.io/stats?utm_source=tigertest&utm_medium=email&utm_campaign=second_test_nudge" style="color: #FF6B35; text-decoration: none; font-weight: 500;">Check your stats</a> - it breaks down which question types you're struggling with.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7; font-weight: 600;">
                Here's what matters now: take another one.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                The first test showed you what you don't know. The second test shows you if you're actually improving - or if you're still guessing on the same topics.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Users who take 2+ practice tests before their real DMV test pass way more often than people who only do one. It's not magic, it's just pattern recognition.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=second_test_nudge" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Take Another Practice Test</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                If you bombed the first test, don't sweat it. Most people do. The second test is where you see real progress.
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                The TigerTest Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #FFF9F5; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  upgradePitch: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're serious about this - here's what unlocks next</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">You're doing the work 💪</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                You've taken {{testCount}} practice tests so far. That puts you ahead of most people - you're actually doing the work.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Quick heads up: the free tier gives you 3 training sets and 3 practice tests. But if you're planning to keep practicing (and you should), you'll hit the limit soon.
              </p>
              <p style="margin: 0 0 12px; color: #4a4a4a; font-size: 15px; line-height: 1.7; font-weight: 600;">
                Premium unlocks:
              </p>
              <ul style="margin: 0 0 20px; padding-left: 24px; color: #333333; font-size: 16px; line-height: 1.8;">
                <li>Training set 4 (50 more questions with instant feedback)</li>
                <li>Practice test 4 (one more full 50-question exam)</li>
                <li>Stats page (see which questions you always get wrong - shows you exactly where you need to study)</li>
              </ul>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                It's $9.99 one-time. No subscription, no monthly charge.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=upgrade_pitch" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Upgrade to Premium - $9.99</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                If you're not ready yet, no problem. The free tier is still there. But if you want to see your weak spots and keep practicing, now's a good time.
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                The TigerTest Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #FFF9F5; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  inactiveShareRequest: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Did you pass?</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Did you pass?</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                We haven't seen you on TigerTest in a while - so we're guessing you went out and aced your test.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                If you did - congrats! That's awesome.
              </p>
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 17px; line-height: 1.7; font-weight: 600; text-align: center;">
                If TigerTest helped you pass, please share TigerTest.io with your friends!
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Know someone prepping for their permit or license? Send them our way. Word of mouth is the #1 way people find us, and it really helps.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/?utm_source=tigertest&utm_medium=email&utm_campaign=inactive_share" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Share TigerTest.io</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                And if you haven't taken your test yet - no judgment. We're still here whenever you're ready.
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Thanks for using TigerTest,<br>
                The TigerTest Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  reengagement: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test coming up soon?</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Test coming up soon?</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Haven't seen you in TigerTest for a bit.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                If your DMV test is coming up, now's the time to get back into it. A week away from practice questions is enough to forget a lot of the details.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                If you're not testing soon, ignore this. But if you are - take another practice test today. See if you're still sharp.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=reengagement" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Continue Practicing</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7; text-align: center;">
                or <a href="https://tigertest.io/stats?utm_source=tigertest&utm_medium=email&utm_campaign=reengagement" style="color: #FF6B35; text-decoration: none; font-weight: 500;">review your stats</a> to see where you left off
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Good luck,<br>
                The TigerTest Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #FFF9F5; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
};
