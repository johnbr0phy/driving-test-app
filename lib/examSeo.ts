import { shareImageUrl } from "@/lib/shareImageUrl";
import type { Metadata } from "next";
import { getExamById, examBaseLanguage, examLandingPath } from "./exams";
import type { Language } from "@/i18n";
import { isRegion, regionInfo, regionOfTest } from "./region";
import type { ExamV2Config } from "./v2/types";
import { SITE_URL } from "@/lib/siteUrl";
import { getCatalogEntry } from "./testCatalog";
import { premiumPriceInCurrency } from "./pricing";

const siteUrl = SITE_URL;

/** The exam's own share card, so a shared app link never shows the DMV card. */
function shareTags(id: string, title: string, description: string, landing: string): Metadata {
  const image = { url: shareImageUrl(id), width: 1200, height: 630, alt: `Tigertest ${title}` };
  return {
    openGraph: { type: "website", siteName: "Tigertest", title, description, url: `${siteUrl}${landing}`, images: [image] },
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

/** Neutral Tigertest card for site pages that belong to no one exam (login, signup...). */
export function siteShareMetadata(title: string): Metadata {
  const description = "Free practice tests for driving, school, healthcare and work. Every answer explained.";
  const image = { url: shareImageUrl("home"), width: 1200, height: 630, alt: "Tigertest" };
  return {
    openGraph: { type: "website", siteName: "Tigertest", title, description, url: siteUrl, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/**
 * BCP 47 tag of a registry exam's landing in `lang` (hreflang, og:locale and
 * JSON-LD inLanguage). The base language uses ExamConfig.locale, else the
 * exam's country ("en-GB" for a UK exam, "de-DE" for a German one) or en-US;
 * a translation uses its own `locale`, else "<lang>-US" (the US Spanish,
 * Vietnamese and Korean exam pages). A language spoken in one country
 * (Swedish, Danish, Finnish, Hungarian, Romanian, Greek) falls back to that
 * country's tag rather than "-US".
 */
const LANGUAGE_LOCALE: Partial<Record<Language, string>> = {
  sv: "sv-SE", da: "da-DK", fi: "fi-FI", hu: "hu-HU", ro: "ro-RO", el: "el-GR",
};

export function examLandingLocale(examId: string, lang: Language): string {
  const exam = getExamById(examId)!;
  const region = regionOfTest(examId);
  const country = isRegion(region) ? region : null;
  if (lang === examBaseLanguage(exam)) {
    if (exam.locale) return exam.locale;
    if (lang === "en") return country ? regionInfo(country).locale : "en-US";
    if (!country && LANGUAGE_LOCALE[lang]) return LANGUAGE_LOCALE[lang]!;
    return `${lang}-${country === "UK" ? "GB" : country ?? "US"}`;
  }
  return exam.translations?.[lang]?.locale ?? LANGUAGE_LOCALE[lang] ?? `${lang}-US`;
}

/**
 * hreflang for a registry exam's landing in every language it exists in
 * (ExamConfig.translations), for the base and translated landings alike.
 * Keys: "en" for an English base, else the base locale; a translation's own
 * locale when it has one ("es-ES"), else its bare language (today's US
 * translations keep "es", "vi", "ko"). x-default is the landing in the test's
 * main language: the translation written for the exam's own country (the
 * Spanish page for Spain's DGT test), else the base landing (US exams keep the
 * English one).
 */
export function examLandingAlternates(examId: string): Record<string, string> {
  const exam = getExamById(examId)!;
  const base = examBaseLanguage(exam);
  const baseUrl = `${siteUrl}${examLandingPath(exam)}`;
  const baseKey = base === "en" ? "en" : examLandingLocale(examId, base);
  const region = regionOfTest(examId);
  const countryTag = isRegion(region) && region !== "US" ? `-${region === "UK" ? "GB" : region}` : null;
  let xDefault = baseUrl;
  const translated: Record<string, string> = {};
  for (const [lang, tr] of Object.entries(exam.translations ?? {})) {
    if (!tr || lang === base) continue;
    const url = `${siteUrl}${tr.landingPath}`;
    translated[tr.locale ?? lang] = url;
    // Only an English-base exam hands x-default to its own country's translation (Spain's es-ES);
    // a native exam keeps it on its base landing (detheorie's en-DE is not x-default).
    if (countryTag && base === "en" && xDefault === baseUrl && tr.locale?.endsWith(countryTag)) xDefault = url;
  }
  return { [baseKey]: baseUrl, ...translated, "x-default": xDefault };
}

/**
 * schema.org offers for a landing's WebApplication node: practice is free to
 * start, and exams with Premium steps also list the one-time purchase. Saying
 * only "price 0" on a freemium exam misleads the answer engines that quote it.
 */
export function examOffers(examId: string, currency = "USD") {
  const free = { "@type": "Offer", name: "Free practice", price: "0", priceCurrency: currency };
  const variant = getExamById(examId);
  const paid = examId === "dmv" || !!getCatalogEntry(variant?.variantOf ?? examId)?.pricing || !!variant?.variantOf;
  if (!paid) return free;
  const premium = premiumPriceInCurrency(currency);
  return [
    free,
    {
      "@type": "Offer",
      name: "Tigertest Premium",
      description: "One-time purchase, no subscription. Unlocks the last training sets and practice tests and full stats on every exam.",
      price: String(premium.amount),
      priceCurrency: premium.currency.toUpperCase(),
    },
  ];
}
