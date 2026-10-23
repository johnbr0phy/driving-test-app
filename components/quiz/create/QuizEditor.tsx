"use client";

// The quiz editor behind /create (new) and /q/<code>/edit: title,
// description, visibility, pass mark and the question list, validated with
// lib/quizzes.ts before it is sent to POST or PATCH /api/quizzes.

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Lock, Plus, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useIsPremium } from "@/hooks/useIsPremium";
import { quizFetch } from "@/lib/quizClient";
import {
  QUIZ_DEFAULT_PASS_PCT,
  QUIZ_LIMITS,
  QUIZ_MAX_DESCRIPTION,
  QUIZ_MAX_TITLE,
  QUIZ_MIN_QUESTIONS,
  QUIZ_OPTION_COUNT,
  quizPath,
  quizTopics,
  validateQuizQuestion,
  type QuizPublic,
  type QuizQuestionInput,
  type QuizVisibility,
} from "@/lib/quizzes";
import { QuizQuestionCard, TOPIC_LIST_ID, type DraftQuestion } from "./QuizQuestionCard";

export interface QuizEditorInitial {
  title: string;
  description: string;
  visibility: QuizVisibility;
  /** visibility "class": the class it is shared with. */
  classCode?: string;
  passPct: number;
  questions: (QuizQuestionInput & { id?: string })[];
}

interface Props {
  mode: "create" | "edit";
  /** The quiz code when editing. */
  code?: string;
  initial: QuizEditorInitial;
  /** How the questions were made, for the server's counters (create only). */
  createdVia?: "web" | "import";
  /** Rendered above the questions on the edit page (share line, reports, delete). */
  children?: ReactNode;
  /** A "start over" control shown next to the heading. */
  onBack?: () => void;
  backLabel?: string;
  /** Rendered under the visibility choice (the admin's "feature in the library" checkbox). */
  featuredControl?: ReactNode;
}

// Three choices on screen; "Everyone" is "link", or "public" with the library box ticked.
type Audience = "everyone" | "me" | "class";
const AUDIENCE_CHOICES: { value: Audience; name: string; hint: string; icon: ReactNode }[] = [
  { value: "everyone", name: "Everyone", hint: "Anyone with the link", icon: <Globe className="w-4 h-4" aria-hidden="true" /> },
  { value: "me", name: "Only me", hint: "Just for your own practice", icon: <Lock className="w-4 h-4" aria-hidden="true" /> },
  { value: "class", name: "My class", hint: "Only students in one of your classes", icon: <Users className="w-4 h-4" aria-hidden="true" /> },
];

function audienceOf(v: QuizVisibility): Audience {
  return v === "private" ? "me" : v === "class" ? "class" : "everyone";
}

interface TeacherClass {
  code: string;
  name: string;
  examName: string;
  memberCount: number;
}

const fieldClass = "block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5";
const textareaClass =
  "w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-base md:text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

