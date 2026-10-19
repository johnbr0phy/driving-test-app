/** Prints every header logo as JSON for tools/build_logo_svgs.py: npx tsx scripts/logo-manifest.ts */
import { ALL_EXAMS } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { getTigerAsset, hasTigerSet } from "@/lib/tigerAssets";
import { states } from "@/data/states";

const logos = [
  { id: "dmv", subtitle: "DMV Practice Test", tiger: "/tiger.png", theme: "dmv" },
  ...states.map((s) => ({ id: `dmv/${s.slug}`, subtitle: `${s.name} DMV Practice Test`, tiger: "/tiger.png", theme: "dmv" })),
  ...ALL_EXAMS.map((e) => {
    const family = e.variantOf ?? e.id;
    return { id: e.variantOf ? `${family}-${e.jurisdiction?.code.toLowerCase()}` : e.id, subtitle: e.name, tiger: getTigerAsset(hasTigerSet(family) ? family : "dmv"), theme: family };
  }),
  ...EXAMS_V2.map((e) => ({ id: e.id, subtitle: e.name, tiger: getTigerAsset(hasTigerSet(e.id) ? e.id : "dmv"), theme: e.id, brand: e.theme.brand })),
];

console.log(JSON.stringify(logos));
