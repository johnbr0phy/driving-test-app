import type { Metadata } from "next";
import { examAppMetadata } from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("foodmgr");

export default function FoodmgrLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="foodmgr" className="flex-1 flex flex-col">{children}</div>;
}
