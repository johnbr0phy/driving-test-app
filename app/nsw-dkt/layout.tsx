import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aunsw");

export default function AunswLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aunsw" className="flex-1 flex flex-col">{children}</div>;
}
