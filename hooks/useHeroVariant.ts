"use client";

import { useEffect, useState } from "react";
import { HERO_VARIANTS } from "@/lib/heroCopy";

/**
 * Which hero line to show on this visit, so it changes on each refresh.
 * Picked after mount: a random pick during render differs between the server
 * HTML and the first client render, which breaks hydration.
 */
export function useHeroVariant(): number {
  const [variant, setVariant] = useState(0);
  useEffect(() => setVariant(Math.floor(Math.random() * HERO_VARIANTS)), []);
  return variant;
}
