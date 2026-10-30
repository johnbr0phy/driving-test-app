import { shareImageUrl } from "@/lib/shareImageUrl";
import type { Metadata } from "next";

const title = "Free Practice Tests for Your Class";
const description =
  "Make a free Tigertest class for any test on the site. Post one link, students join with a name, and you see who practiced and what the class keeps missing.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

// Absolute, like every other canonical: a relative one resolves against
// metadataBase (the www asset origin), not the sitemap's host.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/teach` },
  openGraph: { title: `${title} | Tigertest`, description, url: `${siteUrl}/teach`, images: [shareImageUrl("home")] },
};

export default function TeachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
