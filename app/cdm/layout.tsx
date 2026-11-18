import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cdm");

export default function CdmLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cdm" className="flex-1 flex flex-col">{children}</div>;
}
