import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cacit");

export default function CacitLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cacit" className="flex-1 flex flex-col">{children}</div>;
}
