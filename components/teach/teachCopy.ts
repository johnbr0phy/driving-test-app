// Every string on the teacher pages (/teach landing, your classes, /teach/new,
// a class page and its pieces), in the person's interface language. English
// and British English live here; the other languages are in
// components/teach/copy/<lang>.ts (machine-translated, final). A language
// without a file reads English. Test names and catalog group titles stay as
// the catalog has them (lib/testCatalog.ts), like the homepage.

import type { EnglishLocale, Language } from "@/i18n";

export interface TeachSampleQuestion {
  question: string;
  options: [string, string, string, string];
  /** Index into options of the right answer. */
  answer: number;
  topic: string;
  explanation: string;
}

export interface TeachCopy {
  /** BCP 47 tag for numbers and dates. */
  locale: string;

  // Landing
  heroTitle: string;
  heroSub: string;
  createFreeClass: string;
  alreadyTeaching: string;
  demoAria: string;
  demoCaption: string;
  statTests: string;
  statLink: string;
  freeAmount: string;
  statFree: string;
  howItWorks: string;
  step: (n: number) => string;
  steps: { title: string; body: string }[];
  seeEyebrow: string;
  seeTitle: string;
  seeBody: string;
  seeBullets: [string, string, string];
  sampleNote: string;
  sampleQuestions: TeachSampleQuestion[];
  buildTitle: string;
  buildBody: string;
  getInTouch: string;
  everyTestTitle: string;
  everyTestBody: string;
  notHereTitle: string;
  notHereBody: string;
  contactMe: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  finalTitle: string;
  finalBody: string;
  questionsEmail: string;

  // Hero animation (components/stageshow/demos/TeachClassDemo.tsx)
  demoClassName: string;
  demoClassSub: string;
  demoMostMissed: string;
  demoMissedQ: string;
  demoMissedShort: string;
  demoTrainingSet: string;
  demoProgress: string;
  sharedWith: string;
  sharedWithAfter: string;
  justNow: string;
  of: string;
  missedWord: string;
  answeredWord: string;

  // Your classes (/teach signed in) and quizzes
  forTeachers: string;
  yourClasses: string;
  newClass: string;
  loadingClasses: string;
  students: (n: number) => string;
  classCode: (code: string) => string;
  howClassesWork: string;
  yourQuizzes: string;
  createQuiz: string;
  noQuizzes: string;
  noQuizzesBody: string;
  quizQuestions: (n: number) => string;
  players: (n: number) => string;
  /** Who can play a quiz (lib/quizzes.ts quizAudienceLabel). */
  audOnlyMe: string;
  audClassOnly: (className: string) => string;
  audMyClass: string;
  audPublic: string;
  audLink: string;

  // New class (/teach/new) and the edit form
  back: string;
  newClassTitle: string;
  test: string;
  testsMatch: (n: number) => string;
  changeTestAria: (name: string) => string;
  change: string;
  searchPlaceholder: string;
  searchAria: string;
  noTestMatches: (q: string) => string;
  state: string;
  optional: string;
  chooseState: string;
  nationalNoState: string;
  className: string;
  classNamePlaceholder: string;
  yourName: string;
  teacherPlaceholder: string;
  school: string;
  schoolPlaceholder: string;
  errPickTest: string;
  errPickState: string;
  errNameClass: string;
  errTeacherName: string;
  errCreate: string;
  saveClassAria: string;
  lastStepTitle: string;
  lastStepBody: string;
  signUpEmail: string;
  googleFailed: string;
  haveAccount: string;
  logIn: string;
  creating: string;
  createClass: string;
  freeSaveNote: string;
  studentsSeeNote: string;
  editNote: string;
  saving: string;
  save: string;
  cancel: string;
  errSave: string;

