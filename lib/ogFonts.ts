// Inter from Google Fonts (TTF, which is what ImageResponse can read) for the
// /og/* cards. The built-in font has no bold, so a failed fetch only costs the
// weights.
async function inter(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Inter 500 and 800 as ImageResponse fonts; empty when Google Fonts is unreachable. */
export async function interFonts() {
  const [medium, bold] = await Promise.all([inter(500), inter(800)]);
  return [
    ...(medium ? [{ name: "Inter", data: medium, weight: 500 as const, style: "normal" as const }] : []),
    ...(bold ? [{ name: "Inter", data: bold, weight: 800 as const, style: "normal" as const }] : []),
  ];
}
