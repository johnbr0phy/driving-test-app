import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("zak53");

export default function Zak53Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="zak53" className="flex-1 flex flex-col">{children}</div>;
}
