import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("nhie");

export default function HomeInspectorLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="nhie" className="flex-1 flex flex-col">{children}</div>;
}
