import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ncma");

export default function NcmaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ncma" className="flex-1 flex flex-col">{children}</div>;
}
