import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aedhapharm");

export default function AedhapharmLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aedhapharm" className="flex-1 flex flex-col">{children}</div>;
}
