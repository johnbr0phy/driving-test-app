"use client";

// Ways for a teacher to get the class link in front of students: copy the
// link, copy a ready-to-paste message for Teams or Google Classroom, and a
// QR code that opens full screen to put on the classroom board.

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, MessageSquareText, QrCode, X } from "lucide-react";
import { classLink, classUrl } from "@/lib/teachClient";
import { useTeachCopy } from "@/components/teach/useTeachCopy";

type Copied = "link" | "message" | null;

const button =
  "inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800";

export function ClassShare({
  code,
  className,
  examName,
  showMessage = false,
}: {
  code: string;
  className: string;
  examName: string;
  /** Show the message text above the buttons (on an empty class). */
  showMessage?: boolean;
}) {
  const c = useTeachCopy();
  const [copied, setCopied] = useState<Copied>(null);
  const [board, setBoard] = useState(false);
  const url = classUrl(code);
  const message = c.studentMessage(examName, url);

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
          <span aria-live="polite">{copied === "message" ? c.copied : c.copyMessage}</span>
        </button>
        <button type="button" onClick={() => copy("link")} className={button}>
          {copied === "link" ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          <span aria-live="polite">{copied === "link" ? c.copied : c.copyLink}</span>
        </button>
        <button type="button" onClick={() => setBoard(true)} className={button}>
          <QrCode className="w-4 h-4" aria-hidden="true" /> {c.showQr}
        </button>
      </div>

      {board && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.qrDialogAria(className)}
          onClick={() => setBoard(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 sm:gap-6 bg-white p-6 text-center"
        >
          <button
            type="button"
            onClick={() => setBoard(false)}
            aria-label={c.close}
            className="absolute right-4 top-4 rounded-md p-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <p className="text-2xl sm:text-4xl font-bold text-gray-900">{c.scanToJoin(className)}</p>
          <QRCodeSVG
            value={url}
            size={512}
            title={c.qrTitle(classLink(code))}
            className="h-auto w-[min(70vw,50vh)] max-w-full"
          />
          <p className="font-mono text-xl sm:text-3xl text-gray-900 break-all">{classLink(code)}</p>
          <p className="text-base sm:text-lg text-gray-600">{c.qrNote}</p>
        </div>
      )}
    </>
  );
}
