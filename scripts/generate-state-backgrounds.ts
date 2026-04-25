// Generate 51 stylized state-themed SVG backgrounds for road-sign questions.
// Run: npx tsx scripts/generate-state-backgrounds.ts
// Output: /public/backgrounds/<CODE>.svg

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

type Palette = {
  skyTop: string; skyMid: string; skyBot: string;
  ground: string; hill: string; far: string;
  accent: string; sun: string; sunTone: string;
};

const P = {
  warm:    { skyTop: "#FBE7C6", skyMid: "#F8C6A8", skyBot: "#E89A87", ground: "#9DBE8E", hill: "#B4926E", far: "#C8A484", accent: "#7A5A48", sun: "#FFE9C9", sunTone: "warm" },
  cool:    { skyTop: "#DCE8EE", skyMid: "#B8D0DD", skyBot: "#8FB4C6", ground: "#A6BFA8", hill: "#7E94A2", far: "#9BAEBA", accent: "#4A5C68", sun: "#F5F1E5", sunTone: "cool" },
  desert:  { skyTop: "#F8E0B8", skyMid: "#F0B898", skyBot: "#D88078", ground: "#C8956D", hill: "#A66848", far: "#C99078", accent: "#7A3F2D", sun: "#FFE4A8", sunTone: "warm" },
  forest:  { skyTop: "#E8E5C8", skyMid: "#C8C695", skyBot: "#9BAA78", ground: "#6E8A5C", hill: "#5A7048", far: "#7A8E6C", accent: "#3D4D32", sun: "#FFF4D0", sunTone: "warm" },
  coast:   { skyTop: "#DCE8E8", skyMid: "#B8D0D0", skyBot: "#88B0B8", ground: "#A8C0A0", hill: "#8AA098", far: "#9CB8B0", accent: "#3E5A5C", sun: "#F5F1E5", sunTone: "cool" },
  alpine:  { skyTop: "#D8E4ED", skyMid: "#B0C4D5", skyBot: "#88A4BC", ground: "#9EB098", hill: "#7E948A", far: "#9CB0B8", accent: "#3E5060", sun: "#F8F2E0", sunTone: "cool" },
  prairie: { skyTop: "#F5E5B8", skyMid: "#F0C898", skyBot: "#D89878", ground: "#C8A868", hill: "#9E7E4A", far: "#B89878", accent: "#5E4528", sun: "#FFE9A8", sunTone: "warm" },
  bayou:   { skyTop: "#E8DCB8", skyMid: "#C8B898", skyBot: "#A89870", ground: "#788868", hill: "#5E6E50", far: "#7A8870", accent: "#384028", sun: "#F8E8C0", sunTone: "warm" },
  urban:   { skyTop: "#F0CCB0", skyMid: "#E8A090", skyBot: "#C87878", ground: "#88787A", hill: "#5A5860", far: "#787078", accent: "#2E2A30", sun: "#FFD8A0", sunTone: "warm" },
  tropical:{ skyTop: "#F8D8C0", skyMid: "#F0A8B8", skyBot: "#C880A0", ground: "#88B888", hill: "#5C8868", far: "#789C7A", accent: "#2E5A3E", sun: "#FFE0B8", sunTone: "warm" },
} satisfies Record<string, Palette>;

const sky = (p: Palette) => `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="${p.skyTop}"/><stop offset="55%" stop-color="${p.skyMid}"/><stop offset="100%" stop-color="${p.skyBot}"/>
</linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/>
<circle cx="1300" cy="180" r="70" fill="${p.sun}" opacity="0.85"/>`;

const ground = (p: Palette) => `<path d="M0 720 Q 400 690 800 705 T 1600 700 L 1600 900 L 0 900 Z" fill="${p.ground}"/>
<path d="M0 760 Q 500 740 1000 755 T 1600 750 L 1600 900 L 0 900 Z" fill="${p.ground}" opacity="0.7"/>`;

// === SCENE HELPERS — each returns mid-layer SVG ===

