/**
 * "What test should we build next?"
 *
 * The one-click answers offered in the new-tests email and on the
 * unsubscribe page. A click records a pick in the `testRequests` collection
 * and lands on /request-test, which asks for the exact exam in free text.
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

export const TEST_REQUEST_PICKS: TestRequestPick[] = [
  { id: "driving", label: "Driving tests", hint: "DMV, CDL, motorcycle, another state" },
  { id: "healthcare", label: "Healthcare certs", hint: "CNA, pharmacy tech, phlebotomy, EKG, medical assistant, dental" },
  { id: "nursing", label: "Nursing school & NCLEX", hint: "TEAS, HESI, NCLEX-RN, NCLEX-PN" },
  { id: "it", label: "IT certifications", hint: "CompTIA, AWS, Azure, Cisco, Google" },
  { id: "trades", label: "Trade licenses", hint: "Electrician, HVAC, plumbing, contractor, cosmetology, barber" },
  { id: "finance", label: "Real estate & finance", hint: "Real estate, insurance, notary, Series 7, mortgage" },
  { id: "safety", label: "Public safety", hint: "EMT, paramedic, firefighter, police, security guard" },
  { id: "school", label: "School & college", hint: "GED, SAT, ACT, AP, ASVAB" },
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
