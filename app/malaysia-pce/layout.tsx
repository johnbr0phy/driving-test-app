import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mypce");

export default function MypceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mypce" className="flex-1 flex flex-col">{children}</div>;
}
