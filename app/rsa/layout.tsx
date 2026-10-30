import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aursa");

export default function AursaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aursa" className="flex-1 flex flex-col">{children}</div>;
}
