"use client";

import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";

// After this many saves to the account have failed in a row, say so. One
// failure is usually a dropped connection that the next answer's save fixes.
const SHOW_AFTER = 3;

/**
 * Tells a signed-in person when their progress is not reaching their account
 * (mounted once in the root layout). Saves used to fail without a word, so
 * someone could practise for days on one device and find none of it on
 * another. Their progress is still on this device; "Try again" saves it now.
 */
export function SyncNotice() {
  const { t } = useTranslation();
  const failures = useStore((s) => s.syncFailures);
  const signedIn = useStore((s) => !!s.userId && !s.isGuest);
  const save = useStore((s) => s.saveToFirestore);

  if (!signedIn || failures < SHOW_AFTER) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
    >
      <p className="flex-1">{t("common.syncFailed")}</p>
      <button
        type="button"
        onClick={() => save()}
        className="shrink-0 rounded-lg bg-black px-3 py-1.5 font-semibold text-white dark:bg-white dark:text-gray-900"
      >
        {t("common.syncRetry")}
      </button>
    </div>
  );
}
