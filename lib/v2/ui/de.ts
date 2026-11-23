// German v2 interface strings (machine translation). See lib/v2/ui/index.ts.
import { registerV2Ui, type V2UiTranslation } from "./registry";

/** "Frage" / "Fragen" for a count. */
const fragen = (n: number) => (n === 1 ? "Frage" : "Fragen");

export const DE: V2UiTranslation = {
  common: {
    loading: "Wird geladen...",
    back: "Zurück",
    next: "Weiter",
    close: "Schließen",
    continue: "Weiter",
    cancel: "Abbrechen",
  },

  runner: {
    // ExamRunner: loading and chrome
    loadingTest: "Dein Test wird geladen...",
    exitTest: "Test verlassen",
    moduleTitle: (section: string, module: number) => `${section} · Modul ${module}`,

    // Intro screen
    sectionOf: (n: number, total: number) => `Teil ${n} von ${total}`,
    questionCount: (n: number) => `${n} ${fragen(n)}`,
    timeLeft: (clock: string) => `noch ${clock}`,
    untimed: "Ohne Zeitlimit",
    adaptiveHarder: "Adaptiv: schwereres Modul",
    adaptiveEasier: "Adaptiv: leichteres Modul",
    calculatorAllowed: "Taschenrechner erlaubt",
    noCalculator: "Kein Taschenrechner",
    noGoingBack: "Kein Zurück",
    untimedPractice: "Übung ohne Zeitlimit (wird mit deinem Ergebnis vermerkt)",
    halfLengthPractice: "Halbe Länge (halb so viele Fragen, halbe Zeit)",
    directions: "Anleitung",
    clockStartsLinear: "Die Zeit läuft, sobald du auf Start tippst.",
    clockStartsReview: "Die Zeit läuft, sobald du auf Start tippst, und läuft auf der Übersichtsseite weiter.",
    noClock: "In diesem Teil gibt es keine Uhr. Nimm dir die Zeit, die du brauchst.",
    linearRule: "Beantworte jede Frage, bevor du weitergehst. Wie im echten Computertest kannst du nicht zurück.",
    freeRule: "Spring frei zwischen den Fragen hin und her. Markiere alle, die du dir noch einmal ansehen willst.",
    autoSubmit: "Wenn die Zeit abläuft, wird der Teil automatisch abgegeben.",
    resumeModule: "Modul fortsetzen",
    startModule: "Modul starten",

    // Break screen
    breakTitle: "Pause",
    breakDefault: (minutes: number) =>
      `Im echten Test hast du zwischen den Teilen ${minutes} ${minutes === 1 ? "Minute" : "Minuten"} Pause.`,
    breakAdvice: (section: string) => `Steh auf, trink etwas Wasser und mach dann mit ${section} weiter.`,
    continueTo: (section: string) => `Weiter mit ${section}`,

    // Review screen
    checkYourWork: "Prüf deine Antworten",
    reviewSummary: (answered: number, total: number, flagged: number) =>
      `${answered} von ${total} beantwortet${flagged ? `, ${flagged} markiert` : ""}. Tippe auf eine Nummer, um zurückzugehen.`,
    submitModule: "Modul abgeben",

    // Question screen
    calculator: "Taschenrechner",
    referenceSheet: "Formelblatt",
    reference: "Formeln",
    eliminateChoices: "Antworten ausschließen",
    questionNumber: (n: number) => `Frage ${n}`,
    ofTotal: (total: number) => `von ${total}`,
    flagged: "Markiert",
    flagForReview: "Zum Überprüfen markieren",
    submitSection: "Teil abgeben",
    previousQuestion: "Vorherige Frage",
    nextQuestion: "Nächste Frage",
    answeredCount: (n: number) => `${n} beantwortet`,
    paletteButtonLabel: (current: number, total: number, answered: number) =>
      `Fragen: ${current} / ${total}, ${answered} beantwortet`,
    review: "Überprüfen",
    questions: "Fragen",
    goToReview: "Zur Übersichtsseite",

    // Question palette
    paletteItemLabel: (n: number, answered: boolean, flagged: boolean) =>
      `Frage ${n}${answered ? ", beantwortet" : ", unbeantwortet"}${flagged ? ", markiert" : ""}`,
    legendAnswered: "Beantwortet",
    legendUnanswered: "Unbeantwortet",
    legendFlagged: "Markiert",

    // Confirm dialogs
    unansweredCount: (n: number) => `${n} unbeantwortet`,
    submitAnywayBody: "Raten kostet keine Punkte. Trotzdem abgeben?",
    submit: "Abgeben",
    leaveTitle: "Test verlassen?",
    leave: "Verlassen",
    leaveBodyIntro: "Dein Fortschritt ist gespeichert und die Uhr hält an. Du kannst jederzeit in der Übersicht weitermachen.",
    leaveBodyBreak: "Dein Fortschritt ist gespeichert. Du kannst jederzeit in der Übersicht weitermachen.",
    leaveBodyReview: "Dein Fortschritt ist gespeichert und die Uhr hält an.",
    leaveBodyQuestions:
      "Deine Antworten sind gespeichert und die Uhr hält an, bis du zurückkommst. Der echte Test hält nie an, also mach ihn möglichst in einem Durchgang fertig.",

    // Timer
    timeUp: "Die Zeit ist um.",
    oneMinuteLeft: "Noch eine Minute oder weniger.",
    fiveMinutesLeft: "Noch fünf Minuten oder weniger.",
    showTimer: "Timer anzeigen",
    timerRemaining: (clock: string, hidden: boolean) => `Noch ${clock}. Timer ${hidden ? "anzeigen" : "ausblenden"}`,
    timer: "Timer",

    // Calculator
    calcError: "Fehler",
    calcExpression: "Eingabe im Taschenrechner",
    calcDelete: "Letztes Zeichen löschen",
    calcClear: "Taschenrechner leeren",
    calcHint: "Winkelfunktionen rechnen in Grad. Tippe direkt oder nutze die Tasten.",

    // Figure
    openFigure: (alt: string) => `Abbildung in voller Größe öffnen: ${alt}`,
    tapToEnlarge: "Zum Vergrößern tippen",
    figureFullSize: "Abbildung in voller Größe",

    // QuestionView
    passage: "Text",
    hidePassage: "Text ausblenden",
    showPassage: "Text anzeigen",
    highlightHint: "Tippe auf jede Wortgruppe, um sie zu markieren; tippe noch einmal, um die Markierung zu entfernen.",
    clozeHint: "Wähle für jede Lücke eine Option.",
    yourAnswer: "Deine Antwort",
    numericPlaceholderWhole: "Gib eine Zahl ein",
    numericPlaceholder: "z. B. 12, 3/4, -0.5",
    numericInvalid: "Gib eine ganze Zahl, eine Dezimalzahl mit Punkt oder einen Bruch wie 3/4 ein.",
    numericHelp: "Ziffern, ein Punkt für Dezimalstellen, ein Schrägstrich für Brüche und ein Minuszeichen am Anfang.",
    correctAnswerIs: (answer: string) => `Richtige Antwort: ${answer}`,
    srEliminated: "Ausgeschlossen. ",
    srCorrectAnswer: "Richtige Antwort",
    srIncorrectAnswer: "Falsche Antwort",
    restoreChoice: (letter: string) => `Antwort ${letter} wiederherstellen`,
    eliminateChoice: (letter: string) => `Antwort ${letter} ausschließen`,
    undo: "Rückgängig",
    selectedCap: (n: number) => `${n} ausgewählt. Tippe eine an, um sie zu entfernen, bevor du eine andere wählst.`,
    selectN: (n: number) => `Wähle ${n}.`,
    selectAll: "Wähle alle zutreffenden Antworten.",
    srCorrect: "Richtig. ",
    srNotQuite: "Falsch. ",
    correct: "Richtig!",
    notQuite: "Falsch",
    skill: (skill: string) => `Fertigkeit: ${skill}`,

    // Order input
    stepsPlaced: (placed: number, total: number) => `${placed} von ${total} Schritten eingeordnet.`,
    yourOrder: "Deine Reihenfolge",
    tapNextStep: "Tippe unten auf den nächsten Schritt",
    correctPosition: "Richtige Stelle",
    incorrectPosition: "Falsche Stelle",
    stepRevealLabel: (n: number, text: string, ok: boolean) => `Schritt ${n}: ${text}. ${ok ? "Richtige Stelle" : "Falsche Stelle"}`,
    removeStep: (n: number, text: string) => `Schritt ${n} entfernen: ${text}`,
    steps: "Schritte",
    takeBackHint: "Tippe auf einen eingeordneten Schritt, um ihn zurückzunehmen.",
    correctOrder: "Richtige Reihenfolge",

    // Bowtie and cloze inputs
    chooseN: (n: number) => `(wähle ${n})`,
    blank: (n: number) => `Lücke ${n}`,
    selectPlaceholder: "Auswählen...",
  },

  dashboard: {
    // ---- Hero ----
    heroTitle: (done: number, total: number, completedTitle?: string): string => {
      if (done === 0) return `Schaff alle ${total} Schritte`;
      if (done === total) return completedTitle ?? "Du bist bereit";
      if (done === total - 1) return "Noch einer";
      if (done === 1) return `Guter Anfang. 1 von ${total} geschafft`;
      const frac = done / total;
      if (frac < 0.45) return `${done} von ${total} geschafft`;
      if (frac < 0.55) return "Halbzeit";
      if (frac < 0.8) return "Mehr als die Hälfte";
      return `${done} von ${total}, fast geschafft`;
    },
    tigerAlt: "Tiger-Maskottchen",
    complete: "geschafft",

    // ---- Goal picker ----
    goalChangeTitle: "Ändere dein Ziel",
    goalAskTitle: "Welche Punktzahl peilst du an?",
    goalPickHint: "Wähle ein Ziel. Dein Plan ist erledigt, wenn ein vollständiger Übungstest es erreicht.",
    keepGoal: (goal: number) => `${goal} behalten`,

    // ---- Goal strip ----
    goalLabel: "Ziel",
    bestLabel: "Bestwert",
    changeGoal: "Ändern",
    takeTestToSeeScore: "Mach den ganzen Test, um deine Punktzahl zu sehen",
    goalHitShort: "Ziel erreicht",
    pointsToGo: (n: number) => `noch ${n}`,

    // ---- Step stamps ----
    stampComplete: "Geschafft!",
    stampStartHere: "Hier starten",
    stampKeepGoing: "Weiter so",
    stampGoalHit: "Ziel erreicht!",
    stampRetake: "Noch mal machen",

    // ---- Phone drills ----
    phoneHeading: "Nach Fertigkeiten üben · auf dem Handy",
    basicsStepTitle: (drillName: string) => `${drillName} [Basics]`,
    basicsSubtitleLocked: (skills: number) => `Premium · ${skills} ${skills === 1 ? "Fertigkeit" : "Fertigkeiten"}`,
    basicsSubtitle: (learned: number, skills: number) => `${learned}/${skills} Fertigkeiten gelernt`,
    drillSubtitleLocked: (questions: number) => `Premium · ${questions} ${fragen(questions)}`,
    drillSubtitle: (mastered: number, total: number) => `${mastered}/${total} gemeistert`,
    rowLabel: (name: string, subtitle: string) => `${name}: ${subtitle}`,
    basicsRowLabel: (drillName: string, subtitle: string) => `${drillName}, Basics: ${subtitle}`,
    drillItemLabel: (drillName: string) => `Training ${drillName}`,

    // ---- Full practice tests ----
    desktopHeading: "Vollständiger Übungstest · am Computer, mit Zeitlimit",
    testShapeQuestions: (n: number) => `${n} ${fragen(n)}`,
    testShapeSections: (n: number) => `${n} ${n === 1 ? "Teil" : "Teile"}`,
    testSubtitle: (shape: string, length: string, adaptive: boolean, heldOut: boolean) =>
      `${shape} · ${length}${adaptive ? " · adaptiv" : ""}${heldOut ? " · nie im Training" : ""}`,
    testSubtitleLocked: (shape: string, length: string, heldOut: boolean) =>
      `Premium · ${shape} · ${length}${heldOut ? " · nie im Training" : ""}`,
    testInProgress: (sectionName: string, module: number) => `Läuft · ${sectionName}, Modul ${module}`,
    testBestHit: (best: number, goal: number) => `Bestwert ${best} · Ziel ${goal} erreicht`,
    testBestToGo: (best: number, goal: number) => `Bestwert ${best} · noch ${goal - best} bis zu deinem Ziel von ${goal}`,
    attempts: (n: number) => (n === 1 ? "1 Versuch" : `${n} Versuche`),
    practiceTestN: (n: number) => `Übungstest ${n}`,

    // ---- Attempts panel ----
    attemptFirst: "Erster",
    attemptNumber: (n: number) => `#${n}`,
    reviewLatest: "Letzten Versuch ansehen",
    resumeTest: "Test fortsetzen",
    retakeTest: "Test wiederholen",
    discardConfirm: "Den laufenden Test verwerfen und nächstes Mal neu beginnen?",
    discardAttempt: "Laufenden Versuch verwerfen",

    // ---- Stats links ----
    statsTitle: "Deine Statistiken",
    statsSub: "Deine Punktzahl heute und wo deine nächsten Punkte liegen",
    communityTitle: "Häufige Fehler",
    communitySub: (examShortName: string) => `Die ${examShortName}-Fragen, die die meisten falsch beantworten`,

    // ---- Premium ----
    otherPremiumExams: "jeder andere Test auf Tigertest",
    welcomePremium: "Willkommen bei Premium!",
    premiumUnlocked: (examShortName: string, others: string) =>
      `Jedes ${examShortName}-Training und jeder Übungstest ist freigeschaltet, ebenso ${others}.`,
    dismiss: "Schließen",
    unlockWithPremium: (price: string | null) => `Mit Premium freischalten${price !== null ? ` · ${price}` : ""}`,
    backToDashboardLink: "Zurück zur Übersicht",
    paywallItem: (examShortName: string, itemLabel: string) => `${examShortName}: ${itemLabel}`,
    drillLockBody: (blurb: string, detail: string, premiumTest: string | null, others: string) =>
      `${blurb} ${detail}: Teil von Tigertest Premium, zusammen mit ${premiumTest ?? "den vollständigen Statistiken"} und ${others}.`,
    drillLockDetail: (skills: number, questions: number) =>
      `${skills} Basics-${skills === 1 ? "Fertigkeit" : "Fertigkeiten"} und ${questions} ${fragen(questions)} auf Prüfungsniveau`,
    testLockBody: (heldOut: boolean, others: string) =>
      `${heldOut ? "Dieser Test kommt im Training nie vor, deshalb zeigt er, wie bereit du wirklich bist. " : ""}Er gehört zu Tigertest Premium, eine einmalige Zahlung ohne Abo, zusammen mit den letzten Trainings und ${others}.`,

    // ---- Drill front door (DrillOverview) ----
    backToDashboardAria: "Zurück zur Übersicht",
    basicsStageTitle: "Basics",
    basicsStageSub: "Lerne eine Regel und übe sie sofort. Etwa 2 Minuten pro Fertigkeit. Kostenlos.",
    skillLearned: "Gelernt ✓",
    quickQuestions: (n: number) => `${n} kurze ${fragen(n)}`,
    nextSkillButton: (skillName: string) => `Nächste Fertigkeit: ${skillName}`,
    startBasicsButton: (skillName: string) => `Basics starten: ${skillName}`,
    continueExamLevel: "Prüfungsniveau fortsetzen",
    startExamLevel: "Prüfungsniveau starten",
  },

  results: {
    // ResultsV2: no result yet
    noResultYet: (testNumber: number) => `Noch kein Ergebnis für Übungstest ${testNumber}`,
    takeTheTest: "Test machen",

    // ResultsV2: header and score
    eyebrow: (examShortName: string, testNumber: number) => `${examShortName} · Übungstest ${testNumber}`,
    goalReachedEyebrow: "Übungsziel erreicht",
    fullMarks: "Volle Punktzahl!",
    hitYourGoal: "Du hast dein Ziel erreicht!",
    testCompleteGreen: (testNumber: number) =>
      `Übungstest ${testNumber} ist geschafft. Sieh zu, wie er in deiner Übersicht grün wird.`,
    compositeEstimate: (compositeName: string) => `${compositeName} (Schätzung)`,
    scoreLabelWithGoal: (scoreLabel: string, goal: number) => `${scoreLabel} · Ziel ${goal}`,
    atYourGoal: "Ziel erreicht",
    vsLastAttempt: (delta: number) => `${delta >= 0 ? "+" : ""}${delta} gegenüber dem letzten Versuch`,
    toYourGoal: (n: number) => `noch ${n} bis zu deinem Ziel`,
    seeYourProgress: "Deinen Fortschritt ansehen",
    reviewYourAnswers: "Deine Antworten ansehen",
    untimedNote: "Übung ohne Zeitlimit. Dieser Versuch hat das Zeitlimit der Prüfung nicht nachgestellt.",
    halfLengthNote: "Halbe Länge. Die Abschnittsergebnisse sind aus der Hälfte der Fragen geschätzt.",

    // ResultsV2: section cards
    correctOfTotal: (raw: number, total: number) => `${raw} / ${total} richtig`,
    scoreBand: (low: number, high: number) => `(${low} bis ${high})`,
    moduleLine: (module: number, variant: string | undefined, raw: number, total: number) =>
      `Modul ${module}${variant ? ` (${variant === "upper" ? "schwerer" : "leichter"})` : ""}: ${raw}/${total}`,
    cappedNote: (cap: number, thresholdPct: number, fullMax: number) =>
      `Modul 1 hat dich zum leichteren Modul 2 geschickt, das diesen Teil bei etwa ${cap} deckelt. Beantworte ${thresholdPct} % von Modul 1 richtig, um auf den schwereren Weg und bis zu ${fullMax} zu kommen.`,

    // ResultsV2: next step
    yourNextStep: "Dein nächster Schritt",
    drillTonight: (drillName: string) => `Übe heute Abend ${drillName} auf dem Handy`,
    nextStepBody: (correct: number, total: number, domainLabel: string) =>
      `Du hattest ${correct} von ${total} in ${domainLabel} richtig. Das Training bringt jeden Fehler zurück, bis du ihn beherrschst. Wiederhole dann den Test am Computer.`,
    startTheDrill: "Training starten",

    // ResultsV2: review list
    review: "Überprüfen",
    filterBySection: "Überprüfung nach Teil filtern",
    allSections: "Alle Teile",
    filterAll: "Alle",
    filterMissed: "Falsch",
    nothingToShow: "Hier gibt es nichts zu sehen. Gut gemacht.",
    srCorrect: "Richtig. ",
    srIncorrect: "Falsch. ",
    retakeTest: (testNumber: number) => `Übungstest ${testNumber} wiederholen`,
    backToDashboard: "Zurück zur Übersicht",

    // StatsV2: paywall
    paywallBenefits: (examShortName: string) => [
      `Dein ganzer ${examShortName}-Lernplan, jedes Thema danach sortiert, wie viele Punkte es bringt`,
      "Genau die Fertigkeiten, die du in jedem Thema immer wieder falsch machst",
      "Jeder Fehler gespeichert, zum Wiederholen, bis er sitzt",
      "Vollständige Statistiken zu jeder Prüfung auf Tigertest",
      "Einmal zahlen, für immer deins",
    ],
    paywallHeadline: ["Klüger lernen.", "Mehr Punkte holen."] as [string, string],

    // StatsV2: tabs
    tabYours: "Deine Statistiken",
    tabCommunity: "Häufige Fehler",

    // StatsV2: empty state
    estimateYourScore: (examShortName: string) => `Schätze deine ${examShortName}-Punktzahl`,
    answerToEstimate: (minAnswers: number, perSection: boolean) =>
      `Beantworte ${perSection ? `in jedem Teil ${minAnswers} Fragen` : `${minAnswers} Fragen`}, dann schätzen wir deine Punktzahl und zeigen dir, wo deine nächsten Punkte liegen.`,
    startADrill: "Ein Training starten",

    // StatsV2: score today
    estimatedScore: (examShortName: string) => `Geschätzte ${examShortName}-Punktzahl`,
    atYourGoalOf: (goal: string) => `Dein Ziel von ${goal} ist erreicht`,
    goalToGo: (goal: string, gap: number, percent: boolean) => `Ziel ${goal} · noch ${percent ? `${gap} Punkte` : gap}`,
    sectionToGo: (n: number) => `noch ${n}`,
    neededOne: (n: number) => `Noch ${n} ${fragen(n)}, dann siehst du deine Punktzahl.`,
    neededSections: (parts: { needed: number; sectionShortName: string }[]) =>
      `Noch ${parts.map((p) => `${p.needed} ${fragen(p.needed)} in ${p.sectionShortName}`).join(" und ")}, dann siehst du deine Punktzahl.`,
    neededEach: (minAnswers: number) => `Beantworte in jedem Teil ${minAnswers} Fragen, um deine Punktzahl zu sehen.`,
    estimateFrom: (answered: number) =>
      `Eine Schätzung aus ${answered === 1 ? "der Übungsfrage, die du beantwortet hast" : `den ${answered} Übungsfragen, die du beantwortet hast`} (erster Versuch), keine offizielle Punktzahl.`,
    lastPracticeTest: "Dein letzter Übungstest:",

    // StatsV2: fastest points
    fastestPoints: "Deine schnellsten Punkte",
    ifEachTopic: (targetPct: number) => `geschätzt, wenn du jedes Thema auf ${targetPct} % bringst`,
    noPlanYet: "Beantworte noch ein paar Fragen, dann erscheint hier dein Plan.",
    gainAbout: (n: number, percent: boolean) => (percent ? `etwa +${n} %` : `etwa +${n} Pkt.`),
    pointsLabel: (percent: boolean) => (percent ? "Punkte" : "Pkt."),
    moreTopicsWorth: (count: number, gain: number, percent: boolean) =>
      `${count} ${count === 1 ? "weiteres Thema" : "weitere Themen"} mit geschätzt ${percent ? `+${gain} %` : `+${gain} Pkt.`}`,
    moreTopics: (count: number) => `${count} ${count === 1 ? "weiteres Thema" : "weitere Themen"} in deinem Plan`,
    planLockSubtitle: "Sieh jedes Thema danach sortiert, wie viele Punkte es bringt, und genau die Fertigkeiten, die dir fehlen",
    unlockPlan: (price: string) => `Ganzen Plan freischalten · ${price}`,
    notTriedYet: "Noch nicht versucht",
    topicAccuracy: (accPct: number, answered: number) => `${accPct} % beim ersten Versuch richtig · ${answered} beantwortet`,
    missedOf: (missed: number, answered: number) => `${missed} von ${answered} falsch`,
    practiceDrill: (drillName: string) => `${drillName} üben`,

    // StatsV2: practice tests
    practiceTests: "Übungstests",
    takeFullTest: "Mach einen vollständigen Übungstest für eine echte Punktzahl mit Zeitlimit.",
    practiceTestN: (testNumber: number) => `Übungstest ${testNumber}`,

    // StatsV2: mistake notebook
    mistakeNotebook: "Fehlerheft",
    questionCount: (n: number) => `${n} ${fragen(n)}`,
    noMistakesYet: "Noch nichts. Jede Frage, die du falsch beantwortest, landet hier, damit du sie wiederholen kannst.",
    mistakesIntro: "Alle Fragen, die du falsch hattest. Tippe eine an, um es noch einmal zu versuchen.",
    missLabel: () => "Fehler",
    masteredSince: " · inzwischen gemeistert",
    moreMistakes: (n: number) => `${n} weitere gespeicherte Fehler`,
    mistakesLockSubtitle: "Wiederhole jede falsch beantwortete Frage, bis sie sitzt",
    unlockPremiumFor: (price: string) => `Premium für ${price} freischalten`,

    // StatsV2: common mistakes
    commonMistakes: "Häufige Fehler",
    commonMistakesCard: (examShortName: string) => `Die ${examShortName}-Fragen, die die meisten falsch beantworten`,
    notEnoughData: "Noch nicht genug Daten. Schau bald wieder vorbei.",
    getThisWrong: "liegen falsch",
    communityIntro: (examShortName: string) => `Die ${examShortName}-Fragen, die am häufigsten falsch beantwortet werden`,
    basedOnAnswersFrom: ", basierend auf den Antworten von",
    realTestTakers: (count: string) => `${count} echten Prüflingen`,
    peopleGotWrong: (wrong: number, total: number) => `${wrong} von ${total} Personen lagen hier falsch`,
    moreLocked: (n: number) => `${n} weitere ${fragen(n)} gesperrt`,
    upgradeFullList: "Upgrade, um die ganze Liste zu sehen",
    unlockWithPremium: "Mit Premium freischalten",

    // V2StatsRow
    check: "Prüfen",
    tryAgain: "Nochmal versuchen",
  },

  drill: {
    // ---- Exam-level drill (DrillRunner) ----
    lockDetail: (questions: number) => `${questions} ${fragen(questions)}`,
    masteredCount: (mastered: number, total: number) => `${mastered} von ${total} gemeistert`,
    toRetry: (n: number) => ` · ${n} zum Wiederholen`,
    resetAria: "Dieses Training zurücksetzen",
    masteredEyebrow: "Training gemeistert",
    masteredTitle: "Jede Frage. Gemeistert.",
    masteredTitleChild: "Geschafft! Alles grün!",
    masteredDescription: (drill: string, childFriendly: boolean) =>
      `Du hast jede Frage in ${drill} richtig beantwortet. ${childFriendly ? "Schau, wie weit du gekommen bist!" : "Dein Üben hat sich gelohnt."}`,
    masteredDetail: (total: number, drill: string) => `${total} von ${total} Fragen gemeistert · ${drill}`,
    seeProgress: "Deinen Fortschritt ansehen",
    practiseAgain: "Noch mal üben",
    brushUpHeading: "Frisch die Grundlagen auf",
    brushUpListen: "Hör dir die 30-Sekunden-Erklärung an oder lies die Regel",
    brushUpRead: "Die Regel, der Trick und zwei Beispiele",
    tapToCheck: "Tippe auf eine Antwort, um sie zu prüfen",
    check: "Prüfen",
    resetTitle: "Dieses Training zurücksetzen?",
    resetBody: (drill: string) => `Dein Fortschritt in ${drill} beginnt von vorn. Deine Testergebnisse bleiben, wie sie sind.`,
    reset: "Zurücksetzen",

    // ---- Basics run (BasicsRunner) ----
    basicsLockDetail: (skills: number) => `${skills} Basics-${skills === 1 ? "Fertigkeit" : "Fertigkeiten"}`,
    tryAgainLabel: "Nochmal versuchen",
    keepGoing: "Verstanden, weiter",
    tryQuestions: (n: number) => `Verstanden, ${n} ${fragen(n)} probieren`,
    walkInstead: "Lieber Schritt für Schritt durchgehen",
    watchInstead: "Lieber ansehen · 30 Sekunden",
    basicsSub: (drill: string) => `Basics · ${drill}`,
    oneMoreLook: "Noch ein Blick",
    learnIt: "Lerne sie · 20 Sekunden",
    reviewIntro: "Die war knifflig. Hier noch einmal die Regel vor der nächsten Frage.",
    basicsCompleteEyebrow: "Basics geschafft",
    skillLearnedEyebrow: "Fertigkeit gelernt",
    allBasicsTitleChild: "Alle deine Basics sind grün!",
    allBasicsTitle: "Ein starkes Fundament, fertig.",
    oneMoreSkillChild: "Noch eine Fertigkeit ist grün!",
    allBasicsDescription: (n: number, drill: string, childFriendly: boolean) =>
      `Du hast ${n === 1 ? "die Fertigkeit" : `alle ${n} Fertigkeiten`} in ${drill} gelernt. ${childFriendly ? "Als Nächstes kommen deine Übungsfragen." : "Jetzt kannst du sie anwenden."}`,
    skillLearnedChild: (skill: string, revisit: boolean) =>
      `Du hast ${skill} gelernt. ${revisit ? "Du kannst sie jederzeit wieder üben." : "Wieder ein Schritt nach vorn."}`,
    revisitDescription: "Diese Fertigkeit hast du schon gelernt. Komm jederzeit zum Auffrischen zurück.",
    retriedDescription: "Du hast jede Frage geschafft, auch die, die einen zweiten Versuch gebraucht haben.",
    perfectDescription: "Jede Frage beim ersten Versuch richtig.",
    allBasicsDetail: (n: number, drill: string) => `${n} von ${n} Basics-Fertigkeiten gelernt · ${drill}`,
    firstTryDetail: (firstTry: number, outOf: number) => `${firstTry} von ${outOf} beim ersten Versuch richtig`,
    retriedDetail: (n: number) => `${n} beim zweiten Versuch korrigiert`,
    nextSkill: (skill: string) => `Nächste Fertigkeit: ${skill}`,
    nextQuestion: "Nächste Frage",
    questionsCorrect: "Fragen richtig",
    viewStats: "Statistiken ansehen",
    tryPracticeChild: "Probier die Übungsfragen",
    tryExamLevel: "Fragen auf Prüfungsniveau probieren",
    learnAgain: "Noch einmal lernen",
    backToDrillAria: "Zurück zum Training",
    rightCount: (right: number, total: number) => `${right} von ${total} richtig`,
    comingBack: (n: number) => ` · ${n} ${n === 1 ? "kommt" : "kommen"} wieder`,
    rule: "Regel",
    backForAnother: "Noch ein Versuch",
    rightAnswerSr: " (richtige Antwort)",
    yourAnswerSr: " (deine Antwort)",
    right: "Richtig",
    notQuite: "Nicht ganz",
    gotItThisTime: "Diesmal richtig",
    theTrick: "Der Trick:",
    walkAgain: "Noch einmal Schritt für Schritt",
    watchExplainer: "Erklärung ansehen · 30 Sekunden",
    comesBack: "Diese Frage kommt gleich wieder.",
    finish: "Fertig",
    tapAnswer: "Tippe auf eine Antwort",
    whichPunctuation: "Welches Satzzeichen gehört in die Lücke?",
    whichWord: "Welches Wort gehört in die Lücke?",
    punctuationNames: { ";": "Semikolon", ",": "Komma", ":": "Doppelpunkt", "": "kein Satzzeichen" } as Record<string, string>,

    // ---- Rule card and sheet ----
    eli5Label: "ELI5 · erklärt, als wärst du fünf",
    eli5Toggle: "Noch unklar? ELI5",
    theRule: "Die Regel",
    trickLabel: "Der Trick",
    examples: "Beispiele",
    ruleSheetAria: "Die Regel",
    backToQuestion: "Zurück zur Frage",
    walkStepByStep: "Schritt für Schritt durchgehen",
    listenInstead: "Lieber anhören · 30 Sekunden",

    // ---- Walkthrough ----
    walkthroughAria: (skill: string) => `${skill}: Schritt für Schritt`,
    closeWalkthroughAria: "Schritt-für-Schritt-Erklärung schließen",
    walkStep: (step: number, total: number) => `Schritt für Schritt · Schritt ${step} von ${total}`,
    readIt: "Lesen",
    rightSr: " (richtig)",
    notThisOneSr: " (nicht diese)",
    notThatOne: "Nicht diese. Versuch es noch einmal.",
    solveOnBoard: "Löse es an der Tafel",
    skip: "Überspringen",

    // ---- Explainer ----
    beatLabels: { rule: "Die Regel", trick: "Der Trick", bad: "Falsch", good: "Richtig", work1: "Beispiel", work2: "Noch eins", close: "" },
    playCopySentence: "Die Regel, der Trick, ein Satz, der sie bricht, und einer, der sie befolgt. Ton an.",
    playCopyWorked: "Die Regel, der Trick, dann zwei Beispiele Schritt für Schritt gelöst. Ton an.",
    seconds: (n: number) => `${n} ${n === 1 ? "Sekunde" : "Sekunden"}`,
    halfMinute: "eine halbe Minute",
    explainerSilent: (n: number) => `Erklärung · ${n} Sekunden · ohne Ton`,
    explainerLength: (length: string) => `Erklärung · ${length}`,
    explainerAria: (skill: string) => `${skill}: Erklärung`,
    closeExplainerAria: "Erklärung schließen",
    jumpTo: (label: string) => `Springe zu: ${label}`,
    pausedTap: "Pausiert · zum Fortsetzen tippen",
    playTitle: (skill: string, length: string) => `${skill}: ${length}.`,
    starting: "Startet...",
    play: "Abspielen",
    pause: "Pause",
    replay: "Noch mal ansehen",
    loadingSound: "Ton wird geladen...",
    tapToPause: "Tippe irgendwo, um zu pausieren",
    breaksRule: "Bricht die Regel",
    followsRule: "Befolgt die Regel",
    wrongWordSr: " (falsches Wort)",
    fixedSr: " (korrigiert)",

    // ---- Drag boards (play/*) ----
    tryAnotherOne: "Noch eine probieren",
    solveX: {
      stage0: (loose: string) =>
        `Zieh ${loose} auf die andere Seite des Gleichheitszeichens (oder tippe darauf). Dort wechselt es das Vorzeichen.`,
      stage1: (c: string, term: string) => `Tippe jetzt auf ${c} ${term}, um es auszurechnen.`,
      stage2: (a: number, right: string) =>
        `x ist noch mit ${a} multipliziert. Zieh die ${a} unter ${right} (oder tippe darauf), um zu teilen.`,
      stage3: "Tippe auf den Bruch, um ihn auszurechnen.",
      solved: (answer: number, a: number, b: string, c: number) => `x = ${answer}. Probe: ${a} × ${answer} ${b} = ${c} ✓`,
      wrongCoefFirst: (loose: string) => `Noch nicht. Geh rückwärts vor: Verschiebe zuerst das einzelne ${loose}.`,
      wrongXFirst: (loose: string) => `Lass x, wo es ist. Bring ${loose} davon weg.`,
      wrongCFirst: (loose: string) => `Fang mit ${loose} auf der linken Seite an.`,
      wrongXSecond: (a: number) => `x bleibt stehen. Verschiebe die ${a}, die an x hängt.`,
      wrongCSecond: (a: number) => `Zieh stattdessen die ${a}. Sie hängt durch Multiplikation an x.`,
      moveAria: (term: string) => `${term}. Auf die andere Seite des Gleichheitszeichens verschieben.`,
      divideAria: (term: string) => `${term}. Beide Seiten durch ${term} teilen.`,
      workSubtractAria: (c: string, term: string) => `${c} ${term}. Ausrechnen.`,
      workDivideAria: (c: string, a: number) => `${c} geteilt durch ${a}. Ausrechnen.`,
    },
  },
};

registerV2Ui("de", DE);
