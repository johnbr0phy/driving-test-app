import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("asvab");

export default function AsvabLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="asvab" className="flex-1 flex flex-col">{children}</div>;
}
