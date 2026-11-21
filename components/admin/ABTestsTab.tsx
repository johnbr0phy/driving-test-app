"use client";

import { CARD, TabHeader, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";
import { GuestPromptTestCard } from "@/components/admin/GuestPromptTestCard";
import { LandingTryTestCard } from "@/components/admin/LandingTryTestCard";
import { LockTestCard } from "@/components/admin/LockTestCard";
import { PaywallTestCard } from "@/components/admin/PaywallTestCard";
import { TopPrepperTestCard } from "@/components/admin/TopPrepperTestCard";
import type { ConversionPayload } from "@/lib/server/conversion";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";

// The A/B tests tab on /admin: every running experiment in one place. The
// Try one now and sign-up message cards fetch their own counts; the paywall
// test rides the Today tab's payload and the top prepper holdout the
// Conversion tab's (both served from lib/server/adminCache).

export function ABTestsTab() {
  const opp = useAdminFetch<OpportunitiesPayload>("/api/admin/opportunities");
  const conv = useAdminFetch<ConversionPayload>("/api/admin/conversion");
  const refreshing = opp.refreshing || conv.refreshing;
  const updating = opp.updating || conv.updating;
  const t = conv.data?.topPrepper;

  return (
    <div>
      <TabHeader
        subtitle={`Every A/B test on the site.${opp.data ? ` Updated ${fmtUpdated(opp.data.generatedAt)}.` : ""}`}
        onRefresh={() => {
          void opp.reload(true);
          void conv.reload(true);
        }}
        refreshing={refreshing}
        updating={updating}
      />
      <LandingTryTestCard />
      {opp.loading ? (
        <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading the paywall test...</div>
      ) : opp.data?.paywallTest ? (
        <PaywallTestCard t={opp.data.paywallTest} />
      ) : null}
      {opp.data?.lockTest && <LockTestCard t={opp.data.lockTest} />}
      <GuestPromptTestCard />
      {conv.loading ? (
        <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading the top prepper email test...</div>
      ) : t && (t.sent > 0 || t.holdout > 0) ? (
        <TopPrepperTestCard t={t} />
      ) : null}
    </div>
  );
}
