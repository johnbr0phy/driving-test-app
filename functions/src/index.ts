import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Resend } from "resend";

admin.initializeApp();
const db = admin.firestore();

// Initialize Resend
const resend = new Resend(functions.config().resend.api_key);

// Email templates (inlined for simplicity)
const templates = {
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
                    <a href="https://tigertest.io/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Take Your First Practice Test</a>
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
                    <a href="https://tigertest.io/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Start Practice Test</a>
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
                Want to see what you got wrong? <a href="https://tigertest.io/stats" style="color: #FF6B35; text-decoration: none; font-weight: 500;">Check your stats</a> - it breaks down which question types you're struggling with.
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
                    <a href="https://tigertest.io/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Take Another Practice Test</a>
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
                    <a href="https://tigertest.io/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Upgrade to Premium - $9.99</a>
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
                    <a href="https://tigertest.io/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Continue Practicing</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7; text-align: center;">
                or <a href="https://tigertest.io/stats" style="color: #FF6B35; text-decoration: none; font-weight: 500;">review your stats</a> to see where you left off
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

// Helper function to send email
async function sendEmail(to: string, subject: string, html: string) {
  try {
    const result = await resend.emails.send({
      from: "TigerTest <noreply@tigertest.io>",
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}:`, result);
    return result;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
}

// 1. Welcome Email - triggered on new user creation
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  try {
    // Get user document from Firestore
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = userDoc.data();

    // Check if user has consented to emails
    if (!userData?.emailConsent || userData?.unsubscribed) {
      console.log(`User ${user.uid} has not consented to emails or is unsubscribed`);
      return null;
    }

    // Personalize greeting
    const displayName = user.displayName || userData?.displayName;
    const greeting = displayName ? `Hey ${displayName},` : "Hey there,";

    // Generate unsubscribe token
    const unsubscribeToken = Buffer.from(user.uid).toString("base64");

    // Replace placeholders
    const html = templates.welcome
      .replace(/{{greeting}}/g, greeting)
      .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

    // Send email
    await sendEmail(user.email!, "Welcome to TigerTest", html);

    // Update user document with email sent timestamp
    await db.collection("users").doc(user.uid).update({
      lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
      emailsSent: admin.firestore.FieldValue.arrayUnion("welcome"),
    });

    return null;
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", error);
    return null;
  }
});

// 2. First Test Reminder - scheduled function (runs daily)
export const sendFirstTestReminder = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    try {
      const now = admin.firestore.Timestamp.now();
      const oneDayAgo = new Date(now.toMillis() - 24 * 60 * 60 * 1000);

      // Query users who signed up 24+ hours ago and haven't completed a test
      const usersSnapshot = await db
        .collection("users")
        .where("emailConsent", "==", true)
        .where("unsubscribed", "==", false)
        .get();

      const emailPromises = [];

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const userId = doc.id;

        // Check if user was created more than 24 hours ago
        const createdAt = userData.createdAt || userData.lastUpdated;
        if (!createdAt || createdAt.toDate() > oneDayAgo) {
          continue;
        }

        // Check if user has completed any tests
        const completedTests = userData.completedTests || [];
        if (completedTests.length > 0) {
          continue;
        }

        // Check if already sent this email
        const emailsSent = userData.emailsSent || [];
        if (emailsSent.includes("firstTestReminder")) {
          continue;
        }

        // Check if we've sent an email in the last 23 hours (prevent duplicates)
        const lastEmailSent = userData.lastEmailSent;
        if (lastEmailSent && lastEmailSent.toDate() > new Date(Date.now() - 23 * 60 * 60 * 1000)) {
          continue;
        }

        // Get user email from Auth
        const userRecord = await admin.auth().getUser(userId);
        if (!userRecord.email) {
          continue;
        }

        // Generate unsubscribe token
        const unsubscribeToken = Buffer.from(userId).toString("base64");

        // Replace placeholders
        const html = templates.firstTestReminder
          .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

        // Send email
        emailPromises.push(
          sendEmail(userRecord.email, "Quick check-in from TigerTest", html)
            .then(() => {
              // Update user document
              return db.collection("users").doc(userId).update({
                lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
                emailsSent: admin.firestore.FieldValue.arrayUnion("firstTestReminder"),
              });
            })
            .catch((error) => {
              console.error(`Failed to send first test reminder to ${userId}:`, error);
            })
        );
      }

      await Promise.all(emailPromises);
      console.log(`Sent ${emailPromises.length} first test reminder emails`);
      return null;
    } catch (error) {
      console.error("Error in sendFirstTestReminder:", error);
      return null;
    }
  });

// 3. Second Test Nudge - triggered when user completes first test
export const sendSecondTestNudge = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    try {
      const before = change.before.data();
      const after = change.after.data();
      const userId = context.params.userId;

      // Check if user just completed their first test
      const beforeTests = before.completedTests || [];
      const afterTests = after.completedTests || [];

      if (beforeTests.length !== 0 || afterTests.length !== 1) {
        return null;
      }

      // Check email consent
      if (!after.emailConsent || after.unsubscribed) {
        return null;
      }

      // Check if already sent this email
      const emailsSent = after.emailsSent || [];
      if (emailsSent.includes("secondTestNudge")) {
        return null;
      }

      // Get user email
      const userRecord = await admin.auth().getUser(userId);
      if (!userRecord.email) {
        return null;
      }

      // Generate unsubscribe token
      const unsubscribeToken = Buffer.from(userId).toString("base64");

      // Replace placeholders
      const html = templates.secondTestNudge
        .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

      // Send email
      await sendEmail(userRecord.email, "Nice work on test #1!", html);

      // Update user document
      await db.collection("users").doc(userId).update({
        lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
        emailsSent: admin.firestore.FieldValue.arrayUnion("secondTestNudge"),
      });

      return null;
    } catch (error) {
      console.error("Error in sendSecondTestNudge:", error);
      return null;
    }
  });

// 4. Upgrade Pitch - scheduled function (runs daily)
export const sendUpgradePitch = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    try {
      const now = admin.firestore.Timestamp.now();
      const threeDaysAgo = new Date(now.toMillis() - 3 * 24 * 60 * 60 * 1000);

      // Query eligible users
      const usersSnapshot = await db
        .collection("users")
        .where("emailConsent", "==", true)
        .where("unsubscribed", "==", false)
        .get();

      const emailPromises = [];

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const userId = doc.id;

        // Check if user was created more than 3 days ago
        const createdAt = userData.createdAt || userData.lastUpdated;
        if (!createdAt || createdAt.toDate() > threeDaysAgo) {
          continue;
        }

        // Check if user has completed 2+ tests
        const completedTests = userData.completedTests || [];
        if (completedTests.length < 2) {
          continue;
        }

        // Check if user is not premium
        const subscription = userData.subscription || {};
        if (subscription.isPremium) {
          continue;
        }

        // Check if already sent this email
        const emailsSent = userData.emailsSent || [];
        if (emailsSent.includes("upgradePitch")) {
          continue;
        }

        // Get user email
        const userRecord = await admin.auth().getUser(userId);
        if (!userRecord.email) {
          continue;
        }

        // Generate unsubscribe token
        const unsubscribeToken = Buffer.from(userId).toString("base64");

        // Replace placeholders
        const html = templates.upgradePitch
          .replace(/{{testCount}}/g, completedTests.length.toString())
          .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

        // Send email
        emailPromises.push(
          sendEmail(userRecord.email, "You're doing the work 💪", html)
            .then(() => {
              // Update user document
              return db.collection("users").doc(userId).update({
                lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
                emailsSent: admin.firestore.FieldValue.arrayUnion("upgradePitch"),
              });
            })
            .catch((error) => {
              console.error(`Failed to send upgrade pitch to ${userId}:`, error);
            })
        );
      }

      await Promise.all(emailPromises);
      console.log(`Sent ${emailPromises.length} upgrade pitch emails`);
      return null;
    } catch (error) {
      console.error("Error in sendUpgradePitch:", error);
      return null;
    }
  });

// 5. Re-engagement - scheduled function (runs daily)
export const sendReengagement = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    try {
      const now = admin.firestore.Timestamp.now();
      const sevenDaysAgo = new Date(now.toMillis() - 7 * 24 * 60 * 60 * 1000);
      const fiveDaysAgo = new Date(now.toMillis() - 5 * 24 * 60 * 60 * 1000);

      // Query eligible users
      const usersSnapshot = await db
        .collection("users")
        .where("emailConsent", "==", true)
        .where("unsubscribed", "==", false)
        .get();

      const emailPromises = [];

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const userId = doc.id;

        // Check if user was created more than 7 days ago
        const createdAt = userData.createdAt || userData.lastUpdated;
        if (!createdAt || createdAt.toDate() > sevenDaysAgo) {
          continue;
        }

        // Check if user's last test was more than 5 days ago
        const completedTests = userData.completedTests || [];
        if (completedTests.length === 0) {
          continue;
        }

        // Find most recent test completion date
        const lastTestDate = completedTests.reduce((latest: Date | null, test: any) => {
          const testDate = test.completedAt ? new Date(test.completedAt) : null;
          if (!testDate) return latest;
          if (!latest || testDate > latest) return testDate;
          return latest;
        }, null);

        if (!lastTestDate || lastTestDate > fiveDaysAgo) {
          continue;
        }

        // Check if already sent this email
        const emailsSent = userData.emailsSent || [];
        if (emailsSent.includes("reengagement")) {
          continue;
        }

        // Get user email
        const userRecord = await admin.auth().getUser(userId);
        if (!userRecord.email) {
          continue;
        }

        // Generate unsubscribe token
        const unsubscribeToken = Buffer.from(userId).toString("base64");

        // Replace placeholders
        const html = templates.reengagement
          .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

        // Send email
        emailPromises.push(
          sendEmail(userRecord.email, "Test coming up soon?", html)
            .then(() => {
              // Update user document
              return db.collection("users").doc(userId).update({
                lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
                emailsSent: admin.firestore.FieldValue.arrayUnion("reengagement"),
              });
            })
            .catch((error) => {
              console.error(`Failed to send reengagement email to ${userId}:`, error);
            })
        );
      }

      await Promise.all(emailPromises);
      console.log(`Sent ${emailPromises.length} reengagement emails`);
      return null;
    } catch (error) {
      console.error("Error in sendReengagement:", error);
      return null;
    }
  });
