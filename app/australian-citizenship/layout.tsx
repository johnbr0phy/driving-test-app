import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aucit");

export default function AucitLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aucit" className="flex-1 flex flex-col">{children}</div>;
}
