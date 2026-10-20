import type { Metadata } from "next";

export const metadata: Metadata = { title: "Build your own course", robots: { index: false, follow: false } };

export default function CourseRequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
