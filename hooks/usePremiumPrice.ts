"use client";

import { useEffect, useState } from "react";
import { formatPrice, USD_PRICE, type PremiumPrice } from "@/lib/pricing";
import { loadPremiumPrice } from "@/lib/localPrice";
import { isNativeApp } from "@/lib/native-app";

/**
 * Premium's price in the visitor's currency ("$9.99", "£7.99", "₹499"): the
 * US price on the server and first render, then the local one (lib/localPrice.ts).
 */
export function usePremiumPrice(): string {
  const [price, setPrice] = useState<PremiumPrice>(USD_PRICE);
  useEffect(() => {
    let live = true;
    void loadPremiumPrice().then((p) => live && setPrice(p));
    return () => {
      live = false;
    };
  }, []);
  return formatPrice(price);
}

/**
 * The price for a lock card or button, or null inside the native app, which
 * may not show a price for something it does not sell (App Store 3.1.1).
 */
export function useShownPremiumPrice(): string | null {
  const price = usePremiumPrice();
  const [native, setNative] = useState(false);
  useEffect(() => setNative(isNativeApp()), []);
  return native ? null : price;
}
