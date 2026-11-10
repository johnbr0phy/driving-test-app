import { shareImageUrl } from "@/lib/shareImageUrl";
import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import content from "@/lib/landings/sehp.sv.json";
import type { TranslatedLandingContent } from "@/lib/landingContent";
import { getTigerAsset } from "@/lib/tigerAssets";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { SEHP } from "@/lib/v2/exams/sehp";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

// Högskoleprovet's own landing, in Swedish (its base language). The same
// sections as components/exam/TranslatedExamLanding, read from
// lib/landings/sehp.sv.json; written out here because that component looks
// exams up in the v1 registry and sehp is a v2 exam.

const c = content as TranslatedLandingContent;
const url = `${SITE_URL}${SEHP.landingPath}`;
const dashboardHref = `${SEHP.slug}/dashboard`;

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  keywords: c.keywords,
  alternates: { canonical: url, languages: { "sv-SE": url, "x-default": url } },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url,
    images: [{ url: shareImageUrl("sehp"), width: 1200, height: 630, alt: c.h1 }],
    siteName: "Tigertest",
    type: "website",
    locale: "sv_SE",
  },
  twitter: { card: "summary_large_image", images: [shareImageUrl("sehp")], title: c.metaTitle, description: c.metaDescription },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: c.metaTitle,
      description: c.metaDescription,
      inLanguage: "sv-SE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": ORGANIZATION_ID },
      ...(c.facts.source ? { citation: c.facts.source.url } : {}),
    },
    {
      "@type": "WebApplication",
      name: `Tigertest - ${c.h1}`,
      description: c.subtitle,
      url,
      inLanguage: "sv-SE",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sehp", "SEK"),
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "FAQPage",
      inLanguage: "sv-SE",
      mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function HogskoleprovetLandingPage() {
  const source = c.facts.source;
  return (
    <div data-theme="sehp" lang="sv" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">{c.h1}</h1>
          <ExamLandingHero
            dashboardHref={dashboardHref}
            shortName={SEHP.shortName}
            lang="sv"
            subtitle={c.subtitle}
            shots={{ mobile: "/landing/sehp-mobile.png", desktop: "/landing/sehp-desktop.png" }}
          />
        </div>
      </div>

      {/* At a glance */}
      <section aria-labelledby="exam-facts" className="max-w-4xl mx-auto px-6 pt-8 md:pt-12">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
          <h2 id="exam-facts" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{c.facts.h2}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">{c.facts.answer}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{c.facts.tigertest}</p>
          <dl className="grid sm:grid-cols-2 gap-x-8 border-t border-gray-200 dark:border-gray-800">
            {c.facts.rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <dt className="max-w-[50%] text-gray-500 dark:text-gray-400">{row.label}</dt>
                <dd className="min-w-0 text-right font-medium [overflow-wrap:anywhere] text-gray-900 dark:text-gray-50">{row.value}</dd>
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
                  className="text-brand-dark underline underline-offset-2 hover:decoration-2 [overflow-wrap:anywhere]"
                >
                  {source.name}
                  <ExternalLink className="ml-0.5 inline h-3 w-3 align-baseline" aria-hidden="true" />
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

      {/* Blueprint */}
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
              <Image src={getTigerAsset("sehp", 1)} alt="" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
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

      <ExamRelatedTests examId="sehp" lang="sv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">{c.finalCta.h2}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">{c.finalCta.p}</p>
          <ExamLandingCTA dashboardHref={dashboardHref} lang="sv" />
        </div>
      </div>
    </div>
  );
}
