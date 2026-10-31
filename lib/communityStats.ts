// Common Mistakes ("the questions everyone gets wrong") is built nightly by
// /api/cron/aggregate-stats from every real account's answers. A test only
// gets it once there is enough data to be honest about: COMMUNITY_MIN_QUESTIONS
// questions that each have COMMUNITY_MIN_ANSWERS answers. Until then the
// header link, the dashboard card, the landing upsell and the stats tab stay
// hidden for that test, and they appear on their own the night it crosses.

/** Answers a question needs before its miss rate is shown. */
export const COMMUNITY_MIN_ANSWERS = 10;
/** Qualifying questions a test needs before Common Mistakes turns on. */
export const COMMUNITY_MIN_QUESTIONS = 20;
/** Most-missed questions kept per test. */
export const COMMUNITY_TOP_N = 50;

/** Key for the DMV in the list of tests that have Common Mistakes. */
export const COMMUNITY_DMV_KEY = "dmv";

export interface ExamCommunityQuestion {
  questionId: string;
  wrong: number;
  total: number;
  /** Integer percent. */
  errorRate: number;
}

export interface ExamCommunityStats {
  questions: ExamCommunityQuestion[];
  /** Distinct real accounts with at least one answer on this test. */
  users: number;
}
