import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nzforklift");

export default function NzForkliftLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nzforklift" className="flex-1 flex flex-col">{children}</div>;
}
