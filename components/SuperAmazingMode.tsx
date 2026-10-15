"use client";

// "Super amazing mode": an opt-in toggle at the bottom of every practice test
// that celebrates each answer with an emoji burst and a hype word. It never
// hints at right or wrong, so the test still measures the same thing. The
// choice is a device setting in localStorage (like the theme), shared by every
// test page through a small external store.

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

const STORAGE_KEY = "tigertest-super-amazing";
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useSuperAmazingMode(): [boolean, (on: boolean) => void] {
  const on = useSyncExternalStore(subscribe, read, () => false);
  const set = (next: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    listeners.forEach((l) => l());
  };
  return [on, set];
}

export function SuperAmazingToggle({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const [on, setOn] = useSuperAmazingMode();
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
        on
          ? "super-amazing-border border-transparent bg-white dark:bg-gray-900"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      } ${className}`}
    >
      <span className="text-2xl" aria-hidden>
        {on ? "🤩" : "✨"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-gray-900 dark:text-gray-50">{t("testPage.superAmazing")}</span>
        <span className="block text-sm text-gray-600 dark:text-gray-300">{t("testPage.superAmazingHint")}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={t("testPage.superAmazing")}
        onClick={() => setOn(!on)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-brand" : "bg-gray-300 dark:bg-gray-700"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`}
        />
      </button>
    </label>
  );
}

const EMOJIS = ["🎉", "✨", "🐯", "⭐", "🔥", "💥", "🚀", "🌈"];
const PARTICLES = 16;

type Burst = { id: number; hype: string; particles: { emoji: string; x: number; y: number; r: number }[] };

/**
 * Renders a burst each time `trigger` changes (pass an answer counter).
 * Does nothing while the mode is off. Mount it inside the test's own tree so
 * focus-mode pages (which make the rest of the page inert) still show it.
 */
export function SuperAmazingBurst({ trigger }: { trigger: number }) {
  const { t } = useTranslation();
  const [on] = useSuperAmazingMode();
  const [burst, setBurst] = useState<Burst | null>(null);

  useEffect(() => {
    if (!on || trigger === 0) return;
    const words = t("testPage.superAmazingHype").split("|");
    const particles = Array.from({ length: PARTICLES }, (_, i) => {
      const angle = (i / PARTICLES) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 90 + Math.random() * 110;
      return {
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        r: Math.random() * 360 - 180,
      };
    });
    setBurst({ id: trigger, hype: words[Math.floor(Math.random() * words.length)], particles });
    const done = setTimeout(() => setBurst(null), 900);
    return () => clearTimeout(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  if (!burst) return null;
  return (
    <div key={burst.id} aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {burst.particles.map((p, i) => (
        <span
          key={i}
          className="super-amazing-particle absolute text-2xl"
          style={{ "--x": `${p.x}px`, "--y": `${p.y}px`, "--r": `${p.r}deg` } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}
      <span className="super-amazing-hype rounded-full bg-brand px-5 py-2 text-2xl font-black text-white shadow-lg">
        {burst.hype}
      </span>
    </div>
  );
}
