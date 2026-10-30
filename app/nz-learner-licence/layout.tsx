import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzroad");

export default function NzroadLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzroad" className="flex-1 flex flex-col">{children}</div>;
}
