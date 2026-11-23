"use client";

// Delete a class from its page, after a typed confirmation: the class and
// every student's progress in it are gone for good.

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import { Trash2 } from "lucide-react";
import { teachFetch } from "@/lib/teachClient";
import { useTeachCopy } from "@/components/teach/useTeachCopy";

export function DeleteClassButton({ user, code, className, memberCount }: { user: User; code: string; className: string; memberCount: number }) {
  const router = useRouter();
  const c = useTeachCopy();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const remove = async () => {
    const ok = window.confirm(c.deleteConfirm(className, memberCount));
    if (!ok) return;
    setBusy(true);
    setError("");
    try {
      await teachFetch<{ ok: boolean }>(user, `/api/classes/${code}`, { method: "DELETE" });
      router.replace("/teach");
    } catch (err) {
      setError(err instanceof Error ? err.message : c.errDelete);
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-red-200 dark:border-red-900 bg-white dark:bg-gray-900 p-5">
      <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{c.deleteTitle}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {c.deleteBody}
      </p>
      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md border border-red-300 dark:border-red-800 px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <Trash2 className="w-4 h-4" aria-hidden="true" />
        {busy ? c.deleting : c.deleteClass}
      </button>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}