  // A class page
  errLoad: string;
  loadingClass: string;
  editDetailsAria: string;
  editDetailsTitle: string;
  editDetails: string;
  classLinkHint: string;
  noStudentsYet: string;
  noStudentsBody: string;
  activeThisWeek: string;
  questionsAnswered: string;
  classAccuracy: string;
  passedATest: (pct: number) => string;
  xOfY: (x: number, y: number) => string;
  struggleTitle: string;
  struggleBody: (pct: number) => string;
  rightOfAnswered: (right: number, answered: number) => string;
  studentsTitle: string;
  studentsHint: string;
  refresh: string;
  colName: string;
  colLastActive: string;
  colAnswered: string;
  colAccuracy: string;
  colBestTest: string;
  open: string;
  testPct: (n: number, pct: number) => string;
  noTestYet: string;
  notStarted: string;
  today: string;
  yesterday: string;
  daysAgo: (n: number) => string;
  classFooter: (code: string) => string;

  // Sharing the class link
  studentMessage: (examName: string, url: string) => string;
  copied: string;
  copyMessage: string;
  copyLink: string;
  showQr: string;
  qrDialogAria: (className: string) => string;
  close: string;
  scanToJoin: (className: string) => string;
  qrTitle: (link: string) => string;
  qrNote: string;

  // Deleting a class
  deleteConfirm: (className: string, students: number) => string;
  deleteTitle: string;
  deleteBody: string;
  deleting: string;
  deleteClass: string;
  errDelete: string;

  // The questions list (class page and landing sample)
  questions: string;
  mostMissed: string;
  lowestAccuracy: string;
  /** "12 answered by your class"; who is yourClass, or "players" on an English quiz report. */
  answeredBy: (n: number, who: string) => string;
  yourClass: string;
  /** The rest of the group in a student's per-question line. */
  classGroup: string;
  chipMissed: string;
  chipRight: string;
  topWrongPick: (letter: string) => string;
  untracked: (n: number) => string;
  answeredLabel: string;
  rightLabel: string;
  missedLabel: string;
  showFewer: string;
  showAll: (n: number) => string;

