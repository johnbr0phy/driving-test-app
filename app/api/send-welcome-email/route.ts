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
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({
        error: 'Server configuration error. Please contact support.'
      }, { status: 500 });
    }

    const firstName = name?.split(' ')[0] || 'there';

    // Send welcome email via Resend
    const { data, error } = await getResend().emails.send({
      from: 'TigerTest <noreply@tigertest.io>',
      to: email,
      subject: 'Welcome to TigerTest - Your DMV Practice Test Prep',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 80px; height: 80px;">
              <h1 style="color: #1a1a1a; margin-top: 16px; margin-bottom: 8px; font-size: 28px;">Welcome to TigerTest!</h1>
            </div>

            <p style="font-size: 16px; color: #4b5563;">Hi ${firstName},</p>

            <p style="font-size: 16px; color: #4b5563;">
              Thanks for signing up! You're now ready to ace your DMV knowledge test with our free practice tests and training.
            </p>

            <div style="background-color: #fff7ed; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #ea580c; margin-top: 0; margin-bottom: 12px; font-size: 16px;">Here's what you get:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                <li style="margin-bottom: 8px;"><strong>4 Training Sets</strong> - Master signs, rules, safety & state laws</li>
                <li style="margin-bottom: 8px;"><strong>4 Practice Tests</strong> - Simulate the real DMV exam</li>
                <li style="margin-bottom: 8px;"><strong>All 50 States</strong> - Questions for your specific state</li>
                <li style="margin-bottom: 0;"><strong>Track Your Progress</strong> - See your pass rate improve</li>
              </ul>
            </div>

            <p style="font-size: 16px; color: #4b5563;">
              The best way to pass your DMV test? Practice until you consistently score 80% or higher on our practice tests.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="https://tigertest.io/dashboard" style="background-color: #ea580c; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Start Practicing</a>
            </div>

            <p style="font-size: 14px; color: #6b7280; text-align: center;">
              Bookmark <a href="https://tigertest.io" style="color: #ea580c; text-decoration: none;">tigertest.io</a> so you can find us again!
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              <a href="https://tigertest.io" style="color: #f97316; text-decoration: none;">TigerTest</a> - Free DMV Practice Tests for All 50 US States
            </p>
          </div>
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
    console.error('Welcome email error:', error);
    return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
  }
}
