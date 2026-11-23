import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// FAA Instrument Rating Airplane (IRA) airman knowledge test, built to the
// Instrument Rating - Airplane ACS (FAA-S-ACS-8C, November 2023): 60
// multiple-choice questions with three options (A, B, C), 2.0 hours allotted
// (effective 7/31/23 per the FAA ACS knowledge test table), 70 percent to
// pass, minimum age 15. The real test uses the FAA instrument testing
// supplement (en route charts, approach plates); this bank has no
// figure-dependent items, so chart values, weather strings and approach data
// are given in words or numbers in the stem. Weighting per test, an estimate
// from the ACS since the FAA publishes no per-area counts: regulations and
// qualifications 8, weather theory 7, weather reports and forecasts 7,
// instruments and systems 8, navigation and en route charts 8, ATC,
// departures and holding 8, approaches 8, human factors and ADM 6 (= 60).
// Sources: tools/next100/faaifr/sources.md.
const minutes = (n: number) => n * 60;

export const FAAIFR: ExamV2Config = {
  id: "faaifr",
  slug: "/instrument-rating",
  landingPath: "/instrument-rating-written-test",
  name: "Instrument Rating Written Test",
  shortName: "Instrument Rating",
  fullName: "FAA Instrument Rating Airplane (IRA) knowledge test",
  tagline: "60 three-choice questions in 2 hours, like the real FAA instrument written.",
  icon: "plane",
  theme: { brand: "237 35% 14%", brandDark: "237 35% 9%", brandLight: "237 35% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ira",
      name: "Instrument Rating Airplane (IRA)",
      shortName: "IRA",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(120) }],
      directions: "60 questions in 2 hours, the FAA's time for the IRA test. Each question has three answer choices. Chart, approach plate and weather data are given in the question instead of a testing supplement. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: ["ifrRegs", "ifrWeather", "ifrWxServices", "ifrInstruments", "ifrNav", "ifrAtc", "ifrApproaches", "ifrHuman"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ifrRegs: "IFR Regulations and Qualifications",
    ifrWeather: "Weather Theory for IFR",
    ifrWxServices: "Weather Reports and Forecasts",
    ifrInstruments: "Flight Instruments and Systems",
    ifrNav: "Navigation and En Route Charts",
    ifrAtc: "ATC Clearances, Departures and Holding",
    ifrApproaches: "Instrument Approaches",
    ifrHuman: "Human Factors and Decision-Making",
  },
  drills: [
    { key: "regs", name: "IFR Regulations", section: "ira", domains: ["ifrRegs"], blurb: "Currency, alternates, fuel, equipment and inspections." },
    { key: "weather", name: "Weather Theory", section: "ira", domains: ["ifrWeather"], blurb: "Icing, fog, fronts, thunderstorms and wind shear." },
    { key: "wxservices", name: "Weather Reports", section: "ira", domains: ["ifrWxServices"], blurb: "METARs, TAFs, SIGMETs, AIRMETs and flight categories." },
    { key: "instruments", name: "Instruments and Systems", section: "ira", domains: ["ifrInstruments"], blurb: "Attitude flying, scan errors, failures and ice protection." },
    { key: "navigation", name: "Navigation", section: "ira", domains: ["ifrNav"], blurb: "VOR, ILS, GPS, DME and en route altitudes." },
    { key: "atc", name: "ATC and Holding", section: "ira", domains: ["ifrAtc"], blurb: "Clearances, departures, reports, holding and lost comms." },
    { key: "approaches", name: "Approaches", section: "ira", domains: ["ifrApproaches"], blurb: "Minimums, visual references, circling and missed approaches." },
    { key: "human", name: "Human Factors", section: "ira", domains: ["ifrHuman"], blurb: "Spatial disorientation, illusions and IFR risk management." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "The FAA passing score",
    75: "Passing with a little room",
    80: "A safe margin over 70",
    85: "Strong: ready to book",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each knowledge area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Get your endorsement and book the test.",
    ],
    sourceLine: "Original questions written from the Instrument Rating Airplane ACS (FAA-S-ACS-8C), the Instrument Flying and Instrument Procedures Handbooks, the AIM and 14 CFR. Not affiliated with or endorsed by the FAA.",
    scoreNote: "Percent correct. The FAA needs 70 percent to pass, and your score appears on your test report with codes for the ACS areas you missed. Aim for 80 percent here.",
  },
};
