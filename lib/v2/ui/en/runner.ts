// v2 interface strings, group "runner" (English base). See lib/v2/ui/index.ts.
// The timed exam runner (ExamRunner), its timer, calculator and figure
// viewer, and the question view with every answer format.
export const runner = {
  // ExamRunner: loading and chrome
  loadingTest: "Loading your test...",
  exitTest: "Exit test",
  /** Title of a module when a section has more than one. */
  moduleTitle: (section: string, module: number) => `${section} · Module ${module}`,

  // Intro screen
  sectionOf: (n: number, total: number) => `Section ${n} of ${total}`,
  questionCount: (n: number) => `${n} questions`,
  /** A resumed module's clock, e.g. "12:00 left". */
  timeLeft: (clock: string) => `${clock} left`,
  untimed: "Untimed",
  adaptiveHarder: "Adaptive: harder module",
  adaptiveEasier: "Adaptive: easier module",
  calculatorAllowed: "Calculator allowed",
  noCalculator: "No calculator",
  noGoingBack: "No going back",
  untimedPractice: "Untimed practice (recorded with your result)",
  halfLengthPractice: "Half-length practice (half the questions, half the time)",
  directions: "Directions",
  clockStartsLinear: "The clock starts when you tap Start.",
  clockStartsReview: "The clock starts when you tap Start and keeps running on the review screen.",
  noClock: "There is no clock on this section. Take the time you need.",
  linearRule: "Answer each question before moving on. Like the real computer test, you cannot go back.",
  freeRule: "Move freely between questions. Flag any you want to revisit.",
  autoSubmit: "When time runs out the section submits itself.",
  resumeModule: "Resume module",
  startModule: "Start module",

  // Break screen
  breakTitle: "Break time",
  /** Used when the exam has no breakNote of its own. */
  breakDefault: (minutes: number) => `The real test gives you ${minutes} minutes between sections.`,
  breakAdvice: (section: string) => `Stand up, drink water, then continue to ${section}.`,
  continueTo: (section: string) => `Continue to ${section}`,

  // Review screen
  checkYourWork: "Check your work",
  reviewSummary: (answered: number, total: number, flagged: number) =>
    `${answered} of ${total} answered${flagged ? `, ${flagged} flagged` : ""}. Tap a number to go back to it.`,
  submitModule: "Submit module",

  // Question screen
  calculator: "Calculator",
  referenceSheet: "Reference sheet",
  reference: "Reference",
  eliminateChoices: "Eliminate choices",
  /** "Question 3", followed by ofTotal in lighter type. */
  questionNumber: (n: number) => `Question ${n}`,
  ofTotal: (total: number) => `of ${total}`,
  flagged: "Flagged",
  flagForReview: "Flag for review",
  submitSection: "Submit section",
  previousQuestion: "Previous question",
  nextQuestion: "Next question",
  answeredCount: (n: number) => `${n} answered`,
  paletteButtonLabel: (current: number, total: number, answered: number) => `Questions: ${current} / ${total}, ${answered} answered`,
  review: "Review",
  questions: "Questions",
  goToReview: "Go to review screen",

  // Question palette
  paletteItemLabel: (n: number, answered: boolean, flagged: boolean) =>
    `Question ${n}${answered ? ", answered" : ", unanswered"}${flagged ? ", flagged" : ""}`,
  legendAnswered: "Answered",
  legendUnanswered: "Unanswered",
  legendFlagged: "Flagged",

  // Confirm dialogs
  unansweredCount: (n: number) => `${n} unanswered`,
  submitAnywayBody: "There is no penalty for guessing. Submit anyway?",
  submit: "Submit",
  leaveTitle: "Leave the test?",
  leave: "Leave",
  leaveBodyIntro: "Your progress is saved and the clock pauses. Resume any time from the dashboard.",
  leaveBodyBreak: "Your progress is saved. Resume any time from the dashboard.",
  leaveBodyReview: "Your progress is saved and the clock pauses.",
  leaveBodyQuestions: "Your answers are saved and the clock pauses until you come back. The real test never pauses, so finish in one sitting when you can.",

  // Timer
  timeUp: "Time is up.",
  oneMinuteLeft: "One minute or less remaining.",
  fiveMinutesLeft: "Five minutes or less remaining.",
  showTimer: "Show timer",
  /** Timer button label while it shows the clock (hidden = currently hidden). */
  timerRemaining: (clock: string, hidden: boolean) => `${clock} remaining. ${hidden ? "Show" : "Hide"} timer`,
  timer: "Timer",

  // Calculator
  calcError: "Error",
  calcExpression: "Calculator expression",
  calcDelete: "Delete last character",
  calcClear: "Clear calculator",
  calcHint: "Trig functions take degrees. Type directly or tap the keys.",

  // Figure
  openFigure: (alt: string) => `Open figure full size: ${alt}`,
  tapToEnlarge: "Tap to enlarge",
  figureFullSize: "Figure full size",

  // QuestionView
  passage: "Passage",
  hidePassage: "Hide passage",
  showPassage: "Show passage",
  highlightHint: "Tap each phrase to highlight it; tap again to clear it.",
  clozeHint: "Choose an option for each blank.",
  yourAnswer: "Your answer",
  numericPlaceholderWhole: "Type a number",
  numericPlaceholder: "e.g. 12, 3/4, -0.5",
  numericInvalid: "Enter a number, decimal, or fraction like 3/4.",
  numericHelp: "Digits, a decimal point, a slash for fractions, and a leading minus sign.",
  correctAnswerIs: (answer: string) => `Correct answer: ${answer}`,
  srEliminated: "Eliminated. ",
  /** Screen-reader marks on answer choices and chips. */
  srCorrectAnswer: "Correct answer",
  srIncorrectAnswer: "Incorrect answer",
  restoreChoice: (letter: string) => `Restore choice ${letter}`,
  eliminateChoice: (letter: string) => `Eliminate choice ${letter}`,
  undo: "Undo",
  selectedCap: (n: number) => `${n} selected. Tap one to clear it before choosing another.`,
  selectN: (n: number) => `Select ${n}.`,
  selectAll: "Select every answer that applies.",
  srCorrect: "Correct. ",
  srNotQuite: "Incorrect. ",
  correct: "Correct",
  notQuite: "Incorrect",
  skill: (skill: string) => `Skill: ${skill}`,

  // Order input
  stepsPlaced: (placed: number, total: number) => `${placed} of ${total} steps placed.`,
  yourOrder: "Your order",
  tapNextStep: "Tap the next step below",
  correctPosition: "Correct position",
  incorrectPosition: "Incorrect position",
  stepRevealLabel: (n: number, text: string, ok: boolean) => `Step ${n}: ${text}. ${ok ? "Correct position" : "Incorrect position"}`,
  removeStep: (n: number, text: string) => `Remove step ${n}: ${text}`,
  steps: "Steps",
  takeBackHint: "Tap a placed step to take it back.",
  correctOrder: "Correct order",

  // Bowtie and cloze inputs
  chooseN: (n: number) => `(choose ${n})`,
  blank: (n: number) => `Blank ${n}`,
  selectPlaceholder: "Select...",
};
