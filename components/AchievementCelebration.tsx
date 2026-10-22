"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Check, Sparkles, Star } from "lucide-react";
import { getTigerAsset } from "@/lib/tigerAssets";
import styles from "./AchievementCelebration.module.css";

/** The shared achievement card. Callers decide what was earned and where to go next. */
export function AchievementCelebration({
  examId = "dmv",
  eyebrow,
  title,
  description,
  detail,
  children,
  earned = false,
  headingLevel = 2,
  className = "",
}: {
  examId?: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  detail?: ReactNode;
  children?: ReactNode;
  /** True only for a completion earned in this visit, never restored progress. */
  earned?: boolean;
  headingLevel?: 1 | 2;
  className?: string;
}) {
  const titleId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Heading = headingLevel === 1 ? "h1" : "h2";

  // The question and its Next button have gone away. Announce the result once
  // by focusing its heading, without adding another live-region announcement.
  useEffect(() => {
    if (earned) headingRef.current?.focus({ preventScroll: true });
  }, [earned]);

  return (
    <section
      aria-labelledby={titleId}
      data-achievement={earned ? "earned" : "saved"}
      className={`${styles.card} ${earned ? styles.earned : ""} mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-green-200 bg-white text-center shadow-sm dark:border-green-800 dark:bg-gray-900 ${className}`}
    >
      <div className="px-5 pb-6 pt-7 sm:px-8 sm:pt-8">
        <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-green-100 dark:bg-green-950" aria-hidden="true">
          <div className="absolute inset-2 rounded-full border border-green-200 dark:border-green-800" />
          <Star className={`${styles.star} absolute -left-3 top-7 h-7 w-7 fill-amber-300 text-amber-500 dark:text-amber-300`} />
          <Sparkles className={`${styles.sparkle} absolute -right-3 top-3 h-8 w-8 text-green-600 dark:text-green-400`} />
          <Image src={getTigerAsset(examId, 1)} alt="" width={140} height={140} className={`${styles.tiger} relative h-36 w-36 object-contain`} />
          <span className={`${styles.badge} absolute -bottom-2 right-0 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-green-600 text-white shadow-sm dark:border-gray-900`}>
            <Check className="h-6 w-6" strokeWidth={3} />
          </span>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-700 dark:text-green-300">{eyebrow}</p>
        <Heading id={titleId} ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 outline-none dark:text-gray-50 sm:text-3xl">{title}</Heading>
        <div className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-gray-600 dark:text-gray-300">{description}</div>
        {detail && <div className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold leading-relaxed text-green-800 dark:bg-green-950 dark:text-green-200">{detail}</div>}
      </div>
      {children && <div className="flex flex-col gap-2 border-t border-green-100 bg-green-50/50 px-5 py-5 dark:border-green-900 dark:bg-green-950/30 sm:px-8">{children}</div>}
    </section>
  );
}
