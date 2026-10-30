import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukaplh");

export default function UkaplhLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukaplh" className="flex-1 flex flex-col">{children}</div>;
}
