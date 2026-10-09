"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTestTheme } from "@/contexts/TestThemeContext";
import { Truck, Microscope, Scissors, ShieldCheck, LogOut } from "lucide-react";
import { getExamById } from "@/lib/exams";
import Image from "next/image";
import { TestSwitcher } from "@/components/TestSwitcher";

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
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={theme.logoHome} className="flex items-center gap-2 group flex-shrink-0">
          {theme.logoIcon ? (
            <Image src={theme.logoIcon} alt={theme.name} width={40} height={40} className="w-10 h-10" />
          ) : (
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              {(() => {
                const icon = getExamById(theme.id)?.icon;
                if (icon === "microscope") return <Microscope className="h-6 w-6 text-white" />;
                if (icon === "scissors") return <Scissors className="h-6 w-6 text-white" />;
                if (icon === "shield") return <ShieldCheck className="h-6 w-6 text-white" />;
                return <Truck className="h-6 w-6 text-white" />;
              })()}
            </div>
          )}
          <span className="text-2xl font-bold text-gray-900 group-hover:opacity-80 transition-opacity hidden sm:inline">
            {theme.headerTitle}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <TestSwitcher />
          {user ? (
            <>
              <Link href="/settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">😊</AvatarFallback>
                </Avatar>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50 px-2.5 sm:px-4"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="h-5 w-5 sm:hidden" aria-hidden="true" />
                <span className="hidden sm:inline">Log Out</span>
              </Button>
            </>
          ) : isGuest ? (
            <Link href={theme.signupPath}>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold">
                Sign Up to Save
              </Button>
            </Link>
          ) : (
            <Link href={theme.loginPath}>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
