import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zak53c3");

export default function Zak53c3Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zak53c3" className="flex-1 flex flex-col">{children}</div>;
}
