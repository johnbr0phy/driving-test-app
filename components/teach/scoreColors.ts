// Score colours for the instructor pages: a muted, print-like palette (sage,
// ochre, terracotta) instead of traffic-light greens and reds. Shared by the
// class page and the /teach landing preview so the two always match.

export type ScoreLevel = "good" | "near" | "low";

export function scoreLevel(p: number, pass: number): ScoreLevel {
  if (p >= pass) return "good";
  if (p >= pass - 15) return "near";
  return "low";
}

const BAR: Record<ScoreLevel, string> = {
  good: "bg-[#5E8C6A] dark:bg-[#7FAE8A]", // sage
  near: "bg-[#D29F3B] dark:bg-[#DDB25E]", // ochre
  low: "bg-[#B9573F] dark:bg-[#D2765F]", // terracotta
};

const CHIP: Record<ScoreLevel, string> = {
  good: "bg-[#E6EEE7] text-[#3F6449] dark:bg-[#22302A] dark:text-[#A9CDB2]",
  near: "bg-[#F6EDDA] text-[#8A6418] dark:bg-[#3A3020] dark:text-[#E5C78A]",
  low: "bg-[#F5E3DD] text-[#93402D] dark:bg-[#3B2621] dark:text-[#E9A592]",
};

export const scoreTrack = "bg-[#EFEBE4] dark:bg-gray-800";

export const scoreBar = (level: ScoreLevel) => BAR[level];
export const scoreChip = (level: ScoreLevel) => CHIP[level];

const TEXT: Record<ScoreLevel, string> = {
  good: "text-[#4A7556] dark:text-[#8FBF9B]",
  near: "text-[#A87A1F] dark:text-[#DDB25E]",
  low: "text-[#A64B35] dark:text-[#E08A73]",
};

export const scoreText = (level: ScoreLevel) => TEXT[level];
