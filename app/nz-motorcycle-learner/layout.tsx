import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzmoto");

export default function NzmotoLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzmoto" className="flex-1 flex flex-col">{children}</div>;
}
