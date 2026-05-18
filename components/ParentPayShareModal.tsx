"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { MessageSquare, Mail, Link2, Check } from "lucide-react";

interface ParentPayShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ParentPayRequestResponse {
  token: string;
  url: string;
  smsBody: string;
  emailSubject: string;
  emailBody: string;
  expiresAt: string;
}

export function ParentPayShareModal({ open, onOpenChange }: ParentPayShareModalProps) {
  const [data, setData] = useState<ParentPayRequestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setData(null);
      setError(null);
      setCopied(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const idToken = await auth.currentUser?.getIdToken();
        if (!idToken) {
          setError("Please sign in first.");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/parent-pay/request", {
          method: "POST",
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setError(json.error || "Could not create link. Try again.");
        } else {
          setData(json as ParentPayRequestResponse);
        }
      } catch {
        if (!cancelled) setError("Network error. Try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const smsHref = data ? `sms:?&body=${encodeURIComponent(data.smsBody)}` : "#";
  const mailtoHref = data
    ? `mailto:?subject=${encodeURIComponent(data.emailSubject)}&body=${encodeURIComponent(
        data.emailBody,
      )}`
    : "#";

  async function copyLink() {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Could not copy link.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 gap-0">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Make your parents pay
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Send them a link. They tap it, pay $9.99, you&apos;re unlocked.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500">Generating link…</div>
        ) : error ? (
          <div className="py-6 text-center">
            <div className="text-sm text-red-600 mb-3">{error}</div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-3">
            <a
              href={smsHref}
              className="flex items-center gap-3 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-5 rounded-2xl transition-colors"
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-base">Text it</div>
                <div className="text-xs opacity-90">Opens your messages app</div>
              </div>
            </a>

            <a
              href={mailtoHref}
              className="flex items-center gap-3 w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-5 rounded-2xl transition-colors"
            >
              <Mail className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-base">Email it</div>
                <div className="text-xs opacity-90">Opens your mail app</div>
              </div>
            </a>

            <button
              onClick={copyLink}
              className="flex items-center gap-3 w-full border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold py-4 px-5 rounded-2xl transition-colors"
            >
              {copied ? (
                <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
              ) : (
                <Link2 className="h-5 w-5 flex-shrink-0" />
              )}
              <div className="flex-1 text-left">
                <div className="text-base">
                  {copied ? "Link copied" : "Copy link"}
                </div>
                <div className="text-xs text-gray-500">
                  Paste anywhere — Snap, WhatsApp, wherever
                </div>
              </div>
            </button>

            <div className="mt-2 text-center text-xs text-gray-400">
              Link is good for 14 days
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
