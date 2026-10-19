"use client";

// Exam header for v2 exams, matching the v1 exam header (CDLHeader): brand
// tile, exam name, test switcher, account. Hidden on the full-screen runners.

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { TestIcon } from "@/components/TestIcon";
import type { TestCatalogEntry } from "@/lib/testCatalog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { TestSwitcher } from "@/components/TestSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminLink } from "@/components/AdminLink";
import { BrandLockup } from "@/components/BrandLockup";
import { v2DarkThemeStyle } from "@/lib/v2/darkTheme";
import { TeachLink } from "@/components/TeachLink";
import { ExamV2Config } from "@/lib/v2/types";
import { getTigerAsset, hasTigerSet } from "@/lib/tigerAssets";

export function V2Header({ exam }: { exam: ExamV2Config }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);

  if (pathname?.startsWith(`${exam.slug}/test/`) && !pathname.endsWith("/results")) return null;
  if (pathname?.startsWith(`${exam.slug}/practice/`)) return null;

  // The dark tints ride along so .v2-header-logo can lift the logo's subtitle in dark mode.
  const style = {
    "--brand": exam.theme.brand,
    "--brand-dark": exam.theme.brandDark,
    "--brand-light": exam.theme.brandLight,
    ...v2DarkThemeStyle(exam.theme),
  } as CSSProperties;
  const displayPhotoURL = photoURL || user?.photoURL;
  // The dashboard's own save card (GuestSaveCard) already offers sign in, so the header leaves it out there.
  const onDashboard = pathname === `${exam.slug}/dashboard`;

  return (
    <header className="border-b bg-white dark:bg-gray-900" style={style}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`${exam.slug}/dashboard`} aria-label={`${exam.name} home`} className="v2-header-logo group flex-shrink-0">
          <BrandLockup
            subtitle={exam.name}
            icon={
              hasTigerSet(exam.id) ? (
                <Image src={getTigerAsset(exam.id)} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              ) : (
                <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                  <TestIcon icon={exam.icon as TestCatalogEntry["icon"]} className="h-6 w-6 text-white" />
                </div>
              )
            }
          />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <TestSwitcher />
          <ThemeToggle />
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
