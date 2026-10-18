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
  trainingBadge: (shortName) => `${shortName} 연습`,
  masteredMyTraining: (shortName) => `${shortName} 연습 마스터 완료`,
  mastered: "마스터 완료",
  nextPart: (name) => `다음: ${name}`,
  setN: (n) => `세트 ${n}`,
  statsSeen: (seen, total, shortName) => `${shortName} 문제 ${total}개 중 ${seen}개를 봤어요. 아무 줄이나 눌러 다시 풀어 보세요.`,
  dateLocale: "ko-KR",
};

const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko };

export function examUi(lang: Language): ExamUi {
  return EXAM_UI[lang] ?? en;
}
