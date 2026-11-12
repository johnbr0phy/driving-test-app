import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukwater");

export default function UkwaterLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukwater" className="flex-1 flex flex-col">{children}</div>;
}
