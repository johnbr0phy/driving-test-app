"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

export interface QuizRowFooterState {
  // true once the user has picked an option (or immediately when the
  // question has no option data and the answer is shown directly)
  answered: boolean;
  correct: boolean;
}

// The expandable quiz strip introduced by the dashboard daily quiz: a
// collapsed row with a stat chip + question + chevron that unfolds into the
// four answer options; picking one resolves green/red. Shared by the daily
// quiz, Your Stats, and Community Wrong Questions so they all feel the same.
export function QuizRow({
  chipValue,
  chipLabel,
  chipColorClass = "text-red-500",
  question,
  options,
  correctAnswer,
  subtitle,
  onAnswer,
  renderFooter,
  className,
}: {
  chipValue: string;
  chipLabel: string;
  chipColorClass?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  subtitle?: string;
  onAnswer?: (correct: boolean) => void;
  renderFooter?: (state: QuizRowFooterState) => React.ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const hasOptions = options.length > 0;
  const answered = picked !== null;
  const pickedCorrect = answered && options[picked] === correctAnswer;

  const toggle = () => setExpanded((e) => !e);

  const pickOption = (idx: number) => {
    if (answered) return;
    setPicked(idx);
    onAnswer?.(options[idx] === correctAnswer);
  };

  return (
    <div
      className={`rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-shadow ${className ?? ""}`}
    >
      {/* Header row — toggles the quiz open/closed */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="flex items-center gap-4 cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="shrink-0 text-center min-w-[3rem]">
          <div className={`text-base font-bold tabular-nums leading-none ${chipColorClass}`}>
            {chipValue}
          </div>
          <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5 whitespace-nowrap">
            {chipLabel}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm leading-snug font-medium text-gray-900 ${expanded ? "" : "line-clamp-2"}`}
          >
            {question}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Expanding quiz panel */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3 space-y-1.5">
            {hasOptions ? (
              options.map((opt, idx) => {
                const isCorrect = opt === correctAnswer;
                const isPicked = picked === idx;
                const letter = ["A", "B", "C", "D"][idx];

                let optionStyle = "bg-gray-50 border-gray-200 text-gray-700";
                if (answered) {
                  if (isCorrect) {
                    optionStyle = "bg-green-50 border-green-200 text-green-900";
                  } else if (isPicked) {
                    optionStyle = "bg-red-50 border-red-200 text-red-700";
                  } else {
                    optionStyle = "bg-gray-50 border-gray-100 text-gray-400";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      pickOption(idx);
                    }}
                    disabled={answered}
                    style={{ transitionDelay: expanded && !answered ? `${idx * 50}ms` : "0ms" }}
                    className={`w-full flex items-start gap-2 rounded-lg border px-3 py-2 text-sm text-left transition-all duration-300 motion-reduce:transition-none ${
                      expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    } ${optionStyle} ${!answered ? "hover:border-brand-border hover:bg-white cursor-pointer" : "cursor-default"}`}
                  >
                    <span
                      className={`font-semibold shrink-0 ${
                        answered && isCorrect
                          ? "text-green-700"
                          : answered && isPicked
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 min-w-0">{opt}</span>
                    {answered && isCorrect && (
                      <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" strokeWidth={3} />
                    )}
                    {answered && isPicked && !isCorrect && (
                      <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                    )}
                  </button>
                );
              })
            ) : (
              // No option data — fall back to showing the answer
              <p className="text-sm font-medium text-green-700 leading-snug flex items-start gap-1.5">
                <Check className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={3} />
                <span>{correctAnswer}</span>
              </p>
            )}

            {renderFooter?.({ answered: answered || !hasOptions, correct: pickedCorrect })}
          </div>
        </div>
      </div>
    </div>
  );
}
