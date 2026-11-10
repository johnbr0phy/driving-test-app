// Registry-exam page copy that is not in i18n/*.ts: the lines the shared
// exam components (components/exam/*) build around an ExamConfig. Every
// language an exam can run in (a translation or a native base language) needs
// an entry; any other reads English. The de, fr, it, pl, nl, pt, sv, da, fi, hu, ro, el and zh entries
// are machine-translated, pending native review.

import type { Language } from "@/i18n";

export interface ExamUi {
  heroTitle: (done: number, total: number) => string;
  questionsCount: (n: number) => string;
  needToPass: (pct: number) => string;
  fullLengthExam: string;
  testN: (n: number) => string;
  /** "CDL Test 2" in the test page's progress heading. */
  examTestN: (shortName: string, n: number) => string;
  pctToPass: (pct: number) => string;
  yourStats: string;
  yourStatsSub: string;
  aboutThisTest: string;
  /** Lock screen of a Premium step (lib/examLocks.ts). */
  premiumStep: string;
  unlockPremium: string;
  backToDashboard: string;
  trainingBadge: (shortName: string) => string;
  masteredMyTraining: (shortName: string) => string;
  mastered: string;
  /** Button to the next unfinished part of a split set, by its display name. */
  nextPart: (name: string) => string;
  setN: (n: number) => string;
  statsSeen: (seen: number, total: number, shortName: string) => string;
  /** Locale for attempt-chart dates. */
  dateLocale: string;
}

const en: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Complete all ${total} steps`;
    if (done === total) return "You're ready";
    if (done === total - 1) return "One left";
    if (done === 1) return `Good start. 1 of ${total} done`;
    const frac = done / total;
    if (frac < 0.45) return `${done} of ${total} done`;
    if (frac < 0.55) return "Halfway there";
    if (frac < 0.8) return "More than halfway";
    return `${done} of ${total}, almost there`;
  },
  questionsCount: (n) => `${n} questions`,
  needToPass: (pct) => `Need ${pct}%+ to pass`,
  fullLengthExam: "🎯 Full-length exam",
  testN: (n) => `🎯 Test ${n}`,
  examTestN: (shortName, n) => `${shortName} Test ${n}`,
  pctToPass: (pct) => `${pct}% to pass`,
  yourStats: "Your stats",
  yourStatsSub: "Every question you've seen, sorted by what you keep missing",
  aboutThisTest: "About this practice test",
  premiumStep: "This step is part of Tigertest Premium. Every step before it is free.",
  unlockPremium: "Unlock with Premium",
  backToDashboard: "Back to the dashboard",
  trainingBadge: (shortName) => `${shortName} TRAINING`,
  masteredMyTraining: (shortName) => `MASTERED MY ${shortName} TRAINING`,
  mastered: "MASTERED",
  nextPart: (name) => `Next: ${name}`,
  setN: (n) => `Set ${n}`,
  statsSeen: (seen, total, shortName) =>
    `${seen} of ${total} ${shortName} questions seen. Tap any row to answer it again.`,
  dateLocale: "en-US",
};

const es: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Completa los ${total} pasos`;
    if (done === total) return "Estás listo";
    if (done === total - 1) return "Te falta uno";
    if (done === 1) return `Buen comienzo. 1 de ${total} listo`;
    const frac = done / total;
    if (frac < 0.45) return `${done} de ${total} listos`;
    if (frac < 0.55) return "Vas a la mitad";
    if (frac < 0.8) return "Más de la mitad";
    return `${done} de ${total}, ya casi`;
  },
  questionsCount: (n) => `${n} preguntas`,
  needToPass: (pct) => `Necesitas ${pct}% o más para aprobar`,
  fullLengthExam: "🎯 Examen completo",
  testN: (n) => `🎯 Examen ${n}`,
  examTestN: (shortName, n) => `Examen ${n} de ${shortName}`,
  pctToPass: (pct) => `${pct}% para aprobar`,
  yourStats: "Tus estadísticas",
  yourStatsSub: "Cada pregunta que has visto, ordenada por las que más fallas",
  aboutThisTest: "Sobre este examen de práctica",
  premiumStep: "Este paso es parte de Tigertest Premium. Todos los pasos anteriores son gratis.",
  unlockPremium: "Desbloquear con Premium",
  backToDashboard: "Volver al panel",
  trainingBadge: (shortName) => `ENTRENAMIENTO ${shortName}`,
  masteredMyTraining: (shortName) => `DOMINÉ MI ENTRENAMIENTO ${shortName}`,
  mastered: "DOMINADO",
  nextPart: (name) => `Siguiente: ${name}`,
  setN: (n) => `Grupo ${n}`,
  statsSeen: (seen, total, shortName) =>
    `Has visto ${seen} de ${total} preguntas de ${shortName}. Toca cualquier fila para responderla de nuevo.`,
  dateLocale: "es-US",
};

