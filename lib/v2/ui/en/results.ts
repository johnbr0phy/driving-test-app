// v2 interface strings, group "results" (English base). See lib/v2/ui/index.ts.
// The results page (ResultsV2), the stats page (StatsV2) and its question
// rows (V2StatsRow). Exam, section, drill and domain names come from the
// exam config and are passed in, never translated here.

/** "question" / "questions" for a count. */
const questionWord = (n: number) => `question${n === 1 ? "" : "s"}`;

export const results = {
  // ResultsV2: no result yet
  noResultYet: (testNumber: number) => `No result yet for Practice Test ${testNumber}`,
  takeTheTest: "Take the test",

  // ResultsV2: header and score
  /** Eyebrow above the score: "SAT · Practice Test 1". */
  eyebrow: (examShortName: string, testNumber: number) => `${examShortName} · Practice Test ${testNumber}`,
  goalReachedEyebrow: "Practice goal reached",
  fullMarks: "Full marks!",
  hitYourGoal: "You hit your goal!",
  testCompleteGreen: (testNumber: number) => `Practice Test ${testNumber} is complete. See it turn green on your dashboard.`,
  /** Fallback score label when the exam gives none: "Total score estimate". */
  compositeEstimate: (compositeName: string) => `${compositeName} estimate`,
  /** "<score label> · goal 1200". */
  scoreLabelWithGoal: (scoreLabel: string, goal: number) => `${scoreLabel} · goal ${goal}`,
  atYourGoal: "At your goal",
  /** "+40 vs last attempt" / "-20 vs last attempt". */
  vsLastAttempt: (delta: number) => `${delta >= 0 ? "+" : ""}${delta} vs last attempt`,
  toYourGoal: (n: number) => `${n} to your goal`,
  seeYourProgress: "See your progress",
  reviewYourAnswers: "Review your answers",
  untimedNote: "Untimed practice. This attempt did not simulate the exam time limit.",

  // ResultsV2: section cards
  correctOfTotal: (raw: number, total: number) => `${raw} / ${total} correct`,
  /** The score band beside a section score: "(560 to 640)". */
  scoreBand: (low: number, high: number) => `(${low} to ${high})`,
  /** One module line: "Module 2 (harder): 18/27". */
  moduleLine: (module: number, variant: string | undefined, raw: number, total: number) =>
    `Module ${module}${variant ? ` (${variant === "upper" ? "harder" : "easier"})` : ""}: ${raw}/${total}`,
  /** Shown when Module 1 routed to the easier Module 2. */
  cappedNote: (cap: number, thresholdPct: number, fullMax: number) =>
    `Module 1 sent you to the easier Module 2, which caps this section near ${cap}. Get ${thresholdPct}% of Module 1 right to reach the harder path and the full ${fullMax}.`,

  // ResultsV2: next step
  yourNextStep: "Your next step",
  drillTonight: (drillName: string) => `Drill ${drillName} on your phone tonight`,
  nextStepBody: (correct: number, total: number, domainLabel: string) =>
    `You got ${correct} of ${total} in ${domainLabel}. The drill brings every miss back until you master it, then retake the test on a desktop.`,
  startTheDrill: "Start the drill",

  // ResultsV2: review list
  review: "Review",
  filterBySection: "Filter review by section",
  allSections: "All sections",
  filterAll: "All",
  filterMissed: "Missed",
  nothingToShow: "Nothing to show here. Nice.",
  srCorrect: "Correct. ",
  srIncorrect: "Incorrect. ",
  retakeTest: (testNumber: number) => `Retake Practice Test ${testNumber}`,
  backToDashboard: "Back to dashboard",

  // StatsV2: paywall
  paywallBenefits: (examShortName: string) => [
    `Your full ${examShortName} study plan, every topic ranked by the points it's worth`,
    "The exact skills you keep missing in each topic",
    "Every mistake saved, to retry until it sticks",
    "Full stats on every Tigertest exam",
    "One payment, yours forever",
  ],
  paywallHeadline: ["Study smart.", "Score higher."] as [string, string],

  // StatsV2: tabs
  tabYours: "Your Stats",
  tabCommunity: "Common Mistakes",

  // StatsV2: empty state
  estimateYourScore: (examShortName: string) => `Estimate your ${examShortName} score`,
  /** The empty state's line; `perSection` when the exam has more than one section. */
  answerToEstimate: (minAnswers: number, perSection: boolean) =>
    `Answer ${perSection ? `${minAnswers} questions in each section` : `${minAnswers} questions`} and we'll estimate your score and show you where your next points are.`,
  startADrill: "Start a drill",

  // StatsV2: score today
  estimatedScore: (examShortName: string) => `Estimated ${examShortName} score`,
  /** Score values are passed already formatted ("1200", "75%"). */
  atYourGoalOf: (goal: string) => `At your goal of ${goal}`,
  /** "Goal 1200 · 80 to go" or, on a percent exam, "Goal 75% · 5 points to go". */
  goalToGo: (goal: string, gap: number, percent: boolean) => `Goal ${goal} · ${percent ? `${gap} points` : gap} to go`,
  /** Section tile with too few answers: "4 to go". */
  sectionToGo: (n: number) => `${n} to go`,
  /** Score needs more answers, one section. */
  neededOne: (n: number) => `${n} more ${questionWord(n)} to see your score.`,
  /** Score needs more answers in one or two named sections. */
  neededSections: (parts: { needed: number; sectionShortName: string }[]) =>
    `${parts.map((p) => `${p.needed} more ${p.sectionShortName} ${questionWord(p.needed)}`).join(" and ")} to see your score.`,
  /** Score needs more answers in three or more sections. */
  neededEach: (minAnswers: number) => `Answer ${minAnswers} questions in each section to see your score.`,
  estimateFrom: (answered: number) =>
    `An estimate from the ${answered} practice ${questionWord(answered)} you've answered (first try), not an official score.`,
  /** Before the bold last-test score. */
  lastPracticeTest: "Your last practice test:",

  // StatsV2: fastest points
  fastestPoints: "Your fastest points",
  ifEachTopic: (targetPct: number) => `estimated, if you get each topic to ${targetPct}%`,
  noPlanYet: "Answer a few more questions and your plan shows up here.",
  /** Estimated gain on a topic: "about +30 pts" / "about +4%". */
  gainAbout: (n: number, percent: boolean) => (percent ? `about +${n}%` : `about +${n} pts`),
  /** Locked chip label. */
  pointsLabel: (percent: boolean): string => (percent ? "points" : "pts"),
  moreTopicsWorth: (count: number, gain: number, percent: boolean) =>
    `${count} more topics worth an estimated ${percent ? `+${gain}%` : `+${gain} pts`}`,
  moreTopics: (count: number) => `${count} more topics in your plan`,
  planLockSubtitle: "See every topic ranked by the points it's worth, and the exact skills you miss",
  unlockPlan: (price: string) => `Unlock your full plan · ${price}`,
  notTriedYet: "Not tried yet",
  topicAccuracy: (accPct: number, answered: number) => `${accPct}% right first try · ${answered} answered`,
  missedOf: (missed: number, answered: number) => `missed ${missed} of ${answered}`,
  practiceDrill: (drillName: string) => `Practice ${drillName}`,

  // StatsV2: practice tests
  practiceTests: "Practice tests",
  takeFullTest: "Take a full practice test for a real timed score.",
  practiceTestN: (testNumber: number) => `Practice Test ${testNumber}`,

  // StatsV2: mistake notebook
  mistakeNotebook: "Mistake notebook",
  questionCount: (n: number) => `${n} ${questionWord(n)}`,
  noMistakesYet: "Nothing yet. Every question you miss lands here so you can retry it.",
  mistakesIntro: "Every question you've missed. Tap one to try it again.",
  /** Chip label under a miss count. */
  missLabel: (n: number): string => (n === 1 ? "miss" : "misses"),
  masteredSince: " · mastered since",
  moreMistakes: (n: number) => `${n} more mistakes saved`,
  mistakesLockSubtitle: "Retry every question you've missed until it sticks",
  unlockPremiumFor: (price: string) => `Unlock Premium for ${price}`,

  // StatsV2: common mistakes
  commonMistakes: "Common Mistakes",
  commonMistakesCard: (examShortName: string) => `The ${examShortName} questions most students get wrong`,
  notEnoughData: "Not enough data yet. Check back soon.",
  getThisWrong: "get this wrong",
  /** The list intro; the count part follows when there are enough answers. */
  communityIntro: (examShortName: string) => `The ${examShortName} questions students miss most`,
  /** Before the bold test-taker count: ", based on answers from ". */
  basedOnAnswersFrom: ", based on answers from",
  realTestTakers: (count: string) => `${count} real test takers`,
  peopleGotWrong: (wrong: number, total: number) => `${wrong} out of ${total} people got this wrong`,
  moreLocked: (n: number) => `${n} more questions locked`,
  upgradeFullList: "Upgrade to see the full list",
  unlockWithPremium: "Unlock with Premium",

  // V2StatsRow
  check: "Check",
  tryAgain: "Try it again",
};
