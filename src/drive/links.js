// Which bank questions have a scene. Tiny on purpose: this is the only drive
// file the ordinary question pages import (for the "Drive this question" link).

export const DRIVE_QUESTION_LINKS = {
  "U-012": { slug: "no-passing-zone" },
  "U-056": { slug: "no-passing-zone" },
  "U-081": { slug: "no-passing-zone" },
  "U-019": { slug: "double-arrow" },
  "U-025": { slug: "rough-road" },
  "U-009": { slug: "flashing-signals" },
  "U-010": { slug: "flashing-signals" },
  "U-080": { slug: "parking-clearance" },
  "U-079": { slug: "parking-clearance", q: "U-079" },
  "TX-037": { slug: "parking-clearance", state: "TX" },
  "LA-028": { slug: "parking-clearance", state: "LA" },
  "LA-027": { slug: "parking-clearance", state: "LA", q: "LA-027" },
  "NH-032": { slug: "parking-clearance", state: "NH" },
  "NH-031": { slug: "parking-clearance", state: "NH", q: "NH-031" },
  "SC-030": { slug: "parking-clearance", state: "SC" },
  "SC-029": { slug: "parking-clearance", state: "SC", q: "SC-029" },
  "OR-033": { slug: "parking-clearance", state: "OR", q: "OR-033" },
};

/** Path of the scene for a bank question, or null when it has none. */
export function drivePathForQuestion(questionId) {
  const link = DRIVE_QUESTION_LINKS[questionId];
  if (!link) return null;
  const params = new URLSearchParams();
  if (link.state) params.set("state", link.state);
  if (link.q) params.set("q", link.q);
  const query = params.toString();
  return `/drive/${link.slug}${query ? `?${query}` : ""}`;
}
