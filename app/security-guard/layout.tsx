import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("security");

export default function SecurityGuardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="security" className="flex-1 flex flex-col">{children}</div>;
}
