import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("txpersonal");

export default function TexasPersonalLinesLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="txpersonal" className="flex-1 flex flex-col">{children}</div>;
}
