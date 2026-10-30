// Which country's tests a visitor sees first. Each country has its own
// indexable homepage: the US at "/", the others at /uk, /ie, /ca, /au, /nz and /in. A view
// setting only: it never touches progress, and every test stays reachable from
// every country. middleware.ts sets it from Vercel's request country on the
// first visit and sends a visitor from any other country we cover from "/" to their
// country's page; the CountryPills change it.

export type Region = "US" | "CA" | "UK" | "IE" | "AU" | "NZ" | "IN";

export const REGIONS: { code: Region; name: string; short: string; inName: string }[] = [
  { code: "US", name: "United States", short: "US", inName: "the US" },
  { code: "CA", name: "Canada", short: "CA", inName: "Canada" },
  { code: "UK", name: "United Kingdom", short: "UK", inName: "the UK" },
  { code: "IE", name: "Ireland", short: "IE", inName: "Ireland" },
  { code: "AU", name: "Australia", short: "AU", inName: "Australia" },
  { code: "NZ", name: "New Zealand", short: "NZ", inName: "New Zealand" },
  { code: "IN", name: "India", short: "IN", inName: "India" },
];

/** The chosen region, e.g. "UK". */
export const REGION_COOKIE = "tt-region";
/** How it was set: "geo" (request country), "default" (no usable country) or "chosen" (a pill). */
export const REGION_SOURCE_COOKIE = "tt-region-src";
export const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isRegion(v: unknown): v is Region {
  return v === "US" || v === "CA" || v === "UK" || v === "AU" || v === "IN" || v === "IE" || v === "NZ";
}

/** ISO 3166 country code (Vercel's x-vercel-ip-country) to a region; null for countries we have no tests for. */
export function regionFromCountry(cc: string | null | undefined): Region | null {
  switch ((cc ?? "").toUpperCase()) {
    case "US": case "PR": case "GU": case "VI": case "AS": case "MP": return "US";
    case "CA": return "CA";
    case "GB": case "IM": case "JE": case "GG": return "UK";
    case "AU": return "AU";
    case "IN": return "IN";
    case "IE": return "IE";
    case "NZ": return "NZ";
    default: return null;
  }
}

/** A country's homepage: "/" for the US, else /uk, /ie, /ca, /au, /nz or /in. */
export function regionHomePath(r: Region): string {
  return r === "US" ? "/" : `/${r.toLowerCase()}`;
}

/** hreflang for each country's homepage, the US page doubling as the default. */
export const REGION_HREFLANG: Record<Region, string> = { US: "en-US", CA: "en-CA", UK: "en-GB", AU: "en-AU", IN: "en-IN", IE: "en-IE", NZ: "en-NZ" };

export function regionInfo(r: Region) {
  return REGIONS.find((x) => x.code === r)!;
}

/** "GLOBAL" tests are the same exam everywhere and are listed in every country. */
export type TestRegion = Region | "GLOBAL";

const TEST_REGIONS: Record<string, TestRegion> = {
  ukcar: "UK", ukmoto: "UK", uklgv: "UK", ukpcv: "UK", ukadi: "UK", timestables: "UK", ks2: "UK", gcsemaths: "UK", uksia: "UK", uk18ed: "UK",
  gcsehigher: "UK", gcsescience: "UK", gcsecs: "UK", elevenplus: "UK", fsmaths: "UK", cscs: "UK", ukfood: "UK", ukaplh: "UK", ukfaw: "UK", ukcare: "UK",
  uklitu: "UK", uknmc: "UK", ukseru: "UK",
  iedtt: "IE",
  caon: "CA", caqc: "CA", cabc: "CA", caab: "CA", camb: "CA", osslt: "CA", capal: "CA", caelec: "CA",
  rexpn: "CA", eqao9: "CA", capsw: "CA", casfa: "CA", cawhmis: "CA", caguard: "CA", caauto: "CA", caplumb: "CA", cacarp: "CA", caweld: "CA", cacit: "CA",
  cask: "CA", cans: "CA", pcoc: "CA",
  aunsw: "AU", auvic: "AU", auqld: "AU", auwa: "AU", ausa: "AU", naplan: "AU", nswsel: "AU", auwhite: "AU",
  naplan7: "AU", ocnsw: "AU", vicsel: "AU", hscmaths: "AU", aursa: "AU", aurcg: "AU", aufss: "AU", aufirstaid: "AU", auforklift: "AU", auwah: "AU", aucit: "AU",
  nzroad: "NZ",
  inrto: "IN", ssccgl: "IN", rrbntpc: "IN", ibpspo: "IN", ctet: "IN",
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", awssaa: "GLOBAL", az900: "GLOBAL", ccna: "GLOBAL", pmp: "GLOBAL", gulfrn: "GLOBAL",
  netplus: "GLOBAL", cissp: "GLOBAL", gcdl: "GLOBAL", gre: "GLOBAL", gmat: "GLOBAL", itil: "GLOBAL", psm: "GLOBAL", capm: "GLOBAL",
};

