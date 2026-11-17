// Stable dates for sitemap <lastmod> values. Search engines discount lastmod
// when it changes on every request, so these are bumped by hand (ISO date)
// whenever the content of that page family actually changes.
export const STATE_PAGES_PUBLISHED_AT = "2026-03-13";
export const STATE_PAGES_UPDATED_AT = "2026-11-16"; // the other 48 states lead with "<State> Permit Practice Test" (title and H1), the phrase Search Console shows people use, and the description gives the real test size instead of calling it the number of practice questions; before that CA, NY and GA titles, H1s and FAQs in the words people search ("ca permit test", "ny permit practice test", "dds practice test"); before that exact pass counts (CA 38/46, MD 22/25, MT 27/33, IN 28/34) and permit ages that read naturally; before that zh hreflang added to the state pages and the by-state index
export const DMV_LANGUAGE_PAGES_UPDATED_AT = "2026-11-01"; // exact pass counts and permit ages in each language
export const EXAM_LANDINGS_UPDATED_AT = "2026-11-17"; // Appraiser, South Africa firearm competency, SecurityX, SSCP and ServiceNow CSA added.
export const HUB_PAGES_UPDATED_AT = "2026-11-17"; // Appraiser, South Africa firearm competency, SecurityX, SSCP and ServiceNow CSA added.
export const QUIZZES_PAGES_UPDATED_AT = "2026-10-22"; // /quizzes library and /create

// State landings of real estate and insurance (lib/stateLandings.ts).
export const STATE_EXAM_LANDINGS_UPDATED_AT = "2026-11-10"; // first published
// Topic and most-missed question pages (lib/topicPages.ts).
export const TOPIC_PAGES_UPDATED_AT = "2026-11-14"; // CCRN (Adult) added; v2 exams (ASVAB subtests and AFQT, TEAS, HESI, GED, SAT, ACT, NCLEX, EMT) added; CDL endorsement titles; first published 2026-11-10

// /about.
export const ABOUT_PAGE_UPDATED_AT = "2026-11-10";
