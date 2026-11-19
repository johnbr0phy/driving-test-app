import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// CILS DUE-B2 (Centro CILS, Università per Stranieri di Siena; Le prove, La valutazione and the
// B2 exam booklet, read 2026-11-19), written in Italian: five tests, ascolto, comprensione della
// lettura (3 prove, 50 minutes: multiple choice on an article, information present in a text,
// text reconstruction), analisi delle strutture di comunicazione (4 prove, 1 hour), produzione
// scritta, produzione orale; scored out of 100 with the sufficiency (11 of 20) needed in every
// skill. Modelled: comprensione della lettura (articles 6, information present in the text 5,
// text reconstruction and cohesion 4), each text in its own passage box, and analisi delle
// strutture (pronouns and adjectives 6, verb forms 10, periodo ipotetico, discorso indiretto and
// connettivi 7, communicative situations 5, vocabulary 7). The split is Tigertest's; CILS publishes
// no topic weights. Times are Tigertest's, shorter than the real 50 and 60 minutes because each
// section is shorter. Ascolto, produzione scritta and orale are not modelled. Moved from the v1
// engine in November 2026 so reading texts get a passage panel; question ids are unchanged. Bank
// built by tools/build-run-2026-11-19/italian_v2.py from tools/build-run-2026-11-19/itcilsb2/q_*.py;
// sources in tools/build-run-2026-11-19/itcilsb2/sources.md.
const minutes = (n: number) => n * 60;

/** Percent of all answers, every question counting the same. */
function overall(sections: SectionResult[]): number {
  const total = sections.reduce((a, s) => a + s.total, 0);
  return total ? Math.round((sections.reduce((a, s) => a + s.raw, 0) / total) * 100) : 0;
}

export const ITCILSB2: ExamV2Config = {
  id: "itcilsb2",
  slug: "/cils-b2",
  landingPath: "/it/cils-b2-test",
  icon: "book",
  language: "it",
  locale: "it-IT",
  english: {
    name: "CILS B2 (Italian B2 certificate)",
    shortName: "CILS B2 Italian test",
    fullName: "CILS DUE-B2, the Italian B2 language certificate from the Università per Stranieri di Siena, in Italian",
  },
  review: { it: "model" },
  name: "CILS DUE-B2",
  shortName: "CILS B2",
  fullName: "CILS DUE-B2 (certificazione di italiano come lingua straniera, livello B2, Università per Stranieri di Siena)",
  tagline: "Comprensione della lettura e analisi delle strutture di livello B2, con i testi in un riquadro.",
  theme: { brand: "246 95% 24%", brandDark: "246 95% 17%", brandLight: "246 95% 95%" },
  breakSeconds: 300,
  sections: [
    {
      key: "lettura",
      name: "Comprensione della lettura",
      shortName: "Lettura",
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(30) }],
      directions:
        "15 domande in 30 minuti: articoli, informazioni presenti nel testo, ordine delle parti. Leggi il testo nel riquadro e scegli la risposta giusta. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(15),
      domains: ["itb2Articoli", "itb2Informazioni", "itb2Coesione"],
    },
    {
      key: "strutture",
      name: "Analisi delle strutture di comunicazione",
      shortName: "Strutture",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(35) }],
      directions:
        "35 domande in 35 minuti: pronomi, forme verbali, periodo ipotetico e connettivi, situazioni di comunicazione, lessico. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(35),
      domains: ["itb2Pronomi", "itb2Verbi", "itb2Periodo", "itb2Situazioni", "itb2Lessico"],
    },
  ],
  tests: [
    { number: 1, name: "Prova 1" },
    { number: 2, name: "Prova 2" },
    { number: 3, name: "Prova 3" },
    { number: 4, name: "Prova 4", heldOut: true },
  ],
  domainLabels: {
    itb2Articoli: "Articoli di giornale",
    itb2Informazioni: "Informazioni nel testo",
    itb2Coesione: "Ordine e coesione del testo",
    itb2Pronomi: "Pronomi e aggettivi",
    itb2Verbi: "Forme verbali",
    itb2Periodo: "Periodo ipotetico, discorso indiretto e connettivi",
    itb2Situazioni: "Situazioni di comunicazione",
    itb2Lessico: "Lessico ed espressioni",
  },
  drills: [
    { key: "lettura", name: "Comprensione della lettura", section: "lettura", domains: ["itb2Articoli", "itb2Informazioni", "itb2Coesione"], blurb: "Articoli, informazioni presenti nel testo e ricostruzione dell'ordine delle parti." },
    { key: "verbi", name: "Forme verbali", section: "strutture", domains: ["itb2Verbi"], blurb: "Congiuntivo, concordanza dei tempi, futuro anteriore, passivo, gerundio e participio." },
    { key: "periodo", name: "Periodo ipotetico e lessico", section: "strutture", domains: ["itb2Periodo", "itb2Lessico"], blurb: "Periodo ipotetico, discorso indiretto, connettivi, parole ed espressioni." },
    { key: "pronomi", name: "Pronomi e situazioni", section: "strutture", domains: ["itb2Pronomi", "itb2Situazioni"], blurb: "Pronomi e aggettivi, e la frase giusta per ogni situazione." },
  ],
  composite: { name: "Risposte giuste", min: 0, max: 100, combine: overall },
  defaultGoal: 65,
  goalChoices: [55, 65, 75, 85],
  goalNotes: {
    55: "Vicino alla sufficienza del CILS (11 su 20 per abilità)",
    65: "Un margine sopra la sufficienza",
    75: "Solido in lettura e strutture",
    85: "Ottimo: pronto per il livello successivo",
  },
  testLength: "1 h 10 min",
  copy: {
    heroSubs: [
      "Quattro esercitazioni e quattro prove da 50 domande. Comincia dalla comprensione della lettura.",
      "Prendi sicurezza con le esercitazioni, poi fai la prova.",
      "Continua così. Ripassa il congiuntivo e la concordanza dei tempi.",
      "Raggiungi il tuo obiettivo in tutte le prove.",
      "Obiettivo raggiunto. Lettura e strutture del CILS B2 non ti fanno più paura.",
    ],
    sourceLine:
      "Domande originali sul formato CILS DUE-B2 (comprensione della lettura e analisi delle strutture di comunicazione), novembre 2026. Ascolto, produzione scritta e orale non sono inclusi. Non affiliato all'Università per Stranieri di Siena.",
    scoreNote:
      "Percentuale di risposte giuste su tutte le 50 domande. Il CILS vero dà un punteggio su 20 per ognuna delle cinque abilità e chiede almeno 11 su 20 in ciascuna; qui ci sono solo lettura e strutture.",
  },
};
