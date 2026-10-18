"use client";

// PROTO: Super Amazing Mode — when the localStorage flag is on, run
// continuous fireworks behind the UI on every page except the marketing
// homepage. Toggled from the dashboard card, which dispatches
// "super-amazing-mode" so this reacts in the same tab.
//
// Layering: the fireworks layer paints the page background colour itself and
// sits at z-0; while it runs, `sam-on` on <html> makes the page wrapper
// transparent and lifts header, main and footer above it (globals.css), so
// the show is visible only between cards, never over the UI or site chrome.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Fireworks } from "@/components/Fireworks";

export const SUPER_AMAZING_KEY = "superAmazingMode";
export const SUPER_AMAZING_EVENT = "super-amazing-mode";

export function SuperAmazingFireworks() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const read = () => setEnabled(localStorage.getItem(SUPER_AMAZING_KEY) === "1");
    read();
    window.addEventListener("storage", read);
    window.addEventListener(SUPER_AMAZING_EVENT, read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener(SUPER_AMAZING_EVENT, read);
    };
  }, []);

  const isMarketingHome = pathname === "/" || pathname === "/dmv-practice-test" || pathname === "/es";
  const on = enabled && !isMarketingHome;

  useEffect(() => {
    document.documentElement.classList.toggle("sam-on", on);
    return () => document.documentElement.classList.remove("sam-on");
  }, [on]);

  if (!on) return null;

  return (
    <div className="sam-bg fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Fireworks continuous className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
