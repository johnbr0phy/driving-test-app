// The bullets the Premium paywall lists on a v1 exam: the locked step's paywall
// (components/exam/ExamLockScreen.tsx) and the stats paywall
// (components/exam/ExamStatsPage.tsx). One entry per interface language, so a
// test read in German sells in German. Translations are machine-written.

import type { Language } from "@/i18n";

export interface ExamPaywallCopy {
  /** Bullets for a locked training step or practice test. */
  premium: (shortName: string) => string[];
  /** Bullets for the stats paywall; `total` is the exam's question count. */
  stats: (total: number, shortName: string) => string[];
}

const COPY: Record<Language, ExamPaywallCopy> = {
  en: {
    premium: (s) => [
      `The final ${s} training step and practice test`,
      `Full stats on every ${s} question you miss`,
      "The same on every other Tigertest exam, the DMV included",
      "One payment, yours forever",
    ],
    stats: (n, s) => [
      `See your accuracy on all ${n} ${s} questions`,
      "See what you keep getting wrong, worst first",
      "Full stats on every exam, the DMV included",
      "One payment, yours forever",
    ],
  },
  es: {
    premium: (s) => [
      `El último paso de práctica y el último examen de ${s}`,
      `Estadísticas completas de cada pregunta de ${s} que falles`,
      "Lo mismo en todos los demás exámenes de Tigertest, incluido el DMV",
      "Un solo pago, tuyo para siempre",
    ],
    stats: (n, s) => [
      `Mira tu precisión en las ${n} preguntas de ${s}`,
      "Mira en qué sigues fallando, de peor a mejor",
      "Estadísticas completas en todos los exámenes, incluido el DMV",
      "Un solo pago, tuyo para siempre",
    ],
  },
  vi: {
    premium: (s) => [
      `Bước luyện tập cuối và bài thi thử cuối của ${s}`,
      `Thống kê đầy đủ cho mọi câu ${s} bạn làm sai`,
      "Tương tự với mọi bài thi khác trên Tigertest, kể cả DMV",
      "Trả một lần, dùng mãi mãi",
    ],
    stats: (n, s) => [
      `Xem độ chính xác của bạn trên cả ${n} câu hỏi ${s}`,
      "Xem những câu bạn hay sai, sai nhiều nhất trước",
      "Thống kê đầy đủ cho mọi bài thi, kể cả DMV",
      "Trả một lần, dùng mãi mãi",
    ],
  },
  ko: {
    premium: (s) => [
      `${s} 마지막 학습 단계와 마지막 모의고사`,
      `틀린 ${s} 문제마다 전체 통계`,
      "DMV를 포함한 Tigertest의 다른 모든 시험에도 똑같이 적용",
      "한 번 결제로 평생 이용",
    ],
    stats: (n, s) => [
      `${s} 문제 ${n}개 전체의 정답률 보기`,
      "자주 틀리는 문제를 많이 틀린 순서로 보기",
      "DMV를 포함한 모든 시험의 전체 통계",
      "한 번 결제로 평생 이용",
    ],
  },
  zh: {
    premium: (s) => [
      `${s} 的最后一个练习步骤和最后一套模拟题`,
      `每道答错的 ${s} 题目的完整统计`,
      "Tigertest 上的其他所有考试同样解锁，包括 DMV",
      "一次付款，永久使用",
    ],
    stats: (n, s) => [
      `查看全部 ${n} 道 ${s} 题目的正确率`,
      "查看你反复答错的题目，错得最多的排在前面",
      "所有考试的完整统计，包括 DMV",
      "一次付款，永久使用",
    ],
  },
  de: {
    premium: (s) => [
      `Der letzte Übungsschritt und der letzte Übungstest für ${s}`,
      `Alle Statistiken zu jeder ${s}-Frage, die du falsch beantwortest`,
      "Dasselbe bei jedem anderen Test auf Tigertest",
      "Einmal zahlen, für immer behalten",
    ],
    stats: (n, s) => [
      `Deine Trefferquote bei allen ${n} ${s}-Fragen`,
      "Sieh, was du immer wieder falsch machst, das Schlimmste zuerst",
      "Alle Statistiken zu jedem Test auf Tigertest",
      "Einmal zahlen, für immer behalten",
    ],
  },
  fr: {
    premium: (s) => [
      `La dernière étape d'entraînement et le dernier test blanc ${s}`,
      `Toutes les statistiques sur chaque question ${s} que tu rates`,
      "Pareil pour tous les autres examens de Tigertest",
      "Un seul paiement, à toi pour toujours",
    ],
    stats: (n, s) => [
      `Ton taux de réussite sur les ${n} questions ${s}`,
      "Vois ce que tu rates encore, du pire au meilleur",
      "Toutes les statistiques sur chaque examen de Tigertest",
      "Un seul paiement, à toi pour toujours",
    ],
  },
  it: {
    premium: (s) => [
      `L'ultimo passo di allenamento e l'ultima simulazione di ${s}`,
      `Statistiche complete su ogni domanda di ${s} che sbagli`,
      "Lo stesso per tutti gli altri esami su Tigertest",
      "Un solo pagamento, tuo per sempre",
    ],
    stats: (n, s) => [
      `La tua precisione su tutte le ${n} domande di ${s}`,
      "Vedi cosa continui a sbagliare, dal peggio in giù",
      "Statistiche complete su ogni esame di Tigertest",
      "Un solo pagamento, tuo per sempre",
    ],
  },
  pl: {
    premium: (s) => [
      `Ostatni krok treningu i ostatni test próbny: ${s}`,
      `Pełne statystyki każdego pytania (${s}), w którym się mylisz`,
      "To samo we wszystkich innych egzaminach na Tigertest",
      "Jedna płatność, dostęp na zawsze",
    ],
    stats: (n, s) => [
      `Twoja skuteczność we wszystkich pytaniach (${n}): ${s}`,
      "Zobacz, w czym wciąż się mylisz, od najgorszych",
      "Pełne statystyki każdego egzaminu na Tigertest",
      "Jedna płatność, dostęp na zawsze",
    ],
  },
  nl: {
    premium: (s) => [
      `De laatste oefenstap en het laatste oefenexamen van ${s}`,
      `Alle statistieken van elke ${s}-vraag die je fout hebt`,
      "Hetzelfde bij elk ander examen op Tigertest",
      "Eén betaling, voor altijd van jou",
    ],
    stats: (n, s) => [
      `Je score op alle ${n} ${s}-vragen`,
      "Zie wat je steeds fout doet, het ergste eerst",
      "Alle statistieken van elk examen op Tigertest",
      "Eén betaling, voor altijd van jou",
    ],
  },
  pt: {
    premium: (s) => [
      `O último passo de treino e o último teste de ${s}`,
      `Estatísticas completas de cada pergunta de ${s} que erras`,
      "O mesmo em todos os outros exames do Tigertest",
      "Um só pagamento, teu para sempre",
    ],
    stats: (n, s) => [
      `A tua taxa de acerto nas ${n} perguntas de ${s}`,
      "Vê o que continuas a errar, do pior para o melhor",
      "Estatísticas completas de todos os exames do Tigertest",
      "Um só pagamento, teu para sempre",
    ],
  },
  sv: {
    premium: (s) => [
      `Det sista övningssteget och det sista övningsprovet för ${s}`,
      `Full statistik för varje fråga i ${s} som du missar`,
      "Samma sak för alla andra prov på Tigertest",
      "En betalning, ditt för alltid",
    ],
    stats: (n, s) => [
      `Din träffsäkerhet på alla ${n} frågor i ${s}`,
      "Se vad du fortsätter att missa, det värsta först",
      "Full statistik för alla prov på Tigertest",
      "En betalning, ditt för alltid",
    ],
  },
  da: {
    premium: (s) => [
      `Det sidste øvetrin og den sidste øveprøve til ${s}`,
      `Fuld statistik for hvert spørgsmål i ${s}, du svarer forkert på`,
      "Det samme for alle andre prøver på Tigertest",
      "Én betaling, din for altid",
    ],
    stats: (n, s) => [
      `Din træfsikkerhed på alle ${n} spørgsmål i ${s}`,
      "Se, hvad du bliver ved med at svare forkert på, det værste først",
      "Fuld statistik for alle prøver på Tigertest",
      "Én betaling, din for altid",
    ],
  },
  fi: {
    premium: (s) => [
      `Viimeinen harjoitusvaihe ja viimeinen harjoituskoe: ${s}`,
      `Täydet tilastot jokaisesta väärin menneestä kysymyksestä (${s})`,
      "Sama kaikissa muissa Tigertestin kokeissa",
      "Yksi maksu, sinun ikuisesti",
    ],
    stats: (n, s) => [
      `Osumatarkkuutesi kaikissa ${n} kysymyksessä (${s})`,
      "Näe, missä erehdyt yhä uudelleen, pahimmat ensin",
      "Täydet tilastot kaikista Tigertestin kokeista",
      "Yksi maksu, sinun ikuisesti",
    ],
  },
  hu: {
    premium: (s) => [
      `Az utolsó gyakorló lépés és az utolsó próbateszt (${s})`,
      `Teljes statisztika minden elrontott kérdésről (${s})`,
      "Ugyanez a Tigertest összes többi vizsgájánál",
      "Egyszeri fizetés, örökre a tiéd",
    ],
    stats: (n, s) => [
      `A pontosságod mind a(z) ${n} kérdésnél (${s})`,
      "Lásd, mit rontasz el újra meg újra, a legrosszabbal kezdve",
      "Teljes statisztika a Tigertest minden vizsgájához",
      "Egyszeri fizetés, örökre a tiéd",
    ],
  },
  ro: {
    premium: (s) => [
      `Ultimul pas de antrenament și ultimul test de probă pentru ${s}`,
      `Statistici complete pentru fiecare întrebare ${s} greșită`,
      "La fel pentru toate celelalte examene de pe Tigertest",
      "O singură plată, al tău pentru totdeauna",
    ],
    stats: (n, s) => [
      `Acuratețea ta la toate cele ${n} întrebări ${s}`,
      "Vezi ce greșești mereu, începând cu ce e mai rău",
      "Statistici complete pentru fiecare examen de pe Tigertest",
      "O singură plată, al tău pentru totdeauna",
    ],
  },
  el: {
    premium: (s) => [
      `Το τελευταίο βήμα εξάσκησης και το τελευταίο τεστ για ${s}`,
      `Πλήρη στατιστικά για κάθε ερώτηση (${s}) που κάνεις λάθος`,
      "Το ίδιο σε κάθε άλλη εξέταση του Tigertest",
      "Μία πληρωμή, δικό σου για πάντα",
    ],
    stats: (n, s) => [
      `Η ακρίβειά σου και στις ${n} ερωτήσεις (${s})`,
      "Δες τι κάνεις συνέχεια λάθος, τα χειρότερα πρώτα",
      "Πλήρη στατιστικά για κάθε εξέταση του Tigertest",
      "Μία πληρωμή, δικό σου για πάντα",
    ],
  },
};

export function examPaywallCopy(lang: Language): ExamPaywallCopy {
  return COPY[lang] ?? COPY.en;
}
