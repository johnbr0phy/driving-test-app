import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzdrone");

export default function NzDroneLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzdrone" className="flex-1 flex flex-col">{children}</div>;
}
