"use client";

// Step 1 of /create: where the questions come from. The person's own
// ChatGPT or Claude (a copied prompt, the reply pasted back; TigerTest makes
// no model call), import a Quizlet export (lib/quizzes.ts parses it), or
// start an empty editor. Each hands a QuizEditorInitial to the editor.

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ClipboardPaste, Copy, FileDown, PenLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUIZ_DEFAULT_PASS_PCT, QUIZ_MAX_TOPIC, QUIZ_MIN_QUESTIONS, QUIZ_OPTION_COUNT, parseAssistantQuiz, parseTermList, termsToQuestions } from "@/lib/quizzes";
import { quizAssistantPrompt } from "@/lib/quizWritingGuide";
import type { QuizEditorInitial } from "./QuizEditor";

export type SourceKind = "assistant" | "quizlet" | "own";

const ASSISTANT_COUNTS = [10, 15, 20, 30, 40, 50];

const SOURCES: { kind: SourceKind; name: string; hint: string; icon: typeof Sparkles }[] = [
  { kind: "assistant", name: "Use ChatGPT or Claude", hint: "Free, any chat app", icon: Sparkles },
  { kind: "quizlet", name: "Import from Quizlet", hint: "Term and definition list", icon: FileDown },
  { kind: "own", name: "Write your own", hint: "Start with a blank quiz", icon: PenLine },
];

const fieldClass = "block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5";
const textareaClass =
  "w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3 text-base md:text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const ctaClass = "w-full sm:w-auto bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200";

interface Props {
  onReady: (initial: QuizEditorInitial, createdVia: "web" | "import") => void;
}

export function CreateSources({ onReady }: Props) {
  const [kind, setKind] = useState<SourceKind>("assistant");

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
      <div role="tablist" aria-label="Where the questions come from" className="grid grid-cols-3 gap-2 mb-5">
        {SOURCES.map((s) => {
          const active = s.kind === kind;
          const Icon = s.icon;
          return (
            <button
              key={s.kind}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setKind(s.kind)}
              className={`rounded-xl border-2 px-2 py-2.5 text-left sm:px-3 ${
                active
                  ? "border-gray-900 dark:border-gray-50 bg-gray-50 dark:bg-gray-800"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
              }`}
            >
              <Icon className="w-4 h-4 mb-1 text-gray-700 dark:text-gray-200" aria-hidden="true" />
              <span className="block text-sm font-semibold leading-tight text-gray-900 dark:text-gray-50">{s.name}</span>
              <span className="hidden sm:block text-xs text-gray-600 dark:text-gray-300">{s.hint}</span>
            </button>
          );
        })}
      </div>

      {kind === "assistant" && <UseAssistant onReady={(initial) => onReady(initial, "web")} />}
      {kind === "quizlet" && <QuizletImport onReady={(initial) => onReady(initial, "import")} />}
      {kind === "own" && <WriteOwn onReady={(initial) => onReady(initial, "web")} />}
    </div>
  );
}

