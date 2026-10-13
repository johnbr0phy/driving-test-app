"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { isInternalBrowser } from "@/lib/internal";

interface ShareButtonProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  testId?: number;
  setId?: number;
  stateCode: string;
  className?: string;
}

export function ShareButton({
  score,
  totalQuestions,
  percentage,
  passed,
  testId,
  setId,
  stateCode,
  className,
}: ShareButtonProps) {
  const { t, language } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    // Check if the browser can actually share files (not just text/URLs).
    // Desktop browsers expose navigator.share but usually can't share files,
    // so we test with a dummy file to get an accurate label.
    try {
      if ("share" in navigator && "canShare" in navigator) {
        const testFile = new File([], "test.png", { type: "image/png" });
        setCanNativeShare(navigator.canShare({ files: [testFile] }));
      }
    } catch {
      setCanNativeShare(false);
    }
  }, []);

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tigertest-score.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        score: score.toString(),
        total: totalQuestions.toString(),
        state: stateCode,
        lang: language,
      });
      if (testId) params.set("testId", testId.toString());
      if (setId) params.set("setId", setId.toString());

      const res = await fetch(`/api/og/score-card?${params}`);
      if (!res.ok) throw new Error("Failed to generate image");

      const blob = await res.blob();
      const file = new File([blob], "tigertest-score.png", { type: "image/png" });

      if (canNativeShare) {
        try {
          await navigator.share({ files: [file] });
        } catch (shareErr: unknown) {
          if (shareErr instanceof Error && shareErr.name === "AbortError") return;
          // Native share failed (e.g. activation expired) — fall back to download
          downloadBlob(blob);
        }
      } else {
        downloadBlob(blob);
      }

      // Track share click (fire and forget)
      if (!isInternalBrowser()) fetch("/api/analytics/share", { method: "POST" }).catch(() => {});
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(t("results.shareError"));
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const label = canNativeShare ? t("results.share") : t("results.downloadToShare");

  return (
    <div className="relative">
      <Button
        className={className || "bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex-1 sm:flex-initial"}
        onClick={handleShare}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {t("results.sharing")}
          </>
        ) : label}
      </Button>
      {error && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md px-3 py-1">
          {error}
        </div>
      )}
    </div>
  );
}
