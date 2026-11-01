import type { Metadata } from "next";

// The search homepage trial and its admin view stay out of search engines.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function HomeV2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
