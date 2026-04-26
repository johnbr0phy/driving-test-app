"use client";

import Image from "next/image";
import { getSignIdForQuestion } from "@/lib/signImages";

interface QuestionImageProps {
  questionId: string;
}

export function QuestionImage({ questionId }: QuestionImageProps) {
  const signId = getSignIdForQuestion(questionId);
  if (!signId) return null;

  return (
    <div
      className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0"
      style={{
        backgroundImage: "linear-gradient(135deg, #FBE7C6, #F8B5A0)",
      }}
    >
      <Image
        src={`/signs/${signId}.svg`}
        alt=""
        fill
        sizes="128px"
        className="object-contain p-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
        priority={false}
      />
    </div>
  );
}
