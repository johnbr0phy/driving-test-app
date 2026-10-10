import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("part107");

export default function Part107Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="part107" className="flex-1 flex flex-col">{children}</div>;
}
