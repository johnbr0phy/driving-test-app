import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pkpnmc");

export default function PkpnmcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pkpnmc" className="flex-1 flex flex-col">{children}</div>;
}
