"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isNativeApp } from "@/lib/native-app";

/** Routes the apps leave out in v1 (see the html.native-app rules in globals.css). */
const APP_HIDDEN = ["/create", "/quizzes", "/upgrade"];

/**
 * Tags <html> with .native-app when the site is loaded inside the
 * Tigertest mobile shell, so CSS can apply safe-area insets (see
 * globals.css), and extends the viewport meta with viewport-fit=cover so
 * the WebView draws behind the notch/home indicator. Both are shell-only:
 * on the mobile web, viewport-fit=cover lets iOS browser chrome overlap the
 * top of the page. Also sends the routes the app leaves out back home.
 * Renders nothing.
 */
export function NativeAppShell() {
  const [native, setNative] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isNativeApp()) return;
    setNative(true);
    document.documentElement.classList.add("native-app");
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (meta && !meta.content.includes("viewport-fit")) {
      meta.content = `${meta.content}, viewport-fit=cover`;
    }
  }, []);

  useEffect(() => {
    if (native && pathname && APP_HIDDEN.includes(pathname)) router.replace("/");
  }, [native, pathname, router]);

  return null;
}
