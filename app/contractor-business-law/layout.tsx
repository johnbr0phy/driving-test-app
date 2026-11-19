import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("contractorlaw");

export default function ContractorLawLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="contractorlaw" className="flex-1 flex flex-col">{children}</div>;
}
