"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Loader2, X } from "lucide-react";

interface WeakCategory {
  category: string;
  wrong: number;
  total: number;
  accuracy: number;
}

interface EmailResultsCaptureProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  stateName: string;
  testId: number;
  weakCategories: WeakCategory[];
}

type CaptureState = "idle" | "loading" | "success" | "error" | "dismissed";

export function EmailResultsCapture({
  score,
  totalQuestions,
  percentage,
  passed,
  stateName,
  testId,
  weakCategories,
}: EmailResultsCaptureProps) {
  const [state, setState] = useState<CaptureState>("idle");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (state === "dismissed") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/email-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          score,
          total: totalQuestions,
          percentage,
          passed,
          stateName,
          testId,
          weakCategories,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setState("success");
      } else {
        setState("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Results sent!</div>
              <div className="text-sm text-gray-600">
                Check your inbox — we&apos;ve sent your score breakdown and weak spots to <strong>{email}</strong>.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-brand-border-light bg-gradient-to-r from-brand-light to-brand-gradient-to">
      <CardContent className="py-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <Mail className="w-5 h-5 text-brand" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-base leading-tight">
                Email me my results
              </h3>
              <button
                onClick={() => setState("dismissed")}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get your score breakdown and weak categories sent to your inbox — so you know exactly what to study next.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                disabled={state === "loading"}
              />
              <Button
                type="submit"
                disabled={state === "loading" || !email.trim()}
                className="bg-brand text-white hover:bg-brand-hover whitespace-nowrap text-sm px-4 py-2 h-auto"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send results"
                )}
              </Button>
            </form>

            {state === "error" && (
              <p className="text-xs text-red-600 mt-2">{errorMsg}</p>
            )}

            <p className="text-xs text-gray-400 mt-2">
              No account needed. We&apos;ll only send you this email.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
