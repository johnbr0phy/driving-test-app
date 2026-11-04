import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phr");

export default function PhrLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phr" className="flex-1 flex flex-col">{children}</div>;
}
