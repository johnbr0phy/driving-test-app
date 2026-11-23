import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// FAA Commercial Pilot Airplane (CAX) airman knowledge test, built to the Commercial Pilot for Airplane
// Category ACS (FAA-S-ACS-7B, in effect since May 31, 2024). The real test is 100 multiple-choice
// questions with three options (A, B, C) in 2.5 hours (cut from 3.0 on April 24, 2023), 70 percent to
// pass, minimum age 16 to take it (18 for the certificate). It uses a figure supplement (FAA-CT-8080-1E);
// this bank has no figure items, so weight and balance data, winds and chart values are in the stem.
// Each practice test is 50 questions in 75 minutes, half the real test at its pace. Weighting per test
// (the FAA publishes none): regulations 7, airspace 5, weather 6, navigation 5, aerodynamics 6,
// systems 6, performance and weight and balance 6, commercial maneuvers and emergencies 5, human
// factors and high altitude 4 (= 50). Sources: tools/next100/faacax/sources.md.
const minutes = (n: number) => n * 60;

export const FAACAX: ExamV2Config = {
  id: "faacax",
  slug: "/commercial-pilot",
  landingPath: "/commercial-pilot-written-test",
  name: "Commercial Pilot Written Test",
  shortName: "Commercial Pilot",
  fullName: "FAA Commercial Pilot Airplane (CAX) knowledge test",
  tagline: "Three-choice questions at the real pace of the FAA commercial pilot written.",
  icon: "plane",
  theme: { brand: "208 10% 42%", brandDark: "208 10% 30%", brandLight: "208 10% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cax",
      name: "Commercial Pilot Airplane (CAX)",
      shortName: "CAX",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(75) }],
      directions: "50 questions in 75 minutes, half the real CAX test at its pace (100 questions in 2.5 hours). Each question has three answer choices. Weight and balance data, winds and chart values are given in the question instead of a figure supplement. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["caxRegs", "caxAirspace", "caxWeather", "caxNav", "caxAero", "caxSystems", "caxPerformance", "caxManeuvers", "caxHuman"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    caxRegs: "Regulations and Commercial Privileges",
    caxAirspace: "Airspace and Airport Operations",
    caxWeather: "Weather",
    caxNav: "Navigation and Flight Planning",
    caxAero: "Aerodynamics and Multiengine",
    caxSystems: "Complex and High-Altitude Systems",
    caxPerformance: "Performance, Weight and Balance",
    caxManeuvers: "Commercial Maneuvers and Emergencies",
    caxHuman: "Human Factors and High Altitude",
  },
  drills: [
    { key: "regs", name: "Regulations", section: "cax", domains: ["caxRegs"], blurb: "Commercial privileges and limits, experience, medicals, endorsements and inspections." },
    { key: "airspace", name: "Airspace and Airports", section: "cax", domains: ["caxAirspace"], blurb: "Speed limits, ADS-B and transponders, special use airspace and runway safety." },
    { key: "weather", name: "Weather", section: "cax", domains: ["caxWeather"], blurb: "Thunderstorms, icing, fronts, METARs, TAFs, winds aloft and SIGMETs." },
    { key: "navigation", name: "Navigation", section: "cax", domains: ["caxNav"], blurb: "Wind triangles, fuel planning, 1-in-60 corrections, DME and diversions." },
    { key: "aero", name: "Aerodynamics", section: "cax", domains: ["caxAero"], blurb: "Load factor, stall speed, maneuvering speed, Vmc and the critical engine." },
    { key: "systems", name: "Systems", section: "cax", domains: ["caxSystems"], blurb: "Constant-speed props, turbochargers, retractable gear, pressurization and oxygen." },
    { key: "performance", name: "Performance and Weight", section: "cax", domains: ["caxPerformance"], blurb: "CG, weight shift, ballast, crosswinds, hydroplaning and takeoff distance." },
    { key: "maneuvers", name: "Commercial Maneuvers", section: "cax", domains: ["caxManeuvers"], blurb: "Chandelles, lazy eights, pivotal altitude, steep spirals and power-off 180s." },
    { key: "human", name: "Human Factors", section: "cax", domains: ["caxHuman"], blurb: "Hypoxia, time of useful consciousness, decompression and illusions." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "The FAA passing score",
    75: "Passing with a little room",
    80: "A safe margin over 70",
    85: "A strong margin over 70",
    90: "Top band",
  },
  testLength: "1 hr 15 min",
  copy: {
    heroSubs: [
      "Drill each knowledge area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Get your endorsement and book the test.",
    ],
    sourceLine: "Original questions written from the Commercial Pilot Airplane ACS (FAA-S-ACS-7B), the PHAK, the Airplane Flying Handbook, the AIM and 14 CFR. Not affiliated with or endorsed by the FAA.",
    scoreNote: "Percent correct. The FAA needs 70 percent to pass, and your test report lists ACS codes for the areas you missed. Aim for 80 percent here.",
  },
};
