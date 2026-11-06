// Hungarian homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: informal "te", like i18n/hu.ts. Hungarian marks place with case
// suffixes ("Magyarországon", "az Egyesült Államokban") that depend on the name,
// so country names only ever follow a colon or sit in brackets
// ("ehhez az országhoz (Magyarország)") and no inNames table is needed.

import type { HomeCopy } from "../homeCopy";

export const hu: HomeCopy = {
  heroTitle: "Ingyenes gyakorló tesztek, hogy elsőre sikerüljön",
  findYourTest: "Keresd meg a teszted",
  answeredThisWeek: "megválaszolt kérdés ezen a héten",
  popularThisWeek: "Népszerű ezen a héten",
  popularTests: "Népszerű tesztek",
  allTests: (n) => `Mind a(z) ${n} teszt`,
  aboutTheTest: "A vizsgáról",
  aboutEachTest: "Az egyes vizsgákról",
  howItWorks: "Így működik a Tigertest",
  steps: [
    {
      label: "1. lépés",
      title: "Tanulj a telefonodon",
      body: "Koppints egy válaszra, és azonnal látod, jó-e, és miért. A kérdések, amelyeket elrontasz, addig visszajönnek, amíg meg nem tanulod őket. Így a buszon töltött pár perc is számít.",
    },
    {
      label: "2. lépés",
      title: "Gyakorold az igazi vizsgát",
      body: "Ha már könnyűnek érzed a kérdéseket, írj egy teljes gyakorló tesztet, amely az igazi vizsga felépítését követi, ugyanazzal a témakeverékkel. Így tudod az eredményed, mielőtt élesben számítana.",
    },
    {
      label: "3. lépés",
      title: "Tudd, mikor állsz készen",
      body: "Az áttekintésed zöldre vált, amikor teljesítesz egy sorozatot, és sikeresen megírsz egy tesztet. Ha minden zöld, jelentkezhetsz a vizsgára.",
    },
  ],
  shotAlts: {
    phones: ["SAT matekgyakorlás telefonon", "Műtősasszisztens-kérdés telefonon", "CNA gyakorlókérdés telefonon"],
    desktop: "Időre menő SAT gyakorló teszt számítógépen",
    dashboard: "A Tigertest DMV-áttekintése gyakorlósorozatokkal és gyakorló tesztekkel",
  },
  everyTest: "Minden gyakorló teszt",
  testsFor: (inName) => `Gyakorló tesztek: ${inName}`,
  usExamPrompt: "Az Egyesült Államokba költözöl, vagy amerikai vizsgára készülsz?",
  seeAllTests: (n) => `Mind a(z) ${n} teszt megtekintése`,
  faqTitle: "Gyakori kérdések",
  requestTitle: "Nem találod a vizsgádat?",
  requestBody: "Kérésre új teszteket is felveszünk. Írd meg, mire készülsz.",
  requestCta: "Teszt kérése",
  usLead: (examCount) => `${examCount} vizsga, az amerikai DMV jogosítványvizsgától a SAT-ig, az ápolói és az informatikai minősítésekig. Minden válasz elmagyarázva. Fiók nélkül.`,
  countryLead: (countryName) =>
    `Ingyenes gyakorló tesztek ehhez az országhoz (${countryName}): a jogosítvány elméleti vizsgája és a mindenhol egyforma minősítések. Minden válasz elmagyarázva. Fiók nélkül.`,
  usFaqs: (examCount) => [
    {
      q: "Mi az a Tigertest?",
      a: `A Tigertest egy ingyenes gyakorlótesztoldal ${examCount} vizsgához, az összes amerikai állam DMV jogosítványvizsgájától a SAT-ig, az ACT-ig, valamint ápolói, egészségügyi, informatikai, szakmai és engedélyvizsgákig. Minden teszt az igazi vizsga közzétett felépítését követi, és minden kérdésnél elmagyarázzuk a helyes választ.`,
    },
    {
      q: "Ingyenes a Tigertest?",
      a: "Igen. Szinte minden teszt teljesen ingyenes. A DMV-hez ingyenes gyakorló tesztek és gyakorlás tartoznak, és van egy választható, egyszeri Premium vásárlás (nem előfizetés), amely még két tesztet és gyakorlósorozatot old fel, valamint minden amerikai vizsga teljes statisztikáját.",
    },
    {
      q: "Kell fiók?",
      a: "Nem. Bármelyik tesztet elkezdheted bejelentkezés nélkül. Ha szeretnéd, hogy a haladásod minden eszközödön meglegyen, hozz létre ingyenes fiókot.",
    },
    {
      q: "Hogyan segít a Tigertest, hogy sikerüljön?",
      a: "Gyakorló módban azonnal látod, jó-e a válaszod, és az elrontott kérdések addig visszajönnek, amíg meg nem tanulod őket. A teljes gyakorló tesztek aztán az igazi vizsgát utánozzák, az eredményeid pedig megmutatják, melyik témán kell még dolgoznod.",
    },
    {
      q: "A Tigertest a DMV-hez vagy egy vizsgaszervezőhöz tartozik?",
      a: "Nem. A Tigertest független, és nem tartozik egyetlen DMV-hez, vizsgaszervezőhöz vagy tanúsító testülethez sem.",
    },
  ],
  dmv: {
    cta: "DMV jogosítványvizsga",
    title: "A DMV jogosítványvizsgájára készülsz?",
    body: "200 kérdés a saját állami vezetői kézikönyved alapján, mind az 50 államhoz és DC-hez.",
    about: "A DMV gyakorló tesztről",
    questionsOnTest: (n) => `${n} kérdés az írásbeli vizsgán`,
    viewAll: "Mind az 50 állam megtekintése",
  },
  listName: (inName) => `Tigertest gyakorló tesztek: ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Mi az a Tigertest?",
      a:
        local === 0
          ? `A Tigertest egy ingyenes gyakorlótesztoldal. Ehhez az országhoz (${inName}) mindenhol egyforma minősítések érhetők el, például a CompTIA és az AWS. Minden kérdésnél elmagyarázzuk a helyes választ.`
          : `A Tigertest egy ingyenes gyakorlótesztoldal. Ehhez az országhoz (${inName}) ${local === 1 ? "egy jogosítványteszt" : `${local} jogosítványteszt`} érhető el, a hivatalos ${local === 1 ? "szabályok" : "kézikönyvek"} alapján írva, valamint mindenhol egyforma minősítések, például a CompTIA és az AWS. Minden kérdésnél elmagyarázzuk a helyes választ.`,
    },
    { q: "Ingyenes a Tigertest?", a: `Igen. Ehhez az országhoz (${inName}) minden teszt ingyenes, előfizetés nélkül.` },
    {
      q: "Kell fiók?",
      a: "Nem. Bármelyik tesztet elkezdheted bejelentkezés nélkül. Ha szeretnéd, hogy a haladásod minden eszközödön meglegyen, hozz létre ingyenes fiókot.",
    },
    {
      q: "Hogyan segít a Tigertest, hogy sikerüljön?",
      a: "Gyakorló módban azonnal látod, jó-e a válaszod, és az elrontott kérdések addig visszajönnek, amíg meg nem tanulod őket. A teljes gyakorló tesztek aztán az igazi vizsgát utánozzák, az eredményeid pedig megmutatják, melyik témán kell még dolgoznod.",
    },
    {
      q: "A Tigertest hivatalos vizsga?",
      a: `Nem. A Tigertest független, és nem tartozik sem ehhez a szervezethez (${authority}), sem más vizsgaszervezőhöz. A kérdéseket mi írtuk, a hivatalos kézikönyvek alapján.`,
    },
  ],
  card: {
    questions: (n) => `${n} kérdés`,
    free: "Ingyenes",
    freePlusPremium: "Ingyenes + Premium",
    answeredThisWeek: "megválaszolva ezen a héten",
    availableIn: (names) => `Elérhető nyelvek: ${names}`,
  },
  search: {
    placeholder: "Vizsgák vagy szakmák keresése",
    label: "Gyakorló tesztek keresése",
    clear: "Keresés törlése",
    countOf: (count, total) => `${count} / ${total} teszt`,
    allFree: (n) => `${n} gyakorló teszt, mind ingyen elkezdhető`,
    noMatch: (q) => `Nincs találat erre: „${q}”`,
    noMatchHint: "Próbáld a vizsga nevét, a szakmát vagy a minősítést kiadó szervezetet.",
  },
  pills: {
    showTestsFor: "Tesztek ehhez:",
    testsByCountry: "Tesztek országonként",
    countryTests: (name) => `Tesztek: ${name}`,
    moreCountries: "További országok",
    saved: "Elmentve a következő alkalomra. A haladásod minden országban ugyanaz.",
    geo: (inName) => `Ennek az országnak (${inName}) a tesztjeit mutatjuk, mert ott vagy. Bármikor választhatsz másik országot.`,
  },
};

/** Every country's name in Hungarian, for the country pills and "Gyakorló tesztek: <ország>". */
export const countryNames: Record<string, string> = {
  US: "Egyesült Államok", CA: "Kanada", UK: "Egyesült Királyság", IE: "Írország", AU: "Ausztrália", NZ: "Új-Zéland", IN: "India",
  PH: "Fülöp-szigetek", MY: "Malajzia", SG: "Szingapúr", HK: "Hongkong", AE: "Egyesült Arab Emírségek", ZA: "Dél-afrikai Köztársaság",
  NG: "Nigéria", KE: "Kenya", PK: "Pakisztán", ES: "Spanyolország", PT: "Portugália", RO: "Románia", SE: "Svédország", GR: "Görögország",
  DK: "Dánia", HU: "Magyarország", BE: "Belgium", FI: "Finnország", MT: "Málta", DE: "Németország",
};
