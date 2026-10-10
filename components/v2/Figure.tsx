"use client";

import { useState } from "react";
import { Figure as FigureT } from "@/lib/v2/types";

/** Question figure: inline, tap to open full-width (phones) with pinch zoom. */
export function Figure({ figure, compact = false }: { figure: FigureT; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full rounded-lg border border-gray-200 bg-white p-2 text-left ${compact ? "max-w-xs" : "max-w-md"}`}
        aria-label="Open figure full size"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={figure.src} alt={figure.alt} className="mx-auto h-auto w-full max-h-72 object-contain" loading="lazy" />
        <div className="mt-1 text-center text-[11px] text-gray-400">Tap to enlarge</div>
      </button>
      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-black/90" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <div className="flex justify-end p-3 v2-safe-top">
            <button type="button" className="v2-tap rounded-full bg-white/15 px-4 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center overflow-auto p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={figure.src} alt={figure.alt} className="max-h-full w-full max-w-3xl rounded bg-white object-contain" />
          </div>
          <p className="px-5 pb-6 text-center text-xs text-gray-300 v2-safe-bottom">{figure.alt}</p>
        </div>
      )}
    </>
  );
}
