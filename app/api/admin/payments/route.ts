import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

export interface PaymentRow {
  id: string;
  userId: string | null;
  email: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  flow: 'parent_pay' | 'self';
  parentPayToken: string | null;
  stripeCustomerId: string | null;
  stripePaymentIntentId: string | null;
  createdAt: string | null;
}

export interface ParentPayFunnel {
  requestsSent: number;
  pending: number;
  paid: number;
  expired: number;
  cancelled: number;
  conversionRate: number; // 0-1, paid / requestsSent
  medianHoursToPay: number | null;
  last30dRequests: number;
  last30dPaid: number;
}

export interface PaymentsPayload {
  payments: PaymentRow[];
  summary: {
    total: number;
    parentPay: number;
    self: number;
    last7d: { total: number; parentPay: number; self: number };
  };
  parentPayFunnel: ParentPayFunnel;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    let decoded;
    try {
      decoded = await getAdminAuth().verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = getAdminDb();
    const [snap, parentReqSnap] = await Promise.all([
      db.collection('payments').orderBy('createdAt', 'desc').limit(100).get(),
      db.collection('parentPayRequests').get(),
    ]);

    const payments: PaymentRow[] = snap.docs.map((doc) => {
      const d = doc.data() as Record<string, unknown>;
      const flow: 'parent_pay' | 'self' = d.flow === 'parent_pay' ? 'parent_pay' : 'self';
      return {
        id: doc.id,
        userId: (d.userId as string) ?? null,
        email: (d.email as string) ?? null,
        amount: typeof d.amount === 'number' ? (d.amount as number) : null,
        currency: (d.currency as string) ?? null,
        status: (d.status as string) ?? null,
        flow,
        parentPayToken: (d.parentPayToken as string) ?? null,
        stripeCustomerId: (d.stripeCustomerId as string) ?? null,
        stripePaymentIntentId: (d.stripePaymentIntentId as string) ?? null,
        createdAt: (d.createdAt as string) ?? null,
      };
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recent = payments.filter(
      (p) => p.createdAt && new Date(p.createdAt) >= sevenDaysAgo,
    );

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let pending = 0, paid = 0, expired = 0, cancelled = 0;
    let last30dRequests = 0, last30dPaid = 0;
    const hoursToPay: number[] = [];

    parentReqSnap.docs.forEach((doc) => {
      const d = doc.data() as Record<string, unknown>;
      const status = d.status as string;
      const createdAt = d.createdAt as string | undefined;
      const paidAt = d.paidAt as string | undefined;
      const createdDate = createdAt ? new Date(createdAt) : null;

      if (status === 'paid') paid++;
      else if (status === 'expired') expired++;
      else if (status === 'cancelled') cancelled++;
      else pending++;

      if (createdDate && createdDate >= thirtyDaysAgo) {
        last30dRequests++;
        if (status === 'paid') last30dPaid++;
      }

      if (status === 'paid' && createdAt && paidAt) {
        const ms = new Date(paidAt).getTime() - new Date(createdAt).getTime();
        if (ms >= 0) hoursToPay.push(ms / (1000 * 60 * 60));
      }
    });

    const totalRequests = parentReqSnap.size;
    const parentPayFunnel: ParentPayFunnel = {
      requestsSent: totalRequests,
      pending,
      paid,
      expired,
      cancelled,
      conversionRate: totalRequests > 0 ? paid / totalRequests : 0,
      medianHoursToPay: median(hoursToPay),
      last30dRequests,
      last30dPaid,
    };

    const payload: PaymentsPayload = {
      payments,
      summary: {
        total: payments.length,
        parentPay: payments.filter((p) => p.flow === 'parent_pay').length,
        self: payments.filter((p) => p.flow === 'self').length,
        last7d: {
          total: recent.length,
          parentPay: recent.filter((p) => p.flow === 'parent_pay').length,
          self: recent.filter((p) => p.flow === 'self').length,
        },
      },
      parentPayFunnel,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('[admin/payments]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
