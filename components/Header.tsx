"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import Image from "next/image";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayPhotoURL = photoURL || user?.photoURL;

  // Hide header on test and training pages
  const hideHeader = pathname?.startsWith("/test") || pathname === "/training";

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          {/* Logo - You can add your tiger logo here */}
          {/* Uncomment and add your logo path: */}
          {/* <Image src="/tiger-logo.png" alt="Tiger Tests" width={32} height={32} className="w-8 h-8" /> */}
          <span className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">
            Tiger Tests
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">😊</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
