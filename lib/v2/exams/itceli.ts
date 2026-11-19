import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// CELI 2 (CVCL, Università per Stranieri di Perugia), the B1 Italian certificate, also in its
// "i cittadinanza" version, written in Italian. The written part of reading, writing and listening is 120
// points, passed at 72, with its own oral minimum (Regolamento degli esami CELI 2024). Modelled: a reading
// section (short notices, then emails, letters and articles with two questions on each text, the text
// shown once beside both) and a language section modelling part A's completion and rewording tasks (verbs,
// pronouns, prepositions, connectives, vocabulary, to the Profilo della lingua italiana B1 inventory).
// Writing, listening and the oral are not modelled; real A.1 and A.4 items have three options, ours four.
// Moved from the v1 engine in November 2026 (question ids unchanged; v1 training progress carried over by
// `fromV1`). Bank built by tools/build-run-2026-11-19/italian_v1_to_v2.py from tools/next100/itceli/q_*.py;
// sources in tools/next100/itceli/sources.md.
const minutes = (n: number) => n * 60;

/** Percent of all answers, every question counting the same. */
function overall(sections: SectionResult[]): number {
  const total = sections.reduce((a, s) => a + s.total, 0);
  return total ? Math.round((sections.reduce((a, s) => a + s.raw, 0) / total) * 100) : 0;
}

export const ITCELI: ExamV2Config = {
  id: "itceli",
  slug: "/celi-2-b1",
  landingPath: "/it/celi-2-b1-test",
  icon: "book",
  language: "it",
  locale: "it-IT",
  english: {
    name: "CELI 2 Italian B1 Certificate",
    shortName: "CELI 2 (B1)",
    fullName: "CELI 2, Italian language certificate level B1 (CVCL, Università per Stranieri di Perugia), in Italian",
  },
  review: { it: "model" },
  name: "CELI 2 (B1)",
  shortName: "CELI 2",
  fullName: "CELI 2, Certificato di conoscenza della lingua italiana, livello B1",
  tagline: "Lettura e lingua di livello B1, con i testi in un riquadro accanto alle domande.",
  theme: { brand: "294 70% 28%", brandDark: "294 70% 20%", brandLight: "294 70% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "lettura",
      name: "Comprensione della lettura",
      shortName: "Lettura",
      modules: [{ module: 1, questionCount: 22, timeLimit: minutes(35) }],
      directions: "22 domande in 35 minuti: avvisi e messaggi brevi, poi email, lettere e articoli con due domande per testo. Leggi il testo nel riquadro e scegli la risposta giusta. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(22),
      domains: ["itceliAvvisi", "itceliTesti"],
    },
    {
      key: "lingua",
      name: "Competenza linguistica",
      shortName: "Lingua",
      modules: [{ module: 1, questionCount: 28, timeLimit: minutes(20) }],
      directions: "28 domande in 20 minuti: verbi, pronomi, preposizioni, connettivi e lessico. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(28),
      domains: ["itceliVerbi", "itceliPronomi", "itceliPreposizioni", "itceliConnettivi", "itceliLessico"],
    },
  ],
  tests: [
    { number: 1, name: "Prova 1" },
    { number: 2, name: "Prova 2" },
    { number: 3, name: "Prova 3" },
    { number: 4, name: "Prova 4", heldOut: true },
  ],
  domainLabels: {
    itceliAvvisi: "Avvisi e messaggi brevi",
    itceliTesti: "Email, lettere e articoli",
    itceliVerbi: "Verbi: tempi e modi",
    itceliPronomi: "Pronomi e possessivi",
    itceliPreposizioni: "Preposizioni e articoli",
    itceliConnettivi: "Connettivi e riformulazioni",
    itceliLessico: "Lessico ed espressioni",
  },
  drills: [
    { key: "avvisi", name: "Avvisi e messaggi brevi", section: "lettura", domains: ["itceliAvvisi"], blurb: "Avvisi, cartelli, annunci e messaggi brevi." },
    { key: "testi", name: "Email, lettere e articoli", section: "lettura", domains: ["itceliTesti"], blurb: "Testi più lunghi con due domande ciascuno." },
    { key: "verbi", name: "Verbi: tempi e modi", section: "lingua", domains: ["itceliVerbi"], blurb: "Tempi e modi del livello B1 in contesto." },
    { key: "pronomi", name: "Pronomi e preposizioni", section: "lingua", domains: ["itceliPronomi", "itceliPreposizioni"], blurb: "Pronomi, possessivi, preposizioni e articoli." },
    { key: "connettivi", name: "Connettivi e lessico", section: "lingua", domains: ["itceliConnettivi", "itceliLessico"], blurb: "Connettivi, riformulazioni, parole ed espressioni." },
  ],
  fromV1: { drills: { avvisi: [27501], testi: [27502], verbi: [27503], pronomi: [27504], connettivi: [27505] } },
  composite: { name: "Risposte giuste", min: 0, max: 100, combine: overall },
  defaultGoal: 70,
  goalChoices: [60, 70, 80, 90],
  goalNotes: {
    60: "Un primo obiettivo mentre ripassi",
    70: "La soglia della parte scritta: 72 punti su 120",
    80: "Un margine sicuro",
    90: "Ottimo: pronto per il livello successivo",
  },
  testLength: "55 min",
  copy: {
    heroSubs: [
      "Cinque esercitazioni e quattro prove da 50 domande. Comincia dagli avvisi brevi.",
      "Prendi sicurezza con le esercitazioni, poi fai la prova.",
      "Continua così. Ripassa verbi e pronomi.",
      "Raggiungi il tuo obiettivo in tutte le prove.",
      "Obiettivo raggiunto. Il CELI 2 ti aspetta.",
    ],
    sourceLine: "Domande originali sulla comprensione della lettura e sulla lingua del livello B1, novembre 2026. Scrittura, ascolto e orale non sono inclusi. Non affiliato all'Università per Stranieri di Perugia.",
    scoreNote: "Percentuale di risposte giuste su tutte le 50 domande. Al CELI 2 vero la parte scritta (lettura, scrittura e ascolto) vale 120 punti e si supera con 72; qui ci sono solo lettura e competenza linguistica.",
  },
};
