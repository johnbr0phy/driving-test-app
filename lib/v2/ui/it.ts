// Italian v2 interface strings (machine translation). See lib/v2/ui/index.ts.
import { registerV2Ui, type V2UiTranslation } from "./registry";

/** "domanda" / "domande" for a count. */
const domande = (n: number) => (n === 1 ? "domanda" : "domande");

export const IT: V2UiTranslation = {
  common: {
    loading: "Caricamento...",
    back: "Indietro",
    next: "Avanti",
    close: "Chiudi",
    continue: "Continua",
    cancel: "Annulla",
  },

  runner: {
    // ExamRunner: loading and chrome
    loadingTest: "Caricamento del test...",
    exitTest: "Esci dal test",
    moduleTitle: (section: string, module: number) => `${section} · Modulo ${module}`,

    // Intro screen
    sectionOf: (n: number, total: number) => `Sezione ${n} di ${total}`,
    questionCount: (n: number) => `${n} ${domande(n)}`,
    timeLeft: (clock: string) => `${clock} rimanenti`,
    untimed: "Senza limite di tempo",
    adaptiveHarder: "Adattivo: modulo più difficile",
    adaptiveEasier: "Adattivo: modulo più facile",
    calculatorAllowed: "Calcolatrice consentita",
    noCalculator: "Niente calcolatrice",
    noGoingBack: "Non si torna indietro",
    untimedPractice: "Esercitazione senza tempo (registrata con il risultato)",
    directions: "Istruzioni",
    clockStartsLinear: "Il tempo parte quando tocchi Inizia.",
    clockStartsReview: "Il tempo parte quando tocchi Inizia e continua a scorrere nella schermata di revisione.",
    noClock: "In questa sezione non c'è limite di tempo. Prenditi il tempo che ti serve.",
    linearRule: "Rispondi a ogni domanda prima di andare avanti. Come nel vero test al computer, non puoi tornare indietro.",
    freeRule: "Muoviti liberamente tra le domande. Segna quelle che vuoi rivedere.",
    autoSubmit: "Allo scadere del tempo la sezione viene consegnata da sola.",
    resumeModule: "Riprendi il modulo",
    startModule: "Inizia il modulo",

    // Break screen
    breakTitle: "Pausa",
    breakDefault: (minutes: number) =>
      `Il vero test ti concede ${minutes} ${minutes === 1 ? "minuto" : "minuti"} tra una sezione e l'altra.`,
    breakAdvice: (section: string) => `Alzati, bevi un po' d'acqua, poi passa a ${section}.`,
    continueTo: (section: string) => `Continua con ${section}`,

    // Review screen
    checkYourWork: "Controlla le risposte",
    reviewSummary: (answered: number, total: number, flagged: number) =>
      `Risposte date: ${answered} su ${total}${flagged ? `, segnate: ${flagged}` : ""}. Tocca un numero per tornarci.`,
    submitModule: "Consegna il modulo",

    // Question screen
    calculator: "Calcolatrice",
    referenceSheet: "Scheda di riferimento",
    reference: "Riferimento",
    eliminateChoices: "Elimina opzioni",
    questionNumber: (n: number) => `Domanda ${n}`,
    ofTotal: (total: number) => `di ${total}`,
    flagged: "Segnata",
    flagForReview: "Segna per rivederla",
    submitSection: "Consegna la sezione",
    previousQuestion: "Domanda precedente",
    nextQuestion: "Domanda successiva",
    answeredCount: (n: number) => `${n} con risposta`,
    paletteButtonLabel: (current: number, total: number, answered: number) =>
      `Domande: ${current} / ${total}, ${answered} con risposta`,
    review: "Revisione",
    questions: "Domande",
    goToReview: "Vai alla schermata di revisione",

    // Question palette
    paletteItemLabel: (n: number, answered: boolean, flagged: boolean) =>
      `Domanda ${n}${answered ? ", con risposta" : ", senza risposta"}${flagged ? ", segnata" : ""}`,
    legendAnswered: "Con risposta",
    legendUnanswered: "Senza risposta",
    legendFlagged: "Segnata",

    // Confirm dialogs
    unansweredCount: (n: number) => `${n} senza risposta`,
    submitAnywayBody: "Rispondere a caso non toglie punti. Consegni lo stesso?",
    submit: "Consegna",
    leaveTitle: "Vuoi uscire dal test?",
    leave: "Esci",
    leaveBodyIntro: "I tuoi progressi sono salvati e il tempo si ferma. Riprendi quando vuoi dalla dashboard.",
    leaveBodyBreak: "I tuoi progressi sono salvati. Riprendi quando vuoi dalla dashboard.",
    leaveBodyReview: "I tuoi progressi sono salvati e il tempo si ferma.",
    leaveBodyQuestions:
      "Le tue risposte sono salvate e il tempo si ferma finché non torni. Il vero test non si ferma mai, quindi quando puoi finiscilo tutto in una volta.",

    // Timer
    timeUp: "Tempo scaduto.",
    oneMinuteLeft: "Manca un minuto o meno.",
    fiveMinutesLeft: "Mancano cinque minuti o meno.",
    showTimer: "Mostra il timer",
    timerRemaining: (clock: string, hidden: boolean) => `${clock} rimanenti. ${hidden ? "Mostra" : "Nascondi"} il timer`,
    timer: "Timer",

    // Calculator
    calcError: "Errore",
    calcExpression: "Espressione della calcolatrice",
    calcDelete: "Cancella l'ultimo carattere",
    calcClear: "Azzera la calcolatrice",
    calcHint: "Le funzioni trigonometriche usano i gradi. Scrivi direttamente o tocca i tasti.",

    // Figure
    openFigure: (alt: string) => `Apri la figura a grandezza piena: ${alt}`,
    tapToEnlarge: "Tocca per ingrandire",
    figureFullSize: "Figura a grandezza piena",

    // QuestionView
    passage: "Testo",
    hidePassage: "Nascondi il testo",
    showPassage: "Mostra il testo",
    highlightHint: "Tocca ogni frase per evidenziarla; toccala di nuovo per toglierla.",
    clozeHint: "Scegli un'opzione per ogni spazio.",
    yourAnswer: "La tua risposta",
    numericPlaceholderWhole: "Scrivi un numero",
    numericPlaceholder: "es. 12, 3/4, -0.5",
    numericInvalid: "Inserisci un numero intero, un decimale con il punto o una frazione come 3/4.",
    numericHelp: "Cifre, un punto per i decimali, una barra per le frazioni e un segno meno all'inizio.",
    correctAnswerIs: (answer: string) => `Risposta corretta: ${answer}`,
    srEliminated: "Eliminata. ",
    srCorrectAnswer: "Risposta corretta",
    srIncorrectAnswer: "Risposta sbagliata",
    restoreChoice: (letter: string) => `Ripristina l'opzione ${letter}`,
    eliminateChoice: (letter: string) => `Elimina l'opzione ${letter}`,
    undo: "Annulla",
    selectedCap: (n: number) =>
      `${n} ${n === 1 ? "selezionata" : "selezionate"}. Toccane una per toglierla prima di sceglierne un'altra.`,
    selectN: (n: number) => `Selezionane ${n}.`,
    selectAll: "Seleziona tutte le risposte corrette.",
    srCorrect: "Giusto. ",
    srNotQuite: "Non proprio. ",
    correct: "Giusto",
    notQuite: "Non proprio",
    skill: (skill: string) => `Abilità: ${skill}`,

    // Order input
    stepsPlaced: (placed: number, total: number) => `Passaggi posizionati: ${placed} su ${total}.`,
    yourOrder: "Il tuo ordine",
    tapNextStep: "Tocca qui sotto il passaggio successivo",
    correctPosition: "Posizione corretta",
    incorrectPosition: "Posizione sbagliata",
    stepRevealLabel: (n: number, text: string, ok: boolean) =>
      `Passaggio ${n}: ${text}. ${ok ? "Posizione corretta" : "Posizione sbagliata"}`,
    removeStep: (n: number, text: string) => `Togli il passaggio ${n}: ${text}`,
    steps: "Passaggi",
    takeBackHint: "Tocca un passaggio già posizionato per toglierlo.",
    correctOrder: "Ordine corretto",

    // Bowtie and cloze inputs
    chooseN: (n: number) => `(scegline ${n})`,
    blank: (n: number) => `Spazio ${n}`,
    selectPlaceholder: "Seleziona...",
  },

  dashboard: {
    // ---- Hero ----
    heroTitle: (done: number, total: number, completedTitle?: string): string => {
      if (done === 0) return `Completa tutte le ${total} tappe`;
      if (done === total) return completedTitle ?? "Ce l'hai fatta";
      if (done === total - 1) return "Ne manca una";
      if (done === 1) return `Buon inizio. 1 di ${total} fatta`;
      const frac = done / total;
      if (frac < 0.45) return `${done} di ${total} fatte`;
      if (frac < 0.55) return "Sei a metà strada";
      if (frac < 0.8) return "Oltre metà strada";
      return `${done} di ${total}, ci sei quasi`;
    },
    tigerAlt: "Mascotte tigre",
    complete: "completate",

    // ---- Goal picker ----
    goalChangeTitle: "Cambia il tuo obiettivo",
    goalAskTitle: "A che punteggio punti?",
    goalPickHint: "Scegli un obiettivo. Il tuo piano è completo quando un test di esercitazione completo lo raggiunge.",
    keepGoal: (goal: number) => `Tieni ${goal}`,

    // ---- Goal strip ----
    goalLabel: "Obiettivo",
    bestLabel: "Migliore",
    changeGoal: "Cambia",
    takeTestToSeeScore: "Fai il test completo per vedere il tuo punteggio",
    goalHitShort: "Obiettivo raggiunto",
    pointsToGo: (n: number) => `Ne mancano ${n}`,

    // ---- Step stamps ----
    stampComplete: "Completato!",
    stampStartHere: "Inizia qui",
    stampKeepGoing: "Continua così",
    stampGoalHit: "Obiettivo raggiunto!",
    stampRetake: "Rifallo",

    // ---- Phone drills ----
    phoneHeading: "Allenati per abilità · sul telefono",
    basicsStepTitle: (drillName: string) => `${drillName} [Basics]`,
    basicsSubtitleLocked: (skills: number) => `Premium · ${skills} abilità`,
    basicsSubtitle: (learned: number, skills: number) => `${learned}/${skills} abilità imparate`,
    drillSubtitleLocked: (questions: number) => `Premium · ${questions} ${domande(questions)}`,
    drillSubtitle: (mastered: number, total: number) => `${mastered}/${total} padroneggiate`,
    rowLabel: (name: string, subtitle: string) => `${name}: ${subtitle}`,
    basicsRowLabel: (drillName: string, subtitle: string) => `${drillName}, Basics: ${subtitle}`,
    drillItemLabel: (drillName: string) => `allenamento ${drillName}`,

    // ---- Full practice tests ----
    desktopHeading: "Test di esercitazione completo · al computer, a tempo",
    testShapeQuestions: (n: number) => `${n} ${domande(n)}`,
    testShapeSections: (n: number) => `${n} ${n === 1 ? "sezione" : "sezioni"}`,
    testSubtitle: (shape: string, length: string, adaptive: boolean, heldOut: boolean) =>
      `${shape} · ${length}${adaptive ? " · adattivo" : ""}${heldOut ? " · mai negli allenamenti" : ""}`,
    testSubtitleLocked: (shape: string, length: string, heldOut: boolean) =>
      `Premium · ${shape} · ${length}${heldOut ? " · mai negli allenamenti" : ""}`,
    testInProgress: (sectionName: string, module: number) => `In corso · ${sectionName}, modulo ${module}`,
    testBestHit: (best: number, goal: number) => `Migliore ${best} · obiettivo ${goal} raggiunto`,
    testBestToGo: (best: number, goal: number) => `Migliore ${best} · ne mancano ${goal - best} per l'obiettivo di ${goal}`,
    attempts: (n: number) => (n === 1 ? "1 tentativo" : `${n} tentativi`),
    practiceTestN: (n: number) => `Test di esercitazione ${n}`,

    // ---- Attempts panel ----
    attemptFirst: "Primo",
    attemptNumber: (n: number) => `#${n}`,
    reviewLatest: "Rivedi l'ultimo tentativo",
    resumeTest: "Riprendi il test",
    retakeTest: "Rifai il test",
    discardConfirm: "Annullare il test in corso e ricominciare la prossima volta?",
    discardAttempt: "Annulla il tentativo in corso",

    // ---- Stats links ----
    statsTitle: "Le tue statistiche",
    statsSub: "Il tuo punteggio di oggi e dove trovare i prossimi punti",
    communityTitle: "Errori comuni",
    communitySub: (examShortName: string) => `Le domande di ${examShortName} che la maggior parte degli studenti sbaglia`,

    // ---- Premium ----
    otherPremiumExams: "tutti gli altri test su Tigertest",
    welcomePremium: "Benvenuto in Premium!",
    premiumUnlocked: (examShortName: string, others: string) =>
      `Ogni allenamento e test di esercitazione di ${examShortName} è sbloccato, e lo sono anche ${others}.`,
    dismiss: "Chiudi",
    unlockWithPremium: (price: string | null) => `Sblocca con Premium${price !== null ? ` · ${price}` : ""}`,
    backToDashboardLink: "Torna alla dashboard",
    paywallItem: (examShortName: string, itemLabel: string) => `${examShortName}: ${itemLabel}`,
    drillLockBody: (blurb: string, detail: string, premiumTest: string | null, others: string) =>
      `${blurb} ${detail}: fanno parte di Tigertest Premium insieme a ${premiumTest ?? "le statistiche complete"} e a ${others}.`,
    drillLockDetail: (skills: number, questions: number) =>
      `${skills} abilità Basics e ${questions} ${domande(questions)} di livello d'esame`,
    testLockBody: (heldOut: boolean, others: string) =>
      `${heldOut ? "Questo test non compare mai negli allenamenti, quindi mostra quanto sei davvero pronto. " : ""}Fa parte di Tigertest Premium, un unico pagamento senza abbonamento, insieme agli ultimi allenamenti e a ${others}.`,

    // ---- Drill front door (DrillOverview) ----
    backToDashboardAria: "Torna alla dashboard",
    basicsStageTitle: "Basics",
    basicsStageSub: "Impara una regola e mettila subito in pratica. Circa 2 minuti per abilità. Gratis.",
    skillLearned: "Imparata ✓",
    quickQuestions: (n: number) => `${n} ${n === 1 ? "domanda veloce" : "domande veloci"}`,
    nextSkillButton: (skillName: string) => `Prossima abilità: ${skillName}`,
    startBasicsButton: (skillName: string) => `Inizia Basics: ${skillName}`,
    continueExamLevel: "Continua il livello d'esame",
    startExamLevel: "Inizia il livello d'esame",
  },

  results: {
    // ResultsV2: no result yet
    noResultYet: (testNumber: number) => `Ancora nessun risultato per il test di esercitazione ${testNumber}`,
    takeTheTest: "Fai il test",

    // ResultsV2: header and score
    eyebrow: (examShortName: string, testNumber: number) => `${examShortName} · Test di esercitazione ${testNumber}`,
    goalReachedEyebrow: "Obiettivo di esercitazione raggiunto",
    fullMarks: "Punteggio pieno!",
    hitYourGoal: "Hai raggiunto il tuo obiettivo!",
    testCompleteGreen: (testNumber: number) =>
      `Il test di esercitazione ${testNumber} è completato. Guardalo diventare verde nella tua dashboard.`,
    compositeEstimate: (compositeName: string) => `${compositeName} (stima)`,
    scoreLabelWithGoal: (scoreLabel: string, goal: number) => `${scoreLabel} · obiettivo ${goal}`,
    atYourGoal: "Al tuo obiettivo",
    vsLastAttempt: (delta: number) => `${delta >= 0 ? "+" : ""}${delta} rispetto all'ultimo tentativo`,
    toYourGoal: (n: number) => `Ne mancano ${n} all'obiettivo`,
    seeYourProgress: "Guarda i tuoi progressi",
    reviewYourAnswers: "Rivedi le tue risposte",
    untimedNote: "Esercitazione senza tempo. Questo tentativo non ha simulato il limite di tempo dell'esame.",

    // ResultsV2: section cards
    correctOfTotal: (raw: number, total: number) => `${raw} / ${total} corrette`,
    scoreBand: (low: number, high: number) => `(da ${low} a ${high})`,
    moduleLine: (module: number, variant: string | undefined, raw: number, total: number) =>
      `Modulo ${module}${variant ? ` (${variant === "upper" ? "più difficile" : "più facile"})` : ""}: ${raw}/${total}`,
    cappedNote: (cap: number, thresholdPct: number, fullMax: number) =>
      `Il modulo 1 ti ha mandato al modulo 2 più facile, che limita questa sezione a circa ${cap}. Rispondi bene al ${thresholdPct}% del modulo 1 per passare al percorso più difficile e al massimo di ${fullMax}.`,

    // ResultsV2: next step
    yourNextStep: "Il tuo prossimo passo",
    drillTonight: (drillName: string) => `Allenati su ${drillName} stasera, sul telefono`,
    nextStepBody: (correct: number, total: number, domainLabel: string) =>
      `Hai fatto ${correct} su ${total} in ${domainLabel}. L'allenamento ti ripropone ogni errore finché non lo padroneggi; poi rifai il test al computer.`,
    startTheDrill: "Inizia l'allenamento",

    // ResultsV2: review list
    review: "Revisione",
    filterBySection: "Filtra la revisione per sezione",
    allSections: "Tutte le sezioni",
    filterAll: "Tutte",
    filterMissed: "Sbagliate",
    nothingToShow: "Niente da mostrare qui. Ottimo.",
    srCorrect: "Giusta. ",
    srIncorrect: "Sbagliata. ",
    retakeTest: (testNumber: number) => `Rifai il test di esercitazione ${testNumber}`,
    backToDashboard: "Torna alla dashboard",

    // StatsV2: paywall
    paywallBenefits: (examShortName: string) => [
      `Il tuo piano di studio completo per ${examShortName}, con ogni argomento ordinato per i punti che vale`,
      "Le abilità precise che continui a sbagliare in ogni argomento",
      "Ogni errore salvato, da riprovare finché non lo impari",
      "Statistiche complete su ogni esame di Tigertest",
      "Un unico pagamento, tuo per sempre",
    ],
    paywallHeadline: ["Studia meglio.", "Punta più in alto."] as [string, string],

    // StatsV2: tabs
    tabYours: "Le tue statistiche",
    tabCommunity: "Errori comuni",

    // StatsV2: empty state
    estimateYourScore: (examShortName: string) => `Stima il tuo punteggio di ${examShortName}`,
    answerToEstimate: (minAnswers: number, perSection: boolean) =>
      `Rispondi a ${perSection ? `${minAnswers} domande in ogni sezione` : `${minAnswers} domande`} e stimeremo il tuo punteggio, mostrandoti dove trovare i prossimi punti.`,
    startADrill: "Inizia un allenamento",

    // StatsV2: score today
    estimatedScore: (examShortName: string) => `Punteggio stimato di ${examShortName}`,
    atYourGoalOf: (goal: string) => `Al tuo obiettivo di ${goal}`,
    goalToGo: (goal: string, gap: number, percent: boolean) =>
      `Obiettivo ${goal} · ${percent ? `mancano ${gap} punti` : `ne mancano ${gap}`}`,
    sectionToGo: (n: number) => `ne mancano ${n}`,
    neededOne: (n: number) => `Ancora ${n} ${domande(n)} per vedere il tuo punteggio.`,
    neededSections: (parts: { needed: number; sectionShortName: string }[]) =>
      `Ancora ${parts.map((p) => `${p.needed} ${domande(p.needed)} di ${p.sectionShortName}`).join(" e ")} per vedere il tuo punteggio.`,
    neededEach: (minAnswers: number) => `Rispondi a ${minAnswers} domande in ogni sezione per vedere il tuo punteggio.`,
    estimateFrom: (answered: number) =>
      `Una stima basata ${answered === 1 ? "sull'unica domanda di esercitazione a cui hai risposto" : `sulle ${answered} domande di esercitazione a cui hai risposto`} (al primo tentativo), non un punteggio ufficiale.`,
    lastPracticeTest: "Il tuo ultimo test di esercitazione:",

    // StatsV2: fastest points
    fastestPoints: "I tuoi punti più veloci",
    ifEachTopic: (targetPct: number) => `stima, se porti ogni argomento al ${targetPct}%`,
    noPlanYet: "Rispondi a qualche altra domanda e qui comparirà il tuo piano.",
    gainAbout: (n: number, percent: boolean) => (percent ? `circa +${n}%` : `circa +${n} punti`),
    pointsLabel: (percent: boolean) => (percent ? "punti" : "pt"),
    moreTopicsWorth: (count: number, gain: number, percent: boolean) =>
      `${count === 1 ? "Un altro argomento che vale" : `Altri ${count} argomenti che valgono`} circa ${percent ? `+${gain}%` : `+${gain} punti`}`,
    moreTopics: (count: number) =>
      count === 1 ? "Un altro argomento nel tuo piano" : `Altri ${count} argomenti nel tuo piano`,
    planLockSubtitle: "Guarda ogni argomento ordinato per i punti che vale e le abilità precise che sbagli",
    unlockPlan: (price: string) => `Sblocca il piano completo · ${price}`,
    notTriedYet: "Non ancora provato",
    topicAccuracy: (accPct: number, answered: number) =>
      `${accPct}% giuste al primo tentativo · ${answered} ${answered === 1 ? "risposta" : "risposte"}`,
    missedOf: (missed: number, answered: number) => `sbagliate ${missed} su ${answered}`,
    practiceDrill: (drillName: string) => `Allenati su ${drillName}`,

    // StatsV2: practice tests
    practiceTests: "Test di esercitazione",
    takeFullTest: "Fai un test di esercitazione completo per un vero punteggio a tempo.",
    practiceTestN: (testNumber: number) => `Test di esercitazione ${testNumber}`,

    // StatsV2: mistake notebook
    mistakeNotebook: "Quaderno degli errori",
    questionCount: (n: number) => `${n} ${domande(n)}`,
    noMistakesYet: "Ancora niente. Ogni domanda che sbagli finisce qui, così puoi riprovarla.",
    mistakesIntro: "Tutte le domande che hai sbagliato. Toccane una per riprovarla.",
    missLabel: (n: number) => (n === 1 ? "errore" : "errori"),
    masteredSince: " · poi padroneggiata",
    moreMistakes: (n: number) => (n === 1 ? "Un altro errore salvato" : `Altri ${n} errori salvati`),
    mistakesLockSubtitle: "Riprova ogni domanda sbagliata finché non la impari",
    unlockPremiumFor: (price: string) => `Sblocca Premium a ${price}`,

    // StatsV2: common mistakes
    commonMistakes: "Errori comuni",
    commonMistakesCard: (examShortName: string) => `Le domande di ${examShortName} che la maggior parte degli studenti sbaglia`,
    notEnoughData: "Non ci sono ancora abbastanza dati. Ripassa presto.",
    getThisWrong: "la sbaglia",
    communityIntro: (examShortName: string) => `Le domande di ${examShortName} che gli studenti sbagliano di più`,
    basedOnAnswersFrom: ", in base alle risposte di",
    realTestTakers: (count: string) => `${count} candidati reali`,
    peopleGotWrong: (wrong: number, total: number) => `${wrong} persone su ${total} hanno sbagliato questa domanda`,
    moreLocked: (n: number) => (n === 1 ? "Un'altra domanda bloccata" : `Altre ${n} domande bloccate`),
    upgradeFullList: "Passa a Premium per vedere la lista completa",
    unlockWithPremium: "Sblocca con Premium",

    // V2StatsRow
    check: "Verifica",
    tryAgain: "Riprova",
  },

  drill: {
    // ---- Exam-level drill (DrillRunner) ----
    lockDetail: (questions: number) => `${questions} ${domande(questions)}`,
    masteredCount: (mastered: number, total: number) => `${mastered} su ${total} padroneggiate`,
    toRetry: (n: number) => ` · ${n} da riprovare`,
    resetAria: "Azzera questo allenamento",
    masteredEyebrow: "Allenamento padroneggiato",
    masteredTitle: "Ogni domanda. Padroneggiata.",
    masteredTitleChild: "Ce l'hai fatta! Tutto verde!",
    masteredDescription: (drill: string, childFriendly: boolean) =>
      `Hai risposto correttamente a tutte le domande di ${drill}. ${childFriendly ? "Guarda quanta strada hai fatto!" : "Il tuo allenamento ha dato i suoi frutti."}`,
    masteredDetail: (total: number, drill: string) => `${total} domande su ${total} padroneggiate · ${drill}`,
    seeProgress: "Guarda i tuoi progressi",
    practiseAgain: "Allenati di nuovo",
    brushUpHeading: "Ripassa le basi",
    brushUpListen: "Ascolta la spiegazione di 30 secondi o leggi la regola",
    brushUpRead: "La regola, il trucco e due esempi",
    tapToCheck: "Tocca una risposta per verificarla",
    check: "Verifica",
    resetTitle: "Azzerare questo allenamento?",
    resetBody: (drill: string) => `La padronanza di ${drill} riparte da zero. I punteggi dei test non cambiano.`,
    reset: "Azzera",

    // ---- Basics run (BasicsRunner) ----
    basicsLockDetail: (skills: number) => `${skills} abilità Basics`,
    tryAgainLabel: "Riprova",
    keepGoing: "Capito, andiamo avanti",
    tryQuestions: (n: number) => (n === 1 ? "Capito, prova 1 domanda" : `Capito, prova ${n} domande`),
    walkInstead: "Fallo invece passo per passo",
    watchInstead: "Guardalo invece · 30 secondi",
    basicsSub: (drill: string) => `Basics · ${drill}`,
    oneMoreLook: "Un'altra occhiata",
    learnIt: "Imparala · 20 secondi",
    reviewIntro: "Questa è difficile. Ecco di nuovo la regola prima della prossima domanda.",
    basicsCompleteEyebrow: "Basics completate",
    skillLearnedEyebrow: "Abilità imparata",
    allBasicsTitleChild: "Tutte le tue basi sono verdi!",
    allBasicsTitle: "Basi solide, completate.",
    oneMoreSkillChild: "Un'altra abilità è verde!",
    allBasicsDescription: (n: number, drill: string, childFriendly: boolean) =>
      `Hai imparato ${n === 1 ? "l'unica abilità" : `tutte le ${n} abilità`} di ${drill}. ${childFriendly ? "Ora tocca alle domande di esercitazione." : n === 1 ? "Sei pronto a metterla in pratica." : "Sei pronto a metterle in pratica."}`,
    skillLearnedChild: (skill: string, revisit: boolean) =>
      `Hai imparato ${skill}. ${revisit ? "Puoi esercitarti di nuovo quando vuoi." : "Un altro passo avanti."}`,
    revisitDescription: "Hai già imparato questa abilità. Torna quando vuoi per un ripasso.",
    retriedDescription: "Hai risolto ogni domanda, anche quelle che hanno richiesto un altro tentativo.",
    perfectDescription: "Tutte le domande giuste al primo tentativo.",
    allBasicsDetail: (n: number, drill: string) => `${n} abilità Basics su ${n} imparate · ${drill}`,
    firstTryDetail: (firstTry: number, outOf: number) => `${firstTry} su ${outOf} giuste al primo tentativo`,
    retriedDetail: (n: number) => `${n} ${n === 1 ? "corretta" : "corrette"} con un nuovo tentativo`,
    nextSkill: (skill: string) => `Prossima abilità: ${skill}`,
    tryPracticeChild: "Prova le domande di esercitazione",
    tryExamLevel: "Prova le domande di livello d'esame",
    learnAgain: "Imparala di nuovo",
    backToDrillAria: "Torna all'allenamento",
    rightCount: (right: number, total: number) => `${right} su ${total} giuste`,
    comingBack: (n: number) => ` · ${n} ${n === 1 ? "tornerà" : "torneranno"}`,
    rule: "Regola",
    backForAnother: "Ecco un altro tentativo",
    rightAnswerSr: " (risposta giusta)",
    yourAnswerSr: " (la tua risposta)",
    right: "Giusto",
    notQuite: "Non proprio",
    gotItThisTime: "Questa volta ce l'hai fatta",
    theTrick: "Il trucco:",
    walkAgain: "Rifallo passo per passo",
    watchExplainer: "Guarda la spiegazione · 30 secondi",
    comesBack: "Questa domanda tornerà tra un minuto.",
    finish: "Fine",
    tapAnswer: "Tocca una risposta",
    whichPunctuation: "Quale segno di punteggiatura va nello spazio?",
    whichWord: "Quale parola va nello spazio?",
    punctuationNames: { ";": "punto e virgola", ",": "virgola", ":": "due punti", "": "nessuna punteggiatura" } as Record<string, string>,

    // ---- Rule card and sheet ----
    eli5Label: "ELI5 · spiegato come a un bambino di cinque anni",
    eli5Toggle: "Non è ancora chiaro? ELI5",
    theRule: "La regola",
    trickLabel: "Il trucco",
    examples: "Esempi",
    ruleSheetAria: "La regola",
    backToQuestion: "Torna alla domanda",
    walkStepByStep: "Fallo passo per passo",
    listenInstead: "Ascoltala invece · 30 secondi",

    // ---- Walkthrough ----
    walkthroughAria: (skill: string) => `${skill}: passo per passo`,
    closeWalkthroughAria: "Chiudi la spiegazione passo per passo",
    walkStep: (step: number, total: number) => `Passo per passo · passo ${step} di ${total}`,
    readIt: "Leggila",
    rightSr: " (giusta)",
    notThisOneSr: " (non questa)",
    notThatOne: "Non quella. Riprova.",
    solveOnBoard: "Risolvilo sulla lavagna",
    skip: "Salta",

    // ---- Explainer ----
    beatLabels: { rule: "La regola", trick: "Il trucco", bad: "Non funziona", good: "Funziona", work1: "Esempio svolto", work2: "Un altro", close: "" },
    playCopySentence: "La regola, il trucco, una frase che la viola e una che la rispetta. Alza il volume.",
    playCopyWorked: "La regola, il trucco, poi due esempi svolti passo per passo. Alza il volume.",
    seconds: (n: number) => `${n} ${n === 1 ? "secondo" : "secondi"}`,
    halfMinute: "mezzo minuto",
    explainerSilent: (n: number) => `Spiegazione · ${n} secondi · senza audio`,
    explainerLength: (length: string) => `Spiegazione · ${length}`,
    explainerAria: (skill: string) => `${skill}: spiegazione`,
    closeExplainerAria: "Chiudi la spiegazione",
    jumpTo: (label: string) => `Vai a: ${label}`,
    pausedTap: "In pausa · tocca per continuare",
    playTitle: (skill: string, length: string) => `${skill}, in ${length}.`,
    starting: "Avvio...",
    play: "Riproduci",
    pause: "Pausa",
    replay: "Riguarda",
    loadingSound: "Caricamento dell'audio...",
    tapToPause: "Tocca un punto qualsiasi per mettere in pausa",
    breaksRule: "Viola la regola",
    followsRule: "Rispetta la regola",
    wrongWordSr: " (parola sbagliata)",
    fixedSr: " (corretta)",

    // ---- Drag boards (play/*) ----
    tryAnotherOne: "Provane un altro",
    solveX: {
      stage0: (loose: string) => `Trascina ${loose} dall'altra parte del segno = (o toccalo). Dall'altro lato cambia segno.`,
      stage1: (c: string, term: string) => `Ora tocca ${c} ${term} per calcolarlo.`,
      stage2: (a: number, right: string) =>
        `x è ancora moltiplicata per ${a}. Trascina ${a} sotto ${right} (o toccalo) per dividere.`,
      stage3: "Tocca la frazione per calcolarla.",
      solved: (answer: number, a: number, b: string, c: number) => `x = ${answer}. Verifica: ${a} × ${answer} ${b} = ${c} ✓`,
      wrongCoefFirst: (loose: string) => `Non ancora. Procedi in ordine inverso: sposta prima il termine libero ${loose}.`,
      wrongXFirst: (loose: string) => `Lascia x dov'è. Allontana da x il termine ${loose}.`,
      wrongCFirst: (loose: string) => `Comincia dal termine ${loose} a sinistra.`,
      wrongXSecond: (a: number) => `x resta lì. Sposta ${a}, che la moltiplica.`,
      wrongCSecond: (a: number) => `Trascina invece ${a}. È legato a x da una moltiplicazione.`,
      moveAria: (term: string) => `${term}. Spostalo dall'altra parte del segno uguale.`,
      divideAria: (term: string) => `${term}. Dividi entrambi i lati per ${term}.`,
      workSubtractAria: (c: string, term: string) => `${c} ${term}. Calcolalo.`,
      workDivideAria: (c: string, a: number) => `${c} diviso ${a}. Calcolalo.`,
    },
  },
};

registerV2Ui("it", IT);
