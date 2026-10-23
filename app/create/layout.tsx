import type { Metadata } from "next";
import { siteShareMetadata } from "@/lib/examSeo";

// The page is a client component and needs an account, so it is not indexed;
// this gives a shared link TigerTest's card.
export const metadata: Metadata = {
  ...siteShareMetadata("Make your own practice test on TigerTest"),
  title: "Make a practice test",
  description: "Turn notes, a Quizlet set or your own questions into a TigerTest practice test with Practice, Test and Flashcards modes.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
