import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mistake explainers | Tigertest",
  description: "Short tiger-led videos that break down the questions most people miss.",
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
