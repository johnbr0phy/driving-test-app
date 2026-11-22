import type { CSSProperties } from "react";
import type { ExamV2Config } from "./types";

/**
 * Dark-mode companions for a v2 exam theme. The light theme tints surfaces
 * with a near-white brand colour; on a near-black page that must become a
 * deep tint of the same hue, and the darkened text shade must lighten. The
 * same arithmetic as tools/gen_dark_brand_css.py, applied at runtime because
 * v2 themes are passed inline by V2Shell rather than living in globals.css.
 */
function parseHsl(value: string): [number, number, number] {
  const [h, s, l] = value.split(/\s+/).map((part) => parseFloat(part));
  return [h || 0, s || 0, l || 0];
}

function luminance(h: number, s: number, l: number): number {
  const sat = s / 100;
  const light = l / 100;
  const a = sat * Math.min(light, 1 - light);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(8) + 0.0722 * channel(4);
}

/** WCAG contrast of white text on hsl(h, s%, l%). */
export function whiteContrast(h: number, s: number, l: number): number {
  return 1.05 / (luminance(h, s, l) + 0.05);
}

/**
 * Lift a dark brand toward 50% so it is not muddy on a near-black page, but
 * only while white text on it keeps 4.5:1 (4.6 with a rounding margin), the
 * same rule as tools/gen_dark_brand_css.py. Never darkens.
 */
export function liftedBrandLightness(h: number, s: number, l: number): number {
  let lifted = l;
  while (lifted + 0.1 <= 50 && whiteContrast(h, s, lifted + 0.1) >= 4.6) {
    lifted = Math.round((lifted + 0.1) * 10) / 10;
  }
  return lifted;
}

export function v2DarkThemeStyle(theme: ExamV2Config["theme"]): CSSProperties {
  const [bh, bs, bl] = parseHsl(theme.brand);
  const [lh, ls] = parseHsl(theme.brandLight);
  const [dh, ds] = parseHsl(theme.brandDark);
  return {
    "--v2-brand-dm-override": `${bh} ${bs}% ${liftedBrandLightness(bh, bs, bl)}%`,
    "--v2-brand-light-dm-override": `${lh} ${Math.min(ls, 45)}% 13%`,
    "--v2-brand-border-light-dm-override": `${lh} ${Math.min(ls, 35)}% 24%`,
    "--v2-brand-dark-dm-override": `${dh} ${ds}% ${Math.max(bl + 15, 65)}%`,
  } as CSSProperties;
}
