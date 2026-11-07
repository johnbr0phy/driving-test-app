/**
 * Checks every mistake explainer that has a claim ledger in
 * tools/mistakes/claims/<id>.json against its saved sources
 * (tools/mistakes/sources/*.txt, verbatim text of official pages):
 *
 *   npx tsx scripts/check-mistake-claims.ts [ids...]
 *
 * It fails (exit 1) when:
 *  - the ledger's lines differ from the storyboard's (lib/mistakeExplainers),
 *  - the ledger's answer is not the bank's answer key,
 *  - a quote is not in its source, word for word,
 *  - a factual line has no quote, or uses a number or an absolute word
 *    (always, never, only...) that is in none of its quotes, or (unless the
 *    beat is marked "paraphrase") a content word that is in none of its
 *    quotes, the bank question or the generic word list. A paraphrase beat
 *    still needs its quotes; the adversarial review judges its meaning,
 *  - a hook is not one of the approved hooks, or a question line uses words
 *    the bank question does not,
 *  - a drawn label has no quote.
 * A medical explainer with no qualified human review is reported DRAFT:
 * it must not be linked from the site until review.human is filled in.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { mistakeExplainerById } from "../lib/mistakeExplainers";

const ROOT = join(__dirname, "..");
const CLAIMS = join(ROOT, "tools/mistakes/claims");
const SOURCES = join(ROOT, "tools/mistakes/sources");

/** Hooks are the only lines allowed no source; they must claim nothing. */
const APPROVED_HOOKS = ["Here's a tricky one.", "This one catches a lot of people.", "Lots of people miss this one."];
/** Words that carry no fact (framing, glue, the mnemonic's own words). */
const GENERIC = new Set(`
about after also answer around away back because before both catches come does easy ending first gives goes help helps here into just know learn list listed
look lots make many means mind miss more most much name names next other over people plain plainly remember says same should some still such than that their them then
there these they thing this those through tricky trick what when where which while with words word would your yours it's that's here's what's don't doesn't
again because said tell tells start starts started wrong puts under whole points sound alike section allows calls choice known from between
`.split(/\s+/).filter(Boolean));
const ABSOLUTE = ["always", "never", "only", "every", "none", "all", "guarantee", "guaranteed", "cure", "cures", "completely", "100"];

interface Claim { source: string; quote: string }
interface Beat { id: string; kind?: "hook" | "question"; say: string; claims?: Claim[]; paraphrase?: boolean }
interface Ledger {
  id: string; examId: string; questionId: string; bank: string;
  answer: { letter: string; text: string }; medical: boolean;
  sources: Record<string, string>; beats: Beat[];
  visuals: { label: string; source: string; quote: string }[];
  review: { ai: unknown[]; human: { name: string; credential: string; date: string } | null };
}

const norm = (s: string) => s
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/[‐-―−‑]/g, "-").replace(/\s+/g, " ").trim().toLowerCase();
const words = (s: string) => norm(s).replace(/'s\b/g, "").split(/[^a-z0-9']+/).filter(Boolean);
const has = (bag: Set<string>, w: string): boolean => bag.has(w) || (w.endsWith("s") && bag.has(w.slice(0, -1))) || bag.has(w + "s");

const ids = process.argv.slice(2);
const files = readdirSync(CLAIMS).filter((f) => f.endsWith(".json") && (!ids.length || ids.includes(f.replace(/\.json$/, ""))));
let failed = 0;
const sourceCache = new Map<string, string>();
const source = (f: string) => {
  if (!sourceCache.has(f)) sourceCache.set(f, norm(readFileSync(join(SOURCES, f), "utf8")));
  return sourceCache.get(f)!;
};

