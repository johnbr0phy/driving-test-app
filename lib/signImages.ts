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

// Describe only visible shapes, symbols and printed words. Do not supply the
// meaning or required driving action: those are what the question assesses.
export const SIGN_DESCRIPTIONS: Record<string, string> = {
  "warning-diamond": "Yellow diamond with a black arrow bending sharply to the right.",
  "railroad-crossing-circle": "Yellow circle with a black X and an R on each side.",
  "signal-flashing-red": "Vertical traffic signal with the top red lamp illuminated and rings around it; the yellow and green lamps are dark.",
  "signal-flashing-yellow": "Vertical traffic signal with the middle yellow lamp illuminated and rings around it; the red and green lamps are dark.",
  "regulatory-rect": "White upright rectangle with red words NO PARKING ANY TIME and a left-pointing arrow.",
  "no-passing-pennant": "Yellow triangular pennant pointing right with a black border.",
  "curve-left": "Yellow diamond with a black upward arrow curving to the left.",
  "two-way-traffic": "Yellow diamond with two black arrows side by side: the left arrow points down and the right arrow points up.",
  "merge": "Yellow diamond with a black upward arrow and a diagonal branch joining it from the lower right.",
  "deer-crossing": "Yellow diamond with a black silhouette of a leaping deer.",
  "slippery-road": "Yellow diamond with a black car and two wavy tracks behind it.",
  "steep-grade": "Yellow diamond with a black truck tilted down a slope to the left.",
  "wrong-way": "Red horizontal rectangle with the white words WRONG WAY.",
  "do-not-enter": "Red circle with a white horizontal bar and the white words DO NOT ENTER.",
  "bumps": "Yellow diamond with the black word BUMP.",
  "yield": "Downward-pointing triangle with a red border, white centre and the word YIELD.",
  "speed-limit": "White upright rectangle with the black words SPEED LIMIT above the number 50.",
  "handicap-parking": "White rectangle with green words RESERVED PARKING, a white wheelchair symbol on a blue square and a green double-headed horizontal arrow.",
  "hov-lane": "White upright rectangle with a white diamond in a black top panel, followed by HOV 2+ ONLY and 2 OR MORE PERSONS PER VEHICLE.",
  "keep-right": "White rectangle with a black shape on the left and an upward arrow bending around its right side.",
  "lane-ends": "Yellow diamond with two black lane edges: the left edge is straight and the right edge bends left. A dashed vertical line separates them below the bend.",
  "railroad-crossbuck": "Two white boards crossing in an X, with the black words RAILROAD CROSSING.",
  "winding-road": "Yellow diamond with a black upward arrow bending repeatedly left and right.",
  "side-road": "Yellow diamond with a thick black vertical line and a short horizontal branch extending right.",
  "signal-ahead": "Yellow diamond showing a vertical traffic signal with red, yellow and green lamps.",
  "chevron": "Yellow rectangle with a thick black left-pointing chevron.",
  "low-clearance": "Yellow diamond with 12 feet 6 inches between an upward arrow and a downward arrow.",
  "bike-lane": "Green rectangle with a white bicycle symbol and the words BIKE ROUTE.",
  "no-turn-on-red": "White upright rectangle with the black words NO TURN ON RED and a red circle below.",
};
