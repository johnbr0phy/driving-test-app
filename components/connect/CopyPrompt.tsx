"use client";

// A prompt a parent can copy into Claude or ChatGPT (/ai-parents), with a
// one-tap copy button so nobody has to select text on a phone.

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the prompt is still on screen to select.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
      aria-label={copied ? "Copied" : "Copy prompt"}
    >
      {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
