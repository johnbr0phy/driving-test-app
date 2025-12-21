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

  // Use white header on homepage, signup, and login pages
  const useWhiteHeader = pathname === "/" || pathname === "/signup" || pathname === "/login";

  if (hideHeader) {
    return null;
  }

  return (
    <header className={`border-b ${useWhiteHeader ? "bg-white" : "bg-orange-600"}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <Image src="/tiger.png" alt="Tiger Tests" width={40} height={40} className="w-10 h-10" />
          <span className={`text-2xl font-bold ${useWhiteHeader ? "text-gray-900" : "text-white"} group-hover:opacity-80 transition-opacity`}>
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
