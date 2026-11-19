import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("afsp");

export default function AnnualFederalTaxRefresherLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="afsp" className="flex-1 flex flex-col">{children}</div>;
}
