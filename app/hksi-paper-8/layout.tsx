import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hklesfi8");

export default function HksiPaper8Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hklesfi8" className="flex-1 flex flex-col">{children}</div>;
}