  // One student (the dialog from the Students table)
  studentSummary: (answered: number, pct: number | null, tests: number) => string;
  needsHelpWith: string;
  notEnoughYet: (min: number, name: string, answered: number) => string;
  nothingStandsOut: (min: number, pass: number) => string;
  repeatMissed: (n: number) => string;
  byTopic: string;
  tooFewToJudge: (right: number, answered: number) => string;
  classPct: (pct: number) => string;
  topicScoreNote: (name: string, min: number) => string;
  missedTitle: (name: string) => string;
  noAnswersYet: string;
  noneListedYet: string;
  noneMissedYet: string;
  triesLine: (name: string, missed: number, answered: number, group: string, right: number, total: number) => string;
  unlisted: (n: number, name: string) => string;
  practiceTests: string;
  testBest: (n: number, best: number, attempts: number) => string;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const SAMPLE_US: TeachSampleQuestion[] = [
  {
    question: "Which drug reverses the anticoagulant effect of heparin?",
    options: ["Vitamin K", "Protamine sulfate", "Naloxone", "Flumazenil"],
    answer: 1,
    topic: "Surgical Pharmacology",
    explanation: "Protamine sulfate binds heparin and neutralizes it. Vitamin K reverses warfarin; naloxone and flumazenil reverse opioids and benzodiazepines.",
  },
  {
    question: "Which of these sutures is absorbable?",
    options: ["Silk", "Nylon", "Polyglactin 910", "Polypropylene"],
    answer: 2,
    topic: "Intraoperative Procedures",
    explanation: "Polyglactin 910 (Vicryl) is absorbed over weeks. Silk, nylon and polypropylene are nonabsorbable.",
  },
  {
    question: "A wrapped instrument tray comes out of the sterilizer wet. What should the surgical technologist do?",
    options: ["Use it once it dries", "Consider it contaminated and reprocess it", "Wipe it dry with a sterile towel", "Use it for a clean case only"],
    answer: 1,
    topic: "Equipment Sterilization",
    explanation: "Moisture wicks microorganisms through the wrap, so a wet pack is treated as contaminated and goes back through processing.",
  },
];

export const teachEn: TeachCopy = {
  locale: "en-US",

  heroTitle: "Free practice tests for your whole class",
  heroSub: "Post one link. Students practice on their phones with just a name. You see who practiced, their scores, and exactly what your class keeps getting wrong.",
  createFreeClass: "Create a free class",
  alreadyTeaching: "Already teaching with Tigertest? Sign in",
  demoAria: "Animation: a student answers a question on their phone, and the teacher's class page updates with their answer and the question's miss count",
  demoCaption: "Students practice on their phone. Every answer shows up on your class page.",
  statTests: "tests, from DMV to NCLEX",
  statLink: "link for your whole class",
  freeAmount: "$0",
  statFree: "for you and your students",
  howItWorks: "How it works",
  step: (n) => `Step ${n}`,
  steps: [
    { title: "Make a class", body: "Pick the test your students are preparing for. One minute, no credit card." },
    { title: "Post one link", body: "Paste it into Canvas, Blackboard, Google Classroom or an email. Or show the QR code in class." },
    { title: "Students practice", body: "They join with just a name and practice on any phone or laptop. No app, no account." },
    { title: "You see everything", body: "Who practiced, their scores, and the topics and questions your class keeps missing." },
  ],
  seeEyebrow: "Know what to reteach",
  seeTitle: "See the questions your class keeps missing",
  seeBody: "Every question your students answer is counted. Sort by most missed, tap one to see the answer and the explanation, and walk the class through it tomorrow.",
  seeBullets: [
    "Accuracy by topic, weakest first, against the real pass mark",
    "Each student's questions answered, accuracy and best practice test",
    "Students share a name only; you're the only one who sees their scores",
  ],
  sampleNote: "Sample class. Tap a question.",
  sampleQuestions: SAMPLE_US,
  buildTitle: "We're building this for instructors",
  buildBody: "We want to work with teachers to make Tigertest great for your class. Get in touch and tell us what you teach and what would help, and we'll build it with you.",
  getInTouch: "Get in touch",
  everyTestTitle: "Works with every test on Tigertest",
  everyTestBody: "Driver's ed, nursing and allied health programs, trade schools, test prep. Pick a test to start a class for it.",
  notHereTitle: "Teaching something that isn't here? I'll build it for you, free",
  notHereBody: "Tell me the test or course you teach and I'll build the practice test for you, for free. Then make a class for it and see who practiced and what they missed.",
  contactMe: "Contact me",
  faqTitle: "Questions teachers ask",
  faq: [
    { q: "Is it really free?", a: "Yes. Classes are free for teachers and students, with no limit on how many classes you make. Tigertest is paid for by optional upgrades on a few tests, never by your class." },
    { q: "Do my students need accounts?", a: "No. They open your link, type the name you know them by, and start practicing. If they already have a Tigertest account they can stay signed in." },
    { q: "What do I see?", a: "Who joined and when they last practiced, how many questions each student answered and their accuracy, their best practice test score, the topics your class misses most, and every question the class answered with how often it was missed." },
    { q: "Does it work with Canvas, Blackboard or Google Classroom?", a: "Yes. Paste the class link into an assignment, a module or an announcement. It also works in an email, a text or on a projector as a QR code." },
    { q: "What about student privacy?", a: "Students give a name and nothing else: no email, no account, no birthday. Their practice is visible only to you. They see a note on every dashboard that their scores are shared with you, and can leave the class at any time." },
    { q: "Can one class cover two tests?", a: "A class is for one test, so the topic breakdown means something. Make a second class for a second test; it takes a minute." },
  ],
  finalTitle: "Your class could be practicing tonight",
  finalBody: "Make a class, post the link, and watch the first students show up.",
  questionsEmail: "Questions? Email",

  demoClassName: "Surgical Tech, Fall",
  demoClassSub: "CST · 18 students",
  demoMostMissed: "Most missed questions",
  demoMissedQ: "Which drug reverses heparin?",
  demoMissedShort: "Reverses heparin?",
  demoTrainingSet: "Training Set 2",
  demoProgress: "14 of 50",
  sharedWith: "Your scores are shared with",
  sharedWithAfter: "",
  justNow: "Just now",
  of: "of",
  missedWord: "missed",
  answeredWord: "answered",

  forTeachers: "For teachers",
  yourClasses: "Your classes",
  newClass: "New class",
  loadingClasses: "Loading your classes…",
  students: (n) => plural(n, "student", "students"),
  classCode: (code) => `code ${code}`,
  howClassesWork: "How Tigertest classes work",
  yourQuizzes: "Your quizzes",
  createQuiz: "Create a quiz",
  noQuizzes: "No quizzes yet",
  noQuizzesBody: "Turn your notes, a study guide or a Quizlet set into a practice quiz and share it with just one of your classes. You see who played and what they missed, like a class.",
  quizQuestions: (n) => plural(n, "question", "questions"),
  players: (n) => plural(n, "player", "players"),
  audOnlyMe: "Only me",
  audClassOnly: (name) => `${name} only`,
  audMyClass: "My class only",
  audPublic: "Everyone, in the library",
  audLink: "Anyone with the link",

  back: "Back",
  newClassTitle: "New class",
  test: "Test",
  testsMatch: (n) => (n === 1 ? "1 test matches" : `${n} tests match`),
  changeTestAria: (name) => `Change test (${name})`,
  change: "Change",
  searchPlaceholder: "Search: surgical tech, NCLEX, SAT, real estate…",
  searchAria: "Search tests",
  noTestMatches: (q) => `No test matches “${q}”.`,
  state: "State",
  optional: "(optional)",
  chooseState: "Choose your state",
  nationalNoState: "National (no state law)",
  className: "Class name",
  classNamePlaceholder: "Surgical Tech, Fall 2026",
  yourName: "Your name, as students know you",
  teacherPlaceholder: "Ms. Rivera",
  school: "School",
  schoolPlaceholder: "Lakeview Community College",
  errPickTest: "Pick the test your students are preparing for",
  errPickState: "Pick your state",
  errNameClass: "Give the class a name",
  errTeacherName: "Add the name your students know you by",
  errCreate: "Couldn't make the class. Try again.",
  saveClassAria: "Save your class",
  lastStepTitle: "Last step: save your class to a free account",
  lastStepBody: "So you can see your students' scores from any device. Your class is ready and is made the moment you sign in.",
  signUpEmail: "Sign up with email",
  googleFailed: "Google sign-in didn't work. Try again or use email.",
  haveAccount: "Already have an account?",
  logIn: "Log in",
  creating: "Creating…",
  createClass: "Create class",
  freeSaveNote: "Free. You'll save it to an account in one tap at the end.",
  studentsSeeNote: "Students see the class name, your name and the school when they join.",
  editNote: "Students see these when they join. The class link and everyone's progress stay the same.",
  saving: "Saving…",
  save: "Save",
  cancel: "Cancel",
  errSave: "Couldn't save the changes",

  errLoad: "Couldn't load the class",
  loadingClass: "Loading your class…",
  editDetailsAria: "Edit class details",
  editDetailsTitle: "Edit class name, your name and school",
  editDetails: "Edit details",
  classLinkHint: "Class link: post it in Teams, Google Classroom, Canvas or an email",
  noStudentsYet: "No students yet",
  noStudentsBody: "Paste this message into Teams, Google Classroom or an email, or put the QR code on the board in your next lesson. Students type their name and start practicing; nothing to install, no account. Each one shows up here as soon as they join.",
  activeThisWeek: "Active this week",
  questionsAnswered: "Questions answered",
  classAccuracy: "Class accuracy",
  passedATest: (pct) => `Passed a practice test (${pct}%+)`,
  xOfY: (x, y) => `${x} of ${y}`,
  struggleTitle: "Where your class struggles",
  struggleBody: (pct) => `Accuracy by topic, weakest first. Green is at or above the ${pct}% pass mark.`,
  rightOfAnswered: (right, answered) => `${right} of ${answered} right`,
  studentsTitle: "Students",
  studentsHint: "Click a student to see what they need help with.",
  refresh: "Refresh",
  colName: "Name",
  colLastActive: "Last active",
  colAnswered: "Answered",
  colAccuracy: "Accuracy",
  colBestTest: "Best practice test",
  open: "Open",
  testPct: (n, pct) => `Test ${n} · ${pct}%`,
  noTestYet: "No test yet",
  notStarted: "Not started",
  today: "Today",
  yesterday: "Yesterday",
  daysAgo: (n) => `${n} days ago`,
  classFooter: (code) => `Students join with a name only. Practice counts from the device they joined on. Class code ${code}.`,

  studentMessage: (examName, url) => `Practice for your ${examName} here: ${url}\nType your name as I know it and you're in. It's free and you don't need an account.`,
  copied: "Copied",
  copyMessage: "Copy message for students",
  copyLink: "Copy link",
  showQr: "Show QR code",
  qrDialogAria: (name) => `QR code to join ${name}`,
  close: "Close",
  scanToJoin: (name) => `Scan to join ${name}`,
  qrTitle: (link) => `QR code for ${link}`,
  qrNote: "Type your name as your teacher knows it. Free, no account needed.",

  deleteConfirm: (name, n) =>
    `Delete ${name}? ${n ? `${n === 1 ? "1 student's progress" : `${n} students' progress`} in this class will be deleted and ` : ""}the class link will stop working. This can't be undone.`,
  deleteTitle: "Delete this class",
  deleteBody: "Removes the class and its students' progress for good. Students keep practicing on their own; their scores stop being shared. Quizzes set to this class become private to you.",
  deleting: "Deleting…",
  deleteClass: "Delete class",
  errDelete: "Couldn't delete the class",

  questions: "Questions",
  mostMissed: "Most missed",
  lowestAccuracy: "Lowest accuracy",
  answeredBy: (n, who) => `${n} answered by ${who}`,
  yourClass: "your class",
  classGroup: "Class",
  chipMissed: "missed",
  chipRight: "right",
  topWrongPick: (letter) => `Most picked wrong: ${letter}`,
  untracked: (n) => `${plural(n, "miss", "misses")} from before we recorded which answer was picked.`,
  answeredLabel: "Answered:",
  rightLabel: "Right:",
  missedLabel: "Missed:",
  showFewer: "Show fewer",
  showAll: (n) => `Show all ${n}`,

  studentSummary: (answered, pct, tests) =>
    `${answered} answered · ${pct === null ? "no answers yet" : `${pct}% right`}${tests > 0 ? ` · ${tests} practice ${tests === 1 ? "test" : "tests"}` : ""}`,
  needsHelpWith: "Needs help with",
  notEnoughYet: (min, name, answered) =>
    `Not enough practice yet to tell. We call out weak topics after ${min} answers${answered > 0 ? ` (${name} has ${answered})` : ""}; the questions they missed are below.`,
  nothingStandsOut: (min, pass) => `Nothing stands out: every topic with ${min}+ answers is at or above the ${pass}% pass mark.`,
  repeatMissed: (n) => `Missed ${plural(n, "question", "questions")} more than once: the strongest sign of a real gap.`,
  byTopic: "By topic",
  tooFewToJudge: (right, answered) => `Too few to judge (${right} of ${answered})`,
  classPct: (pct) => `class ${pct}%`,
  topicScoreNote: (name, min) => `A topic gets a score once ${name} has answered ${min} questions in it.`,
  missedTitle: (name) => `Questions ${name} missed`,
  noAnswersYet: "No answers yet.",
  noneListedYet: "None listed yet.",
  noneMissedYet: "None missed yet.",
  triesLine: (name, missed, answered, group, right, total) =>
    `${name}: missed ${missed} of ${answered} ${answered === 1 ? "try" : "tries"}. ${group}: ${right} of ${total} right.`,
  unlisted: (n, name) =>
    `${n} ${n === 1 ? "miss isn't" : "misses aren't"} listed: a bug before Oct 19 dropped them. They come back the next time ${name} opens this test on the device they joined on.`,
  practiceTests: "Practice tests",
  testBest: (n, best, attempts) => `Test ${n} · best ${best}%${attempts > 1 ? ` · ${attempts} tries` : ""}`,
};

export const teachEnGB: TeachCopy = {
  ...teachEn,
  locale: "en-GB",
  heroSub: "Post one link. Students practise on their phones with just a name. You see who practised, their scores, and exactly what your class keeps getting wrong.",
  demoCaption: "Students practise on their phone. Every answer shows up on your class page.",
  freeAmount: "£0",
  steps: [
    teachEn.steps[0],
    teachEn.steps[1],
    { title: "Students practise", body: "They join with just a name and practise on any phone or laptop. No app, no account." },
    { title: "You see everything", body: "Who practised, their scores, and the topics and questions your class keeps missing." },
  ],
  sampleQuestions: [
    {
      ...SAMPLE_US[0],
      options: ["Vitamin K", "Protamine sulphate", "Naloxone", "Flumazenil"],
      explanation: "Protamine sulphate binds heparin and neutralises it. Vitamin K reverses warfarin; naloxone and flumazenil reverse opioids and benzodiazepines.",
    },
    SAMPLE_US[1],
    { ...SAMPLE_US[2], question: "A wrapped instrument tray comes out of the steriliser wet. What should the surgical technologist do?", topic: "Equipment Sterilisation" },
  ],
  everyTestBody: "Driving lessons, nursing and allied health programmes, trade schools, test preparation. Pick a test to start a class for it.",
  notHereBody: "Tell me the test or course you teach and I'll build the practice test for you, for free. Then make a class for it and see who practised and what they missed.",
  faq: teachEn.faq.map((f, i) =>
    i === 1
      ? { ...f, a: "No. They open your link, type the name you know them by, and start practising. If they already have a Tigertest account they can stay signed in." }
      : i === 2
        ? { ...f, a: "Who joined and when they last practised, how many questions each student answered and their accuracy, their best practice test score, the topics your class misses most, and every question the class answered with how often it was missed." }
        : f,
  ),
  finalTitle: "Your class could be practising tonight",
  demoClassName: "Surgical Technology, Autumn",
  noStudentsBody: "Paste this message into Teams, Google Classroom or an email, or put the QR code on the board in your next lesson. Students type their name and start practising; nothing to install, no account. Each one shows up here as soon as they join.",
  studentMessage: (examName, url) => `Practise for your ${examName} here: ${url}\nType your name as I know it and you're in. It's free and you don't need an account.`,
  deleteBody: "Removes the class and its students' progress for good. Students keep practising on their own; their scores stop being shared. Quizzes set to this class become private to you.",
};

/** British spellings for the catalog's group titles, shown only to en-GB readers. */
export const GB_GROUP_TITLES: Record<string, string> = {
  "Philippines insurance and real estate licenses": "Philippines insurance and real estate licences",
  "Outdoor & recreation licenses": "Outdoor & recreation licences",
  "Aviation, radio & trade licenses": "Aviation, radio & trade licences",
  "Real estate, insurance, securities & notary licenses": "Real estate, insurance, securities & notary licences",
  "Psychology, social work and counseling exams": "Psychology, social work and counselling exams",
};

export function pickTeachCopy(lang: Language, englishLocale: EnglishLocale, translated: Partial<Record<Language, TeachCopy>>): TeachCopy {
  if (lang === "en") return englishLocale === "en-GB" ? teachEnGB : teachEn;
  return translated[lang] ?? teachEn;
}
