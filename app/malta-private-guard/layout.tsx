import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mtguard");

export default function MtGuardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mtguard" className="flex-1 flex flex-col">{children}</div>;
}
