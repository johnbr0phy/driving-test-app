import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("trcnpqe");

export default function TrcnpqeLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="trcnpqe" className="flex-1 flex flex-col">{children}</div>;
}
