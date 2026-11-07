import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("dkmedborger");

export default function DkmedborgerLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="dkmedborger" className="flex-1 flex flex-col">{children}</div>;
}
