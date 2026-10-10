import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("boating");

export default function BoatingLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="boating" className="flex-1 flex flex-col">{children}</div>;
}
