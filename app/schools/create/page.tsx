"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreateSchoolPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    schoolName: "",
    contactName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/schools/create");
    }
  }, [authLoading, user, router]);

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) return;

    if (!form.schoolName.trim() || !form.contactName.trim()) {
      setError("All fields are required.");
      return;
    }

    const schoolId = slugify(form.schoolName);
    if (!schoolId) {
      setError("School name must contain at least one letter or number.");
      return;
    }

    setLoading(true);
    try {
      // Resolve final slug — check if base slug is taken and find a free suffix
      let finalSlug = schoolId;
      const existingDoc = await getDoc(doc(db, "school_accounts", schoolId));
      if (existingDoc.exists()) {
        let found = false;
        for (let i = 2; i <= 20; i++) {
          const candidate = `${schoolId}-${i}`;
          const check = await getDoc(doc(db, "school_accounts", candidate));
          if (!check.exists()) {
            finalSlug = candidate;
            found = true;
            break;
          }
        }
        if (!found) {
          setError(`The school name "${form.schoolName.trim()}" is already taken. Please choose a different name.`);
          setLoading(false);
          return;
        }
      }

      // Create school_accounts Firestore doc using existing TigerTest user
      await setDoc(doc(db, "school_accounts", finalSlug), {
        id: finalSlug,
        schoolName: form.schoolName.trim(),
        adminEmail: user.email?.toLowerCase() ?? "",
        adminName: form.contactName.trim(),
        adminUid: user.uid,
        planTier: "free",
        totalSeats: 0,
        paidSeats: 0,
        active: true,
        logoUrl: null,
        createdAt: serverTimestamp(),
      });

      // Redirect to dashboard
      router.push("/schools/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-light to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

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
          <CardHeader>
            <CardTitle className="text-xl">Create your school</CardTitle>
            <CardDescription>
              Free to start — invite students and track their progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-4 text-sm">
              Signed in as <strong>{user.email}</strong>. This will be your school&apos;s contact email.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="schoolName">School name</Label>
                <Input
                  id="schoolName"
                  placeholder="Smith Driving Academy"
                  value={form.schoolName}
                  onChange={set("schoolName")}
                  disabled={loading}
                  autoComplete="organization"
                />
                {form.schoolName && (
                  <p className="text-xs text-gray-400">
                    Your school URL: tigertest.io/schools/{slugify(form.schoolName) || "..."}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contactName">Your name</Label>
                <Input
                  id="contactName"
                  placeholder="Jane Smith"
                  value={form.contactName}
                  onChange={set("contactName")}
                  disabled={loading}
                  autoComplete="name"
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
                    Creating school...
                  </>
                ) : (
                  "Create school"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have a school?{" "}
              <Link href="/schools/dashboard" className="text-brand hover:underline font-medium">
                Go to dashboard
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          Free plan includes unlimited student invites. Students practice for free.{" "}
          <Link href="/schools" className="underline hover:text-gray-600">
            See plans
          </Link>
        </p>
      </div>
    </div>
  );
}
