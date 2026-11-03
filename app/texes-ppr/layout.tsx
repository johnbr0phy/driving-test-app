import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("texesppr");

export default function TexespprLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="texesppr" className="flex-1 flex flex-col">{children}</div>;
}
