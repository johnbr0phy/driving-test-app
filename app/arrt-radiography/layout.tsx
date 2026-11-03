import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("arrt");

export default function ArrtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="arrt" className="flex-1 flex flex-col">{children}</div>;
}