const snowMountain = (p: Palette) => `
<polygon points="0,720 200,440 380,640 520,520 720,720" fill="${p.far}"/>
<polygon points="200,440 270,490 320,460 380,640" fill="#F5F0E8" opacity="0.85"/>
<polygon points="520,520 580,560 620,540 720,720" fill="#F5F0E8" opacity="0.7"/>
<polygon points="600,720 820,500 980,640 1180,470 1400,720" fill="${p.hill}"/>
<polygon points="820,500 880,540 920,510 980,640" fill="#FFFFFF" opacity="0.9"/>
<polygon points="1180,470 1240,510 1280,485 1400,720" fill="#FFFFFF" opacity="0.9"/>`;

const mesa = (p: Palette) => `
<rect x="100" y="540" width="380" height="180" fill="${p.far}"/>
<polygon points="100,540 480,540 460,520 120,520" fill="${p.hill}"/>
<rect x="700" y="500" width="500" height="220" fill="${p.hill}"/>
<polygon points="700,500 1200,500 1180,478 720,478" fill="${p.accent}" opacity="0.6"/>
<rect x="1280" y="580" width="180" height="140" fill="${p.far}" opacity="0.85"/>`;

const cactus = (p: Palette) => `
<g fill="${p.accent}" opacity="0.85">
<rect x="380" y="560" width="36" height="180" rx="14"/>
<rect x="346" y="600" width="20" height="80" rx="10"/><rect x="346" y="600" width="56" height="20" rx="10"/>
<rect x="430" y="610" width="20" height="70" rx="10"/><rect x="394" y="610" width="60" height="20" rx="10"/>
</g>
<g fill="${p.accent}" opacity="0.7">
<rect x="1100" y="600" width="28" height="140" rx="12"/>
<rect x="1076" y="630" width="18" height="60" rx="9"/><rect x="1076" y="630" width="44" height="16" rx="8"/>
</g>`;

const palms = (p: Palette) => `
<g stroke="${p.accent}" stroke-width="14" stroke-linecap="round" fill="none">
<path d="M280 740 Q 290 600 300 480"/>
<path d="M1120 740 Q 1110 580 1100 460"/>
</g>
<g fill="${p.hill}" opacity="0.9">
<ellipse cx="300" cy="475" rx="120" ry="22" transform="rotate(-12 300 475)"/>
<ellipse cx="300" cy="475" rx="120" ry="22" transform="rotate(12 300 475)"/>
<ellipse cx="300" cy="475" rx="120" ry="22" transform="rotate(-45 300 475)"/>
<ellipse cx="300" cy="475" rx="120" ry="22" transform="rotate(45 300 475)"/>
<ellipse cx="1100" cy="455" rx="110" ry="20" transform="rotate(-15 1100 455)"/>
<ellipse cx="1100" cy="455" rx="110" ry="20" transform="rotate(15 1100 455)"/>
<ellipse cx="1100" cy="455" rx="110" ry="20" transform="rotate(-50 1100 455)"/>
<ellipse cx="1100" cy="455" rx="110" ry="20" transform="rotate(50 1100 455)"/>
</g>`;

const lighthouse = (p: Palette) => `
<rect x="0" y="650" width="1600" height="60" fill="${p.far}" opacity="0.55"/>
<g stroke="#FFFFFF" stroke-width="2" opacity="0.35" fill="none">
<path d="M0 680 Q 400 668 800 680 T 1600 680"/>
</g>
<rect x="60" y="690" width="320" height="40" fill="${p.hill}" opacity="0.7"/>
<polygon points="180,500 180,690 260,690 260,500 220,460" fill="#F5F0E8"/>
<rect x="180" y="540" width="80" height="26" fill="${p.accent}"/>
<rect x="180" y="610" width="80" height="26" fill="${p.accent}"/>
<rect x="200" y="480" width="40" height="30" fill="${p.accent}"/>
<polygon points="200,480 240,480 220,450" fill="${p.accent}"/>`;

