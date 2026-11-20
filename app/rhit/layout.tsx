import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rhit");

export default function RhitLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rhit" className="flex-1 flex flex-col">{children}</div>;
}
