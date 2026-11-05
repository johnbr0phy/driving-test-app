import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzheavy");

export default function NzheavyLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzheavy" className="flex-1 flex flex-col">{children}</div>;
}
