import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aerta");

export default function AertaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aerta" className="flex-1 flex flex-col">{children}</div>;
}
