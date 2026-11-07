import type { TigerExpression } from "@/lib/tigerAssets";

/**
 * Mistake explainers: a 40-second vertical video for one of a test's most
 * missed questions (Common Mistakes, lib/communityStats.ts), taught by that
 * test's tiger over an animated technical drawing. Each is a storyboard here
 * plus a scene in components/mistakes/scenes/, and its voice and word timings
 * in public/mistake-explainers/<id>.mp3 and .json (built by
 * scripts/build-mistake-explainer-audio.ts). Without the audio the player
 * runs on estimated timings, labelled "no sound".
 *
 * Every animation is a pure function of the clock, so the same scene plays in
 * the app and films frame by frame into an MP4 (scripts/film-mistake-explainers.mjs).
 */

export interface MistakeBeat {
  /** Scenes key their animation off beat ids. */
  id: string;
  /** Spoken and captioned, word for word. */
  say: string;
  /** The tiger's face while this beat plays (3 and 5 are swapped to talk). */
  face: TigerExpression;
}

export interface MistakeExplainer {
  id: string;
  /** "dmv" or the exam id that Common Mistakes keys by. */
  examId: string;
  questionId: string;
  /** Short title on the card and the video's top bar. */
  title: string;
  /** Test name shown on the top bar. */
  testName: string;
  /** The question as the bank asks it, shown at the top. */
  question: string;
  beats: MistakeBeat[];
  /**
   * A healthcare explainer: every line is tied to a quote from an official
   * source in tools/mistakes/claims/<id>.json (checked by
   * scripts/check-mistake-claims.ts), and it stays a draft, never linked from
   * the site, until a qualified person has reviewed it (review.human there).
   */
  medical?: boolean;
}

