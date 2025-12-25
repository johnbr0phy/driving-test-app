"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useAdmin } from "@/hooks/useAdmin";
import Image from "next/image";
import { Shield } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const isGuest = useStore((state) => state.isGuest);
  const isAdmin = useAdmin();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayPhotoURL = photoURL || user?.photoURL;

  // Hide header on test and training pages
  const hideHeader = pathname?.startsWith("/test") || pathname === "/training";

  // Hide sign up prompt on onboarding pages (too early in flow)
  const isOnboarding = pathname?.startsWith("/onboarding");

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user || isGuest ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <Image src="/tiger.png" alt="tigertest.io" width={40} height={40} className="w-10 h-10" />
            <span className="text-2xl font-bold text-gray-900 group-hover:opacity-80 transition-opacity">
              tigertest.io
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors" title="Admin Dashboard">
                    <Shield className="h-5 w-5" />
                  </Link>
                )}
                <Link href="/settings">
                  <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                    <AvatarFallback className="text-lg">😊</AvatarFallback>
                  </Avatar>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                  Log Out
                </Button>
              </>
            ) : isGuest && !isOnboarding ? (
              <Link href="/signup">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold">
                  Sign Up to Save
                </Button>
              </Link>
            ) : !isGuest ? (
              <Link href="/login">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">Sign In</Button>
              </Link>
            ) : null}
          </div>
        </div>
    </header>
  );
}
