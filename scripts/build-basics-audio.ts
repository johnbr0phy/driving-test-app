/**
 * Voice for the Basics explainers: one mp3 and one timing manifest per skill
 * in public/basics-audio/, read by components/v2/BasicsExplainer.tsx.
 *
 * The spoken script is built by `buildExplainer()` in lib/v2/explainer.ts,
 * the same function the player uses, so the words on screen and the words
 * in the audio can never drift apart. A manifest whose word counts no
 * longer match the storyboard is ignored by the player, so re-run this
 * after editing a skill's copy.
 *
 * Generate with ElevenLabs (needs ELEVENLABS_API_KEY; optional
 * ELEVENLABS_VOICE_ID and ELEVENLABS_MODEL_ID):
 *   npx tsx scripts/build-basics-audio.ts semicolons colons
 *   npx tsx scripts/build-basics-audio.ts --all          # every explainable skill, skips existing
 *   npx tsx scripts/build-basics-audio.ts --all --force  # regenerate everything
 *
 * Or build the manifest for audio made elsewhere (the ElevenLabs connector,
 * a studio export) from its transcript word timings, a JSON array of
 * { text, start, end } in seconds:
 *   npx tsx scripts/build-basics-audio.ts --align semicolons path/to/voice.mp3 path/to/words.json
 *
 * Print the script a skill would be read, without generating:
 *   npx tsx scripts/build-basics-audio.ts --script semicolons
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import grammar from "../data/v2/basics/skills.json";
import reading from "../data/v2/basics/reading.json";
import math from "../data/v2/basics/math.json";
import science from "../data/v2/basics/science.json";
import writing from "../data/v2/basics/writing.json";
import type { BasicsSkill } from "../lib/v2/basics";
import { canExplain, buildExplainer, words, type ExplainerBeat, type ExplainerManifest, type ExplainerWord } from "../lib/v2/explainer";

const OUT_DIR = join(process.cwd(), "public", "basics-audio");
const DEFAULT_VOICE = "6q6UVsvekS0UjrUXFz79"; // Benedict - Premium British (RP) Male
const DEFAULT_MODEL = "eleven_multilingual_v2";

const LIBRARY = ([...grammar, ...reading, ...math, ...science, ...writing] as BasicsSkill[]);

/** Beats are read with a blank line between them so the voice pauses. */
export function scriptText(beats: ExplainerBeat[]) {
  return beats.map((b) => b.say).join("\n\n");
}

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/**
 * Give every script word a time by walking the spoken words in order.
 * A script word that the transcript dropped or merged gets the time of its
 * neighbours; a spoken word with no script match is skipped.
 */
export function alignWords(script: string[], spoken: ExplainerWord[]): ExplainerWord[] {
  const out: (ExplainerWord | null)[] = [];
  let j = 0;
  for (const w of script) {
    const key = norm(w);
    let hit = -1;
    for (let k = j; k < Math.min(spoken.length, j + 4); k++) {
      if (norm(spoken[k].text) === key) {
        hit = k;
        break;
      }
    }
    if (hit >= 0) {
      out.push({ text: w, start: spoken[hit].start, end: spoken[hit].end });
      j = hit + 1;
    } else if (key === "") {
      // Pure punctuation such as "(" or ";" is not spoken; it rides with the previous word.
      out.push(null);
    } else {
      out.push(null);
    }
  }
  // Fill gaps from the nearest timed neighbours.
  const timed: ExplainerWord[] = [];
  for (let i = 0; i < out.length; i++) {
    if (out[i]) {
      timed.push(out[i]!);
      continue;
    }
    let prev = i - 1;
    while (prev >= 0 && !out[prev]) prev--;
    let next = i + 1;
    while (next < out.length && !out[next]) next++;
    const p = prev >= 0 ? out[prev]! : null;
    const n = next < out.length ? out[next]! : null;
    const start = p ? p.end : n ? Math.max(0, n.start - 0.3) : 0;
    const end = n ? n.start : start + 0.3;
    const w = { text: script[i], start, end: Math.max(end, start) };
    out[i] = w;
    timed.push(w);
  }
  return timed;
}

