import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ea2");

export default function EnrolledAgentPart2Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ea2" className="flex-1 flex flex-col">{children}</div>;
}
