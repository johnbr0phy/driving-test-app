// Registry-exam page copy that is not in i18n/*.ts: the lines the shared
// exam components (components/exam/*) build around an ExamConfig. Only the
// languages some exam is translated into (ExamConfig.translations) need an
// entry; every other language reads English, like the exam's questions.

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
  trainingBadge: (shortName: string) => string;
  masteredMyTraining: (shortName: string) => string;
  mastered: string;
  nextPart: (part: number, partCount: number) => string;
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
  trainingBadge: (shortName) => `${shortName} TRAINING`,
  masteredMyTraining: (shortName) => `MASTERED MY ${shortName} TRAINING`,
  mastered: "MASTERED",
  nextPart: (part, partCount) => `Next: part ${part} of ${partCount}`,
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
  trainingBadge: (shortName) => `ENTRENAMIENTO ${shortName}`,
  masteredMyTraining: (shortName) => `DOMINÉ MI ENTRENAMIENTO ${shortName}`,
  mastered: "DOMINADO",
  nextPart: (part, partCount) => `Siguiente: parte ${part} de ${partCount}`,
  setN: (n) => `Grupo ${n}`,
  statsSeen: (seen, total, shortName) =>
    `Has visto ${seen} de ${total} preguntas de ${shortName}. Toca cualquier fila para responderla de nuevo.`,
  dateLocale: "es-US",
};

const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es };

export function examUi(lang: Language): ExamUi {
  return EXAM_UI[lang] ?? en;
}
