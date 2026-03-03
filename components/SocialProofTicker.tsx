"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Star } from "lucide-react";

const RECENT_PASSES = [
  { name: "Marcus T.", state: "New Jersey", score: 92, time: "2 mins ago" },
  { name: "Sofia R.", state: "California", score: 88, time: "5 mins ago" },
  { name: "Devon K.", state: "Texas", score: 95, time: "11 mins ago" },
  { name: "Priya M.", state: "New York", score: 90, time: "14 mins ago" },
  { name: "Liam O.", state: "Florida", score: 84, time: "18 mins ago" },
  { name: "Aaliyah B.", state: "Illinois", score: 96, time: "22 mins ago" },
  { name: "Carlos H.", state: "Georgia", score: 87, time: "29 mins ago" },
  { name: "Emma W.", state: "Pennsylvania", score: 91, time: "34 mins ago" },
  { name: "Jaylen F.", state: "Ohio", score: 89, time: "41 mins ago" },
  { name: "Hannah L.", state: "Michigan", score: 93, time: "47 mins ago" },
];

export function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % RECENT_PASSES.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = RECENT_PASSES[currentIndex];

  return (
    <div className="space-y-3">
      {/* Live pass ticker */}
      <div
        className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <CheckCircle className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
        <span className="text-green-800 font-medium">{current.name}</span>
        <span className="text-green-700">from {current.state} just passed</span>
        <span className="ml-auto text-green-600 text-xs whitespace-nowrap">{current.time}</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
        <div className="px-2">
          <div className="text-lg font-bold text-gray-900">1,247</div>
          <div className="text-xs text-gray-500 leading-tight">passed this month</div>
        </div>
        <div className="px-2">
          <div className="text-lg font-bold text-gray-900">94%</div>
          <div className="text-xs text-gray-500 leading-tight">first-attempt pass rate</div>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-center gap-0.5 mb-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3 w-3 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-300 text-yellow-300"}`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 leading-tight">4.8 · 892 reviews</div>
        </div>
      </div>
    </div>
  );
}
