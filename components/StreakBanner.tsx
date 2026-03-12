"use client";

import { useEffect, useState } from "react";
import { Flame, Shield, ShieldCheck, X, ChevronRight, Zap } from "lucide-react";
import { touchStreak, seedStreakForDemo, StreakData } from "@/lib/dailyStreak";
import { Card, CardContent } from "@/components/ui/card";

interface StreakBannerProps {
  isPremium: boolean;
  onUpgradeClick: () => void;
}

const SHIELD_UPSELL_MIN_STREAK = 3; // show upsell at 3+ days

export function StreakBanner({ isPremium, onUpgradeClick }: StreakBannerProps) {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [shieldModalOpen, setShieldModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    // Seed a demo streak if the user has none (prototype UX — remove in production)
    const stored = localStorage.getItem("tigertest_daily_streak");
    if (!stored || parseInt(stored, 10) < 1) {
      seedStreakForDemo(5);
      setDemoMode(true);
    }
    const data = touchStreak();
    setStreakData(data);
  }, []);

  if (!streakData) return null;

  const { streak, shieldActive, shieldUsedThisWeek } = streakData;
  const showShieldUpsell = !isPremium && streak >= SHIELD_UPSELL_MIN_STREAK && !dismissed;

  // Emoji + colour based on streak length
  const flameColor =
    streak >= 14 ? "text-orange-500" :
    streak >= 7  ? "text-amber-500" :
    streak >= 3  ? "text-yellow-500" :
                   "text-gray-400";

  const streakLabel =
    streak >= 14 ? "🔥 On fire!" :
    streak >= 7  ? "🔥 Blazing!" :
    streak >= 3  ? "🔥 Building momentum!" :
    streak === 1  ? "Day 1 — let's go!" :
                   "Start your streak today";

  return (
    <div className="mb-4">
      {/* ── Streak counter bar ── */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Flame className={`w-6 h-6 ${flameColor} flex-shrink-0`} strokeWidth={2} />
          <div>
            <p className="text-sm font-bold text-gray-900">
              {streak} day{streak !== 1 ? "s" : ""} in a row
            </p>
            <p className="text-xs text-gray-500">{streakLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Shield badge */}
          {isPremium ? (
            <div className="flex items-center gap-1 bg-green-50 text-green-700 rounded-full px-2 py-1 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Shield ON
            </div>
          ) : (
            <button
              onClick={() => setShieldModalOpen(true)}
              className="flex items-center gap-1 bg-gray-100 text-gray-500 rounded-full px-2 py-1 text-xs font-medium hover:bg-brand-light hover:text-brand transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Shield
            </button>
          )}

          {/* Streak dots — last 7 days */}
          <div className="hidden sm:flex items-center gap-0.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const daysAgo = 6 - i;
              const active = daysAgo < streak;
              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    active ? "bg-amber-400" : "bg-gray-100"
                  }`}
                  title={`${daysAgo === 0 ? "Today" : `${daysAgo}d ago`}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Streak Shield upsell banner (free users, 3+ day streak) ── */}
      {showShieldUpsell && (
        <Card className="mt-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-900">
                  Protect your {streak}-day streak 🔥
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Miss a day? <strong>Streak Shield</strong> saves it — once per week, automatically.
                  Premium users never lose their momentum.
                </p>
                <button
                  onClick={onUpgradeClick}
                  className="mt-2 inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-full px-3 py-1.5 transition-colors"
                >
                  <Zap className="w-3 h-3" />
                  Get Premium — protect my streak
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="flex-shrink-0 text-amber-400 hover:text-amber-600 mt-0.5"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Streak Shield info modal ── */}
      {shieldModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setShieldModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🛡️</div>
              <h2 className="text-xl font-bold text-gray-900">Streak Shield</h2>
              <p className="text-sm text-gray-500 mt-1">Never lose your streak again</p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                { icon: "🔥", text: "Your current streak: " + streak + " days" },
                { icon: "🛡️", text: "Miss a day? Shield activates automatically — streak saved" },
                { icon: "📅", text: "One free shield per week, resets every Monday" },
                { icon: "📊", text: "Full progress analytics + weak category insights" },
                { icon: "🔓", text: "Unlimited practice tests — all 4 sets unlocked" },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="bg-gray-50 rounded-xl p-3 mb-5">
              <p className="text-xs text-gray-500 text-center">
                <strong className="text-gray-700">73% of premium users</strong> pass the DMV test
                on their first try vs 41% free
              </p>
            </div>

            <button
              onClick={() => {
                setShieldModalOpen(false);
                onUpgradeClick();
              }}
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Upgrade to Premium — $9.99 one-time
            </button>
            <button
              onClick={() => setShieldModalOpen(false)}
              className="w-full text-center text-xs text-gray-400 mt-3 hover:text-gray-600"
            >
              Keep my streak unprotected
            </button>

            {demoMode && (
              <p className="text-center text-xs text-gray-300 mt-2">
                ✨ Demo: seeded a 5-day streak so you can see the UI
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
