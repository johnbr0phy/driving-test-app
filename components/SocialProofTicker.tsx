"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Users } from "lucide-react";

const ACTIVITY_FEED = [
  { name: "Sarah M.", state: "CA", action: "passed her permit test", emoji: "🎉", time: "2 min ago" },
  { name: "James T.", state: "TX", action: "upgraded to Premium", emoji: "⭐", time: "5 min ago" },
  { name: "Priya K.", state: "NY", action: "scored 100% on Practice Test 3", emoji: "🏆", time: "8 min ago" },
  { name: "Carlos R.", state: "FL", action: "passed his permit test", emoji: "🎉", time: "12 min ago" },
  { name: "Emma L.", state: "WA", action: "upgraded to Premium", emoji: "⭐", time: "15 min ago" },
  { name: "Deshawn B.", state: "GA", action: "passed her permit test", emoji: "🎉", time: "19 min ago" },
  { name: "Mei C.", state: "IL", action: "scored 95% on Practice Test 4", emoji: "🏆", time: "22 min ago" },
  { name: "Tyler W.", state: "OH", action: "upgraded to Premium", emoji: "⭐", time: "25 min ago" },
  { name: "Aisha P.", state: "NC", action: "passed her permit test", emoji: "🎉", time: "31 min ago" },
  { name: "Ryan N.", state: "AZ", action: "scored 90% after 3 attempts", emoji: "💪", time: "34 min ago" },
];

const WEEKLY_PASSERS = 347;

interface SocialProofTickerProps {
  compact?: boolean;
}

export function SocialProofTicker({ compact = false }: SocialProofTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(WEEKLY_PASSERS);

  // Animate the weekly count up slightly to feel live
  useEffect(() => {
    const jitter = setTimeout(() => {
      setCount(WEEKLY_PASSERS + Math.floor(Math.random() * 5));
    }, 1200);
    return () => clearTimeout(jitter);
  }, []);

  // Rotate activity items every 3.5s with a fade
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITY_FEED.length);
        setVisible(true);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const item = ACTIVITY_FEED[currentIndex];

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 py-1">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
        <span
          className="transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <span className="font-medium text-gray-700">{item.name}</span> from {item.state} {item.action} {item.emoji}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-green-100 bg-green-50 overflow-hidden">
      {/* Weekly stats bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-green-100/60 border-b border-green-100">
        <Users className="h-3.5 w-3.5 text-green-700 flex-shrink-0" />
        <span className="text-xs font-semibold text-green-800">
          {count.toLocaleString()} people passed their permit test with TigerTest this week
        </span>
      </div>

      {/* Live activity ticker */}
      <div className="flex items-start gap-2.5 px-3 py-2.5">
        <div className="flex-shrink-0 mt-0.5">
          <span
            className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"
            title="Live"
          />
        </div>
        <div
          className="transition-opacity duration-300 min-h-[36px]"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="text-xs text-gray-700 leading-snug">
            <span className="font-semibold text-gray-900">{item.name}</span>
            {" from "}
            <span className="font-medium">{item.state}</span>
            {" "}
            {item.action}
            {" "}
            {item.emoji}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
        </div>
        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 ml-auto" />
      </div>
    </div>
  );
}
