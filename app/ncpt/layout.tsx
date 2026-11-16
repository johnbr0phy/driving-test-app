import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("ncpt");

export default function NcptLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ncpt" className="flex-1 flex flex-col">{children}</div>;
}
