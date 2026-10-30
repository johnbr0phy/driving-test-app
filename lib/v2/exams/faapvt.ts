import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// FAA Private Pilot Airplane (PAR) airman knowledge test, built to the Private
// Pilot Airplane ACS (FAA-S-ACS-6C, effective May 31, 2024): 60 multiple-choice
// questions with three options (A, B, C), 2.0 hours allotted (cut from 2.5
// hours on April 24, 2023), 70 percent to pass, minimum age 15. The real test
// uses a figure supplement (sectional excerpts, performance charts); this bank
// has no figure-dependent items, so chart readings and performance data are
// given in words or numbers in the stem. Weighting by ACS knowledge area per
// test: regulations 9, airspace and airport operations 8, weather theory 7,
// weather services 7, aerodynamics, systems and instruments 9, performance and
// weight and balance 7, navigation 7, human factors and ADM 6 (= 60). The FAA
// publishes no per-area weights, so these are an estimate from the ACS.
// Sources: tools/faapvt/sources.md.
const minutes = (n: number) => n * 60;

export const FAAPVT: ExamV2Config = {
  id: "faapvt",
  slug: "/private-pilot",
  landingPath: "/private-pilot-written-test",
  name: "Private Pilot Written Test",
  shortName: "Private Pilot",
  fullName: "FAA Private Pilot Airplane (PAR) knowledge test",
  tagline: "60 three-choice questions in 2 hours, like the real FAA private pilot written.",
  icon: "plane",
  theme: { brand: "68 40% 28%", brandDark: "68 40% 19%", brandLight: "68 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "par",
      name: "Private Pilot Airplane (PAR)",
      shortName: "PAR",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(120) }],
      directions: "60 questions in 2 hours, the FAA's time for the PAR test. Each question has three answer choices. Chart and performance data are given in the question instead of a figure supplement. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: ["pvtRegs", "pvtAirspace", "pvtWeather", "pvtWxServices", "pvtAircraft", "pvtPerformance", "pvtNav", "pvtHuman"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pvtRegs: "Regulations",
    pvtAirspace: "Airspace and Airport Operations",
    pvtWeather: "Weather Theory",
    pvtWxServices: "Weather Reports and Forecasts",
    pvtAircraft: "Aerodynamics, Systems and Instruments",
    pvtPerformance: "Performance, Weight and Balance",
    pvtNav: "Navigation and Charts",
    pvtHuman: "Human Factors and Decision-Making",
  },
  drills: [
    { key: "regs", name: "Regulations", section: "par", domains: ["pvtRegs"], blurb: "Parts 61 and 91, currency, medicals, inspections and NTSB 830." },
    { key: "airspace", name: "Airspace and Airports", section: "par", domains: ["pvtAirspace"], blurb: "Airspace classes, VFR minimums, signs, lights and wake turbulence." },
    { key: "weather", name: "Weather Theory", section: "par", domains: ["pvtWeather"], blurb: "Stability, fronts, fog, icing, thunderstorms and wind shear." },
    { key: "wxservices", name: "Weather Reports", section: "par", domains: ["pvtWxServices"], blurb: "METARs, TAFs, winds aloft, PIREPs, AIRMETs and SIGMETs." },
    { key: "aircraft", name: "Aerodynamics and Systems", section: "par", domains: ["pvtAircraft"], blurb: "Stalls, load factor, engines, pitot-static and gyro instruments." },
    { key: "performance", name: "Performance and Weight", section: "par", domains: ["pvtPerformance"], blurb: "Density altitude, crosswinds, weight and balance math." },
    { key: "navigation", name: "Navigation", section: "par", domains: ["pvtNav"], blurb: "Sectional charts, headings, VOR, GPS and flight planning math." },
    { key: "human", name: "Human Factors", section: "par", domains: ["pvtHuman"], blurb: "Hypoxia, illusions, hazardous attitudes and risk management." },
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
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Get your endorsement and book the test.",
    ],
    sourceLine: "Original questions written from the Private Pilot Airplane ACS (FAA-S-ACS-6C), the PHAK, the AIM and 14 CFR. Not affiliated with or endorsed by the FAA.",
    scoreNote: "Percent correct. The FAA needs 70 percent to pass, and your score appears on your test report with codes for the ACS areas you missed. Aim for 80 percent here.",
  },
};
