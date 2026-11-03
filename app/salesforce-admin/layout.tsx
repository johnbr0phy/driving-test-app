import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("sfadmin");

export default function SalesforceAdminLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="sfadmin" className="flex-1 flex flex-col">{children}</div>;
}
