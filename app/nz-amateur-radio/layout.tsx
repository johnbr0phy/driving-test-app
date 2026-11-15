import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzham");

export default function NzhamLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzham" className="flex-1 flex flex-col">{children}</div>;
}
