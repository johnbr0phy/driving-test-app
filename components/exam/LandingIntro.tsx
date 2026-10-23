import type { ReactNode } from "react";

/** Shared landing-page introduction: description, centered primary action, then a real preview. */
export function LandingIntro({ subtitle, action, children }: { subtitle: string; action: ReactNode; children?: ReactNode }) {
  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">{subtitle}</p>
      <div className="flex flex-col items-center gap-3">{action}</div>
      {children}
    </>
  );
}
