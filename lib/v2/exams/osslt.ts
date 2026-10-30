import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// OSSLT (Ontario Secondary School Literacy Test, EQAO): the literacy
// graduation requirement for the Ontario Secondary School Diploma, first
// written in Grade 10. Online since 2022-23, in two sessions (Session A about
// 65 minutes, Session B about 75). Per the EQAO OSSLT Framework, the scored
// part is 37 questions: 35 selected-response (23 reading, 12 writing) and two
// open-response (one reading answer on the news report, one opinion essay).
// Reading uses four selections, each with its own items: information
// paragraph 6, news report 5 (+ the open response), dialogue 5, real-life
// narrative 7. Writing selected-response covers developing a main idea,
// organizing ideas and conventions; EQAO does not publish the split, so the
// 4/3/5 here is ours. The open responses are not modelled. Real results are a
// scale score of 200 to 400 with 300 needed for a successful outcome, worked
// out by item response theory including the written answers, so there is no
// fixed percent; the readiness line here is our estimate. Bank built by
// tools/osslt/build.py. Test 2 is held out of the drills.
const minutes = (n: number) => n * 60;

export const OSSLT: ExamV2Config = {
  id: "osslt",
  slug: "/osslt",
  landingPath: "/osslt-practice-test",
  name: "OSSLT Practice Test",
  shortName: "OSSLT",
  fullName: "Ontario Secondary School Literacy Test",
  tagline: "The Grade 10 literacy test: the four reading forms and the writing questions, with the basics taught first.",
  icon: "book",
  theme: { brand: "232 52% 42%", brandDark: "232 52% 30%", brandLight: "232 100% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 23, timeLimit: minutes(45) }],
      directions:
        "Four reading selections, one of each OSSLT form: an information paragraph, a news report, a dialogue and a real-life narrative. Each selection stays on screen beside its questions. Most questions have one answer; a few ask you to choose two or to put events in order. The real test also asks for one short written answer about the news report, which is not part of this practice test.",
      scale: percentScale(23),
      domains: ["ossltInfo", "ossltNews", "ossltDialogue", "ossltNarrative"],
    },
    {
      key: "writing",
      name: "Writing",
      shortName: "Writing",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(20) }],
      directions:
        "Twelve writing questions on developing a main idea, organizing ideas and using conventions (spelling, grammar and punctuation). Some ask you to pick a word from a dropdown, tap a sentence or word in a paragraph, or put sentences in order. The real test's opinion essay is not part of this practice test.",
      scale: percentScale(12),
      domains: ["ossltIdeas", "ossltOrganize", "ossltConventions"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ossltInfo: "Information paragraphs",
    ossltNews: "News reports",
    ossltDialogue: "Dialogues",
    ossltNarrative: "Real-life narratives",
    ossltIdeas: "Main idea and supporting details",
    ossltOrganize: "Organizing ideas",
    ossltConventions: "Spelling, grammar and punctuation",
  },
  // Four drills, each opening with Basics: two reading (factual texts, then
  // stories and dialogues) and two writing (ideas and organization, then
  // conventions). With the two tests that is 10 dashboard steps.
  drillSize: 20,
  drills: [
    { key: "infoNews", name: "Information and news", section: "reading", domains: ["ossltInfo", "ossltNews"], blurb: "Information paragraphs and news reports: main idea, stated details, word meaning, inference and why the writer included something.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "authorPurpose", "factOpinion"] },
    { key: "storyDialogue", name: "Stories and dialogues", section: "reading", domains: ["ossltNarrative", "ossltDialogue"], blurb: "Real-life narratives and dialogues: what characters feel and why, figurative language, the order of events and the theme.", basics: ["findingDetail", "inference", "mainIdea", "toneWords", "causeEffect", "wordsInContext", "sequenceEvents"] },
    { key: "ideasOrganize", name: "Main idea and organization", section: "writing", domains: ["ossltIdeas", "ossltOrganize"], blurb: "Pick the best topic sentence, supporting detail or conclusion, cut the sentence that does not belong and put ideas in order with transitions.", basics: ["topicSentences", "addingSentence", "deletingSentence", "keepOnGoal", "transitions"] },
    { key: "conventions", name: "Spelling, grammar and punctuation", section: "writing", domains: ["ossltConventions"], blurb: "Run-on sentences, commas, apostrophes, its and it's, agreement, pronouns, verb tense and commonly confused words.", basics: ["commaSplices", "listIntroCommas", "apostrophes", "itsIts", "subjectVerb", "pronounCase", "verbTense", "commonlyConfused"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, our estimate of a successful result",
    80: "80% practice score target, a safe margin",
    85: "85% practice score target",
  },
  testLength: "1 hr 5 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each part of the test.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on the practice test.",
      "Goal hit. You're ready for the OSSLT.",
    ],
    sourceLine: "Based on the EQAO OSSLT Framework (reading forms, writing skills and question counts). Original questions; not affiliated with EQAO.",
    scoreNote: "Percent correct on the 35 multiple-choice questions. The real OSSLT reports a scale score from 200 to 400, with 300 needed to be successful, and also scores two written answers not modelled here. Our estimate: about 75% here on both tests suggests you are on track to be successful.",
  },
};
