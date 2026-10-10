import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("aws");

export default function AwsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aws" className="flex-1 flex flex-col">{children}</div>;
}
