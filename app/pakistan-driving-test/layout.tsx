import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pkdrive");

export default function PkdriveLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pkdrive" className="flex-1 flex flex-col">{children}</div>;
}
