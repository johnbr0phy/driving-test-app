import type { ReactNode } from "react";

/**
 * The header logo: tiger, "tigertest" wordmark, and the current test's name
 * under it in the theme's brand color. The text hides below `sm`, leaving the
 * tiger on phones. Static SVG versions are built by scripts/build-logo-svgs.mjs.
 */
export function BrandLockup({ icon, subtitle }: { icon: ReactNode; subtitle?: string | null }) {
  return (
    <span className="flex items-center gap-2.5">
      {icon}
      <span className="hidden sm:flex flex-col justify-center group-hover:opacity-80 transition-opacity">
        <span className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-50">tigertest</span>
        {subtitle && <span className="mt-1 text-sm font-medium leading-none text-brand dark:text-brand-dark">{subtitle}</span>}
      </span>
    </span>
  );
}
