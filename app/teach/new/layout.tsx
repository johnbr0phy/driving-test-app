import type { Metadata } from "next";

// canonical: null so this noindex page does not inherit /teach's canonical.
export const metadata: Metadata = {
  title: "New class",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NewClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}
