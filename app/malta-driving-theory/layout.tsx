import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mttheory");

export default function MttheoryLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mttheory" className="flex-1 flex flex-col">{children}</div>;
}
