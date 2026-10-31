import { REGIONS } from "./region";

// Site-wide JSON-LD, rendered once in app/layout.tsx. Pages point at these
// nodes by @id (publisher, isPartOf) so search and AI answer engines read one
// Tigertest entity across the DMV pages and every exam, instead of a loose
// Organization blob per page.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

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
      description:
        "Free practice tests for the DMV permit test in all 50 states and DC, plus more than 150 licensing, certification, school and admissions exams including the SAT, ACT, CDL, CNA, NREMT EMT and CompTIA, and driving theory tests for Canada, the UK, Ireland, Australia, New Zealand, India, the Philippines, Malaysia, Singapore, Hong Kong, the UAE, South Africa, Nigeria and Kenya.",
      areaServed: REGIONS.map((r) => ({ "@type": "Country", name: r.name })),
      founder: { "@type": "Person", name: "John Brophy", sameAs: ["https://x.com/JohnBr0"] },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteUrl,
      name: "Tigertest",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: ["en", "es", "vi", "ko", "zh-Hans"],
    },
  ],
};
