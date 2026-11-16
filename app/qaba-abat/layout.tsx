import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("qabaabat");

export default function QabaAbatLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="qabaabat" className="flex-1 flex flex-col">{children}</div>;
}
