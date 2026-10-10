import { EXAMS, examLandingPath } from "./exams";
import { EXAMS_V2 } from "./v2/registry";
import { states, getStateByCode } from "@/data/states";
import { VI_STATE_CODES } from "@/data/viStates";
import { KO_STATE_CODES } from "@/data/koStates";
import {
  DMV_LANGUAGE_PAGES_UPDATED_AT,
  EXAM_LANDINGS_UPDATED_AT,
  HUB_PAGES_UPDATED_AT,
  STATE_PAGES_UPDATED_AT,
} from "./seoDates";

// The sitemap is split into one file per page family so Search Console
// reports indexing per segment: a drop in "dmv" coverage shows on its own
// instead of being averaged with thirty new exam landings.
//   /sitemap.xml            index
//   /sitemaps/dmv.xml       home, state hub, 51 state DMV pages
//   /sitemaps/dmv-es-vi-ko.xml  Spanish, Vietnamese and Korean DMV pages
//   /sitemaps/exams.xml     /tests hub and every exam landing
//   /sitemaps/schools.xml   driving school pages (Firestore)
export const SITEMAP_SEGMENTS = ["dmv", "dmv-es-vi-ko", "exams", "schools"] as const;
export type SitemapSegment = (typeof SITEMAP_SEGMENTS)[number];

export interface SitemapEntry {
  url: string;
  /** ISO date (YYYY-MM-DD). Stable until the page family changes. */
  lastModified: string;
  changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export function isSitemapSegment(value: string): value is SitemapSegment {
  return (SITEMAP_SEGMENTS as readonly string[]).includes(value);
}

// Active school slugs for sitemap entries (best-effort: [] on error).
async function getActiveSchoolSlugs(): Promise<string[]> {
  try {
    const { getAdminDb } = await import("@/lib/firebase-admin");
    const snap = await getAdminDb()
      .collection("school_accounts")
      .where("active", "==", true)
      .select()
      .get();
    return snap.docs.map((doc) => doc.id);
  } catch {
    return [];
  }
}

export async function buildSegment(segment: SitemapSegment): Promise<SitemapEntry[]> {
  switch (segment) {
    case "dmv":
      return [
        { url: SITE_URL, lastModified: STATE_PAGES_UPDATED_AT, changeFrequency: "weekly", priority: 1 },
        {
          url: `${SITE_URL}/practice-tests-by-state`,
          lastModified: STATE_PAGES_UPDATED_AT,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        ...states.map((state) => ({
          url: `${SITE_URL}/${state.slug}-dmv-practice-test`,
          lastModified: STATE_PAGES_UPDATED_AT,
          changeFrequency: "monthly" as const,
          priority: 0.9,
        })),
      ];
    case "dmv-es-vi-ko":
      return [
        {
          url: `${SITE_URL}/es/examenes-practica-por-estado`,
          lastModified: DMV_LANGUAGE_PAGES_UPDATED_AT,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...states.map((state) => ({
          url: `${SITE_URL}/es/${state.slug}-examen-practica-dmv`,
          lastModified: DMV_LANGUAGE_PAGES_UPDATED_AT,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
        {
          url: `${SITE_URL}/vi/thi-thu-dmv-theo-tieu-bang`,
          lastModified: DMV_LANGUAGE_PAGES_UPDATED_AT,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...VI_STATE_CODES.map((code) => ({
          url: `${SITE_URL}/vi/${getStateByCode(code)!.slug}-thi-thu-dmv`,
          lastModified: DMV_LANGUAGE_PAGES_UPDATED_AT,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
        {
          url: `${SITE_URL}/ko/juibyeol-dmv-pilgi-siheom`,
          lastModified: DMV_LANGUAGE_PAGES_UPDATED_AT,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...KO_STATE_CODES.map((code) => ({
          url: `${SITE_URL}/ko/${getStateByCode(code)!.slug}-dmv-pilgi-siheom`,
          lastModified: DMV_LANGUAGE_PAGES_UPDATED_AT,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ];
    case "exams":
      return [
        { url: `${SITE_URL}/tests`, lastModified: HUB_PAGES_UPDATED_AT, changeFrequency: "weekly", priority: 0.8 },
        ...EXAMS_V2.map((exam) => ({
          url: `${SITE_URL}${exam.landingPath}`,
          lastModified: EXAM_LANDINGS_UPDATED_AT,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
        ...EXAMS.map((exam) => ({
          url: `${SITE_URL}${examLandingPath(exam)}`,
          lastModified: EXAM_LANDINGS_UPDATED_AT,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ];
    case "schools": {
      const slugs = await getActiveSchoolSlugs();
      return slugs.map((slug) => ({
        url: `${SITE_URL}/schools/${slug}`,
        lastModified: HUB_PAGES_UPDATED_AT,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function renderUrlset(entries: SitemapEntry[]): string {
  const body = entries
    .map((e) => {
      const parts = [`<loc>${escapeXml(e.url)}</loc>`, `<lastmod>${e.lastModified}</lastmod>`];
      if (e.changeFrequency) parts.push(`<changefreq>${e.changeFrequency}</changefreq>`);
      if (e.priority !== undefined) parts.push(`<priority>${e.priority}</priority>`);
      return `  <url>${parts.join("")}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function renderIndex(): string {
  const latest = [
    STATE_PAGES_UPDATED_AT,
    DMV_LANGUAGE_PAGES_UPDATED_AT,
    EXAM_LANDINGS_UPDATED_AT,
    HUB_PAGES_UPDATED_AT,
  ].sort().at(-1);
  const body = SITEMAP_SEGMENTS.map(
    (segment) =>
      `  <sitemap><loc>${escapeXml(`${SITE_URL}/sitemaps/${segment}.xml`)}</loc><lastmod>${latest}</lastmod></sitemap>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}
