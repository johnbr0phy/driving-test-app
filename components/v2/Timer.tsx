"use client";

import { useEffect, useRef, useState } from "react";
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
  const expired = useRef(false);

  useEffect(() => {
    const tick = () => {
      const r = remaining();
      setLeft(r);
      if (r > 0) expired.current = false;
      if (r <= 0 && !expired.current) {
        expired.current = true;
        onExpire();
      }
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
  const announcement = left <= 0 ? "Time is up." : left <= 60 ? "One minute or less remaining." : low ? "Five minutes or less remaining." : "";
  return (
    <>
    <span className="sr-only" role="status" aria-atomic="true">{announcement}</span>
    <button
      type="button"
      onClick={() => setHidden((h) => !h)}
      className={`v2-tap flex items-center gap-1.5 rounded-full px-3 text-sm font-semibold tabular-nums ${low ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"}`}
      aria-label={hidden && !low ? "Show timer" : `${formatClock(left)} remaining. ${hidden ? "Show" : "Hide"} timer`}
      aria-pressed={!hidden}
    >
      {hidden ? <EyeOff className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
      {hidden && !low ? "Timer" : formatClock(left)}
    </button>
    </>
  );
}