export const MISTAKE_EXPLAINERS: MistakeExplainer[] = [
  {
    id: "dmv-double-arrow",
    examId: "dmv",
    questionId: "U-019",
    title: "The double arrow sign",
    testName: "DMV permit test",
    question: "What does a double arrow sign mean?",
    beats: [
      { id: "hook", face: 8, say: "More than half of drivers miss this sign. Let's make sure you're not one of them." },
      { id: "question", face: 6, say: "What does a yellow diamond with two arrows mean?" },
      { id: "trap", face: 7, say: "Most people guess merging traffic, or two-way traffic. But those signs look different." },
      { id: "arrows", face: 4, say: "Look closely. Two separate arrows, one pointing down to the left, and one pointing down to the right." },
      { id: "island", face: 3, say: "You'll see this sign on the front of a traffic island, or a pillar, in the middle of the road. The arrows point to the two ways around it." },
      { id: "trick", face: 4, say: "The trick: think of a fork in the road. Left or right, both are fine." },
      { id: "lock", face: 2, say: "A double arrow means traffic may pass on either side of an obstruction." },
    ],
  },
  {
    id: "dmv-pennant",
    examId: "dmv",
    questionId: "U-012",
    title: "The pennant sign",
    testName: "DMV permit test",
    question: "What does a pennant-shaped sign indicate?",
    beats: [
      { id: "hook", face: 8, say: "More than half of drivers get this one wrong." },
      { id: "question", face: 6, say: "What does a pennant shaped sign mean?" },
      { id: "trap", face: 7, say: "It's yellow, so people guess school zone or merge. But the shape gives it away." },
      { id: "shape", face: 4, say: "A pennant is a long triangle lying on its side, pointing right. No other sign is allowed to use that shape." },
      { id: "road", face: 3, say: "It always goes on the left side of the road, the side you'd pull out to pass on. It marks where the no passing zone begins." },
      { id: "trick", face: 4, say: "The trick: it stands on the passing side and points across your path, like a finger saying: not here." },
      { id: "lock", face: 2, say: "A pennant means no passing zone. You've got it." },
    ],
  },
  {
    id: "part107-class-b",
    examId: "part107",
    questionId: "P107-AIR-010",
    title: "Reading 70 over 40",
    testName: "FAA Part 107",
    question: "A Class B segment is labeled 70 over 40. What do the numbers mean?",
    beats: [
      { id: "hook", face: 8, say: "Most people miss this chart question." },
      { id: "question", face: 6, say: "A Class B segment on a sectional is labeled seventy over forty. What does that mean?" },
      { id: "trap", face: 7, say: "People flip the numbers, or think they're measured from the ground. Neither." },
      { id: "cake", face: 4, say: "Picture Class B from the side. Some look like an upside down wedding cake, with higher shelves as you fly away from the airport." },
      { id: "shelf", face: 3, say: "Each shelf has a top and a bottom. The top number is the ceiling, and the bottom number is the floor." },
      { id: "zeros", face: 4, say: "Add two zeros. Seventy is seven thousand feet, forty is four thousand feet, and both are measured from mean sea level." },
      { id: "trick", face: 3, say: "The trick: read it like a room. Ceiling on top, floor underneath, and on Class B, both are measured from the sea, not the ground." },
      { id: "lock", face: 2, say: "So seventy over forty is seven thousand down to four thousand feet M S L. Nailed it." },
    ],
  },
  {
    id: "part107-metar",
    examId: "part107",
    questionId: "P107-WX-006",
    title: "19/12 A3002 in a METAR",
    testName: "FAA Part 107",
    question: "What do 19/12 A3002 at the end of a METAR report?",
    beats: [
      { id: "hook", face: 8, say: "Most people get this weather question wrong." },
      { id: "question", face: 6, say: "What do nineteen slash twelve, and A three zero zero two, mean at the end of a METAR?" },
      { id: "trap", face: 7, say: "They look like a date, or a visibility. They're not." },
      { id: "temps", face: 4, say: "Nineteen slash twelve is two temperatures in Celsius. The first is the air temperature. The second is the dew point." },
      { id: "dew", face: 3, say: "The dew point is the temperature the air would have to cool to before it's saturated. That's when fog and dew can form. It's never higher than the air temperature." },
      { id: "alt", face: 4, say: "A stands for altimeter. Put a decimal point after the first two digits, and A three zero zero two becomes thirty point zero two inches of mercury." },
      { id: "trick", face: 3, say: "The trick: the air temperature always comes first, and the dew point can't be higher, so the bigger number leads. A means altimeter." },
      { id: "lock", face: 2, say: "So: nineteen degrees, dew point twelve, altimeter thirty point zero two. Done." },
    ],
  },
  {
    id: "crcst-cdiff-spores",
    examId: "crcst",
    questionId: "SPD-DEC-005",
    title: "Spores and alcohol hand rub",
    testName: "CRCST exam",
    question: "Which healthcare pathogen forms spores that alcohol-based hand rubs do not reliably remove or kill?",
    medical: true,
    beats: [
      { id: "hook", face: 3, say: "Alcohol hand rub kills a lot of germs well. MRSA. Pseudomonas. It even kills hepatitis B." },
      { id: "turn", face: 7, say: "But there's one it can't count on. C. diff." },
      { id: "spore", face: 4, say: "C. diff is a rod that can form a spore inside itself: an inactive form that resists heat." },
      { id: "alcohol", face: 3, say: "And alcohol does very little against spores." },
      { id: "soap", face: 4, say: "Soap and water is different. Scrubbing and rinsing can help wash spores off your hands." },
      { id: "outbreak", face: 3, say: "In everyday care, the 2002 CDC guideline allows soap and water or alcohol rub after gloves. But in a C. diff outbreak, it calls soap and water the prudent choice." },
      { id: "lock", face: 2, say: "Alcohol can't reliably kill spores. The answer: C. diff, Clostridioides difficile." },
    ],
  },
  {
    id: "ccma-sa-node",
    examId: "ccma",
    questionId: "CCMA-ANP-005",
    title: "The heart's natural pacemaker",
    testName: "CCMA exam",
    question: "A patient asks what makes the heart beat on its own. Which structure normally acts as the heart's natural pacemaker?",
    medical: true,
    beats: [
      { id: "hook", face: 8, say: "Here's a tricky one." },
      { id: "question", face: 6, say: "Which structure normally acts as the heart's natural pacemaker?" },
      { id: "mixup", face: 7, say: "It's easy to mix up the SA node and the AV node. The names sound alike, and both are groups of pacemaker cells." },
      { id: "start", face: 4, say: "But the signal starts in the SA node, in the right atrium, and the SA node controls the rate and rhythm of your heartbeat." },
      { id: "travel", face: 3, say: "The signal travels through the atria, then down to the AV node, where it slows down slightly, allowing the ventricles time to finish filling with blood." },
      { id: "down", face: 4, say: "From the AV node, the bundle of His extends into the septum between the ventricles and conducts the impulses to them. Purkinje fibers make up the terminal portion of the conduction system." },
      { id: "pump", face: 3, say: "The ventricles contract and pump blood out of the heart, and the process starts all over again in the SA node." },
      { id: "trick", face: 4, say: "The trick: S for start. The heartbeat starts in the SA node, the pacemaker of the heart." },
      { id: "lock", face: 2, say: "Normally, the heart's natural pacemaker is the sinoatrial node, the SA node." },
    ],
  },
  {
    id: "ptcb-gliptin",
    examId: "ptcb",
    questionId: "PTCB-MED-010",
    title: "Januvia: which drug class?",
    testName: "PTCB exam",
    question: "Januvia (sitagliptin), taken once daily for type 2 diabetes, belongs to which drug class?",
    medical: true,
    beats: [
      { id: "hook", face: 8, say: "Here's a tricky one." },
      { id: "question", face: 6, say: "Januvia, or sitagliptin: which drug class is it?" },
      { id: "ending", face: 4, say: "Look at the ending of sitagliptin. The whole ending, gliptin, not just gli." },
      { id: "stem", face: 3, say: "The World Health Organization's list of name stems puts sitagliptin under gliptin. A stem points to the related group a drug belongs to." },
      { id: "label", face: 4, say: "And Januvia's FDA label says it plainly: Januvia is a dipeptidyl peptidase-4, or DPP-4, inhibitor." },
      { id: "others", face: 3, say: "Two more endings help with the wrong answers. Gliflozin drugs are sodium glucose co-transporter inhibitors, and Jardiance, which contains empagliflozin, is an SGLT2 inhibitor. Glitazone drugs are thiazolidinedione derivatives." },
      { id: "lock", face: 2, say: "So: Januvia, sitagliptin, is a DPP-4 inhibitor." },
    ],
  },
];

