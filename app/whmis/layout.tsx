import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cawhmis");

export default function CawhmisLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cawhmis" className="flex-1 flex flex-col">{children}</div>;
}
