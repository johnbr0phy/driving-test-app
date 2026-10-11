"use client";

import { useEffect, useState } from "react";
import { ListChecks, Play } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { BasicsSkill, hasWalkthrough } from "@/lib/v2/basics";
import { hasExplainer } from "@/lib/v2/explainer";
import { BasicsExplainer } from "./BasicsExplainer";
import { BasicsWalkthrough } from "./BasicsWalkthrough";
import { Eli5Toggle, RuleCard } from "./BasicsRuleCard";

/**
 * The bottom sheet with a skill's rule card, used from a Basics question's
 * Rule button and from a missed exam-level question. A skill with a
 * walkthrough leads with "Walk through it", a voiced skill with "Listen
 * instead"; either swaps the sheet for the lesson, whose "Read it" comes
 * back here.
 */
export function BasicsRuleSheet({ exam, skill, open, onClose, doneLabel = "Back to the question" }: {
  exam: ExamV2Config;
  skill: BasicsSkill;
  open: boolean;
  onClose: () => void;
  doneLabel?: string;
}) {
  const [eli5, setEli5] = useState(false);
  const [listening, setListening] = useState(false);
  const [walking, setWalking] = useState(false);
  const voiced = hasExplainer(skill);
  const walkable = hasWalkthrough(skill);

  // Fresh each time it opens, and for each skill.
  useEffect(() => {
    setEli5(false);
    setListening(false);
    setWalking(false);
  }, [open, skill.id]);

  if (!open) return null;

  if (walking) {
    return <BasicsWalkthrough exam={exam} skill={skill} doneLabel={doneLabel} onDone={onClose} onClose={onClose} onRead={() => setWalking(false)} />;
  }
  if (listening) {
    return <BasicsExplainer exam={exam} skill={skill} doneLabel={doneLabel} onDone={onClose} onClose={onClose} onRead={() => setListening(false)} />;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50" role="dialog" aria-modal="true" aria-label="The rule" onClick={onClose}>
      <div className="v2-pop max-h-[85%] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white dark:bg-gray-900 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-5">
          {walkable && (
            <button type="button" onClick={() => setWalking(true)} className="flex items-center gap-1.5 self-start text-[15px] font-semibold text-brand">
              <ListChecks className="h-4 w-4" /> Walk through it, step by step
            </button>
          )}
          {voiced && (
            <button type="button" onClick={() => setListening(true)} className="flex items-center gap-1.5 self-start text-[15px] font-semibold text-brand">
              <Play className="h-4 w-4" /> Listen instead · 30 seconds
            </button>
          )}
          <RuleCard skill={skill} />
          <Eli5Toggle skill={skill} open={eli5} onOpen={() => setEli5(true)} />
        </div>
        <button type="button" onClick={onClose} className="v2-tap mt-5 w-full rounded-xl bg-brand text-base font-bold text-white">
          {doneLabel}
        </button>
      </div>
    </div>
  );
}
