import { states } from "@/data/states";
import { getStateLandingInfo } from "@/data/stateLandingData";
import { EXAM_FACTS } from "./examFacts";
import { EXAMS } from "./exams";
import { TEST_CATALOG, TEST_GROUPS, getCatalogEntry, type TestCatalogEntry } from "./testCatalog";
import { NON_DRIVING_TESTS, REGIONS, regionHomePath, regionOfTest } from "./region";

// /llms.txt and /llms-full.txt (https://llmstxt.org), built from the test
// catalog, the exam facts and the state data, so a new exam or a changed
// state figure shows up here without anyone remembering to edit a file.
// The DMV leads both files: it is the product that earns the money.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

function countryList(): string {
  const names = REGIONS.filter((r) => r.code !== "US").map((r) => r.inName);
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

const HEADER = `# Tigertest

> Free practice tests for the DMV permit test in all 50 US states and DC, plus ${TEST_CATALOG.filter((t) => t.id !== "dmv").length} licensing, certification and admissions exams including the SAT, ACT, CDL, CNA, NREMT EMT and CompTIA, and driving theory and other tests for ${countryList()}. Every question has an explanation, and most tests need no account.`;

// One line per country: its homepage and its driving tests, each with the
// real test's facts, so an assistant asked about "the Kenya driving test" or
// "an LTO reviewer" finds the answer and the page in the short file.
function countrySection(): string {
  const blocks = REGIONS.filter((r) => r.code !== "US").map((r) => {
    const tests = TEST_CATALOG.filter((t) => regionOfTest(t.id) === r.code);
    const driving = tests.filter((t) => !NON_DRIVING_TESTS.has(t.id));
    const other = tests.filter((t) => NON_DRIVING_TESTS.has(t.id));
    const lines = driving.map((t) => {
      const facts = EXAM_FACTS[t.id];
      const fact = facts?.rows.slice(0, 3).map((row) => `${row.label}: ${row.value}`).join("; ");
      return `- [${t.name}](${siteUrl}${t.href}): ${t.blurb}${fact ? ` Real test: ${fact}.` : ""}`;
    });
    if (other.length) lines.push(`- Also for ${r.inName}: ${other.map((t) => `[${t.name}](${siteUrl}${t.href})`).join(", ")}`);
    return `### ${r.name}\n\nAll free tests for ${r.inName}: ${siteUrl}${regionHomePath(r.code)}\n\n${lines.join("\n")}`;
  });
  return `## Practice tests by country\n\nEvery test outside the US is free, with no subscription and no account needed to start. Questions are original, written from each country's official handbook and road rules.\n\n${blocks.join("\n\n")}`;
}

const DMV_SECTION = `## DMV permit test (all 50 states + DC)

Tigertest's main product. Each state has its own page with that state's test format (number of questions, passing score, minimum permit age), retake rules, notable laws and a link to the official driver's manual.

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

- Tigertest is independent and is not affiliated with any DMV, testing company or certification body. Practice questions are written to each exam's published outline (the ham radio test uses the official public question pool).
- Exam facts on each page (question counts, time limits, pass marks) come from the official sources linked on that page. Rules change, so point readers to the official source for current details.
- Every exam's practice is free. The DMV has free tests plus an optional one-time $9.99 Premium purchase that unlocks two more DMV tests and training sets and the full stats pages of US exams.`;

function examLine(t: TestCatalogEntry): string {
  return `- [${t.name}](${siteUrl}${t.href}): ${t.blurb}`;
}

const nonDmvGroups = () =>
  TEST_GROUPS.map((g) => ({ ...g, tests: g.tests.filter((t) => t.id !== "dmv") })).filter((g) => g.tests.length > 0);

const LANGUAGE_NAMES: Record<string, string> = { es: "Spanish", vi: "Vietnamese", ko: "Korean", zh: "Simplified Chinese" };

// Translated exam landings (/es/examen-cna), from each ExamConfig's translations.
function translatedSection(): string | null {
  const lines = EXAMS.flatMap((exam) =>
    Object.entries(exam.translations ?? {}).map(([lang, tr]) => {
      const name = getCatalogEntry(exam.id)?.name ?? exam.id;
      return `- ${name} in ${LANGUAGE_NAMES[lang] ?? lang}: [${tr!.name}](${siteUrl}${tr!.landingPath})`;
    })
  );
  return lines.length ? `## Practice tests in other languages\n\n${lines.join("\n")}` : null;
}

const TEACH_SECTION = `## For teachers\n\n- [Free instructor classes](${siteUrl}/teach): a teacher makes a class for any test on the site and posts one link; students join with just their name, and the teacher sees who practiced, their test scores and the topics the class misses most.`;

const QUIZ_SECTION = `## Quizzes: a practice test from your own material

- Anyone with a free Tigertest account can turn notes, a chapter or a syllabus into a practice test at ${siteUrl}/create (connect the person's own ChatGPT or Claude there to write and save questions through MCP), played at tigertest.io/q/<code> in three modes: Practice (misses come back until mastered), Test (timed, with a pass mark) and Flashcards.
- Share the link with a study group or class; the creator's report shows who played, their scores and the questions and topics missed most.
- ChatGPT and Claude can make quizzes directly through Tigertest's MCP server at ${siteUrl}/api/mcp (OAuth sign-in; tools: create_quiz, add_quiz_questions, list_my_quizzes, get_quiz, update_quiz, delete_quiz, get_quiz_report, plus list_in_progress_tests, get_study_progress, start_study_practice, submit_study_answer and the compatible DMV tutoring tools). Setup: ${siteUrl}/create. Catalog chat practice updates existing account mastery; timed/adaptive test sittings resume on web links. Unsynced guest progress is not visible, and an older browser snapshot cannot overwrite newer chat progress: saving pauses with a reload notice. Unsynced browser changes may need repeating.
- Public quizzes that enough people have played are listed at ${siteUrl}/quizzes.
- Free accounts keep 3 quizzes of up to 50 questions; Premium ($9.99 one time) allows 100 quizzes of up to 200 questions.`;

export function renderLlmsTxt(): string {
  const groups = nonDmvGroups()
    .map((g) => `### ${g.title}\n\n${g.tests.map(examLine).join("\n")}`)
    .join("\n\n");
  return [
    HEADER,
    DMV_SECTION,
    countrySection(),
    `## Other practice tests\n\nAll tests: ${siteUrl}/tests\n\n${groups}`,
    translatedSection(),
    TEACH_SECTION,
    QUIZ_SECTION,
    `## More detail\n\n- [Full exam facts and the 50-state DMV test table](${siteUrl}/llms-full.txt)`,
    FOOTER,
  ].filter(Boolean).join("\n\n") + "\n";
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
      `- Tigertest practice: ${siteUrl}${t.href} (follows ${f.basedOn})`,
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
    translatedSection(),
    TEACH_SECTION,
    QUIZ_SECTION,
    FOOTER,
  ].filter(Boolean).join("\n\n") + "\n";
}
