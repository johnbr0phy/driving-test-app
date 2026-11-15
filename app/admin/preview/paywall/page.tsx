"use client";

import { PaywallModal } from "@/components/PaywallModal";

// The paywall, open, for the A/B tests tab's previews. The side and visit come
// from ?paywall=john|classic and ?paywallHit=1|2|3, which PaywallModal already
// honours without counting a visit. Buttons do nothing here.

export default function PaywallPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PaywallModal open onOpenChange={() => {}} feature="Premium" onUpgrade={async () => {}} isGuest={false} />
    </div>
  );
}
