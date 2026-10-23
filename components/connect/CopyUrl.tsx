"use client";

// The connector URL on /connect with a one-tap copy button, so nobody has to
// select a long URL on a phone.

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the URL is still visible and selectable.
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1.5 pl-4 max-w-full">
      <code className="min-w-0 flex-1 break-all sm:truncate text-sm text-gray-900 dark:text-gray-50 select-all">{url}</code>
      <button
        type="button"
        onClick={copy}
        className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-3 py-1.5 text-sm font-medium"
        aria-label={copied ? "Copied" : "Copy server URL"}
      >
        {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
