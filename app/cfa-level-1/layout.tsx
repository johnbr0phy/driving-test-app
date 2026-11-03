import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cfal1");

export default function CfaLevel1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cfal1" className="flex-1 flex flex-col">{children}</div>;
}
