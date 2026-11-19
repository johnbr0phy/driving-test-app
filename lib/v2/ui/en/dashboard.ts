// v2 interface strings, group "dashboard" (English base). See lib/v2/ui/index.ts.
// The dashboard (DashboardV2), the drill front door (DrillOverview), the
// Premium locks (DrillLockScreen, V2TestGate) and the paywall label (V2Paywall).
export const dashboard = {
  // ---- Hero ----
  /** Hero headline by progress; `completedTitle` is the exam's own when it has one. */
  heroTitle: (done: number, total: number, completedTitle?: string): string => {
    if (done === 0) return `Complete all ${total} steps`;
    if (done === total) return completedTitle ?? "You're ready";
    if (done === total - 1) return "One left";
    if (done === 1) return `Good start. 1 of ${total} done`;
    const frac = done / total;
    if (frac < 0.45) return `${done} of ${total} done`;
    if (frac < 0.55) return "Halfway there";
    if (frac < 0.8) return "More than halfway";
    return `${done} of ${total}, almost there`;
  },
  tigerAlt: "Tiger mascot",
  /** Under the N/N counter. */
  complete: "complete",

  // ---- Goal picker ----
  goalChangeTitle: "Change your goal",
  goalAskTitle: "What score are you aiming for?",
  goalPickHint: "Pick a target. Your plan finishes when a full practice test hits it.",
  keepGoal: (goal: number) => `Keep ${goal}`,

  // ---- Goal strip ----
  goalLabel: "Goal",
  bestLabel: "Best",
  changeGoal: "Change",
  takeTestToSeeScore: "Take the full test to see your score",
  goalHitShort: "Goal hit",
  pointsToGo: (n: number) => `${n} to go`,

  // ---- Step stamps ----
  stampComplete: "Complete!",
  stampStartHere: "Start here",
  stampKeepGoing: "Keep going",
  stampGoalHit: "Goal hit!",
  stampRetake: "Retake it",

  // ---- Phone drills ----
  phoneHeading: "Train by skill · on your phone",
  basicsStepTitle: (drillName: string) => `${drillName} [Basics]`,
  basicsSubtitleLocked: (skills: number) => `Premium · ${skills} skills`,
  basicsSubtitle: (learned: number, skills: number) => `${learned}/${skills} skills learned`,
  drillSubtitleLocked: (questions: number) => `Premium · ${questions} questions`,
  drillSubtitle: (mastered: number, total: number) => `${mastered}/${total} mastered`,
  /** Screen-reader label of a progress row. */
  rowLabel: (name: string, subtitle: string) => `${name}: ${subtitle}`,
  basicsRowLabel: (drillName: string, subtitle: string) => `${drillName} Basics: ${subtitle}`,
  /** What the paywall names when a locked drill is tapped. */
  drillItemLabel: (drillName: string) => `${drillName} drill`,

  // ---- Full practice tests ----
  desktopHeading: "Full practice test · on a desktop, timed",
  testShapeQuestions: (n: number) => `${n} questions`,
  testShapeSections: (n: number) => `${n} sections`,
  testSubtitle: (shape: string, length: string, adaptive: boolean, heldOut: boolean) =>
    `${shape} · ${length}${adaptive ? " · adaptive" : ""}${heldOut ? " · never in drills" : ""}`,
  testSubtitleLocked: (shape: string, length: string, heldOut: boolean) =>
    `Premium · ${shape} · ${length}${heldOut ? " · never in drills" : ""}`,
  testInProgress: (sectionName: string, module: number) => `In progress · ${sectionName}, module ${module}`,
  testBestHit: (best: number, goal: number) => `Best ${best} · goal ${goal} hit`,
  testBestToGo: (best: number, goal: number) => `Best ${best} · ${goal - best} to your goal of ${goal}`,
  attempts: (n: number) => (n === 1 ? "1 attempt" : `${n} attempts`),
  /** Fallback name of a test with none in the config. */
  practiceTestN: (n: number) => `Practice Test ${n}`,

  // ---- Attempts panel ----
  attemptFirst: "First",
  attemptNumber: (n: number) => `#${n}`,
  reviewLatest: "Review the latest attempt",
  resumeTest: "Resume the test",
  retakeTest: "Retake the test",
  discardConfirm: "Discard the test in progress and start over next time?",
  discardAttempt: "Discard the attempt in progress",

  // ---- Stats links ----
  statsTitle: "Your stats",
  statsSub: "Your score today and where your next points are",
  communityTitle: "Common Mistakes",
  communitySub: (examShortName: string) => `The ${examShortName} questions most students get wrong`,

  // ---- Premium ----
  /** What else the same purchase opens, for lock and welcome copy. */
  otherPremiumExams: "every other test on Tigertest",
  welcomePremium: "Welcome to Premium!",
  premiumUnlocked: (examShortName: string, others: string) =>
    `Every ${examShortName} drill and practice test is unlocked, and so is ${others}.`,
  dismiss: "Dismiss",
  unlockWithPremium: (price: string | null) => `Unlock with Premium${price !== null ? ` · ${price}` : ""}`,
  backToDashboardLink: "Back to the dashboard",
  /** Paywall line: the exam and the item tapped ("SAT Practice Test 2"). */
  paywallItem: (examShortName: string, itemLabel: string) => `${examShortName} ${itemLabel}`,
  /** Drill lock: the drill's blurb (config), then what is locked and what else Premium opens. */
  drillLockBody: (blurb: string, detail: string, premiumTest: string | null, others: string) =>
    `${blurb} ${detail}, part of Tigertest Premium along with ${premiumTest ?? "full stats"} and ${others}.`,
  drillLockDetail: (skills: number, questions: number) => `${skills} Basics skills and ${questions} exam-level questions`,
  /** Lock detail for the Basics runner and the exam-level runner. */
  /** Test lock body. */
  testLockBody: (heldOut: boolean, others: string) =>
    `${heldOut ? "This test never appears in the drills, so it shows how ready you really are. " : ""}It's part of Tigertest Premium, one payment with no subscription, along with the last drills and ${others}.`,

  // ---- Drill front door (DrillOverview) ----
  backToDashboardAria: "Back to dashboard",
  basicsStageTitle: "Basics",
  basicsStageSub: "Learn one rule, practice it right away. About 2 minutes per skill. Free.",
  skillLearned: "Learned ✓",
  quickQuestions: (n: number) => `${n} quick Qs`,
  nextSkillButton: (skillName: string) => `Next skill: ${skillName}`,
  startBasicsButton: (skillName: string) => `Start Basics: ${skillName}`,
  continueExamLevel: "Continue exam level",
  startExamLevel: "Start exam level",
};
