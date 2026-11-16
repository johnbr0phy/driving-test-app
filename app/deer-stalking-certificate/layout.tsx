import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukdsc1");

export default function Ukdsc1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukdsc1" className="flex-1 flex flex-col">{children}</div>;
}
