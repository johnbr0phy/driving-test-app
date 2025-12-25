"use client";

import { useAuth } from "@/contexts/AuthContext";
import { isAdminEmail } from "@/lib/admin";

export function useAdmin(): boolean {
  const { user } = useAuth();
  return isAdminEmail(user?.email);
}
