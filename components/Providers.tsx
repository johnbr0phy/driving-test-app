"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useStore } from "@/store/useStore";
import { trackFunnelStep } from "@/lib/funnel";
import { trackSchoolReferral } from "@/lib/schoolReferral";

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

// A visit from a school's LMS or website, signed in or not (lib/schoolReferral).
// The referrer survives client-side navigation, so the per-school flag keeps
// this to one report per browser.
function SchoolReferral() {
  const { loading } = useAuth();
  useEffect(() => {
    if (!loading) trackSchoolReferral();
  }, [loading]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {children}
          <PremiumTheme />
          <FunnelVisit />
          <SchoolReferral />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
