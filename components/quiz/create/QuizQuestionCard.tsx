"use client";

import { ArrowDown, ArrowUp, Copy, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  QUIZ_MAX_EXPLANATION,
  QUIZ_MAX_OPTION_TEXT,
  QUIZ_MAX_QUESTION_TEXT,
  QUIZ_MAX_TOPIC,
} from "@/lib/quizzes";

// One question in the editor (components/quiz/create/QuizEditor.tsx): the
// stem, four options with a radio for the right one, an explanation, a
// topic, and the move / duplicate / delete controls.

export interface DraftQuestion {
  /** Local React key, never sent. */
  key: string;
  /** The server's id when editing an existing question, kept so progress on it survives. */
  id?: string;
  question: string;
  options: string[];
  /** -1 until one is picked. */
  correctIndex: number;
  explanation: string;
  topic: string;
}

const LETTERS = ["A", "B", "C", "D"];
export const TOPIC_LIST_ID = "quiz-editor-topics";

const labelClass = "block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1";
const textareaClass =
  "w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-base md:text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const iconButtonClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 disabled:opacity-40 disabled:hover:bg-transparent";

interface Props {
  index: number;
  total: number;
  draft: DraftQuestion;
  error?: string;
  onChange: (next: DraftQuestion) => void;
  onMove: (direction: -1 | 1) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function QuizQuestionCard({ index, total, draft, error, onChange, onMove, onDuplicate, onDelete }: Props) {
  const set = (patch: Partial<DraftQuestion>) => onChange({ ...draft, ...patch });
  const setOption = (i: number, value: string) => {
    const options = [...draft.options];
    options[i] = value;
    set({ options });
  };
  const domId = `quiz-q-${draft.key}`;

  return (
    <div
      id={domId}
      className={`rounded-2xl bg-white dark:bg-gray-900 border p-4 sm:p-5 scroll-mt-24 ${
        error ? "border-red-400 dark:border-red-600" : "border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Question {index + 1}</p>
        <div className="flex items-center gap-0.5">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label={`Move question ${index + 1} up`} className={iconButtonClass}>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            aria-label={`Move question ${index + 1} down`}
            className={iconButtonClass}
          >
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={onDuplicate} aria-label={`Duplicate question ${index + 1}`} className={iconButtonClass}>
            <Copy className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete question ${index + 1}`}
            className={`${iconButtonClass} hover:text-red-600 dark:hover:text-red-400`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor={`${domId}-text`} className={labelClass}>Question</label>
          <textarea
            id={`${domId}-text`}
            value={draft.question}
            onChange={(e) => set({ question: e.target.value.slice(0, QUIZ_MAX_QUESTION_TEXT) })}
            rows={2}
            placeholder="What does the mitochondria do?"
            className={textareaClass}
          />
        </div>

        <fieldset>
          <legend className={labelClass}>Options (pick the right one)</legend>
          <div className="space-y-2">
            {draft.options.map((opt, i) => {
              const checked = draft.correctIndex === i;
              return (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`${domId}-correct`}
                    checked={checked}
                    onChange={() => set({ correctIndex: i })}
                    aria-label={`Option ${LETTERS[i]} is the right answer`}
                    className="h-4 w-4 flex-shrink-0 accent-green-600"
                  />
                  <span className="w-4 text-xs font-semibold text-gray-500 dark:text-gray-400" aria-hidden="true">
                    {LETTERS[i]}
                  </span>
                  <Input
                    value={opt}
                    onChange={(e) => setOption(i, e.target.value.slice(0, QUIZ_MAX_OPTION_TEXT))}
                    placeholder={`Option ${LETTERS[i]}`}
                    aria-label={`Option ${LETTERS[i]}`}
                    className={checked ? "border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-950" : ""}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${domId}-explanation`} className={labelClass}>
            Explanation <span className="font-normal text-gray-500 dark:text-gray-400">(optional, shown after answering)</span>
          </label>
          <textarea
            id={`${domId}-explanation`}
            value={draft.explanation}
            onChange={(e) => set({ explanation: e.target.value.slice(0, QUIZ_MAX_EXPLANATION) })}
            rows={2}
            placeholder="Why that answer is right, in a sentence or two."
            className={textareaClass}
          />
        </div>

        <div className="sm:max-w-xs">
          <label htmlFor={`${domId}-topic`} className={labelClass}>
            Topic <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
          </label>
          <Input
            id={`${domId}-topic`}
            value={draft.topic}
            onChange={(e) => set({ topic: e.target.value.slice(0, QUIZ_MAX_TOPIC) })}
            list={TOPIC_LIST_ID}
            placeholder="Cell biology"
            autoComplete="off"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