/** A country's tests that are not driving tests: shown beside the worldwide ones, not in the driving grid. */
export const NON_DRIVING_TESTS = new Set([
  "timestables", "ks2", "gcsemaths", "uksia", "uk18ed",
  "gcsehigher", "gcsescience", "gcsecs", "elevenplus", "fsmaths", "cscs", "ukfood", "ukaplh", "ukfaw", "ukcare", "uklitu", "uknmc", "ukseru",
  "osslt", "capal", "caelec",
  "rexpn", "eqao9", "capsw", "casfa", "cawhmis", "caguard", "caauto", "caplumb", "cacarp", "caweld", "cacit", "pcoc",
  "naplan", "nswsel", "auwhite",
  "naplan7", "ocnsw", "vicsel", "hscmaths", "aursa", "aurcg", "aufss", "aufirstaid", "auforklift", "auwah", "aucit",
  "ssccgl", "rrbntpc", "ibpspo", "ctet",
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
    title: "Free UK Practice Tests: School, Work & Driving | Tigertest",
    description: "Free UK practice tests for GCSEs, KS2 SATs, driving theory, healthcare, trades and workplace qualifications. Every answer explained. No account needed.",
    lead: "Practice for the DVSA theory tests: car, motorcycle, lorry, bus and coach, and ADI part 1. Original questions on the Highway Code, every answer explained. No signup.",
    cta: { label: "Car theory test", href: "/uk-driving-theory-test" },
    testsTitle: "UK theory tests",
    testsSub: "Multiple-choice practice for Great Britain, in mph with the current Highway Code. Hazard perception is not covered.",
  },
  CA: {
    title: "Free Canadian Practice Tests: School, Work & Driving | Tigertest",
    description: "Free Canadian practice tests for driving, OSSLT, EQAO, nursing, Red Seal trades and workplace safety. Every answer explained. No account needed.",
    lead: "Knowledge test practice for Ontario, Quebec, British Columbia, Alberta and Manitoba, written from each province's own handbook. Every answer explained. No signup.",
    cta: { label: "Ontario G1 test", href: "/ontario-g1-practice-test" },
    testsTitle: "Driving knowledge tests by province",
    testsSub: "200 questions per test from the official provincial handbook, in km/h with your province's licensing rules.",
  },
  AU: {
    title: "Free Australian Practice Tests: School, Work & Driving | Tigertest",
    description: "Free Australian practice tests for NAPLAN, selective entry, HSC maths, driving, first aid and workplace licences. Every answer explained. No account needed.",
    lead: "Learner licence practice for New South Wales, Victoria, Queensland, Western Australia and South Australia, written from each state's handbook. Every answer explained. No signup.",
    cta: { label: "NSW DKT", href: "/nsw-dkt-practice-test" },
    testsTitle: "Learner driver tests by state",
    testsSub: "200 questions per test on your state's road rules, L and P plates and demerits. Hazard perception is not covered.",
  },
  IN: {
    title: "Free Indian Practice Tests: LL Test, SSC & RRB | Tigertest",
    description: "Free practice tests for India: the RTO learner's licence (LL) test and SSC CGL, RRB NTPC and CTET mock tests, every answer explained. No account needed.",
    lead: "Practice for the learner's licence test and government job exams like SSC CGL, RRB NTPC and CTET. Original questions, every answer explained. No signup.",
    cta: { label: "LL test practice", href: "/rto-learners-licence-test" },
    testsTitle: "Learner's licence test",
    testsSub: "200 questions from the Motor Vehicles Act and the driving regulations, in km/h for left-hand traffic. The test format varies by state.",
  },
  IE: {
    title: "Free Irish Practice Tests: Driver Theory Test | Tigertest",
    description: "Free Driver Theory Test practice for Ireland: 200 original questions on the Rules of the Road, every answer explained. No account needed.",
    lead: "Practice for the Driver Theory Test you need before your first learner permit. Original questions on the Rules of the Road, every answer explained. No signup.",
    cta: { label: "Driver Theory Test", href: "/ireland-driver-theory-test" },
    testsTitle: "Driver Theory Test",
    testsSub: "200 questions on the Rules of the Road, in km/h for left-hand traffic. The real test is 40 questions and you need 35 right.",
  },
  NZ: {
    title: "Free NZ Practice Tests: Learner Licence Test | Tigertest",
    description: "Free learner licence theory test practice for New Zealand: 200 original questions on the Road Code, every answer explained. No account needed.",
    lead: "Practice for the learner licence theory test. Original questions on the Road Code, every answer explained. No signup.",
    cta: { label: "Learner licence test", href: "/nz-learner-licence-practice-test" },
    testsTitle: "Learner licence theory test",
    testsSub: "200 questions on the Road Code, in km/h for left-hand traffic. The real test is 35 questions and you need 32 right.",
  },
};

/**
 * Hub groups in the order a region sees them: its own groups first, then the
 * worldwide ones, then the rest of the world, then (outside the US) the US.
 * The US keeps today's order with the other countries' groups moved to the end.
 */
export function orderGroupsForRegion<G extends { title: string; tests: { id: string }[] }>(groups: G[], region: Region): G[] {
  // A group is a region's own when any member belongs to it, so a mixed group
  // (Citizenship tests: US, UK, Canada, Australia) leads in each of those countries.
  const regionsOf = (g: G): Set<TestRegion> => new Set(g.tests.length ? g.tests.map((t) => regionOfTest(t.id)) : ["US" as TestRegion]);
  const rank = (g: G): number => {
    const rs = regionsOf(g);
    if (region === "US") return rs.has("US") || rs.has("GLOBAL") ? 0 : 1;
    if (rs.has(region)) return 0;
    if (rs.has("GLOBAL")) return 1;
    if ([...rs].some((r) => r !== "US")) return 2;
    return 3;
  };
  return groups
    .map((g, i) => ({ g, i }))
    .sort((a, b) => rank(a.g) - rank(b.g) || a.i - b.i)
    .map((x) => x.g);
}