let keyCounter = 0;
const nextKey = () => `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;

export function blankDraft(): DraftQuestion {
  return { key: nextKey(), question: "", options: Array(QUIZ_OPTION_COUNT).fill(""), correctIndex: -1, explanation: "", topic: "" };
}

function toDraft(q: QuizQuestionInput & { id?: string }): DraftQuestion {
  const options = [...q.options];
  while (options.length < QUIZ_OPTION_COUNT) options.push("");
  return {
    key: nextKey(),
    ...(q.id ? { id: q.id } : {}),
    question: q.question,
    options: options.slice(0, QUIZ_OPTION_COUNT),
    correctIndex: q.correctIndex,
    explanation: q.explanation ?? "",
    topic: q.topic ?? "",
  };
}

/** New quiz from scratch: three empty questions. */
export function emptyInitial(): QuizEditorInitial {
  return { title: "", description: "", visibility: "link", passPct: QUIZ_DEFAULT_PASS_PCT, questions: [] };
}

export function QuizEditor({ mode, code, initial, createdVia = "web", children, onBack, backLabel = "Start over", featuredControl }: Props) {
  const { user } = useAuth();
  const { isPremium } = useIsPremium();
  const router = useRouter();
  const limits = isPremium ? QUIZ_LIMITS.premium : QUIZ_LIMITS.free;

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [visibility, setVisibility] = useState<QuizVisibility>(initial.visibility);
  const [classCode, setClassCode] = useState(initial.classCode ?? "");
  // The teacher's /teach classes, for the "My class" picker (null while loading).
  const [classes, setClasses] = useState<TeacherClass[] | null>(null);
  const audience = audienceOf(visibility);
  const [passPct, setPassPct] = useState(String(initial.passPct));
  const [questions, setQuestions] = useState<DraftQuestion[]>(() =>
    initial.questions.length ? initial.questions.map(toDraft) : Array.from({ length: QUIZ_MIN_QUESTIONS }, blankDraft),
  );
  const [error, setError] = useState<{ message: string; key?: string; upgrade?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    quizFetch<{ classes: TeacherClass[] }>(user, "/api/classes")
      .then((r) => alive && setClasses(r.classes))
      .catch(() => alive && setClasses([]));
    return () => {
      alive = false;
    };
  }, [user]);

  // Picking "My class" with one class picks it; a class that is gone falls back to the first.
  useEffect(() => {
    if (audience !== "class" || !classes?.length) return;
    if (!classes.some((c) => c.code === classCode)) setClassCode(classes[0].code);
  }, [audience, classes, classCode]);

  const chooseAudience = (a: Audience) => {
    if (a === "me") setVisibility("private");
    else if (a === "class") setVisibility("class");
    else setVisibility(visibility === "public" ? "public" : "link");
  };

  const topics = useMemo(() => quizTopics(questions.map((q) => ({ topic: q.topic.trim() || undefined }))), [questions]);

  const updateAt = useCallback((i: number, next: DraftQuestion) => {
    setQuestions((qs) => qs.map((q, j) => (j === i ? next : q)));
    setError((e) => (e?.key === next.key ? null : e));
  }, []);

  const move = (i: number, direction: -1 | 1) => {
    setQuestions((qs) => {
      const j = i + direction;
      if (j < 0 || j >= qs.length) return qs;
      const out = [...qs];
      [out[i], out[j]] = [out[j], out[i]];
      return out;
    });
  };

  const duplicate = (i: number) => {
    setQuestions((qs) => {
      // A copy is a new question: it never carries the original's server id.
      const copy: DraftQuestion = { ...qs[i], key: nextKey(), options: [...qs[i].options] };
      delete copy.id;
      return [...qs.slice(0, i + 1), copy, ...qs.slice(i + 1)];
    });
  };

  const remove = (i: number) => setQuestions((qs) => qs.filter((_, j) => j !== i));

  const add = () => {
    const draft = blankDraft();
    setQuestions((qs) => [...qs, draft]);
    requestAnimationFrame(() => document.getElementById(`quiz-q-${draft.key}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const scrollTo = (key: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(`quiz-q-${key}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.querySelector<HTMLElement>("textarea, input")?.focus({ preventScroll: true });
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || busy) return;
    setError(null);

    if (!title.trim()) return setError({ message: "Give the quiz a title" });
    if (visibility === "class" && !classCode) return setError({ message: "Make a class first, or choose Everyone or Only me" });
    if (questions.length < QUIZ_MIN_QUESTIONS) return setError({ message: `A quiz needs at least ${QUIZ_MIN_QUESTIONS} questions` });
    if (questions.length > limits.questions) {
      return setError({
        message: `A quiz can have up to ${limits.questions} questions on your plan. Remove ${questions.length - limits.questions}${
          isPremium ? "" : ", or get Premium for up to " + QUIZ_LIMITS.premium.questions
        }.`,
        upgrade: !isPremium,
      });
    }

    const payload: (QuizQuestionInput & { id?: string })[] = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (q.correctIndex < 0 && q.question.trim()) {
        setError({ message: `Question ${i + 1} needs a correct answer: tap the circle next to the right option.`, key: q.key });
        return scrollTo(q.key);
      }
      const r = validateQuizQuestion({
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        topic: q.topic,
      });
      if (!r.ok) {
        setError({ message: `Question ${i + 1}: ${r.error}`, key: q.key });
        return scrollTo(q.key);
      }
      payload.push({ ...r.question, ...(q.id ? { id: q.id } : {}) });
    }

    const body = {
      title: title.trim(),
      description: description.trim(),
      questions: payload,
      visibility,
      ...(visibility === "class" ? { classCode } : {}),
      passPct: Number(passPct) || QUIZ_DEFAULT_PASS_PCT,
    };

    setBusy(true);
    try {
      let savedCode = code;
      if (mode === "create") {
        const res = await quizFetch<{ code: string }>(user, "/api/quizzes", { method: "POST", body: JSON.stringify({ ...body, createdVia }) });
        savedCode = res.code;
      } else if (code) {
        await quizFetch<QuizPublic>(user, `/api/quizzes/${code}`, { method: "PATCH", body: JSON.stringify(body) });
      }
      if (!savedCode) throw new Error("Couldn't save the quiz. Try again.");
      setSaved(savedCode);
      const target = quizPath(savedCode);
      setTimeout(() => router.push(target), 700);
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError({ message: err instanceof Error ? err.message : "Couldn't save the quiz. Try again.", upgrade: status === 402 });
      setBusy(false);
    }
  };

  const planName = isPremium ? "Premium" : "free";
  const overLimit = questions.length > limits.questions;

  return (
    <form onSubmit={save} className="relative">
      <datalist id={TOPIC_LIST_ID}>
        {topics.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>

      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">{mode === "create" ? "Review your quiz" : "Edit quiz"}</h2>
        {onBack && (
          <button type="button" onClick={onBack} className="text-sm underline text-gray-600 dark:text-gray-300">
            {backLabel}
          </button>
        )}
      </div>

      {children}

      <div className="space-y-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-6 mb-6">
        <div>
          <label htmlFor="quiz-title" className={fieldClass}>Title</label>
          <Input
            id="quiz-title"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, QUIZ_MAX_TITLE))}
            placeholder="Chapter 4: Cell Biology"
            maxLength={QUIZ_MAX_TITLE}
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{title.length} / {QUIZ_MAX_TITLE}</p>
        </div>

        <div>
          <label htmlFor="quiz-description" className={fieldClass}>
            Description <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
          </label>
          <textarea
            id="quiz-description"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, QUIZ_MAX_DESCRIPTION))}
            rows={2}
            placeholder="What this quiz covers and who it is for."
            className={textareaClass}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description.length} / {QUIZ_MAX_DESCRIPTION}</p>
        </div>

        <fieldset>
          <legend className={fieldClass}>Who can play it</legend>
          <div className="grid sm:grid-cols-3 gap-2">
            {AUDIENCE_CHOICES.map((c) => {
              const checked = audience === c.value;
              return (
                <label
                  key={c.value}
                  className={`cursor-pointer rounded-xl border-2 px-3 py-2.5 ${
                    checked
                      ? "border-gray-900 dark:border-gray-50 bg-gray-50 dark:bg-gray-800"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz-visibility"
                    value={c.value}
                    checked={checked}
                    onChange={() => chooseAudience(c.value)}
                    className="sr-only"
                  />
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {c.icon}
                    {c.name}
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-300">{c.hint}</span>
                </label>
              );
            })}
          </div>
          {audience === "everyone" && (
            <label className="mt-3 flex items-start gap-2 text-sm text-gray-800 dark:text-gray-100">
              <input
                type="checkbox"
                checked={visibility === "public"}
                onChange={(e) => setVisibility(e.target.checked ? "public" : "link")}
                className="mt-0.5 h-4 w-4 accent-gray-900 dark:accent-gray-50"
              />
              <span>
                Also list it in the{" "}
                <Link href="/quizzes" className="underline">
                  Tigertest library
                </Link>
                <span className="block text-xs text-gray-600 dark:text-gray-300">Shown there once 5 people have played it.</span>
              </span>
            </label>
          )}
          {audience === "class" && (
            <div className="mt-3">
              {classes === null ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading your classes...</p>
              ) : classes.length === 0 ? (
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  You don&apos;t have a class yet.{" "}
                  <Link href="/teach/new" className="underline font-medium">
                    Make a class
                  </Link>{" "}
                  (free), then come back and pick it here.
                </p>
              ) : (
                <>
                  <label htmlFor="quiz-class" className="block text-sm text-gray-700 dark:text-gray-200 mb-1.5">
                    Which class
                  </label>
                  <select
                    id="quiz-class"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="w-full sm:max-w-sm rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-base md:text-sm text-gray-900 dark:text-gray-50"
                  >
                    {classes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} ({c.memberCount} {c.memberCount === 1 ? "student" : "students"})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300">
                    Students already in the class open the link and go straight in. Anyone else is asked for the class code.
                  </p>
                </>
              )}
            </div>
          )}
          {featuredControl}
        </fieldset>

        <div className="sm:max-w-[12rem]">
          <label htmlFor="quiz-pass" className={fieldClass}>Pass mark (%)</label>
          <Input
            id="quiz-pass"
            type="number"
            inputMode="numeric"
            min={50}
            max={100}
            step={1}
            value={passPct}
            onChange={(e) => setPassPct(e.target.value)}
            onBlur={() => setPassPct(String(Math.min(100, Math.max(50, Math.round(Number(passPct) || QUIZ_DEFAULT_PASS_PCT)))))}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Test mode counts a pass at this score. 50 to 100.</p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <QuizQuestionCard
            key={q.key}
            index={i}
            total={questions.length}
            draft={q}
            error={error?.key === q.key ? error.message : undefined}
            onChange={(next) => updateAt(i, next)}
            onMove={(d) => move(i, d)}
            onDuplicate={() => duplicate(i)}
            onDelete={() => remove(i)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button type="button" variant="outline" onClick={add} disabled={questions.length >= limits.questions} className="w-full sm:w-auto">
          <Plus className="w-4 h-4" aria-hidden="true" /> Add question
        </Button>
        {questions.length >= limits.questions && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            That is the most a quiz can hold on the {planName} plan.
            {!isPremium && (
              <>
                {" "}
                <Link href="/upgrade" className="underline">Get Premium</Link> for up to {QUIZ_LIMITS.premium.questions}.
              </>
            )}
          </p>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 z-20 -mx-4 sm:-mx-6 mt-6 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-4 sm:px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {error && !error.key && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400 mb-2">
            {error.message}
            {error.upgrade && (
              <>
                {" "}
                <Link href="/upgrade" className="underline font-medium">See Premium</Link>
              </>
            )}
          </p>
        )}
        {error?.key && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400 mb-2">
            {error.message}{" "}
            <button type="button" onClick={() => scrollTo(error.key!)} className="underline">
              Go to it
            </button>
          </p>
        )}
        {saved && (
          <p role="status" className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            <Check className="inline w-4 h-4 mr-1 -mt-0.5" aria-hidden="true" />
            Saved. Opening your quiz...
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <p className={`text-sm ${overLimit ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-300"}`}>
            {questions.length} of {limits.questions} questions on the {planName} plan
          </p>
          <Button
            type="submit"
            disabled={busy || !!saved}
            className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 min-w-[8rem]"
          >
            {busy ? "Saving..." : mode === "create" ? "Save quiz" : "Save changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
