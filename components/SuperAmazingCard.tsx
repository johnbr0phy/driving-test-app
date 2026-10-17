"use client";

// Super Amazing Mode card for the bottom of every dashboard (DMV, registry
// exams, v2 exams). Each dashboard unlocks its own switch by going all green
// (superAmazingUnlocks[dashboardKey]); the fireworks themselves are site-wide
// (SuperAmazingFireworks in the root layout), so a switch flipped on one
// earned dashboard keeps them running everywhere.
// Free and premium alike earn it the same way. The localStorage flag drives
// the fireworks; the store copy syncs the toggle to Firestore so adoption is
// visible in the admin dashboard.

import { useCallback, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { SUPER_AMAZING_EVENT, SUPER_AMAZING_KEY } from "@/components/SuperAmazingFireworks";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/contexts/AuthContext";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";

export function SuperAmazingCard({ dashboardKey, allComplete, totalSteps }: { dashboardKey: string; allComplete: boolean; totalSteps: number }) {
  const { t } = useTranslation();
  const hydrated = useHydration();
  const { user } = useAuth();
  const firestoreLoaded = useStore((state) => state.firestoreLoaded);
  const superAmazingSync = useStore((state) => state.superAmazing);
  const setSuperAmazingEnabled = useStore((state) => state.setSuperAmazingEnabled);
  const superAmazingUnlocks = useStore((state) => state.superAmazingUnlocks);
  const unlockSuperAmazing = useStore((state) => state.unlockSuperAmazing);
  const [superAmazing, setSuperAmazing] = useState(false);

  useEffect(() => {
    setSuperAmazing(localStorage.getItem(SUPER_AMAZING_KEY) === "1");
  }, []);

  const setLocalFlag = useCallback((on: boolean) => {
    localStorage.setItem(SUPER_AMAZING_KEY, on ? "1" : "0");
    setSuperAmazing(on);
    window.dispatchEvent(new Event(SUPER_AMAZING_EVENT));
  }, []);

  const toggleSuperAmazing = () => {
    const next = !superAmazing;
    setLocalFlag(next);
    setSuperAmazingEnabled(next);
  };

  // Once earned, always earned. Current progress can dip below all green when
  // someone retakes a test or retrains a set; the reward does not dip with it.
  // samUnlocked: this dashboard has been all green. earnedAnywhere: some
  // dashboard has, which is what keeps the fireworks flag alive.
  const unlocks = superAmazingUnlocks ?? {};
  const samUnlocked = hydrated && !!unlocks[dashboardKey];
  const earnedAnywhere = hydrated && Object.keys(unlocks).length > 0;

  // An all-green dashboard latches the achievement in the store (and
  // Firestore) and switches the fireworks on so the reward is immediate. Wait
  // for Firestore on signed-in users so a not-yet-loaded remote doc can't hide
  // an existing latch or record one against stale local progress.
  useEffect(() => {
    if (!hydrated || !allComplete || samUnlocked) return;
    if (user && !firestoreLoaded) return;
    unlockSuperAmazing(dashboardKey);
    setLocalFlag(true);
  }, [hydrated, allComplete, samUnlocked, dashboardKey, user, firestoreLoaded, unlockSuperAmazing, setLocalFlag]);

  // Retire a stale local fireworks flag only for someone who has never earned
  // it on any dashboard (e.g. leftover from a previous account on this device).
  useEffect(() => {
    if (!hydrated || earnedAnywhere) return;
    if (user && !firestoreLoaded) return;
    if (localStorage.getItem(SUPER_AMAZING_KEY) === "1") setLocalFlag(false);
    if (superAmazingSync.enabled) setSuperAmazingEnabled(false);
  }, [hydrated, earnedAnywhere, user, firestoreLoaded, superAmazingSync.enabled, setSuperAmazingEnabled, setLocalFlag]);

  // Reconcile the synced flag with this device once the achievement is known:
  // pull a remote-enabled toggle down to localStorage (cross-device), and push
  // a pre-sync local-only flag up once (only before any recorded toggle, so a
  // deliberate turn-off on another device isn't resurrected).
  useEffect(() => {
    if (!hydrated || !earnedAnywhere) return;
    if (user && !firestoreLoaded) return;
    const local = localStorage.getItem(SUPER_AMAZING_KEY) === "1";
    if (superAmazingSync.enabled && !local) {
      setLocalFlag(true);
    } else if (!superAmazingSync.enabled && local && superAmazingSync.lastToggledAt === null) {
      setSuperAmazingEnabled(true);
    }
  }, [hydrated, earnedAnywhere, user, firestoreLoaded, superAmazingSync, setSuperAmazingEnabled, setLocalFlag]);

  return (
    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
        {samUnlocked ? t("dashboard.samUnlockedLabel") : t("dashboard.samUnlockLabel").replaceAll("{{n}}", String(totalSteps))}
      </p>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm flex items-center gap-1.5 ${
              samUnlocked ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {t("dashboard.samTitle")}
            {!samUnlocked && <Lock className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />}
          </h3>
        </div>
        <button
          role="switch"
          aria-checked={superAmazing}
          aria-label={t("dashboard.samTitle")}
          disabled={!samUnlocked}
          onClick={toggleSuperAmazing}
          className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors ${
            superAmazing && samUnlocked
              ? "bg-brand"
              : samUnlocked
                ? "bg-gray-200 dark:bg-gray-700"
                : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow transition-transform ${
              superAmazing && samUnlocked ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