const vi: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Hoàn thành cả ${total} bước`;
    if (done === total) return `Bạn đã sẵn sàng`;
    if (done === total - 1) return `Còn một bước`;
    if (done === 1) return `Khởi đầu tốt. Xong 1/${total}`;
    const frac = done / total;
    if (frac < 0.45) return `Xong ${done}/${total}`;
    if (frac < 0.55) return `Đã được một nửa`;
    if (frac < 0.8) return `Đã hơn một nửa`;
    return `${done}/${total}, sắp xong rồi`;
  },
  questionsCount: (n) => `${n} câu hỏi`,
  needToPass: (pct) => `Cần đạt ${pct}% trở lên để đậu`,
  fullLengthExam: "🎯 Bài thi đầy đủ",
  testN: (n) => `🎯 Bài thi ${n}`,
  examTestN: (shortName, n) => `Bài thi ${shortName} số ${n}`,
  pctToPass: (pct) => `${pct}% để đậu`,
  yourStats: "Thống kê của bạn",
  yourStatsSub: "Mọi câu hỏi bạn đã gặp, sắp xếp theo những câu bạn hay sai nhất",
  aboutThisTest: "Về bài thi thử này",
  premiumStep: "Bước này thuộc Tigertest Premium. Mọi bước trước đó đều miễn phí.",
  unlockPremium: "Mở khóa với Premium",
  backToDashboard: "Quay lại bảng điều khiển",
  trainingBadge: (shortName) => `LUYỆN TẬP ${shortName}`,
  masteredMyTraining: (shortName) => `ĐÃ NẮM VỮNG PHẦN LUYỆN TẬP ${shortName}`,
  mastered: "ĐÃ NẮM VỮNG",
  nextPart: (name) => `Tiếp theo: ${name}`,
  setN: (n) => `Bộ ${n}`,
  statsSeen: (seen, total, shortName) => `Đã gặp ${seen}/${total} câu hỏi ${shortName}. Chạm vào hàng bất kỳ để trả lời lại.`,
  dateLocale: "vi-VN",
};

const ko: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `${total}단계를 모두 완료하세요`;
    if (done === total) return `준비됐어요`;
    if (done === total - 1) return `하나 남았어요`;
    if (done === 1) return `좋은 출발이에요. ${total}개 중 1개 완료`;
    const frac = done / total;
    if (frac < 0.45) return `${total}개 중 ${done}개 완료`;
    if (frac < 0.55) return `절반 왔어요`;
    if (frac < 0.8) return `절반 넘었어요`;
    return `${total}개 중 ${done}개, 거의 다 왔어요`;
  },
  questionsCount: (n) => `${n}문항`,
  needToPass: (pct) => `합격하려면 ${pct}% 이상 필요해요`,
  fullLengthExam: "🎯 실전 길이 시험",
  testN: (n) => `🎯 시험 ${n}`,
  examTestN: (shortName, n) => `${shortName} 시험 ${n}`,
  pctToPass: (pct) => `합격 기준 ${pct}%`,
  yourStats: "내 통계",
  yourStatsSub: "지금까지 본 모든 문제를 자주 틀리는 순서로 정리했어요",
  aboutThisTest: "이 연습 시험에 대해",
  premiumStep: "이 단계는 Tigertest Premium에 포함됩니다. 이전 단계는 모두 무료입니다.",
  unlockPremium: "Premium으로 잠금 해제",
  backToDashboard: "대시보드로 돌아가기",
  trainingBadge: (shortName) => `${shortName} 연습`,
  masteredMyTraining: (shortName) => `${shortName} 연습 마스터 완료`,
  mastered: "마스터 완료",
  nextPart: (name) => `다음: ${name}`,
  setN: (n) => `세트 ${n}`,
  statsSeen: (seen, total, shortName) => `${shortName} 문제 ${total}개 중 ${seen}개를 봤어요. 아무 줄이나 눌러 다시 풀어 보세요.`,
  dateLocale: "ko-KR",
};

const zh: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `完成全部 ${total} 个步骤`;
    if (done === total) return "你已经准备好了";
    if (done === total - 1) return "只剩一个";
    if (done === 1) return `好的开始。已完成 1/${total}`;
    const frac = done / total;
    if (frac < 0.45) return `已完成 ${done}/${total}`;
    if (frac < 0.55) return "已经完成一半";
    if (frac < 0.8) return "已经过半";
    return `${done}/${total}，快完成了`;
  },
  questionsCount: (n) => `${n} 道题`,
  needToPass: (pct) => `需达到 ${pct}% 以上才能通过`,
  fullLengthExam: "🎯 完整考试",
  testN: (n) => `🎯 考试 ${n}`,
  examTestN: (shortName, n) => `${shortName} 考试 ${n}`,
  pctToPass: (pct) => `${pct}% 及格`,
  yourStats: "你的统计",
  yourStatsSub: "你做过的每道题，按最常答错的排序",
  aboutThisTest: "关于这套模拟考试",
  premiumStep: "此步骤属于 Tigertest Premium。之前的所有步骤均免费。",
  unlockPremium: "使用 Premium 解锁",
  backToDashboard: "返回学习面板",
  trainingBadge: (shortName) => `${shortName} 练习`,
  masteredMyTraining: (shortName) => `已掌握 ${shortName} 练习`,
  mastered: "已掌握",
  nextPart: (name) => `下一部分：${name}`,
  setN: (n) => `练习组 ${n}`,
  statsSeen: (seen, total, shortName) => `已做过 ${shortName} 的 ${total} 道题中的 ${seen} 道。点任意一行可以再答一次。`,
  dateLocale: "zh-CN",
};

const de: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Schaffe alle ${total} Schritte`;
    if (done === total) return "Du bist bereit";
    if (done === total - 1) return "Noch einer";
    if (done === 1) return `Guter Start. 1 von ${total} geschafft`;
    const frac = done / total;
    if (frac < 0.45) return `${done} von ${total} geschafft`;
    if (frac < 0.55) return "Halbzeit";
    if (frac < 0.8) return "Mehr als die Hälfte";
    return `${done} von ${total}, fast geschafft`;
  },
  questionsCount: (n) => `${n} Fragen`,
  needToPass: (pct) => `${pct} % zum Bestehen nötig`,
  fullLengthExam: "🎯 Komplette Prüfung",
  testN: (n) => `🎯 Test ${n}`,
  examTestN: (shortName, n) => `${shortName} Test ${n}`,
  pctToPass: (pct) => `${pct} % zum Bestehen`,
  yourStats: "Deine Statistiken",
  yourStatsSub: "Jede Frage, die du gesehen hast, sortiert nach deinen häufigsten Fehlern",
  aboutThisTest: "Über diesen Übungstest",
  premiumStep: "Dieser Schritt gehört zu Tigertest Premium. Alle Schritte davor sind kostenlos.",
  unlockPremium: "Mit Premium freischalten",
  backToDashboard: "Zurück zur Übersicht",
  trainingBadge: (shortName) => `${shortName} TRAINING`,
  masteredMyTraining: (shortName) => `${shortName} TRAINING GEMEISTERT`,
  mastered: "GEMEISTERT",
  nextPart: (name) => `Weiter: ${name}`,
  setN: (n) => `Set ${n}`,
  statsSeen: (seen, total, shortName) => `${seen} von ${total} ${shortName}-Fragen gesehen. Tippe auf eine Zeile, um sie nochmal zu beantworten.`,
  dateLocale: "de-DE",
};

