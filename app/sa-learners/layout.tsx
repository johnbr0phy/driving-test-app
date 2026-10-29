import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ausa");

export default function AusaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ausa" className="flex-1 flex flex-col">{children}</div>;
}
