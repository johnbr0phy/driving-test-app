import { TEST_CATALOG, TestCatalogEntry, haystack } from "./testCatalog";
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

/** A term matches at the start of a word; terms of 4+ letters may also match inside one ("theory" in "cartheory"). */
function termIn(term: string, text: string, textWords: string[]): boolean {
  if (term.length >= 4) return text.includes(term);
  return textWords.some((w) => w.startsWith(term));
}

const typoBudget = (term: string) => (term.length >= 7 ? 2 : term.length >= 4 ? 1 : 0);

/** How well one term matches a title: exact word 3, word prefix 2, substring 1. */
function titleScore(term: string, titleWords: string[], title: string): number {
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
}

let CANDIDATES: Candidate[] | null = null;
function candidates(): Candidate[] {
  if (!CANDIDATES) {
    CANDIDATES = TEST_CATALOG.map((test) => {
      const text = haystack(test);
      const title = `${test.shortName} ${test.name}`.toLowerCase();
      return { test, text, textWords: words(text), title, titleWords: words(title) };
    });
  }
  return CANDIDATES;
}

const dmv = () => TEST_CATALOG.find((t) => t.id === "dmv")!;

function testHit(test: TestCatalogEntry): SearchHit {
  return { key: test.id, test, title: test.name, subtitle: test.org, href: test.dashboardHref, region: regionOfTest(test.id) };
}

/** DMV states named in the query, e.g. "texas permit test" or "ny dmv". */
const DRIVING = /^(dmv|dps|mvd|bmv|rmv|permit|driving|driver|drivers|license|licence|learners?|written|knowledge|test|practice|exam|free|online|car|road|signs?|state)$/;

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

function stateHits(terms: string[]): SearchHit[] {
  const hits: SearchHit[] = [];
  for (const s of states) {
    const run = nameRun(terms, s.name.toLowerCase().split(" "));
    // Two-letter codes only count next to a driving word, so "ca" alone or "ma" in a word never fires.
    const code = s.code.toLowerCase();
    const byCode = terms.includes(code) && terms.some((t) => /^(dmv|permit|driving|driver|drivers|license|licence|learners?)$/.test(t));
    if (!run && !byCode) continue;
    // Only a driving search: "texas real estate" is not the Texas permit test.
    const rest = terms.filter((t, i) => !(run && i >= run[0] && i < run[0] + run[1]) && t !== code);
    if (rest.every((t) => DRIVING.test(t))) {
      hits.push({
        key: `dmv:${s.code}`,
        test: dmv(),
        title: `${s.name} ${s.dmvName === "DMV" ? "DMV" : `${s.dmvName}`} Permit Test`,
        subtitle: `${s.writtenTestQuestions} questions, ${s.passingScore}% to pass`,
        href: `/dmv/dashboard?state=${s.code}`,
        region: "US",
      });
    }
  }
  return hits.slice(0, 4);
}

/**
 * Search every test in every country. Ranking: how well the terms match the
 * test's name, then the visitor's own country, then worldwide tests, then
 * this week's popularity (`popularity`, test id to answers).
 */
export function searchAllTests(query: string, region: Region, popularity: Record<string, number> = {}): SearchResult {
  const q = normalizeQuery(query);
  const allTerms = words(q);
  if (allTerms.length === 0) return { hits: [], fuzzy: false };
  const specific = allTerms.filter((t) => !GENERIC.has(t));
  const terms = specific.length > 0 ? specific : allTerms;

  const regionRank = (r: TestRegion) => (r === region ? 0 : r === "GLOBAL" ? 1 : 2);
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
    const tests = rank(exact).filter((h) => !(stateMatches.length && h.key === "dmv"));
    return { hits: [...stateMatches, ...tests].slice(0, MAX_HITS), fuzzy: false };
  }

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

  // Several words and no test has them all ("cdl permit"): the tests with the most of them.
  const best = candidates()
    .map((c) => ({ c, score: terms.filter((t) => termIn(t, c.text, c.textWords)).length * 10 + terms.reduce((s, t) => s + titleScore(t, c.titleWords, c.title), 0) }))
    .filter((x) => x.score >= 10);
  const top = Math.max(0, ...best.map((x) => Math.floor(x.score / 10)));
  const partial = best.filter((x) => Math.floor(x.score / 10) === top);
  return { hits: rank(partial).slice(0, MAX_HITS), fuzzy: partial.length > 0, partial: true };
}
