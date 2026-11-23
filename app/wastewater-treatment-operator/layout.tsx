import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("wastewaterop");

export default function WastewaterOpLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="wastewaterop" className="flex-1 flex flex-col">{children}</div>;
}
