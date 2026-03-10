"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

// Pages where dark mode is allowed (inner app pages with the theme toggle)
const DARK_MODE_PAGES = ["/dashboard", "/stats", "/settings", "/admin"];

export function ForceLightTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  const isDarkAllowed = DARK_MODE_PAGES.some(
    (page) => pathname === page || pathname?.startsWith(page + "/")
  );

  useEffect(() => {
    if (!isDarkAllowed) {
      // Force light on public pages by manipulating the DOM class directly.
      // We don't call setTheme() so the user's stored preference is preserved
      // for when they return to inner app pages.
      const html = document.documentElement;
      html.classList.remove("dark");
      html.style.colorScheme = "light";

      return () => {
        // When navigating to an inner page, let next-themes take over again
        // by re-applying the stored theme
        if (resolvedTheme === "dark") {
          html.classList.add("dark");
          html.style.colorScheme = "dark";
        }
      };
    }
  }, [isDarkAllowed, resolvedTheme]);

  return null;
}
