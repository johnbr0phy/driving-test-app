import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hkiiqe1");

export default function IiqePaper1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hkiiqe1" className="flex-1 flex flex-col">{children}</div>;
}
