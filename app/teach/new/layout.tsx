import type { Metadata } from "next";

export const metadata: Metadata = { title: "New class", robots: { index: false, follow: false } };

export default function NewClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}
