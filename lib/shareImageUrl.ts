// A new URL lets link crawlers fetch the redesigned card instead of a cached image.
export const SHARE_IMAGE_VERSION = "car-smile-3";
const NEW_MASCOT_IDS = new Set(["uklitu", "cacit", "aucit", "pmp"]);

export function shareImageUrl(id: string, language = "en"): string {
  const query = new URLSearchParams({
    v: NEW_MASCOT_IDS.has(id) ? "citizenship-pmp-1" : SHARE_IMAGE_VERSION,
  });
  if (language !== "en") query.set("lang", language);
  return `/og/${encodeURIComponent(id)}?${query.toString()}`;
}
