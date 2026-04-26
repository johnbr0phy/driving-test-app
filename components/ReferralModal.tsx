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
import { Check, Loader2, Share2, Copy, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/contexts/LanguageContext";
import { auth } from "@/lib/firebase";
import { REFERRALS_REQUIRED, useStore } from "@/store/useStore";

interface ReferralModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isGuest?: boolean;
  onSignUp?: () => void;
  onUpgrade?: () => Promise<void>;
}

// Always point share links at production so handed-off invites never break
// when a preview deploy goes away. Falls back to tigertest.io if the env
// var isn't set.
const SHARE_BASE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
  "https://tigertest.io";

function buildShareLink(code: string): string {
  return `${SHARE_BASE_URL}/?ref=${code}`;
}

export function ReferralModal({
  open,
  onOpenChange,
  isGuest = false,
  onSignUp,
  onUpgrade,
}: ReferralModalProps) {
  const { t } = useTranslation();
  const referralCode = useStore((s) => s.referralCode);
  const qualifiedReferralCount = useStore((s) => s.qualifiedReferralCount);
  const setReferralData = useStore((s) => s.setReferralData);

  const [loadingCode, setLoadingCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  useEffect(() => {
    if ("share" in navigator) {
      setCanNativeShare(true);
    }
  }, []);

  // Fetch (and lazily generate) the user's referral code when the modal opens
  useEffect(() => {
    if (!open || isGuest) return;
    if (referralCode) return;
    let cancelled = false;
    (async () => {
      setLoadingCode(true);
      try {
        const idToken = await auth.currentUser?.getIdToken();
        if (!idToken) return;
        const res = await fetch("/api/referrals/code", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setReferralData({
          referralCode: data.code,
          referralCount: data.referralCount,
          qualifiedReferralCount: data.qualifiedReferralCount,
        });
      } catch (err) {
        console.error("Failed to load referral code:", err);
      } finally {
        if (!cancelled) setLoadingCode(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, isGuest, referralCode, setReferralData]);

  const link = referralCode ? buildShareLink(referralCode) : "";
  const shareText = t("referral.shareText");
  const remaining = Math.max(0, REFERRALS_REQUIRED - (qualifiedReferralCount ?? 0));
  const filled = Math.min(REFERRALS_REQUIRED, qualifiedReferralCount ?? 0);

  const handleShare = async () => {
    if (!link) return;
    if (canNativeShare) {
      try {
        await navigator.share({ title: "TigerTest", text: shareText, url: link });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        // Fall through to copy
      }
    }
    await handleCopy();
  };

  const handleCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleUpgrade = async () => {
    if (!onUpgrade) return;
    setUpgradeLoading(true);
    try {
      await onUpgrade();
    } finally {
      setUpgradeLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 gap-0">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/tiger_face_01.png"
              alt="TigerTest"
              width={56}
              height={56}
              className="flex-shrink-0"
            />
            <DialogTitle className="text-2xl font-bold leading-tight text-gray-900">
              {t("referral.title")}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-600 pt-2">
            {t("referral.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {isGuest ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-600 text-center mb-1">
              {t("referral.signupPrompt")}
            </p>
            <Button
              onClick={onSignUp}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
            >
              {t("common.createAccount")}
            </Button>
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
            >
              {t("referral.maybeLater")}
            </button>
          </div>
        ) : (
          <>
            {/* Progress: 3 friend slots */}
            <div className="rounded-xl border border-brand-border-light bg-brand-light p-4 mb-5">
              <div className="text-xs font-bold text-brand tracking-wider mb-3">
                {t("referral.progressLabel")}
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                {Array.from({ length: REFERRALS_REQUIRED }).map((_, i) => {
                  const done = i < filled;
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        done
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-gray-200 text-gray-300"
                      }`}
                    >
                      {done ? (
                        <Check className="w-6 h-6" strokeWidth={3} />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-sm text-gray-700">
                {remaining === 0
                  ? t("referral.unlocked")
                  : remaining === 1
                    ? t("referral.oneFriendLeft")
                    : t("referral.friendsLeft").replace("{n}", String(remaining))}
              </p>
            </div>

            {/* Share + copy buttons */}
            <div className="flex flex-col gap-2 mb-3">
              <Button
                onClick={handleShare}
                disabled={loadingCode || !referralCode}
                className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
              >
                {loadingCode ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Share2 className="h-4 w-4 mr-2" />
                )}
                {canNativeShare ? t("referral.shareCta") : t("referral.copyLinkCta")}
              </Button>

              {canNativeShare && referralCode && (
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 py-2 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? t("referral.copied") : t("referral.copyLinkSecondary")}
                </button>
              )}
            </div>

            {/* Personal link preview (read-only) */}
            {referralCode && (
              <div className="mb-4 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t("referral.yourLinkLabel")}
                </div>
                <div className="text-xs text-gray-700 font-mono break-all">{link}</div>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center mb-3">
              {t("referral.qualifyNote")}
            </p>

            {/* Pay-instead escape hatch */}
            {onUpgrade && (
              <div className="border-t border-gray-100 pt-3 flex flex-col items-center">
                <button
                  onClick={handleUpgrade}
                  disabled={upgradeLoading}
                  className="text-sm text-gray-500 hover:text-brand py-1 transition-colors disabled:opacity-50"
                >
                  {upgradeLoading ? t("common.loading") : t("referral.payInstead")}
                </button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
