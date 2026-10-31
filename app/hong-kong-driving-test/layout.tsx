import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hkdrive");

export default function HkdriveLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hkdrive" className="flex-1 flex flex-col">{children}</div>;
}
