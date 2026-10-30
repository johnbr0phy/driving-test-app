import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukcare");

export default function UkcareLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukcare" className="flex-1 flex flex-col">{children}</div>;
}
