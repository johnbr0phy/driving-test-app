import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aufirearmsvic");

export default function VicFirearmsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aufirearmsvic" className="flex-1 flex flex-col">{children}</div>;
}
