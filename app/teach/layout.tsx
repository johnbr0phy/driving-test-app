import type { Metadata } from "next";

const title = "Free Practice Tests for Your Class";
const description =
  "Make a free TigerTest class for the DMV permit test, NCLEX, SAT, surgical tech, CNA, real estate and every other test on the site. Post one link, students join with just a name, and you see who practiced and what the class keeps missing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/teach" },
  openGraph: { title: `${title} | TigerTest`, description, url: "/teach", images: ["/og-home.png"] },
};

export default function TeachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
