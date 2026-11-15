"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import { useSound } from "@/hooks/useSound";
import { recordClassAnswer } from "@/lib/classProgress";
import type { LandingTryQuestion as TryQuestion } from "@/lib/landingTryQuestion";
import type { Language } from "@/i18n";
import type { Question } from "@/types";

// The playable question in a landing hero (lib/landingTryQuestion.ts). The
// answer is a real training answer: it starts a guest session like the
// Start button, is recorded in set 1 (which also counts the funnel's first
// answer), and "Keep going" carries on in that set.

const LETTERS = ["A", "B", "C", "D"] as const;

const COPY: Partial<Record<Language, { label: string; right: string; wrong: string; next: string; saved: string }>> = {
  en: { label: "Try one now", right: "Correct!", wrong: "Not quite.", next: "Keep going", saved: "Counted in your first practice set." },
  es: { label: "Prueba una ahora", right: "¡Correcto!", wrong: "No exactamente.", next: "Seguir", saved: "Cuenta en tu primer set de práctica." },
  vi: { label: "Thử một câu ngay", right: "Chính xác!", wrong: "Chưa đúng.", next: "Tiếp tục", saved: "Đã tính vào bộ luyện tập đầu tiên của bạn." },
  ko: { label: "지금 한 문제 풀어 보기", right: "정답입니다!", wrong: "아쉽네요.", next: "계속하기", saved: "첫 번째 연습 세트에 기록됐어요." },
  zh: { label: "现在试一题", right: "答对了！", wrong: "不太对。", next: "继续", saved: "已计入你的第一组练习。" },
  de: { label: "Probier eine Frage", right: "Richtig!", wrong: "Nicht ganz.", next: "Weiter üben", saved: "Zählt in deinem ersten Übungsset." },
  fr: { label: "Essayez une question", right: "Correct !", wrong: "Pas tout à fait.", next: "Continuer", saved: "Comptée dans votre première série." },
  it: { label: "Prova una domanda", right: "Corretto!", wrong: "Non proprio.", next: "Continua", saved: "Conta nella tua prima serie di esercizi." },
  pl: { label: "Spróbuj jednego pytania", right: "Dobrze!", wrong: "Nie do końca.", next: "Dalej", saved: "Liczy się w twoim pierwszym zestawie." },
  nl: { label: "Probeer er een", right: "Goed!", wrong: "Niet helemaal.", next: "Verder oefenen", saved: "Telt mee in je eerste oefenset." },
  pt: { label: "Experimente uma", right: "Correto!", wrong: "Não exatamente.", next: "Continuar", saved: "Conta no seu primeiro conjunto de treino." },
  sv: { label: "Testa en fråga", right: "Rätt!", wrong: "Inte riktigt.", next: "Fortsätt", saved: "Räknas i ditt första övningsset." },
  da: { label: "Prøv et spørgsmål", right: "Rigtigt!", wrong: "Ikke helt.", next: "Fortsæt", saved: "Tæller med i dit første øvesæt." },
  fi: { label: "Kokeile yhtä kysymystä", right: "Oikein!", wrong: "Ei aivan.", next: "Jatka", saved: "Lasketaan ensimmäiseen harjoitussarjaasi." },
  hu: { label: "Próbálj ki egyet", right: "Helyes!", wrong: "Nem egészen.", next: "Tovább", saved: "Beszámít az első gyakorlósoroddba." },
  ro: { label: "Încearcă o întrebare", right: "Corect!", wrong: "Nu chiar.", next: "Continuă", saved: "Se numără în primul tău set de exersare." },
  el: { label: "Δοκίμασε μία ερώτηση", right: "Σωστά!", wrong: "Όχι ακριβώς.", next: "Συνέχισε", saved: "Μετράει στο πρώτο σου σετ εξάσκησης." },
};

export function LandingTryQuestion({ q, lang, onAnswer }: { q: TryQuestion; lang?: Language; onAnswer?: () => void }) {
  const { user, loading } = useAuth();
  const { setLanguage } = useTranslation();
  const isGuest = useStore((s) => s.isGuest);
  const startGuestSession = useStore((s) => s.startGuestSession);
  const answerTrainingSetQuestion = useStore((s) => s.answerTrainingSetQuestion);
  const { playCorrectSound, playIncorrectSound } = useSound();
  const [picked, setPicked] = useState<number | null>(null);
  const copy = COPY[lang ?? "en"] ?? COPY.en!;
  const answered = picked !== null;
  const correct = picked === q.correctIndex;
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Bring the explanation and Keep going into view without a jump.
  useEffect(() => {
    if (!answered) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    feedbackRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }, [answered]);

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    const ok = i === q.correctIndex;
    if (ok) playCorrectSound();
    else playIncorrectSound();
    // Lets the hero hold its Start button text, so nothing above the card moves.
    onAnswer?.();
    if (!loading && !user && !isGuest) startGuestSession();
    answerTrainingSetQuestion(q.setId, q.questionId, ok);
    recordClassAnswer(q.examId, { questionId: q.questionId, category: q.category as Question["category"], optionOrder: q.optionOrder }, ok, LETTERS[i]);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-xl text-left rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">{copy.label}</p>
      <p className="mt-2 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-50">{q.stem}</p>
      <div className="mt-4 grid gap-2">
        {q.options.map((text, i) => {
          const isKey = i === q.correctIndex;
          const state = !answered ? "idle" : isKey ? "right" : i === picked ? "wrong" : "dim";
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              aria-pressed={picked === i}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm sm:text-base transition-colors ${
                state === "idle"
                  ? "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  : state === "right"
                    ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
                    : state === "wrong"
                      ? "border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100"
                      : "border-gray-200 dark:border-gray-800 text-gray-400"
              }`}
            >
              <span className="font-semibold">{LETTERS[i]}</span>
              <span className="flex-1">{text}</span>
              {state === "right" && <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" aria-hidden />}
              {state === "wrong" && <X className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div ref={feedbackRef} className="mt-4 scroll-mb-6" aria-live="polite">
          <p className={`font-semibold ${correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
            {correct ? copy.right : copy.wrong}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{q.explanation}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={q.practiceHref}
              // Switching language refreshes the page, so it waits for this tap.
              onClick={() => lang && setLanguage(lang)}
              className="inline-flex items-center rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-base font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              {copy.next}
            </Link>
            <span className="text-xs text-gray-500 dark:text-gray-400">{copy.saved}</span>
          </div>
        </div>
      )}
    </div>
  );
}
