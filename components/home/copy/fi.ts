// Finnish homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "sinä", like i18n/fi.ts. Finnish inflects country names by case, so every
// sentence puts the name after a colon or in brackets ("tälle maalle (Saksa)") and the
// bare nominative from countryNames always fits: no inNames needed.
// No prices: the US FAQ names Premium as an optional one-time purchase without a figure.

import type { HomeCopy } from "../homeCopy";

export const fi: HomeCopy = {
  heroTitle: "Ilmaiset harjoituskokeet, joilla pääset läpi",
  findYourTest: "Löydä kokeesi",
  answeredThisWeek: "kysymykseen vastattu tällä viikolla",
  popularThisWeek: "Suosittua tällä viikolla",
  popularTests: "Suositut kokeet",
  allTests: (n) => `Kaikki ${n} koetta`,
  aboutTheTest: "Tietoa kokeesta",
  aboutEachTest: "Tietoa jokaisesta kokeesta",
  howItWorks: "Näin Tigertest toimii",
  steps: [
    {
      label: "Vaihe 1",
      title: "Opettele puhelimella",
      body: "Napauta vastausta ja näet heti, onko se oikein ja miksi. Kysymykset, joihin vastaat väärin, tulevat takaisin, kunnes osaat ne. Näin muutama minuutti bussissakin vie eteenpäin.",
    },
    {
      label: "Vaihe 2",
      title: "Harjoittele oikeaa koetta",
      body: "Kun kysymykset tuntuvat helpoilta, tee täysimittainen harjoituskoe, joka noudattaa oikean kokeen rakennetta ja aiheiden jakaumaa. Näin tiedät tuloksesi ennen kuin sillä on väliä.",
    },
    {
      label: "Vaihe 3",
      title: "Tiedä, milloin olet valmis",
      body: "Yleisnäkymäsi muuttuu vihreäksi, kun saat sarjan valmiiksi ja läpäiset kokeen. Kun kaikki on vihreää, varaa koe.",
    },
  ],
  shotAlts: {
    phones: ["SAT-matematiikan harjoitus puhelimessa", "Leikkaussaliteknikon kysymys puhelimessa", "CNA-harjoituskysymys puhelimessa"],
    desktop: "SAT-harjoituskoe aikarajalla tietokoneella",
    dashboard: "Tigertestin DMV-yleisnäkymä harjoitussarjoineen ja harjoituskokeineen",
  },
  everyTest: "Kaikki harjoituskokeet",
  testsFor: (inName) => `Harjoituskokeet: ${inName}`,
  usExamPrompt: "Muutatko Yhdysvaltoihin tai valmistaudutko yhdysvaltalaiseen kokeeseen?",
  seeAllTests: (n) => `Katso kaikki ${n} koetta`,
  faqTitle: "Usein kysyttyä",
  requestTitle: "Eikö kokeesi ole listalla?",
  requestBody: "Lisäämme uusia kokeita toiveiden mukaan. Kerro, mihin valmistaudut.",
  requestCta: "Toivo koetta",
  usLead: (examCount) => `${examCount} koetta DMV:n ajokortin teoriakokeesta SAT-kokeeseen, hoitoalan ja IT-alan sertifikaatteihin. Jokainen vastaus selitetään. Ei tiliä tarvita.`,
  countryLead: (countryName) =>
    `Ilmaiset harjoituskokeet tälle maalle (${countryName}): ajokortin teoriakoe ja sertifikaatit, jotka ovat samat kaikkialla. Jokainen vastaus selitetään. Ei tiliä tarvita.`,
  usFaqs: (examCount) => [
    {
      q: "Mikä Tigertest on?",
      a: `Tigertest on ilmainen sivusto, jossa on harjoituskokeita ${examCount} kokeeseen: DMV:n ajokortin teoriakokeesta jokaisessa osavaltiossa SAT- ja ACT-kokeisiin sekä hoitoalan, terveydenhuollon, IT-alan, ammattien ja lupien kokeisiin. Jokainen koe noudattaa oikean kokeen julkaistua rakennetta, ja jokaisessa kysymyksessä oikea vastaus selitetään.`,
    },
    {
      q: "Onko Tigertest ilmainen?",
      a: "Kyllä. Lähes jokainen koe on täysin ilmainen. DMV-kokeeseen on ilmaiset harjoituskokeet ja harjoittelu sekä vapaaehtoinen kertaostos Premium (ei tilaus), joka avaa kaksi lisäkoetta ja harjoitussarjaa sekä täydet tilastot jokaiseen yhdysvaltalaiseen kokeeseen.",
    },
    {
      q: "Tarvitsenko tilin?",
      a: "Et. Voit aloittaa minkä tahansa kokeen kirjautumatta. Luo ilmainen tili, jos haluat tallentaa edistymisesi kaikille laitteillesi.",
    },
    {
      q: "Miten Tigertest auttaa minua pääsemään läpi?",
      a: "Harjoittelutilassa näet heti, onko vastauksesi oikein, ja kysymykset, joihin vastaat väärin, tulevat takaisin, kunnes osaat ne. Täysimittaiset harjoituskokeet jäljittelevät sitten oikeaa koetta, ja tuloksistasi näet, mitkä aiheet vaativat vielä työtä.",
    },
    {
      q: "Liittyykö Tigertest DMV:hen tai johonkin koejärjestäjään?",
      a: "Ei. Tigertest on riippumaton eikä liity mihinkään DMV:hen, koejärjestäjään tai sertifiointielimeen.",
    },
  ],
  dmv: {
    cta: "DMV:n ajokortin teoriakoe",
    title: "Teetkö DMV:n ajokortin teoriakokeen?",
    body: "200 kysymystä, jotka on kirjoitettu oman osavaltiosi ajokäsikirjan pohjalta, kaikille 50 osavaltiolle ja DC:lle.",
    about: "Tietoa DMV-harjoituskokeesta",
    questionsOnTest: (n) => `${n} kysymystä kirjallisessa kokeessa`,
    viewAll: "Katso kaikki 50 osavaltiota",
  },
  listName: (inName) => `Tigertestin harjoituskokeet: ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Mikä Tigertest on?",
      a:
        local === 0
          ? `Tigertest on ilmainen harjoituskoesivusto. Tälle maalle (${inName}) on sertifikaatteja, jotka ovat samat kaikkialla, kuten CompTIA ja AWS. Jokaisessa kysymyksessä oikea vastaus selitetään.`
          : `Tigertest on ilmainen harjoituskoesivusto. Tälle maalle (${inName}) on ${local === 1 ? "ajokortin teoriakoe, joka on kirjoitettu virallisten sääntöjen" : `${local} ajokortin teoriakoetta, jotka on kirjoitettu virallisten käsikirjojen`} pohjalta, sekä sertifikaatteja, jotka ovat samat kaikkialla, kuten CompTIA ja AWS. Jokaisessa kysymyksessä oikea vastaus selitetään.`,
    },
    { q: "Onko Tigertest ilmainen?", a: `Jokaisen kokeen tälle maalle (${inName}) voi aloittaa ilmaiseksi, ilman tiliä ja ilman tilausta. Valinnainen kertaostona maksettava Premium avaa useimmissa kokeissa viimeisen harjoitussarjan ja viimeisen harjoituskokeen sekä täydet tilastot.` },
    {
      q: "Tarvitsenko tilin?",
      a: "Et. Voit aloittaa minkä tahansa kokeen kirjautumatta. Luo ilmainen tili, jos haluat tallentaa edistymisesi kaikille laitteillesi.",
    },
    {
      q: "Miten Tigertest auttaa minua pääsemään läpi?",
      a: "Harjoittelutilassa näet heti, onko vastauksesi oikein, ja kysymykset, joihin vastaat väärin, tulevat takaisin, kunnes osaat ne. Täysimittaiset harjoituskokeet jäljittelevät sitten oikeaa koetta, ja tuloksistasi näet, mitkä aiheet vaativat vielä työtä.",
    },
    {
      q: "Onko Tigertest virallinen koe?",
      a: `Ei. Tigertest on riippumaton eikä liity viranomaiseen (${authority}) tai mihinkään muuhun koejärjestäjään. Kysymykset ovat omia, ja ne on kirjoitettu virallisten käsikirjojen pohjalta.`,
    },
  ],
  card: {
    questions: (n) => `${n} kysymystä`,
    free: "Ilmainen",
    freePlusPremium: "Ilmainen + Premium",
    answeredThisWeek: "vastattu tällä viikolla",
    availableIn: (names) => `Kielet: ${names}`,
  },
  search: {
    placeholder: "Hae kokeita tai ammatteja",
    label: "Hae harjoituskokeita",
    clear: "Tyhjennä haku",
    countOf: (count, total) => `${count}/${total} koetta`,
    allFree: (n) => `${n} harjoituskoetta, kaikki ilmaisia aloittaa`,
    noMatch: (q) => `Hakusanalla ‘${q}’ ei löytynyt kokeita`,
    noMatchHint: "Kokeile kokeen nimeä, ammattia tai sertifikaatin myöntävää tahoa.",
  },
  pills: {
    showTestsFor: "Näytä kokeet maalle",
    testsByCountry: "Kokeet maittain",
    countryTests: (name) => `Kokeet: ${name}`,
    moreCountries: "Lisää maita",
    saved: "Tallennettu seuraavaa kertaa varten. Edistymisesi on sama kaikissa maissa.",
    geo: (inName) => `Näytämme kokeet tälle maalle (${inName}), koska olet siellä. Voit valita toisen maan milloin tahansa.`,
  },
};

/** Every country's name in Finnish, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Yhdysvallat", CA: "Kanada", UK: "Yhdistynyt kuningaskunta", IE: "Irlanti", AU: "Australia", NZ: "Uusi-Seelanti", IN: "Intia",
  PH: "Filippiinit", MY: "Malesia", SG: "Singapore", HK: "Hongkong", AE: "Arabiemiirikunnat", ZA: "Etelä-Afrikka",
  NG: "Nigeria", KE: "Kenia", PK: "Pakistan", ES: "Espanja", PT: "Portugali", RO: "Romania", SE: "Ruotsi", GR: "Kreikka",
  DK: "Tanska", HU: "Unkari", BE: "Belgia", FI: "Suomi", MT: "Malta", DE: "Saksa", IT: "Italia",
};
