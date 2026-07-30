# TigerTest Email Functions

Firebase Cloud Functions for TigerTest email automation.

> **Superseded — do not deploy.** The welcome / first-test-reminder /
> second-test-nudge / upgrade-pitch / reengagement emails now run as Vercel
> crons (`app/api/cron/*`, scheduled in `vercel.json`), which share the daily
> send budget in `lib/email-quota.ts`. These functions send the same emails and
> know nothing about that budget, so deploying them would double the daily
> volume and blow through the Resend quota. Verify nothing is still deployed
> with `firebase functions:list` and delete any leftovers.

## Setup

### 1. Install Firebase Tools (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase (if not already done)

This repo already has Firebase initialized, but if you need to do it fresh:

```bash
firebase init functions
# Select TypeScript
# Select existing project: driving-test-app-a5c67
# Install dependencies: Yes
```

### 4. Install Dependencies

```bash
cd functions
npm install
```

### 5. Set Resend API Key

```bash
firebase functions:config:set resend.api_key="$RESEND_API_KEY"   # never paste the literal key into a file
```

## Functions

### 1. sendWelcomeEmail
- **Trigger:** Firebase Auth user creation (onCreate)
- **When:** Immediately when a new user signs up
- **Checks:** emailConsent === true, unsubscribed === false
- **Email:** Welcome message with CTA to take first practice test

### 2. sendFirstTestReminder
- **Trigger:** Scheduled (runs every 24 hours)
- **When:** 24+ hours after signup if no tests completed
- **Checks:** emailConsent, unsubscribed, completedTests.length === 0
- **Email:** Reminder to take first practice test

### 3. sendSecondTestNudge
- **Trigger:** Firestore onUpdate (when completedTests changes)
- **When:** User completes their first test
- **Checks:** completedTests went from 0 → 1
- **Email:** Encouragement to take second test

### 4. sendUpgradePitch
- **Trigger:** Scheduled (runs every 24 hours)
- **When:** 3+ days after signup, 2+ tests completed, not premium
- **Checks:** emailConsent, unsubscribed, completedTests >= 2, isPremium === false
- **Email:** Pitch for premium upgrade ($9.99)

### 5. sendReengagement
- **Trigger:** Scheduled (runs every 24 hours)
- **When:** 7+ days since signup, 5+ days since last test
- **Checks:** emailConsent, unsubscribed, lastTestDate > 5 days ago
- **Email:** Re-engagement message to inactive users

## Deployment

### Build and Deploy All Functions

```bash
cd functions
npm run build
firebase deploy --only functions
```

### Deploy a Single Function

```bash
firebase deploy --only functions:sendWelcomeEmail
```

### Test Locally

```bash
cd functions
npm run serve
```

This starts the Firebase emulators. You can test functions locally before deploying.

## Logs

View function logs:

```bash
firebase functions:log
```

Follow logs in real-time:

```bash
firebase functions:log --only sendWelcomeEmail
```

## Email Flow

1. **Day 0:** User signs up → `sendWelcomeEmail` fires immediately
2. **Day 1:** If no tests taken → `sendFirstTestReminder` fires
3. **Day X:** User completes first test → `sendSecondTestNudge` fires immediately
4. **Day 3+:** If 2+ tests and not premium → `sendUpgradePitch` fires
5. **Day 7+:** If inactive for 5+ days → `sendReengagement` fires

## Monitoring

- Check Firebase Console → Functions → Logs for execution history
- Check Resend Dashboard (https://resend.com/emails) for email delivery status
- Firestore `users` collection tracks `lastEmailSent` and `emailsSent` array

## Cost

- **Firebase Functions:** First 2M invocations/month free
- **Resend:** 3,000 emails/month free tier
- **Expected usage:** ~50-100 emails/day = well under free tiers

## Troubleshooting

### "Missing config resend.api_key"

Run:
```bash
firebase functions:config:set resend.api_key="YOUR_KEY_HERE"
```

### Functions not deploying

Make sure you're logged in and have selected the correct project:
```bash
firebase login
firebase use driving-test-app-a5c67
```

### Emails going to spam

- First few emails from new domain will likely go to spam
- After ~100 emails with good engagement, deliverability improves
- Mark test emails as "Not Spam" in Gmail to train filters

## Security

- Resend API key is stored in Firebase Functions config (not in code)
- Firebase service account has read/write access to Firestore
- Unsubscribe tokens are simple base64(userId) - low security risk
- Can upgrade to signed JWT tokens if needed

## Next Steps

After deployment:
1. Test welcome email by creating a new user
2. Monitor logs for errors
3. Check Resend dashboard for delivery status
4. Adjust email copy/timing as needed based on metrics
