import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("atvsafety");

export default function AtvSafetyLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="atvsafety" className="flex-1 flex flex-col">{children}</div>;
}