const silo = (p: Palette) => `
<rect x="0" y="715" width="1600" height="20" fill="${p.hill}" opacity="0.4"/>
<rect x="120" y="540" width="70" height="200" fill="#E8DCC0"/>
<polygon points="120,540 190,540 155,500" fill="${p.accent}"/>
<polygon points="200,740 200,610 280,580 360,610 360,740" fill="${p.accent}"/>
<rect x="270" y="660" width="32" height="80" fill="${p.far}"/>
<polygon points="1260,740 1260,610 1340,580 1420,610 1500,610 1500,740" fill="${p.accent}"/>
<rect x="1330" y="660" width="32" height="80" fill="${p.far}"/>
<rect x="1430" y="540" width="60" height="200" fill="#E8DCC0"/>
<polygon points="1430,540 1490,540 1460,505" fill="${p.accent}"/>`;

const cypress = (p: Palette) => `
<g fill="${p.accent}" opacity="0.85">
<ellipse cx="300" cy="540" rx="100" ry="60"/>
<ellipse cx="300" cy="490" rx="80" ry="50"/>
<rect x="290" y="540" width="20" height="200"/>
<ellipse cx="900" cy="560" rx="120" ry="70"/>
<ellipse cx="900" cy="500" rx="90" ry="55"/>
<rect x="888" y="560" width="24" height="180"/>
<ellipse cx="1300" cy="580" rx="80" ry="50"/>
<rect x="1292" y="580" width="16" height="160"/>
</g>
<g stroke="${p.accent}" stroke-width="2" opacity="0.4">
<line x1="200" y1="700" x2="400" y2="700"/><line x1="800" y1="710" x2="1000" y2="710"/>
</g>`;

const pines = (p: Palette) => `
<g fill="${p.accent}" opacity="0.85">
<polygon points="180,720 250,520 320,720"/>
<polygon points="200,720 250,580 300,720"/>
<polygon points="380,720 460,500 540,720"/>
<polygon points="400,720 460,560 520,720"/>
<polygon points="900,720 970,540 1040,720"/>
<polygon points="1180,720 1260,510 1340,720"/>
<polygon points="1380,720 1450,560 1520,720"/>
</g>`;

const skyline = (p: Palette) => `
<g fill="${p.hill}">
<rect x="80" y="560" width="80" height="160"/><rect x="170" y="500" width="60" height="220"/>
<rect x="240" y="540" width="90" height="180"/><rect x="340" y="450" width="50" height="270"/>
<rect x="400" y="480" width="80" height="240"/><rect x="490" y="520" width="70" height="200"/>
<polygon points="580,720 580,420 620,400 660,420 660,720"/>
<rect x="680" y="460" width="100" height="260"/><rect x="790" y="500" width="80" height="220"/>
<rect x="880" y="430" width="70" height="290"/><rect x="960" y="490" width="90" height="230"/>
<rect x="1060" y="510" width="70" height="210"/><rect x="1140" y="470" width="100" height="250"/>
<rect x="1250" y="540" width="60" height="180"/><rect x="1320" y="500" width="80" height="220"/>
<rect x="1410" y="560" width="70" height="160"/>
</g>
<g fill="${p.sun}" opacity="0.5">
<rect x="100" y="600" width="14" height="14"/><rect x="180" y="540" width="14" height="14"/>
<rect x="260" y="580" width="14" height="14"/><rect x="350" y="500" width="14" height="14"/>
<rect x="700" y="520" width="14" height="14"/><rect x="900" y="480" width="14" height="14"/>
<rect x="980" y="540" width="14" height="14"/><rect x="1160" y="520" width="14" height="14"/>
<rect x="1340" y="560" width="14" height="14"/>
</g>`;

const goldenHills = (p: Palette) => `
<path d="M0 600 Q 300 540 600 580 Q 900 620 1200 560 Q 1400 530 1600 580 L 1600 720 L 0 720 Z" fill="${p.hill}"/>
<g fill="${p.accent}" opacity="0.7">
<ellipse cx="380" cy="600" rx="40" ry="50"/><rect x="376" y="600" width="8" height="60"/>
<ellipse cx="980" cy="580" rx="50" ry="60"/><rect x="976" y="580" width="8" height="70"/>
</g>`;

