"use client";

// Dashboard building blocks shared by the DMV and HTL dashboards: the
// step/progress card with its stamp, and the height-animated collapse used
// for the per-test attempt drop-down. Moved verbatim from app/dashboard.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronRight, Lock } from "lucide-react";

export function Stamp({ label, color }: { label: string; color: "green" | "amber" | "red" }) {
  const colors = {
    green: "border-green-500 text-green-600 bg-green-50",
    amber: "border-amber-500 text-amber-600 bg-amber-50",
    red: "border-red-400 text-red-500 bg-red-50",
  };
  return (
    <div className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${colors[color]} -rotate-3`}>
      {label}
    </div>
  );
}

export function ProgressCard({
  title,
  subtitle,
  completed,
  stamp,
  href,
  onClick,
  isPremiumLocked,
  stepNumber,
  attachedBottom,
  children,
}: {
  title: string;
  subtitle: string;
  completed: boolean;
  stamp?: { label: string; color: "green" | "amber" | "red" };
  href?: string;
  onClick?: () => void;
  isPremiumLocked?: boolean;
  stepNumber?: number;
  // Squares off the bottom so an expansion panel can attach flush below
  attachedBottom?: boolean;
  children?: React.ReactNode;
}) {
  const content = (
    <Card className={`transition-all duration-300 ${
      completed
        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm"
        : "bg-white border-gray-100 hover:shadow-md cursor-pointer"
    } ${attachedBottom ? "rounded-b-none border-b-0 shadow-none hover:shadow-none" : ""}`}>
      <CardContent className="p-4 flex items-center gap-3">
        {/* Completion indicator */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative ${
          completed ? "bg-green-500 text-white" : "bg-white border-2 border-gray-300 text-gray-600"
        }`}>
          {completed ? (
            <>
              {stepNumber ? (
                <>
                  <span className="text-sm font-bold text-white">{stepNumber}</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-green-200 flex items-center justify-center leading-none">
                    <Check className="w-2.5 h-2.5 text-green-700" strokeWidth={3} />
                  </span>
                </>
              ) : (
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              )}
            </>
          ) : stepNumber ? (
            <span className="text-sm font-bold text-gray-600">{stepNumber}</span>
          ) : (
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm flex items-center gap-1.5 ${completed ? "text-green-800" : "text-gray-700"}`}>
            {title}
            {isPremiumLocked && <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
          </h3>
          <p className={`text-xs mt-0.5 ${completed ? "text-green-600" : "text-gray-500"}`}>
            {subtitle}
          </p>
          {children}
        </div>

        {stamp ? (
          <Stamp label={stamp.label} color={stamp.color} />
        ) : (
          <ChevronRight className={`h-5 w-5 flex-shrink-0 ${completed ? "text-green-400" : "text-gray-300"}`} />
        )}
      </CardContent>
    </Card>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Height-animated collapse for the test drop-downs. Measures its content and
// transitions a pixel height — grid-template-rows fr transitions are
// unreliable in Chrome, so this does it the dependable way.
export function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setContentHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      inert={!open}
      className={`overflow-hidden transition-[height,opacity] duration-300 ease-in-out ${
        open ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: open ? contentHeight : 0 }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
