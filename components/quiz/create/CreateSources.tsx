"use client";

// Step 1 of /create: where the questions come from. The person's own
// connected ChatGPT or Claude (which writes and saves through MCP),
// import a Quizlet export (lib/quizzes.ts parses it), or
// start an empty editor. Each hands a QuizEditorInitial to the editor.

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardPaste, FileDown, Link2, PenLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUIZ_DEFAULT_PASS_PCT, QUIZ_MAX_TOPIC, QUIZ_MIN_QUESTIONS, QUIZ_OPTION_COUNT, parseTermList, termsToQuestions } from "@/lib/quizzes";
import type { QuizEditorInitial } from "./QuizEditor";

export type SourceKind = "assistant" | "quizlet" | "own";

const SOURCES: { kind: SourceKind; name: string; hint: string; icon: typeof Sparkles }[] = [
  { kind: "assistant", name: "Use ChatGPT or Claude", hint: "Connect once, create in chat", icon: Sparkles },
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

      {kind === "assistant" && <UseAssistant />}
      {kind === "quizlet" && <QuizletImport onReady={(initial) => onReady(initial, "import")} />}
      {kind === "own" && <WriteOwn onReady={(initial) => onReady(initial, "web")} />}
    </div>
  );
}

export function UseAssistant() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Make your quiz in your chat</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Connect TigerTest to your own ChatGPT or Claude account. Your assistant writes the questions and saves the quiz to TigerTest through the connector.
        You do not need to copy questions or answers between apps.
      </p>
      <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <li>Follow the setup guide to add TigerTest, then sign in to TigerTest and approve the connection.</li>
        <li>In a chat with TigerTest enabled, add your notes or a document and ask: &quot;Make a TigerTest quiz from this material.&quot;</li>
        <li>Review and approve the save when your assistant asks. Open the quiz link to edit, practice or share it.</li>
      </ol>
      <Button asChild className={ctaClass}>
        <Link href="/connect"><Link2 className="w-4 h-4" aria-hidden="true" /> Connect ChatGPT or Claude</Link>
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        This opens setup instructions, not an automatic connection. Availability depends on your chat app and workspace permissions.
        Your chat account handles question generation; TigerTest does not use its own AI key to write your quiz.
      </p>
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
