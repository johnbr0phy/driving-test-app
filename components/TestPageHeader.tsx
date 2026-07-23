"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface TestPageHeaderProps {
  backHref: string;
  right?: React.ReactNode;
  // Pins the header while scrolling — used on results so Back stays
  // reachable from deep inside the miss drill.
  sticky?: boolean;
}

export function TestPageHeader({ backHref, right, sticky }: TestPageHeaderProps) {
  const { t } = useTranslation();
  return (
    <header className={`relative border-b bg-white ${sticky ? "sticky top-0 z-40" : ""}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={backHref} className="-ml-4">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("common.back")}
          </Button>
        </Link>
        {right ? <div className="flex items-center gap-3">{right}</div> : null}
      </div>
    </header>
  );
}
