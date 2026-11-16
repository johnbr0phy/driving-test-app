import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ea1");

export default function EnrolledAgentPart1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ea1" className="flex-1 flex flex-col">{children}</div>;
}
