import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ccrn");

export default function CcrnLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ccrn" className="flex-1 flex flex-col">{children}</div>;
}
