// Site-wide JSON-LD, rendered once in app/layout.tsx. Pages point at these
// nodes by @id (publisher, isPartOf) so search and AI answer engines read one
// TigerTest entity across the DMV pages and every exam, instead of a loose
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
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
      description:
        "Free practice tests for the DMV permit test in all 50 states and DC, plus 40 licensing, certification and admissions exams including the SAT, ACT, CDL, CNA, NREMT EMT and CompTIA.",
      founder: { "@type": "Person", name: "John Brophy", sameAs: ["https://x.com/JohnBr0"] },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteUrl,
      name: "TigerTest",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: ["en-US", "es", "vi", "ko"],
    },
  ],
};
