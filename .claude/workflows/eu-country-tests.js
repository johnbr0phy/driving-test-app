export const meta = {
  name: 'eu-country-tests',
  description: 'Research, build, review and wire 4 paid-for tests per EU country, add native UI languages and translate each country driving test',
  whenToUse: 'Grow a set of countries from 1 test each to 5: pass args {countries, idStart, branch} or run with the defaults (the 11 EU countries)',
  phases: [
    { title: 'Languages', detail: 'new UI dictionaries and homepage copy, then one platform registration' },
    { title: 'Research', detail: 'one agent per country picks the 4 tests people pay to prepare for' },
    { title: 'Build', detail: 'one builder per exam (tools/next100/BRIEF.md), own files only' },
    { title: 'Review', detail: 'one fact and quality reviewer per exam (tools/next100/REVIEW.md)' },
    { title: 'Translate', detail: 'native-language version of each country driving test' },
    { title: 'Integrate', detail: 'one country at a time: shared files, screenshots, checks, commit' },
    { title: 'Verify', detail: 'full checks, production build, route count' },
  ],
}

// ---------- inputs ----------
const A = args || {}
const BRANCH = A.branch || 'claude/nifty-feynman-v2oq3l'
const ID_START = A.idStart || 22000 // first free v1 idBase block (max in use was 21900 in Nov 2026)
const PER_COUNTRY = A.perCountry || 4

// Languages the UI does not have yet that these countries need.
const NEW_LANGS = A.newLangs || [
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪', locale: 'sv-SE' },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰', locale: 'da-DK' },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮', locale: 'fi-FI' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺', locale: 'hu-HU' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴', locale: 'ro-RO' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷', locale: 'el-GR' },
]
const NEW_LANG_CODES = NEW_LANGS.map(l => l.code)

const COUNTRIES = A.countries || [
  { region: 'DE', name: 'Germany', lang: 'de', existing: ['detheorie'], translate: [{ exam: 'detheorie', lang: 'en' }] },
  { region: 'ES', name: 'Spain', lang: 'es', existing: ['esdgt'], translate: [] },
  { region: 'PT', name: 'Portugal', lang: 'pt', existing: ['ptimt'], translate: [] },
  { region: 'SE', name: 'Sweden', lang: 'sv', existing: ['setrafik'], translate: [{ exam: 'setrafik', lang: 'sv' }] },
  { region: 'DK', name: 'Denmark', lang: 'da', existing: ['dkteori'], translate: [{ exam: 'dkteori', lang: 'da' }] },
  { region: 'FI', name: 'Finland', lang: 'fi', existing: ['fitheory'], translate: [{ exam: 'fitheory', lang: 'fi' }] },
  { region: 'HU', name: 'Hungary', lang: 'hu', existing: ['hukresz'], translate: [{ exam: 'hukresz', lang: 'hu' }] },
  { region: 'RO', name: 'Romania', lang: 'ro', existing: ['rodrpciv'], translate: [{ exam: 'rodrpciv', lang: 'ro' }] },
  { region: 'GR', name: 'Greece', lang: 'el', existing: ['grdriving'], translate: [{ exam: 'grdriving', lang: 'el' }] },
  { region: 'BE', name: 'Belgium', lang: 'nl', existing: ['bedriving'], translate: [{ exam: 'bedriving', lang: 'nl' }, { exam: 'bedriving', lang: 'fr' }] },
  { region: 'MT', name: 'Malta', lang: 'en', existing: ['mttheory'], translate: [] },
]

const needsPlatform = lang => NEW_LANG_CODES.includes(lang)

// ---------- helpers ----------
let chain = Promise.resolve()
function serial(fn) { // one shared-file writer at a time
  const p = chain.then(fn, fn)
  chain = p.catch(() => null)
  return p
}

