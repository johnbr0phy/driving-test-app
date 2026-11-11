// Every scene record, one JSON file per bank question. Generated list: keep it
// in step with the files in this folder (tests/drive-records.test.cjs checks).

import r_U_019 from "./double-arrow/U-019.json";
import r_U_009 from "./flashing-signals/U-009.json";
import r_U_012 from "./no-passing-zone/U-012.json";
import r_LA_027 from "./parking-clearance/LA-027.json";
import r_LA_028 from "./parking-clearance/LA-028.json";
import r_NH_031 from "./parking-clearance/NH-031.json";
import r_NH_032 from "./parking-clearance/NH-032.json";
import r_OR_033 from "./parking-clearance/OR-033.json";
import r_SC_029 from "./parking-clearance/SC-029.json";
import r_SC_030 from "./parking-clearance/SC-030.json";
import r_TX_037 from "./parking-clearance/TX-037.json";
import r_U_079 from "./parking-clearance/U-079.json";
import r_U_080 from "./parking-clearance/U-080.json";
import r_U_025 from "./rough-road/U-025.json";

export const DRIVE_RECORDS = [r_U_019, r_U_009, r_U_012, r_LA_027, r_LA_028, r_NH_031, r_NH_032, r_OR_033, r_SC_029, r_SC_030, r_TX_037, r_U_079, r_U_080, r_U_025];

/** The lead (universal) record of each rule: the one /drive/<slug> plays by default. */
const LEADS = {
  "no-passing-zone": "U-012",
  "double-arrow": "U-019",
  "rough-road": "U-025",
  "flashing-signals": "U-009",
  "parking-clearance": "U-080",
};

export function recordsForRule(slug) {
  return DRIVE_RECORDS.filter((record) => record.rule === slug);
}

/**
 * Pick the record for a scene.
 *   q      a question id: that exact record, if it belongs to the rule
 *   state  a two-letter code: that state's record (matching the lead's variant
 *          first), else the universal one, since the rule is the same there
 * @param {string} slug
 * @param {{ state?: string | null, q?: string | null }} [options]
 */
export function getDriveRecord(slug, { state = null, q = null } = {}) {
  const records = recordsForRule(slug);
  if (!records.length) return null;
  const lead = records.find((record) => record.questionId === LEADS[slug]) || records[0];
  if (q) {
    const exact = records.find((record) => record.questionId === q);
    if (exact) return exact;
  }
  const code = typeof state === "string" ? state.toUpperCase() : null;
  if (code) {
    const inState = records.filter((record) => record.state === code);
    const sameVariant = inState.find((record) => record.params?.feature === lead.params?.feature);
    if (sameVariant || inState[0]) return sameVariant || inState[0];
  }
  return lead;
}

/** Problems with a record, as a list of strings. Empty means it is playable. */
export function validateRecord(record) {
  const problems = [];
  const need = (ok, message) => {
    if (!ok) problems.push(`${record.questionId || "?"}: ${message}`);
  };
  need(typeof record.rule === "string", "rule missing");
  need(typeof record.questionId === "string", "questionId missing");
  need(typeof record.state === "string", "state missing");
  need(typeof record.prompt === "string" && record.prompt.length > 0, "prompt missing");
  need(typeof record.ruleText === "string" && record.ruleText.length > 0, "ruleText missing");
  need(record.citation && record.citation.source && record.citation.section && /^https:\/\//.test(record.citation.url || ""), "citation incomplete");
  need(typeof record.verified === "string" && record.verified.length > 0, "verification note missing");
  need(Array.isArray(record.decisions) && record.decisions.length >= 1 && record.decisions.length <= 3, "needs 1 to 3 decisions");
  for (const decision of record.decisions || []) {
    const count = 1 + (decision.wrongActions || []).length;
    need(count >= 2 && count <= 4, `decision ${decision.id} needs 2 to 4 choices`);
    need(decision.correctAction && decision.correctAction.id && decision.correctAction.label, `decision ${decision.id} has no correct action`);
    for (const wrong of decision.wrongActions || []) {
      need(wrong.id && wrong.label && wrong.consequence, `decision ${decision.id} has a wrong action without a consequence`);
    }
    const ids = [decision.correctAction?.id, ...(decision.wrongActions || []).map((w) => w.id)];
    need(new Set(ids).size === ids.length, `decision ${decision.id} repeats an option id`);
  }
  return problems;
}
