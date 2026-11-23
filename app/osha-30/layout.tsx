import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("osha30");

export default function Osha30Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="osha30" className="flex-1 flex flex-col">{children}</div>;
}