const COMMON = `Repo /home/user/driving-test-app, branch ${BRANCH}. Many agents work in this checkout at once.
House rules from CLAUDE.md apply: "Tigertest" spelling, no em-dashes anywhere, plain apostrophes in metadata/JSON-LD, original questions only (never copy an official bank, past paper or commercial app), no fees or prices, no named officeholders, the country's own spelling and units.`

const OWN_FILES_ONLY = `Do NOT run git, npm install, next build or next dev. Do NOT edit shared files (lib/exams.ts, lib/region.ts, lib/testCatalog.ts, lib/examFacts.ts, lib/banks/all.ts, types/index.ts, i18n/*, app/globals.css, components/*, CLAUDE.md, next.config.ts, middleware.ts, lib/server/*): put every shared change as paste-ready blocks in your WIRING.md.`

const RESEARCH_SCHEMA = {
  type: 'object',
  properties: {
    picks: {
      type: 'array', minItems: 1,
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'new lowercase exam id, 4-12 chars, not used anywhere in lib/exams.ts, lib/v2/registry.ts or data/' },
          name: { type: 'string', description: 'name in the base language' },
          englishName: { type: 'string' },
          body: { type: 'string', description: 'who runs the real exam' },
          whyPaid: { type: 'string', description: 'who sits it, yearly volume if known, fees and paid prep market, with sources' },
          format: { type: 'string', description: 'questions, time, pass mark, languages, as found, with source URLs' },
          baseLanguage: { type: 'string', description: 'en, or the native language code when the real exam is not offered in English' },
          template: { type: 'string', description: 'existing tools/ folder to copy, e.g. tools/next100/detheorie (native) or tools/next100/setrafik, tools/next100/aesira, tools/next100/cpafar' },
          slug: { type: 'string', description: 'app route, e.g. /sweden-taxi-licence' },
          landing: { type: 'string', description: 'landing path; native base exams use /<lang>/<native-slug>' },
          stateCode: { type: 'string' },
          prefix: { type: 'string', description: 'question id prefix ending in -' },
          hue: { type: 'string', description: 'suggested "H S% L%" with lightness 26-42%' },
          notes: { type: 'string', description: 'lanes vs siblings, what is not modellable (pictures, video, practical), risks' },
        },
        required: ['id', 'name', 'englishName', 'body', 'whyPaid', 'format', 'baseLanguage', 'template', 'slug', 'landing', 'stateCode', 'prefix', 'hue', 'notes'],
      },
    },
    rejected: { type: 'array', items: { type: 'string' }, description: 'candidates considered and why not' },
  },
  required: ['picks', 'rejected'],
}

const BUILD_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean', description: 'true only if the bank validates PASS and every file is written' },
    validator: { type: 'string', description: 'last lines of the validator output' },
    files: { type: 'array', items: { type: 'string' } },
    decisions: { type: 'string', description: 'facts not confirmed, hue, region or format calls the integrator must check' },
  },
  required: ['ok', 'validator', 'files', 'decisions'],
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    itemsChanged: { type: 'number' },
    summary: { type: 'string' },
    blockers: { type: 'string', description: 'anything that must stop this exam from shipping, else empty' },
  },
  required: ['ok', 'itemsChanged', 'summary', 'blockers'],
}

const STEP_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    summary: { type: 'string' },
    shipped: { type: 'array', items: { type: 'string' }, description: 'exam ids or exam:lang translations wired and committed' },
    dropped: { type: 'array', items: { type: 'string' }, description: 'ids left out, each with the reason' },
    commit: { type: 'string' },
  },
  required: ['ok', 'summary', 'shipped', 'dropped', 'commit'],
}

