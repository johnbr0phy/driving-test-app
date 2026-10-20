import { ExternalLink } from "lucide-react";
import { EXAM_FACTS } from "@/lib/examFacts";
import { EXAM_LANDINGS_UPDATED_AT } from "@/lib/seoDates";
import { getCatalogEntry } from "@/lib/testCatalog";
import { ORGANIZATION_ID } from "@/lib/siteSchema";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

/** "2026-10-12" -> "October 2026", in UTC so the server's zone never shifts the month. */
function monthYear(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

// "At a glance" block under an exam landing's hero: a plain answer about the
// real exam, a facts table, and a dated "based on" line with the official
// source. This is the passage AI answer engines lift, so it states the exam's
// facts before anything about TigerTest. Also emits a WebPage node with
// dateModified, which the landing's own JSON-LD graph does not carry.
export function ExamFacts({ examId }: { examId: string }) {
  const facts = EXAM_FACTS[examId];
  const test = getCatalogEntry(examId);
  if (!facts || !test) return null;

  const url = `${siteUrl}${test.href}`;
  const tigertest =
    facts.tigertest ??
    `TigerTest has ${test.questions.toLocaleString("en-US")} ${test.shortName} practice questions with explanations${
      test.pricing ? "" : ", all free with no account required"
    }.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    // Catalog names already say "Practice Test" ("CNA Practice Test").
    name: test.name,
    description: facts.answer,
    dateModified: EXAM_LANDINGS_UPDATED_AT,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": ORGANIZATION_ID },
    ...(facts.source ? { citation: facts.source.url } : {}),
  };

  return (
    <section aria-labelledby="exam-facts" className="max-w-4xl mx-auto px-6 pt-8 md:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
        <h2 id="exam-facts" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          The {test.shortName} exam at a glance
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">{facts.answer}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{tigertest}</p>
        <dl className="grid sm:grid-cols-2 gap-x-8 border-t border-gray-200 dark:border-gray-800">
          {facts.rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <dt className="shrink-0 text-gray-500 dark:text-gray-400">{row.label}</dt>
              <dd className="text-right font-medium text-gray-900 dark:text-gray-50">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          Updated <time dateTime={EXAM_LANDINGS_UPDATED_AT}>{monthYear(EXAM_LANDINGS_UPDATED_AT)}</time> by the
          TigerTest team. Practice questions follow {facts.basedOn}. Exam rules change, so confirm current details
          {facts.source ? (
            <>
              {" "}with{" "}
              <a
                href={facts.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-brand-dark hover:underline"
              >
                {facts.source.name}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              .
            </>
          ) : (
            " with your state or testing provider."
          )}
        </p>
      </div>
    </section>
  );
}
