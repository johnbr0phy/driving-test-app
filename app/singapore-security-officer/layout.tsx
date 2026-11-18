import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sgsecurity");

export default function SgSecurityLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sgsecurity" className="flex-1 flex flex-col">{children}</div>;
}
