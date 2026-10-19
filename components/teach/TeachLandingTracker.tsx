"use client";

import { useEffect } from "react";
import { trackTeachStep } from "@/lib/teachTracking";

// Counts the /teach landing being shown and a click on any of its
// "Create a free class" links (lib/teachTracking), from inside the otherwise
// server-rendered landing. Signed out, those links go to /signup first, so
// /teach/new alone would miss the click.
export function TeachLandingTracker() {
  useEffect(() => {
    trackTeachStep("landing_view");
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element | null)?.closest?.("a")?.getAttribute("href");
      if (href && decodeURIComponent(href).includes("/teach/new")) trackTeachStep("new_open");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
