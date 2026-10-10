"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import { trackFunnelStep } from "@/lib/funnel";

function PremiumTheme() {
  const subscription = useStore((state) => state.subscription);
  const userId = useStore((state) => state.userId);
  const isGuest = useStore((state) => state.isGuest);
  const isPremium = !isGuest && !!userId && subscription?.isPremium === true;

  useEffect(() => {
    if (isPremium) {
      document.body.classList.add("premium-theme");
    } else {
      document.body.classList.remove("premium-theme");
    }
    return () => {
      document.body.classList.remove("premium-theme");
    };
  }, [isPremium]);

  return null;
}

// Top of the visitor funnel: a signed-out browser's first page view.
function FunnelVisit() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user && !pathname.startsWith("/admin")) trackFunnelStep("visit");
  }, [loading, user, pathname]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
        <PremiumTheme />
        <FunnelVisit />
      </AuthProvider>
    </LanguageProvider>
  );
}
