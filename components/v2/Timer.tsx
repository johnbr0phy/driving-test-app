"use client";

import { useEffect, useState } from "react";
import { Clock, EyeOff } from "lucide-react";

export function formatClock(seconds: number) {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/** Countdown driven by a function so a hidden tab still counts down correctly. */
export function Timer({ remaining, onExpire }: { remaining: () => number; onExpire: () => void }) {
  const [left, setLeft] = useState(remaining());
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tick = () => {
      const r = remaining();
      setLeft(r);
      if (r <= 0) onExpire();
    };
    tick();
    const id = setInterval(tick, 500);
    const onVis = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [remaining, onExpire]);

  const low = left <= 5 * 60;
  return (
    <button
      type="button"
      onClick={() => setHidden((h) => !h)}
      className={`v2-tap flex items-center gap-1.5 rounded-full px-3 text-sm font-semibold tabular-nums ${low ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-800"}`}
      aria-live={low ? "polite" : "off"}
      aria-label={hidden ? "Show timer" : "Hide timer"}
    >
      {hidden ? <EyeOff className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
      {hidden && !low ? "Timer" : formatClock(left)}
    </button>
  );
}
