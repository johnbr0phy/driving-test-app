import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukrbi");

export default function UkrbiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukrbi" className="flex-1 flex flex-col">{children}</div>;
}