/** Split the script into beats again and pick each beat's window. */
export function manifestFor(skill: BasicsSkill, beats: ExplainerBeat[], timedWords: ExplainerWord[], voice: string, model: string): ExplainerManifest {
  let at = 0;
  const windows = beats.map((b) => {
    const n = words(b.say).length;
    const slice = timedWords.slice(at, at + n);
    at += n;
    return { id: b.id, words: slice };
  });
  const out: ExplainerManifest["beats"] = [];
  windows.forEach((w, i) => {
    const firstStart = w.words[0]?.start ?? (out[i - 1]?.end ?? 0);
    const prevEnd = out[i - 1]?.end ?? 0;
    // The card appears a beat before the voice starts on it.
    const start = i === 0 ? 0 : Math.max(prevEnd, firstStart - 0.35);
    out.push({ id: w.id, start, end: start, words: w.words });
    if (i > 0) out[i - 1].end = start;
  });
  const last = out[out.length - 1];
  const lastWord = last.words[last.words.length - 1];
  last.end = (lastWord?.end ?? last.start) + 1.2;
  return { skillId: skill.id, voice, model, duration: last.end, beats: out };
}

/** ElevenLabs' character alignment, turned into spoken words with times. */
function wordsFromAlignment(a: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] }): ExplainerWord[] {
  const out: ExplainerWord[] = [];
  let cur = "";
  let start = 0;
  let end = 0;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      if (cur) out.push({ text: cur, start, end });
      cur = "";
      return;
    }
    if (!cur) start = a.character_start_times_seconds[i];
    cur += ch;
    end = a.character_end_times_seconds[i];
  });
  if (cur) out.push({ text: cur, start, end });
  return out;
}

async function generate(skill: BasicsSkill, apiKey: string, voice: string, model: string) {
  const beats = buildExplainer(skill);
  const text = scriptText(beats);
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_64`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({ text, model_id: model, voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.2 } }),
  });
  if (!res.ok) throw new Error(`${skill.id}: ElevenLabs ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { audio_base64: string; alignment: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] } };
  const spoken = wordsFromAlignment(data.alignment);
  const timed = alignWords(words(text), spoken);
  const manifest = manifestFor(skill, beats, timed, voice, model);
  await writeFile(join(OUT_DIR, `${skill.id}.mp3`), Buffer.from(data.audio_base64, "base64"));
  await writeFile(join(OUT_DIR, `${skill.id}.json`), JSON.stringify(manifest) + "\n");
  console.log(`${skill.id}: ${manifest.duration.toFixed(1)}s, ${timed.length} words`);
}

async function align(skillId: string, audioPath: string, wordsPath: string) {
  const skill = LIBRARY.find((s) => s.id === skillId);
  if (!skill) throw new Error(`unknown skill ${skillId}`);
  const beats = buildExplainer(skill);
  type RawWord = { text?: string; word?: string; start: number; end: number; type?: string };
  // A bare array, or ElevenLabs' transcript download shape `{ words: [...] }`.
  const parsed = JSON.parse(await readFile(wordsPath, "utf8")) as RawWord[] | { words: RawWord[] };
  const raw = Array.isArray(parsed) ? parsed : parsed.words;
  const spoken: ExplainerWord[] = raw.filter((w) => w.type === undefined || w.type === "word").map((w) => ({ text: w.text ?? w.word ?? "", start: w.start, end: w.end }));
  const timed = alignWords(words(scriptText(beats)), spoken);
  const manifest = manifestFor(skill, beats, timed, "external", "external");
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(join(OUT_DIR, `${skill.id}.mp3`), await readFile(audioPath));
  await writeFile(join(OUT_DIR, `${skill.id}.json`), JSON.stringify(manifest) + "\n");
  console.log(`${skill.id}: ${manifest.duration.toFixed(1)}s, ${timed.length} words aligned from ${spoken.length} spoken`);
}

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === "--script") {
    const skill = LIBRARY.find((s) => s.id === args[1]);
    if (!skill) throw new Error(`unknown skill ${args[1]}`);
    console.log(scriptText(buildExplainer(skill)));
    return;
  }
  if (args[0] === "--align") {
    await align(args[1], args[2], args[3]);
    return;
  }
  const force = args.includes("--force");
  const ids = args.includes("--all") ? LIBRARY.filter(canExplain).map((s) => s.id) : args.filter((a) => !a.startsWith("--"));
  if (ids.length === 0) throw new Error("name skills, or pass --all");
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set");
  const voice = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE;
  const model = process.env.ELEVENLABS_MODEL_ID ?? DEFAULT_MODEL;
  await mkdir(OUT_DIR, { recursive: true });
  for (const id of ids) {
    const skill = LIBRARY.find((s) => s.id === id);
    if (!skill) throw new Error(`unknown skill ${id}`);
    if (!canExplain(skill)) {
      console.log(`${id}: no explainer template for this skill yet, skipped`);
      continue;
    }
    if (!force && (await exists(join(OUT_DIR, `${id}.json`)))) {
      console.log(`${id}: already built, skipped (use --force)`);
      continue;
    }
    await generate(skill, apiKey, voice, model);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
