import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// CILS B1 Cittadinanza (Centro CILS, Università per Stranieri di Siena), the B1 certificate that
// applicants for Italian citizenship by marriage or residence present (art. 9.1 L. 91/1992), written
// in Italian. The real exam scores four skills at 12 points each, every one to pass: ascolto, comprensione
// della lettura e riflessione grammaticale (12 true/false items and a 6-gap cloze, 40 minutes),
// produzione scritta and orale. Modelled: a reading section (notices, emails, articles, each text in its
// own passage box) and a grammar and vocabulary section on the B1 Cittadinanza sillabo (presente,
// passato prossimo, imperfetto, imperativo, condizionale presente; no futuro or congiuntivo). Four-option
// items, Tigertest's split and pace. Listening, writing and speaking are not modelled. Moved from the v1
// engine in November 2026 (question ids unchanged; v1 training progress is carried over by `fromV1`).
// Bank built by tools/build-run-2026-11-19/italian_v1_to_v2.py from tools/next100/itcils/q_*.py;
// sources in tools/next100/itcils/sources.md.
const minutes = (n: number) => n * 60;

/** Percent of all answers, every question counting the same. */
function overall(sections: SectionResult[]): number {
  const total = sections.reduce((a, s) => a + s.total, 0);
  return total ? Math.round((sections.reduce((a, s) => a + s.raw, 0) / total) * 100) : 0;
}

export const ITCILS: ExamV2Config = {
  id: "itcils",
  slug: "/cils-b1-cittadinanza",
  landingPath: "/it/cils-b1-cittadinanza-test",
  icon: "book",
  language: "it",
  locale: "it-IT",
  english: {
    name: "CILS B1 Cittadinanza (Italian B1 test for citizenship)",
    shortName: "CILS B1 citizenship test",
    fullName: "CILS B1 Cittadinanza, the Italian B1 language test for citizenship, in Italian",
  },
  review: { it: "model" },
  name: "CILS B1 Cittadinanza",
  shortName: "CILS B1 Cittadinanza",
  fullName: "CILS B1 Cittadinanza (certificazione di italiano per la cittadinanza, Università per Stranieri di Siena)",
  tagline: "Lettura e grammatica di livello B1 per la cittadinanza, con i testi in un riquadro.",
  theme: { brand: "146 90% 18%", brandDark: "146 90% 12%", brandLight: "146 90% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "lettura",
      name: "Comprensione della lettura",
      shortName: "Lettura",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(25) }],
      directions: "15 domande in 25 minuti: avvisi, mail e articoli. Leggi il testo nel riquadro e scegli la risposta giusta. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(15),
      domains: ["itcilsAvvisi", "itcilsMail", "itcilsTesti"],
    },
    {
      key: "grammatica",
      name: "Grammatica e lessico",
      shortName: "Grammatica",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(25) }],
      directions: "35 domande in 25 minuti: articoli e preposizioni, verbi, pronomi, aggettivi, connettivi e lessico. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(35),
      domains: ["itcilsPreposizioni", "itcilsPassato", "itcilsVerbi", "itcilsPronomi", "itcilsAggettivi", "itcilsConnettivi", "itcilsLessico"],
    },
  ],
  tests: [
    { number: 1, name: "Prova 1" },
    { number: 2, name: "Prova 2" },
    { number: 3, name: "Prova 3" },
    { number: 4, name: "Prova 4", heldOut: true },
  ],
  domainLabels: {
    itcilsAvvisi: "Avvisi e annunci",
    itcilsMail: "Mail e lettere",
    itcilsTesti: "Articoli e istruzioni",
    itcilsPreposizioni: "Articoli e preposizioni",
    itcilsPassato: "Passato prossimo e imperfetto",
    itcilsVerbi: "Presente, imperativo e condizionale",
    itcilsPronomi: "Pronomi, ci e ne",
    itcilsAggettivi: "Possessivi, dimostrativi e confronti",
    itcilsConnettivi: "Connettivi e frasi complesse",
    itcilsLessico: "Lessico e registro",
  },
  drills: [
    { key: "lettura", name: "Leggere avvisi, mail e articoli", section: "lettura", domains: ["itcilsAvvisi", "itcilsMail", "itcilsTesti"], blurb: "Avvisi, annunci, mail, lettere, articoli e istruzioni." },
    { key: "preposizioni", name: "Articoli, preposizioni e aggettivi", section: "grammatica", domains: ["itcilsPreposizioni", "itcilsAggettivi"], blurb: "Articoli, preposizioni semplici e articolate, possessivi, dimostrativi e confronti." },
    { key: "verbi", name: "Passato, presente e condizionale", section: "grammatica", domains: ["itcilsPassato", "itcilsVerbi"], blurb: "Passato prossimo e imperfetto, presente, imperativo e condizionale presente." },
    { key: "pronomi", name: "Pronomi e connettivi", section: "grammatica", domains: ["itcilsPronomi", "itcilsConnettivi"], blurb: "Pronomi, ci e ne, connettivi e frasi complesse." },
    { key: "lessico", name: "Lessico e registro", section: "grammatica", domains: ["itcilsLessico"], blurb: "Parole di tutti i giorni e il registro giusto, formale o informale." },
  ],
  fromV1: { drills: { lettura: [27401], preposizioni: [27402], verbi: [27403], pronomi: [27404], lessico: [27405] } },
  composite: { name: "Risposte giuste", min: 0, max: 100, combine: overall },
  defaultGoal: 70,
  goalChoices: [60, 70, 80, 90],
  goalNotes: {
    60: "Un primo obiettivo mentre ripassi",
    70: "Un margine sopra la sufficienza",
    80: "Solido in lettura e grammatica",
    90: "Pronto per il giorno dell'esame",
  },
  testLength: "50 min",
  copy: {
    heroSubs: [
      "Cinque esercitazioni e quattro prove da 50 domande. Comincia dalla lettura.",
      "Prendi sicurezza con le esercitazioni, poi fai la prova.",
      "Continua così. Ripassa i verbi al passato.",
      "Raggiungi il tuo obiettivo in tutte le prove.",
      "Obiettivo raggiunto. Lettura e grammatica del CILS B1 non ti fanno più paura.",
    ],
    sourceLine: "Domande originali sul sillabo CILS B1 Cittadinanza (comprensione della lettura e riflessione grammaticale), novembre 2026. Ascolto, produzione scritta e orale non sono inclusi. Non affiliato all'Università per Stranieri di Siena.",
    scoreNote: "Percentuale di risposte giuste su tutte le 50 domande. Il CILS vero dà 12 punti a ognuna delle quattro abilità e chiede la sufficienza in ciascuna; qui ci sono solo lettura e grammatica.",
  },
};
