import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ieplumbt2");

export default function IePlumbT2Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ieplumbt2" className="flex-1 flex flex-col">{children}</div>;
}
