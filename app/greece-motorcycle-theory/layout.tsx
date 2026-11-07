import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("grmoto");

export default function GrmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="grmoto" className="flex-1 flex flex-col">{children}</div>;
}
