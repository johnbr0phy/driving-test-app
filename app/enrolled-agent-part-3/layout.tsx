import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ea3");

export default function EnrolledAgentPart3Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ea3" className="flex-1 flex flex-col">{children}</div>;
}
