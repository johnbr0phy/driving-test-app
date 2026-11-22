"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Check, ChevronDown, MousePointerClick, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import { useV2Store } from "@/store/useV2Store";
import { useSound } from "@/hooks/useSound";
import { recordClassAnswer, recordClassAnswerById } from "@/lib/classProgress";
import type { LandingTryQuestion as TryQuestion } from "@/lib/landingTryQuestion";
import type { Language } from "@/i18n";
import type { Question } from "@/types";

// The playable question in a landing hero (lib/landingTryQuestion.ts). The
// answer is a real training answer: it starts a guest session like the
// Start button, is recorded in set 1 (which also counts the funnel's first
// answer), and "Keep going" carries on in that set. On a v2 exam the answer
// goes to its first drill instead, and "Keep going" opens that drill.

const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

/** Rich text drawn on the server (ExamLandingHero) for a question with markup. */
export type TryRichNodes = { stem: ReactNode; options: ReactNode[]; explanation: ReactNode; passage?: ReactNode };

const COPY: Partial<Record<Language, { label: string; hint: string; right: string; wrong: string; next: string; saved: string; more: string }>> = {
  en: { label: "Try one now", hint: "Pick an answer", right: "Correct!", wrong: "Not quite.", next: "Keep going", saved: "Counted in your first practice set.", more: "Scroll for the full passage" },
  es: { label: "Prueba una ahora", hint: "Elige una respuesta", right: "¡Correcto!", wrong: "No exactamente.", next: "Seguir", saved: "Cuenta en tu primer set de práctica.", more: "Desliza para ver todo el texto" },
  vi: { label: "Thử một câu ngay", hint: "Chọn một đáp án", right: "Chính xác!", wrong: "Chưa đúng.", next: "Tiếp tục", saved: "Đã tính vào bộ luyện tập đầu tiên của bạn.", more: "Cuộn để đọc hết đoạn văn" },
  ko: { label: "지금 한 문제 풀어 보기", hint: "답을 하나 고르세요", right: "정답입니다!", wrong: "아쉽네요.", next: "계속하기", saved: "첫 번째 연습 세트에 기록됐어요.", more: "스크롤해서 지문 전체를 읽으세요" },
  zh: { label: "现在试一题", hint: "选一个答案", right: "答对了！", wrong: "不太对。", next: "继续", saved: "已计入你的第一组练习。", more: "滚动阅读全文" },
  de: { label: "Probier eine Frage", hint: "Wähle eine Antwort", right: "Richtig!", wrong: "Nicht ganz.", next: "Weiter üben", saved: "Zählt in deinem ersten Übungsset.", more: "Scrollen für den ganzen Text" },
  fr: { label: "Essayez une question", hint: "Choisissez une réponse", right: "Correct !", wrong: "Pas tout à fait.", next: "Continuer", saved: "Comptée dans votre première série.", more: "Faites défiler pour lire tout le texte" },
  it: { label: "Prova una domanda", hint: "Scegli una risposta", right: "Corretto!", wrong: "Non proprio.", next: "Continua", saved: "Conta nella tua prima serie di esercizi.", more: "Scorri per leggere tutto il testo" },
  pl: { label: "Spróbuj jednego pytania", hint: "Wybierz odpowiedź", right: "Dobrze!", wrong: "Nie do końca.", next: "Dalej", saved: "Liczy się w twoim pierwszym zestawie.", more: "Przewiń, aby przeczytać cały tekst" },
  nl: { label: "Probeer er een", hint: "Kies een antwoord", right: "Goed!", wrong: "Niet helemaal.", next: "Verder oefenen", saved: "Telt mee in je eerste oefenset.", more: "Scroll voor de hele tekst" },
  pt: { label: "Experimente uma", hint: "Escolha uma resposta", right: "Correto!", wrong: "Não exatamente.", next: "Continuar", saved: "Conta no seu primeiro conjunto de treino.", more: "Role para ler o texto completo" },
  sv: { label: "Testa en fråga", hint: "Välj ett svar", right: "Rätt!", wrong: "Inte riktigt.", next: "Fortsätt", saved: "Räknas i ditt första övningsset.", more: "Scrolla för hela texten" },
  da: { label: "Prøv et spørgsmål", hint: "Vælg et svar", right: "Rigtigt!", wrong: "Ikke helt.", next: "Fortsæt", saved: "Tæller med i dit første øvesæt.", more: "Rul for at læse hele teksten" },
  fi: { label: "Kokeile yhtä kysymystä", hint: "Valitse vastaus", right: "Oikein!", wrong: "Ei aivan.", next: "Jatka", saved: "Lasketaan ensimmäiseen harjoitussarjaasi.", more: "Vieritä lukeaksesi koko tekstin" },
  hu: { label: "Próbálj ki egyet", hint: "Válassz egy választ", right: "Helyes!", wrong: "Nem egészen.", next: "Tovább", saved: "Beszámít az első gyakorlósoroddba.", more: "Görgess a teljes szövegért" },
  ro: { label: "Încearcă o întrebare", hint: "Alege un răspuns", right: "Corect!", wrong: "Nu chiar.", next: "Continuă", saved: "Se numără în primul tău set de exersare.", more: "Derulează pentru tot textul" },
  el: { label: "Δοκίμασε μία ερώτηση", hint: "Διάλεξε μια απάντηση", right: "Σωστά!", wrong: "Όχι ακριβώς.", next: "Συνέχισε", saved: "Μετράει στο πρώτο σου σετ εξάσκησης.", more: "Κύλησε για όλο το κείμενο" },
};

