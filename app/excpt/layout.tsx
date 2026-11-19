import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("excpt");

export default function ExcptLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="excpt" className="flex-1 flex flex-col">{children}</div>;
}
