/**
 * Which v2 questions can be printed as plain HTML with their answer, for the
 * landing samples (components/v2/SampleQuestionsV2.tsx) and the v2 topic
 * pages (lib/v2/topicPages.ts). Kept free of React so tests can load it.
 */
import { getBank, getStimulus } from "./bank";
import { getExamV2 } from "./registry";
import { heldOutTests } from "./training";
import type { QuestionV2, Stimulus } from "./types";
import type { ExamTopicV2 } from "./topicPages";

// Longest shared passage a page will print with a sample (AP English
// Language and AP Italian put every item on a passage, so without this they
// had no samples and no Quiz node at all).
const MAX_SAMPLE_PASSAGE = 1600;

/** A text-only passage short enough to print, or null. */
export function samplePassage(examId: string, q: QuestionV2): Stimulus | null {
  const s = getStimulus(examId, q);
  if (!s || s.figure || s.text.length > MAX_SAMPLE_PASSAGE || /\||\{\{|\[\[/.test(s.text)) return null;
  return s;
}

/**
 * Whether a question can be printed: single answer, no figure, table, cloze
 * or highlight markup, and either no passage ("alone"), a short text passage
 * ("passage") or either ("any"). Held-out tests are the caller's to drop.
 */
export function isPrintable(examId: string, q: QuestionV2, passage: "alone" | "passage" | "any"): boolean {
  const hasPassage = !!(q.passage || q.stimulusId);
  if (hasPassage && samplePassage(examId, q) === null) return false;
  if (passage === "alone" && hasPassage) return false;
  if (passage === "passage" && !hasPassage) return false;
  return (
    q.format === "single" &&
    !q.figure &&
    (q.options?.length ?? 0) >= 3 &&
    q.correct?.length === 1 &&
    !/\||\{\{|\[\[|\n- /.test(q.stem) &&
    q.stem.length <= 420
  );
}

/** Questions shown on a v2 topic page. */
export const TOPIC_PAGE_SIZE_V2 = 10;

/** Every printable question of a topic, never from a held-out test, by id. */
export function topicPoolV2(examId: string, topic: ExamTopicV2): QuestionV2[] {
  const heldOut = heldOutTests(getExamV2(examId));
  return getBank(examId)
    .questions.filter(
      (q) =>
        topic.domains.includes(q.domain) &&
        (!topic.section || q.section === topic.section) &&
        !heldOut.includes(q.test) &&
        isPrintable(examId, q, "any")
    )
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * The questions a topic page prints: an even spread of the pool, taken in
 * turn from each domain (the AFQT page spans four subtests), at most one
 * question per shared passage while others remain. Stable between builds.
 */
export function topicQuestionsV2(examId: string, topic: ExamTopicV2, count = TOPIC_PAGE_SIZE_V2): QuestionV2[] {
  const pool = topicPoolV2(examId, topic);
  const lists = topic.domains
    .map((d) => {
      const list = pool.filter((q) => q.domain === d);
      const seen = new Set<string>();
      // One per passage first, the rest after.
      const first = list.filter((q) => {
        const id = q.stimulusId ?? (q.passage ? `p:${q.id}` : null);
        if (!id) return true;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      const rest = list.filter((q) => !first.includes(q));
      const ordered = [...first, ...rest];
      const take = Math.min(ordered.length, count);
      // Even spread over the passage-distinct list so easy and hard both show.
      const spread = Array.from({ length: take }, (_, i) => first[Math.floor((i * first.length) / Math.max(take, 1))]).filter(Boolean);
      const unique = [...new Set(spread)];
      for (const q of ordered) if (unique.length < take && !unique.includes(q)) unique.push(q);
      return unique;
    })
    .filter((l) => l.length > 0);
  const out: QuestionV2[] = [];
  for (let i = 0; out.length < count && lists.some((l) => l.length > i); i++) {
    for (const l of lists) if (l[i] && out.length < count) out.push(l[i]);
  }
  return out;
}
