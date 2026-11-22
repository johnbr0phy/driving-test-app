/**
 * AI answer check (docs/claude/seo.md, "AI answer check").
 *
 * Three times a week scripts/ai-answers.ts asks Claude, with web search, the
 * questions a person asks before picking a practice test site, and records
 * whether the answer names Tigertest, cites a tigertest.io page, or had one in
 * its search results, plus which sites it cited instead. This measures whether
 * GEO work (ExamFacts, llms.txt, IndexNow) changes what AI answers say.
 *
 * Pure functions only, so tests load this without Firebase or the SDK.
 */

export const AI_ANSWERS_JOB = 'ai-answers';
export const AI_ANSWERS_MODEL = 'claude-sonnet-5-5';
/** Searches allowed per question; each costs $0.01 and pulls in result text. */
export const AI_ANSWERS_MAX_SEARCHES = 2;

export interface AiQuestion {
  id: string;
  /** Exam family, for grouping in the report. */
  family: string;
  /** Asked word for word, the way a person types it. Never names Tigertest. */
  text: string;
  /** Our page that should be the answer, for the report. */
  path: string;
}

export const AI_QUESTIONS: readonly AiQuestion[] = [
  { id: 'dmv-ca', family: 'DMV', text: "What's the best free practice test for the California DMV permit test?", path: '/california-dmv-practice-test' },
  { id: 'dmv-tx', family: 'DMV', text: 'Where can I get free Texas permit test practice questions?', path: '/texas-dmv-practice-test' },
  { id: 'dmv-fl', family: 'DMV', text: "Where can I take a free Florida learner's permit practice test?", path: '/florida-dmv-practice-test' },
  { id: 'dmv-ny', family: 'DMV', text: 'Best free NY permit practice test online?', path: '/new-york-dmv-practice-test' },
  { id: 'dmv-any', family: 'DMV', text: 'What are the best websites to practice for the DMV written test?', path: '/dmv-practice-test' },
  { id: 'motorcycle', family: 'DMV', text: 'Free motorcycle permit practice test recommendations?', path: '/motorcycle-practice-test' },
  { id: 'cdl', family: 'CDL', text: 'What is the best free CDL general knowledge practice test?', path: '/cdl-practice-test' },
  { id: 'cdl-hazmat', family: 'CDL', text: 'Where can I practice for the CDL hazmat endorsement test for free?', path: '/cdl-endorsement-practice-test' },
  { id: 'teas', family: 'Healthcare', text: "What's the best free TEAS 7 practice test?", path: '/teas-practice-test' },
  { id: 'hesi', family: 'Healthcare', text: 'Any good free HESI A2 practice tests?', path: '/hesi-a2-practice-test' },
  { id: 'nclex-rn', family: 'Healthcare', text: 'Best free NCLEX-RN practice questions website?', path: '/nclex-rn-practice-test' },
  { id: 'cna', family: 'Healthcare', text: 'Where can I find a free CNA practice test?', path: '/cna-practice-test' },
  { id: 'ptcb', family: 'Healthcare', text: 'Is there a free PTCB pharmacy technician practice exam?', path: '/ptcb-practice-test' },
  { id: 'emt', family: 'Healthcare', text: 'Best free NREMT EMT practice test?', path: '/emt-practice-test' },
  { id: 'asvab', family: 'Military and civics', text: 'What is the best free ASVAB practice test online?', path: '/asvab-practice-test' },
  { id: 'civics', family: 'Military and civics', text: "What's the best way to practice the US citizenship civics test for free?", path: '/citizenship-test' },
  { id: 'ged', family: 'School', text: "Is there a free GED practice test that's actually good?", path: '/ged-practice-test' },
  { id: 'sat', family: 'School', text: 'Where can I take free SAT practice questions online?', path: '/sat-practice-test' },
  { id: 'real-estate', family: 'Licensing', text: 'Free real estate license exam practice test recommendations?', path: '/real-estate-practice-test' },
  { id: 'security-plus', family: 'Licensing', text: 'Best free CompTIA Security+ practice test?', path: '/comptia-security-plus-practice-test' },
  { id: 'uk-theory', family: 'International', text: 'Best free UK driving theory test practice site?', path: '/uk-driving-theory-test' },
  { id: 'ontario-g1', family: 'International', text: 'Where can I do a free Ontario G1 practice test?', path: '/ontario-g1-practice-test' },
  { id: 'nsw-dkt', family: 'International', text: 'Free NSW driver knowledge test practice?', path: '/nsw-dkt-practice-test' },
  { id: 'ielts-reading', family: 'International', text: 'Free IELTS reading practice test online?', path: '/ielts-reading-practice-test' },
  { id: 'many-exams', family: 'General', text: 'Is there a free website with practice tests for lots of different exams, like permit tests, nursing and certifications?', path: '/' },
];

