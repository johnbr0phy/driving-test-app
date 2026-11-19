import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/siteSchema";
import { PRESS_CONTACT, PRESS_RELEASES, formatPressDate, pressReleaseUrl } from "@/lib/pressReleases";

// /press: every press release, newest first, and who to contact. Same look
// as /about.

const title = "Tigertest Press";
const description =
  "Press releases from Tigertest, the practice-test site: data on what people studying for the DMV permit test and other exams get wrong most.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: { title, description, url: `${SITE_URL}/press`, siteName: "Tigertest", type: "website" },
};

const p = "text-gray-700 dark:text-gray-200 leading-relaxed";

export default function PressPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/press#webpage`,
    url: `${SITE_URL}/press`,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    hasPart: PRESS_RELEASES.map((r) => ({
      "@type": "NewsArticle",
      headline: r.title,
      url: `${SITE_URL}${pressReleaseUrl(r.slug)}`,
      datePublished: r.date,
    })),
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 py-16 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Press</h1>
        <p className={`${p} mb-10`}>
          News and data from Tigertest. For interviews, data requests or the full numbers behind a release, email{" "}
          <a className="underline" href={`mailto:${PRESS_CONTACT}`}>
            {PRESS_CONTACT}
          </a>
          .
        </p>

        <ul className="space-y-6">
          {PRESS_RELEASES.map((r) => (
            <li key={r.slug} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{formatPressDate(r.date)}</p>
              <h2 className="text-xl font-semibold mb-2">
                <Link href={pressReleaseUrl(r.slug)} className="hover:underline">
                  {r.title}
                </Link>
              </h2>
              <p className={p}>{r.summary}</p>
            </li>
          ))}
        </ul>

        <p className={`${p} mt-10`}>
          About Tigertest: who makes it, how the questions are written and what it costs, on the{" "}
          <Link className="underline" href="/about">
            about page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
