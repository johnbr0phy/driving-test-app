import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("betoelating");

export default function BetoelatingLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="betoelating" className="flex-1 flex flex-col">{children}</div>;
}
