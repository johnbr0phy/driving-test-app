"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect /questions to /stats (pages merged)
export default function QuestionsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/stats");
  }, [router]);

  return null;
}
