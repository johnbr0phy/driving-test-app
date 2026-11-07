import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("hubizt");

export default function HubiztLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hubizt" className="flex-1 flex flex-col">{children}</div>;
}
