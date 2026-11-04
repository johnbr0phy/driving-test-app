import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aswbclin");

export default function AswbClinLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aswbclin" className="flex-1 flex flex-col">{children}</div>;
}
