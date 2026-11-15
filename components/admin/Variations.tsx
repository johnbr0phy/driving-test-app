"use client";

import { useState } from "react";

// A "See the variations" arrow under each A/B test card on /admin. Its
// previews only mount once it is opened, so the live pages they load (a
// landing, a paywall, an email) cost nothing until someone looks.

export function Variations({ label = "See the variations", children }: { label?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="mt-3" onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
      <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-50">{label}</summary>
      {open && <div className="mt-3 grid gap-4 sm:grid-cols-2">{children}</div>}
    </details>
  );
}

/** One variation: a label, a line on what it is, and a live preview in a frame. */
export function VariationFrame({
  name,
  note,
  src,
  height = 560,
}: {
  name: string;
  note?: string;
  src?: string;
  height?: number;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-900 dark:text-gray-50">{name}</p>
      {note && <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">{note}</p>}
      {src ? (
        <iframe
          src={src}
          title={name}
          loading="lazy"
          className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
          style={{ height }}
        />
      ) : (
        <div
          className="mt-1 flex items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400"
          style={{ height: 120 }}
        >
          Nothing is shown or sent.
        </div>
      )}
      {src && (
        <a href={src} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-blue-700 dark:text-blue-300 underline">
          Open in a new tab
        </a>
      )}
    </div>
  );
}
