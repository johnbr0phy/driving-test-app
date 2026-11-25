import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("gulfmd");

export default function GulfmdLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="gulfmd" className="flex-1 flex flex-col">{children}</div>;
}
