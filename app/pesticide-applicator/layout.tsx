import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pesticide");

export default function PesticideLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pesticide" className="flex-1 flex flex-col">{children}</div>;
}
