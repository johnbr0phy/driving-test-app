import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("frmoto");

export default function FrmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="frmoto" className="flex-1 flex flex-col">{children}</div>;
}
