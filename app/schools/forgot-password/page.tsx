"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, MailCheck } from "lucide-react";

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(prefillEmail);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/user-not-found" || code === "auth/invalid-email") {
        // Don't reveal whether the email exists — security best practice
        setSent(true);
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a few minutes and try again.");
      } else {
        setError("Could not send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-gray-900">
              Tiger<span className="text-brand">Test</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 mt-1">for Driving Schools</p>
        </div>

        <Card>
          {sent ? (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <MailCheck className="h-10 w-10 text-brand" />
                </div>
                <CardTitle className="text-xl">Check your inbox</CardTitle>
                <CardDescription>
                  If an account exists for <strong>{email}</strong>, you&apos;ll
                  receive a password reset link shortly. Check your spam folder
                  if it doesn&apos;t arrive within a minute.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-brand hover:bg-brand/90 text-white"
                >
                  <Link href="/schools/login">Back to log in</Link>
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setError("");
                  }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 text-center"
                >
                  Try a different email
                </button>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Forgot your password?</CardTitle>
                <CardDescription>
                  Enter your email and we&apos;ll send you a reset link.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@smithdriving.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      autoComplete="email"
                      autoFocus={!prefillEmail}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand/90 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    Remember it?{" "}
                    <Link
                      href="/schools/login"
                      className="text-brand hover:underline font-medium"
                    >
                      Back to log in
                    </Link>
                  </p>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          Need to create an account?{" "}
          <Link
            href="/schools/signup"
            className="underline hover:text-gray-600"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  );
}
