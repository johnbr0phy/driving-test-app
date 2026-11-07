import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("grinsure");

export default function GrinsureLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="grinsure" className="flex-1 flex flex-col">{children}</div>;
}
