import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("series6");

export default function Series6Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="series6" className="flex-1 flex flex-col">{children}</div>;
}
