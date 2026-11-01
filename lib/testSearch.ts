import { TEST_CATALOG, TestCatalogEntry, haystack } from "./testCatalog";
import { regionOfTest, Region, TestRegion } from "./region";
import { states } from "@/data/states";

// The search behind the Google-style homepage (/home-v2). Pure, so it runs on
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

const typoBudget = (term: string) => (term.length >= 7 ? 2 : term.length >= 4 ? 1 : 0);

/** How well one term matches a title: exact word 3, word prefix 2, substring 1. */
function titleScore(term: string, titleWords: string[], title: string): number {
  if (titleWords.includes(term)) return 3;
  if (titleWords.some((w) => w.startsWith(term))) return 2;
  return title.includes(term) ? 1 : 0;
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
function stateHits(terms: string[], q: string): SearchHit[] {
  const hits: SearchHit[] = [];
  for (const s of states) {
    const name = s.name.toLowerCase();
    const byName = q.includes(name) || (terms.length === 1 && name.startsWith(q) && q.length >= 3);
    // Two-letter codes only count next to a driving word, so "ca" alone or "ma" in a word never fires.
    const byCode = terms.includes(s.code.toLowerCase()) && terms.some((t) => /^(dmv|permit|driving|driver|drivers|license|licence|learners?)$/.test(t));
    if (byName || byCode) {
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
  return hits.slice(0, 3);
}

/**
 * Search every test in every country. Ranking: how well the terms match the
 * test's name, then the visitor's own country, then worldwide tests, then
 * this week's popularity (`popularity`, test id to answers).
 */
export function searchAllTests(query: string, region: Region, popularity: Record<string, number> = {}): SearchResult {
  const q = normalizeQuery(query);
  const terms = words(q);
  if (terms.length === 0) return { hits: [], fuzzy: false };

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

  const exact = candidates()
    .filter((c) => terms.every((t) => c.text.includes(t)))
    .map((c) => ({ c, score: terms.reduce((s, t) => s + titleScore(t, c.titleWords, c.title), 0) }));

  const stateMatches = stateHits(terms, q);
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
        if (c.text.includes(t)) score += 2;
        else if (budget > 0 && c.textWords.some((w) => editDistance(t, w, budget) <= budget)) score += 1;
        else return null;
      }
      return { c, score };
    })
    .filter((x): x is { c: Candidate; score: number } => x !== null);
  return { hits: rank(fuzzy).slice(0, MAX_HITS), fuzzy: fuzzy.length > 0 };
}
