// Bounds for quiz generation from pasted material, shared by the /create
// page and lib/server/quizGenerate.ts (which imports the Anthropic SDK and
// firebase-admin, so the client cannot import it directly).

export const GENERATE_MAX_CHARS = 24_000;
export const GENERATE_MIN_COUNT = 5;
export const GENERATE_MAX_COUNT = 50;
export const GENERATE_MIN_WORDS = 30;
export const GENERATE_COUNT_CHOICES = [5, 10, 15, 20, 30, 40, 50];

/** How many questions a piece of text supports: about one per 60 words, within bounds. */
export function suggestedCount(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(GENERATE_MIN_COUNT, Math.min(GENERATE_MAX_COUNT, Math.round(words / 60)));
}

/** The closest choice in the count select to the suggestion. */
export function suggestedChoice(text: string): number {
  const n = suggestedCount(text);
  return GENERATE_COUNT_CHOICES.reduce((best, c) => (Math.abs(c - n) < Math.abs(best - n) ? c : best), GENERATE_COUNT_CHOICES[0]);
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
