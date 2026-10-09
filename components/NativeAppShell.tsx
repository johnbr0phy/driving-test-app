"use client";

import { useEffect } from "react";
import { isNativeApp } from "@/lib/native-app";

/**
 * Tags <html> with .native-app when the site is loaded inside the
 * TigerTest mobile shell, so CSS can apply safe-area insets (see
 * globals.css), and extends the viewport meta with viewport-fit=cover so
 * the WebView draws behind the notch/home indicator. Both are shell-only:
 * on the mobile web, viewport-fit=cover lets iOS browser chrome overlap the
 * top of the page. Renders nothing.
 */
export function NativeAppShell() {
  useEffect(() => {
    if (!isNativeApp()) return;
    document.documentElement.classList.add("native-app");
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (meta && !meta.content.includes("viewport-fit")) {
      meta.content = `${meta.content}, viewport-fit=cover`;
    }
  }, []);

  return null;
}
