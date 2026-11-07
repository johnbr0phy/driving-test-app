import { ExamV2Config, ScaleSpec } from "../types";
import { curve } from "../scales";

// Högskoleprovet (the Swedish Scholastic Aptitude Test, SweSAT), run by
// Universitets- och högskolerådet (UHR) and given by the universities each
// spring and autumn; written in Swedish, Tigertest's first native-language v2
// exam. Real test (studera.nu, the 2026-10-18 provhäften and "Så räknas
// resultatet fram", checked 2026-11-06): five provpass of 40 uppgifter in 55
// minutes each, two verbal, two quantitative and one unscored try-out pass, so
// 160 scored items; every item multiple choice, no minus points. Verbal pass:
// ORD 10 (3 min recommended), LÄS 10 (22), MEK 10 (8), ELF 10 (22). Kvantitativ
// pass: XYZ 12 (12), KVA 10 (10), NOG 6 (10), DTK 12 (23). Each part's raw
// score (0 to 80) is normed separately to 0,00 to 2,00 and the result, the
// mean of the two, is given in steps of 0,05; results are valid for eight years.
// Modelled: one verbal and one quantitative pass per practice test (80 items,
// 110 minutes), half the real length at the real pace; ORD has five
// alternatives, NOG five fixed and KVA four fixed (lockedOrder). Each part is
// estimated on 0 to 2 with curve() anchors scaled to 40 items: an estimate,
// not a UHR norm table (UHR says earlier tables cannot predict a result).
// Sources: tools/next100/sehp/sources.md.
const minutes = (n: number) => n * 60;

// The real scale moves in steps of 0,05. Rounding to twentieths keeps every
// value a clean decimal (1.15, never 1.1500000000000001).
const twentieths = (s: ScaleSpec): ScaleSpec => ({ ...s, table: s.table.map((v) => Math.round(v * 20) / 20) });