const fr: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Terminez les ${total} étapes`;
    if (done === total) return "Vous êtes prêt";
    if (done === total - 1) return "Plus qu'une";
    if (done === 1) return `Bon début. 1 sur ${total}`;
    const frac = done / total;
    if (frac < 0.45) return `${done} sur ${total}`;
    if (frac < 0.55) return "À mi-chemin";
    if (frac < 0.8) return "Plus de la moitié";
    return `${done} sur ${total}, presque fini`;
  },
  questionsCount: (n) => `${n} questions`,
  needToPass: (pct) => `${pct}\u00a0% ou plus pour réussir`,
  fullLengthExam: "🎯 Examen complet",
  testN: (n) => `🎯 Test ${n}`,
  examTestN: (shortName, n) => `${shortName}, test ${n}`,
  pctToPass: (pct) => `${pct}\u00a0% pour réussir`,
  yourStats: "Vos statistiques",
  yourStatsSub: "Chaque question vue, triée selon celles que vous ratez le plus",
  aboutThisTest: "À propos de ce test d'entraînement",
  premiumStep: "Cette étape fait partie de Tigertest Premium. Toutes les étapes précédentes sont gratuites.",
  unlockPremium: "Débloquer avec Premium",
  backToDashboard: "Retour au tableau de bord",
  trainingBadge: (shortName) => `ENTRAÎNEMENT ${shortName}`,
  masteredMyTraining: (shortName) => `ENTRAÎNEMENT ${shortName} MAÎTRISÉ`,
  mastered: "MAÎTRISÉ",
  nextPart: (name) => `Suivant\u00a0: ${name}`,
  setN: (n) => `Série ${n}`,
  statsSeen: (seen, total, shortName) => `${seen} questions ${shortName} vues sur ${total}. Touchez une ligne pour y répondre à nouveau.`,
  dateLocale: "fr-FR",
};

const it: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Completa tutti i ${total} passaggi`;
    if (done === total) return "Sei pronto";
    if (done === total - 1) return "Ne manca uno";
    if (done === 1) return `Bell'inizio. 1 su ${total}`;
    const frac = done / total;
    if (frac < 0.45) return `${done} su ${total}`;
    if (frac < 0.55) return "A metà strada";
    if (frac < 0.8) return "Oltre la metà";
    return `${done} su ${total}, quasi fatto`;
  },
  questionsCount: (n) => `${n} domande`,
  needToPass: (pct) => `Serve almeno il ${pct}% per passare`,
  fullLengthExam: "🎯 Esame completo",
  testN: (n) => `🎯 Test ${n}`,
  examTestN: (shortName, n) => `${shortName}, test ${n}`,
  pctToPass: (pct) => `${pct}% per passare`,
  yourStats: "Le tue statistiche",
  yourStatsSub: "Ogni domanda che hai visto, ordinata per quelle che sbagli di più",
  aboutThisTest: "Su questo test di esercitazione",
  premiumStep: "Questo passaggio fa parte di Tigertest Premium. Tutti i passaggi precedenti sono gratuiti.",
  unlockPremium: "Sblocca con Premium",
  backToDashboard: "Torna alla dashboard",
  trainingBadge: (shortName) => `ALLENAMENTO ${shortName}`,
  masteredMyTraining: (shortName) => `ALLENAMENTO ${shortName} PADRONEGGIATO`,
  mastered: "PADRONEGGIATO",
  nextPart: (name) => `Avanti: ${name}`,
  setN: (n) => `Set ${n}`,
  statsSeen: (seen, total, shortName) => `Hai visto ${seen} domande ${shortName} su ${total}. Tocca una riga per rispondere di nuovo.`,
  dateLocale: "it-IT",
};

