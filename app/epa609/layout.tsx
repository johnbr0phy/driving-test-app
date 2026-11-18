import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("epa609");

export default function Epa609Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="epa609" className="flex-1 flex flex-col">{children}</div>;
}
