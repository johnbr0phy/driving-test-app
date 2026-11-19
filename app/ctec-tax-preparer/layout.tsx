import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ctec");

export default function CtecTaxPreparerLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ctec" className="flex-1 flex flex-col">{children}</div>;
}
