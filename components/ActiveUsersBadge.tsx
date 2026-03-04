"use client";

import { useActiveUsers } from "@/hooks/useActiveUsers";

export function ActiveUsersBadge() {
  const count = useActiveUsers();

  if (count === null || count < 2) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>{count} people studying right now</span>
    </div>
  );
}
