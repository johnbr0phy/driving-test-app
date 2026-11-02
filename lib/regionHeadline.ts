import { TEST_GROUPS, type TestCatalogEntry } from "@/lib/testCatalog";
import { REGIONS, regionInfo, regionOfTest, type Region } from "@/lib/region";

// The h1 and lead of an English country homepage (/uk, /in, /ng...), built
// from the catalog so they stay right as tests are added: the h1 names the
// country and its two biggest kinds of test, the lead its main tests.

/** A hub group's title as a topic word: "UK school tests" -> "school". */
function topicOf(title: string): string {
  let t = title;
  for (const r of REGIONS) t = t.replace(new RegExp(`^(${r.name}|${r.short}|${r.inName.replace(/^the /, "")})\\s`), "");
  t = t.replace(/\s(tests|exams)$/i, "").trim();
  if (/driving|learner/i.test(t)) return "driving";
  const SHORT: Record<string, string> = {
    "workplace and trade certificates": "trade certificates",
    "trades and workplace certificates": "trade certificates",
    "work certificates": "work certificates",
    "healthcare and first aid": "healthcare",
    "government job": "government jobs",
    "government and licensure": "civil service",
    "international nurse licensing": "nurse licensing",
    "outdoor & recreation licenses": "boating",
  };
  const lower = t.charAt(0).toLowerCase() + t.slice(1);
  return SHORT[lower.toLowerCase()] ?? lower;
}

/** "UPSC Prelims Practice Test" -> "UPSC Prelims", "UK Theory Test Practice" -> "UK Theory Test". */
function testName(t: TestCatalogEntry): string {
  return t.name.replace(/\s*\(.*\)$/, "").replace(/\s+(Practice Test|Mock Test|Practice|Reviewer)$/i, "").trim();
}

function list(items: string[]): string {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** "UK", "UAE", else the country's name ("India", "Hong Kong"). */
function label(region: Region): string {
  const r = regionInfo(region);
  return r.short.length > 2 ? r.short : region === "UK" ? "UK" : r.name;
}

export function regionHeadline(region: Exclude<Region, "US">): { h1: string; lead: string } | null {
  // The country's tests by hub group, in catalog order; a group counts once even when shared (Citizenship tests).
  const groups: { topic: string; tests: TestCatalogEntry[] }[] = [];
  for (const g of TEST_GROUPS) {
    const tests = g.tests.filter((t) => regionOfTest(t.id) === region);
    if (!tests.length) continue;
    const topic = topicOf(g.title);
    const same = groups.find((x) => x.topic === topic);
    if (same) same.tests.push(...tests);
    else groups.push({ topic, tests: [...tests] });
  }
  if (!groups.length) return null;
  const name = label(region);
  // The driving test first (every country has one), then the biggest kinds; ties keep catalog order.
  const rank = (g: { topic: string; tests: TestCatalogEntry[] }) => (g.topic === "driving" ? Infinity : g.tests.length);
  const ordered = [...groups].sort((a, b) => rank(b) - rank(a));
  const topics = ordered.map((g) => g.topic);
  const h1 =
    topics.length === 1
      ? `Free ${name} ${topics[0]} practice tests`
      : topics.length === 2
        ? `Free ${name} practice tests: ${topics[0]} and ${topics[1]}`
        : `Free ${name} practice tests: ${topics[0]}, ${topics[1]} and more`;
  // The lead: the first test of each kind (biggest kinds first), up to four.
  const total = groups.reduce((n, g) => n + g.tests.length, 0);
  const shown = ordered.slice(0, 4).map((g) => testName(g.tests[0]));
  const rest = total - shown.length;
  const lead = `Practice for ${list(shown)}${rest > 0 ? `, plus ${rest} more ${name} test${rest === 1 ? "" : "s"}` : ""}. Free, with every answer explained and no signup.`;
  return { h1, lead };
}
