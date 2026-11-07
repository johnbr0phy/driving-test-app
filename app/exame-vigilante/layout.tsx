import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ptvigil");

export default function PtvigilLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ptvigil" className="flex-1 flex flex-col">{children}</div>;
}
