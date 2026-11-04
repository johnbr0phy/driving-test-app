"use client";

import { useCallback, useState } from "react";
import { SOLVE_X_PROBLEMS, SolveXBoard, solveXPrompt } from "./SolveXBoard";

/**
 * A walkthrough step the student does with their hands: a drag board
 * (components/v2/play/*) named by the step's `play` key. Loaded with
 * next/dynamic from BasicsWalkthrough, so the drag library only reaches
 * the browser when a skill has one of these steps.
 *
 * onSolved fires once the first board is solved; "Try another" then
 * cycles through the rest of the problems.
 */
export default function BasicsPlay({ play, onSolved, onStart }: {
  play: string;
  onSolved: () => void;
  /** The first move on the board. */
  onStart?: () => void;
}) {
  const [round, setRound] = useState(0);
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [nudge, setNudge] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const problem = SOLVE_X_PROBLEMS[round % SOLVE_X_PROBLEMS.length];

  const onStage = useCallback(
    (s: 0 | 1 | 2 | 3 | 4) => {
      setStage(s);
      setNudge(null);
      if (s > 0 && !started) {
        setStarted(true);
        onStart?.();
      }
      if (s === 4) onSolved();
    },
    [onSolved, onStart, started],
  );

  if (play !== "solveX") return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <SolveXBoard key={round} problem={problem} onStage={onStage} onWrongMove={setNudge} />
      <div aria-live="polite" className="w-full">
        <p className={`text-[16px] leading-snug ${stage === 4 ? "font-semibold text-green-800 dark:text-green-300" : "text-gray-700 dark:text-gray-200"}`}>
          {solveXPrompt(problem, stage)}
        </p>
        {nudge && <p className="v2-pop mt-2 text-[15px] leading-snug text-amber-800 dark:text-amber-300">{nudge}</p>}
      </div>
      {stage === 4 && (
        <button
          type="button"
          onClick={() => {
            setRound((r) => r + 1);
            setStage(0);
            setNudge(null);
          }}
          className="mt-1 self-start text-sm font-semibold text-brand-dark underline underline-offset-2"
        >
          Try another one
        </button>
      )}
    </div>
  );
}
