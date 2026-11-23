import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("frm1");

export default function FrmPart1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="frm1" className="flex-1 flex flex-col">{children}</div>;
}
