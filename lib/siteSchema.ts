import { REGIONS } from "./region";
import { TEST_CATALOG } from "./testCatalog";
import { SITE_URL } from "@/lib/siteUrl";

// Site-wide JSON-LD, rendered once in app/layout.tsx. Pages point at these
// nodes by @id (publisher, isPartOf) so search and AI answer engines read one
// Tigertest entity across the DMV pages and every exam, instead of a loose
// Organization blob per page.
const siteUrl = SITE_URL;

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Tigertest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
      // Built from the catalog and REGIONS so it never falls behind a new batch.
      description: `Free practice tests for ${TEST_CATALOG.length} exams in ${REGIONS.length} countries: the DMV permit test in all 50 states and DC, driving theory tests from the UK to Malaysia, and licensing, certification, school and admissions exams such as the CDL, NCLEX, SAT and CompTIA.`,
      areaServed: REGIONS.map((r) => ({ "@type": "Country", name: r.name })),
      founder: { "@type": "Person", name: "John Brophy", sameAs: ["https://x.com/JohnBr0"] },
      email: "john@johnbrophy.net",
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "john@johnbrophy.net", availableLanguage: ["en"] },
      sameAs: ["https://x.com/JohnBr0"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteUrl,
      name: "Tigertest",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: ["en", "es", "vi", "ko", "zh-Hans", "pt", "de"],
    },
  ],
};
