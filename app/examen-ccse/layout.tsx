import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("esccse");

export default function EsccseLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="esccse" className="flex-1 flex flex-col">{children}</div>;
}
