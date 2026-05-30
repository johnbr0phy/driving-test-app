import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  countQuestionsPracticed,
  isLinkPreviewBot,
  type ParentPayRequest,
} from "@/lib/parent-pay";
import { ParentPayCheckoutButton } from "./parent-pay-checkout-button";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ canceled?: string }>;
}

export default async function ParentPayPage({ params, searchParams }: PageProps) {
  const { token } = await params;
  const { canceled } = await searchParams;

  if (!/^[a-f0-9]{12}$/.test(token)) notFound();

  const db = getAdminDb();
  const reqSnap = await db.collection("parentPayRequests").doc(token).get();
  if (!reqSnap.exists) notFound();
  const req = reqSnap.data() as ParentPayRequest;

  // Record the open as a "click" unless it's a link-preview bot. Best-effort:
  // tracking must never break the page the parent is trying to pay on.
  const userAgent = (await headers()).get("user-agent");
  if (!isLinkPreviewBot(userAgent)) {
    const nowIso = new Date().toISOString();
    try {
      await reqSnap.ref.set(
        {
          lastViewedAt: nowIso,
          viewCount: FieldValue.increment(1),
          ...(req.firstViewedAt ? {} : { firstViewedAt: nowIso }),
        },
        { merge: true },
      );
    } catch (err) {
      console.error("[parent-pay/view]", err);
    }
  }

  const expired = new Date(req.expiresAt).getTime() < Date.now();
  const userSnap = await db.collection("users").doc(req.teenUid).get();
  const userData = userSnap.exists ? (userSnap.data() as Record<string, unknown>) : {};
  const selectedState = (userData.selectedState as string | undefined) ?? null;
  const questionsPracticed = countQuestionsPracticed(userData);
  const alreadyPremium =
    (userData.subscription as Record<string, unknown> | undefined)?.isPremium === true;

  const alreadyPaid = req.status === "paid" || alreadyPremium;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white px-4 py-12">
      <div className="mx-auto max-w-md">
        {alreadyPaid ? (
          <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">All set</h1>
            <p className="text-gray-600 text-sm">
              This account already has TigerTest Premium. Nothing more to do.
            </p>
          </div>
        ) : expired ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1">This link expired</h1>
            <p className="text-gray-600 text-sm">
              Ask your teen to send a new one from the app.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Your teen is studying for their permit test
              </h1>
              <p className="text-sm text-gray-600">
                They asked you to unlock the full study material on TigerTest.
              </p>
            </div>

            <div className="px-6 py-5 bg-orange-50/50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-orange-600">
                  {questionsPracticed}
                </div>
                <div className="text-sm text-gray-700 leading-tight">
                  questions practiced so far
                  {selectedState ? (
                    <div className="text-xs text-gray-500 mt-0.5">
                      Studying for the {selectedState} permit test
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="text-xs font-bold text-orange-600 tracking-wider mb-3">
                WHAT THEY GET
              </div>
              <ul className="space-y-2 text-sm text-gray-800 mb-6">
                <li className="flex gap-2"><span className="text-green-600">✓</span> The remaining 100 practice questions</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Practice Test C (full 50-question exam)</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Practice Test D (full 50-question exam)</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Stats page — see exactly which questions they keep getting wrong</li>
              </ul>

              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-bold text-gray-900">$9.99</span>
                <span className="text-xs text-gray-500">one-time, no subscription</span>
              </div>

              {canceled ? (
                <div className="mb-3 text-xs text-gray-500 text-center">
                  Checkout cancelled. You can try again any time.
                </div>
              ) : null}

              <ParentPayCheckoutButton token={token} />

              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <div className="text-xs text-gray-500">
                  Secure Stripe checkout · 2,000+ students passed with TigerTest
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-400">
          Didn&apos;t expect this? You can safely ignore the link — it expires
          in {Math.max(0, Math.ceil((new Date(req.expiresAt).getTime() - Date.now()) / 86400000))} days.
        </div>
      </div>
    </div>
  );
}
