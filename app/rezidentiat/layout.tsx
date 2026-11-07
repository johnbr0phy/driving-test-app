import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("rorezid");

export default function RorezidLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="rorezid" className="flex-1 flex flex-col">{children}</div>;
}
