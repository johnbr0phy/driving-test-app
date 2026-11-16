import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("cabcguard");

export default function BcGuardLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cabcguard" className="flex-1 flex flex-col">{children}</div>;
}
