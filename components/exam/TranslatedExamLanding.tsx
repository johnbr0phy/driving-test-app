import { shareImageUrl } from "@/lib/shareImageUrl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import type { Language } from "@/i18n";
import { getTigerAsset } from "@/lib/tigerAssets";
import { EXAM_FACTS } from "@/lib/examFacts";
import { EXAM_LANDINGS_UPDATED_AT } from "@/lib/seoDates";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { examBaseLanguage, getExamById, localizeExam, type ExamId } from "@/lib/exams";
import { examLandingAlternates, examLandingLocale } from "@/lib/examSeo";
import { regionOfTest } from "@/lib/region";
import type { TranslatedLandingContent } from "@/lib/landingContent";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

export type { TranslatedLandingContent };

// A registry exam's landing page in a language other than English: a
// translation's landing (/es/examen-cna, /vi/..., /es/test-dgt-permiso-b) or
// a native-language exam's own landing (/de/fuehrerschein-theorie-test, where
// `lang` is the exam's base language and the URL is its landingPath).
// Rendered from one content file per exam and language in lib/landings/. The
// app behind it is the same /<slug>/* routes in that language; the CTA
// switches the app language. app/es/examen-practica-cdl is the hand-written
// original this follows.
// Optional sections: `samples` (six bank questions with a Quiz node; the page
// must import its bank module, "@/lib/banks/<id>", first) and `related` (the
// exam's hub group and its country page).

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

// Offers on an EU exam's page are in euros (or the country's own currency).
const CURRENCY: Record<string, string> = {
  ES: "EUR", PT: "EUR", DE: "EUR", GR: "EUR", BE: "EUR", FI: "EUR", MT: "EUR", IE: "EUR",
  SE: "SEK", DK: "DKK", HU: "HUF", RO: "RON",
};

function urls(examId: string, lang: Language) {
  const found = landingUrls(examId, lang);
  // A landing written before its exam or translation is wired (a builder's
  // page ahead of the ExamConfig) is a 404, not a failed build.
  if (!found) notFound();
  return found;
}

function landingUrls(examId: string, lang: Language) {
  const exam = getExamById(examId);
  if (!exam) return null;
  const path = lang === examBaseLanguage(exam) ? exam.landingPath : exam.translations?.[lang]?.landingPath;
  return path ? { exam, url: `${siteUrl}${path}` } : null;
}

export function translatedLandingMetadata(examId: string, lang: Language, c: TranslatedLandingContent): Metadata {
  // Metadata is built when the page module loads, where notFound() cannot run.
  const found = landingUrls(examId, lang);
  if (!found) return { title: c.metaTitle, robots: { index: false, follow: false } };
  const { url } = found;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url, languages: examLandingAlternates(examId) },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      images: [{ url: shareImageUrl(examId, lang), width: 1200, height: 630, alt: c.h1 }],
      siteName: "Tigertest",
      type: "website",
      locale: examLandingLocale(examId, lang).replace("-", "_"),
    },
    twitter: { card: "summary_large_image", images: [shareImageUrl(examId, lang)], title: c.metaTitle, description: c.metaDescription },
  };
}

export function TranslatedExamLanding({
  examId,
  lang,
  content: c,
  samples = false,
  related = false,
}: {
  examId: string;
  lang: Language;
  content: TranslatedLandingContent;
  samples?: boolean;
  related?: boolean;
}) {
  const { exam, url } = urls(examId, lang);
  const localized = localizeExam(exam, lang);
  const facts = EXAM_FACTS[examId];
  const source = c.facts.source ?? facts?.source;
  const inLanguage = examLandingLocale(examId, lang);
  const currency = CURRENCY[regionOfTest(examId)] ?? "USD";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.metaTitle,
        description: c.metaDescription,
        inLanguage,
        dateModified: EXAM_LANDINGS_UPDATED_AT,
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
        ...(source ? { citation: source.url } : {}),
      },
      {
        "@type": "WebApplication",
        name: `Tigertest - ${c.h1}`,
        description: c.subtitle,
        url,
        inLanguage,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: currency },
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "FAQPage",
        inLanguage,
        mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const dashboardHref = `${exam.slug}/dashboard`;
  const shots = { mobile: `/landing/${examId}-mobile-${lang}.png`, desktop: `/landing/${examId}-desktop-${lang}.png` };

  return (
    <div data-theme={examId} className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />


      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">{c.h1}</h1>
          <ExamLandingHero dashboardHref={dashboardHref} shortName={localized.shortName} lang={lang} subtitle={c.subtitle} shots={shots} />
        </div>
      </div>

      {/* At a glance (the translated ExamFacts) */}
      <section aria-labelledby="exam-facts" className="max-w-4xl mx-auto px-6 pt-8 md:pt-12">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
          <h2 id="exam-facts" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{c.facts.h2}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">{c.facts.answer}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{c.facts.tigertest}</p>
          <dl className="grid sm:grid-cols-2 gap-x-8 border-t border-gray-200 dark:border-gray-800">
            {c.facts.rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <dt className="shrink-0 text-gray-500 dark:text-gray-400">{row.label}</dt>
                <dd className="min-w-0 text-right font-medium text-gray-900 dark:text-gray-50">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            {c.facts.footnote}
            {source && (
              <>
                {" "}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-brand-dark hover:underline"
                >
                  {source.name}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                .
              </>
            )}
          </p>
        </div>
      </section>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">{c.howItWorks.h2}</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {c.howItWorks.cards.map((card, i) => (
            <div key={card.h3} className="relative pt-8">
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 ${
                  i === 0 ? "border-brand-border-light" : "border-gray-200 dark:border-gray-800"
                } rounded-full flex items-center justify-center shadow-sm`}
              >
                {i === 0 ? <Smartphone className="w-7 h-7 text-brand-dark" /> : <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />}
              </div>
              <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">{card.h3}</h3>
                <p className="text-gray-600 dark:text-gray-300">{card.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">{c.topics.h2}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{c.topics.p}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                {c.topics.items.map((topic) => (
                  <div key={topic} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset(examId, 1)} alt="" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* How to pass */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">{c.howToPass.h2}</h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          {c.howToPass.steps.map((step) => (
            <div key={step.h3}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">{step.h3}</h3>
              <p>{step.p}</p>
            </div>
          ))}
        </div>
      </div>

      {samples && <ExamSampleQuestions examId={examId as ExamId} lang={lang} />}

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">{c.faqTitle}</h2>
          <div className="space-y-8">
            {c.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related && <ExamRelatedTests examId={examId} lang={lang} />}

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">{c.finalCta.h2}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">{c.finalCta.p}</p>
          <ExamLandingCTA dashboardHref={dashboardHref} lang={lang} />
        </div>
      </div>
    </div>
  );
}
