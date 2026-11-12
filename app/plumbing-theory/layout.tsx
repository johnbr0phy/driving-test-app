import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukplumb");

export default function UkplumbLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukplumb" className="flex-1 flex flex-col">{children}</div>;
}
