import { MetadataRoute } from "next";
import { states, getStateByCode } from "@/data/states";
import { VI_STATE_CODES } from "@/data/viStates";
import { KO_STATE_CODES } from "@/data/koStates";

// Fetch active school slugs for sitemap entries (best-effort — returns [] on error)
async function getActiveSchoolSlugs(): Promise<string[]> {
  try {
    // Only available server-side at build/request time
    const { getAdminDb } = await import("@/lib/firebase-admin");
    const db = getAdminDb();
    const snap = await db
      .collection("school_accounts")
      .where("active", "==", true)
      .select() // fetch doc IDs only — no field data needed
      .get();
    return snap.docs.map((doc) => doc.id);
  } catch {
    // Silently degrade — sitemap works without school pages
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

  const now = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/practice-tests-by-state`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // State DMV practice test landing pages (primary SEO pages)
  const stateDmvPages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${siteUrl}/${state.slug}-dmv-practice-test`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Spanish state DMV practice test landing pages
  const stateDmvPagesEs: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${siteUrl}/es/${state.slug}-examen-practica-dmv`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Spanish index page
  const spanishIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/es/examenes-practica-por-estado`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Vietnamese state DMV practice test landing pages (states offering the
  // real knowledge test in Vietnamese)
  const stateDmvPagesVi: MetadataRoute.Sitemap = VI_STATE_CODES.map((code) => ({
    url: `${siteUrl}/vi/${getStateByCode(code)!.slug}-thi-thu-dmv`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Vietnamese index page
  const vietnameseIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Korean state DMV practice test landing pages (states with the largest
  // Korean-speaking populations)
  const stateDmvPagesKo: MetadataRoute.Sitemap = KO_STATE_CODES.map((code) => ({
    url: `${siteUrl}/ko/${getStateByCode(code)!.slug}-dmv-pilgi-siheom`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Korean index page
  const koreanIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // CDL pages
  const cdlPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/cdl-practice-test`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // School landing pages — dynamically from Firestore
  const schoolSlugs = await getActiveSchoolSlugs();
  const schoolPages: MetadataRoute.Sitemap = schoolSlugs.map((slug) => ({
    url: `${siteUrl}/schools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...corePages,
    ...cdlPages,
    ...stateDmvPages,
    ...stateDmvPagesEs,
    ...spanishIndexPage,
    ...stateDmvPagesVi,
    ...vietnameseIndexPage,
    ...stateDmvPagesKo,
    ...koreanIndexPage,
    ...schoolPages,
  ];
}
