import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hesi");

export default function HesiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hesi" className="flex-1 flex flex-col">{children}</div>;
}