const pl: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Ukończ wszystkie kroki (${total})`;
    if (done === total) return "Jesteś gotów";
    if (done === total - 1) return "Został jeden";
    if (done === 1) return `Dobry start. 1 z ${total}`;
    const frac = done / total;
    if (frac < 0.45) return `${done} z ${total}`;
    if (frac < 0.55) return "Połowa za tobą";
    if (frac < 0.8) return "Ponad połowa";
    return `${done} z ${total}, prawie gotowe`;
  },
  questionsCount: (n) => `Pytania: ${n}`,
  needToPass: (pct) => `Do zdania potrzeba ${pct}%`,
  fullLengthExam: "🎯 Pełny egzamin",
  testN: (n) => `🎯 Test ${n}`,
  examTestN: (shortName, n) => `${shortName}, test ${n}`,
  pctToPass: (pct) => `${pct}% do zdania`,
  yourStats: "Twoje statystyki",
  yourStatsSub: "Każde pytanie, które widziałeś, według tego, w czym mylisz się najczęściej",
  aboutThisTest: "O tym teście próbnym",
  premiumStep: "Ten krok jest częścią Tigertest Premium. Wszystkie wcześniejsze kroki są bezpłatne.",
  unlockPremium: "Odblokuj z Premium",
  backToDashboard: "Wróć do panelu",
  trainingBadge: (shortName) => `TRENING ${shortName}`,
  masteredMyTraining: (shortName) => `OPANOWAŁEM TRENING ${shortName}`,
  mastered: "OPANOWANE",
  nextPart: (name) => `Dalej: ${name}`,
  setN: (n) => `Zestaw ${n}`,
  statsSeen: (seen, total, shortName) => `Widziane pytania ${shortName}: ${seen} z ${total}. Dotknij wiersza, aby odpowiedzieć ponownie.`,
  dateLocale: "pl-PL",
};

const nl: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Rond alle ${total} stappen af`;
    if (done === total) return "Je bent er klaar voor";
    if (done === total - 1) return "Nog één";
    if (done === 1) return `Goed begin. 1 van ${total} klaar`;
    const frac = done / total;
    if (frac < 0.45) return `${done} van ${total} klaar`;
    if (frac < 0.55) return "Halverwege";
    if (frac < 0.8) return "Meer dan de helft";
    return `${done} van ${total}, bijna klaar`;
  },
  questionsCount: (n) => `${n} vragen`,
  needToPass: (pct) => `${pct}% of meer nodig om te slagen`,
  fullLengthExam: "🎯 Volledig examen",
  testN: (n) => `🎯 Toets ${n}`,
  examTestN: (shortName, n) => `${shortName} toets ${n}`,
  pctToPass: (pct) => `${pct}% om te slagen`,
  yourStats: "Jouw statistieken",
  yourStatsSub: "Elke vraag die je hebt gezien, gesorteerd op wat je het vaakst fout hebt",
  aboutThisTest: "Over deze oefentoets",
  premiumStep: "Deze stap hoort bij Tigertest Premium. Alle stappen ervoor zijn gratis.",
  unlockPremium: "Ontgrendelen met Premium",
  backToDashboard: "Terug naar het dashboard",
  trainingBadge: (shortName) => `${shortName} TRAINING`,
  masteredMyTraining: (shortName) => `${shortName} TRAINING BEHEERST`,
  mastered: "BEHEERST",
  nextPart: (name) => `Volgende: ${name}`,
  setN: (n) => `Set ${n}`,
  statsSeen: (seen, total, shortName) => `${seen} van de ${total} ${shortName}-vragen gezien. Tik op een rij om hem opnieuw te beantwoorden.`,
  dateLocale: "nl-NL",
};

