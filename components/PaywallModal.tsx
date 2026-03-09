"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, CalendarDays, Mail, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { en, es } from "@/i18n";
import Image from "next/image";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: "training_set_4" | "practice_test_4" | "full_stats";
  onUpgrade: () => Promise<void>;
  isGuest?: boolean;
  onSignUp?: () => void;
}

type ModalView = "paywall" | "exit_capture" | "capture_thanks";

export function PaywallModal({
  open,
  onOpenChange,
  feature,
  onUpgrade,
  isGuest = false,
  onSignUp,
}: PaywallModalProps) {
  const { t, language } = useTranslation();
  const dict = language === "es" ? es : en;
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<ModalView>("paywall");
  const [email, setEmail] = useState("");
  const [testDate, setTestDate] = useState("");
  const [captureName, setCaptureName] = useState("");
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureError, setCaptureError] = useState("");

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await onUpgrade();
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    // Instead of closing, show the exit-capture screen
    setView("exit_capture");
  };

  const handleSkipCapture = () => {
    setView("paywall");
    onOpenChange(false);
  };

  const handleCaptureSubmit = async () => {
    if (!email || !email.includes("@")) {
      setCaptureError("Please enter a valid email address.");
      return;
    }
    setCaptureError("");
    setCaptureLoading(true);
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, testDate, name: captureName }),
      });
      setView("capture_thanks");
    } catch {
      setCaptureError("Something went wrong. Please try again.");
    } finally {
      setCaptureLoading(false);
    }
  };

  // Reset view when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setView("paywall");
      setEmail("");
      setTestDate("");
      setCaptureName("");
      setCaptureError("");
    }
    onOpenChange(open);
  };

  // Get tomorrow's date as min for date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-6 gap-0">

        {/* ─── VIEW: MAIN PAYWALL ─── */}
        {view === "paywall" && (
          <>
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
                  {t("paywall.studySmart")}
                  <br />
                  {t("paywall.passFirstTime")}
                </DialogTitle>
              </div>
              <DialogDescription className="sr-only">
                {t("paywall.unlockPremiumContent")}
              </DialogDescription>
            </DialogHeader>

            {/* What you get */}
            <div className="rounded-xl border border-brand-border-light overflow-hidden mb-5 bg-brand-light">
              <div className="p-4 pb-3">
                <div className="text-xs font-bold text-brand tracking-wider mb-3">
                  {t("paywall.whatYouGet")}
                </div>
                <ul className="space-y-2.5">
                  {dict.paywall.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2.5 text-sm text-gray-800">
                      <CheckCircle className="h-5 w-5 text-green-600 fill-green-100 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="border border-brand text-brand text-xs font-semibold px-3 py-1 rounded-full">
                  {t("paywall.cheaperThanRetest")}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{t("paywall.oneTimePayment")}</div>
            </div>

            {/* CTA */}
            {isGuest ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-gray-600 text-center mb-1">
                  {t("paywall.createFreeAccountPrompt")}
                </p>
                <Button
                  onClick={onSignUp}
                  className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
                >
                  {t("common.createAccount")}
                </Button>
                <button
                  onClick={handleDismiss}
                  className="text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
                >
                  {t("paywall.illTakeMyChances")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
                >
                  {loading ? t("common.loading") : t("paywall.getPremium")}
                </Button>
                <button
                  onClick={handleDismiss}
                  disabled={loading}
                  className="text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors disabled:opacity-50"
                >
                  {t("paywall.illTakeMyChances")}
                </button>
              </div>
            )}

            {/* Social proof */}
            <div className="flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-gray-100">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500">{t("paywall.socialProof")}</span>
            </div>
          </>
        )}

        {/* ─── VIEW: EXIT CAPTURE ─── */}
        {view === "exit_capture" && (
          <>
            <DialogHeader className="pb-2">
              <DialogTitle className="sr-only">Remind me before my test</DialogTitle>
              <DialogDescription className="sr-only">Enter your email to get a reminder</DialogDescription>
            </DialogHeader>

            <div className="text-center mb-5">
              <div className="text-4xl mb-3">🐯</div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">No worries — we&apos;ll remind you</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Enter your test date and we&apos;ll send you a heads-up a few days before. No spam, just one useful email.
              </p>
            </div>

            <div className="space-y-3 mb-4">
              {/* Email field */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>

              {/* Test date field */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Your test date <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  min={tomorrowStr}
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>

              {/* Name field */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  First name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Alex"
                  value={captureName}
                  onChange={(e) => setCaptureName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>

              {captureError && (
                <p className="text-xs text-red-500">{captureError}</p>
              )}
            </div>

            <Button
              onClick={handleCaptureSubmit}
              disabled={captureLoading}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full mb-2"
            >
              {captureLoading ? "Saving..." : "Remind me before my test"}
            </Button>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setView("paywall")}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 py-2 transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </button>
              <button
                onClick={handleSkipCapture}
                className="text-xs text-gray-400 hover:text-gray-600 py-2 transition-colors"
              >
                No thanks, just close
              </button>
            </div>
          </>
        )}

        {/* ─── VIEW: THANKS ─── */}
        {view === "capture_thanks" && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {testDate
                ? `We'll send you a reminder before your test on ${new Date(testDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}. Good luck! 🐯`
                : "We'll send you a helpful study reminder. Good luck! 🐯"}
            </p>
            <div className="rounded-xl bg-brand-light border border-brand-border-light p-4 mb-5 text-left">
              <p className="text-xs font-bold text-brand tracking-wider mb-2">MEANWHILE</p>
              <p className="text-sm text-gray-700">
                Keep practising — students who do 3+ practice tests pass at a <strong>92% rate</strong>. Your free tests are still available.
              </p>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-5 text-base rounded-full"
            >
              Back to studying
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
