import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ccma");

export default function CcmaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ccma" className="flex-1 flex flex-col">{children}</div>;
}
