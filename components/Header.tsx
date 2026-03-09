"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useAdmin } from "@/hooks/useAdmin";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import Image from "next/image";
import { Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Language } from "@/i18n";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const isGuest = useStore((state) => state.isGuest);
  const isAdmin = useAdmin();
  const hydrated = useHydration();
  const subscription = useStore((state) => state.subscription);
  const isPremium = hydrated && !isGuest && !!user && subscription?.isPremium === true;
  const { t, language, setLanguage } = useTranslation();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayPhotoURL = photoURL || user?.photoURL;

  // Hide header on test and training pages (DMV and CDL)
  const hideHeader = pathname?.startsWith("/test") || pathname === "/training" || pathname?.startsWith("/cdl/test") || pathname === "/cdl/training";

  // Hide sign up prompt on onboarding pages (too early in flow)
  const isOnboarding = pathname?.startsWith("/onboarding");

  // Hide language toggle on SEO landing pages (they have dedicated /es/ versions)
  const isSeoPage =
    pathname?.endsWith("-dmv-practice-test") ||
    pathname?.endsWith("-examen-practica-dmv") ||
    pathname === "/practice-tests-by-state" ||
    pathname === "/es/examenes-practica-por-estado";

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user || isGuest ? "/dashboard" : "/"} className="flex items-center gap-2 group flex-shrink-0">
            <Image src={isPremium ? "/tiger_face_01.png" : "/tiger.png"} alt="tigertest.io" width={40} height={40} className="w-10 h-10" />
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:opacity-80 transition-opacity hidden sm:inline">
              tigertest.io
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {/* Language Toggle - hidden on SEO pages which have dedicated /es/ versions */}
            {!isSeoPage && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
                {([["en", "\u{1F1FA}\u{1F1F8}"], ["es", "\u{1F1EA}\u{1F1F8}"]] as [Language, string][]).map(([lang, flag]) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-1.5 py-1 text-sm rounded-full transition-colors ${
                      language === lang
                        ? "bg-white dark:bg-gray-700 shadow-sm"
                        : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    {flag}
                  </button>
                ))}
              </div>
            )}

            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors" title="Admin Dashboard">
                    <Shield className="h-5 w-5" />
                  </Link>
                )}
                <Link href="/settings">
                  <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                    <AvatarFallback className="text-lg">😊</AvatarFallback>
                  </Avatar>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                  {t("common.logOut")}
                </Button>
              </>
            ) : isGuest && !isOnboarding ? (
              <Link href="/signup">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold">
                  {t("common.signUpToSave")}
                </Button>
              </Link>
            ) : !isGuest ? (
              <Link href="/login">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">{t("common.signIn")}</Button>
              </Link>
            ) : null}
          </div>
        </div>
    </header>
  );
}