export const SEHP: ExamV2Config = {
  id: "sehp",
  slug: "/hogskoleprovet",
  landingPath: "/sv/hogskoleprovet-ovningsprov",
  icon: "graduation",
  language: "sv",
  locale: "sv-SE",
  english: {
    name: "Swedish Scholastic Aptitude Test (Högskoleprovet)",
    shortName: "Högskoleprovet",
    fullName: "Högskoleprovet, the Swedish Scholastic Aptitude Test (SweSAT), in Swedish",
  },
  review: { sv: "model" },
  name: "Högskoleprovet övningsprov",
  shortName: "Högskoleprovet",
  fullName: "Högskoleprovet (verbal och kvantitativ del)",
  tagline: "Övningsprov med en verbal och en kvantitativ del som på riktigt, med ett uppskattat resultat från 0,0 till 2,0.",
  theme: { brand: "265 85% 28%", brandDark: "265 85% 20%", brandLight: "265 55% 95%" },
  breakSeconds: 300,
  breakNote: "På provdagen har du pauser mellan provpassen. Här får du fem minuter innan den kvantitativa delen.",
  sections: [
    {
      key: "verbal",
      name: "Verbal del",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(55) }],
      directions:
        "Ett provpass med 40 uppgifter på 55 minuter, i samma ordning som på provet: **ORD** (10 uppgifter, rekommenderad tid 3 minuter), **LÄS** (10 uppgifter, 22 minuter), **MEK** (10 uppgifter, 8 minuter) och **ELF** (10 uppgifter, 22 minuter). I ORD väljer du det alternativ som betyder ungefär samma sak som ordet i fetstil. I MEK väljer du de ord som passar bäst i luckorna. ELF-texterna och frågorna är på engelska. Du får inga minuspoäng för fel svar, så svara på alla uppgifter.",
      scale: twentieths(curve(40, [[0, 0], [10, 0], [18, 0.5], [24, 1.0], [31, 1.5], [35, 1.8], [38, 2.0], [40, 2.0]], 0, 0.05)),
      domains: ["sehpOrd", "sehpLas", "sehpMek", "sehpElf"],
    },
    {
      key: "kvant",
      name: "Kvantitativ del",
      shortName: "Kvantitativ",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(55) }],
      directions:
        "Ett provpass med 40 uppgifter på 55 minuter, utan miniräknare: **XYZ** (12 uppgifter, rekommenderad tid 12 minuter), **KVA** (10 uppgifter, 10 minuter), **NOG** (6 uppgifter, 10 minuter) och **DTK** (12 uppgifter, 23 minuter). **KVA:** jämför kvantitet I med kvantitet II och använd informationen ovanför dem. Välj \"informationen är otillräcklig\" bara när olika tal som uppfyller villkoren ger olika svar. **NOG:** avgör om påstående (1), påstående (2), båda tillsammans eller vart och ett för sig räcker för att besvara frågan. Du behöver inte räkna ut svaret. **DTK:** diagram och kartor återges här som tabeller.",
      scale: twentieths(curve(40, [[0, 0], [9, 0], [17, 0.5], [23, 1.0], [30, 1.5], [34, 1.8], [37, 2.0], [40, 2.0]], 0, 0.05)),
      domains: ["sehpXyz", "sehpKva", "sehpNog", "sehpDtk"],
    },
  ],
  tests: [
    { number: 1, name: "Övningsprov 1" },
    { number: 2, name: "Övningsprov 2", heldOut: true },
  ],
  domainLabels: {
    sehpOrd: "ORD, ordförståelse",
    sehpLas: "LÄS, svensk läsförståelse",
    sehpMek: "MEK, meningskomplettering",
    sehpElf: "ELF, engelsk läsförståelse",
    sehpXyz: "XYZ, matematisk problemlösning",
    sehpKva: "KVA, kvantitativa jämförelser",
    sehpNog: "NOG, kvantitativa resonemang",
    sehpDtk: "DTK, diagram, tabeller och kartor",
  },
  drills: [
    { key: "ord", name: "ORD", section: "verbal", domains: ["sehpOrd"], blurb: "Ord från tidningar, facktexter och skönlitteratur. Fem alternativ, välj det som betyder ungefär samma sak." },
    { key: "las", name: "LÄS", section: "verbal", domains: ["sehpLas"], blurb: "Svenska sakprosatexter med frågor om huvudbudskap, detaljer, slutsatser och författarens hållning." },
    { key: "mek", name: "MEK", section: "verbal", domains: ["sehpMek"], blurb: "Meningar med en eller två luckor. Läs efter signalorden (men, trots att, eftersom) innan du tittar på alternativen." },
    { key: "elf", name: "ELF", section: "verbal", domains: ["sehpElf"], blurb: "Engelska texter med frågor på engelska om innehåll, ordval och slutsatser." },
    { key: "xyz", name: "XYZ", section: "kvant", domains: ["sehpXyz"], blurb: "Algebra, procent, bråk, potenser, ekvationer, geometri och sannolikhet på Matematik 1b-nivå." },
    { key: "kva", name: "KVA", section: "kvant", domains: ["sehpKva"], blurb: "Jämför två kvantiteter. Pröva negativa tal, bråk och noll innan du väljer." },
    { key: "nog", name: "NOG", section: "kvant", domains: ["sehpNog"], blurb: "Räcker informationen? Pröva varje påstående för sig, sedan båda tillsammans." },
    { key: "dtk", name: "DTK", section: "kvant", domains: ["sehpDtk"], blurb: "Tabeller, diagram och kartor: procent, andelar, kortaste vägar och tidtabeller." },
  ],
  composite: {
    name: "Högskoleprovsresultat",
    min: 0,
    max: 2,
    // Medelvärdet av de två normerade delarna, avrundat till 0,05 som på riktigt.
    combine: (sections) => Math.round((sections.reduce((a, s) => a + s.scaled, 0) / Math.max(1, sections.length)) * 20) / 20,
  },
  defaultGoal: 1.0,
  goalChoices: [0.8, 1.0, 1.2, 1.4, 1.6, 1.8],
  goalNotes: {
    0.8: "En första milstolpe",
    1.0: "Mitt på skalan",
    1.2: "Över mitten på skalan",
    1.4: "Ett starkt resultat",
    1.6: "Ett mycket starkt resultat",
    1.8: "Nära toppen av skalan",
  },
  testLength: "1 tim 50 min",
  copy: {
    heroSubs: [
      "Öva varje delprov, gör sedan ett helt övningsprov.",
      "Bemästra delproven först.",
      "Halvvägs. Gör övningsprov 1.",
      "Nå ditt mål på båda övningsproven.",
      "Målet nått. Anmäl dig till högskoleprovet.",
    ],
    scoreLabel: "Uppskattat högskoleprovsresultat",
    sourceLine: "Egna uppgifter skrivna efter UHR:s beskrivning av högskoleprovet, aldrig kopierade från tidigare prov. Tigertest är inte knutet till UHR. Resultatet är en uppskattning.",
    scoreNote: "Den verbala och den kvantitativa delen uppskattas var för sig på skalan 0,0 till 2,0 och medelvärdet är resultatet, som på riktigt. Varje övningsprov har ett provpass per del, hälften av provets 160 uppgifter. Riktiga resultat normeras för varje provtillfälle, så uppskattningen är ingen normeringstabell från UHR.",
  },
};
