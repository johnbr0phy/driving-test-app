/**
 * Builds a mistake explainer's word-timing manifest (public/mistake-explainers/<id>.json)
 * from its voice track and a transcript with word timings.
 *
 * The voice is recorded with the ElevenLabs connector (voice "Benedict - Premium
 * British (RP) Male", 6q6UVsvekS0UjrUXFz79, eleven_multilingual_v2) from the
 * storyboard's lines joined by blank lines, saved as <id>.mp3, then transcribed
 * with eleven_scribe_v1 on the same flow; its words.json is the input here.
 *
 *   npx tsx scripts/build-mistake-explainer-audio.ts <id> path/to/words.json
 *
 * Re-run after editing a line: the player ignores a manifest whose word
 * counts no longer match the storyboard.
 */
import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { captionWords, mistakeExplainerById, type MistakeManifest, type TimedWord } from "../lib/mistakeExplainers";

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");

async function main() {
  const [id, wordsPath] = process.argv.slice(2);
  const ex = id && mistakeExplainerById(id);
  if (!ex || !wordsPath) throw new Error("usage: <explainer id> <words.json>");
  const raw = JSON.parse(await readFile(wordsPath, "utf8"));
  const spoken: { text: string; start: number; end: number }[] = (raw.words ?? raw).filter((w: { type?: string }) => !w.type || w.type === "word");

  // Walk written words in order, matching each to the next spoken word with the same text.
  let si = 0;
  let misses = 0;
  const beats = ex.beats.map((b) => {
    const words: TimedWord[] = captionWords(b.say).map((w) => {
      const j = spoken.findIndex((s, k) => k >= si && k < si + 4 && norm(s.text) === norm(w));
      const hit = j >= 0 ? spoken[j] : spoken[Math.min(si, spoken.length - 1)];
      if (j < 0) misses++;
      si = (j >= 0 ? j : si) + 1;
      return { w, start: +hit.start.toFixed(3), end: +hit.end.toFixed(3) };
    });
    return { id: b.id, start: words[0].start, end: words[words.length - 1].end, words };
  });
  const mp3 = `public/mistake-explainers/${id}.mp3`;
  const duration = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp3]).toString().trim();
  const manifest: MistakeManifest = { id, duration: +(duration + 2.2).toFixed(3), beats };
  await writeFile(`public/mistake-explainers/${id}.json`, JSON.stringify(manifest) + "\n");
  console.log(`${id}: ${duration.toFixed(1)}s audio, ${beats.reduce((n, b) => n + b.words.length, 0)} words, ${misses} unmatched`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
