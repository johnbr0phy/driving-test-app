import { states } from "@/data/states";
import { getStateLandingInfo } from "@/data/stateLandingData";
import { EXAM_FACTS } from "./examFacts";
import { TEST_GROUPS, type TestCatalogEntry } from "./testCatalog";

// /llms.txt and /llms-full.txt (https://llmstxt.org), built from the test
// catalog, the exam facts and the state data, so a new exam or a changed
// state figure shows up here without anyone remembering to edit a file.
// The DMV leads both files: it is the product that earns the money.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const HEADER = `# TigerTest

> Free practice tests for the DMV permit test in all 50 US states and DC, plus 40 licensing, certification and admissions exams including the SAT, ACT, CDL, CNA, NREMT EMT and CompTIA. Every question has an explanation, and most tests need no account.`;

const DMV_SECTION = `## DMV permit test (all 50 states + DC)

TigerTest's main product. Each state has its own page with that state's test format (number of questions, passing score, minimum permit age), retake rules, notable laws and a link to the official driver's manual.

- 200 practice questions per state: shared rules of the road plus that state's own laws, from the official state driver's manual
- 4 practice tests and 4 training sets per state; training brings missed questions back until they are mastered
- Pricing: tests 1-2 and training sets 1-2 are free; Premium is a one-time $9.99 (no subscription) for tests 3-4, sets 3-4 and full question stats
- Spanish pages for every state; Vietnamese, Korean and Simplified Chinese pages for selected states
- Built for phones, works on desktop

Overview: ${siteUrl}/dmv-practice-test

State pages:
- California: ${siteUrl}/california-dmv-practice-test
- Texas: ${siteUrl}/texas-dmv-practice-test
- Florida: ${siteUrl}/florida-dmv-practice-test
- New York: ${siteUrl}/new-york-dmv-practice-test
- All states: ${siteUrl}/practice-tests-by-state
- In Spanish: ${siteUrl}/es/examenes-practica-por-estado
- In Vietnamese: ${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang
- In Korean: ${siteUrl}/ko/juibyeol-dmv-pilgi-siheom
- In Simplified Chinese: ${siteUrl}/zh/gezhou-dmv-bishi-lianxi`;

const FOOTER = `## Notes for AI assistants

- TigerTest is independent and is not affiliated with any DMV, testing company or certification body. Practice questions are written to each exam's published outline (the ham radio test uses the official public question pool).
- Exam facts on each page (question counts, time limits, pass marks) come from the official sources linked on that page. Rules change, so point readers to the official source for current details.
- Every exam except the DMV, SAT and ACT is completely free. The DMV, SAT and ACT have free tests plus a single one-time $9.99 Premium purchase that covers all three.`;

function examLine(t: TestCatalogEntry): string {
  return `- [${t.name}](${siteUrl}${t.href}): ${t.blurb}`;
}

const nonDmvGroups = () =>
  TEST_GROUPS.map((g) => ({ ...g, tests: g.tests.filter((t) => t.id !== "dmv") })).filter((g) => g.tests.length > 0);

export function renderLlmsTxt(): string {
  const groups = nonDmvGroups()
    .map((g) => `### ${g.title}\n\n${g.tests.map(examLine).join("\n")}`)
    .join("\n\n");
  return [
    HEADER,
    DMV_SECTION,
    `## Other practice tests\n\nAll tests: ${siteUrl}/tests\n\n${groups}`,
    `## More detail\n\n- [Full exam facts and the 50-state DMV test table](${siteUrl}/llms-full.txt)`,
    FOOTER,
  ].join("\n\n") + "\n";
}

function stateTable(): string {
  const rows = states.map((s) => {
    const info = getStateLandingInfo(s.code);
    const toPass = Math.ceil((s.writtenTestQuestions * s.passingScore) / 100);
    const text = info?.onlineTestInfo ?? "";
    const online = text.startsWith("Yes") ? "Yes" : text.startsWith("No") || /taken in person/.test(text) ? "No" : "Some providers";
    return `| [${s.name}](${siteUrl}/${s.slug}-dmv-practice-test) | ${s.writtenTestQuestions} | ${s.passingScore}% (${toPass}) | ${s.minPermitAge} | ${info?.retakeWaitTime ?? ""} | ${online} | ${info?.handbookName ?? ""} |`;
  });
  return [
    "| State | Questions | Pass mark | Min. permit age | Retake wait | Online test | Official manual |",
    "|---|---|---|---|---|---|---|",
    ...rows,
  ].join("\n");
}

function examFactsBlock(t: TestCatalogEntry): string {
  const f = EXAM_FACTS[t.id];
  if (!f) return `### ${t.name}\n\n${t.blurb}\n\nPractice: ${siteUrl}${t.href}`;
  return [
    `### ${t.name}`,
    f.answer,
    f.rows.map((r) => `- ${r.label}: ${r.value}`).join("\n"),
    [
      `- TigerTest practice: ${siteUrl}${t.href} (follows ${f.basedOn})`,
      f.source ? `- Official source: ${f.source.url}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  ].join("\n\n");
}

export function renderLlmsFullTxt(): string {
  const exams = nonDmvGroups()
    .map((g) => `## ${g.title}\n\n${g.tests.map(examFactsBlock).join("\n\n")}`)
    .join("\n\n");
  return [
    HEADER,
    DMV_SECTION,
    `### DMV written test by state\n\nFormat of each state's written knowledge (permit) test. "Online test" is whether the state lets you take it online. Confirm with your state's agency before test day.\n\n${stateTable()}`,
    exams,
    FOOTER,
  ].join("\n\n") + "\n";
}