const pt: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Concluir os ${total} passos`;
    if (done === total) return "Está pronto";
    if (done === total - 1) return "Falta um";
    if (done === 1) return `Bom começo. 1 de ${total} feito`;
    const frac = done / total;
    if (frac < 0.45) return `${done} de ${total} feitos`;
    if (frac < 0.55) return "A meio caminho";
    if (frac < 0.8) return "Mais de metade";
    return `${done} de ${total}, quase lá`;
  },
  questionsCount: (n) => `${n} perguntas`,
  needToPass: (pct) => `São precisos ${pct}% ou mais para passar`,
  fullLengthExam: "🎯 Exame completo",
  testN: (n) => `🎯 Teste ${n}`,
  examTestN: (shortName, n) => `${shortName}, teste ${n}`,
  pctToPass: (pct) => `${pct}% para passar`,
  yourStats: "As suas estatísticas",
  yourStatsSub: "Todas as perguntas já vistas, ordenadas pelas que mais erra",
  aboutThisTest: "Sobre este teste de treino",
  premiumStep: "Este passo faz parte do Tigertest Premium. Todos os passos anteriores são gratuitos.",
  unlockPremium: "Desbloquear com Premium",
  backToDashboard: "Voltar ao painel",
  trainingBadge: (shortName) => `TREINO ${shortName}`,
  masteredMyTraining: (shortName) => `TREINO ${shortName} DOMINADO`,
  mastered: "DOMINADO",
  nextPart: (name) => `Seguinte: ${name}`,
  setN: (n) => `Conjunto ${n}`,
  statsSeen: (seen, total, shortName) => `${seen} de ${total} perguntas ${shortName} vistas. Toque numa linha para responder outra vez.`,
  dateLocale: "pt-PT",
};

const sv: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Klara alla ${total} steg`;
    if (done === total) return "Du är redo";
    if (done === total - 1) return "Ett kvar";
    if (done === 1) return `Bra start. 1 av ${total} klart`;
    const frac = done / total;
    if (frac < 0.45) return `${done} av ${total} klara`;
    if (frac < 0.55) return "Halvvägs";
    if (frac < 0.8) return "Mer än halvvägs";
    return `${done} av ${total}, nästan klart`;
  },
  questionsCount: (n) => `${n} frågor`,
  needToPass: (pct) => `${pct} % krävs för godkänt`,
  fullLengthExam: "🎯 Fullängdsprov",
  testN: (n) => `🎯 Prov ${n}`,
  examTestN: (shortName, n) => `${shortName}, prov ${n}`,
  pctToPass: (pct) => `${pct} % för godkänt`,
  yourStats: "Din statistik",
  yourStatsSub: "Varje fråga du har sett, sorterad efter vad du oftast svarar fel på",
  aboutThisTest: "Om det här övningsprovet",
  premiumStep: "Det här steget ingår i Tigertest Premium. Alla steg före det är gratis.",
  unlockPremium: "Lås upp med Premium",
  backToDashboard: "Tillbaka till översikten",
  trainingBadge: (shortName) => `TRÄNING ${shortName}`,
  masteredMyTraining: (shortName) => `JAG HAR BEMÄSTRAT TRÄNINGEN ${shortName}`,
  mastered: "BEMÄSTRAT",
  nextPart: (name) => `Nästa: ${name}`,
  setN: (n) => `Set ${n}`,
  statsSeen: (seen, total, shortName) => `Du har sett ${seen} av ${total} frågor för ${shortName}. Tryck på en rad för att svara igen.`,
  dateLocale: "sv-SE",
};

