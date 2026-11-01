"use client";

import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { getCatalogEntry, type TestCatalogEntry } from "@/lib/testCatalog";

/**
 * The current test: the last dashboard this person opened (primaryExam in
 * the store, synced to the account). Opening another test's dashboard, from
 * the All tests menu, the profile page or anywhere else, makes that one
 * current. Undefined until one has been opened.
 */
export function useCurrentTest(): TestCatalogEntry | undefined {
  const hydrated = useHydration();
  const primaryExam = useStore((s) => s.primaryExam);
  return hydrated && primaryExam ? getCatalogEntry(primaryExam) : undefined;
}
