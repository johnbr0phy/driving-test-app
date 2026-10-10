"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";

/**
 * The one TigerTest Premium flag, for pages outside the DMV store's own
 * screens. `ready` turns true once auth has settled and the account's
 * subscription has loaded, so a premium user never sees a lock flash.
 */
export function useIsPremium(): { isPremium: boolean; ready: boolean } {
  const { loading } = useAuth();
  const isPremium = useStore((s) => !s.isGuest && !!s.userId && s.subscription?.isPremium === true);
  return { isPremium, ready: !loading };
}