export function mistakeExplainerFor(examId: string, questionId: string): MistakeExplainer | undefined {
  return MISTAKE_EXPLAINERS.find((e) => e.examId === examId && e.questionId === questionId);
}

export function mistakeExplainerById(id: string): MistakeExplainer | undefined {
  return MISTAKE_EXPLAINERS.find((e) => e.id === id);
}

export const mistakeAudioUrl = (id: string) => `/mistake-explainers/${id}.mp3`;
export const mistakeManifestUrl = (id: string) => `/mistake-explainers/${id}.json`;

// ---- timing --------------------------------------------------------------

export interface TimedWord { w: string; start: number; end: number }
export interface BeatTiming { id: string; start: number; end: number; words: TimedWord[] }
export interface MistakeManifest { id: string; duration: number; beats: BeatTiming[] }

/** Written words of a line, as the captions show them. */
export function captionWords(say: string): string[] {
  return say.split(/\s+/).filter(Boolean);
}

/** Lead-in before the first word, and the hold after the last. */
export const LEAD_IN = 0.6;
export const HOLD_OUT = 2.2;

/** Silent timings: about 2.6 words a second, a pause between beats. */
export function estimateTimings(ex: MistakeExplainer): MistakeManifest {
  let t = LEAD_IN;
  const beats = ex.beats.map((b) => {
    const start = t;
    const words = captionWords(b.say).map((w) => {
      const d = 0.24 + w.length * 0.035 + (/[.,:?!]$/.test(w) ? 0.25 : 0);
      const tw = { w, start: t, end: t + d };
      t += d;
      return tw;
    });
    t += 0.5;
    return { id: b.id, start, end: t, words };
  });
  return { id: ex.id, duration: t + HOLD_OUT, beats };
}

/** Does a manifest still match the storyboard (so stale audio never drives the wrong words)? */
export function manifestMatches(ex: MistakeExplainer, m: MistakeManifest | null | undefined): m is MistakeManifest {
  return !!m && m.beats.length === ex.beats.length &&
    m.beats.every((b, i) => b.id === ex.beats[i].id && b.words.length === captionWords(ex.beats[i].say).length);
}

/** 0..1 progress of an animation that starts at `start` and lasts `dur` seconds, eased. */
export function ramp(t: number, start: number, dur = 0.8): number {
  const x = Math.min(1, Math.max(0, (t - start) / dur));
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