function UseAssistant({ onReady }: { onReady: (initial: QuizEditorInitial) => void }) {
  const [count, setCount] = useState(20);
  const [copied, setCopied] = useState<"idle" | "copied" | "manual">("idle");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const prompt = useMemo(() => quizAssistantPrompt(count), [count]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied("copied");
      setTimeout(() => setCopied("idle"), 2500);
    } catch {
      setCopied("manual");
    }
  };

  const build = () => {
    const r = parseAssistantQuiz(reply);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    setNote(r.dropped ? `${r.dropped} ${r.dropped === 1 ? "question was" : "questions were"} left out because they were not well formed.` : "");
    onReady({ title: r.quiz.title, description: r.quiz.description, visibility: "link", passPct: QUIZ_DEFAULT_PASS_PCT, questions: r.quiz.questions });
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Your own ChatGPT or Claude writes the questions, free plans included. Nothing to install and nothing to pay. Already connected one?{" "}
        <Link href="/connect" className="underline text-gray-900 dark:text-gray-50">Just ask it to make a TigerTest quiz</Link>.
      </p>

      <ol className="space-y-5">
        <li>
          <p className={fieldClass}>1. Copy our question-writing prompt</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="create-ai-count" className="text-sm text-gray-700 dark:text-gray-200">
              Questions to ask for
            </label>
            <select
              id="create-ai-count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="h-10 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-3 text-sm sm:w-28"
            >
              {ASSISTANT_COUNTS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <Button type="button" onClick={copy} className={ctaClass}>
              {copied === "copied" ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              {copied === "copied" ? "Copied" : "Copy the prompt"}
            </Button>
          </div>
          {copied === "manual" && (
            <textarea readOnly value={prompt} rows={6} aria-label="The prompt to copy" className={`${textareaClass} mt-3 font-mono text-xs`} onFocus={(e) => e.currentTarget.select()} />
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            It carries the same rules our own question banks are written to: research first, four short options, a right answer that never stands out.
          </p>
        </li>
        <li>
          <p className={fieldClass}>2. Paste it into ChatGPT, Claude or any assistant, put your notes under it, and send</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Class notes, a chapter, a study guide, a syllabus, a term list. The reply comes back as a block of JSON.</p>
        </li>
        <li>
          <label htmlFor="create-ai-reply" className={fieldClass}>3. Paste the reply here</label>
          <textarea
            id="create-ai-reply"
            value={reply}
            onChange={(e) => {
              setReply(e.target.value);
              setError("");
            }}
            rows={8}
            placeholder='{"title": "...", "questions": [...]}'
            className={`${textareaClass} font-mono text-sm`}
          />
        </li>
      </ol>

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {note && <p className="text-sm text-gray-600 dark:text-gray-300">{note}</p>}

      <Button type="button" onClick={build} disabled={!reply.trim()} className={ctaClass}>
        <Sparkles className="w-4 h-4" aria-hidden="true" /> Build the quiz
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400">You review and can edit every question before anything is saved.</p>
    </div>
  );
}

function QuizletImport({ onReady }: { onReady: (initial: QuizEditorInitial) => void }) {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const pairs = useMemo(() => parseTermList(text), [text]);
  const enough = pairs.length >= QUIZ_OPTION_COUNT;

  const build = () => {
    const questions = termsToQuestions(pairs, topic.trim() || undefined);
    if (questions.length < QUIZ_MIN_QUESTIONS) {
      setError(`Only ${questions.length} of these cards could become questions. Each needs ${QUIZ_OPTION_COUNT - 1} other cards with different definitions.`);
      return;
    }
    onReady({ title: topic.trim(), description: "", visibility: "link", passPct: QUIZ_DEFAULT_PASS_PCT, questions });
  };

  return (
    <div className="space-y-4">
      <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <li>In Quizlet, open the set and click the three dots.</li>
        <li>Choose Export. Keep &quot;Tab&quot; between term and definition and &quot;New line&quot; between cards.</li>
        <li>Click Copy text and paste it below.</li>
      </ol>
      <div>
        <label htmlFor="create-quizlet" className={fieldClass}>Exported cards</label>
        <textarea
          id="create-quizlet"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          rows={10}
          placeholder={"mitochondria\tthe part of the cell that makes energy\nnucleus\tholds the cell's DNA"}
          className={`${textareaClass} font-mono text-sm`}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
          {text.trim()
            ? pairs.length === 1
              ? "1 card found"
              : `${pairs.length} cards found${enough ? "" : `. A quiz needs at least ${QUIZ_OPTION_COUNT} cards.`}`
            : "A term and its definition per line, separated by a tab."}
        </p>
      </div>
      <div className="sm:max-w-sm">
        <label htmlFor="create-topic" className={fieldClass}>
          Topic <span className="font-normal text-gray-500 dark:text-gray-400">(optional, also the quiz title)</span>
        </label>
        <Input
          id="create-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value.slice(0, QUIZ_MAX_TOPIC))}
          placeholder="Spanish verbs"
          maxLength={QUIZ_MAX_TOPIC}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <Button type="button" onClick={build} disabled={!enough} className={ctaClass}>
        <ClipboardPaste className="w-4 h-4" aria-hidden="true" /> Make questions from {enough ? pairs.length : "these"} cards
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Each card becomes a question asking for its definition, with the other cards&apos; definitions as the wrong options. You can edit every one before saving.
      </p>
    </div>
  );
}

function WriteOwn({ onReady }: { onReady: (initial: QuizEditorInitial) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Write each question with four options, mark the right one and add a short explanation. Start with {QUIZ_MIN_QUESTIONS} and add as many as your plan allows.
      </p>
      <Button
        type="button"
        onClick={() => onReady({ title: "", description: "", visibility: "link", passPct: QUIZ_DEFAULT_PASS_PCT, questions: [] })}
        className={ctaClass}
      >
        <PenLine className="w-4 h-4" aria-hidden="true" /> Open the editor
      </Button>
    </div>
  );
}
