import { BasicsSkill, basicsFor } from "./basics";
import { DrillDef, QuestionV2 } from "./types";

/**
 * Which Basics skill a missed exam-level question is really about, so the
 * drill can offer that skill's rule card (and explainer) under the miss.
 *
 * Exam questions carry a free-text `skill` label ("Boundaries", "Comma
 * splices") and an explanation that names the rule in plain words
 * ("a semicolon joins...", "is a nonessential appositive"). Each Basics
 * skill lists the words that give it away; the label counts more than the
 * explanation, and only the skills the drill opens with are candidates, so
 * a Reading drill can never point at Semicolons.
 */
const CUES: Record<string, RegExp> = {
  semicolons: /\bsemicolons?\b/i,
  colons: /\bcolons?\b/i,
  itsIts: /\bit's\b|\bits\b[^.]*\bit's\b|\bit's\b[^.]*\bits\b|contraction of ["“]it is/i,
  subjectVerb: /subject-verb|\bagreement\b|\b(singular|plural) (verb|subject|noun)\b/i,
  commaInterrupters: /nonessential|non-essential|nonrestrictive|appositive|interrupt|parenthetical|set off by/i,
  danglingModifiers: /dangling|misplaced|\bmodifier\b|introductory (phrase|modifier)/i,
  commaSplices: /comma splice|run-on|fused sentence|only a comma|comma alone|comma by itself/i,
  apostrophes: /apostrophe|possessive/i,
  transitions: /\btransition/i,
  redundancy: /redundan|repeats? (the|an?) (idea|meaning)|says the same thing/i,
  concision: /concis|wordy|fewer words|shorter|unnecessary words/i,
  preciseWords: /precise|word choice|exact word/i,
  matchingTone: /\btone\b|too (formal|casual|informal)|register/i,
  addingSentence: /should (this|the) sentence be added|adding (this|the) sentence|be added/i,
  deletingSentence: /delet|should be removed|off[- ]topic/i,
  topicSentences: /topic sentence|opening sentence/i,
  notesToSentence: /\bnotes\b/i,
  keepOnGoal: /accomplish(es)? the goal|best accomplish|the writer wants to/i,
  // Reading
  mainIdea: /main idea|central idea|main point|main purpose of the (text|passage)/i,
  findingDetail: /according to the (text|passage)|the (text|passage) (says|states)|specific detail|finding (a|the) detail/i,
  inference: /\binfer|\bimpl(y|ies)|suggests? that|most likely/i,
  wordsInContext: /in context|most nearly means|(word|phrase) in context|meaning of the word/i,
  authorPurpose: /\bpurpose\b|function of (a|the) (sentence|detail|paragraph)|why the author/i,
  textStructure: /\bstructure\b|organi[sz]ed|organi[sz]ation|problem and solution|compar(es|ison)/i,
  crossText: /text 1|text 2|both (texts|passages|authors)|author of (text|passage) [12]/i,
  toneWords: /\btone\b|attitude/i,
  claimSupport: /support(s|ed)? the claim|\bevidence\b|weaken|strengthen|undermine/i,
  logicalCompletion: /logically completes?|complete the text|most logical/i,
  causeEffect: /cause and effect|\bcaused\b|led to|as a result|\beffect of\b/i,
  sequenceEvents: /order of events|sequence|happened (first|before|after)|chronolog/i,
  // Math
  slope: /\bslope\b|y-intercept|rate of change|starting value/i,
  solveX: /solve for|isolat(e|ing)|undo|both sides/i,
  systems: /system of|both equations|intersect|point where the lines/i,
  inequalities: /inequalit|greater than|less than|at least|at most|flip the (sign|symbol)/i,
  percents: /percent|%/i,
  ratios: /\bratio\b|proportion|unit rate|\bper\b/i,
  unitConversion: /convert|conversion|\bunits?\b/i,
  meanMedian: /\bmean\b|median|average/i,
  pythagorean: /pythagor|hypotenuse|a² \+ b²|right triangle/i,
  triangleAngles: /angles? (in|of) (a|the) triangle|180°|180 degrees|sum of the angles|straight line/i,
  factoring: /\bfactor/i,
  vertexForm: /vertex|parabola|maximum (value|height)|minimum value/i,
  exponentRules: /exponent rule|add the exponents|subtract the exponents|power of a power|\bexponents?\b/i,
  exponentialGrowth: /exponential|growth|decay|doubles|halves|multipl(y|ies|ied) by the same/i,
  functionNotation: /f\(|g\(|h\(|function notation|input|output/i,
  areaPerimeter: /\barea\b|perimeter/i,
  circleBasics: /\bcircle\b|radius|diameter|circumference|\bπ|\bpi\b/i,
  sohcahtoa: /\bsin\b|\bcos\b|\btan\b|sine|cosine|tangent|trig|soh ?cah ?toa/i,
  probabilityTable: /probabilit|two-way table|out of the|chance/i,
  // Science
  readingTable: /read(ing)? (the )?table|table values|read across|read down|row for|column for/i,
  trends: /\btrend|increases as|decreases as|as .{1,40} increases|as .{1,40} decreases|in[- ]between|extrapolat|interpolat/i,
  variables: /independent variable|dependent variable|what was (changed|measured)|the variable/i,
  controls: /control(led)? (variable|group)|held constant|kept the same|the control\b|no treatment/i,
  whyStep: /purpose of (a|the) (procedure|step)|why (the|they|she|he) .{1,40} (was|were|did)|the step/i,
  nextExperiment: /next experiment|new experiment|experimental design|to test whether|to find out whether|should (change|vary)/i,
  dataSupports: /support(ed)? by the data|claim with data|evaluat(e|ing) (a|the) claim|consistent with the (data|table)|the data (show|support)/i,
  conflictingScientists: /student [12]|scientist [12]|viewpoint|hypothes[ie]s|disagree/i,
  betterModel: /better (explanation|model)|explanation (fits|accounts)|best explains|which (explanation|model)/i,
};

function score(skill: BasicsSkill, label: string, explanation: string): number {
  const cue = CUES[skill.id];
  if (!cue) return 0;
  // A direct name match ("Semicolons", "Apostrophes") beats any cue.
  if (label.toLowerCase() === skill.name.toLowerCase()) return 10;
  let s = 0;
  if (cue.test(label)) s += 3;
  if (cue.test(explanation)) s += 1;
  return s;
}

/** The best-matching Basics skill for a missed question, or null when nothing in the drill fits. */
export function matchBasicsSkill(question: QuestionV2, drill: DrillDef): BasicsSkill | null {
  const candidates = basicsFor(drill);
  if (candidates.length === 0) return null;
  const label = question.skill ?? "";
  const explanation = question.explanation ?? "";
  let best: BasicsSkill | null = null;
  let bestScore = 0;
  for (const skill of candidates) {
    const s = score(skill, label, explanation);
    if (s > bestScore) {
      best = skill;
      bestScore = s;
    }
  }
  return best;
}
