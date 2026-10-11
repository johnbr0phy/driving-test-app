import { BasicsSkill, basicsFor } from "./basics";
import { DrillDef, QuestionV2 } from "./types";

/**
 * Which Basics skill a missed exam-level question is really about, so the
 * drill can offer that skill's rule card (and explainer) under the miss.
 *
 * The drill-pool questions carry a hand-set `basics` tag (the skill the
 * item really tests; 329 of 376 at the time of writing, the rest have no
 * skill for their rule yet). That tag is the answer. An untagged item
 * matches only when its free-text `skill` label is exactly a skill's name.
 * Nothing fuzzier: an earlier version scored cue words in the label and
 * explanation, and every match that produced beyond the tags was wrong
 * ("Semicolons and participial phrases" is a comma question), and a wrong
 * card after a miss is worse than none. Only the drill's own skills are
 * candidates, so a Reading drill can never point at Semicolons.
 */
export function matchBasicsSkill(question: QuestionV2, drill: DrillDef): BasicsSkill | null {
  const candidates = basicsFor(drill);
  if (candidates.length === 0) return null;
  if (question.basics) return candidates.find((s) => s.id === question.basics) ?? null;
  const label = (question.skill ?? "").trim().toLowerCase();
  if (!label) return null;
  return candidates.find((s) => s.name.toLowerCase() === label) ?? null;
}
