import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Times tables for primary school in England, in national curriculum order:
// Year 2 learns the 2, 5 and 10 times tables, Year 3 the 3, 4 and 8, Year 4
// every table to 12 x 12. Year 4 ends with the statutory Multiplication
// Tables Check (Standards and Testing Agency): 25 on-screen questions on the
// 2 to 12 times tables, 6 seconds each with a 3-second pause between,
// multiplication only, more of the 6, 7, 8, 9 and 12 tables, never a fact and
// its reverse in one check, and no pass mark. Each practice check here is
// those 25 questions in order, no going back, on a 2 min 30 s clock (6 s a
// question); untimed practice is a tick box before it starts. Check 1 is the
// Year 2 tables, Check 2 Year 3 with Year 2 revision, Checks 3 and 4 the full
// Year 4 mix; Check 4 is held out of the drills so it measures recall, not
// memory of the drill items. Bank built by tools/timestables/generate.py.
export const TIMESTABLES: ExamV2Config = {
  id: "timestables",
  slug: "/times-tables",
  landingPath: "/times-tables-practice-test",
  name: "Times Tables Practice Test",
  shortName: "Times Tables",
  fullName: "Year 4 Multiplication Tables Check",
  tagline: "Times tables from the 2s to the 12s in the order school teaches them, with a quick lesson before each.",
  icon: "calculator",
  theme: { brand: "300 60% 42%", brandDark: "300 60% 30%", brandLight: "300 100% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "tt",
      name: "Times Tables Check",
      shortName: "Check",
      linear: true,
      modules: [{ module: 1, questionCount: 25, timeLimit: 150 }],
      directions:
        "25 times tables questions, one at a time, like the Year 4 Multiplication Tables Check. Type the answer and press Next. You can't go back, so take a breath and do your best. The real check gives you 6 seconds a question; tick untimed if you'd like more time.",
      scale: percentScale(25),
      domains: ["ttTwoFiveTen", "ttThreeFourEight", "ttSixSevenNine", "ttElevenTwelve"],
    },
  ],
  tests: [
    { number: 1, name: "Check 1: 2s, 5s and 10s" },
    { number: 2, name: "Check 2: 3s, 4s and 8s" },
    { number: 3, name: "Check 3: Year 4, all tables" },
    { number: 4, name: "Check 4: Year 4, all tables", heldOut: true },
  ],
  domainLabels: {
    ttTwoFiveTen: "2, 5 and 10 times tables",
    ttThreeFourEight: "3, 4 and 8 times tables",
    ttSixSevenNine: "6, 7 and 9 times tables",
    ttElevenTwelve: "11 and 12 times tables",
    ttDivide: "Dividing",
    ttStories: "Times table stories",
  },
  // One drill per curriculum step, each opening with short lessons. 20
  // questions a drill, an even spread of easy to hard.
  drillSize: 20,
  drills: [
    { key: "twoFiveTen", name: "2s, 5s and 10s", section: "tt", domains: ["ttTwoFiveTen"], blurb: "The Year 2 tables: doubling, counting in 5s and the 10s.", basics: ["ttGroupsOf", "ttTwos", "ttFives", "ttTens"] },
    { key: "threeFourEight", name: "3s, 4s and 8s", section: "tt", domains: ["ttThreeFourEight"], blurb: "The Year 3 tables: swapping round, counting in 3s and double, double, double.", basics: ["ttSwapAround", "ttThrees", "ttDoubleDouble"] },
    { key: "sixSevenNine", name: "6s, 7s and 9s", section: "tt", domains: ["ttSixSevenNine"], blurb: "The trickiest Year 4 tables, each with its own trick.", basics: ["ttSixes", "ttSplitIt", "ttNines"] },
    { key: "elevenTwelve", name: "11s and 12s", section: "tt", domains: ["ttElevenTwelve"], blurb: "The last two tables: say it twice, and 10 lots and 2 lots.", basics: ["ttElevens", "ttTwelves"] },
    { key: "divide", name: "Dividing", section: "tt", domains: ["ttDivide"], blurb: "Use the times tables backwards to share and group.", basics: ["ttFactFamilies", "ttSharing"] },
    { key: "stories", name: "Times table stories", section: "tt", domains: ["ttStories"], blurb: "Word problems about wheels, eggs, biscuits and pocket money.", basics: ["ttStoryWords"] },
  ],
  composite: { name: "Score", min: 0, max: 100, combine: overallPercent },
  fixedGoal: 100,
  defaultGoal: 100,
  goalChoices: [60, 70, 80, 90, 100],
  goalNotes: {
    60: "A good start: 15 out of 25",
    70: "Getting there: about 18 out of 25",
    80: "Great: 20 out of 25",
    90: "Brilliant: about 23 out of 25",
    100: "Full marks: all 25!",
  },
  testLength: "2 min 30 sec",
  copy: {
    scoreLabel: "Your score",
    heroSubs: [
      "Start with the 2s, 5s and 10s.",
      "One table at a time. You're doing great!",
      "Halfway there. Try a check!",
      "Nearly there. Keep practising the checks.",
      "Times tables superstar!",
    ],
    sourceLine: "Follows the national curriculum in England (2s, 5s and 10s in Year 2, 3s, 4s and 8s in Year 3, all tables to 12 × 12 in Year 4) and the format of the Year 4 Multiplication Tables Check. Not affiliated with the Department for Education or the Standards and Testing Agency.",
    scoreNote: "Percent correct out of 25. The real Multiplication Tables Check has no pass mark; 25 out of 25 is full marks.",
  },
};