// ---------- phase: Languages ----------
const platformP = (async () => {
  phase('Languages')
  const written = await parallel(NEW_LANGS.map(l => () => agent(
    `${COMMON}
Write the ${l.name} (${l.code}, ${l.locale}) user interface for Tigertest as NEW files only, machine translation in a natural, friendly register (informal "you" where the language's apps use it):
1. i18n/${l.code}.ts: translate i18n/de.ts (same shape and keys as the German one, which omits category names and leaves DMV-only blocks English). Keep {placeholders}, HTML and brand names as they are.
2. components/home/copy/${l.code}.ts: translate components/home/copy/nl.ts (same shape), with the country names in ${l.name} and any inName forms the sentences need.
3. tools/next100/langs/${l.code}.json: the per-language table entries other modules need, read from how "pl" is handled in each: TEST_SET_NAMES and trainingPartName pattern (lib/exams.ts), EXAM_UI (lib/examUi.ts), COPY (components/exam/ExamLandingHero.tsx), SAMPLE_COPY (ExamSampleQuestions), RELATED_COPY (ExamRelatedTests), CARD_FOOTERS (lib/shareCards.ts), the shuffle-guard phrases (lib/shuffleOptions.ts: "A and B", "both", "all of the above", "none of the above" equivalents), and validate_bank.py --lang banned phrases and option-reference connectors plus a --len-scale default. Run grep -rn '"pl"\\|pl:' lib components tools .claude/skills/exam-bank/scripts to find every table; list each table name with the exact value to paste.
Edit no existing file. ${OWN_FILES_ONLY} Return the three paths and the table names you covered.`,
    { label: `lang:${l.code}`, phase: 'Languages' })))
  return serial(() => agent(
    `${COMMON}
Register ${NEW_LANGS.length} new UI languages: ${NEW_LANGS.map(l => `${l.code} ${l.name} ${l.flag} ${l.locale}`).join('; ')}.
Writers have created i18n/<code>.ts, components/home/copy/<code>.ts and tools/next100/langs/<code>.json (table entries) for: ${NEW_LANG_CODES.join(', ')}. Missing ones (writer failed: ${written.map((w, i) => (w ? null : NEW_LANG_CODES[i])).filter(Boolean).join(', ') || 'none'}) are left out.
Follow tools/next100/LANGUAGES.md phase 0 and exactly how de, fr, it, pl, nl and pt were added (git log -S'"pl"' helps): Language type and LANGUAGES in i18n/index.ts (not DMV_LANGUAGES), the home copy index and lib/homeLanguages.ts, every per-language table (paste from the json files), lib/urlLanguage.ts and the Content-Language headers in next.config.ts for /<code> paths, lib/pageLanguage.ts, isLanguage(), the shuffle guard, validate_bank.py --lang and validate_translation.py --lang, locales in lib/examSeo.ts/examLandingLocale. Do NOT switch any region's lang in lib/region.ts yet (country integration does that when its translated test ships). Note /fi, /hu and /ro are both region homepage paths and language prefixes, like /es: make sure the header and URL-language logic still serve those homepages correctly.
Then run npm run typecheck, npm test and npm run lint; fix what you broke. Update CLAUDE.md "Native-language exams" (UI languages count and list) and tools/next100/LANGUAGES.md briefly. Commit on ${BRANCH} with a clear message (git add only files you changed; end the message with the repository's attribution lines from your instructions). Do not push.`,
    { label: 'platform:register', phase: 'Languages', schema: STEP_SCHEMA }))
})()

