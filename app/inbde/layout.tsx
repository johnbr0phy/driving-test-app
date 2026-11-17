import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("inbde");

export default function InbdeLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="inbde" className="flex-1 flex flex-col">{children}</div>;
}
