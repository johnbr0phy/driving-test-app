"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Language } from "@/i18n";

// The leave-a-test question in the languages a test can run in; others read English.
const COPY: Partial<Record<Language, { leave: string; title: string; body: string; keep: string }>> = {
  en: { leave: "Leave", title: "Leave the test?", body: "Your answers so far are saved. You can finish it from your dashboard.", keep: "Keep going" },
  es: { leave: "Salir", title: "¿Salir del examen?", body: "Tus respuestas se guardan. Puedes terminarlo desde tu panel.", keep: "Seguir" },
  vi: { leave: "Rời đi", title: "Rời bài thi?", body: "Câu trả lời của bạn đã được lưu. Bạn có thể làm tiếp từ bảng điều khiển.", keep: "Tiếp tục làm" },
  ko: { leave: "나가기", title: "시험을 나가시겠어요?", body: "지금까지의 답은 저장됩니다. 대시보드에서 이어서 풀 수 있어요.", keep: "계속하기" },
  zh: { leave: "离开", title: "离开测试？", body: "你的答案已保存。可以从控制面板继续完成。", keep: "继续答题" },
};

interface FocusBarProps {
  /** Where ✕ goes (the test's dashboard). */
  exitHref: string;
  /** The test, set or quiz being worked on. */
  title: string;
  /** Where the person is: "Question 14 of 50", "31 of 50 mastered". */
  subtitle?: string;
  /** 0 to 1, drawn as a thin bar under the row. */
  progress?: number;
  /** One slot on the right: the stats link or upsell, a clock, a shuffle toggle. */
  right?: ReactNode;
  /** Ask before leaving (practice tests). Training saves every answer, so it leaves at once. */
  confirmExit?: boolean;
}

/**
 * The bar on every page where someone is answering questions (DMV, v1 exams
 * and quizzes), shaped like the v2 runners' top bar: ✕ to leave, what this is
 * and how far along, one slot on the right, a progress bar. The site header
 * is hidden on these pages (isRunnerPath in SiteHeader).
 */
export function FocusBar({ exitHref, title, subtitle, progress, right, confirmExit }: FocusBarProps) {
  const router = useRouter();
  const { language } = useTranslation();
  const copy = COPY[language] ?? COPY.en!;
  const [asking, setAsking] = useState(false);
  const exitClass =
    "-ml-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50";

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 px-3 pt-2 pb-2 sm:px-6">
        {confirmExit ? (
          <button type="button" onClick={() => setAsking(true)} className={exitClass} aria-label={copy.leave}>
            <X className="h-5 w-5" />
          </button>
        ) : (
          <Link href={exitHref} className={exitClass} aria-label={copy.leave}>
            <X className="h-5 w-5" />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-gray-900 dark:text-gray-50">{title}</div>
          {subtitle && <div className="truncate text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
        </div>
        {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : null}
      </div>
      {progress !== undefined && (
        <div className="h-1 w-full bg-gray-100 dark:bg-gray-800" aria-hidden>
          <div className="h-full bg-brand transition-all" style={{ width: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` }} />
        </div>
      )}

      {confirmExit && (
        <Dialog open={asking} onOpenChange={setAsking}>
          <DialogContent className="max-w-sm rounded-2xl sm:rounded-2xl">
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.body}</DialogDescription>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setAsking(false)} className="rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                {copy.keep}
              </button>
              <button type="button" onClick={() => router.push(exitHref)} className="rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-gray-900">
                {copy.leave}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
