import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cssgb");

export default function SixSigmaGreenBeltLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cssgb" className="flex-1 flex flex-col">{children}</div>;
}
