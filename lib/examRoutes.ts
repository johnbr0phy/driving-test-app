/**
 * Route + ID configuration that lets the DMV test/results/drill flow serve
 * other exams. DMV_ROUTES reproduces the original behaviour exactly; HTL
 * maps the same flow onto its namespaced IDs (201-204) under /htl.
 */
import { ExamConfig, EXAMS, examTestIds, getExamById } from "./exams";
import { isDrillFree as isDmvDrillFree } from "./missedQuestions";

export interface PlanTrainingSet {
  setNumber: number;
  // Optional label override for the results "Your plan" step. When omitted
  // the i18n planStep2 string is used with {{n}} = setNumber.
  label?: string;
}

export interface ExamRoutes {
  id: string;
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

/** Routes for a registry exam (HTL, CST, CRCST): all free, namespaced IDs. */
export function routesForExam(exam: ExamConfig): ExamRoutes {
  const base = exam.slug;
  return {
    id: exam.id,
    dashboard: `${base}/dashboard`,
    stats: `${base}/stats`,
    test: (id) => `${base}/test/${id}`,
    results: (id) => `${base}/test/${id}/results`,
    training: (set) => `${base}/training?set=${set}`,
    drill: (id) => (id ? `${base}/drill?test=${id}` : `${base}/drill`),
    signup: `/signup?redirect=${base}/dashboard`,
    login: `/login?redirect=${base}/dashboard`,
    testIds: examTestIds(exam),
    displayTestNumber: (id) => id - exam.idBase,
    isTestLocked: () => false,
    isDrillFree: () => true,
    stateFilter: () => exam.stateCode,
    examLabel: exam.examLabel,
    chartPassPct: exam.passPct,
    // Sets are per content area, so point at the weakest area from this
    // attempt (falls back to the largest set).
    planTrainingSet: (_testId, weakCategories) => {
      const weakest = weakCategories[0]?.category;
      const set =
        exam.trainingSets.find((s) => weakest !== undefined && s.categories.includes(weakest)) ??
        [...exam.trainingSets].sort((a, b) => b.size - a.size)[0];
      return {
        setNumber: set.setNumber,
        label: `Train the ${set.name} set — same material, mastery-style`,
      };
    },
  };
}

const EXAM_ROUTES: Record<string, ExamRoutes> = Object.fromEntries(
  EXAMS.map((e) => [e.id, routesForExam(e)])
);

export function getExamRoutes(examId: string): ExamRoutes {
  const routes = EXAM_ROUTES[examId];
  if (!routes) throw new Error(`Unknown exam: ${examId}`);
  return routes;
}

export const HTL_ROUTES: ExamRoutes = getExamRoutes(getExamById("htl")!.id);
