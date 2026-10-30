// Which country's tests a visitor sees first. Each country has its own
// indexable homepage: the US at "/", the others at /uk, /ca and /au. A view
// setting only: it never touches progress, and every test stays reachable from
// every country. middleware.ts sets it from Vercel's request country on the
// first visit and sends a UK, Canada or Australia visitor from "/" to their
// country's page; the CountryPills change it.

export type Region = "US" | "CA" | "UK" | "AU";

export const REGIONS: { code: Region; name: string; short: string; inName: string }[] = [
  { code: "US", name: "United States", short: "US", inName: "the US" },
  { code: "CA", name: "Canada", short: "CA", inName: "Canada" },
  { code: "UK", name: "United Kingdom", short: "UK", inName: "the UK" },
  { code: "AU", name: "Australia", short: "AU", inName: "Australia" },
];

/** The chosen region, e.g. "UK". */
export const REGION_COOKIE = "tt-region";
/** How it was set: "geo" (request country), "default" (no usable country) or "chosen" (a pill). */
export const REGION_SOURCE_COOKIE = "tt-region-src";
export const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isRegion(v: unknown): v is Region {
  return v === "US" || v === "CA" || v === "UK" || v === "AU";
}

/** ISO 3166 country code (Vercel's x-vercel-ip-country) to a region; null for countries we have no tests for. */
export function regionFromCountry(cc: string | null | undefined): Region | null {
  switch ((cc ?? "").toUpperCase()) {
    case "US": case "PR": case "GU": case "VI": case "AS": case "MP": return "US";
    case "CA": return "CA";
    case "GB": case "IM": case "JE": case "GG": return "UK";
    case "AU": return "AU";
    default: return null;
  }
}

/** A country's homepage: "/" for the US, else /uk, /ca or /au. */
export function regionHomePath(r: Region): string {
  return r === "US" ? "/" : `/${r.toLowerCase()}`;
}

/** hreflang for each country's homepage, the US page doubling as the default. */
export const REGION_HREFLANG: Record<Region, string> = { US: "en-US", CA: "en-CA", UK: "en-GB", AU: "en-AU" };

export function regionInfo(r: Region) {
  return REGIONS.find((x) => x.code === r)!;
}

/** "GLOBAL" tests are the same exam everywhere and are listed in every country. */
export type TestRegion = Region | "GLOBAL";

const TEST_REGIONS: Record<string, TestRegion> = {
  ukcar: "UK", ukmoto: "UK", uklgv: "UK", ukpcv: "UK", ukadi: "UK", timestables: "UK", ks2: "UK", gcsemaths: "UK", uksia: "UK", uk18ed: "UK",
  caon: "CA", caqc: "CA", cabc: "CA", caab: "CA", camb: "CA", osslt: "CA", capal: "CA", caelec: "CA",
  aunsw: "AU", auvic: "AU", auqld: "AU", auwa: "AU", ausa: "AU", naplan: "AU", nswsel: "AU", auwhite: "AU",
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL",
};

/** A country's tests that are not driving tests: shown beside the worldwide ones, not in the driving grid. */
export const NON_DRIVING_TESTS = new Set([
  "timestables", "ks2", "gcsemaths", "uksia", "uk18ed",
  "osslt", "capal", "caelec",
  "naplan", "nswsel", "auwhite",
]);

/** Every test not listed above is a US exam. */
export function regionOfTest(testId: string): TestRegion {
  return TEST_REGIONS[testId] ?? "US";
}

/** Homepage copy that changes with the region. US is today's homepage. */
export const REGION_HOME: Record<Exclude<Region, "US">, {
  /** The country page's <title> (under 60 characters) and meta description (under 155). */
  title: string;
  description: string;
  lead: string;
  cta: { label: string; href: string };
  testsTitle: string;
  testsSub: string;
}> = {
  UK: {
    title: "Free UK Driving Theory Test Practice | Tigertest",
    description: "Free UK theory test practice for car, motorcycle, lorry (LGV), bus (PCV) and ADI part 1: original Highway Code questions with every answer explained.",
    lead: "Practice for the DVSA theory tests: car, motorcycle, lorry, bus and coach, and ADI part 1. Original questions on the Highway Code, every answer explained. No signup.",
    cta: { label: "Car theory test", href: "/uk-driving-theory-test" },
    testsTitle: "UK theory tests",
    testsSub: "Multiple-choice practice for Great Britain, in mph with the current Highway Code. Hazard perception is not covered.",
  },
  CA: {
    title: "Free Canada Driving Knowledge Test Practice | Tigertest",
    description: "Free driving knowledge test practice for Ontario G1, Quebec SAAQ, BC ICBC, Alberta Class 7 and Manitoba, written from each province's handbook.",
    lead: "Knowledge test practice for Ontario, Quebec, British Columbia, Alberta and Manitoba, written from each province's own handbook. Every answer explained. No signup.",
    cta: { label: "Ontario G1 test", href: "/ontario-g1-practice-test" },
    testsTitle: "Driving knowledge tests by province",
    testsSub: "200 questions per test from the official provincial handbook, in km/h with your province's licensing rules.",
  },
  AU: {
    title: "Free Australia Learner Driver Test Practice | Tigertest",
    description: "Free learner licence test practice for NSW, Victoria, Queensland, Western Australia and South Australia, written from each state's handbook.",
    lead: "Learner licence practice for New South Wales, Victoria, Queensland, Western Australia and South Australia, written from each state's handbook. Every answer explained. No signup.",
    cta: { label: "NSW DKT", href: "/nsw-dkt-practice-test" },
    testsTitle: "Learner driver tests by state",
    testsSub: "200 questions per test on your state's road rules, L and P plates and demerits. Hazard perception is not covered.",
  },
};

/**
 * Hub groups in the order a region sees them: its own groups first, then the
 * worldwide ones, then the rest of the world, then (outside the US) the US.
 * The US keeps today's order with the other countries' groups moved to the end.
 */
export function orderGroupsForRegion<G extends { title: string; tests: { id: string }[] }>(groups: G[], region: Region): G[] {
  const groupRegion = (g: G): TestRegion => (g.tests[0] ? regionOfTest(g.tests[0].id) : "US");
  const rank = (g: G): number => {
    const r = groupRegion(g);
    if (region === "US") return r === "US" || r === "GLOBAL" ? 0 : 1;
    if (r === region) return 0;
    if (r === "GLOBAL") return 1;
    if (r !== "US") return 2;
    return 3;
  };
  return groups
    .map((g, i) => ({ g, i }))
    .sort((a, b) => rank(a.g) - rank(b.g) || a.i - b.i)
    .map((x) => x.g);
}
