import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Generate a referral code from user ID
// Format: TIGER-XXXXX (5 alphanumeric chars derived from user ID)
export function generateReferralCode(userId: string): string {
  // Create a simple hash from the user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert to alphanumeric string (uppercase)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  let absHash = Math.abs(hash);
  for (let i = 0; i < 5; i++) {
    code += chars[absHash % chars.length];
    absHash = Math.floor(absHash / chars.length);
  }

  return `TIGER-${code}`;
}

// Look up a user by their referral code
export async function findUserByReferralCode(referralCode: string): Promise<string | null> {
  try {
    // Query the referralCodes collection
    const referralDoc = await getDoc(doc(db, 'referralCodes', referralCode));
    if (referralDoc.exists()) {
      return referralDoc.data().userId;
    }
    return null;
  } catch (error) {
    console.error('Error finding user by referral code:', error);
    return null;
  }
}

// Save a user's referral code mapping
export async function saveReferralCode(userId: string): Promise<string> {
  const referralCode = generateReferralCode(userId);

  try {
    await setDoc(doc(db, 'referralCodes', referralCode), {
      userId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving referral code:', error);
  }

  return referralCode;
}

// Record a successful referral and unlock Test 4 for the referrer
export async function recordReferral(referrerId: string, refereeId: string): Promise<boolean> {
  try {
    // Record the referral in a referrals collection
    await setDoc(doc(db, 'referrals', `${referrerId}_${refereeId}`), {
      referrerId,
      refereeId,
      createdAt: new Date().toISOString(),
    });

    // Update the referrer's user document to unlock Test 4
    const referrerDoc = await getDoc(doc(db, 'users', referrerId));
    const referrerData = referrerDoc.exists() ? referrerDoc.data() : {};

    await setDoc(doc(db, 'users', referrerId), {
      ...referrerData,
      referralUnlockEarned: true,
      lastUpdated: new Date().toISOString(),
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('Error recording referral:', error);
    return false;
  }
}

// Check if a user has earned a referral unlock
export async function hasReferralUnlock(userId: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().referralUnlockEarned === true;
    }
    return false;
  } catch (error) {
    console.error('Error checking referral unlock:', error);
    return false;
  }
}
