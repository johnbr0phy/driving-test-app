import type { Metadata } from "next";
import { getExamById, examLandingPath } from "./exams";
import type { ExamV2Config } from "./v2/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

/** The exam's own share card, so a shared app link never shows the DMV card. */
function shareTags(id: string, title: string, description: string, landing: string): Metadata {
  const image = { url: `/og/${id}`, width: 1200, height: 630, alt: `TigerTest ${title}` };
  return {
    openGraph: { type: "website", siteName: "TigerTest", title, description, url: `${siteUrl}${landing}`, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/**
 * Metadata for an exam's app routes (dashboard, test, training, stats, drill).
 * These are client-rendered sessions, not pages we want ranked, so they are
 * noindex (follow stays on so link equity passes back to the landing). Without
 * this they inherit the DMV title and description from the root layout.
 * The landing page under `landingPath` sets its own metadata.
 */
export function examAppMetadata(examId: string): Metadata {
  const exam = getExamById(examId);
  if (!exam) return { robots: { index: false, follow: true } };
  const description = `Free ${exam.fullName} practice tests and training sets with instant feedback. Progress saves automatically.`;
  return {
    title: exam.name,
    description,
    robots: { index: false, follow: true },
    ...shareTags(exam.id, `Free ${exam.name}`, description, examLandingPath(exam)),
  };
}

/** Same for a v2 exam's app routes (dashboard, tests, drills). */
export function examV2AppMetadata(exam: ExamV2Config): Metadata {
  const description = `Free full-length ${exam.fullName} practice timed like the real exam, plus skill drills sized for your phone.`;
  return {
    title: exam.name,
    description,
    robots: { index: false, follow: true },
    ...shareTags(exam.id, `Free ${exam.name}`, description, exam.landingPath),
  };
}

/** Neutral TigerTest card for site pages that belong to no one exam (login, signup...). */
export function siteShareMetadata(title: string): Metadata {
  const description = "Free practice tests for 40+ exams: DMV, CDL, NCLEX, SAT, ACT, CompTIA and more, with instant feedback.";
  const image = { url: "/tiger.png", width: 1024, height: 1024, alt: "TigerTest" };
  return {
    openGraph: { type: "website", siteName: "TigerTest", title, description, url: siteUrl, images: [image] },
    twitter: { card: "summary", title, description, images: [image.url] },
  };
}

/**
 * hreflang for a registry exam's landing in every language it exists in
 * (ExamConfig.translations), for the English and translated landings alike.
 */
export function examLandingAlternates(examId: string): Record<string, string> {
  const exam = getExamById(examId)!;
  const enUrl = `${siteUrl}${examLandingPath(exam)}`;
  const translated = Object.fromEntries(
    Object.entries(exam.translations ?? {}).map(([lang, tr]) => [lang, `${siteUrl}${tr.landingPath}`])
  );
  return { en: enUrl, ...translated, "x-default": enUrl };
}
