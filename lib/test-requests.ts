/**
 * "What test should we build next?"
 *
 * The one-click answers offered in the new-tests email, the unsubscribe
 * page and the homepage's "Request a test" button. A click records a pick
 * in the `testRequests` collection and lands on /request-test, which asks
 * for the exact exam in free text.
 * The pick is the cheap signal; the exam name is the one that decides what
 * gets built. Server and client safe.
 */

export interface TestRequestPick {
  id: string;
  /** Button label in the email and on the page. */
  label: string;
  /** Examples shown on the request page to prompt a specific answer. */
  hint: string;
}

/**
 * Hints name only exams we do not offer yet, so the examples never suggest
 * something already on the site. Ids stay fixed: stored answers use them.
 */
export const TEST_REQUEST_PICKS: TestRequestPick[] = [
  { id: "driving", label: "Driving tests", hint: "School bus, taxi or chauffeur license, TWIC card, driver's ed final" },
  { id: "healthcare", label: "Healthcare certs", hint: "Medical coding (CPC), CMA (AAMA), RMA, patient care tech, massage (MBLEx)" },
  { id: "nursing", label: "Nursing school & NCLEX", hint: "NCLEX-PN, ATI exit exam, CCRN, CEN, nurse practitioner boards" },
  { id: "it", label: "IT certifications", hint: "Network+, CySA+, Azure, Google Cloud, Cisco CCNA" },
  { id: "trades", label: "Trade licenses", hint: "Electrician, HVAC, plumbing, contractor, cosmetology, barber" },
  { id: "finance", label: "Real estate & finance", hint: "SIE, Series 7, Series 63, mortgage (NMLS), claims adjuster" },
  { id: "safety", label: "Public safety", hint: "Paramedic, firefighter, police academy, 911 dispatcher, corrections" },
  { id: "school", label: "School & college", hint: "GED, HiSET, PSAT, AP, CLEP, GRE" },
  { id: "other", label: "Something else", hint: "Anything at all" },
];

export function getTestRequestPick(id: unknown): TestRequestPick | null {
  if (typeof id !== "string") return null;
  return TEST_REQUEST_PICKS.find((p) => p.id === id) ?? null;
}

/** Where a click came from, for the admin breakdown. */
export const TEST_REQUEST_SOURCES = ["email", "unsubscribe", "page"] as const;
export type TestRequestSource = (typeof TEST_REQUEST_SOURCES)[number];

export function asTestRequestSource(v: unknown): TestRequestSource {
  return TEST_REQUEST_SOURCES.includes(v as TestRequestSource) ? (v as TestRequestSource) : "page";
}

/** Longest free-text answer stored. */
export const TEST_REQUEST_MAX_DETAILS = 1000;
