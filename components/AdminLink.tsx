"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

// Shield link to /admin/v2, shown only to admins, in every site header.
export function AdminLink() {
  const isAdmin = useAdmin();
  if (!isAdmin) return null;
  return (
    <Link href="/admin/v2" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 transition-colors" title="Admin Dashboard">
      <Shield className="h-5 w-5" />
    </Link>
  );
}
