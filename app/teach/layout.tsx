import { shareImageUrl } from "@/lib/shareImageUrl";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteUrl";

const title = "Free Practice Tests for Your Class";
const description =
  "Make a free Tigertest class for any test on the site. Post one link, students join with a name, and you see who practiced and what the class keeps missing.";

const siteUrl = SITE_URL;

// Absolute, like every other canonical: a relative one resolves against
// metadataBase (the www asset origin), not the sitemap's host.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/teach` },
  openGraph: { title: `${title} | Tigertest`, description, url: `${siteUrl}/teach`, images: [shareImageUrl("teach")] },
  twitter: { card: "summary_large_image", title: `${title} | Tigertest`, description, images: [shareImageUrl("teach")] },
};

export default function TeachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