for (const f of files) {
  const L: Ledger = JSON.parse(readFileSync(join(CLAIMS, f), "utf8"));
  const errs: string[] = [];
  const ex = mistakeExplainerById(L.id);
  if (!ex) errs.push("no storyboard in lib/mistakeExplainers");
  else {
    if (ex.examId !== L.examId || ex.questionId !== L.questionId) errs.push("storyboard exam or question differs from the ledger");
    if (ex.beats.length !== L.beats.length) errs.push(`storyboard has ${ex.beats.length} beats, ledger ${L.beats.length}`);
    ex.beats.forEach((b, i) => {
      const lb = L.beats[i];
      if (!lb || lb.id !== b.id || lb.say !== b.say) errs.push(`beat ${b.id}: storyboard line differs from the ledger`);
    });
  }

  // the bank's own key
  const bankPath = join(ROOT, L.bank);
  const q = existsSync(bankPath) && (JSON.parse(readFileSync(bankPath, "utf8")) as Record<string, string>[]).find((x) => (x.questionId ?? x.id) === L.questionId);
  if (!q) errs.push(`question ${L.questionId} not in ${L.bank}`);
  else {
    if (q.correctAnswer !== L.answer.letter) errs.push(`bank key is ${q.correctAnswer}, ledger says ${L.answer.letter}`);
    if (norm(q["option" + L.answer.letter] ?? "") !== norm(L.answer.text)) errs.push(`bank option ${L.answer.letter} is "${q["option" + L.answer.letter]}", ledger says "${L.answer.text}"`);
  }
  const bankWords = new Set(q ? words([q.question, q.optionA, q.optionB, q.optionC, q.optionD].join(" ")) : []);
  const titles = new Set<string>();
  for (const [k, file] of Object.entries(L.sources)) {
    if (!existsSync(join(SOURCES, file))) { errs.push(`source ${k}: ${file} missing`); continue; }
    const head = readFileSync(join(SOURCES, file), "utf8").split("\n").slice(0, 3).join(" ");
    if (!/^URL: https:\/\//.test(head)) errs.push(`source ${k}: no URL header`);
    for (const w of words(head.replace(/^.*TITLE:/, ""))) titles.add(w);
  }
  const quoteOk = (c: Claim, where: string) => {
    const file = L.sources[c.source];
    if (!file) { errs.push(`${where}: unknown source "${c.source}"`); return false; }
    if (!existsSync(join(SOURCES, file))) return false;
    if (!source(file).includes(norm(c.quote))) { errs.push(`${where}: quote not found in ${file}: "${c.quote.slice(0, 90)}"`); return false; }
    return true;
  };

  for (const b of L.beats) {
    const where = `beat ${b.id}`;
    if (b.kind === "hook") {
      if (!APPROVED_HOOKS.includes(b.say)) errs.push(`${where}: hook is not an approved hook`);
      continue;
    }
    if (b.kind === "question") {
      for (const w of words(b.say)) {
        const bare = w.replace(/n't$/, "");
        if (w.length >= 4 && !has(bankWords, w) && !has(bankWords, bare) && !GENERIC.has(w)) errs.push(`${where}: "${w}" is not in the bank question`);
      }
      continue;
    }
    if (!b.claims?.length) { errs.push(`${where}: a factual line with no quote`); continue; }
    b.claims.forEach((c, i) => quoteOk(c, `${where} claim ${i + 1}`));
    const quoteWords = new Set(b.claims.flatMap((c) => words(c.quote)));
    const quoteText = b.claims.map((c) => norm(c.quote)).join(" ");
    for (const w of words(b.say)) {
      if (/^\d/.test(w) && !quoteText.includes(w)) errs.push(`${where}: the number "${w}" is in none of its quotes`);
      if (ABSOLUTE.includes(w) && !has(quoteWords, w)) errs.push(`${where}: absolute word "${w}" is in none of its quotes`);
      if (!b.paraphrase && w.length >= 4 && !/^\d/.test(w) && !has(quoteWords, w) && !quoteText.includes(w) && !has(bankWords, w) && !has(titles, w) && !has(GENERIC, w)) {
        errs.push(`${where}: "${w}" is in none of its quotes`);
      }
    }
  }
  L.visuals.forEach((v, i) => quoteOk(v, `visual ${i + 1} "${v.label}"`));

  const status = errs.length ? "FAIL" : L.medical && !L.review.human ? "DRAFT (needs qualified human review)" : "OK";
  console.log(`${L.id}: ${status}`);
  for (const e of errs) console.log(`  - ${e}`);
  if (errs.length) failed++;
}
process.exit(failed ? 1 : 0);
