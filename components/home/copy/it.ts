// Italian homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "tu", like i18n/it.ts. Country names go after a colon or in
// brackets ("per questo Paese (Germania)") so no article is needed.

import type { HomeCopy } from "../homeCopy";

export const it: HomeCopy = {
  heroTitle: "Test di esercitazione gratuiti che ti portano a superare l'esame",
  findYourTest: "Trova il tuo test",
  answeredThisWeek: "domande risposte questa settimana",
  popularThisWeek: "Popolari questa settimana",
  popularTests: "Test popolari",
  allTests: (n) => `Tutti i ${n} test`,
  aboutTheTest: "Informazioni sull'esame",
  aboutEachTest: "Informazioni su ogni esame",
  howItWorks: "Come funziona Tigertest",
  steps: [
    {
      label: "Passo 1",
      title: "Impara sul telefono",
      body: "Tocca una risposta e scopri subito se è giusta e perché. Le domande che sbagli tornano finché non le sai, così anche pochi minuti in autobus contano davvero.",
    },
    {
      label: "Passo 2",
      title: "Prova l'esame vero",
      body: "Quando le domande ti sembrano facili, fai un test completo costruito sul programma dell'esame vero, con lo stesso mix di argomenti. Così conosci il tuo punteggio prima che conti.",
    },
    {
      label: "Passo 3",
      title: "Sappi quando sei pronto",
      body: "La tua dashboard diventa verde man mano che completi ogni set e superi ogni test. Quando è tutta verde, prenota l'esame.",
    },
  ],
  shotAlts: {
    phones: ["Esercizio di matematica SAT su un telefono", "Domanda per tecnico di sala operatoria su un telefono", "Domanda di esercitazione CNA su un telefono"],
    desktop: "Test SAT a tempo su un computer",
    dashboard: "Dashboard DMV di Tigertest con set di allenamento e test di esercitazione",
  },
  everyTest: "Tutti i test di esercitazione",
  testsFor: (inName) => `Test di esercitazione: ${inName}`,
  usExamPrompt: "Ti trasferisci negli Stati Uniti o studi per un esame americano?",
  seeAllTests: (n) => `Vedi tutti i ${n} test`,
  faqTitle: "Domande frequenti",
  requestTitle: "Non trovi il tuo esame?",
  requestBody: "Aggiungiamo nuovi test in base alle richieste. Dicci per quale esame stai studiando.",
  requestCta: "Richiedi un test",
  usLead: (examCount) => `${examCount} esami, dal test per il foglio rosa DMV al SAT, alle certificazioni infermieristiche e IT. Ogni risposta spiegata. Senza registrazione.`,
  countryLead: (countryName) =>
    `Test di esercitazione gratuiti per questo Paese (${countryName}): l'esame di teoria della patente e le certificazioni uguali in tutto il mondo. Ogni risposta spiegata. Senza registrazione.`,
  usFaqs: (examCount) => [
    {
      q: "Che cos'è Tigertest?",
      a: `Tigertest è un sito gratuito di test di esercitazione per ${examCount} esami, dal test DMV per il foglio rosa in ogni stato al SAT, all'ACT e agli esami di infermieristica, sanità, IT, mestieri e abilitazioni. Ogni test segue il programma pubblicato dell'esame vero e ogni domanda spiega la risposta giusta.`,
    },
    {
      q: "Tigertest è gratis?",
      a: "Sì. Quasi tutti i test sono completamente gratuiti. Per il DMV ci sono test e allenamento gratuiti, più un acquisto Premium facoltativo e una tantum da 9,99 $ (non un abbonamento) che sblocca altri due test e set di allenamento e le statistiche complete su ogni esame americano.",
    },
    {
      q: "Mi serve un account?",
      a: "No. Puoi iniziare qualsiasi test senza registrarti. Crea un account gratuito se vuoi salvare i tuoi progressi su tutti i dispositivi.",
    },
    {
      q: "Come mi aiuta Tigertest a superare l'esame?",
      a: "La modalità allenamento ti dice subito se hai risposto bene e ripropone le domande che sbagli finché non le sai. Poi i test completi simulano l'esame vero e i risultati ti mostrano quali argomenti devi ancora ripassare.",
    },
    {
      q: "Tigertest è collegato al DMV o a un ente d'esame?",
      a: "No. Tigertest è indipendente e non è collegato a nessun DMV, ente d'esame o organismo di certificazione.",
    },
  ],
  dmv: {
    cta: "Test DMV per il foglio rosa",
    title: "Devi fare il test DMV per il foglio rosa?",
    body: "200 domande scritte dal manuale del conducente del tuo stato, per tutti i 50 stati e DC.",
    about: "Informazioni sul test di esercitazione DMV",
    questionsOnTest: (n) => `${n} domande nell'esame scritto`,
    viewAll: "Vedi tutti i 50 stati",
  },
  listName: (inName) => `Test di esercitazione Tigertest: ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Che cos'è Tigertest?",
      a:
        local === 0
          ? `Tigertest è un sito gratuito di test di esercitazione. Per questo Paese (${inName}) ha certificazioni uguali in tutto il mondo, come CompTIA e AWS. Ogni domanda spiega la risposta giusta.`
          : `Tigertest è un sito gratuito di test di esercitazione. Per questo Paese (${inName}) ha ${local === 1 ? "un test di guida" : `${local} test di guida`} scritti dalle ${local === 1 ? "regole" : "guide"} ufficiali, più certificazioni uguali in tutto il mondo, come CompTIA e AWS. Ogni domanda spiega la risposta giusta.`,
    },
    { q: "Tigertest è gratis?", a: `Sì. Ogni test per questo Paese (${inName}) è gratuito, senza abbonamento.` },
    {
      q: "Mi serve un account?",
      a: "No. Puoi iniziare qualsiasi test senza registrarti. Crea un account gratuito se vuoi salvare i tuoi progressi su tutti i dispositivi.",
    },
    {
      q: "Come mi aiuta Tigertest a superare l'esame?",
      a: "La modalità allenamento ti dice subito se hai risposto bene e ripropone le domande che sbagli finché non le sai. Poi i test completi simulano l'esame vero e i risultati ti mostrano quali argomenti devi ancora ripassare.",
    },
    {
      q: "Tigertest è un test ufficiale?",
      a: `No. Tigertest è indipendente e non è collegato a ${authority} né a nessun ente d'esame. Le domande sono originali e scritte a partire dalle guide ufficiali.`,
    },
  ],
  card: {
    questions: (n) => `${n} domande`,
    free: "Gratis",
    freePlusPremium: "Gratis + Premium",
    answeredThisWeek: "risposte questa settimana",
    availableIn: (names) => `Disponibile in ${names}`,
  },
  search: {
    placeholder: "Cerca esami o professioni",
    label: "Cerca test di esercitazione",
    clear: "Cancella ricerca",
    countOf: (count, total) => `${count} di ${total} test`,
    allFree: (n) => `${n} test di esercitazione, tutti gratis per iniziare`,
    noMatch: (q) => `Nessun test corrisponde a «${q}»`,
    noMatchHint: "Prova con il nome dell'esame, la professione o l'ente che rilascia la certificazione.",
  },
  pills: {
    showTestsFor: "Mostra i test per",
    testsByCountry: "Test per Paese",
    countryTests: (name) => `Test: ${name}`,
    moreCountries: "Altri Paesi",
    saved: "Salvato per la prossima volta. I tuoi progressi sono gli stessi in ogni Paese.",
    geo: (inName) => `Ti mostriamo i test per questo Paese (${inName}) perché ti trovi lì. Puoi scegliere un altro Paese quando vuoi.`,
  },
};

/** Every country's name in Italian, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Stati Uniti", CA: "Canada", UK: "Regno Unito", IE: "Irlanda", AU: "Australia", NZ: "Nuova Zelanda", IN: "India",
  PH: "Filippine", MY: "Malesia", SG: "Singapore", HK: "Hong Kong", AE: "Emirati Arabi Uniti", ZA: "Sudafrica",
  NG: "Nigeria", KE: "Kenya", PK: "Pakistan", ES: "Spagna", PT: "Portogallo", RO: "Romania", SE: "Svezia", GR: "Grecia",
  DK: "Danimarca", HU: "Ungheria", BE: "Belgio", FI: "Finlandia", MT: "Malta", DE: "Germania",
};
