import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("uksqe1");

export default function UkSqe1Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="uksqe1" className="flex-1 flex flex-col">{children}</div>;
}
