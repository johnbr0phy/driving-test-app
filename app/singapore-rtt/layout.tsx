import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgrtt");

export default function SgrttLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgrtt" className="flex-1 flex flex-col">{children}</div>;
}
