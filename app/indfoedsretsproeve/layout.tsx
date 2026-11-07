import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("dkindfoed");

export default function DkindfoedLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dkindfoed" className="flex-1 flex flex-col">{children}</div>;
}
