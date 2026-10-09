/**
 * Route + ID configuration that lets the DMV test/results/drill flow serve
 * other exams. DMV_ROUTES reproduces the original behaviour exactly; HTL
 * maps the same flow onto its namespaced IDs (201-204) under /htl.
 */
import {
  HTL_ID_BASE,
  HTL_PASS_PERCENTAGE,
  HTL_STATE_CODE,
  HTL_TEST_COUNT,
  HTL_TRAINING_SETS,
} from "./htlConfig";
import { isDrillFree as isDmvDrillFree } from "./missedQuestions";

export interface PlanTrainingSet {
  setNumber: number;
  // Optional label override for the results "Your plan" step. When omitted
  // the i18n planStep2 string is used with {{n}} = setNumber.
  label?: string;
}

export interface ExamRoutes {
  id: "dmv" | "htl";
  dashboard: string;
  stats: string;
  test: (testId: number) => string;
  results: (testId: number) => string;
  training: (setNumber: number) => string;
  drill: (testId?: number) => string;
  /** Sign-up / sign-in links. Non-DMV exams pass ?redirect= so signup skips
   *  the DMV state picker and auth returns to the exam dashboard. */
  signup: string;
  login: string;
  /** Store IDs of the practice tests, in order. */
  testIds: number[];
  /** Human-facing test number (DMV: the ID itself; HTL: ID - 200). */
  displayTestNumber: (testId: number) => number;
  isTestLocked: (testId: number, isPremium: boolean) => boolean;
  isDrillFree: (testId: number) => boolean;
  /** Pseudo state code sessions are stored under. */
  stateFilter: (selectedState: string | null) => string;
  /** Label shown where the DMV flow shows the state name. */
  examLabel?: string;
  /** Pass line drawn on the attempt chart. */
  chartPassPct: number;
  /** Which training set the results plan should point at after a test. */
  planTrainingSet: (testId: number, weakCategories: { category: string }[]) => PlanTrainingSet;
}

export const DMV_ROUTES: ExamRoutes = {
  id: "dmv",
  dashboard: "/dashboard",
  stats: "/stats",
  test: (id) => `/test/${id}`,
  results: (id) => `/test/${id}/results`,
  training: (set) => `/training?set=${set}`,
  drill: (id) => (id ? `/drill?test=${id}` : "/drill"),
  signup: "/signup",
  login: "/login",
  testIds: [1, 2, 3, 4],
  displayTestNumber: (id) => id,
  isTestLocked: (id, isPremium) => id === 4 && !isPremium,
  isDrillFree: isDmvDrillFree,
  stateFilter: (selectedState) => selectedState || "CA",
  chartPassPct: 80,
  // DMV training sets mirror the tests one-to-one.
  planTrainingSet: (testId) => ({ setNumber: testId }),
};

export const HTL_ROUTES: ExamRoutes = {
  id: "htl",
  dashboard: "/htl/dashboard",
  stats: "/htl/stats",
  test: (id) => `/htl/test/${id}`,
  results: (id) => `/htl/test/${id}/results`,
  training: (set) => `/htl/training?set=${set}`,
  drill: (id) => (id ? `/htl/drill?test=${id}` : "/htl/drill"),
  signup: "/signup?redirect=/htl/dashboard",
  login: "/login?redirect=/htl/dashboard",
  testIds: Array.from({ length: HTL_TEST_COUNT }, (_, i) => HTL_ID_BASE + 1 + i),
  displayTestNumber: (id) => id - HTL_ID_BASE,
  isTestLocked: () => false,
  isDrillFree: () => true,
  stateFilter: () => HTL_STATE_CODE,
  examLabel: "ASCP HTL",
  chartPassPct: HTL_PASS_PERCENTAGE,
  // HTL sets are per content area, so point at the weakest area from this
  // attempt (falls back to Staining, the largest exam section).
  planTrainingSet: (_testId, weakCategories) => {
    const weakest = weakCategories[0]?.category;
    const set =
      HTL_TRAINING_SETS.find((s) => s.category === weakest) ??
      HTL_TRAINING_SETS.find((s) => s.category === "staining")!;
    return {
      setNumber: set.setNumber,
      label: `Train the ${set.name} set — same material, mastery-style`,
    };
  },
};