const da: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Gør alle ${total} trin færdige`;
    if (done === total) return "Du er klar";
    if (done === total - 1) return "Ét tilbage";
    if (done === 1) return `Godt begyndt. 1 af ${total} færdig`;
    const frac = done / total;
    if (frac < 0.45) return `${done} af ${total} færdige`;
    if (frac < 0.55) return "Halvvejs";
    if (frac < 0.8) return "Mere end halvdelen";
    return `${done} af ${total}, næsten klar`;
  },
  questionsCount: (n) => `${n} spørgsmål`,
  needToPass: (pct) => `Du skal have ${pct}% for at bestå`,
  fullLengthExam: "🎯 Hel prøve",
  testN: (n) => `🎯 Prøve ${n}`,
  examTestN: (shortName, n) => `${shortName} prøve ${n}`,
  pctToPass: (pct) => `${pct}% for at bestå`,
  yourStats: "Din statistik",
  yourStatsSub: "Hvert spørgsmål, du har set, sorteret efter det, du oftest svarer forkert på",
  aboutThisTest: "Om denne øvelsesprøve",
  premiumStep: "Dette trin er en del af Tigertest Premium. Alle trin før det er gratis.",
  unlockPremium: "Lås op med Premium",
  backToDashboard: "Tilbage til oversigten",
  trainingBadge: (shortName) => `${shortName} TRÆNING`,
  masteredMyTraining: (shortName) => `${shortName} TRÆNING MESTRET`,
  mastered: "MESTRET",
  nextPart: (name) => `Næste: ${name}`,
  setN: (n) => `Sæt ${n}`,
  statsSeen: (seen, total, shortName) => `${seen} af ${total} ${shortName}-spørgsmål set. Tryk på en række for at svare igen.`,
  dateLocale: "da-DK",
};

const fi: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Tee kaikki ${total} vaihetta`;
    if (done === total) return "Olet valmis";
    if (done === total - 1) return "Yksi jäljellä";
    if (done === 1) return `Hyvä alku. 1/${total} tehty`;
    const frac = done / total;
    if (frac < 0.45) return `${done}/${total} tehty`;
    if (frac < 0.55) return "Puolivälissä";
    if (frac < 0.8) return "Yli puolivälin";
    return `${done}/${total}, melkein valmis`;
  },
  questionsCount: (n) => `${n} kysymystä`,
  needToPass: (pct) => `Läpäisyyn tarvitaan ${pct} %`,
  fullLengthExam: "🎯 Täysimittainen koe",
  testN: (n) => `🎯 Koe ${n}`,
  examTestN: (shortName, n) => `${shortName}, koe ${n}`,
  pctToPass: (pct) => `${pct} % läpäisyyn`,
  yourStats: "Omat tilastosi",
  yourStatsSub: "Jokainen näkemäsi kysymys, järjestettynä sen mukaan, mihin vastaat useimmin väärin",
  aboutThisTest: "Tietoa tästä harjoituskokeesta",
  premiumStep: "Tämä vaihe kuuluu Tigertest Premiumiin. Kaikki sitä edeltävät vaiheet ovat ilmaisia.",
  unlockPremium: "Avaa Premiumilla",
  backToDashboard: "Takaisin koontinäkymään",
  trainingBadge: (shortName) => `HARJOITTELU ${shortName}`,
  masteredMyTraining: (shortName) => `${shortName}: HARJOITTELU HALLUSSA`,
  mastered: "HALLUSSA",
  nextPart: (name) => `Seuraavaksi: ${name}`,
  setN: (n) => `Sarja ${n}`,
  statsSeen: (seen, total, shortName) => `Olet nähnyt ${seen}/${total} kokeen ${shortName} kysymyksistä. Napauta riviä vastataksesi uudelleen.`,
  dateLocale: "fi-FI",
};

