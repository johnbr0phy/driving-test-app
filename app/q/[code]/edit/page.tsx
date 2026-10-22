"use client";

// Edit a quiz you own: the same editor as /create, plus the share link, the
// report count and Delete. Anyone else is sent to the play page.

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Copy, Flag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { QuizSync } from "@/components/quiz/QuizSync";
import { QuizEditor } from "@/components/quiz/create/QuizEditor";
import { loadQuiz, quizFetch } from "@/lib/quizClient";
import { normalizeQuizCode, quizLink, quizPath, quizUrl, type QuizPublic } from "@/lib/quizzes";
import { useQuizStore } from "@/store/useQuizStore";

export default function EditQuizPage() {
  const params = useParams<{ code: string }>();
  const code = normalizeQuizCode(String(params?.code ?? ""));
  const { user, loading } = useAuth();
  const router = useRouter();
  const isAdmin = useAdmin();
  const forgetQuiz = useQuizStore((s) => s.forgetQuiz);
  const [quiz, setQuiz] = useState<QuizPublic | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing" | "error">("loading");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [featuredBusy, setFeaturedBusy] = useState(false);
  const [featuredError, setFeaturedError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(`${quizPath(code)}/edit`)}`);
      return;
    }
    let cancelled = false;
    loadQuiz(user, code)
      .then((q) => {
        if (cancelled) return;
        if (!q) return setState("missing");
        if (!q.mine) return router.replace(quizPath(code));
        setQuiz(q);
        setFeatured(!!q.featured);
        setState("ready");
      })
      .catch((e) => {
        if (cancelled) return;
        setMessage(e instanceof Error ? e.message : "Couldn't load the quiz.");
        setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [loading, user, code, router]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(quizUrl(code));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", quizUrl(code));
    }
  };

  // Admin only: feature the quiz in the /quizzes library, saved at once, apart from Save.
  const toggleFeatured = async (next: boolean) => {
    if (!user || featuredBusy) return;
    setFeaturedBusy(true);
    setFeaturedError("");
    setFeatured(next);
    try {
      const updated = await quizFetch<QuizPublic>(user, `/api/quizzes/${code}`, { method: "PATCH", body: JSON.stringify({ featured: next }) });
      setFeatured(!!updated.featured);
    } catch (e) {
      setFeatured(!next);
      setFeaturedError(e instanceof Error ? e.message : "Couldn't update the featured flag.");
    } finally {
      setFeaturedBusy(false);
    }
  };

  const destroy = async () => {
    if (!user || deleting) return;
    setDeleting(true);
    try {
      await quizFetch(user, `/api/quizzes/${code}`, { method: "DELETE" });
      forgetQuiz(code);
      router.push("/create");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Couldn't delete the quiz.");
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (loading || !user || state === "loading") return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  if (state !== "ready" || !quiz) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 py-16 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{state === "missing" ? "No such quiz" : "Couldn't load the quiz"}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{state === "missing" ? "It may have been deleted." : message}</p>
          <Link href="/create" className="inline-block mt-6 underline text-gray-700 dark:text-gray-200">
            Your quizzes
          </Link>
        </div>
      </div>
    );
  }

  const reports = quiz.reports ?? 0;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <QuizSync />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-3xl">
        <Link href="/create" className="text-sm text-gray-600 dark:text-gray-300 underline">
          Your quizzes
        </Link>
        <div className="mt-3">
          <QuizEditor
            mode="edit"
            code={code}
            initial={{
              title: quiz.title,
              description: quiz.description,
              visibility: quiz.visibility,
              passPct: quiz.passPct,
              questions: quiz.questions,
            }}
            featuredControl={
              isAdmin ? (
                <div className="mt-3">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100">
                    <input
                      type="checkbox"
                      checked={featured}
                      disabled={featuredBusy}
                      onChange={(e) => toggleFeatured(e.target.checked)}
                      className="h-4 w-4 accent-green-600"
                    />
                    Feature in the library (admin)
                  </label>
                  {featuredError && (
                    <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {featuredError}
                    </p>
                  )}
                </div>
              ) : null
            }
          >
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-5 mb-6 space-y-3 text-sm">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-gray-600 dark:text-gray-300">Share:</span>
                <Link href={quizPath(code)} className="font-mono text-gray-900 dark:text-gray-50 underline break-all">
                  {quizLink(code)}
                </Link>
                <button type="button" onClick={copy} className="inline-flex items-center gap-1 underline text-gray-700 dark:text-gray-200">
                  {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {quiz.plays} {quiz.plays === 1 ? "play" : "plays"} · {quiz.memberCount} {quiz.memberCount === 1 ? "player" : "players"} ·{" "}
                <Link href={`${quizPath(code)}/report`} className="underline">
                  Who played
                </Link>
              </p>
              {reports > 0 && (
                <p className="text-amber-700 dark:text-amber-300">
                  <Flag className="inline w-3.5 h-3.5 mr-1 -mt-0.5" aria-hidden="true" />
                  <Link href={`${quizPath(code)}/report`} className="underline">
                    {reports} {reports === 1 ? "report" : "reports"} from players
                  </Link>{" "}
                  that a question is wrong or unclear.
                </p>
              )}
              <div className="pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirming(true)}
                  className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" /> Delete quiz
                </Button>
              </div>
            </div>
          </QuizEditor>
        </div>
      </div>

      <Dialog open={confirming} onOpenChange={(open) => !deleting && setConfirming(open)}>
        <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-50">Delete &quot;{quiz.title}&quot;?</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              The link stops working for everyone who has it, and the players&apos; results go with it. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {message && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {message}
            </p>
          )}
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setConfirming(false)} disabled={deleting}>
              Keep it
            </Button>
            <Button type="button" onClick={destroy} disabled={deleting} className="bg-red-600 hover:bg-red-700 text-white">
              {deleting ? "Deleting..." : "Delete quiz"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
