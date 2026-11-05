import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("iesafepass");

export default function IeSafePassLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="iesafepass" className="flex-1 flex flex-col">{children}</div>;
}
