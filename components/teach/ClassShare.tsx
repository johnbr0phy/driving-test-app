"use client";

// Ways for a teacher to get the class link in front of students: copy the
// link, copy a ready-to-paste message for Teams or Google Classroom, and a
// QR code that opens full screen to put on the classroom board.

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, MessageSquareText, QrCode, X } from "lucide-react";
import { classLink, classUrl } from "@/lib/teachClient";

/** The message a teacher pastes for students. */
export function studentMessage(examName: string, url: string, britishSpelling: boolean): string {
  const practice = britishSpelling ? "Practise" : "Practice";
  return `${practice} for your ${examName} here: ${url}\nType your name as I know it and you're in. It's free and you don't need an account.`;
}

type Copied = "link" | "message" | null;

const button =
  "inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800";

export function ClassShare({
  code,
  className,
  examName,
  britishSpelling,
  showMessage = false,
}: {
  code: string;
  className: string;
  examName: string;
  britishSpelling: boolean;
  /** Show the message text above the buttons (on an empty class). */
  showMessage?: boolean;
}) {
  const [copied, setCopied] = useState<Copied>(null);
  const [board, setBoard] = useState(false);
  const url = classUrl(code);
  const message = studentMessage(examName, url, britishSpelling);

  const copy = async (what: Exclude<Copied, null>) => {
    try {
      await navigator.clipboard.writeText(what === "link" ? url : message);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard blocked: the link and message are on screen to copy by hand.
    }
  };

  useEffect(() => {
    if (!board) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setBoard(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [board]);

  return (
    <>
      {showMessage && (
        <p className="mb-3 whitespace-pre-line rounded-md bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100">
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => copy("message")} className={button}>
          {copied === "message" ? <Check className="w-4 h-4" aria-hidden="true" /> : <MessageSquareText className="w-4 h-4" aria-hidden="true" />}
          <span aria-live="polite">{copied === "message" ? "Copied" : "Copy message for students"}</span>
        </button>
        <button type="button" onClick={() => copy("link")} className={button}>
          {copied === "link" ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          <span aria-live="polite">{copied === "link" ? "Copied" : "Copy link"}</span>
        </button>
        <button type="button" onClick={() => setBoard(true)} className={button}>
          <QrCode className="w-4 h-4" aria-hidden="true" /> Show QR code
        </button>
      </div>

      {board && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`QR code to join ${className}`}
          onClick={() => setBoard(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 sm:gap-6 bg-white p-6 text-center"
        >
          <button
            type="button"
            onClick={() => setBoard(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-md p-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <p className="text-2xl sm:text-4xl font-bold text-gray-900">Scan to join {className}</p>
          <QRCodeSVG
            value={url}
            size={512}
            title={`QR code for ${classLink(code)}`}
            className="h-auto w-[min(70vw,50vh)] max-w-full"
          />
          <p className="font-mono text-xl sm:text-3xl text-gray-900 break-all">{classLink(code)}</p>
          <p className="text-base sm:text-lg text-gray-600">Type your name as your teacher knows it. Free, no account needed.</p>
        </div>
      )}
    </>
  );
}
