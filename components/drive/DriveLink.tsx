"use client";

// "Drive this question": shown under a question's explanation when that
// question has a scene. Hidden unless the drive flag is on, and for English
// readers only (the scenes are English in v1).

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { isDriveEnabled } from "@/src/drive/flag";
import { drivePathForQuestion } from "@/src/drive/links";

export function DriveLink({ questionId, className = "" }: { questionId: string; className?: string }) {
  const { language } = useLanguage();
  if (!isDriveEnabled() || language !== "en") return null;
  const href = drivePathForQuestion(questionId);
  if (!href) return null;
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800 dark:text-orange-300 ${className}`}
    >
      <span aria-hidden="true">🚗</span> Drive this question
    </Link>
  );
}
