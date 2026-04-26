"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DataResetNotification } from "@/components/DataResetNotification";
import { ReferralCapture } from "@/components/ReferralCapture";
import { useStore } from "@/store/useStore";

function DataResetNotificationWrapper() {
  const showDataResetNotification = useStore((state) => state.showDataResetNotification);
  const dismissDataResetNotification = useStore((state) => state.dismissDataResetNotification);

  return (
    <DataResetNotification
      open={showDataResetNotification}
      onDismiss={dismissDataResetNotification}
    />
  );
}

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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
        <DataResetNotificationWrapper />
        <PremiumTheme />
        <ReferralCapture />
      </AuthProvider>
    </LanguageProvider>
  );
}
