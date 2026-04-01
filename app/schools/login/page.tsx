"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
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
import { Loader2 } from "lucide-react";

export default function SchoolLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot-password state
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const uid = credential.user.uid;

      // Look up school_accounts where adminUid == uid
      const q = query(
        collection(db, "school_accounts"),
        where("adminUid", "==", uid)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        // Redirect straight into their dashboard
        router.push("/schools/dashboard");
      } else {
        // Authenticated but no school doc yet — send to signup to finish setup
        router.push("/schools/signup?existing=1");
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
        setError("Email or password is incorrect. Please try again.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/too-many-requests") {
        setError(
          "Too many failed attempts. Please reset your password or try again later."
        );
      } else if (code === "auth/user-disabled") {
        setError("This account has been disabled. Please contact support.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    if (!resetEmail.trim()) {
      setResetError("Please enter your email address.");
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setResetSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/user-not-found" || code === "auth/invalid-email") {
        // Don't reveal whether the email exists — security best practice
        setResetSent(true);
      } else {
        setResetError("Could not send reset email. Please try again.");
      }
    } finally {
      setResetLoading(false);
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

        {/* ── Forgot password panel ── */}
        {showReset ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Reset your password</CardTitle>
              <CardDescription>
                We&apos;ll send a reset link to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resetSent ? (
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-700">
                    If an account exists for{" "}
                    <strong>{resetEmail}</strong>, you&apos;ll receive a
                    password reset link shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowReset(false);
                      setResetSent(false);
                      setResetEmail("");
                    }}
                  >
                    Back to log in
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="resetEmail">Email address</Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="jane@smithdriving.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      disabled={resetLoading}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>

                  {resetError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                      {resetError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand/90 text-white"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setShowReset(false)}
                    className="w-full text-sm text-gray-500 hover:text-gray-700 text-center"
                  >
                    ← Back to log in
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        ) : (
          /* ── Main login form ── */
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Log in to your school</CardTitle>
              <CardDescription>
                Manage students and track their progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@smithdriving.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => {
                        setResetEmail(email);
                        setShowReset(true);
                      }}
                      className="text-xs text-brand hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
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
                      Logging in…
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/schools/signup"
                  className="text-brand hover:underline font-medium"
                >
                  Create a free school account
                </Link>
              </p>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Having trouble?{" "}
          <Link href="/schools" className="underline hover:text-gray-600">
            Back to schools home
          </Link>
        </p>
      </div>
    </div>
  );
}
