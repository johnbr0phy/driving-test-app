import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cpatcp");

export default function CpaTcpLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cpatcp" className="flex-1 flex flex-col">{children}</div>;
}
