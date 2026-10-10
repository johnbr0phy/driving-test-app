import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { SAT } from "@/lib/v2/exams/sat";

export const metadata: Metadata = {
  title: "SAT Practice Test",
  description: "Full-length, timed, adaptive digital SAT practice with a score estimate, plus phone-sized drills by skill area.",
  robots: { index: false, follow: true },
};

export default function SatLayout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={SAT.theme}>{children}</V2Shell>;
}
