import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hklesfi7");

export default function HksiPaper7Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hklesfi7" className="flex-1 flex flex-col">{children}</div>;
}
