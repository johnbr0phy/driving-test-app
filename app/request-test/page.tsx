"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  getTestRequestPick,
  TEST_REQUEST_MAX_DETAILS,
  TEST_REQUEST_PICKS,
} from "@/lib/test-requests";

type Status = "form" | "sending" | "sent" | "error";

function RequestTestContent() {
  const params = useSearchParams();
  const token = params.get("t") ?? "";
  const source = params.get("src") ?? "page";
  const [pickId, setPickId] = useState(getTestRequestPick(params.get("pick"))?.id ?? "other");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<Status>("form");

  const pick = getTestRequestPick(pickId)!;
  const arrivedWithPick = !!getTestRequestPick(params.get("pick"));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (details.trim().length < 2) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback/test-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, pick: pickId, details: details.trim(), source }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {status === "sent" ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-3">Got it. Thank you.</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I read every one of these, and the tests people ask for are the ones that get built.
            </p>
            <Link
              href="/tests"
              className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 font-medium rounded-xl py-3 px-6 transition-colors"
            >
              See every test we have today
            </Link>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-3">
                {arrivedWithPick ? "Noted. Which test exactly?" : "What test should we build next?"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Name the exam you&apos;re studying for, or wish existed. If it&apos;s not on
                Tigertest yet, there&apos;s a good chance it will be.
              </p>
            </div>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5" htmlFor="pick">
              Category
            </label>
            <select
              id="pick"
              value={pickId}
              onChange={(e) => setPickId(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 mb-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
            >
              {TEST_REQUEST_PICKS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5" htmlFor="details">
              Which test?
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value.slice(0, TEST_REQUEST_MAX_DETAILS))}
              placeholder={`For example: ${pick.hint}`}
              rows={4}
              required
              className="w-full border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 mb-2 text-gray-900 dark:text-gray-50 placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              The state, the exam name, when you&apos;re taking it. Anything helps.
            </p>

            {status === "error" && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                That didn&apos;t go through. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || details.trim().length < 2}
              className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 text-white dark:text-gray-900 font-semibold rounded-xl py-3.5 px-6 transition-colors"
            >
              {status === "sending" ? "Sending..." : "Send to John"}
            </button>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <Link href="/tests" className="underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300">
                See the tests we have today
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function RequestTestPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-brand rounded-full animate-spin"></div>
        </div>
      }
    >
      <RequestTestContent />
    </Suspense>
  );
}
