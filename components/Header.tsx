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

  // Hide header on homepage, test and training pages
  const hideHeader = pathname === "/" || pathname?.startsWith("/test") || pathname === "/training";

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-orange-600">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center group">
          <Image
            src="/hero-logo.png"
            alt="Tiger Tests"
            width={180}
            height={60}
            className="h-10 w-auto"
            priority
          />
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
              <Button onClick={handleLogout} className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300">
                Log Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
