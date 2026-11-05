import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("phinsurance");

export default function PhinsuranceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="phinsurance" className="flex-1 flex flex-col">{children}</div>;
}
