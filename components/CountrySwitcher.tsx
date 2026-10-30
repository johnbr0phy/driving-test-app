"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FLAGS, readRegionCookie, saveRegion } from "@/components/CountryPills";
import { REGIONS, Region, regionHomePath, regionInfo } from "@/lib/region";
import { useStore } from "@/store/useStore";

/**
 * The footer's country control, like the "United States" link at the bottom
 * of most international sites: shows the saved country and opens a short list.
 * Picking one saves it (same as the homepage pills) and goes to that
 * country's homepage, a full load because middleware reads the cookie.
 */
export function CountrySwitcher() {
  const storeRegion = useStore((st) => st.region);
  const [region, setRegion] = useState<Region>("US");
  const [open, setOpen] = useState(false);
  useEffect(() => setRegion(readRegionCookie() ?? storeRegion ?? "US"), [storeRegion]);

  const pick = (r: Region) => {
    setOpen(false);
    saveRegion(r);
    setRegion(r);
    window.location.assign(regionHomePath(r));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Change country, currently ${regionInfo(region).name}`}
        className="flex items-center gap-1.5 whitespace-nowrap hover:text-brand"
      >
        <span aria-hidden="true" className="text-base leading-none">{FLAGS[region]}</span>
        <span className="sm:hidden">{regionInfo(region).short}</span>
        <span className="hidden sm:inline">{regionInfo(region).name}</span>
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="w-52 p-1">
        <p className="px-2 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Show tests for</p>
        <ul>
          {REGIONS.map((r) => {
            const on = r.code === region;
            return (
              <li key={r.code}>
                <button
                  type="button"
                  onClick={() => pick(r.code)}
                  aria-current={on ? "true" : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    on ? "font-semibold text-gray-900 dark:text-gray-50" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span aria-hidden="true" className="text-base leading-none">{FLAGS[r.code]}</span>
                  <span className="flex-1">{r.name}</span>
                  {on && <Check className="h-4 w-4 text-brand-dark" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="px-2 pb-1.5 pt-1 text-[11px] text-gray-500 dark:text-gray-400">Your progress is the same in every country.</p>
      </PopoverContent>
    </Popover>
  );
}
