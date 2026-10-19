"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

// Shield link to /admin, shown only to admins, in every site header.
export function AdminLink() {
  const isAdmin = useAdmin();
  if (!isAdmin) return null;
  return (
    <Link href="/admin" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50" title="Admin Dashboard">
      <Shield className="h-5 w-5" />
    </Link>
  );
}
