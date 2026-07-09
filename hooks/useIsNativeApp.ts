"use client";

import { useState, useEffect } from "react";
import { isNativeApp } from "@/lib/native-app";

/**
 * SSR-safe hook: false on the server and first client render, then true
 * when running inside the TigerTest native app shell.
 */
export function useIsNativeApp(): boolean {
  const [native, setNative] = useState(false);

  useEffect(() => {
    setNative(isNativeApp());
  }, []);

  return native;
}
