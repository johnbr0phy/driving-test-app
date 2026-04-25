"use client";

import Image from "next/image";
import { useState } from "react";
import { getSignIdForQuestion } from "@/lib/signImages";
import { useStore } from "@/store/useStore";

interface QuestionImageProps {
  questionId: string;
  state: string | null;
}

const FALLBACK_BACKGROUND = "/backgrounds/default.svg";

export function QuestionImage({ questionId, state }: QuestionImageProps) {
  const selectedState = useStore((s) => s.selectedState);
  const signId = getSignIdForQuestion(questionId);
  const [bgFailed, setBgFailed] = useState(false);

  if (!signId) return null;

  const effectiveState =
    state && state !== "ALL" ? state : selectedState ?? "ALL";
  const stateCode = effectiveState.toUpperCase();
  const backgroundUrl = bgFailed
    ? FALLBACK_BACKGROUND
    : `/backgrounds/${stateCode}.svg`;
  const signUrl = `/signs/${signId}.svg`;

  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 border border-gray-200 bg-gray-100">
      <Image
        src={backgroundUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-cover"
        onError={() => setBgFailed(true)}
        priority={false}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-[70%] h-[90%]">
          <Image
            src={signUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 70vw, 500px"
            className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
