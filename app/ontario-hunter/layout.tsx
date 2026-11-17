import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cahunteron");

export default function OntarioHunterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cahunteron" className="flex-1 flex flex-col">{children}</div>;
}
