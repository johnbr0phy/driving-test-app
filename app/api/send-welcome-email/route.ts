import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const referralLink = `https://tigertest.io/signup?ref=${referralCode}`;

    const { data, error } = await getResend().emails.send({
      from: 'TigerTest <noreply@tigertest.io>',
      to: email,
      subject: 'Welcome to TigerTest! 🚗',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 80px; height: 80px;">
            <h1 style="color: #1a1a1a; margin-top: 16px;">Welcome to TigerTest!</h1>
          </div>

          <p style="font-size: 16px;">Hey there!</p>

          <p style="font-size: 16px;">Thanks for signing up for TigerTest - you're on your way to acing your DMV driving test!</p>

          <p style="font-size: 16px;">Here's what you get:</p>

          <ul style="font-size: 16px; padding-left: 20px;">
            <li><strong>200 practice questions</strong> tailored to your state</li>
            <li><strong>Training mode</strong> with instant feedback</li>
            <li><strong>4 practice tests</strong> that mirror the real DMV exam</li>
            <li><strong>Progress tracking</strong> to see how ready you are</li>
          </ul>

          <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #c2410c; margin-top: 0;">Unlock Test 4 - Invite a Friend!</h3>
            <p style="margin-bottom: 16px;">Know someone else who needs to pass their driving test? Share your referral link to unlock Test 4:</p>
            <p style="background-color: #fff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; word-break: break-all; font-family: monospace; font-size: 14px;">
              ${referralLink}
            </p>
            <p style="font-size: 14px; color: #666; margin-bottom: 0;">TigerTest works in all 50 US states, so invite friends from anywhere!</p>
          </div>

          <p style="font-size: 16px;">Ready to start practicing?</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://tigertest.io/dashboard" style="background-color: #1a1a1a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Start Practicing</a>
          </div>

          <p style="font-size: 16px;">Good luck with your driving test!</p>

          <p style="font-size: 16px; color: #666;">
            - The TigerTest Team
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="font-size: 12px; color: #999; text-align: center;">
            You're receiving this because you signed up for TigerTest.<br>
            <a href="https://tigertest.io" style="color: #999;">tigertest.io</a>
          </p>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
