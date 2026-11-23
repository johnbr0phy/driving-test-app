import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ncmhce");

export default function NcmhceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ncmhce" className="flex-1 flex flex-col">{children}</div>;
}
