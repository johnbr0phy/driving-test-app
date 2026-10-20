import type { Metadata } from "next";

// canonical: null so these noindex pages do not inherit /teach's canonical.
export const metadata: Metadata = {
  title: "Your class",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function ClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}
