import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("series65");

export default function Series65Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="series65" className="flex-1 flex flex-col">{children}</div>;
}
