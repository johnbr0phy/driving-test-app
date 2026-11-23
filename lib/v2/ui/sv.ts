// Swedish v2 interface strings (machine translation). See lib/v2/ui/index.ts.
import { registerV2Ui, type V2UiTranslation } from "./registry";

/** "fråga" / "frågor" for a count. */
const fragor = (n: number) => (n === 1 ? "fråga" : "frågor");

export const SV: V2UiTranslation = {
  common: {
    loading: "Laddar...",
    back: "Tillbaka",
    next: "Nästa",
    close: "Stäng",
    continue: "Fortsätt",
    cancel: "Avbryt",
  },

  runner: {
    // ExamRunner: loading and chrome
    loadingTest: "Laddar ditt prov...",
    exitTest: "Avsluta provet",
    moduleTitle: (section: string, module: number) => `${section} · Modul ${module}`,

    // Intro screen
    sectionOf: (n: number, total: number) => `Del ${n} av ${total}`,
    questionCount: (n: number) => `${n} ${fragor(n)}`,
    timeLeft: (clock: string) => `${clock} kvar`,
    untimed: "Ingen tidsgräns",
    adaptiveHarder: "Adaptivt: svårare modul",
    adaptiveEasier: "Adaptivt: lättare modul",
    calculatorAllowed: "Miniräknare tillåten",
    noCalculator: "Ingen miniräknare",
    noGoingBack: "Ingen väg tillbaka",
    untimedPractice: "Övning utan tidsgräns (noteras med ditt resultat)",
    directions: "Instruktioner",
    clockStartsLinear: "Klockan startar när du trycker på Starta.",
    clockStartsReview: "Klockan startar när du trycker på Starta och fortsätter gå på granskningssidan.",
    noClock: "Den här delen har ingen klocka. Ta den tid du behöver.",
    linearRule: "Svara på varje fråga innan du går vidare. Precis som i det riktiga datorprovet kan du inte gå tillbaka.",
    freeRule: "Gå fritt mellan frågorna. Markera dem du vill titta på igen.",
    autoSubmit: "När tiden tar slut lämnas delen in automatiskt.",
    resumeModule: "Fortsätt modulen",
    startModule: "Starta modulen",

    // Break screen
    breakTitle: "Paus",
    breakDefault: (minutes: number) =>
      `På det riktiga provet får du ${minutes} ${minutes === 1 ? "minut" : "minuter"} mellan delarna.`,
    breakAdvice: (section: string) => `Res dig upp, drick lite vatten och fortsätt sedan till ${section}.`,
    continueTo: (section: string) => `Fortsätt till ${section}`,

    // Review screen
    checkYourWork: "Kontrollera dina svar",
    reviewSummary: (answered: number, total: number, flagged: number) =>
      `${answered} av ${total} besvarade${flagged ? `, ${flagged} markerade` : ""}. Tryck på ett nummer för att gå tillbaka till det.`,
    submitModule: "Lämna in modulen",

    // Question screen
    calculator: "Miniräknare",
    referenceSheet: "Formelblad",
    reference: "Formler",
    eliminateChoices: "Stryk alternativ",
    questionNumber: (n: number) => `Fråga ${n}`,
    ofTotal: (total: number) => `av ${total}`,
    flagged: "Markerad",
    flagForReview: "Markera för granskning",
    submitSection: "Lämna in delen",
    previousQuestion: "Föregående fråga",
    nextQuestion: "Nästa fråga",
    answeredCount: (n: number) => `${n} besvarade`,
    paletteButtonLabel: (current: number, total: number, answered: number) =>
      `Frågor: ${current} / ${total}, ${answered} besvarade`,
    review: "Granska",
    questions: "Frågor",
    goToReview: "Gå till granskningssidan",

    // Question palette
    paletteItemLabel: (n: number, answered: boolean, flagged: boolean) =>
      `Fråga ${n}${answered ? ", besvarad" : ", obesvarad"}${flagged ? ", markerad" : ""}`,
    legendAnswered: "Besvarad",
    legendUnanswered: "Obesvarad",
    legendFlagged: "Markerad",

    // Confirm dialogs
    unansweredCount: (n: number) => `${n} ${n === 1 ? "obesvarad" : "obesvarade"}`,
    submitAnywayBody: "Det kostar inga poäng att gissa. Lämna in ändå?",
    submit: "Lämna in",
    leaveTitle: "Lämna provet?",
    leave: "Lämna",
    leaveBodyIntro: "Dina framsteg är sparade och klockan pausas. Fortsätt när du vill från översikten.",
    leaveBodyBreak: "Dina framsteg är sparade. Fortsätt när du vill från översikten.",
    leaveBodyReview: "Dina framsteg är sparade och klockan pausas.",
    leaveBodyQuestions:
      "Dina svar är sparade och klockan pausas tills du kommer tillbaka. Det riktiga provet pausas aldrig, så gör klart det i ett svep när du kan.",

    // Timer
    timeUp: "Tiden är slut.",
    oneMinuteLeft: "En minut eller mindre kvar.",
    fiveMinutesLeft: "Fem minuter eller mindre kvar.",
    showTimer: "Visa timer",
    timerRemaining: (clock: string, hidden: boolean) => `${clock} kvar. ${hidden ? "Visa" : "Dölj"} timer`,
    timer: "Timer",

    // Calculator
    calcError: "Fel",
    calcExpression: "Uttryck i miniräknaren",
    calcDelete: "Radera sista tecknet",
    calcClear: "Rensa miniräknaren",
    calcHint: "Trigonometriska funktioner räknar i grader. Skriv direkt eller tryck på tangenterna.",

    // Figure
    openFigure: (alt: string) => `Öppna figuren i full storlek: ${alt}`,
    tapToEnlarge: "Tryck för att förstora",
    figureFullSize: "Figur i full storlek",

    // QuestionView
    passage: "Text",
    hidePassage: "Dölj texten",
    showPassage: "Visa texten",
    highlightHint: "Tryck på varje fras för att markera den; tryck igen för att ta bort markeringen.",
    clozeHint: "Välj ett alternativ för varje lucka.",
    yourAnswer: "Ditt svar",
    numericPlaceholderWhole: "Skriv ett tal",
    numericPlaceholder: "t.ex. 12, 3/4, -0.5",
    numericInvalid: "Skriv ett heltal, ett decimaltal med punkt eller ett bråk som 3/4.",
    numericHelp: "Siffror, en punkt för decimaler, ett snedstreck för bråk och ett minustecken först.",
    correctAnswerIs: (answer: string) => `Rätt svar: ${answer}`,
    srEliminated: "Struken. ",
    srCorrectAnswer: "Rätt svar",
    srIncorrectAnswer: "Fel svar",
    restoreChoice: (letter: string) => `Återställ alternativ ${letter}`,
    eliminateChoice: (letter: string) => `Stryk alternativ ${letter}`,
    undo: "Ångra",
    selectedCap: (n: number) => `${n} valda. Tryck på ett för att ta bort det innan du väljer ett annat.`,
    selectN: (n: number) => `Välj ${n}.`,
    selectAll: "Välj alla svar som stämmer.",
    srCorrect: "Rätt. ",
    srNotQuite: "Fel. ",
    correct: "Rätt",
    notQuite: "Fel",
    skill: (skill: string) => `Färdighet: ${skill}`,

    // Order input
    stepsPlaced: (placed: number, total: number) => `${placed} av ${total} steg placerade.`,
    yourOrder: "Din ordning",
    tapNextStep: "Tryck på nästa steg nedan",
    correctPosition: "Rätt plats",
    incorrectPosition: "Fel plats",
    stepRevealLabel: (n: number, text: string, ok: boolean) => `Steg ${n}: ${text}. ${ok ? "Rätt plats" : "Fel plats"}`,
    removeStep: (n: number, text: string) => `Ta bort steg ${n}: ${text}`,
    steps: "Steg",
    takeBackHint: "Tryck på ett placerat steg för att ta tillbaka det.",
    correctOrder: "Rätt ordning",

    // Bowtie and cloze inputs
    chooseN: (n: number) => `(välj ${n})`,
    blank: (n: number) => `Lucka ${n}`,
    selectPlaceholder: "Välj...",
  },

  dashboard: {
    // ---- Hero ----
    heroTitle: (done: number, total: number, completedTitle?: string): string => {
      if (done === 0) return `Klara alla ${total} steg`;
      if (done === total) return completedTitle ?? "Du är redo";
      if (done === total - 1) return "Ett kvar";
      if (done === 1) return `Bra start. 1 av ${total} klart`;
      const frac = done / total;
      if (frac < 0.45) return `${done} av ${total} klara`;
      if (frac < 0.55) return "Halvvägs";
      if (frac < 0.8) return "Mer än halvvägs";
      return `${done} av ${total}, nästan i mål`;
    },
    tigerAlt: "Tigermaskot",
    complete: "klara",

    // ---- Goal picker ----
    goalChangeTitle: "Ändra ditt mål",
    goalAskTitle: "Vilket resultat siktar du på?",
    goalPickHint: "Välj ett mål. Din plan är klar när ett helt övningsprov når det.",
    keepGoal: (goal: number) => `Behåll ${goal}`,

    // ---- Goal strip ----
    goalLabel: "Mål",
    bestLabel: "Bästa",
    changeGoal: "Ändra",
    takeTestToSeeScore: "Gör hela provet för att se ditt resultat",
    goalHitShort: "Målet nått",
    pointsToGo: (n: number) => `${n} kvar`,

    // ---- Step stamps ----
    stampComplete: "Klart!",
    stampStartHere: "Börja här",
    stampKeepGoing: "Fortsätt",
    stampGoalHit: "Målet nått!",
    stampRetake: "Gör om",

    // ---- Phone drills ----
    phoneHeading: "Träna färdighet för färdighet · i mobilen",
    basicsStepTitle: (drillName: string) => `${drillName} [Basics]`,
    basicsSubtitleLocked: (skills: number) => `Premium · ${skills} ${skills === 1 ? "färdighet" : "färdigheter"}`,
    basicsSubtitle: (learned: number, skills: number) => `${learned}/${skills} färdigheter inlärda`,
    drillSubtitleLocked: (questions: number) => `Premium · ${questions} ${fragor(questions)}`,
    drillSubtitle: (mastered: number, total: number) => `${mastered}/${total} behärskade`,
    rowLabel: (name: string, subtitle: string) => `${name}: ${subtitle}`,
    basicsRowLabel: (drillName: string, subtitle: string) => `${drillName}, Basics: ${subtitle}`,
    drillItemLabel: (drillName: string) => `träning i ${drillName}`,

    // ---- Full practice tests ----
    desktopHeading: "Helt övningsprov · på datorn, med tidsgräns",
    testShapeQuestions: (n: number) => `${n} ${fragor(n)}`,
    testShapeSections: (n: number) => `${n} ${n === 1 ? "del" : "delar"}`,
    testSubtitle: (shape: string, length: string, adaptive: boolean, heldOut: boolean) =>
      `${shape} · ${length}${adaptive ? " · adaptivt" : ""}${heldOut ? " · aldrig i träningen" : ""}`,
    testSubtitleLocked: (shape: string, length: string, heldOut: boolean) =>
      `Premium · ${shape} · ${length}${heldOut ? " · aldrig i träningen" : ""}`,
    testInProgress: (sectionName: string, module: number) => `Pågår · ${sectionName}, modul ${module}`,
    testBestHit: (best: number, goal: number) => `Bästa ${best} · målet ${goal} nått`,
    testBestToGo: (best: number, goal: number) => `Bästa ${best} · ${goal - best} kvar till ditt mål ${goal}`,
    attempts: (n: number) => (n === 1 ? "1 försök" : `${n} försök`),
    practiceTestN: (n: number) => `Övningsprov ${n}`,

    // ---- Attempts panel ----
    attemptFirst: "Första",
    attemptNumber: (n: number) => `#${n}`,
    reviewLatest: "Granska senaste försöket",
    resumeTest: "Fortsätt provet",
    retakeTest: "Gör om provet",
    discardConfirm: "Släng provet som pågår och börja om nästa gång?",
    discardAttempt: "Släng försöket som pågår",

    // ---- Stats links ----
    statsTitle: "Din statistik",
    statsSub: "Ditt resultat i dag och var dina nästa poäng finns",
    communityTitle: "Vanliga fel",
    communitySub: (examShortName: string) => `De ${examShortName}-frågor som flest elever svarar fel på`,

    // ---- Premium ----
    otherPremiumExams: "alla andra prov på Tigertest",
    welcomePremium: "Välkommen till Premium!",
    premiumUnlocked: (examShortName: string, others: string) =>
      `All träning och alla övningsprov i ${examShortName} är upplåsta, och det är även ${others}.`,
    dismiss: "Stäng",
    unlockWithPremium: (price: string | null) => `Lås upp med Premium${price !== null ? ` · ${price}` : ""}`,
    backToDashboardLink: "Tillbaka till översikten",
    paywallItem: (examShortName: string, itemLabel: string) => `${examShortName}: ${itemLabel}`,
    drillLockBody: (blurb: string, detail: string, premiumTest: string | null, others: string) =>
      `${blurb} ${detail}, en del av Tigertest Premium tillsammans med ${premiumTest ?? "full statistik"} och ${others}.`,
    drillLockDetail: (skills: number, questions: number) =>
      `${skills} Basics-${skills === 1 ? "färdighet" : "färdigheter"} och ${questions} ${fragor(questions)} på provnivå`,
    testLockBody: (heldOut: boolean, others: string) =>
      `${heldOut ? "Det här provet finns aldrig med i träningen, så det visar hur redo du verkligen är. " : ""}Det ingår i Tigertest Premium, en enda betalning utan prenumeration, tillsammans med den sista träningen och ${others}.`,

    // ---- Drill front door (DrillOverview) ----
    backToDashboardAria: "Tillbaka till översikten",
    basicsStageTitle: "Basics",
    basicsStageSub: "Lär dig en regel och öva på den direkt. Ungefär 2 minuter per färdighet. Gratis.",
    skillLearned: "Inlärd ✓",
    quickQuestions: (n: number) => `${n} snabba ${fragor(n)}`,
    nextSkillButton: (skillName: string) => `Nästa färdighet: ${skillName}`,
    startBasicsButton: (skillName: string) => `Börja Basics: ${skillName}`,
    continueExamLevel: "Fortsätt på provnivå",
    startExamLevel: "Börja på provnivå",
  },

  results: {
    // ResultsV2: no result yet
    noResultYet: (testNumber: number) => `Inget resultat än för övningsprov ${testNumber}`,
    takeTheTest: "Gör provet",

    // ResultsV2: header and score
    eyebrow: (examShortName: string, testNumber: number) => `${examShortName} · Övningsprov ${testNumber}`,
    goalReachedEyebrow: "Övningsmålet nått",
    fullMarks: "Full pott!",
    hitYourGoal: "Du nådde ditt mål!",
    testCompleteGreen: (testNumber: number) =>
      `Övningsprov ${testNumber} är klart. Se det bli grönt i din översikt.`,
    compositeEstimate: (compositeName: string) => `${compositeName} (uppskattning)`,
    scoreLabelWithGoal: (scoreLabel: string, goal: number) => `${scoreLabel} · mål ${goal}`,
    atYourGoal: "Målet nått",
    vsLastAttempt: (delta: number) => `${delta >= 0 ? "+" : ""}${delta} jämfört med förra försöket`,
    toYourGoal: (n: number) => `${n} kvar till ditt mål`,
    seeYourProgress: "Se dina framsteg",
    reviewYourAnswers: "Granska dina svar",
    untimedNote: "Övning utan tidsgräns. Det här försöket efterliknade inte provets tidsgräns.",

    // ResultsV2: section cards
    correctOfTotal: (raw: number, total: number) => `${raw} / ${total} rätt`,
    scoreBand: (low: number, high: number) => `(${low} till ${high})`,
    moduleLine: (module: number, variant: string | undefined, raw: number, total: number) =>
      `Modul ${module}${variant ? ` (${variant === "upper" ? "svårare" : "lättare"})` : ""}: ${raw}/${total}`,
    cappedNote: (cap: number, thresholdPct: number, fullMax: number) =>
      `Modul 1 skickade dig till den lättare modul 2, som begränsar den här delen till omkring ${cap}. Få ${thresholdPct} % av modul 1 rätt för att nå den svårare vägen och hela ${fullMax}.`,

    // ResultsV2: next step
    yourNextStep: "Ditt nästa steg",
    drillTonight: (drillName: string) => `Träna ${drillName} i mobilen i kväll`,
    nextStepBody: (correct: number, total: number, domainLabel: string) =>
      `Du fick ${correct} av ${total} rätt i ${domainLabel}. Träningen tar tillbaka varje miss tills du behärskar den. Gör sedan om provet på datorn.`,
    startTheDrill: "Starta träningen",

    // ResultsV2: review list
    review: "Granskning",
    filterBySection: "Filtrera granskningen efter del",
    allSections: "Alla delar",
    filterAll: "Alla",
    filterMissed: "Fel",
    nothingToShow: "Inget att visa här. Snyggt.",
    srCorrect: "Rätt. ",
    srIncorrect: "Fel. ",
    retakeTest: (testNumber: number) => `Gör om övningsprov ${testNumber}`,
    backToDashboard: "Tillbaka till översikten",

    // StatsV2: paywall
    paywallBenefits: (examShortName: string) => [
      `Din kompletta studieplan för ${examShortName}, varje ämne rangordnat efter hur många poäng det är värt`,
      "Exakt vilka färdigheter du fortsätter att missa i varje ämne",
      "Varje fel sparat, att öva på tills det sitter",
      "Full statistik för alla prov på Tigertest",
      "En enda betalning, din för alltid",
    ],
    paywallHeadline: ["Plugga smart.", "Få högre resultat."] as [string, string],

    // StatsV2: tabs
    tabYours: "Din statistik",
    tabCommunity: "Vanliga fel",

    // StatsV2: empty state
    estimateYourScore: (examShortName: string) => `Uppskatta ditt resultat på ${examShortName}`,
    answerToEstimate: (minAnswers: number, perSection: boolean) =>
      `Svara på ${perSection ? `${minAnswers} frågor i varje del` : `${minAnswers} frågor`}, så uppskattar vi ditt resultat och visar var dina nästa poäng finns.`,
    startADrill: "Starta en träning",

    // StatsV2: score today
    estimatedScore: (examShortName: string) => `Uppskattat resultat på ${examShortName}`,
    atYourGoalOf: (goal: string) => `Ditt mål på ${goal} är nått`,
    goalToGo: (goal: string, gap: number, percent: boolean) => `Mål ${goal} · ${percent ? `${gap} poäng` : gap} kvar`,
    sectionToGo: (n: number) => `${n} kvar`,
    neededOne: (n: number) => `${n} ${fragor(n)} till för att se ditt resultat.`,
    neededSections: (parts: { needed: number; sectionShortName: string }[]) =>
      `${parts.map((p) => `${p.needed} ${fragor(p.needed)} till i ${p.sectionShortName}`).join(" och ")} för att se ditt resultat.`,
    neededEach: (minAnswers: number) => `Svara på ${minAnswers} frågor i varje del för att se ditt resultat.`,
    estimateFrom: (answered: number) =>
      `En uppskattning utifrån ${answered === 1 ? "den övningsfråga" : `de ${answered} övningsfrågor`} du har svarat på (första försöket), inte ett officiellt resultat.`,
    lastPracticeTest: "Ditt senaste övningsprov:",

    // StatsV2: fastest points
    fastestPoints: "Dina snabbaste poäng",
    ifEachTopic: (targetPct: number) => `uppskattat, om du når ${targetPct} % i varje ämne`,
    noPlanYet: "Svara på några frågor till så dyker din plan upp här.",
    gainAbout: (n: number, percent: boolean) => (percent ? `cirka +${n} %` : `cirka +${n} p`),
    pointsLabel: (percent: boolean) => (percent ? "poäng" : "p"),
    moreTopicsWorth: (count: number, gain: number, percent: boolean) =>
      `${count} ${count === 1 ? "ämne till" : "ämnen till"} värda uppskattningsvis ${percent ? `+${gain} %` : `+${gain} p`}`,
    moreTopics: (count: number) => `${count} ${count === 1 ? "ämne till" : "ämnen till"} i din plan`,
    planLockSubtitle: "Se varje ämne rangordnat efter hur många poäng det är värt, och exakt vilka färdigheter du missar",
    unlockPlan: (price: string) => `Lås upp hela planen · ${price}`,
    notTriedYet: "Inte provat än",
    topicAccuracy: (accPct: number, answered: number) => `${accPct} % rätt på första försöket · ${answered} besvarade`,
    missedOf: (missed: number, answered: number) => `${missed} fel av ${answered}`,
    practiceDrill: (drillName: string) => `Träna ${drillName}`,

    // StatsV2: practice tests
    practiceTests: "Övningsprov",
    takeFullTest: "Gör ett helt övningsprov för att få ett riktigt resultat med tidsgräns.",
    practiceTestN: (testNumber: number) => `Övningsprov ${testNumber}`,

    // StatsV2: mistake notebook
    mistakeNotebook: "Felanteckningar",
    questionCount: (n: number) => `${n} ${fragor(n)}`,
    noMistakesYet: "Inget än. Varje fråga du svarar fel på hamnar här så att du kan försöka igen.",
    mistakesIntro: "Alla frågor du har svarat fel på. Tryck på en för att försöka igen.",
    missLabel: (n: number) => (n === 1 ? "miss" : "missar"),
    masteredSince: " · behärskad sedan dess",
    moreMistakes: (n: number) => `${n} ${n === 1 ? "sparat fel till" : "sparade fel till"}`,
    mistakesLockSubtitle: "Försök igen med varje fråga du har missat tills den sitter",
    unlockPremiumFor: (price: string) => `Lås upp Premium för ${price}`,

    // StatsV2: common mistakes
    commonMistakes: "Vanliga fel",
    commonMistakesCard: (examShortName: string) => `De ${examShortName}-frågor som flest elever svarar fel på`,
    notEnoughData: "Inte tillräckligt med data än. Titta in snart igen.",
    getThisWrong: "svarar fel",
    communityIntro: (examShortName: string) => `De ${examShortName}-frågor som elever missar mest`,
    basedOnAnswersFrom: ", baserat på svar från",
    realTestTakers: (count: string) => `${count} riktiga provdeltagare`,
    peopleGotWrong: (wrong: number, total: number) => `${wrong} av ${total} personer svarade fel på den här`,
    moreLocked: (n: number) => `${n} ${n === 1 ? "låst fråga till" : "låsta frågor till"}`,
    upgradeFullList: "Uppgradera för att se hela listan",
    unlockWithPremium: "Lås upp med Premium",

    // V2StatsRow
    check: "Kontrollera",
    tryAgain: "Försök igen",
  },

  drill: {
    // ---- Exam-level drill (DrillRunner) ----
    lockDetail: (questions: number) => `${questions} ${fragor(questions)}`,
    masteredCount: (mastered: number, total: number) => `${mastered} av ${total} behärskade`,
    toRetry: (n: number) => ` · ${n} att göra om`,
    resetAria: "Nollställ den här träningen",
    masteredEyebrow: "Träningen behärskad",
    masteredTitle: "Varje fråga. Behärskad.",
    masteredTitleChild: "Du klarade det! Allt är grönt!",
    masteredDescription: (drill: string, childFriendly: boolean) =>
      `Du har svarat rätt på varje fråga i ${drill}. ${childFriendly ? "Titta så långt du har kommit!" : "Din träning har lönat sig."}`,
    masteredDetail: (total: number, drill: string) => `${total} av ${total} frågor behärskade · ${drill}`,
    seeProgress: "Se dina framsteg",
    practiseAgain: "Öva igen",
    brushUpHeading: "Fräscha upp grunderna",
    brushUpListen: "Lyssna på genomgången på 30 sekunder eller läs regeln",
    brushUpRead: "Regeln, knepet och två exempel",
    tapToCheck: "Tryck på ett svar för att kontrollera det",
    check: "Kontrollera",
    resetTitle: "Nollställa den här träningen?",
    resetBody: (drill: string) => `Dina framsteg i ${drill} börjar om. Dina provresultat påverkas inte.`,
    reset: "Nollställ",

    // ---- Basics run (BasicsRunner) ----
    basicsLockDetail: (skills: number) => `${skills} Basics-${skills === 1 ? "färdighet" : "färdigheter"}`,
    tryAgainLabel: "Försök igen",
    keepGoing: "Jag förstår, fortsätt",
    tryQuestions: (n: number) => `Jag förstår, prova ${n} ${fragor(n)}`,
    walkInstead: "Gå igenom det steg för steg i stället",
    watchInstead: "Titta i stället · 30 sekunder",
    basicsSub: (drill: string) => `Basics · ${drill}`,
    oneMoreLook: "En titt till",
    learnIt: "Lär dig den · 20 sekunder",
    reviewIntro: "Den var knepig. Här är regeln igen före nästa fråga.",
    basicsCompleteEyebrow: "Basics klara",
    skillLearnedEyebrow: "Färdighet inlärd",
    allBasicsTitleChild: "Alla dina grunder är gröna!",
    allBasicsTitle: "En stark grund, klar.",
    oneMoreSkillChild: "En färdighet till är grön!",
    allBasicsDescription: (n: number, drill: string, childFriendly: boolean) =>
      `Du har lärt dig ${n === 1 ? "färdigheten" : `alla ${n} färdigheter`} i ${drill}. ${childFriendly ? "Nu väntar övningsfrågorna." : n === 1 ? "Du är redo att använda den." : "Du är redo att använda dem."}`,
    skillLearnedChild: (skill: string, revisit: boolean) =>
      `Du har lärt dig ${skill}. ${revisit ? "Du kan öva på den igen när du vill." : "Ännu ett steg framåt."}`,
    revisitDescription: "Du har redan lärt dig den här färdigheten. Kom tillbaka när du vill för att fräscha upp den.",
    retriedDescription: "Du tog dig igenom varje fråga, även dem som krävde ett nytt försök.",
    perfectDescription: "Varje fråga rätt på första försöket.",
    allBasicsDetail: (n: number, drill: string) => `${n} av ${n} Basics-färdigheter inlärda · ${drill}`,
    firstTryDetail: (firstTry: number, outOf: number) => `${firstTry} av ${outOf} rätt på första försöket`,
    retriedDetail: (n: number) => `${n} rättade vid ett nytt försök`,
    nextSkill: (skill: string) => `Nästa färdighet: ${skill}`,
    tryPracticeChild: "Prova övningsfrågorna",
    tryExamLevel: "Prova frågor på provnivå",
    learnAgain: "Lär dig den igen",
    backToDrillAria: "Tillbaka till träningen",
    rightCount: (right: number, total: number) => `${right} av ${total} rätt`,
    comingBack: (n: number) => ` · ${n} kommer tillbaka`,
    rule: "Regel",
    backForAnother: "Ett nytt försök",
    rightAnswerSr: " (rätt svar)",
    yourAnswerSr: " (ditt svar)",
    right: "Rätt",
    notQuite: "Inte riktigt",
    gotItThisTime: "Rätt den här gången",
    theTrick: "Knepet:",
    walkAgain: "Gå igenom det steg för steg igen",
    watchExplainer: "Titta på genomgången · 30 sekunder",
    comesBack: "Den här frågan kommer tillbaka om en minut.",
    finish: "Klar",
    tapAnswer: "Tryck på ett svar",
    whichPunctuation: "Vilket skiljetecken hör hemma i luckan?",
    whichWord: "Vilket ord hör hemma i luckan?",
    punctuationNames: { ";": "semikolon", ",": "komma", ":": "kolon", "": "inget skiljetecken" } as Record<string, string>,

    // ---- Rule card and sheet ----
    eli5Label: "ELI5 · förklarat som för en femåring",
    eli5Toggle: "Fortfarande förvirrad? ELI5",
    theRule: "Regeln",
    trickLabel: "Knepet",
    examples: "Exempel",
    ruleSheetAria: "Regeln",
    backToQuestion: "Tillbaka till frågan",
    walkStepByStep: "Gå igenom det steg för steg",
    listenInstead: "Lyssna i stället · 30 sekunder",

    // ---- Walkthrough ----
    walkthroughAria: (skill: string) => `${skill}: steg för steg`,
    closeWalkthroughAria: "Stäng steg-för-steg-genomgången",
    walkStep: (step: number, total: number) => `Steg för steg · steg ${step} av ${total}`,
    readIt: "Läs den",
    rightSr: " (rätt)",
    notThisOneSr: " (inte den här)",
    notThatOne: "Inte den. Försök igen.",
    solveOnBoard: "Lös det på tavlan",
    skip: "Hoppa över",

    // ---- Explainer ----
    beatLabels: { rule: "Regeln", trick: "Knepet", bad: "Fungerar inte", good: "Fungerar", work1: "Löst exempel", work2: "Ett till", close: "" },
    playCopySentence: "Regeln, knepet, en mening som bryter mot den och en som följer den. Slå på ljudet.",
    playCopyWorked: "Regeln, knepet och sedan två exempel lösta steg för steg. Slå på ljudet.",
    seconds: (n: number) => `${n} ${n === 1 ? "sekund" : "sekunder"}`,
    halfMinute: "en halv minut",
    explainerSilent: (n: number) => `Genomgång · ${n} sekunder · utan ljud`,
    explainerLength: (length: string) => `Genomgång · ${length}`,
    explainerAria: (skill: string) => `${skill}: genomgång`,
    closeExplainerAria: "Stäng genomgången",
    jumpTo: (label: string) => `Hoppa till ${label}`,
    pausedTap: "Pausad · tryck för att fortsätta",
    playTitle: (skill: string, length: string) => `${skill}, på ${length}.`,
    starting: "Startar...",
    play: "Spela",
    pause: "Pausa",
    replay: "Spela igen",
    loadingSound: "Laddar ljud...",
    tapToPause: "Tryck var som helst för att pausa",
    breaksRule: "Bryter mot regeln",
    followsRule: "Följer regeln",
    wrongWordSr: " (fel ord)",
    fixedSr: " (rättat)",

    // ---- Drag boards (play/*) ----
    tryAnotherOne: "Prova en till",
    solveX: {
      stage0: (loose: string) =>
        `Dra ${loose} över likhetstecknet (eller tryck på det). På andra sidan byter det tecken.`,
      stage1: (c: string, term: string) => `Tryck nu på ${c} ${term} för att räkna ut det.`,
      stage2: (a: number, right: string) =>
        `x sitter fortfarande ihop med ${a}. Dra ${a} under ${right} (eller tryck på den) för att dividera.`,
      stage3: "Tryck på bråket för att räkna ut det.",
      solved: (answer: number, a: number, b: string, c: number) => `x = ${answer}. Kontroll: ${a} × ${answer} ${b} = ${c} ✓`,
      wrongCoefFirst: (loose: string) => `Inte än. Gör det i omvänd ordning: flytta först det fristående ${loose}.`,
      wrongXFirst: (loose: string) => `Låt x vara kvar. Flytta bort ${loose} från det.`,
      wrongCFirst: (loose: string) => `Börja med ${loose} till vänster.`,
      wrongXSecond: (a: number) => `x stannar. Flytta ${a} som sitter ihop med det.`,
      wrongCSecond: (a: number) => `Dra ${a} i stället. Den sitter ihop med x genom multiplikation.`,
      moveAria: (term: string) => `${term}. Flytta den till andra sidan av likhetstecknet.`,
      divideAria: (term: string) => `${term}. Dividera båda sidor med ${term}.`,
      workSubtractAria: (c: string, term: string) => `${c} ${term}. Räkna ut det.`,
      workDivideAria: (c: string, a: number) => `${c} delat med ${a}. Räkna ut det.`,
    },
  },
};

registerV2Ui("sv", SV);
