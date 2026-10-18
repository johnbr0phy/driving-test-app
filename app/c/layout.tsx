import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join your class",
  robots: { index: false, follow: false },
};

export default function ClassJoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