export interface AiAnswerResult {
  id: string;
  family: string;
  /** The answer names Tigertest. */
  mentioned: boolean;
  /** The answer cites a tigertest.io page. */
  cited: boolean;
  /** A tigertest.io page was in the search results, whether or not the answer used it. */
  inResults: boolean;
  /** Where tigertest.io falls among the sites the answer cites, 1-based; 0 when not cited. */
  rank: number;
  /** tigertest.io paths the answer cited or the search returned. */
  ourPaths: string[];
  /** Hosts the answer cited, in the order it first cited them. */
  citedHosts: string[];
  searches: number;
  costUsd: number;
  /** The first 600 characters of the answer, for the report. */
  excerpt: string;
  error?: string;
}

const OUR_HOST = /(^|\.)tigertest\.io$/i;
const NAME = /tiger\s?test/i;

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function path(url: string): string {
  try {
    return new URL(url).pathname.replace(/\/+$/, '') || '/';
  } catch {
    return '';
  }
}

type Block = Record<string, unknown> & { type?: string };

/**
 * Reads one answer's content blocks (Messages API shape: text blocks with
 * citations, web_search_tool_result blocks with result lists).
 */
export function analyzeAnswer(content: readonly Block[]): Omit<AiAnswerResult, 'id' | 'family' | 'costUsd' | 'error'> {
  const text: string[] = [];
  const citedHosts: string[] = [];
  const ourPaths = new Set<string>();
  let inResults = false;
  let searches = 0;
  for (const block of content) {
    if (block.type === 'text' && typeof block.text === 'string') {
      text.push(block.text);
      for (const c of (Array.isArray(block.citations) ? block.citations : []) as Block[]) {
        const url = typeof c.url === 'string' ? c.url : '';
        const h = host(url);
        if (!h) continue;
        if (!citedHosts.includes(h)) citedHosts.push(h);
        if (OUR_HOST.test(h)) ourPaths.add(path(url));
      }
    } else if (block.type === 'server_tool_use' && block.name === 'web_search') {
      searches++;
    } else if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
      for (const r of block.content as Block[]) {
        const url = typeof r.url === 'string' ? r.url : '';
        if (OUR_HOST.test(host(url))) {
          inResults = true;
          ourPaths.add(path(url));
        }
      }
    }
  }
  const answer = text.join('').trim();
  const ourIndex = citedHosts.findIndex((h) => OUR_HOST.test(h));
  return {
    mentioned: NAME.test(answer),
    cited: ourIndex >= 0,
    inResults,
    rank: ourIndex + 1,
    ourPaths: [...ourPaths].sort(),
    citedHosts,
    searches,
    excerpt: answer.slice(0, 600),
  };
}

export interface AiAnswerSummary {
  asked: number;
  answered: number;
  mentioned: number;
  cited: number;
  inResults: number;
  costUsd: number;
  /** Hosts cited most often across the run, with how many answers cited each. */
  topHosts: { host: string; answers: number }[];
  byFamily: Record<string, { asked: number; mentioned: number; cited: number }>;
}

export function summarize(results: readonly AiAnswerResult[]): AiAnswerSummary {
  const answered = results.filter((r) => !r.error);
  const hostCounts = new Map<string, number>();
  const byFamily: AiAnswerSummary['byFamily'] = {};
  for (const r of results) {
    const f = (byFamily[r.family] ??= { asked: 0, mentioned: 0, cited: 0 });
    f.asked++;
    if (r.mentioned) f.mentioned++;
    if (r.cited) f.cited++;
    for (const h of r.citedHosts) hostCounts.set(h, (hostCounts.get(h) ?? 0) + 1);
  }
  return {
    asked: results.length,
    answered: answered.length,
    mentioned: answered.filter((r) => r.mentioned).length,
    cited: answered.filter((r) => r.cited).length,
    inResults: answered.filter((r) => r.inResults).length,
    costUsd: Math.round(results.reduce((s, r) => s + r.costUsd, 0) * 10000) / 10000,
    topHosts: [...hostCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 15)
      .map(([h, answers]) => ({ host: h, answers })),
    byFamily,
  };
}
