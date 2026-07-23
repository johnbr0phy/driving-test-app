"use client";

// PROTO: Super Amazing Mode — when the localStorage flag is on, run
// continuous fireworks behind the UI on every page except the marketing
// homepage. Toggled from the dashboard card, which dispatches
// "super-amazing-mode" so this reacts in the same tab.

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

  const isMarketingHome = pathname === "/" || pathname === "/es";
  if (!enabled || isMarketingHome) return null;

  return <Fireworks continuous className="fixed inset-0 z-0 pointer-events-none" />;
}
