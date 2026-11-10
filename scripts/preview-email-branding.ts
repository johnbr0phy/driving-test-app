/** Local-only previews: no provider connection, account reads or sends. */
import fs from "node:fs";
import path from "node:path";
import { EMAIL_TEMPLATES, exitQuestionEmail } from "../lib/email-templates";
import { voiceFor } from "../lib/email-voice";

const out = process.argv[2] || "/tmp/email-brand-review";
fs.mkdirSync(out, { recursive: true });
for (const id of ["ccma", "dmv", "sat", "unknown"]) {
  const voice = voiceFor(id);
  for (const name of ["welcome", "secondTestNudge", "purchaseWelcome", "superAmazingUnlocked"]) {
    save(`${id}-${name}`, EMAIL_TEMPLATES[name](voice));
  }
  for (const isCorrect of [false, true]) save(`${id}-exit-${isCorrect ? "correct" : "wrong"}`, exitQuestionEmail(voice, {
    question: "Which action helps confirm a patient's identity?",
    options: ["Use the room number alone.", "Use two patient identifiers.", "Ask another patient."],
    answer: "Use two patient identifiers.",
    explanation: "Follow the facility's identification procedure. A room number is not a patient identifier. Fictional preview only.",
    isCorrect,
  }));
}
function save(name: string, html: string) {
  html = html.replaceAll("{{greeting}}", "Hey Alex,").replaceAll("{{unsubscribeToken}}", "PREVIEW-NOT-A-REAL-TOKEN");
  // Inline the repository's actual assets for offline review only.
  html = html.replace(/https:\/\/www.tigertest.io(\/(?:tigers\/[^/]+\/)?tiger(?:_face_\d+)?\.png)/g, (_match, asset) =>
    `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public", asset)).toString("base64")}`);
  fs.writeFileSync(path.join(out, `${name}.html`), html);
}
console.log(`Saved local previews to ${out}`);
