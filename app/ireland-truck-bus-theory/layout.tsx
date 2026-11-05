import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("iedttcv");

export default function IedttcvLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="iedttcv" className="flex-1 flex flex-col">{children}</div>;
}
