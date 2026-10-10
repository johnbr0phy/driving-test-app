import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCatalogEntry } from "@/lib/testCatalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

// Visible breadcrumb plus BreadcrumbList JSON-LD for an exam landing page:
// Home > All practice tests > this exam. Mirrors the DMV state pages and
// tells search engines the /tests hub is the parent of every exam landing.
// Google only honours the schema when the crumb is visible, so it stays on
// the page but is painted in the hero tint (every landing's hero starts
// with bg-brand-light) so it reads as the top edge of the hero rather than
// a white strip wedged between the header and the hero.
export function ExamLandingBreadcrumbs({ examId }: { examId: string }) {
  const test = getCatalogEntry(examId);
  if (!test) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "All practice tests", item: `${siteUrl}/tests` },
      { "@type": "ListItem", position: 3, name: test.name, item: `${siteUrl}${test.href}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="bg-brand-light">
        <ol className="max-w-4xl mx-auto px-6 pt-4 flex items-center gap-1.5 flex-wrap text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-gray-400" />
          </li>
          <li>
            <Link href="/tests" className="hover:text-gray-900">
              All practice tests
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-gray-400" />
          </li>
          <li className="text-gray-700" aria-current="page">
            {test.name}
          </li>
        </ol>
      </nav>
    </>
  );
}
