"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, X, Zap } from "lucide-react";
import Image from "next/image";

interface TrainingTestNudgeProps {
  trainingCorrectCount: number;
  state: string;
}

export function TrainingTestNudge({ trainingCorrectCount, state }: TrainingTestNudgeProps) {
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleTakeTest = () => {
    router.push("/test/1");
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
  };

  // Pick encouraging message based on training progress
  const getMessage = () => {
    if (trainingCorrectCount >= 50) {
      return `You've correctly answered ${trainingCorrectCount} training questions — you're ready. Take a full practice test and see your real score.`;
    }
    if (trainingCorrectCount >= 20) {
      return `You've answered ${trainingCorrectCount} training questions correctly. A practice test will show you exactly where you stand before the real exam.`;
    }
    return `You've been training — now put it to the test. A full practice test simulates the real ${state} DMV exam.`;
  };

  return (
    <div className="mb-6">
      <Card
        className="cursor-pointer border-brand-border-light bg-gradient-to-r from-brand-light via-white to-brand-gradient-to hover:shadow-md transition-all relative overflow-hidden"
        onClick={handleTakeTest}
      >
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10 p-1"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <CardContent className="p-5">
          <div className="flex items-center gap-4 pr-6">
            {/* Tiger icon */}
            <div className="flex-shrink-0">
              <Image
                src="/tiger_face_04.png"
                alt="Tiger mascot"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Zap className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                <p className="text-xs font-semibold text-brand uppercase tracking-wide">
                  Ready to test yourself?
                </p>
              </div>
              <p className="text-sm text-gray-700 leading-snug">
                {getMessage()}
              </p>
              <p className="text-sm font-semibold text-brand-dark mt-2">
                Take Practice Test 1 →
              </p>
            </div>

            <ChevronRight className="h-5 w-5 text-brand-muted flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
