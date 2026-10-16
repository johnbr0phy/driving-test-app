/**
 * Per-IP budget for the anonymous answered-question counter
 * (/api/analytics/questions). The endpoint needs no login and takes up to 300
 * answers per request, so without a cap one script could pour any number of
 * answers into any exam's row on /admin.
 *
 * The budget is generous enough for a classroom behind one school IP (30
 * students working through a test each in an hour stays well under it) and
 * low enough that a loop can no longer outrun every real exam in a day.
 * Answers over budget are dropped and counted on analytics/questions under
 * rateLimited.daily, so a capped spike is visible instead of silent.
 *
 * One doc per (IP hash, UTC day) in analyticsRateLimits, holding the day total
 * and per-hour totals. The IP is hashed so no raw address is stored. Old docs
 * carry expiresAt for a Firestore TTL policy on that collection.
 */
import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';
import type { Firestore } from 'firebase-admin/firestore';

export const ANSWERS_PER_IP_PER_HOUR = 2_000;
export const ANSWERS_PER_IP_PER_DAY = 6_000;

const KEEP_MS = 3 * 24 * 60 * 60 * 1000;

export function requestIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip'))?.trim() || 'unknown';
}

function ipKey(ip: string): string {
  return createHash('sha256').update(`tigertest-answers:${ip}`).digest('hex').slice(0, 32);
}

/**
 * Reserves up to `count` answers from the IP's hourly and daily budget and
 * returns how many were granted (0 to count). Fails open: a Firestore error
 * grants the full count, since analytics must never break answering.
 */
export async function grantAnswers(db: Firestore, ip: string, count: number, now = new Date()): Promise<number> {
  const iso = now.toISOString();
  const day = iso.slice(0, 10);
  const hour = iso.slice(11, 13);
  const ref = db.collection('analyticsRateLimits').doc(`${ipKey(ip)}_${day}`);
  try {
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = (snap.data() || {}) as { total?: number; hours?: Record<string, number> };
      const dayUsed = data.total || 0;
      const hourUsed = data.hours?.[hour] || 0;
      const granted = Math.max(
        0,
        Math.min(count, ANSWERS_PER_IP_PER_HOUR - hourUsed, ANSWERS_PER_IP_PER_DAY - dayUsed)
      );
      if (granted > 0) {
        tx.set(
          ref,
          {
            total: dayUsed + granted,
            hours: { ...(data.hours || {}), [hour]: hourUsed + granted },
            expiresAt: new Date(now.getTime() + KEEP_MS),
          },
          { merge: true }
        );
      }
      return granted;
    });
  } catch (error) {
    console.error('[answerRateLimit] failing open:', error);
    return count;
  }
}
