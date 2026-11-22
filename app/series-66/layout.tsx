import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("series66");

export default function Series66Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="series66" className="flex-1 flex flex-col">{children}</div>;
}
