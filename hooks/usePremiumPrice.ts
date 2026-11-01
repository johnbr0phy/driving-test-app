"use client";

import { useEffect, useState } from "react";
import { formatPrice, USD_PRICE, type PremiumPrice } from "@/lib/pricing";
import { loadPremiumPrice } from "@/lib/localPrice";

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
