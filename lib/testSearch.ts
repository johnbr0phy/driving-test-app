import { TEST_CATALOG, TestCatalogEntry, haystack, searchAliases } from "./testCatalog";
import { EXAM_VARIANTS } from "./exams";
import { regionOfTest, Region, TestRegion } from "./region";
import { states } from "@/data/states";

// The search behind the Google-style homepage (/, SearchHome). Pure, so it runs on
// the client on every keystroke. A result is either a catalog test or a DMV
// state ("california dmv" goes straight to that state's DMV dashboard).

export interface SearchHit {
  /** Stable key, the test id or `dmv:CA`. */
  key: string;
  test: TestCatalogEntry;
  title: string;
  subtitle: string;
  /** Where a tap goes: the dashboard, so the visitor starts at once. */
  href: string;
  region: TestRegion;
}

export interface SearchResult {
  hits: SearchHit[];
  /** True when nothing matched exactly and the hits come from typo matching. */
  fuzzy: boolean;
  /** True when no test matched every word: the hits are only near misses, so the search counts as not found. */
  partial?: boolean;
}

const MAX_HITS = 8;

/** Normalise a query the same way for matching and for tracking. */
export function normalizeQuery(q: string): string {
  return q.toLowerCase().replace(/[^\p{L}\p{N}+#&.' -]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

const words = (s: string) => s.split(/[^\p{L}\p{N}+]+/u).filter(Boolean);

/** Edit distance, capped: returns max+1 as soon as it is exceeded. */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// Words nearly every test has in its name or blurb. Dropped from a query when
// it has other words, so "sat practice test" searches for "sat".
const GENERIC = new Set(["practice", "test", "tests", "exam", "exams", "mock", "free", "quiz", "questions", "question", "prep", "online", "sample", "paper", "papers", "2026", "2027"]);

// Spellings and plurals of one word, so "maths" (UK) finds the SAT's "math",
// "licence" finds "license" and the reverse. Applied to every query term.
const SYNONYMS: Record<string, string> = {
  maths: "math", mathematics: "math", mathematical: "math", sciences: "science",
  licence: "license", licences: "license", licenses: "license", defence: "defense",
  practise: "practice", programme: "program", programmes: "program",
  drivers: "driver", learners: "learner", nurses: "nurse", teachers: "teacher", electricians: "electrician",
  plumbers: "plumber", welders: "welder", carpenters: "carpenter", firefighters: "firefighter", guards: "guard", banks: "bank",
};

/**
 * One key for every way of typing the same search, for grouping them in
 * /admin: generic words dropped, spellings folded, words sorted. "CNA
 * practice test", "cna exam" and "exam cna" are all "cna".
 */
export function searchIntentKey(query: string): string {
  const all = words(normalizeQuery(query).replace(/'s\b/g, "")).map((t) => SYNONYMS[t] ?? t);
  const specific = all.filter((t) => !GENERIC.has(t));
  return [...new Set(specific.length > 0 ? specific : all)].sort().join(" ");
}

/** Other spellings a term also matches in a test's text ("license" matches "licence"). */
const FORMS: Record<string, string[]> = { license: ["license", "licence"], defense: ["defense", "defence"] };

// Topic words: a subject, a field or a kind of test that many countries have.
// A query made only of these (plus generic words) is a topic search ("maths",
// "driving test", "police exam"), not a test's name, so tests about the topic
// come first and, among them, the visitor's own country leads instead of
// whichever country's test happens to have the word in its name.
const TOPICS = new Set([
  // school subjects
  "math", "english", "science", "reading", "writing", "grammar", "spelling", "vocabulary", "biology", "chemistry", "physics",
  "history", "geography", "algebra", "geometry", "calculus", "arithmetic", "statistics", "numeracy", "literacy", "economics",
  // school and admissions
  "school", "primary", "secondary", "high", "kids", "children", "entrance", "admission", "admissions", "college", "university", "scholarship", "grade",
  // driving
  "driving", "driver", "license", "permit", "learner", "theory", "road", "signs", "motorcycle", "motorbike",
  // civic, public service, jobs
  "citizenship", "civics", "police", "constable", "security", "guard", "army", "military", "defense", "navy", "bank", "banking",
  "clerk", "government", "civil", "service", "railway", "recruitment", "job", "jobs",
  // health and care
  "nursing", "nurse", "medical", "health", "healthcare", "pharmacy", "first", "aid", "care", "carer",
  // trades and work
  "electrician", "electrical", "plumber", "plumbing", "carpenter", "carpentry", "welder", "welding", "forklift", "construction",
  "safety", "food", "hygiene", "handler", "alcohol", "fire", "firefighter", "trade", "trades", "apprenticeship",
  "teacher", "teaching", "insurance", "real", "estate", "computer", "programming", "cloud",
]);

/** A term matches at the start of a word; terms of 4+ letters may also match inside one ("theory" in "cartheory"). */
function termIn(term: string, text: string, textWords: string[]): boolean {
  return (FORMS[term] ?? [term]).some((f) => (f.length >= 4 ? text.includes(f) : textWords.some((w) => w.startsWith(f))));
}

const typoBudget = (term: string) => (term.length >= 7 ? 2 : term.length >= 4 ? 1 : 0);

/** How well one term matches a title: exact word 3, word prefix 2, substring 1. */
function titleScore(term: string, titleWords: string[], title: string): number {
  return Math.max(...(FORMS[term] ?? [term]).map((f) => titleScoreOne(f, titleWords, title)));
}

function titleScoreOne(term: string, titleWords: string[], title: string): number {
  if (titleWords.includes(term)) return 3;
  if (titleWords.some((w) => w.startsWith(term))) return 2;
  // Short terms only count at a word start, so "act" never matches "practice".
  return term.length >= 4 && title.includes(term) ? 1 : 0;
}

interface Candidate {
  test: TestCatalogEntry;
  text: string;
  textWords: string[];
  title: string;
  titleWords: string[];
  /** Title plus search aliases: where a test says what it is about, not just mentions it. */
  topic: string;
  topicWords: string[];
}

let CANDIDATES: Candidate[] | null = null;
function candidates(): Candidate[] {
  if (!CANDIDATES) {
    CANDIDATES = TEST_CATALOG.map((test) => {
      const text = haystack(test);
      const title = `${test.shortName} ${test.name}`.toLowerCase();
      const topic = `${title} ${searchAliases(test.id)}`.toLowerCase();
      return { test, text, textWords: words(text), title, titleWords: words(title), topic, topicWords: words(topic) };
    });
  }
  return CANDIDATES;
}

const dmv = () => TEST_CATALOG.find((t) => t.id === "dmv")!;

function testHit(test: TestCatalogEntry): SearchHit {
  return { key: test.id, test, title: test.name, subtitle: test.org, href: test.dashboardHref, region: regionOfTest(test.id) };
}

/** DMV states named in the query, e.g. "texas permit test" or "ny dmv". */
const DRIVING = /^(dmv|dps|mvd|bmv|rmv|permit|driving|driver|drivers|license|licence|learners?|written|knowledge|test|practice|exam|free|online|car|road|signs?|state|city)$/;
const DRIVING_WORD = /^(dmv|dps|mvd|bmv|rmv|permit|driving|driver|drivers|license|licence|learners?)$/;

/** Short names people type for a state, beyond its two-letter code. */
const STATE_ALIASES: Record<string, string> = { nyc: "ny", nys: "ny", socal: "ca", norcal: "ca" };

/**
 * Where a state's name sits in the query, as [first term, terms used], or null.
 * Words match in order; the last one may be half typed when it ends the query
 * ("new y", "north car", "calif"), so search-as-you-type finds the state early.
 */
function nameRun(terms: string[], nameWords: string[]): [number, number] | null {
  for (let i = 0; i < terms.length; i++) {
    let k = 0;
    while (k < nameWords.length && i + k < terms.length && terms[i + k] === nameWords[k]) k++;
    if (k === nameWords.length) return [i, k];
    // The query ends after whole words of the name ("new", "north"): the rest is still to come.
    if (k > 0 && i + k === terms.length && terms.slice(i, i + k).join(" ").length >= 3) return [i, k];
    const last = i + k === terms.length - 1;
    if (last && k < nameWords.length && nameWords[k].startsWith(terms[i + k])) {
      const typed = terms.slice(i, i + k + 1).join(" ");
      if (typed.length >= 3) return [i, k + 1];
    }
  }
  return null;
}

interface StateHit {
  hit: SearchHit;
  /** Found only by a bare code ("ny", "az") with no driving word, so a test literally named that ranks first. */
  bareCode: boolean;
}

function stateHits(rawTerms: string[]): StateHit[] {
  const terms = rawTerms.map((t) => STATE_ALIASES[t] ?? t);
  const drivingWord = terms.some((t) => DRIVING_WORD.test(t));
  const hits: StateHit[] = [];
  for (const s of states) {
    const run = nameRun(terms, s.name.toLowerCase().split(" "));
    // A code ("ny", "nyc", "ca") counts as a whole word on its own or with driving words.
    const code = s.code.toLowerCase();
    const byCode = terms.includes(code);
    if (!run && !byCode) continue;
    // Only a driving search: "texas real estate" or "ny real estate" is not the permit test.
    const rest = terms.filter((t, i) => !(run && i >= run[0] && i < run[0] + run[1]) && t !== code);
    if (rest.every((t) => DRIVING.test(t))) {
      hits.push({
        hit: {
          key: `dmv:${s.code}`,
          test: dmv(),
          title: `${s.name} ${s.dmvName === "DMV" ? "DMV" : `${s.dmvName}`} Permit Test`,
          subtitle: `${s.writtenTestQuestions} questions, ${s.passingScore}% to pass`,
          href: `/dmv/dashboard?state=${s.code}`,
          region: "US",
        },
        bareCode: !run && !drivingWord,
      });
    }
  }
  return hits.slice(0, 4);
}

// Words a state's driving search needs, for catching one-letter slips ("dmc", "teat").
const DRIVING_TYPO_TARGETS = ["dmv", "test", "exam", "permit", "license", "licence", "driving", "driver", "practice"];

/**
 * Fix a one-letter slip in a driving word when the query also names a state:
 * "california dmc", "ca dmv teat". Words any test uses, and words of a state's
 * name ("west"), are left alone, so a real word is never rewritten. Returns the
 * corrected query, or null when there is nothing to correct.
 */
function correctDrivingTypos(terms: string[]): string | null {
  const known = new Set(candidates().flatMap((c) => c.textWords));
  const stateWords = new Set(states.flatMap((s) => s.name.toLowerCase().split(" ")));
  const fixed = terms.map((t) => {
    if (t.length < 3 || known.has(t) || stateWords.has(t) || DRIVING.test(t) || GENERIC.has(t)) return t;
    return DRIVING_TYPO_TARGETS.find((w) => editDistance(t, w, 1) <= 1) ?? t;
  });
  if (fixed.every((t, i) => t === terms[i]) || stateHits(fixed).length === 0) return null;
  return fixed.join(" ");
}

// Families sold by state. Each test's state versions live outside the catalog
// (EXAM_VARIANTS), so a search has to name them to reach them.
const STATE_FAMILIES: { id: string; pattern: RegExp }[] = [
  { id: "realestate", pattern: /\breal ?est\w*|\brealtor\b/ },
  { id: "insurance", pattern: /\binsurance\b|\blife (and |& )?health\b/ },
  { id: "pnc", pattern: /\bproperty\b.*\bcasualty\b|\bp ?& ?c\b|\bcasualty\b|\binsurance\b/ },
];

/** Which state-sold families the query is about, however long the sentence around it. */
function familiesIn(q: string): TestCatalogEntry[] {
  // "insurance" alone means both lines; "life" or "home" picks one.
  const line = /\b(life|health)\b/.test(q) ? "insurance" : /\b(property|casualty|p ?& ?c|auto|home)\b/.test(q) ? "pnc" : null;
  return STATE_FAMILIES.filter((f) => f.pattern.test(q) && (!line || f.id === line || f.id === "realestate"))
    .map((f) => TEST_CATALOG.find((t) => t.id === f.id))
    .filter((t): t is TestCatalogEntry => Boolean(t));
}

/**
 * The state a family search names. Full names match anywhere, longest first
 * ("west virginia" before "virginia"). A two-letter code only counts when it is
 * all that is left of the query, since "in", "or" and "me" are ordinary words.
 */
function familyState(q: string, family: RegExp): { code: string; name: string } | null {
  const named = [...states]
    .sort((a, b) => b.name.length - a.name.length)
    .find((s) => new RegExp(`\\b${s.name.toLowerCase()}\\b`).test(q));
  if (named) return { code: named.code, name: named.name };
  const rest = words(q.replace(family, " ")).filter((t) => !GENERIC.has(t) && !/^(life|health|insurance|property|casualty|and|p|c)$/.test(t));
  // "real estate in" is someone still typing, not Indiana.
  if (rest.length !== 1 || rest[0].length !== 2 || rest[0] === "in") return null;
  const coded = states.find((s) => s.code.toLowerCase() === rest[0]);
  return coded ? { code: coded.code, name: coded.name } : null;
}

/** "louisiana real estate" opens that state's version; a state we lack still reaches the national test. */
function familySearch(q: string, families: TestCatalogEntry[]): SearchResult | null {
  const pattern = new RegExp(STATE_FAMILIES.filter((f) => families.some((t) => t.id === f.id)).map((f) => f.pattern.source).join("|"), "g");
  const state = familyState(q, pattern);
  if (!state) return null;
  const hits: SearchHit[] = families.flatMap((test) => {
    const version = EXAM_VARIANTS.find((v) => v.variantOf === test.id && v.jurisdiction?.code === state.code);
    return version
      ? [{ key: version.id, test, title: version.name, subtitle: test.org, href: `${version.slug}/dashboard`, region: regionOfTest(test.id) }]
      : [];
  });
  if (hits.length > 0) return { hits, fuzzy: false };
  return { hits: families.map(testHit), fuzzy: true, partial: true };
}

/**
 * Search every test in every country. Ranking: how well the terms match the
 * test's name, then the visitor's own country, then worldwide tests, then
 * this week's popularity (`popularity`, test id to answers).
 */
export function searchAllTests(query: string, region: Region, popularity: Record<string, number> = {}): SearchResult {
  // "realestate" is how people type it; every test writes "real estate".
  const q = normalizeQuery(query).replace(/\brealestate\b/g, "real estate");
  const allTerms = words(q.replace(/'s\b/g, "")).map((t) => SYNONYMS[t] ?? t);
  if (allTerms.length === 0) return { hits: [], fuzzy: false };
  const specific = allTerms.filter((t) => !GENERIC.has(t));
  const terms = specific.length > 0 ? specific : allTerms;

  const families = familiesIn(q);
  if (families.length > 0) {
    const found = familySearch(q, families);
    if (found) return found;
  }

  const regionRank = (r: TestRegion) => (r === region ? 0 : r === "GLOBAL" ? 1 : 2);

  // A topic search: tests about the topic first (the words in their name or
  // aliases, most words first), the visitor's country first among those,
  // then this week's popularity; tests that only mention it come last.
  if (terms.every((t) => TOPICS.has(t))) {
    const about = (c: Candidate) => terms.filter((t) => termIn(t, c.topic, c.topicWords)).length;
    const hits = candidates()
      .filter((c) => terms.every((t) => termIn(t, c.text, c.textWords)))
      .sort(
        (a, b) =>
          about(b) - about(a) ||
          regionRank(regionOfTest(a.test.id)) - regionRank(regionOfTest(b.test.id)) ||
          (popularity[b.test.id] ?? 0) - (popularity[a.test.id] ?? 0),
      )
      .map((c) => testHit(c.test));
    if (hits.length > 0) return { hits: hits.slice(0, MAX_HITS), fuzzy: false };
  }
  const rank = (list: { c: Candidate; score: number }[]) =>
    list
      .sort(
        (a, b) =>
          b.score - a.score ||
          regionRank(regionOfTest(a.c.test.id)) - regionRank(regionOfTest(b.c.test.id)) ||
          (popularity[b.c.test.id] ?? 0) - (popularity[a.c.test.id] ?? 0),
      )
      .map((x) => testHit(x.c.test));

  let exact = candidates()
    .filter((c) => terms.every((t) => termIn(t, c.text, c.textWords)))
    .map((c) => ({ c, score: terms.reduce((s, t) => s + titleScore(t, c.titleWords, c.title), 0) }));
  // When several tests have the words in their name, one that only has them in
  // its blurb is noise; with only a few name matches, blurb matches still help
  // ("nursing" finds NCLEX, "citizenship" finds Life in the UK).
  // A short term is usually an acronym (SAT, ACT, CNA): any name match beats the blurbs.
  const nameHits = exact.filter((x) => x.score > 0).length;
  const acronym = terms.some((t) => t.length <= 3);
  if (nameHits >= 4 || (acronym && nameHits > 0)) exact = exact.filter((x) => x.score > 0);

  const stateMatches = stateHits(allTerms);
  if (exact.length > 0 || stateMatches.length > 0) {
    const drop = (h: SearchHit) => !(stateMatches.length && h.key === "dmv");
    // A bare code goes first unless a test is literally named it ("az" is also AZ-900).
    const named = exact.filter((x) => x.score >= 3 * terms.length);
    const lead = stateMatches.some((m) => m.bareCode) ? rank(named).filter(drop) : [];
    const leadKeys = new Set(lead.map((h) => h.key));
    const tests = rank(exact).filter((h) => drop(h) && !leadKeys.has(h.key));
    return { hits: [...lead, ...stateMatches.map((m) => m.hit), ...tests].slice(0, MAX_HITS), fuzzy: false };
  }

  // "california dmc": a slip in a driving word next to a state.
  const corrected = correctDrivingTypos(allTerms);
  if (corrected) return { ...searchAllTests(corrected, region, popularity), fuzzy: true };

  // Nothing exact: allow a typo or two per word ("cdl permitt", "nclx").
  const fuzzy = candidates()
    .map((c) => {
      let score = 0;
      for (const t of terms) {
        const budget = typoBudget(t);
        if (termIn(t, c.text, c.textWords)) score += 2;
        else if (budget > 0 && c.textWords.some((w) => editDistance(t, w, budget) <= budget)) score += 1;
        else return null;
      }
      return { c, score };
    })
    .filter((x): x is { c: Candidate; score: number } => x !== null);
  if (fuzzy.length > 0 || terms.length < 2) return { hits: rank(fuzzy).slice(0, MAX_HITS), fuzzy: fuzzy.length > 0 };

  // A whole sentence about a state-sold test ("i am taking my real estate exam, how do i..."): that test.
  if (families.length > 0) return { hits: families.map(testHit), fuzzy: true };

  // Several words and no test has them all ("cdl permit"): the tests with the most of them.
  const best = candidates()
    .map((c) => ({ c, score: terms.filter((t) => termIn(t, c.text, c.textWords)).length * 10 + terms.reduce((s, t) => s + titleScore(t, c.titleWords, c.title), 0) }))
    .filter((x) => x.score >= 10);
  const top = Math.max(0, ...best.map((x) => Math.floor(x.score / 10)));
  const partial = best.filter((x) => Math.floor(x.score / 10) === top);
  return { hits: rank(partial).slice(0, MAX_HITS), fuzzy: partial.length > 0, partial: true };
}
