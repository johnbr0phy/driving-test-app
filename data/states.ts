import { State } from "@/types";

/**
 * passCount is the number of correct answers the state requires, from its
 * DMV handbook or site. passingScore (the percent shown on pages) is derived
 * from it, so the two never disagree.
 */
const STATE_ROWS: Omit<State, "passingScore">[] = [
  { name: "Alabama", code: "AL", slug: "alabama", dmvName: "ALEA", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15" },
  { name: "Alaska", code: "AK", slug: "alaska", dmvName: "DMV", writtenTestQuestions: 20, passCount: 16, minPermitAge: "14" },
  { name: "Arizona", code: "AZ", slug: "arizona", dmvName: "MVD", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15 years 6 months" },
  { name: "Arkansas", code: "AR", slug: "arkansas", dmvName: "DFA", writtenTestQuestions: 25, passCount: 20, minPermitAge: "14" },
  { name: "California", code: "CA", slug: "california", dmvName: "DMV", writtenTestQuestions: 46, passCount: 38, minPermitAge: "15 years 6 months" },
  { name: "Colorado", code: "CO", slug: "colorado", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "15" },
  { name: "Connecticut", code: "CT", slug: "connecticut", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "16" },
  { name: "Delaware", code: "DE", slug: "delaware", dmvName: "DMV", writtenTestQuestions: 30, passCount: 24, minPermitAge: "16" },
  { name: "District of Columbia", code: "DC", slug: "district-of-columbia", dmvName: "DC DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "16" },
  { name: "Florida", code: "FL", slug: "florida", dmvName: "FLHSMV", writtenTestQuestions: 50, passCount: 40, minPermitAge: "15" },
  { name: "Georgia", code: "GA", slug: "georgia", dmvName: "DDS", writtenTestQuestions: 40, passCount: 30, minPermitAge: "15" },
  { name: "Hawaii", code: "HI", slug: "hawaii", dmvName: "DMV", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15 years 6 months" },
  { name: "Idaho", code: "ID", slug: "idaho", dmvName: "ITD", writtenTestQuestions: 40, passCount: 34, minPermitAge: "14 years 6 months" },
  { name: "Illinois", code: "IL", slug: "illinois", dmvName: "SOS", writtenTestQuestions: 35, passCount: 28, minPermitAge: "15" },
  { name: "Indiana", code: "IN", slug: "indiana", dmvName: "BMV", writtenTestQuestions: 34, passCount: 28, minPermitAge: "15" },
  { name: "Iowa", code: "IA", slug: "iowa", dmvName: "DOT", writtenTestQuestions: 35, passCount: 28, minPermitAge: "14" },
  { name: "Kansas", code: "KS", slug: "kansas", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "14" },
  { name: "Kentucky", code: "KY", slug: "kentucky", dmvName: "DMV", writtenTestQuestions: 40, passCount: 32, minPermitAge: "16" },
  { name: "Louisiana", code: "LA", slug: "louisiana", dmvName: "OMV", writtenTestQuestions: 40, passCount: 32, minPermitAge: "15" },
  { name: "Maine", code: "ME", slug: "maine", dmvName: "BMV", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15" },
  { name: "Maryland", code: "MD", slug: "maryland", dmvName: "MVA", writtenTestQuestions: 25, passCount: 22, minPermitAge: "15 years 9 months" },
  { name: "Massachusetts", code: "MA", slug: "massachusetts", dmvName: "RMV", writtenTestQuestions: 25, passCount: 18, minPermitAge: "16" },
  { name: "Michigan", code: "MI", slug: "michigan", dmvName: "SOS", writtenTestQuestions: 50, passCount: 40, minPermitAge: "14 years 9 months" },
  { name: "Minnesota", code: "MN", slug: "minnesota", dmvName: "DVS", writtenTestQuestions: 40, passCount: 32, minPermitAge: "15" },
  { name: "Mississippi", code: "MS", slug: "mississippi", dmvName: "DPS", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15" },
  { name: "Missouri", code: "MO", slug: "missouri", dmvName: "DOR", writtenTestQuestions: 25, passCount: 20, minPermitAge: "15" },
  { name: "Montana", code: "MT", slug: "montana", dmvName: "MVD", writtenTestQuestions: 33, passCount: 27, minPermitAge: "14 years 6 months" },
  { name: "Nebraska", code: "NE", slug: "nebraska", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "14" },
  { name: "Nevada", code: "NV", slug: "nevada", dmvName: "DMV", writtenTestQuestions: 50, passCount: 40, minPermitAge: "15 years 6 months" },
  { name: "New Hampshire", code: "NH", slug: "new-hampshire", dmvName: "DMV", writtenTestQuestions: 40, passCount: 32, minPermitAge: "15 years 6 months" },
  { name: "New Jersey", code: "NJ", slug: "new-jersey", dmvName: "MVC", writtenTestQuestions: 50, passCount: 40, minPermitAge: "16" },
  { name: "New Mexico", code: "NM", slug: "new-mexico", dmvName: "MVD", writtenTestQuestions: 25, passCount: 20, minPermitAge: "15" },
  { name: "New York", code: "NY", slug: "new-york", dmvName: "DMV", writtenTestQuestions: 20, passCount: 14, minPermitAge: "16" },
  { name: "North Carolina", code: "NC", slug: "north-carolina", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "15" },
  { name: "North Dakota", code: "ND", slug: "north-dakota", dmvName: "DOT", writtenTestQuestions: 25, passCount: 20, minPermitAge: "14" },
  { name: "Ohio", code: "OH", slug: "ohio", dmvName: "BMV", writtenTestQuestions: 40, passCount: 30, minPermitAge: "15 years 6 months" },
  { name: "Oklahoma", code: "OK", slug: "oklahoma", dmvName: "DPS", writtenTestQuestions: 50, passCount: 40, minPermitAge: "15 years 6 months" },
  { name: "Oregon", code: "OR", slug: "oregon", dmvName: "DMV", writtenTestQuestions: 35, passCount: 28, minPermitAge: "15" },
  { name: "Pennsylvania", code: "PA", slug: "pennsylvania", dmvName: "PennDOT", writtenTestQuestions: 18, passCount: 15, minPermitAge: "16" },
  { name: "Rhode Island", code: "RI", slug: "rhode-island", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "16" },
  { name: "South Carolina", code: "SC", slug: "south-carolina", dmvName: "DMV", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15" },
  { name: "South Dakota", code: "SD", slug: "south-dakota", dmvName: "DPS", writtenTestQuestions: 25, passCount: 20, minPermitAge: "14" },
  { name: "Tennessee", code: "TN", slug: "tennessee", dmvName: "DDS", writtenTestQuestions: 30, passCount: 24, minPermitAge: "15" },
  { name: "Texas", code: "TX", slug: "texas", dmvName: "DPS", writtenTestQuestions: 30, passCount: 21, minPermitAge: "15" },
  { name: "Utah", code: "UT", slug: "utah", dmvName: "DLD", writtenTestQuestions: 50, passCount: 40, minPermitAge: "15" },
  { name: "Vermont", code: "VT", slug: "vermont", dmvName: "DMV", writtenTestQuestions: 20, passCount: 16, minPermitAge: "15" },
  { name: "Virginia", code: "VA", slug: "virginia", dmvName: "DMV", writtenTestQuestions: 35, passCount: 28, minPermitAge: "15 years 6 months" },
  { name: "Washington", code: "WA", slug: "washington", dmvName: "DOL", writtenTestQuestions: 40, passCount: 32, minPermitAge: "15" },
  { name: "West Virginia", code: "WV", slug: "west-virginia", dmvName: "DMV", writtenTestQuestions: 25, passCount: 20, minPermitAge: "15" },
  { name: "Wisconsin", code: "WI", slug: "wisconsin", dmvName: "DMV", writtenTestQuestions: 50, passCount: 40, minPermitAge: "15 years 6 months" },
  { name: "Wyoming", code: "WY", slug: "wyoming", dmvName: "WYDOT", writtenTestQuestions: 25, passCount: 20, minPermitAge: "15" },
];

export const states: State[] = STATE_ROWS.map((s) => ({
  ...s,
  passingScore: Math.round((s.passCount / s.writtenTestQuestions) * 100),
}));

// Helper function to get state by slug
export function getStateBySlug(slug: string): State | undefined {
  return states.find((state) => state.slug === slug);
}

// Helper function to get state by code
export function getStateByCode(code: string): State | undefined {
  return states.find((state) => state.code === code);
}

export type PermitAgeLang = "en" | "es" | "vi" | "ko" | "zh";

/**
 * A state's minimum permit age as a phrase in the page's language.
 * minPermitAge is "15" or "15 years 6 months"; this gives "15 years old" /
 * "15 years and 6 months old", "15 años y 6 meses", "15 tuổi 6 tháng",
 * "15세 6개월" and "15岁6个月". Templates must not add their own unit.
 */
export function permitAgeText(minPermitAge: string, lang: PermitAgeLang): string {
  const m = minPermitAge.match(/^(\d+)(?:\s+years?\s+(\d+)\s+months?)?$/);
  if (!m) return minPermitAge;
  const years = m[1];
  const months = m[2];
  switch (lang) {
    case "es":
      return months ? `${years} años y ${months} meses` : `${years} años`;
    case "vi":
      return months ? `${years} tuổi ${months} tháng` : `${years} tuổi`;
    case "ko":
      return months ? `${years}세 ${months}개월` : `${years}세`;
    case "zh":
      return months ? `${years}岁${months}个月` : `${years}岁`;
    default:
      return months ? `${years} years and ${months} months old` : `${years} years old`;
  }
}
