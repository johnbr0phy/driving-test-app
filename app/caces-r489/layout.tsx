import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("frcaces");

export default function FrcacesLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="frcaces" className="flex-1 flex flex-col">{children}</div>;
}
