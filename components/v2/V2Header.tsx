"use client";

// Exam header for v2 exams, matching the v1 exam header (CDLHeader): the
// tigertest logo, test switcher, Your Stats, account. Hidden on the full-screen runners.

import Link from "next/link";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { TestSwitcher } from "@/components/TestSwitcher";
import { AdminLink } from "@/components/AdminLink";
import { BrandLockup } from "@/components/BrandLockup";
import { v2DarkThemeStyle } from "@/lib/v2/darkTheme";
import { TeachLink } from "@/components/TeachLink";
import { ExamV2Config } from "@/lib/v2/types";
import { v2Routes } from "@/lib/v2/registry";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";

export function V2Header({ exam }: { exam: ExamV2Config }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const hydrated = useHydration();
  // A guest's stats live on this device, so the link shows once they have
  // answered something here; an account always has it, like CDLHeader.
  const hasProgress = useV2Store(
    (s) =>
      s.results.some((r) => r.examId === exam.id) ||
      Object.keys(s.drills).some((k) => k.startsWith(`${exam.id}:`)) ||
      Object.keys(s.questionStats?.[exam.id] ?? {}).length > 0,
  );

  if (pathname?.startsWith(`${exam.slug}/test/`) && !pathname.endsWith("/results")) return null;
  if (pathname?.startsWith(`${exam.slug}/practice/`)) return null;

  // The dark tints ride along for the header's brand-colored controls.
  const style = {
    "--brand": exam.theme.brand,
    "--brand-dark": exam.theme.brandDark,
    "--brand-light": exam.theme.brandLight,
    ...v2DarkThemeStyle(exam.theme),
  } as CSSProperties;
  const displayPhotoURL = photoURL || user?.photoURL;
  // The dashboard's own save card (GuestSaveCard) already offers sign in, so the header leaves it out there.
  const onDashboard = pathname === `${exam.slug}/dashboard`;
  const statsPath = v2Routes(exam).stats;
  const showStats = hydrated && (!!user || hasProgress);

  return (
    <header className="border-b bg-white dark:bg-gray-900" style={style}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <BrandLockup />
        <div className="flex items-center gap-1 sm:gap-2">
          <TestSwitcher />
          {showStats && (
            <Link
              href={statsPath}
              aria-current={pathname === statsPath ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 ${
                pathname === statsPath ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : "text-gray-600 dark:text-gray-300"
              }`}
              title="Your Stats"
              aria-label="Your Stats"
            >
              <BarChart3 className="h-5 w-5 stats-icon" />
            </Link>
          )}
          {user ? (
            <>
              <TeachLink />
              <AdminLink />
              <Link href="/settings" aria-label="Profile and settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">😊</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : onDashboard ? null : (
            <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Link href={`/login?redirect=${exam.slug}/dashboard`}>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
