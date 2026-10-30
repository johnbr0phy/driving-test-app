import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("series7");

export default function Series7Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="series7" className="flex-1 flex flex-col">{children}</div>;
}
