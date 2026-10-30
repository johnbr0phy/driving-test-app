import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("auwhite");

export default function WhiteCardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="auwhite" className="flex-1 flex flex-col">{children}</div>;
}
