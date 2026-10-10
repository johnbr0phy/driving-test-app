"use client";

// Exam header for v2 exams, matching the v1 exam header (CDLHeader): brand
// tile, exam name, test switcher, account. Hidden on the full-screen runners.

import Link from "next/link";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { TestSwitcher } from "@/components/TestSwitcher";
import { ExamV2Config } from "@/lib/v2/types";

export function V2Header({ exam }: { exam: ExamV2Config }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);

  if (pathname?.startsWith(`${exam.slug}/test/`) && !pathname.endsWith("/results")) return null;
  if (pathname === `${exam.slug}/train`) return null;

  const style = { "--brand": exam.theme.brand, "--brand-dark": exam.theme.brandDark, "--brand-light": exam.theme.brandLight } as CSSProperties;
  const displayPhotoURL = photoURL || user?.photoURL;

  return (
    <header className="border-b bg-white" style={style}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={exam.slug} className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 group-hover:opacity-80 transition-opacity hidden sm:inline">{exam.name}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <TestSwitcher />
          {user ? (
            <Link href="/settings">
              <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                <AvatarFallback className="text-lg">😊</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href={`/login?redirect=${exam.slug}`}>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
