import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("epa608");

export default function Epa608Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="epa608" className="flex-1 flex flex-col">{children}</div>;
}
