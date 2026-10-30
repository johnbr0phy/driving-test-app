import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ukpcv");

export default function UkpcvLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ukpcv" className="flex-1 flex flex-col">{children}</div>;
}
