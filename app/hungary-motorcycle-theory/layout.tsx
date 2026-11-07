import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hukreszmoto");

export default function HukreszmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hukreszmoto" className="flex-1 flex flex-col">{children}</div>;
}
