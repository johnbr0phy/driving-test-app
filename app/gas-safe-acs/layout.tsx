import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukgas");

export default function UkgasLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukgas" className="flex-1 flex flex-col">{children}</div>;
}