const hu: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Teljesítsd mind a(z) ${total} lépést`;
    if (done === total) return "Készen állsz";
    if (done === total - 1) return "Már csak egy";
    if (done === 1) return `Jó kezdés. ${total} lépésből 1 kész`;
    const frac = done / total;
    if (frac < 0.45) return `${total} lépésből ${done} kész`;
    if (frac < 0.55) return "Félúton vagy";
    if (frac < 0.8) return "Túl vagy a felén";
    return `${total} lépésből ${done} kész, majdnem megvan`;
  },
  questionsCount: (n) => `${n} kérdés`,
  needToPass: (pct) => `A sikerhez ${pct}% kell`,
  fullLengthExam: "🎯 Teljes hosszúságú vizsga",
  testN: (n) => `🎯 ${n}. teszt`,
  examTestN: (shortName, n) => `${shortName}, ${n}. teszt`,
  pctToPass: (pct) => `${pct}% a sikerhez`,
  yourStats: "Statisztikáid",
  yourStatsSub: "Minden kérdés, amit láttál, aszerint rendezve, amit a legtöbbször elrontasz",
  aboutThisTest: "Erről a gyakorló tesztről",
  premiumStep: "Ez a lépés a Tigertest Premium része. Az összes korábbi lépés ingyenes.",
  unlockPremium: "Feloldás Premiummal",
  backToDashboard: "Vissza az irányítópultra",
  trainingBadge: (shortName) => `GYAKORLÁS: ${shortName}`,
  masteredMyTraining: (shortName) => `ELSAJÁTÍTOTTAM: ${shortName} GYAKORLÁS`,
  mastered: "ELSAJÁTÍTVA",
  nextPart: (name) => `Következik: ${name}`,
  setN: (n) => `${n}. sorozat`,
  statsSeen: (seen, total, shortName) => `${shortName}: eddig ${seen} / ${total} kérdést láttál. Koppints egy sorra, hogy újra válaszolj.`,
  dateLocale: "hu-HU",
};

/** Romanian: "de" between a number and its noun from 20 up ("8 pași", "20 de pași"). */
const roDe = (n: number, noun: string) => {
  const r = n % 100;
  return (r === 0 && n !== 0) || r >= 20 ? `${n} de ${noun}` : `${n} ${noun}`;
};

const ro: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Fă toți cei ${roDe(total, "pași")}`;
    if (done === total) return "Ești pregătit";
    if (done === total - 1) return "Încă unul";
    if (done === 1) return `Început bun. 1 din ${total} gata`;
    const frac = done / total;
    if (frac < 0.45) return `${done} din ${total} gata`;
    if (frac < 0.55) return "La jumătatea drumului";
    if (frac < 0.8) return "Peste jumătate";
    return `${done} din ${total}, aproape gata`;
  },
  questionsCount: (n) => roDe(n, "întrebări"),
  needToPass: (pct) => `Ai nevoie de ${pct}% ca să treci`,
  fullLengthExam: "🎯 Examen complet",
  testN: (n) => `🎯 Testul ${n}`,
  examTestN: (shortName, n) => `${shortName}, testul ${n}`,
  pctToPass: (pct) => `${pct}% pentru promovare`,
  yourStats: "Statisticile tale",
  yourStatsSub: "Fiecare întrebare pe care ai văzut-o, ordonată după cele pe care le greșești cel mai des",
  aboutThisTest: "Despre acest test de exersare",
  premiumStep: "Acest pas face parte din Tigertest Premium. Toți pașii dinaintea lui sunt gratuiți.",
  unlockPremium: "Deblochează cu Premium",
  backToDashboard: "Înapoi la panou",
  trainingBadge: (shortName) => `ANTRENAMENT: ${shortName}`,
  masteredMyTraining: (shortName) => `AM STĂPÂNIT ANTRENAMENTUL ${shortName}`,
  mastered: "STĂPÂNIT",
  nextPart: (name) => `Urmează: ${name}`,
  setN: (n) => `Setul ${n}`,
  statsSeen: (seen, total, shortName) => `${shortName}: ai văzut ${seen} din ${roDe(total, "întrebări")}. Atinge un rând ca să răspunzi din nou.`,
  dateLocale: "ro-RO",
};

