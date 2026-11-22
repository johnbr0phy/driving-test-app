// Every brand theme keeps white text readable: the brand colour (buttons,
// chips) in light and dark mode, and the hero's brand-light and gradient-to
// in dark mode, where the hero text is white. A theme with no .dark block
// kept its near-white light tint behind white text (KCET, Nov 2026).
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { whiteContrast, liftedBrandLightness } = require("../lib/v2/darkTheme.ts");

const css = fs.readFileSync(path.join(__dirname, "..", "app", "globals.css"), "utf8");
const block = /(\.dark )?\[data-theme="([a-z0-9_-]+)"\]\s*\{([^}]*)\}/g;
const tok = /--(brand[a-z-]*):\s*([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%/g;
const light = {};
const dark = {};
for (const m of css.matchAll(block)) {
  const target = m[1] ? dark : light;
  const t = (target[m[2]] ||= {});
  for (const k of m[3].matchAll(tok)) t[k[1]] = [+k[2], +k[3], +k[4]];
}

test("every theme has a dark-mode block", () => {
  const missing = Object.keys(light).filter((t) => !dark[t]);
  assert.deepStrictEqual(missing, []);
});

test("white text stays readable on every theme", () => {
  const bad = [];
  for (const [t, l] of Object.entries(light)) {
    if (!l.brand) continue;
    const d = { ...l, ...dark[t] };
    if (whiteContrast(...l.brand) < 4.4) bad.push(`${t} light brand`);
    if (whiteContrast(...d.brand) < 4.4) bad.push(`${t} dark brand`);
    for (const k of ["brand-light", "brand-gradient-to"]) {
      if (d[k] && whiteContrast(...d[k]) < 4.5) bad.push(`${t} dark ${k}`);
    }
  }
  assert.deepStrictEqual(bad, []);
});

test("v2 runtime dark lift keeps white text readable", () => {
  for (const f of fs.readdirSync(path.join(__dirname, "..", "lib", "v2", "exams"))) {
    const src = fs.readFileSync(path.join(__dirname, "..", "lib", "v2", "exams", f), "utf8");
    const m = src.match(/brand: "([0-9.]+) ([0-9.]+)% ([0-9.]+)%"/);
    if (!m) continue;
    const [h, s, l] = m.slice(1).map(Number);
    assert.ok(whiteContrast(h, s, l) >= 4.4, `${f} light brand`);
    assert.ok(whiteContrast(h, s, liftedBrandLightness(h, s, l)) >= 4.5, `${f} dark brand`);
  }
});

// Brand-coloured text in dark mode is brand-dark (globals.css maps
// text-brand to it), so it must read on the gray-900 card (#111827).
test("dark-mode brand text reads on a dark card", () => {
  const card = 0.0098; // relative luminance of #111827
  const lum = (h, s, l) => 1.05 / whiteContrast(h, s, l) - 0.05;
  const bad = [];
  for (const [t, l] of Object.entries(light)) {
    const d = { ...l, ...dark[t] };
    if (!d["brand-dark"]) continue;
    const ratio = (lum(...d["brand-dark"]) + 0.05) / (card + 0.05);
    if (ratio < 4.4) bad.push(`${t} ${ratio.toFixed(2)}`);
  }
  assert.deepStrictEqual(bad, []);
});
