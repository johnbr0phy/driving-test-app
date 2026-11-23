import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("series24");

export default function Series24Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="series24" className="flex-1 flex flex-col">{children}</div>;
}
