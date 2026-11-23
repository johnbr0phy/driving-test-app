import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aseg1");

export default function AseG1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aseg1" className="flex-1 flex flex-col">{children}</div>;
}
