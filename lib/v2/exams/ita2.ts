import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// Test di italiano A2 for the EU long-term residence permit (permesso di soggiorno UE per
// soggiornanti di lungo periodo), set by the Prefettura, written in Italian. D.M. 7 dicembre 2021
// (GU n. 36, 12-2-2022; same rules as D.M. 4 giugno 2010): A2, "comprensione di brevi testi e
// capacità di interazione", 80% to pass. The MIUR vademecum gives three prove in 60 minutes:
// listening 10 items (30%), reading 10 items (35%), written interaction (35%: reply to an email or
// fill in a form). Modelled: a reading section on the vademecum's four sub-skills
// (corrispondenza 5, orientarsi 6, informarsi 4, istruzioni 5), each text in its own passage box,
// and a language section with written interaction as single-answer items 6, socio-communicative
// acts 6, and A2 vocabulary 8 and grammar 10 from the vademecum's tables (Tigertest's addition;
// the real test has no grammar part). Listening and free writing are not modelled. Times are
// Tigertest's pace. Moved from the v1 engine in November 2026 so reading texts get a passage
// panel; question ids are unchanged. Bank built by tools/build-run-2026-11-19/italian_v2.py from
// tools/build-run-2026-11-19/ita2/q_*.py; sources in tools/build-run-2026-11-19/ita2/sources.md.
const minutes = (n: number) => n * 60;

/** Percent of all answers, every question counting the same. */
function overall(sections: SectionResult[]): number {
  const total = sections.reduce((a, s) => a + s.total, 0);
  return total ? Math.round((sections.reduce((a, s) => a + s.raw, 0) / total) * 100) : 0;
}

export const ITA2: ExamV2Config = {
  id: "ita2",
  slug: "/test-italiano-a2",
  landingPath: "/it/test-italiano-a2-permesso-di-soggiorno",
  icon: "book",
  language: "it",
  locale: "it-IT",
  english: {
    name: "Italian A2 test for the long-term residence permit",
    shortName: "Italian A2 residence permit test",
    fullName: "The Prefettura's Italian A2 test for the EU long-term residence permit, in Italian",
  },
  review: { it: "model" },
  name: "Test di italiano A2 per il permesso di soggiorno",
  shortName: "Test di italiano A2",
  fullName: "Test di conoscenza della lingua italiana A2 per il permesso di soggiorno UE per soggiornanti di lungo periodo (Prefettura)",
  tagline: "Lettura e lingua di livello A2, con i testi in un riquadro accanto alla domanda.",
  theme: { brand: "312 85% 22%", brandDark: "312 85% 15%", brandLight: "312 85% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "lettura",
      name: "Comprensione dei testi",
      shortName: "Lettura",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(25) }],
      directions:
        "20 domande in 25 minuti. Leggi il testo nel riquadro e scegli la risposta giusta. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(20),
      domains: ["ita2Corrispondenza", "ita2Orientarsi", "ita2Informarsi", "ita2Istruzioni"],
    },
    {
      key: "lingua",
      name: "Interazione e lingua",
      shortName: "Lingua",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(20) }],
      directions:
        "30 domande in 20 minuti: risposte a messaggi e moduli, frasi di tutti i giorni, parole e grammatica. Puoi tornare indietro e segnare le domande da rivedere.",
      scale: percentScale(30),
      domains: ["ita2Interazione", "ita2Azioni", "ita2Lessico", "ita2Grammatica"],
    },
  ],
  tests: [
    { number: 1, name: "Prova 1" },
    { number: 2, name: "Prova 2" },
    { number: 3, name: "Prova 3" },
    { number: 4, name: "Prova 4", heldOut: true },
  ],
  domainLabels: {
    ita2Corrispondenza: "Lettere e messaggi",
    ita2Orientarsi: "Avvisi, cartelli e orari",
    ita2Informarsi: "Articoli e volantini",
    ita2Istruzioni: "Istruzioni e regole",
    ita2Interazione: "Rispondere e compilare moduli",
    ita2Azioni: "Frasi per la vita di tutti i giorni",
    ita2Lessico: "Parole di tutti i giorni",
    ita2Grammatica: "Grammatica di base",
  },
  drills: [
    { key: "messaggi", name: "Lettere, avvisi e cartelli", section: "lettura", domains: ["ita2Corrispondenza", "ita2Orientarsi"], blurb: "Messaggi, lettere, mail, avvisi, cartelli e orari della vita di tutti i giorni." },
    { key: "articoli", name: "Articoli e istruzioni", section: "lettura", domains: ["ita2Informarsi", "ita2Istruzioni"], blurb: "Brevi articoli, volantini, istruzioni e regole." },
    { key: "comunicare", name: "Scrivere e comunicare", section: "lingua", domains: ["ita2Interazione", "ita2Azioni"], blurb: "Rispondere a messaggi, compilare moduli e usare le frasi giuste nelle situazioni di tutti i giorni." },
    { key: "grammatica", name: "Grammatica di base", section: "lingua", domains: ["ita2Grammatica"], blurb: "Articoli, preposizioni, verbi al presente e al passato, pronomi." },
    { key: "parole", name: "Parole di tutti i giorni", section: "lingua", domains: ["ita2Lessico"], blurb: "Casa, lavoro, salute, negozi, uffici e trasporti." },
  ],
  fromV1: { drills: { messaggi: [35201], articoli: [35202], comunicare: [35203], grammatica: [35204], parole: [35205] } },
  composite: { name: "Risposte giuste", min: 0, max: 100, combine: overall },
  defaultGoal: 80,
  goalChoices: [60, 70, 80, 90],
  goalNotes: {
    60: "Un primo obiettivo mentre ripassi",
    70: "Ci sei quasi: lavora sugli errori",
    80: "La soglia del test vero: l'80%",
    90: "Un margine sicuro per il giorno della prova",
  },
  testLength: "45 min",
  copy: {
    heroSubs: [
      "Cinque esercitazioni e quattro prove da 50 domande. Comincia da lettere, avvisi e cartelli.",
      "Prendi sicurezza con le esercitazioni, poi fai la prova.",
      "Continua così. Ripassa le risposte ai messaggi e i moduli.",
      "Raggiungi il tuo obiettivo in tutte le prove.",
      "Obiettivo raggiunto. Sei pronto per il test di italiano A2 in Prefettura.",
    ],
    sourceLine:
      "Domande originali sul D.M. 7 dicembre 2021 e sul vademecum del Ministero (lettura e interazione scritta di livello A2), novembre 2026. L'ascolto non è incluso. Non è un servizio della Prefettura o del Ministero dell'Interno.",
    scoreNote:
      "Percentuale di risposte giuste su tutte le 50 domande. Il test vero si supera con l'80% e comprende anche l'ascolto e una prova di scrittura, che qui non ci sono; la parte di grammatica e parole è un'aggiunta di Tigertest.",
  },
};
