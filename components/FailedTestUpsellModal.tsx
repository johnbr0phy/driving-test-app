"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Target, Lock, Sparkles, CheckCircle } from "lucide-react";

interface WeakCategory {
  category: string;
  wrong: number;
  total: number;
  accuracy: number;
}

interface FailedTestUpsellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  percentage: number;
  score: number;
  totalQuestions: number;
  weakCategories: WeakCategory[];
  onUpgrade: () => Promise<void>;
}

function useMidnightCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export function FailedTestUpsellModal({
  open,
  onOpenChange,
  percentage,
  score,
  totalQuestions,
  weakCategories,
  onUpgrade,
}: FailedTestUpsellModalProps) {
  const [loading, setLoading] = useState(false);
  const countdown = useMidnightCountdown();

  const visibleCategories = weakCategories.slice(0, 2);
  const hiddenCategories = weakCategories.slice(2);
  const missed = totalQuestions - score;

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await onUpgrade();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
        {/* Red header band */}
        <div className="bg-gradient-to-br from-red-600 to-rose-700 px-6 py-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-red-200" />
            <span className="text-sm font-semibold text-red-100 uppercase tracking-wider">
              Study Plan Available
            </span>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white leading-tight">
              You missed {missed} question{missed !== 1 ? "s" : ""} — here&apos;s why
            </DialogTitle>
          </DialogHeader>
          <p className="text-red-100 text-sm mt-1">
            You scored {percentage}%. The pass mark is 70%. We found {weakCategories.length} weak spot{weakCategories.length !== 1 ? "s" : ""} holding you back.
          </p>
        </div>

        <div className="px-6 py-4">
          {/* Countdown urgency bar */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3 mb-4">
            <Clock className="h-4 w-4 text-amber-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-700 font-medium">
                Personalised plan resets at midnight
              </p>
            </div>
            <span className="font-mono font-bold text-amber-800 text-sm tabular-nums shrink-0">
              {countdown}
            </span>
          </div>

          {/* Weak category preview */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Your weak spots</span>
            </div>

            <div className="space-y-2">
              {/* Show first 2 categories clearly */}
              {visibleCategories.map((cat) => (
                <div
                  key={cat.category}
                  className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg px-3 py-2"
                >
                  <span className="text-sm font-medium text-gray-800 truncate pr-2">
                    {cat.category}
                  </span>
                  <span className="text-xs font-bold text-red-600 shrink-0">
                    {cat.accuracy}% accuracy
                  </span>
                </div>
              ))}

              {/* Blurred remaining categories — premium teaser */}
              {hiddenCategories.length > 0 && (
                <div className="relative">
                  {hiddenCategories.slice(0, 2).map((cat) => (
                    <div
                      key={cat.category}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-2 blur-sm select-none pointer-events-none"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {cat.category}
                      </span>
                      <span className="text-xs font-bold text-red-600">
                        {cat.accuracy}% accuracy
                      </span>
                    </div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-gray-200">
                      <Lock className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-700">
                        +{hiddenCategories.length} more with Premium
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* If only 2 or fewer weak cats, show a locked placeholder */}
              {weakCategories.length <= 2 && (
                <div className="relative">
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 blur-sm select-none pointer-events-none">
                    <span className="text-sm font-medium text-gray-800">
                      Targeted practice questions
                    </span>
                    <span className="text-xs font-bold text-brand">
                      50 questions
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-gray-200">
                      <Lock className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-700">Unlock targeted drills</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Premium benefits */}
          <div className="bg-gradient-to-r from-brand-light to-brand-gradient-to rounded-lg px-4 py-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-brand" />
              <span className="text-sm font-semibold text-gray-900">Premium unlocks</span>
            </div>
            <ul className="space-y-1">
              {[
                "Full weak spot breakdown by category",
                "All 4 practice tests + training sets",
                "Pass probability tracker",
                "One-time payment — no subscription",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price + CTA */}
          <div className="text-center mb-3">
            <span className="text-2xl font-black text-gray-900">$9.99</span>
            <span className="text-sm text-gray-500 ml-1">one-time</span>
          </div>

          <Button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-brand text-white hover:bg-brand-hover font-bold h-11 text-base"
          >
            {loading ? "Loading…" : "Fix my weak spots — $9.99"}
          </Button>

          <button
            onClick={() => onOpenChange(false)}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 py-1.5 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