// ---------- per country ----------
const countryResults = await parallel(COUNTRIES.map((c, ci) => async () => {
  const research = await agent(
    `${COMMON}
Market research for ${c.name} (Tigertest region ${c.region}, homepage language ${c.lang}). It has these Tigertest tests today: ${c.existing.join(', ')} (see CLAUDE.md). Pick the ${PER_COUNTRY} tests people in ${c.name} most often PAY to prepare for that Tigertest can honestly model as a multiple-choice question bank, and say why.
Load WebSearch (and WebFetch if listed) with ToolSearch and search in both English and the local language. Good signals: a compulsory written exam with a fee and retakes, a large yearly cohort, an existing paid prep market (apps, courses, books), an official public syllabus or handbook. Typical candidates to weigh (verify, do not assume): other licence categories (motorcycle A/A2, truck C/CE and driver CPC, bus, taxi or private hire), citizenship or residence tests, security guard licences, boating and hunting licences, insurance or real estate licences, trade and IHK-style certificates, medical or nursing licensing tests, school-leaving or university entrance tests with MCQ parts.
Reject: anything already on Tigertest (grep lib/exams.ts, lib/v2/registry.ts, lib/testCatalog.ts), anything mostly pictures, video or practical, anything where the real test draws verbatim from an official question catalogue we would have to copy (unless original items on its published topics still give real practice, and you say so), and exams with no public syllabus.
Choose baseLanguage: "en" when the real exam is offered in English (or is in English, as in Malta), else the native language (${c.lang}). Allowed native languages: de, es, pt, nl, fr, ${NEW_LANG_CODES.join(', ')}.
Template: a native exam copies tools/next100/detheorie; an English EU driving-type test copies tools/next100/${c.existing[0]}; other English exams copy the nearest existing folder under tools/next100 (e.g. aesira for security, cpafar or nmls for finance and licensing, cma or arrt for healthcare, ieqfa for insurance, iepsa for guards).
Ids must be unique: grep for the id, the stateCode and the prefix across lib/ and data/ before choosing. Slugs in English for English exams, in the native language for native ones (landing /<lang>/<slug>). Do not write any file. Return exactly ${PER_COUNTRY} picks, best first.`,
    { label: `research:${c.region}`, phase: 'Research', schema: RESEARCH_SCHEMA })
  if (!research || !research.picks || !research.picks.length) { log(`${c.name}: research failed, skipped`); return { country: c.name, ok: false } }

  const picks = research.picks.slice(0, PER_COUNTRY).map((p, j) => ({ ...p, idBase: ID_START + (ci * PER_COUNTRY + j) * 100 }))
  if (research.picks.length < PER_COUNTRY) log(`${c.name}: only ${research.picks.length} picks returned`)
  log(`${c.name}: ${picks.map(p => `${p.id} (${p.englishName}, ${p.baseLanguage}, idBase ${p.idBase})`).join('; ')}`)

  const siblings = picks.map(p => `${p.id} (${p.englishName})`).join(', ')

  const builds = await parallel(picks.map(p => async () => {
    if (needsPlatform(p.baseLanguage)) await platformP
    const built = await agent(
      `${COMMON}
You are a builder. Read tools/next100/BRIEF.md (the top "Builder brief", every "Lessons" section, "EU batch 1" and "Native-language batch") and follow it, plus .claude/skills/exam-bank/SKILL.md and references/wiring.md. Copy the template end to end: ${p.template}.
Your exam (v1 registry exam, region ${c.region}):
| id ${p.id} | ${p.name} (${p.englishName}) | body ${p.body} | idBase ${p.idBase} | stateCode ${p.stateCode} | prefix ${p.prefix} | slug ${p.slug} | landing ${p.landing} | base language ${p.baseLanguage} | suggested hue ${p.hue} |
Research notes: format: ${p.format}. Why people pay: ${p.whyPaid}. Notes: ${p.notes}
Confirm every format fact again from the official source and record it in tools/next100/${p.id}/sources.md with URL and date. ${p.baseLanguage !== 'en' ? `This is a native-language exam: write the bank and copy directly in ${p.baseLanguage} from the official law and manuals (never draft in English), write glossary.md, set language/locale/english/review ("model") in the WIRING config block, use the TranslatedExamLanding three-line landing with lib/landings/${p.id}.${p.baseLanguage}.json, and validate with --lang ${p.baseLanguage}.` : ''}
Siblings being built now in ${c.name}: ${siblings}; existing: ${c.existing.join(', ')}. Grep their banks on disk as you write and keep to your own lane; no repeated fact-and-answer pairs.
The WIRING.md must also carry: the hub group line (a ${c.name} group for its non-driving tests, after "${c.name}"'s driving group, or the driving group for licence categories), TEST_REGIONS ${c.region}, search aliases in English and the local language, the examFacts entry, the testCatalog blurb and the CLAUDE.md bullet in the house shape.
${OWN_FILES_ONLY}
Finish per the brief.`,
      { label: `build:${p.id}`, phase: 'Build', schema: BUILD_SCHEMA })
    if (!built || !built.ok) { log(`${p.id}: build not ok, left out`); return { id: p.id, ok: false, why: built ? built.decisions : 'agent failed' } }
    const review = await agent(
      `${COMMON}
You are a reviewer. Follow tools/next100/REVIEW.md for exam ${p.id} (v1; files in tools/next100/${p.id}/, the bank named in its WIRING.md, the landing ${p.landing}). Also check: no question asks about the test itself; facts in sources.md, the landing, the FAQ and the WIRING examFacts match each other and the official source (re-check with WebSearch); no repeats of the siblings ${siblings} or ${c.existing.join(', ')}.${p.baseLanguage !== 'en' ? ` Read every item as a fluent ${p.baseLanguage} speaker: grammar, idiom and the authority's own terms (glossary.md).` : ''}
Fix in the sources, rebuild, revalidate to PASS. ${OWN_FILES_ONLY} Report blockers only if the exam must not ship.`,
      { label: `review:${p.id}`, phase: 'Review', schema: REVIEW_SCHEMA })
    const ok = !!review && review.ok && !review.blockers
    if (!ok) log(`${p.id}: review blocked: ${review ? review.blockers : 'agent failed'}`)
    return { id: p.id, ok, build: built, review, pick: p }
  }))

  const translations = await parallel(c.translate.map(t => async () => {
    if (needsPlatform(t.lang)) await platformP
    const r = await agent(
      `${COMMON}
Translate the Tigertest exam ${t.exam} into ${t.lang} as a Translated exam (CLAUDE.md "Translated exams" and tools/next100/LANGUAGES.md 5.1). Template: tools/next100/esdgt/es (build.py, glossary.md, NOTES.md, check.py), lib/examTranslations/esdgt.es.json, lib/landings/esdgt.es.json, the landing at app/es/test-dgt-permiso-b and tools/next100/esdgt/WIRING_ES.md.
${t.lang === 'en' ? 'Here the base is German and the translation is English (translations.en), British English for people living in Germany who sit the test in English.' : `Use ${c.name}'s own official terms from the national handbook (write glossary.md first), the register its learner materials use.`}
Keep every questionId, category, correct answer and option order; reword stems idiomatically. Write the sources under tools/next100/${t.exam}/${t.lang}/, the bank data/<base bank name>_${t.lang}.json, lib/examTranslations/${t.exam}.${t.lang}.json, lib/landings/${t.exam}.${t.lang}.json, the three-line landing page at /${t.lang}/<native slug>, and tools/next100/${t.exam}/WIRING_${t.lang.toUpperCase()}.md (translations block with locale and landingPath, review "machine", the bank module registration line, hreflang/x-default note: the native landing is x-default for this exam). You may edit lib/banks/${t.exam}.ts to register the translated bank.
Validate: python3 -I .claude/skills/exam-bank/scripts/validate_translation.py <base> <translation> --lang ${t.lang} must pass. ${OWN_FILES_ONLY}`,
      { label: `translate:${t.exam}:${t.lang}`, phase: 'Translate', schema: BUILD_SCHEMA })
    return { key: `${t.exam}:${t.lang}`, ok: !!r && r.ok, r }
  }))

  const goodExams = builds.filter(b => b && b.ok)
  const goodTr = translations.filter(t => t && t.ok)
  if (!goodExams.length && !goodTr.length) return { country: c.name, ok: false, builds, translations }

  await platformP
  const integrated = await serial(() => agent(
    `${COMMON}
You are the integrator for ${c.name} (region ${c.region}). You are the only agent editing shared files right now. Builders and translators may still be writing their OWN files for other countries: never touch those.
Ship these exams: ${goodExams.map(b => `${b.id} (tools/next100/${b.id}/WIRING.md; builder notes: ${b.build.decisions}; reviewer: ${b.review.summary})`).join(' | ') || 'none'}.
Ship these translations: ${goodTr.map(t => `${t.key} (tools/next100/${t.key.split(':')[0]}/WIRING_${t.key.split(':')[1].toUpperCase()}.md)`).join(' | ') || 'none'}.
Steps:
1. Apply each WIRING.md to the shared files, in the shapes used by the last EU batch and the native batch (git log for the commits that added setrafik, detheorie and esdgt es shows every file touched). Settle each theme hue against app/globals.css (rule in BRIEF.md "Lessons from batch 1"; white text 4.5:1), writing the final hue into globals.css and the config. Run tools/gen_dark_brand_css.py. Add the hub group(s), aliases, examFacts, TEST_REGIONS, and CLAUDE.md bullets.
2. ${['sv', 'da', 'fi', 'hu', 'ro', 'el'].includes(c.lang) && goodTr.length ? `The country's driving test now exists in ${c.lang}: switch region ${c.region} to lang "${c.lang}" with its locale in lib/region.ts (like ES and PT), write REGION_HOME and faqsFor for ${c.region} in ${c.lang}, and check its homepage renders in ${c.lang}.` : 'Leave the region language as it is.'}
3. npx tsx scripts/build-training-parts.ts, then python3 -I tools/check_banks.py, python3 -I tools/build_exam_sources.py, python3 scripts/review-question-banks.py (whatever .github/workflows/checks.yml runs), npm run typecheck, npm run lint, npm test. Fix failures in what you wired; if one exam cannot be made to pass, unwire it and list it as dropped.
4. Screenshots per .claude/skills/exam-bank/references/wiring.md section 11 (dev server on a free port, Playwright, light and dark as that section says) for each new exam and each translated landing that references one; stop the server after.
5. npx tsx scripts/build-landing-dates.ts after committing step content if the script needs git dates (commit, run it, amend or add a second commit).
6. git add only the files of this country's exams, translations and the shared files you changed; commit on ${BRANCH} "Add ${c.name} tests: <ids>" ending with the attribution lines from your instructions. Do not push.`,
    { label: `integrate:${c.region}`, phase: 'Integrate', schema: STEP_SCHEMA }))
  return { country: c.name, ok: !!integrated && integrated.ok, research, builds, translations, integrated }
}))

// ---------- final verification ----------
const platform = await platformP
const final = await serial(() => agent(
  `${COMMON}
All country integrations are committed on ${BRANCH}. Verify the whole branch as CI and Vercel would:
1. Everything .github/workflows/checks.yml and question-banks.yml run, plus npm run typecheck, npm run lint, npm test.
2. npm run build (production). Count the routes in the build output and compare with Vercel's 2,048-route limit (CLAUDE.md explains why it matters); report the number and the headroom.
3. Spot-check in a dev server: /se, /fi, /hu, /ro, /dk, /gr homepages, one new exam dashboard and landing per country, one translated landing; no raw i18n key paths, no English chrome where a native page should be native.
Fix anything broken with the smallest change, rerun, and commit the fixes ("Fix checks after EU country tests") with the attribution lines. Do not push.`,
  { label: 'verify:branch', phase: 'Verify', schema: STEP_SCHEMA }))

return {
  platform,
  countries: countryResults.filter(Boolean).map(r => ({
    country: r.country,
    ok: r.ok,
    picks: r.research ? r.research.picks.map(p => ({ id: p.id, name: p.englishName, lang: p.baseLanguage, why: p.whyPaid })) : [],
    rejected: r.research ? r.research.rejected : [],
    shipped: r.integrated ? r.integrated.shipped : [],
    dropped: r.integrated ? r.integrated.dropped : [],
    buildIssues: (r.builds || []).filter(b => b && !b.ok).map(b => `${b.id}: ${b.why || (b.review && b.review.blockers) || ''}`),
    translations: (r.translations || []).map(t => t && `${t.key}: ${t.ok ? 'ok' : 'failed'}`),
  })),
  final,
}
