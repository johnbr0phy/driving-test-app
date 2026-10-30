import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufss");

export default function AufssLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufss" className="flex-1 flex flex-col">{children}</div>;
}
