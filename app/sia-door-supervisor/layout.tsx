import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("uksia");

export default function UksiaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="uksia" className="flex-1 flex flex-col">{children}</div>;
}