/** Time to read the title before the card asks for attention. */
const NUDGE_DELAY_MS = 2500;

export function LandingTryQuestion({ q, rich, lang, onAnswer }: { q: TryQuestion; rich?: TryRichNodes; lang?: Language; onAnswer?: () => void }) {
  const { user, loading } = useAuth();
  const { setLanguage } = useTranslation();
  const isGuest = useStore((s) => s.isGuest);
  const startGuestSession = useStore((s) => s.startGuestSession);
  const answerTrainingSetQuestion = useStore((s) => s.answerTrainingSetQuestion);
  const answerDrill = useV2Store((s) => s.answerDrill);
  const { playCorrectSound, playIncorrectSound } = useSound();
  const [picked, setPicked] = useState<number | null>(null);
  const copy = COPY[lang ?? "en"] ?? COPY.en!;
  const answered = picked !== null;
  const correct = picked === q.correctIndex;
  const feedbackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Draws the eye to the card so it reads as something to tap, not a
  // screenshot (globals.css, off under reduced motion, nothing moves the
  // layout). Arm a of the layout test (lib/landingTryTest.ts) pulses the
  // letters as soon as the card is on screen (try-seen); arm b waits until
  // the visitor has had time to read the title, then the label glows and
  // the letters pulse (try-play).
  const [inView, setInView] = useState(false);
  const [nudge, setNudge] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setNudge(true), NUDGE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [inView]);
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A long passage scrolls inside its box, and iOS hides the scrollbar, so a
  // clipped passage looked like the end of the text. While more text sits
  // below, a fade and a "scroll" pill show there is more; both go once the
  // reader reaches the end.
  const passageRef = useRef<HTMLDivElement>(null);
  const [passageMore, setPassageMore] = useState(false);
  const checkPassage = () => {
    const el = passageRef.current;
    if (el) setPassageMore(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  };
  useEffect(() => {
    const el = passageRef.current;
    if (!el) return;
    checkPassage();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(checkPassage);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scrollPassage = () => {
    const el = passageRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ top: el.clientHeight * 0.75, behavior: reduce ? "auto" : "smooth" });
  };

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
    if (q.v2) {
      answerDrill(q.v2.drillKey, q.questionId, ok);
      recordClassAnswerById(q.examId, q.questionId, q.v2.domain, ok, q.v2.order[i]);
      return;
    }
    if (!loading && !user && !isGuest) startGuestSession();
    answerTrainingSetQuestion(q.setId, q.questionId, ok);
    recordClassAnswer(q.examId, { questionId: q.questionId, category: q.category as Question["category"], optionOrder: q.optionOrder }, ok, LETTERS[i]);
  };

  return (
    <div ref={cardRef} className={`${inView && !answered ? "try-seen " : ""}${nudge && !answered ? "try-play " : ""}try-card mx-auto mt-10 w-full max-w-xl text-left rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg dark:shadow-black/40 dark:ring-1 dark:ring-white/5 p-5 sm:p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="try-label -mx-1.5 rounded-md px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand">{copy.label}</p>
        {!answered && (
          <p className="try-hint inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-100">
            <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
            {copy.hint}
          </p>
        )}
      </div>
      {rich?.passage && (
        <div className="relative mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
          <div ref={passageRef} onScroll={checkPassage} className="max-h-64 overflow-y-auto p-4 text-sm text-gray-700 dark:text-gray-200">
            {rich.passage}
          </div>
          {passageMore && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-16 items-end justify-center bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pb-2 dark:from-gray-900 dark:via-gray-900/90">
              <button
                type="button"
                onClick={scrollPassage}
                className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-100 shadow-sm"
              >
                {copy.more}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          )}
        </div>
      )}
      {rich ? (
        <div className="mt-2 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-50">{rich.stem}</div>
      ) : (
        <p className="mt-2 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-50">{q.stem}</p>
      )}
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
              style={{ "--i": i } as CSSProperties}
              className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm sm:text-base transition ${
                state === "idle"
                  ? "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900/60 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-brand dark:hover:border-brand-dark focus-visible:border-brand dark:focus-visible:border-brand-dark active:translate-y-0"
                  : state === "right"
                    ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
                    : state === "wrong"
                      ? "border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100"
                      : "border-gray-200 dark:border-gray-700 text-gray-400"
              }`}
            >
              <span
                className={`try-badge flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  state === "idle"
                    ? "border-brand dark:border-brand-dark text-brand group-hover:bg-brand group-hover:text-white dark:group-hover:border-brand"
                    : "border-current"
                }`}
              >
                {LETTERS[i]}
              </span>
              <span className="flex-1 min-w-0">{rich?.options[i] ?? text}</span>
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
          {rich ? (
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{rich.explanation}</div>
          ) : (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{q.explanation}</p>
          )}
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
