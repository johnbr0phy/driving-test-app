import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("camb");

export default function CambLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="camb" className="flex-1 flex flex-col">{children}</div>;
}
