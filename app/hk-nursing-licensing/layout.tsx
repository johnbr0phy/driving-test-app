import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hknurse");

export default function HkNursingLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hknurse" className="flex-1 flex flex-col">{children}</div>;
}
