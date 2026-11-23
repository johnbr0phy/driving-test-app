// French v2 interface strings (machine translation). See lib/v2/ui/index.ts.
// Uses "vous", like the rest of the site's French (i18n/fr.ts).
import { registerV2Ui, type V2UiTranslation } from "./registry";

/** "question" / "questions" for a count. */
const questions = (n: number) => (n === 1 ? "question" : "questions");

export const FR: V2UiTranslation = {
  common: {
    loading: "Chargement...",
    back: "Retour",
    next: "Suivant",
    close: "Fermer",
    continue: "Continuer",
    cancel: "Annuler",
  },

  runner: {
    // ExamRunner: loading and chrome
    loadingTest: "Chargement de votre test...",
    exitTest: "Quitter le test",
    moduleTitle: (section: string, module: number) => `${section} · Module ${module}`,

    // Intro screen
    sectionOf: (n: number, total: number) => `Partie ${n} sur ${total}`,
    questionCount: (n: number) => `${n} ${questions(n)}`,
    timeLeft: (clock: string) => `${clock} restantes`,
    untimed: "Sans limite de temps",
    adaptiveHarder: "Adaptatif : module plus difficile",
    adaptiveEasier: "Adaptatif : module plus facile",
    calculatorAllowed: "Calculatrice autorisée",
    noCalculator: "Sans calculatrice",
    noGoingBack: "Pas de retour en arrière",
    untimedPractice: "Entraînement sans limite de temps (indiqué avec votre résultat)",
    directions: "Consignes",
    clockStartsLinear: "Le chrono démarre quand vous touchez Commencer.",
    clockStartsReview: "Le chrono démarre quand vous touchez Commencer et continue de tourner sur l'écran de relecture.",
    noClock: "Cette partie n'a pas de chrono. Prenez le temps qu'il vous faut.",
    linearRule: "Répondez à chaque question avant de passer à la suivante. Comme dans le vrai test sur ordinateur, vous ne pouvez pas revenir en arrière.",
    freeRule: "Passez librement d'une question à l'autre. Marquez celles que vous voulez revoir.",
    autoSubmit: "Quand le temps est écoulé, la partie est envoyée automatiquement.",
    resumeModule: "Reprendre le module",
    startModule: "Commencer le module",

    // Break screen
    breakTitle: "Pause",
    breakDefault: (minutes: number) =>
      `Le vrai test vous laisse ${minutes} ${minutes === 1 ? "minute" : "minutes"} entre deux parties.`,
    breakAdvice: (section: string) => `Levez-vous, buvez un peu d'eau, puis passez à ${section}.`,
    continueTo: (section: string) => `Passer à ${section}`,

    // Review screen
    checkYourWork: "Vérifiez vos réponses",
    reviewSummary: (answered: number, total: number, flagged: number) =>
      `${answered} sur ${total} ${answered > 1 ? "répondues" : "répondue"}${flagged ? `, ${flagged} ${flagged > 1 ? "marquées" : "marquée"}` : ""}. Touchez un numéro pour y revenir.`,
    submitModule: "Envoyer le module",

    // Question screen
    calculator: "Calculatrice",
    referenceSheet: "Fiche de référence",
    reference: "Référence",
    eliminateChoices: "Éliminer des choix",
    questionNumber: (n: number) => `Question ${n}`,
    ofTotal: (total: number) => `sur ${total}`,
    flagged: "Marquée",
    flagForReview: "Marquer pour relecture",
    submitSection: "Envoyer la partie",
    previousQuestion: "Question précédente",
    nextQuestion: "Question suivante",
    answeredCount: (n: number) => `${n} ${n > 1 ? "répondues" : "répondue"}`,
    paletteButtonLabel: (current: number, total: number, answered: number) =>
      `Questions : ${current} / ${total}, ${answered} ${answered > 1 ? "répondues" : "répondue"}`,
    review: "Relecture",
    questions: "Questions",
    goToReview: "Aller à l'écran de relecture",

    // Question palette
    paletteItemLabel: (n: number, answered: boolean, flagged: boolean) =>
      `Question ${n}${answered ? ", répondue" : ", sans réponse"}${flagged ? ", marquée" : ""}`,
    legendAnswered: "Répondue",
    legendUnanswered: "Sans réponse",
    legendFlagged: "Marquée",

    // Confirm dialogs
    unansweredCount: (n: number) => `${n} sans réponse`,
    submitAnywayBody: "Répondre au hasard ne fait pas perdre de points. Envoyer quand même ?",
    submit: "Envoyer",
    leaveTitle: "Quitter le test ?",
    leave: "Quitter",
    leaveBodyIntro: "Votre progression est enregistrée et le chrono s'arrête. Reprenez quand vous voulez depuis le tableau de bord.",
    leaveBodyBreak: "Votre progression est enregistrée. Reprenez quand vous voulez depuis le tableau de bord.",
    leaveBodyReview: "Votre progression est enregistrée et le chrono s'arrête.",
    leaveBodyQuestions:
      "Vos réponses sont enregistrées et le chrono s'arrête jusqu'à votre retour. Le vrai test ne s'arrête jamais, alors finissez d'une traite quand vous le pouvez.",

    // Timer
    timeUp: "Le temps est écoulé.",
    oneMinuteLeft: "Une minute ou moins restante.",
    fiveMinutesLeft: "Cinq minutes ou moins restantes.",
    showTimer: "Afficher le chrono",
    timerRemaining: (clock: string, hidden: boolean) => `${clock} restantes. ${hidden ? "Afficher" : "Masquer"} le chrono`,
    timer: "Chrono",

    // Calculator
    calcError: "Erreur",
    calcExpression: "Expression de la calculatrice",
    calcDelete: "Effacer le dernier caractère",
    calcClear: "Effacer la calculatrice",
    calcHint: "Les fonctions trigonométriques utilisent les degrés. Tapez directement ou touchez les touches.",

    // Figure
    openFigure: (alt: string) => `Ouvrir la figure en grand : ${alt}`,
    tapToEnlarge: "Touchez pour agrandir",
    figureFullSize: "Figure en grand",

    // QuestionView
    passage: "Texte",
    hidePassage: "Masquer le texte",
    showPassage: "Afficher le texte",
    highlightHint: "Touchez chaque passage pour le surligner ; touchez-le à nouveau pour l'effacer.",
    clozeHint: "Choisissez une option pour chaque blanc.",
    yourAnswer: "Votre réponse",
    numericPlaceholderWhole: "Tapez un nombre",
    numericPlaceholder: "ex. 12, 3/4, -0.5",
    numericInvalid: "Saisissez un nombre entier, un décimal avec un point ou une fraction comme 3/4.",
    numericHelp: "Des chiffres, un point pour les décimales, une barre oblique pour les fractions et un signe moins au début.",
    correctAnswerIs: (answer: string) => `Bonne réponse : ${answer}`,
    srEliminated: "Éliminé. ",
    srCorrectAnswer: "Bonne réponse",
    srIncorrectAnswer: "Mauvaise réponse",
    restoreChoice: (letter: string) => `Rétablir le choix ${letter}`,
    eliminateChoice: (letter: string) => `Éliminer le choix ${letter}`,
    undo: "Annuler",
    selectedCap: (n: number) =>
      `${n} ${n > 1 ? "sélectionnées" : "sélectionnée"}. Touchez-en une pour la retirer avant d'en choisir une autre.`,
    selectN: (n: number) => `Choisissez-en ${n}.`,
    selectAll: "Choisissez toutes les réponses qui conviennent.",
    srCorrect: "Correct. ",
    srNotQuite: "Incorrect. ",
    correct: "Correct",
    notQuite: "Incorrect",
    skill: (skill: string) => `Compétence : ${skill}`,

    // Order input
    stepsPlaced: (placed: number, total: number) => `${placed} ${placed > 1 ? "étapes placées" : "étape placée"} sur ${total}.`,
    yourOrder: "Votre ordre",
    tapNextStep: "Touchez l'étape suivante ci-dessous",
    correctPosition: "Bonne position",
    incorrectPosition: "Mauvaise position",
    stepRevealLabel: (n: number, text: string, ok: boolean) => `Étape ${n} : ${text}. ${ok ? "Bonne position" : "Mauvaise position"}`,
    removeStep: (n: number, text: string) => `Retirer l'étape ${n} : ${text}`,
    steps: "Étapes",
    takeBackHint: "Touchez une étape placée pour la retirer.",
    correctOrder: "Bon ordre",

    // Bowtie and cloze inputs
    chooseN: (n: number) => `(choisissez-en ${n})`,
    blank: (n: number) => `Blanc ${n}`,
    selectPlaceholder: "Choisir...",
  },

  dashboard: {
    // ---- Hero ----
    heroTitle: (done: number, total: number, completedTitle?: string): string => {
      if (done === 0) return `Terminez les ${total} étapes`;
      if (done === total) return completedTitle ?? "Vous êtes prêt";
      if (done === total - 1) return "Plus qu'une";
      if (done === 1) return `Bon début. 1 sur ${total} terminée`;
      const frac = done / total;
      if (frac < 0.45) return `${done} sur ${total} terminées`;
      if (frac < 0.55) return "À mi-chemin";
      if (frac < 0.8) return "Plus de la moitié";
      return `${done} sur ${total}, presque fini`;
    },
    tigerAlt: "Mascotte tigre",
    complete: "terminées",

    // ---- Goal picker ----
    goalChangeTitle: "Changer votre objectif",
    goalAskTitle: "Quel score visez-vous ?",
    goalPickHint: "Choisissez un objectif. Votre plan est terminé quand un test d'entraînement complet l'atteint.",
    keepGoal: (goal: number) => `Garder ${goal}`,

    // ---- Goal strip ----
    goalLabel: "Objectif",
    bestLabel: "Meilleur",
    changeGoal: "Changer",
    takeTestToSeeScore: "Faites le test complet pour voir votre score",
    goalHitShort: "Objectif atteint",
    pointsToGo: (n: number) => `encore ${n}`,

    // ---- Step stamps ----
    stampComplete: "Terminé !",
    stampStartHere: "Commencez ici",
    stampKeepGoing: "Continuez",
    stampGoalHit: "Objectif atteint !",
    stampRetake: "À refaire",

    // ---- Phone drills ----
    phoneHeading: "Entraînement par compétence · sur votre téléphone",
    basicsStepTitle: (drillName: string) => `${drillName} [Basics]`,
    basicsSubtitleLocked: (skills: number) => `Premium · ${skills} ${skills > 1 ? "compétences" : "compétence"}`,
    basicsSubtitle: (learned: number, skills: number) =>
      `${learned}/${skills} ${learned > 1 ? "compétences acquises" : "compétence acquise"}`,
    drillSubtitleLocked: (questions: number) => `Premium · ${questions} ${questions === 1 ? "question" : "questions"}`,
    drillSubtitle: (mastered: number, total: number) => `${mastered}/${total} ${mastered > 1 ? "maîtrisées" : "maîtrisée"}`,
    rowLabel: (name: string, subtitle: string) => `${name} : ${subtitle}`,
    basicsRowLabel: (drillName: string, subtitle: string) => `${drillName}, Basics : ${subtitle}`,
    drillItemLabel: (drillName: string) => `entraînement ${drillName}`,

    // ---- Full practice tests ----
    desktopHeading: "Test d'entraînement complet · sur ordinateur, chronométré",
    testShapeQuestions: (n: number) => `${n} ${n === 1 ? "question" : "questions"}`,
    testShapeSections: (n: number) => `${n} ${n === 1 ? "partie" : "parties"}`,
    testSubtitle: (shape: string, length: string, adaptive: boolean, heldOut: boolean) =>
      `${shape} · ${length}${adaptive ? " · adaptatif" : ""}${heldOut ? " · jamais dans les entraînements" : ""}`,
    testSubtitleLocked: (shape: string, length: string, heldOut: boolean) =>
      `Premium · ${shape} · ${length}${heldOut ? " · jamais dans les entraînements" : ""}`,
    testInProgress: (sectionName: string, module: number) => `En cours · ${sectionName}, module ${module}`,
    testBestHit: (best: number, goal: number) => `Meilleur ${best} · objectif ${goal} atteint`,
    testBestToGo: (best: number, goal: number) => `Meilleur ${best} · encore ${goal - best} pour votre objectif de ${goal}`,
    attempts: (n: number) => (n === 1 ? "1 tentative" : `${n} tentatives`),
    practiceTestN: (n: number) => `Test d'entraînement ${n}`,

    // ---- Attempts panel ----
    attemptFirst: "Premier",
    attemptNumber: (n: number) => `n° ${n}`,
    reviewLatest: "Revoir la dernière tentative",
    resumeTest: "Reprendre le test",
    retakeTest: "Refaire le test",
    discardConfirm: "Abandonner le test en cours et recommencer la prochaine fois ?",
    discardAttempt: "Abandonner la tentative en cours",

    // ---- Stats links ----
    statsTitle: "Vos statistiques",
    statsSub: "Votre score aujourd'hui et où trouver vos prochains points",
    communityTitle: "Erreurs fréquentes",
    communitySub: (examShortName: string) => `Les questions ${examShortName} que la plupart des élèves ratent`,

    // ---- Premium ----
    otherPremiumExams: "tous les autres tests de Tigertest",
    welcomePremium: "Bienvenue dans Premium !",
    premiumUnlocked: (examShortName: string, others: string) =>
      `Tous les entraînements et tests d'entraînement ${examShortName} sont débloqués, ainsi que ${others}.`,
    dismiss: "Fermer",
    unlockWithPremium: (price: string | null) => `Débloquer avec Premium${price !== null ? ` · ${price}` : ""}`,
    backToDashboardLink: "Retour au tableau de bord",
    paywallItem: (examShortName: string, itemLabel: string) => `${examShortName} : ${itemLabel}`,
    drillLockBody: (blurb: string, detail: string, premiumTest: string | null, others: string) =>
      `${blurb} ${detail}, inclus dans Tigertest Premium avec ${premiumTest ?? "les statistiques complètes"} et ${others}.`,
    drillLockDetail: (skills: number, questions: number) =>
      `${skills} ${skills > 1 ? "compétences" : "compétence"} Basics et ${questions} ${questions === 1 ? "question" : "questions"} de niveau examen`,
    testLockBody: (heldOut: boolean, others: string) =>
      `${heldOut ? "Ce test n'apparaît jamais dans les entraînements : il montre donc à quel point vous êtes vraiment prêt. " : ""}Il fait partie de Tigertest Premium, un seul paiement sans abonnement, avec les derniers entraînements et ${others}.`,

    // ---- Drill front door (DrillOverview) ----
    backToDashboardAria: "Retour au tableau de bord",
    basicsStageTitle: "Basics",
    basicsStageSub: "Apprenez une règle et appliquez-la tout de suite. Environ 2 minutes par compétence. Gratuit.",
    skillLearned: "Acquise ✓",
    quickQuestions: (n: number) => `${n} ${n === 1 ? "question rapide" : "questions rapides"}`,
    nextSkillButton: (skillName: string) => `Compétence suivante : ${skillName}`,
    startBasicsButton: (skillName: string) => `Commencer les Basics : ${skillName}`,
    continueExamLevel: "Continuer le niveau examen",
    startExamLevel: "Commencer le niveau examen",
  },

  results: {
    // ResultsV2: no result yet
    noResultYet: (testNumber: number) => `Pas encore de résultat pour le test d'entraînement ${testNumber}`,
    takeTheTest: "Faire le test",

    // ResultsV2: header and score
    eyebrow: (examShortName: string, testNumber: number) => `${examShortName} · Test d'entraînement ${testNumber}`,
    goalReachedEyebrow: "Objectif d'entraînement atteint",
    fullMarks: "Score parfait !",
    hitYourGoal: "Vous avez atteint votre objectif !",
    testCompleteGreen: (testNumber: number) =>
      `Le test d'entraînement ${testNumber} est terminé. Regardez-le passer au vert sur votre tableau de bord.`,
    compositeEstimate: (compositeName: string) => `${compositeName} (estimation)`,
    scoreLabelWithGoal: (scoreLabel: string, goal: number) => `${scoreLabel} · objectif ${goal}`,
    atYourGoal: "Objectif atteint",
    vsLastAttempt: (delta: number) => `${delta >= 0 ? "+" : ""}${delta} par rapport à la dernière tentative`,
    toYourGoal: (n: number) => `encore ${n} pour votre objectif`,
    seeYourProgress: "Voir votre progression",
    reviewYourAnswers: "Revoir vos réponses",
    untimedNote: "Entraînement sans limite de temps. Cette tentative ne reproduisait pas la durée de l'examen.",

    // ResultsV2: section cards
    correctOfTotal: (raw: number, total: number) => `${raw} / ${total} ${raw > 1 ? "justes" : "juste"}`,
    scoreBand: (low: number, high: number) => `(de ${low} à ${high})`,
    moduleLine: (module: number, variant: string | undefined, raw: number, total: number) =>
      `Module ${module}${variant ? ` (${variant === "upper" ? "plus difficile" : "plus facile"})` : ""} : ${raw}/${total}`,
    cappedNote: (cap: number, thresholdPct: number, fullMax: number) =>
      `Le module 1 vous a envoyé vers le module 2 plus facile, qui plafonne cette partie autour de ${cap}. Réussissez ${thresholdPct} % du module 1 pour accéder au parcours plus difficile et au maximum de ${fullMax}.`,

    // ResultsV2: next step
    yourNextStep: "Votre prochaine étape",
    drillTonight: (drillName: string) => `Entraînez-vous sur ${drillName} ce soir sur votre téléphone`,
    nextStepBody: (correct: number, total: number, domainLabel: string) =>
      `Vous avez eu ${correct} sur ${total} en ${domainLabel}. L'entraînement vous repose chaque erreur jusqu'à ce que vous la maîtrisiez ; refaites ensuite le test sur ordinateur.`,
    startTheDrill: "Commencer l'entraînement",

    // ResultsV2: review list
    review: "Relecture",
    filterBySection: "Filtrer la relecture par partie",
    allSections: "Toutes les parties",
    filterAll: "Toutes",
    filterMissed: "Ratées",
    nothingToShow: "Rien à afficher ici. Bravo.",
    srCorrect: "Juste. ",
    srIncorrect: "Faux. ",
    retakeTest: (testNumber: number) => `Refaire le test d'entraînement ${testNumber}`,
    backToDashboard: "Retour au tableau de bord",

    // StatsV2: paywall
    paywallBenefits: (examShortName: string) => [
      `Votre plan de révision ${examShortName} complet, chaque thème classé selon les points qu'il rapporte`,
      "Les compétences précises que vous ratez encore dans chaque thème",
      "Chaque erreur enregistrée, à refaire jusqu'à ce qu'elle soit acquise",
      "Des statistiques complètes sur chaque examen de Tigertest",
      "Un seul paiement, à vous pour toujours",
    ],
    paywallHeadline: ["Révisez malin.", "Visez plus haut."] as [string, string],

    // StatsV2: tabs
    tabYours: "Vos statistiques",
    tabCommunity: "Erreurs fréquentes",

    // StatsV2: empty state
    estimateYourScore: (examShortName: string) => `Estimez votre score ${examShortName}`,
    answerToEstimate: (minAnswers: number, perSection: boolean) =>
      `Répondez à ${perSection ? `${minAnswers} questions dans chaque partie` : `${minAnswers} questions`} et nous estimerons votre score en vous montrant où trouver vos prochains points.`,
    startADrill: "Commencer un entraînement",

    // StatsV2: score today
    estimatedScore: (examShortName: string) => `Score ${examShortName} estimé`,
    atYourGoalOf: (goal: string) => `Objectif de ${goal} atteint`,
    goalToGo: (goal: string, gap: number, percent: boolean) => `Objectif ${goal} · encore ${percent ? `${gap} points` : gap}`,
    sectionToGo: (n: number) => `encore ${n}`,
    neededOne: (n: number) => `Encore ${n} ${questions(n)} pour voir votre score.`,
    neededSections: (parts: { needed: number; sectionShortName: string }[]) =>
      `Encore ${parts.map((p) => `${p.needed} ${questions(p.needed)} en ${p.sectionShortName}`).join(" et ")} pour voir votre score.`,
    neededEach: (minAnswers: number) => `Répondez à ${minAnswers} questions dans chaque partie pour voir votre score.`,
    estimateFrom: (answered: number) =>
      `Une estimation à partir ${answered === 1 ? "de la question d'entraînement à laquelle vous avez répondu" : `des ${answered} questions d'entraînement auxquelles vous avez répondu`} (premier essai), pas un score officiel.`,
    lastPracticeTest: "Votre dernier test d'entraînement :",

    // StatsV2: fastest points
    fastestPoints: "Vos points les plus rapides",
    ifEachTopic: (targetPct: number) => `estimation, si vous amenez chaque thème à ${targetPct} %`,
    noPlanYet: "Répondez à quelques questions de plus et votre plan apparaîtra ici.",
    gainAbout: (n: number, percent: boolean) => (percent ? `environ +${n} %` : `environ +${n} pts`),
    pointsLabel: (percent: boolean) => (percent ? "points" : "pts"),
    moreTopicsWorth: (count: number, gain: number, percent: boolean) =>
      `${count} ${count > 1 ? "autres thèmes valant" : "autre thème valant"} environ ${percent ? `+${gain} %` : `+${gain} pts`}`,
    moreTopics: (count: number) => `${count} ${count > 1 ? "autres thèmes" : "autre thème"} dans votre plan`,
    planLockSubtitle: "Voyez chaque thème classé selon les points qu'il rapporte, et les compétences précises que vous ratez",
    unlockPlan: (price: string) => `Débloquer votre plan complet · ${price}`,
    notTriedYet: "Pas encore essayé",
    topicAccuracy: (accPct: number, answered: number) =>
      `${accPct} % justes au premier essai · ${answered} ${answered > 1 ? "répondues" : "répondue"}`,
    missedOf: (missed: number, answered: number) => `${missed} ${missed > 1 ? "ratées" : "ratée"} sur ${answered}`,
    practiceDrill: (drillName: string) => `S'entraîner : ${drillName}`,

    // StatsV2: practice tests
    practiceTests: "Tests d'entraînement",
    takeFullTest: "Faites un test d'entraînement complet pour obtenir un vrai score chronométré.",
    practiceTestN: (testNumber: number) => `Test d'entraînement ${testNumber}`,

    // StatsV2: mistake notebook
    mistakeNotebook: "Carnet d'erreurs",
    questionCount: (n: number) => `${n} ${questions(n)}`,
    noMistakesYet: "Rien pour l'instant. Chaque question ratée arrive ici pour que vous puissiez la refaire.",
    mistakesIntro: "Toutes les questions que vous avez ratées. Touchez-en une pour la refaire.",
    missLabel: (n: number) => (n === 1 ? "erreur" : "erreurs"),
    masteredSince: " · maîtrisée depuis",
    moreMistakes: (n: number) => `${n} ${n > 1 ? "autres erreurs enregistrées" : "autre erreur enregistrée"}`,
    mistakesLockSubtitle: "Refaites chaque question ratée jusqu'à ce qu'elle soit acquise",
    unlockPremiumFor: (price: string) => `Débloquer Premium pour ${price}`,

    // StatsV2: common mistakes
    commonMistakes: "Erreurs fréquentes",
    commonMistakesCard: (examShortName: string) => `Les questions ${examShortName} que la plupart des élèves ratent`,
    notEnoughData: "Pas encore assez de données. Revenez bientôt.",
    getThisWrong: "se trompent",
    communityIntro: (examShortName: string) => `Les questions ${examShortName} les plus ratées`,
    basedOnAnswersFrom: ", d'après les réponses de",
    realTestTakers: (count: string) => `${count} vrais candidats`,
    peopleGotWrong: (wrong: number, total: number) => `${wrong} personnes sur ${total} se sont trompées ici`,
    moreLocked: (n: number) => `${n} ${n > 1 ? "autres questions verrouillées" : "autre question verrouillée"}`,
    upgradeFullList: "Passez à Premium pour voir la liste complète",
    unlockWithPremium: "Débloquer avec Premium",

    // V2StatsRow
    check: "Vérifier",
    tryAgain: "Réessayer",
  },

  drill: {
    // ---- Exam-level drill (DrillRunner) ----
    lockDetail: (questions: number) => `${questions} ${questions === 1 ? "question" : "questions"}`,
    masteredCount: (mastered: number, total: number) => `${mastered} sur ${total} ${mastered > 1 ? "maîtrisées" : "maîtrisée"}`,
    toRetry: (n: number) => ` · ${n} à refaire`,
    resetAria: "Réinitialiser cet entraînement",
    masteredEyebrow: "Entraînement maîtrisé",
    masteredTitle: "Toutes les questions. Maîtrisées.",
    masteredTitleChild: "Vous avez réussi ! Tout est vert !",
    masteredDescription: (drill: string, childFriendly: boolean) =>
      `Vous avez répondu juste à toutes les questions de ${drill}. ${childFriendly ? "Regardez tout le chemin parcouru !" : "Vos efforts ont payé."}`,
    masteredDetail: (total: number, drill: string) => `${total} questions sur ${total} maîtrisées · ${drill}`,
    seeProgress: "Voir votre progression",
    practiseAgain: "S'entraîner à nouveau",
    brushUpHeading: "Revoir les bases",
    brushUpListen: "Écoutez l'explication de 30 secondes ou lisez la règle",
    brushUpRead: "La règle, l'astuce et deux exemples",
    tapToCheck: "Touchez une réponse pour la vérifier",
    check: "Vérifier",
    resetTitle: "Réinitialiser cet entraînement ?",
    resetBody: (drill: string) => `La maîtrise de ${drill} repart de zéro. Vos scores aux tests ne changent pas.`,
    reset: "Réinitialiser",

    // ---- Basics run (BasicsRunner) ----
    basicsLockDetail: (skills: number) => `${skills} ${skills > 1 ? "compétences" : "compétence"} Basics`,
    tryAgainLabel: "Réessayer",
    keepGoing: "Compris, on continue",
    tryQuestions: (n: number) => `Compris, essayer ${n} ${questions(n)}`,
    walkInstead: "Faire étape par étape",
    watchInstead: "Regarder plutôt · 30 secondes",
    basicsSub: (drill: string) => `Basics · ${drill}`,
    oneMoreLook: "Encore un coup d'œil",
    learnIt: "Apprendre · 20 secondes",
    reviewIntro: "Celle-ci est piégeuse. Voici la règle encore une fois avant la prochaine question.",
    basicsCompleteEyebrow: "Basics terminées",
    skillLearnedEyebrow: "Compétence acquise",
    allBasicsTitleChild: "Toutes vos bases sont vertes !",
    allBasicsTitle: "Des bases solides, c'est fait.",
    oneMoreSkillChild: "Encore une compétence au vert !",
    allBasicsDescription: (n: number, drill: string, childFriendly: boolean) =>
      `Vous avez acquis ${n === 1 ? "la compétence" : `les ${n} compétences`} de ${drill}. ${childFriendly ? "Place aux questions d'entraînement." : n === 1 ? "Vous êtes prêt à la mettre en pratique." : "Vous êtes prêt à les mettre en pratique."}`,
    skillLearnedChild: (skill: string, revisit: boolean) =>
      `Vous avez appris ${skill}. ${revisit ? "Vous pouvez vous y entraîner à nouveau quand vous voulez." : "Encore un pas en avant."}`,
    revisitDescription: "Vous avez déjà acquis cette compétence. Revenez quand vous voulez pour réviser.",
    retriedDescription: "Vous êtes venu à bout de chaque question, y compris celles qui ont demandé un nouvel essai.",
    perfectDescription: "Toutes les questions justes du premier coup.",
    allBasicsDetail: (n: number, drill: string) => `${n} compétences Basics sur ${n} acquises · ${drill}`,
    firstTryDetail: (firstTry: number, outOf: number) => `${firstTry} sur ${outOf} ${firstTry > 1 ? "justes" : "juste"} au premier essai`,
    retriedDetail: (n: number) => `${n} ${n > 1 ? "corrigées" : "corrigée"} au nouvel essai`,
    nextSkill: (skill: string) => `Compétence suivante : ${skill}`,
    tryPracticeChild: "Essayer les questions d'entraînement",
    tryExamLevel: "Essayer les questions de niveau examen",
    learnAgain: "Réapprendre",
    backToDrillAria: "Retour à l'entraînement",
    rightCount: (right: number, total: number) => `${right} sur ${total} ${right > 1 ? "justes" : "juste"}`,
    comingBack: (n: number) => ` · ${n} ${n > 1 ? "reviendront" : "reviendra"}`,
    rule: "Règle",
    backForAnother: "Nouvel essai",
    rightAnswerSr: " (bonne réponse)",
    yourAnswerSr: " (votre réponse)",
    right: "Juste",
    notQuite: "Pas tout à fait",
    gotItThisTime: "Cette fois, c'est bon",
    theTrick: "L'astuce :",
    walkAgain: "Refaire étape par étape",
    watchExplainer: "Regarder l'explication · 30 secondes",
    comesBack: "Cette question reviendra dans une minute.",
    finish: "Terminer",
    tapAnswer: "Touchez une réponse",
    whichPunctuation: "Quelle ponctuation va dans le blanc ?",
    whichWord: "Quel mot va dans le blanc ?",
    punctuationNames: { ";": "point-virgule", ",": "virgule", ":": "deux-points", "": "pas de ponctuation" } as Record<string, string>,

    // ---- Rule card and sheet ----
    eli5Label: "ELI5 · expliqué comme à un enfant de cinq ans",
    eli5Toggle: "Toujours pas clair ? ELI5",
    theRule: "La règle",
    trickLabel: "L'astuce",
    examples: "Exemples",
    ruleSheetAria: "La règle",
    backToQuestion: "Retour à la question",
    walkStepByStep: "Faire étape par étape",
    listenInstead: "Écouter plutôt · 30 secondes",

    // ---- Walkthrough ----
    walkthroughAria: (skill: string) => `${skill} : étape par étape`,
    closeWalkthroughAria: "Fermer l'explication étape par étape",
    walkStep: (step: number, total: number) => `Étape par étape · étape ${step} sur ${total}`,
    readIt: "Lire",
    rightSr: " (juste)",
    notThisOneSr: " (pas celle-ci)",
    notThatOne: "Pas celle-là. Réessayez.",
    solveOnBoard: "Résolvez-le au tableau",
    skip: "Passer",

    // ---- Explainer ----
    beatLabels: { rule: "La règle", trick: "L'astuce", bad: "Ça ne marche pas", good: "Ça marche", work1: "Exemple résolu", work2: "Encore un", close: "" },
    playCopySentence: "La règle, l'astuce, une phrase qui l'enfreint et une qui la respecte. Montez le son.",
    playCopyWorked: "La règle, l'astuce, puis deux exemples résolus étape par étape. Montez le son.",
    seconds: (n: number) => `${n} ${n > 1 ? "secondes" : "seconde"}`,
    halfMinute: "une demi-minute",
    explainerSilent: (n: number) => `Explication · ${n} secondes · sans son`,
    explainerLength: (length: string) => `Explication · ${length}`,
    explainerAria: (skill: string) => `${skill} : explication`,
    closeExplainerAria: "Fermer l'explication",
    jumpTo: (label: string) => `Aller à : ${label}`,
    pausedTap: "En pause · touchez pour continuer",
    playTitle: (skill: string, length: string) => `${skill}, en ${length}.`,
    starting: "Démarrage...",
    play: "Lire",
    pause: "Pause",
    replay: "Revoir",
    loadingSound: "Chargement du son...",
    tapToPause: "Touchez n'importe où pour mettre en pause",
    breaksRule: "Enfreint la règle",
    followsRule: "Respecte la règle",
    wrongWordSr: " (mauvais mot)",
    fixedSr: " (corrigé)",

    // ---- Drag boards (play/*) ----
    tryAnotherOne: "En essayer un autre",
    solveX: {
      stage0: (loose: string) =>
        `Faites glisser ${loose} de l'autre côté du signe = (ou touchez-le). De l'autre côté, il change de signe.`,
      stage1: (c: string, term: string) => `Touchez maintenant ${c} ${term} pour le calculer.`,
      stage2: (a: number, right: string) =>
        `x est encore multiplié par ${a}. Faites glisser ${a} sous ${right} (ou touchez-le) pour diviser.`,
      stage3: "Touchez la fraction pour la calculer.",
      solved: (answer: number, a: number, b: string, c: number) => `x = ${answer}. Vérification : ${a} × ${answer} ${b} = ${c} ✓`,
      wrongCoefFirst: (loose: string) => `Pas encore. Défaites dans l'ordre inverse : déplacez d'abord le ${loose} isolé.`,
      wrongXFirst: (loose: string) => `Laissez x où il est. Éloignez-en le ${loose}.`,
      wrongCFirst: (loose: string) => `Commencez par le ${loose} à gauche.`,
      wrongXSecond: (a: number) => `x reste en place. Déplacez le ${a} qui lui est attaché.`,
      wrongCSecond: (a: number) => `Faites plutôt glisser le ${a}. Il est attaché à x par une multiplication.`,
      moveAria: (term: string) => `${term}. Le déplacer de l'autre côté du signe égal.`,
      divideAria: (term: string) => `${term}. Diviser les deux côtés par ${term}.`,
      workSubtractAria: (c: string, term: string) => `${c} ${term}. Le calculer.`,
      workDivideAria: (c: string, a: number) => `${c} divisé par ${a}. Le calculer.`,
    },
  },
};

registerV2Ui("fr", FR);
