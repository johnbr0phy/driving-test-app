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

export function v2DarkThemeStyle(theme: ExamV2Config["theme"]): CSSProperties {
  const [bh, bs, bl] = parseHsl(theme.brand);
  const [lh, ls] = parseHsl(theme.brandLight);
  const [dh, ds] = parseHsl(theme.brandDark);
  return {
    "--v2-brand-dm-override": `${bh} ${bs}% ${Math.max(bl, 50)}%`,
    "--v2-brand-light-dm-override": `${lh} ${Math.min(ls, 45)}% 13%`,
    "--v2-brand-border-light-dm-override": `${lh} ${Math.min(ls, 35)}% 24%`,
    "--v2-brand-dark-dm-override": `${dh} ${ds}% ${Math.max(bl + 15, 65)}%`,
  } as CSSProperties;
}
