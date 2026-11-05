import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("pkpaf");

export default function PkpafLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="pkpaf" className="flex-1 flex flex-col">{children}</div>;
}