const windmill = (p: Palette) => `
<rect x="0" y="715" width="1600" height="20" fill="${p.hill}" opacity="0.3"/>
<polygon points="186,720 194,490 206,490 214,720" fill="${p.accent}"/>
<g transform="translate(200 490)" fill="${p.accent}">
<ellipse cx="0" cy="0" rx="7" ry="7"/>
<polygon points="0,0 70,-18 82,0"/><polygon points="0,0 -18,70 0,82"/>
<polygon points="0,0 -70,18 -82,0"/><polygon points="0,0 18,-70 0,-82"/>
</g>
<polygon points="1386,720 1394,520 1406,520 1414,720" fill="${p.accent}" opacity="0.85"/>
<g transform="translate(1400 520)" fill="${p.accent}" opacity="0.85">
<ellipse cx="0" cy="0" rx="6" ry="6"/>
<polygon points="0,0 56,-14 66,0"/><polygon points="0,0 -14,56 0,66"/>
<polygon points="0,0 -56,14 -66,0"/><polygon points="0,0 14,-56 0,-66"/>
</g>`;

const skylineDome = (p: Palette) => `
<g fill="${p.hill}">
<rect x="200" y="600" width="200" height="120"/><rect x="1200" y="580" width="200" height="140"/>
<rect x="700" y="540" width="200" height="180"/>
<ellipse cx="800" cy="540" rx="100" ry="80"/>
<rect x="790" y="430" width="20" height="60"/><circle cx="800" cy="425" r="8"/>
</g>`;

const arch = (p: Palette) => `
<rect x="0" y="540" width="160" height="200" fill="${p.far}" opacity="0.85"/>
<path d="M 60 740 Q 60 460 240 460 Q 420 460 420 740 L 360 740 Q 360 530 240 530 Q 120 530 120 740 Z" fill="${p.hill}"/>
<rect x="1240" y="540" width="320" height="200" fill="${p.far}"/>
<polygon points="1240,540 1560,540 1540,520 1260,520" fill="${p.hill}"/>
<rect x="1380" y="600" width="120" height="140" fill="${p.far}" opacity="0.85"/>`;

const volcanoPalm = (p: Palette) => `
<polygon points="1100,720 1380,440 1600,720 1600,720" fill="${p.hill}"/>
<polygon points="1340,490 1380,440 1420,490 1400,500 1360,500" fill="${p.accent}"/>
<g stroke="${p.accent}" stroke-width="12" stroke-linecap="round" fill="none">
<path d="M240 740 Q 250 620 260 510"/>
</g>
<g fill="${p.far}">
<ellipse cx="260" cy="505" rx="100" ry="18" transform="rotate(-15 260 505)"/>
<ellipse cx="260" cy="505" rx="100" ry="18" transform="rotate(15 260 505)"/>
<ellipse cx="260" cy="505" rx="100" ry="18" transform="rotate(-50 260 505)"/>
<ellipse cx="260" cy="505" rx="100" ry="18" transform="rotate(50 260 505)"/>
</g>`;

const lakefront = (p: Palette) => `
<rect x="0" y="640" width="1600" height="80" fill="${p.far}" opacity="0.7"/>
<g fill="${p.accent}" opacity="0.85">
<polygon points="180,640 240,460 300,640"/><polygon points="380,640 450,440 520,640"/>
<polygon points="1100,640 1170,470 1240,640"/><polygon points="1300,640 1370,490 1440,640"/>
</g>
<g stroke="#FFFFFF" stroke-width="2" opacity="0.4">
<path d="M0 670 Q 400 660 800 670 T 1600 670"/>
<path d="M0 695 Q 400 685 800 695 T 1600 695"/>
</g>`;

const bluebonnets = (p: Palette) => `
<path d="M0 620 Q 400 580 800 600 Q 1200 620 1600 590 L 1600 720 L 0 720 Z" fill="${p.hill}"/>
<g fill="#7080C8" opacity="0.7">
<ellipse cx="200" cy="690" rx="80" ry="14"/><ellipse cx="400" cy="700" rx="100" ry="16"/>
<ellipse cx="700" cy="685" rx="90" ry="14"/><ellipse cx="1000" cy="700" rx="110" ry="16"/>
<ellipse cx="1300" cy="690" rx="90" ry="14"/>
</g>`;

