import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cssyb");

export default function SixSigmaYellowBeltLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cssyb" className="flex-1 flex flex-col">{children}</div>;
}
