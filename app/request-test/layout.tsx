import type { Metadata } from "next";
import { siteShareMetadata } from "@/lib/examSeo";

// Reached from email buttons and the unsubscribe page. Not a page to rank.
export const metadata: Metadata = {
  title: "What test should we build next? | Tigertest",
  robots: { index: false, follow: true },
  ...siteShareMetadata("What test should we build next? | Tigertest"),
};

export default function RequestTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
