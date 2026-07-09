"use client";

import { useEffect } from "react";
import { isNativeApp } from "@/lib/native-app";

/**
 * Tags <html> with .native-app when the site is loaded inside the
 * TigerTest mobile shell, so CSS can apply safe-area insets (see
 * globals.css). Renders nothing.
 */
export function NativeAppShell() {
  useEffect(() => {
    if (isNativeApp()) {
      document.documentElement.classList.add("native-app");
    }
  }, []);

  return null;
}
