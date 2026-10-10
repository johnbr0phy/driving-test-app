import type { CSSProperties } from "react";
import { ExamV2Config } from "@/lib/v2/types";
import { V2Sync } from "./V2Sync";
import "./v2.css";

/** Scopes the v2 theme tokens and styles to the exam's pages. Takes only the
 *  theme (plain strings) so a server layout can render it. */
export function V2Shell({ theme, children }: { theme: ExamV2Config["theme"]; children: React.ReactNode }) {
  const style = {
    "--v2-brand-override": theme.brand,
    "--v2-brand-dark-override": theme.brandDark,
    "--v2-brand-light-override": theme.brandLight,
  } as CSSProperties;
  return (
    <div className="v2-shell flex flex-1 flex-col bg-gray-50" style={style}>
      <V2Sync />
      {children}
    </div>
  );
}
