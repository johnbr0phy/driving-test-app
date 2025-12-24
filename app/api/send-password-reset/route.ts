import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getAdminDb } from '@/lib/firebase-admin';

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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if Firebase Admin credentials are configured
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not set');
      return NextResponse.json({
        error: 'Server configuration error. Please contact support.'
      }, { status: 500 });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({
        error: 'Server configuration error. Please contact support.'
      }, { status: 500 });
    }

    // Initialize admin to ensure the app is ready
    try {
      getAdminDb();
    } catch (initError) {
      console.error('Firebase Admin initialization error:', initError);
      return NextResponse.json({
        error: 'Server configuration error. Please contact support.'
      }, { status: 500 });
    }

    // Generate password reset link using Firebase Admin SDK
    const auth = getAuth();
    let resetLink: string;

    try {
      resetLink = await auth.generatePasswordResetLink(email, {
        url: 'https://tigertest.io/login',
      });
    } catch (error: any) {
      console.error('Firebase auth error:', error.code, error.message);
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
      }
      if (error.code === 'auth/invalid-email') {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      }
      return NextResponse.json({
        error: 'Unable to generate reset link. Please try again.'
      }, { status: 500 });
    }

    // Send beautifully branded password reset email via Resend
    const { data, error } = await getResend().emails.send({
      from: 'TigerTest <noreply@tigertest.io>',
      to: email,
      subject: 'Reset Your TigerTest Password',
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
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 64px; height: 64px;">
              <h1 style="color: #1a1a1a; margin-top: 16px; margin-bottom: 8px; font-size: 24px;">Reset Your Password</h1>
            </div>

            <p style="font-size: 16px; color: #4b5563;">Hi there,</p>

            <p style="font-size: 16px; color: #4b5563;">
              We received a request to reset the password for your TigerTest account. Click the button below to create a new password:
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}" style="background-color: #1a1a1a; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Reset Password</a>
            </div>

            <p style="font-size: 14px; color: #6b7280;">
              This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email - your password will remain unchanged.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <p style="font-size: 14px; color: #6b7280;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="font-size: 12px; color: #9ca3af; word-break: break-all;">
              ${resetLink}
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
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
  }
}
