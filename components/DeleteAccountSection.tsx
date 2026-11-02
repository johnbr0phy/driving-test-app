"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

// Settings > Delete account: removes the account and its data through
// /api/account/delete (what it removes and keeps is listed there and in the
// privacy policy), then signs out on this device.
export function DeleteAccountSection() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const confirm = async () => {
    if (!user) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken(true)}` },
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(
          data.error === "reauth"
            ? "For safety, sign out, sign back in, then delete the account."
            : data.error ?? "Something went wrong. Please try again.",
        );
        setBusy(false);
        return;
      }
      await logout().catch(() => {});
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Delete account</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Deletes your account, progress on every test, your quizzes and the classes you teach. Payment records are
        kept for tax purposes.
      </p>
      <Button onClick={() => setOpen(true)} variant="destructive" className="w-full">
        <UserX className="h-4 w-4 mr-2" />
        Delete account
      </Button>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (busy) return;
          setOpen(o);
          setTyped("");
          setError("");
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400">Delete your account?</DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-left">
              <span className="block text-gray-700 dark:text-gray-200">
                This permanently deletes {user?.email ?? "your account"}, all your progress, the quizzes you made and the
                classes you teach (with their students&apos; results). It cannot be undone.
              </span>
              <span className="block text-gray-700 dark:text-gray-200">Type DELETE to confirm.</span>
            </DialogDescription>
          </DialogHeader>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            aria-label="Type DELETE to confirm"
            autoCapitalize="characters"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
          />
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              className="bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700"
              onClick={() => setOpen(false)}
              disabled={busy}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirm} disabled={busy || typed.trim().toUpperCase() !== "DELETE"}>
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
