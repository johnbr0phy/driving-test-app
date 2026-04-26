"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface TestPageHeaderProps {
  backHref: string;
  right?: React.ReactNode;
}

export function TestPageHeader({ backHref, right }: TestPageHeaderProps) {
  const { t } = useTranslation();
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={backHref}>
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
