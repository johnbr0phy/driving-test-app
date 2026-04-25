/**
 * Generate one stylized landscape background per US state for use behind
 * road-sign images. Output: /public/backgrounds/<STATE_CODE>.webp
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-backgrounds.ts
 *   PROVIDER=google GOOGLE_API_KEY=... npx tsx scripts/generate-backgrounds.ts
 *
 * Optional flags:
 *   ONLY=CA,TX     Only generate these states
 *   FORCE=1        Re-generate even if file already exists
 *
 * Style is locked via STYLE_PROMPT — change it once and all 51 stay consistent.
 * Per-state variation is just the landmark/scene phrase.
 */

import { writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { states } from "../data/states";

const PROVIDER = (process.env.PROVIDER ?? "openai").toLowerCase();
const OUT_DIR = join(process.cwd(), "public", "backgrounds");
const ONLY = process.env.ONLY?.split(",").map((s) => s.trim().toUpperCase());
const FORCE = process.env.FORCE === "1";

const STYLE_PROMPT = [
  "minimalist flat-illustration landscape",
  "soft pastel palette",
  "low contrast, gentle morning light",
  "wide horizon, simplified shapes, smooth gradients",
  "no text, no road signs, no signage of any kind, no vehicles, no people",
  "16:9 composition, empty foreground, sky takes upper third",
  "consistent illustration style across the series",
].join(", ");

const STATE_SCENES: Record<string, string> = {
  AL: "rolling pine forest hills with a calm river bend, southern foliage",
  AK: "snow-covered mountains, glacier valley, spruce trees in foreground",
  AZ: "sonoran desert mesa with saguaro cacti and red rock buttes",
  AR: "ozark mountain ridges with autumn hardwood forest",
  CA: "golden rolling hills with scattered oak trees, distant pacific coastline",
  CO: "snow-capped rocky mountain peaks, alpine meadow, pine trees",
  CT: "new england countryside with maple trees and a white church steeple in distance",
  DE: "coastal marshland with tall grasses and a flat horizon",
  DC: "stylized capital cityscape silhouette with monuments at dusk",
  FL: "palm trees, flat coastal wetland, pink and orange sky",
  GA: "peach orchards and red clay rolling hills, magnolia trees",
  HI: "tropical volcanic ridge, palm trees, turquoise ocean horizon",
  ID: "potato fields with distant snowy sawtooth mountains",
  IL: "flat midwestern prairie with a single farmhouse and silo",
  IN: "rolling cornfield with red barn and cumulus clouds",
  IA: "vast cornfields with grain silo and wide blue sky",
  KS: "endless wheat plains with a single windmill on the horizon",
  KY: "bluegrass horse country with white fences and rolling hills",
  LA: "bayou cypress trees with hanging spanish moss, still water",
  ME: "rocky atlantic coastline with lighthouse and pine forest",
  MD: "chesapeake bay shoreline with sailboats and lighthouse",
  MA: "new england harbor with autumn maples and colonial rooftops",
  MI: "great lakes shoreline with birch forest and cool blue water",
  MN: "northwoods lake surrounded by pine and birch trees",
  MS: "magnolia forest along a slow river, southern light",
  MO: "ozark river valley with hardwood forest and limestone bluff",
  MT: "big sky over rolling plains with distant rocky mountains",
  NE: "great plains with a single windmill and prairie grass",
  NV: "high desert basin with sagebrush and distant mountain ranges",
  NH: "white mountain peaks with autumn foliage in foreground",
  NJ: "atlantic shore boardwalk dunes with sea grass and ocean",
  NM: "high desert mesas with adobe cliffs and turquoise sky",
  NY: "stylized new york city skyline silhouette across a river",
  NC: "blue ridge mountain ridges fading into mist",
  ND: "vast prairie with rolling badlands in the distance",
  OH: "midwest farmland with rolling hills and a covered bridge",
  OK: "wide red-earth plains with mesas and prairie grass",
  OR: "evergreen forest with a snow-capped volcano in the distance",
  PA: "rolling allegheny mountains with autumn forests and farms",
  RI: "narragansett bay coastline with sailboats and lighthouse",
  SC: "lowcountry marsh with palmetto trees and tidal creeks",
  SD: "black hills granite peaks with pine forest",
  TN: "great smoky mountain ridges with morning mist",
  TX: "wide hill country with bluebonnets, longhorn silhouette in distance",
  UT: "red rock canyon mesas with hoodoos and arches",
  VT: "green mountain ridges with autumn maples and a covered bridge",
  VA: "shenandoah valley rolling farmland with blue ridge in distance",
  WA: "evergreen forest with mount rainier in the distance",
  WV: "appalachian mountain hollow with dense forest and river",
  WI: "dairy farmland with red barn, silo, and rolling green hills",
  WY: "wide grand teton mountain peaks above prairie grassland",
};

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function generateOpenAI(prompt: string): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required");

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
      quality: "high",
      n: 1,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as { data: { b64_json: string }[] };
  return Buffer.from(json.data[0].b64_json, "base64");
}

async function generateGoogle(prompt: string): Promise<Buffer> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY is required");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: "16:9" },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Google ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as {
    predictions: { bytesBase64Encoded: string }[];
  };
  return Buffer.from(json.predictions[0].bytesBase64Encoded, "base64");
}

async function generate(prompt: string): Promise<Buffer> {
  if (PROVIDER === "google") return generateGoogle(prompt);
  return generateOpenAI(prompt);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const allCodes = [...states.map((s) => s.code), "DC"];
  const codes = ONLY ? allCodes.filter((c) => ONLY.includes(c)) : allCodes;

  console.log(`Provider: ${PROVIDER}`);
  console.log(`Generating ${codes.length} backgrounds → ${OUT_DIR}\n`);

  for (const code of codes) {
    const scene = STATE_SCENES[code];
    if (!scene) {
      console.warn(`  ${code}: no scene defined, skipping`);
      continue;
    }

    const outPath = join(OUT_DIR, `${code}.webp`);
    if (!FORCE && (await exists(outPath))) {
      console.log(`  ${code}: exists, skipping (FORCE=1 to overwrite)`);
      continue;
    }

    const prompt = `${scene}. ${STYLE_PROMPT}`;
    process.stdout.write(`  ${code}: generating... `);

    try {
      const buf = await generate(prompt);
      await writeFile(outPath, buf);
      console.log(`done (${(buf.length / 1024).toFixed(0)}kb)`);
    } catch (err) {
      console.log(`FAILED — ${(err as Error).message}`);
    }
  }

  console.log("\nDone. Convert PNG→WebP if needed:");
  console.log("  for f in public/backgrounds/*.png; do cwebp -q 80 \"$f\" -o \"${f%.png}.webp\"; done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
