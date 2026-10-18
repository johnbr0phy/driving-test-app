import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free practice tests for your class",
  description:
    "Make a free TigerTest class for surgical tech, histotech, CNA, real estate and 30 more exams. Post one link, students join with just a name, and you see who practiced and which topics the class misses.",
  robots: { index: false, follow: true },
};

export default function TeachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
