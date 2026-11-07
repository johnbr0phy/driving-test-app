import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("mtcpc");

export default function MtcpcLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="mtcpc" className="flex-1 flex flex-col">{children}</div>;
}