const ridges = (p: Palette) => `
<polygon points="0,720 300,520 500,640 700,560 900,680 1100,540 1300,640 1600,560 1600,720" fill="${p.far}"/>
<polygon points="0,720 200,600 400,680 600,620 800,720 1000,620 1200,700 1400,620 1600,700 1600,720" fill="${p.hill}" opacity="0.8"/>`;

// === STATE → PALETTE + SCENE ===
type SceneFn = (p: Palette) => string;
const S = {
  AL: { p: P.bayou,   s: cypress },
  AK: { p: P.alpine,  s: snowMountain },
  AZ: { p: P.desert,  s: (p: Palette) => mesa(p) + cactus(p) },
  AR: { p: P.forest,  s: ridges },
  CA: { p: P.warm,    s: goldenHills },
  CO: { p: P.alpine,  s: snowMountain },
  CT: { p: P.coast,   s: lighthouse },
  DC: { p: P.urban,   s: skylineDome },
  DE: { p: P.coast,   s: lighthouse },
  FL: { p: P.tropical,s: palms },
  GA: { p: P.warm,    s: pines },
  HI: { p: P.tropical,s: volcanoPalm },
  ID: { p: P.alpine,  s: snowMountain },
  IL: { p: P.prairie, s: silo },
  IN: { p: P.prairie, s: silo },
  IA: { p: P.prairie, s: silo },
  KS: { p: P.prairie, s: windmill },
  KY: { p: P.forest,  s: ridges },
  LA: { p: P.bayou,   s: cypress },
  ME: { p: P.coast,   s: (p: Palette) => lighthouse(p) + pines(p) },
  MD: { p: P.coast,   s: lighthouse },
  MA: { p: P.coast,   s: lighthouse },
  MI: { p: P.cool,    s: lakefront },
  MN: { p: P.cool,    s: lakefront },
  MS: { p: P.bayou,   s: cypress },
  MO: { p: P.forest,  s: ridges },
  MT: { p: P.alpine,  s: snowMountain },
  NE: { p: P.prairie, s: windmill },
  NV: { p: P.desert,  s: mesa },
  NH: { p: P.alpine,  s: snowMountain },
  NJ: { p: P.coast,   s: lighthouse },
  NM: { p: P.desert,  s: (p: Palette) => mesa(p) + cactus(p) },
  NY: { p: P.urban,   s: skyline },
  NC: { p: P.forest,  s: ridges },
  ND: { p: P.prairie, s: windmill },
  OH: { p: P.prairie, s: silo },
  OK: { p: P.desert,  s: mesa },
  OR: { p: P.alpine,  s: snowMountain },
  PA: { p: P.forest,  s: silo },
  RI: { p: P.coast,   s: lighthouse },
  SC: { p: P.tropical,s: palms },
  SD: { p: P.prairie, s: mesa },
  TN: { p: P.forest,  s: ridges },
  TX: { p: P.warm,    s: bluebonnets },
  UT: { p: P.desert,  s: arch },
  VT: { p: P.alpine,  s: snowMountain },
  VA: { p: P.forest,  s: ridges },
  WA: { p: P.alpine,  s: snowMountain },
  WV: { p: P.forest,  s: ridges },
  WI: { p: P.prairie, s: silo },
  WY: { p: P.alpine,  s: snowMountain },
} satisfies Record<string, { p: Palette; s: SceneFn }>;

function build(code: string): string {
  const { p, s } = S[code as keyof typeof S];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${sky(p)}${s(p)}${ground(p)}</svg>\n`;
}

const outDir = join(process.cwd(), "public", "backgrounds");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const code of Object.keys(S)) {
  writeFileSync(join(outDir, `${code}.svg`), build(code));
  count++;
}
console.log(`Wrote ${count} state backgrounds to ${outDir}`);
