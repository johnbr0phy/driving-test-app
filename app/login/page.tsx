"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const router = useRouter();
  const selectedState = useStore((state) => state.selectedState);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess("Password reset email sent! Check your inbox.");
      setShowResetPassword(false);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else {
        setError(err.message || "Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await login(email, password);
      // Wait for user data to load before redirecting
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if user has a state selected
      const hasState = useStore.getState().selectedState;
      router.push(hasState ? "/dashboard" : "/onboarding/select-state");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      // Wait for user data to load before redirecting
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if user has a state selected
      const hasState = useStore.getState().selectedState;
      router.push(hasState ? "/dashboard" : "/onboarding/select-state");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <Card className="relative w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Log in to continue your driving test practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Google Sign-In */}
            <WebViewGoogleWarning
              onGoogleSignIn={handleGoogleSignIn}
              disabled={loading}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-sm text-orange-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>

              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-orange-600 hover:underline font-semibold">
                  Sign up
                </Link>
              </div>
            </form>

            {/* Password Reset Modal */}
            {showResetPassword && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setShowResetPassword(false)}
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full bg-black text-white hover:bg-gray-800"
                      >
                        {loading ? "Sending..." : "Send Reset Link"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
