import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("accuplacer");

export default function AccuplacerLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="accuplacer" className="flex-1 flex flex-col">{children}</div>;
}
