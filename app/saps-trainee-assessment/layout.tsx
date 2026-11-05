import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zasaps");

export default function ZasapsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zasaps" className="flex-1 flex flex-col">{children}</div>;
}
