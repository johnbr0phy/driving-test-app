import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("txadjuster");

export default function TxAdjusterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="txadjuster" className="flex-1 flex flex-col">{children}</div>;
}
