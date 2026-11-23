import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("itnautica");

export default function ItnauticaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="itnautica" className="flex-1 flex flex-col">{children}</div>;
}
