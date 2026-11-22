import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("acls");

export default function AclsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="acls" className="flex-1 flex flex-col">{children}</div>;
}