const el: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Ολοκλήρωσε και τα ${total} βήματα`;
    if (done === total) return "Τα κατάφερες";
    if (done === total - 1) return "Μένει ένα";
    if (done === 1) return `Καλή αρχή. 1/${total} έτοιμο`;
    const frac = done / total;
    if (frac < 0.45) return `${done}/${total} έτοιμα`;
    if (frac < 0.55) return "Στα μισά του δρόμου";
    if (frac < 0.8) return "Πέρα από τη μέση";
    return `${done}/${total}, σχεδόν έτοιμο`;
  },
  questionsCount: (n) => `${n} ερωτήσεις`,
  needToPass: (pct) => `Χρειάζεσαι ${pct} % για να περάσεις`,
  fullLengthExam: "🎯 Πλήρης εξέταση",
  testN: (n) => `🎯 Τεστ ${n}`,
  examTestN: (shortName, n) => `${shortName}, τεστ ${n}`,
  pctToPass: (pct) => `${pct} % για επιτυχία`,
  yourStats: "Τα στατιστικά σου",
  yourStatsSub: "Κάθε ερώτηση που έχεις δει, ταξινομημένη με βάση αυτές που απαντάς πιο συχνά λάθος",
  aboutThisTest: "Σχετικά με αυτό το τεστ εξάσκησης",
  premiumStep: "Αυτό το βήμα ανήκει στο Tigertest Premium. Όλα τα προηγούμενα βήματα είναι δωρεάν.",
  unlockPremium: "Ξεκλείδωμα με Premium",
  backToDashboard: "Πίσω στον πίνακα",
  trainingBadge: (shortName) => `ΕΞΑΣΚΗΣΗ ${shortName}`,
  masteredMyTraining: (shortName) => `${shortName}: Η ΕΞΑΣΚΗΣΗ ΚΑΤΑΚΤΗΘΗΚΕ`,
  mastered: "ΚΑΤΑΚΤΗΘΗΚΕ",
  nextPart: (name) => `Επόμενο: ${name}`,
  setN: (n) => `Σετ ${n}`,
  statsSeen: (seen, total, shortName) => `Έχεις δει ${seen} από τις ${total} ερωτήσεις του ${shortName}. Πάτα μια γραμμή για να απαντήσεις ξανά.`,
  dateLocale: "el-GR",
};

const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, sv, da, fi, hu, ro, el };

export function examUi(lang: Language, englishLocale: "en-US" | "en-GB" = "en-US"): ExamUi {
  if (lang === "en" && englishLocale === "en-GB") return { ...en, dateLocale: "en-GB" };
  return EXAM_UI[lang] ?? en;
}
