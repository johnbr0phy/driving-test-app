import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ppsc");

export default function PpscLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ppsc" className="flex-1 flex flex-col">{children}</div>;
}
