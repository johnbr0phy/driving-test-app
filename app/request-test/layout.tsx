import type { Metadata } from "next";

// Reached from email buttons and the unsubscribe page. Not a page to rank.
export const metadata: Metadata = {
  title: "What test should we build next? | TigerTest",
  robots: { index: false, follow: true },
};

export default function RequestTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
