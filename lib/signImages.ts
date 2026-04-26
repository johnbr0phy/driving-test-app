// Maps a questionId to a sign asset id (file at /public/signs/<id>.svg).
// Add to this map as more sign images are sourced; questions not present here
// render normally without an image.
//
// Rule: only map questions that ask for the sign's *meaning* or *required
// behavior*. Skip "what does X look like / what shape / what color is X"
// questions — showing the sign there gives away the answer.
export const SIGN_BY_QUESTION_ID: Record<string, string> = {
  // Skipped (image would reveal answer):
  //   U-001 "What shape is a stop sign?"
  //   U-003 "What color is a yield sign?"
  //   U-005 "What shape indicates a school zone?"
  //   U-008 "What color are construction zone signs?"
  //   U-024 "What does a divided highway sign look like?"
  //   U-026 "What indicates a no U-turn zone?" (answers describe visuals)
  //   U-027 "What does a crosswalk sign look like?"
  //   U-034 "What indicates a one-way street?" (answers describe visuals)
  //   U-042 "What does a stop ahead sign look like?"
  "U-002": "warning-diamond",
  "U-004": "railroad-crossing-circle",
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
  "U-025": "bumps",
  "U-030": "yield",
  "U-031": "speed-limit",
  "U-035": "handicap-parking",
  "U-036": "hov-lane",
  "U-037": "keep-right",
  "U-038": "lane-ends",
  "U-039": "railroad-crossbuck",
  "U-040": "winding-road",
  "U-041": "side-road",
  "U-043": "signal-ahead",
  "U-044": "chevron",
  "U-045": "low-clearance",
  "U-049": "bike-lane",
  "U-050": "no-turn-on-red",
};

export function getSignIdForQuestion(questionId: string): string | null {
  return SIGN_BY_QUESTION_ID[questionId] ?? null;
}
