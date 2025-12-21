"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const photoURL = useStore((state) => state.photoURL);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayPhotoURL = photoURL || user?.photoURL;
  const initials = user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-blue-600">
          DrivingTest
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-sm">{initials}</AvatarFallback>
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
