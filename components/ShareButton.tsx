"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, Download, Link2, Loader2, Share2 } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { isInternalBrowser } from "@/lib/internal";
import { getExamByStateCode } from "@/lib/exams";
import { states } from "@/data/states";

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

const FILE_NAME = "tigertest-score.png";

// Where a friend lands: the exam's own landing page, so the link is worth
// tapping on its own even when the image doesn't come through.
function landingPathFor(stateCode: string): { path: string; label: string } {
  const exam = getExamByStateCode(stateCode);
  if (exam) return { path: exam.landingPath ?? exam.slug, label: exam.examLabel };
  const state = states.find((s) => s.code === stateCode.toUpperCase());
  if (state) return { path: `/${state.slug}-dmv-practice-test`, label: `${state.name} DMV` };
  return { path: "/dmv-practice-test", label: "DMV" };
}

export function ShareButton({
  score,
  totalQuestions,
  percentage,
  testId,
  setId,
  stateCode,
  className,
}: ShareButtonProps) {
  const { t, language } = useTranslation();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    try {
      setCanShare("share" in navigator);
      if ("canShare" in navigator) {
        const testFile = new File([], "test.png", { type: "image/png" });
        setCanShareFiles(navigator.canShare({ files: [testFile] }));
      }
    } catch {
      setCanShareFiles(false);
    }
  }, []);

  const params = new URLSearchParams({
    score: score.toString(),
    total: totalQuestions.toString(),
    state: stateCode,
    lang: language,
  });
  if (testId) params.set("testId", testId.toString());
  if (setId) params.set("setId", setId.toString());
  const imageUrl = `/api/og/score-card?${params}`;

  // Render the card as soon as the sheet opens, so Share is instant and
  // navigator.share still runs inside the tap that asked for it.
  useEffect(() => {
    if (!open || file) return;
    let cancelled = false;
    setFailed(false);
    fetch(imageUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to generate image");
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        setFile(new File([blob], FILE_NAME, { type: "image/png" }));
        setPreviewUrl(URL.createObjectURL(blob));
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [open, file, imageUrl]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const { path, label: examLabel } = landingPathFor(stateCode);
  const link = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
  const message = (setId ? t("results.shareTextTraining") : t("results.shareTextTest"))
    .replace("{{pct}}", String(percentage))
    .replace("{{exam}}", examLabel);

  const track = () => {
    if (tracked.current || isInternalBrowser()) return;
    tracked.current = true;
    fetch("/api/analytics/share", { method: "POST" }).catch(() => {});
  };

  const nativeShare = async () => {
    const withFile = file && canShareFiles && navigator.canShare({ files: [file] });
    try {
      await navigator.share(
        withFile ? { files: [file], text: `${message} ${link}` } : { text: message, url: link },
      );
      track();
      setOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      // Some targets refuse files with text; try the link alone.
      try {
        await navigator.share({ text: message, url: link });
        track();
        setOpen(false);
      } catch {
        /* user closed it, or nothing to do */
      }
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${message} ${link}`);
      setCopied(true);
      track();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const saveImage = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = FILE_NAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    track();
  };

  const secondary =
    "h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold";

  return (
    <>
      <Button
        className={className || "bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex-1 sm:flex-initial"}
        onClick={() => setOpen(true)}
      >
        <Share2 className="h-4 w-4 mr-2" />
        {t("results.share")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm p-5 gap-4 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <div className="text-center pr-6 pl-6">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
              {t("results.shareSheetTitle")}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("results.shareSheetSub")}
            </DialogDescription>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt={message} className="h-full w-full object-cover" />
            ) : failed ? (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-600 dark:text-gray-300">
                {t("results.shareError")}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {canShare && (
              <Button
                onClick={nativeShare}
                disabled={!file && !failed}
                className="h-12 bg-green-600 text-white hover:bg-green-700 font-bold text-base"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {t("results.share")}
              </Button>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={copyLink} className={secondary}>
                {copied ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Link2 className="h-4 w-4 mr-2" />}
                {copied ? t("results.linkCopied") : t("results.copyLink")}
              </Button>
              <Button variant="outline" onClick={saveImage} disabled={!previewUrl} className={secondary}>
                <Download className="h-4 w-4 mr-2" />
                {t("results.saveImage")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
