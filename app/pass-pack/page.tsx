"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  BookOpen,
  FileText,
  Headphones,
  Star,
  ArrowLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { auth } from "@/lib/firebase";

const PASS_PACK_PRICE = 14.99;
const SINGLE_PRICE = 9.99;
const SAVING = (SINGLE_PRICE + 5 - PASS_PACK_PRICE).toFixed(2); // notional value of extras

export default function PassPackPage() {
  const router = useRouter();
  const { user } = useAuth();
  const hydrated = useHydration();
  const hasPremiumAccess = useStore((s) => s.hasPremiumAccess);
  const isPremium = hydrated ? hasPremiumAccess() : false;
  const isGuest = useStore((s) => s.isGuest);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyPassPack = async () => {
    if (!user || isGuest) {
      router.push("/signup?next=/pass-pack");
      return;
    }
    if (isPremium) {
      router.push("/dashboard");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        setError("Authentication error — please sign in again.");
        return;
      }

      const res = await fetch("/api/stripe/bundle-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          returnUrl: window.location.origin,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/tiger_face_01.png" alt="TigerTest" width={28} height={28} />
            <span className="font-bold text-gray-900 text-sm">TigerTest</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            Best value
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pass Pack</h1>
          <p className="text-gray-500 text-base">
            Everything you need to pass first time. Premium tests, your state&apos;s road signs
            guide, and a direct line to our support team.
          </p>
        </div>

        {/* Price card */}
        <div className="rounded-2xl border-2 border-brand bg-brand-light p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-gray-900">${PASS_PACK_PRICE}</div>
              <div className="text-sm text-gray-500 mt-0.5">one-time payment</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 line-through">${SINGLE_PRICE} Premium</div>
              <div className="text-xs font-semibold text-brand">+ extras included</div>
            </div>
          </div>

          {/* What's included */}
          <div className="space-y-3">
            <IncludedItem
              icon={<BookOpen className="h-4 w-4 text-brand" />}
              title="All 4 Training Sets"
              subtitle="Including the State Laws module most students miss"
            />
            <IncludedItem
              icon={<FileText className="h-4 w-4 text-brand" />}
              title="All 4 Practice Tests"
              subtitle="200 questions, state-matched, just like the real thing"
            />
            <IncludedItem
              icon={<Shield className="h-4 w-4 text-brand" />}
              title="Road Signs Quick Reference"
              subtitle="Your state's signs, shapes and meanings on one page"
              badge="NEW"
            />
            <IncludedItem
              icon={<Headphones className="h-4 w-4 text-brand" />}
              title="Priority email support"
              subtitle="Questions answered within 24 hours"
              badge="NEW"
            />
          </div>
        </div>

        {/* CTA */}
        {error && (
          <p className="text-sm text-red-600 text-center mb-3">{error}</p>
        )}

        {isPremium ? (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">You already have Premium access.</p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={handleBuyPassPack}
              disabled={loading}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full mb-3"
            >
              {loading ? "Loading..." : `Get Pass Pack — $${PASS_PACK_PRICE}`}
            </Button>

            <div className="text-center mb-6">
              <Link
                href="/dashboard"
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Just Premium for $9.99 instead
                <ChevronRight className="inline h-3.5 w-3.5 ml-0.5" />
              </Link>
            </div>
          </>
        )}

        {/* Road signs preview */}
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Road Signs Quick Reference
              </span>
              <span className="text-xs text-brand font-medium bg-brand-light px-2 py-0.5 rounded-full">
                Pass Pack only
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <SignCategory
              color="bg-red-100 border-red-200"
              textColor="text-red-700"
              label="Red signs"
              meaning="Stop, yield, or prohibition — always obey"
            />
            <SignCategory
              color="bg-yellow-100 border-yellow-200"
              textColor="text-yellow-700"
              label="Yellow / orange signs"
              meaning="Warning ahead — slow down and prepare"
            />
            <SignCategory
              color="bg-green-100 border-green-200"
              textColor="text-green-700"
              label="Green signs"
              meaning="Direction, distance, mile markers"
            />
            <SignCategory
              color="bg-blue-100 border-blue-200"
              textColor="text-blue-700"
              label="Blue signs"
              meaning="Services: food, fuel, lodging, hospitals"
            />
            <SignCategory
              color="bg-orange-100 border-orange-200"
              textColor="text-orange-700"
              label="Orange signs"
              meaning="Construction and work zones — double fines"
            />
            <div className="pt-2 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-400">
                Full guide includes shapes, shapes meanings, and {`state-specific`} signs
              </span>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-500">Trusted by 700+ permit test students</span>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Common questions</h2>
          <Faq
            q="What's the difference between Premium and Pass Pack?"
            a="Premium ($9.99) unlocks all training sets and practice tests. Pass Pack ($14.99) adds the Road Signs Quick Reference for your state and priority email support — useful if you want to cover all bases."
          />
          <Faq
            q="Is the Road Signs guide really state-specific?"
            a="Yes. While most road sign rules are federal, your state may have specific signs for construction zones, school areas, or local road conditions. Your guide is tailored to your selected state."
          />
          <Faq
            q="What is priority email support?"
            a="If you have a question about a specific test question or need clarification on a rule, email us and we'll respond within 24 hours (usually much faster). Regular accounts aren't eligible for this."
          />
          <Faq
            q="Is this a one-time payment?"
            a="Yes. No subscription, no recurring charges. Pay once, keep access until you pass."
          />
        </div>
      </div>
    </div>
  );
}

function IncludedItem({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-white border border-brand-border-light flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{title}</span>
          {badge && (
            <span className="text-xs font-bold text-white bg-brand px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <CheckCircle className="h-5 w-5 text-green-600 fill-green-100 flex-shrink-0 mt-0.5" />
    </div>
  );
}

function SignCategory({
  color,
  textColor,
  label,
  meaning,
}: {
  color: string;
  textColor: string;
  label: string;
  meaning: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-shrink-0 w-12 h-8 rounded border ${color} flex items-center justify-center`}
      >
        <span className={`text-xs font-bold ${textColor}`}>{label.split(" ")[0]}</span>
      </div>
      <div>
        <div className={`text-xs font-semibold ${textColor}`}>{label}</div>
        <div className="text-xs text-gray-500">{meaning}</div>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-gray-800">{q}</span>
        <ChevronRight
          className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600">{a}</p>
        </div>
      )}
    </div>
  );
}
