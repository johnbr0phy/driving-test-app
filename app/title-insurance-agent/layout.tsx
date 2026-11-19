import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("titleagent");

export default function TitleAgentLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="titleagent" className="flex-1 flex flex-col">{children}</div>;
}
