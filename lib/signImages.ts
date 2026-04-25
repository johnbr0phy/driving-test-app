// Maps a questionId to a sign asset id (file at /public/signs/<id>.svg).
// Add to this map as more sign images are sourced; questions not present here
// render normally without an image.
export const SIGN_BY_QUESTION_ID: Record<string, string> = {
  "U-001": "stop",
  "U-002": "warning-diamond",
  "U-003": "yield",
  "U-004": "railroad-crossing-circle",
  "U-005": "school-zone",
  "U-008": "construction-zone",
  "U-009": "signal-flashing-red",
  "U-010": "signal-flashing-yellow",
  "U-011": "regulatory-rect",
  "U-012": "no-passing-pennant",
  "U-015": "curve-left",
  "U-016": "two-way-traffic",
  "U-017": "merge",
  "U-018": "deer-crossing",
  "U-020": "slippery-road",
  "U-021": "steep-grade",
  "U-022": "wrong-way",
  "U-023": "do-not-enter",
  "U-024": "divided-highway",
  "U-025": "bumps",
  "U-026": "no-u-turn",
  "U-027": "crosswalk",
  "U-030": "yield",
  "U-031": "speed-limit",
  "U-034": "one-way",
  "U-035": "handicap-parking",
  "U-036": "hov-lane",
  "U-037": "keep-right",
  "U-038": "lane-ends",
  "U-039": "railroad-crossbuck",
  "U-040": "winding-road",
  "U-041": "side-road",
  "U-042": "stop-ahead",
  "U-043": "signal-ahead",
  "U-044": "chevron",
  "U-045": "low-clearance",
  "U-049": "bike-lane",
  "U-050": "no-turn-on-red",
};

export function getSignIdForQuestion(questionId: string): string | null {
  return SIGN_BY_QUESTION_ID[questionId] ?? null;
}
