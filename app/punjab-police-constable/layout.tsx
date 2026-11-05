import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("punjabpolice");

export default function PunjabpoliceLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="punjabpolice" className="flex-1 flex flex-col">{children}</div>;
}
