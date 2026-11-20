import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cct");

export default function CctLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cct" className="flex-1 flex flex-col">{children}</div>;
}
