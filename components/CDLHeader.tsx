"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTestTheme } from "@/contexts/TestThemeContext";
import { Truck } from "lucide-react";
import Image from "next/image";

export function CDLHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const isGuest = useStore((state) => state.isGuest);
  const hydrated = useHydration();
  const theme = useTestTheme();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayPhotoURL = photoURL || user?.photoURL;

  const hideHeader = pathname?.startsWith(`${theme.routeBase}/test`) || pathname === `${theme.routeBase}/training`;

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={theme.logoHome} className="flex items-center gap-2 group flex-shrink-0">
          {theme.logoIcon ? (
            <Image src={theme.logoIcon} alt={theme.name} width={40} height={40} className="w-10 h-10" />
          ) : (
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-white" />
            </div>
          )}
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:opacity-80 transition-opacity hidden sm:inline">
            {theme.headerTitle}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link href="/settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">😊</AvatarFallback>
                </Avatar>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Log Out
              </Button>
            </>
          ) : isGuest ? (
            <Link href="/signup">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 font-semibold">
                Sign Up to Save
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
