import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hklesfi1");

export default function HkLePaper1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hklesfi1" className="flex-1 flex flex-col">{children}</div>;
}
