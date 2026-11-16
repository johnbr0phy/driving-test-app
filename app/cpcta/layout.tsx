import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpcta");

export default function CpctaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpcta" className="flex-1 flex flex-col">{children}</div>;
}
