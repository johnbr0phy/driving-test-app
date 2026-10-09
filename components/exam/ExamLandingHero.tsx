"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";

// The homepage hero (components/HomeHero.tsx) for a non-DMV test: short
// subtitle, black pill CTA that turns into "Go to Dashboard" once there is a
// session, a quiet secondary link, then the two product screenshots.
// Everything here is free and needs no account, so the CTA always goes
// straight to the dashboard.
// Fresh visitors become guests on their way in, exactly like the homepage's
// "Try it first": that is what shows the "Sign up to save" prompts and
// protects their progress if they later sign in to an existing account.
function useStartCta() {
  const { user, loading } = useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const startGuestSession = useStore((state) => state.startGuestSession);
  const hasSession = !loading && (user || isGuest);
  const onStart = () => {
    if (!loading && !user && !isGuest) startGuestSession();
  };
  return { hasSession, onStart };
}

export function ExamLandingHero({
  dashboardHref,
  subtitle,
  shortName,
  shots,
}: {
  dashboardHref: string;
  subtitle: string;
  shortName: string;
  shots: { mobile: string; desktop: string };
}) {
  const { hasSession, onStart } = useStartCta();

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">{subtitle}</p>

      <div className="flex flex-col items-center gap-3">
        <Link href={dashboardHref} onClick={onStart}>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {hasSession ? "Go to Dashboard" : "Start practicing"}
          </Button>
        </Link>
        {!hasSession && (
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-700 underline">
            See how it works
          </a>
        )}
      </div>

      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src={shots.mobile}
              alt={`TigerTest ${shortName} practice test training mode on mobile`}
              width={384}
              height={640}
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">Train on mobile</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src={shots.desktop}
              alt={`TigerTest ${shortName} practice test on desktop`}
              width={1215}
              height={790}
              className="w-[320px] md:w-[500px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">Test on desktop</p>
        </div>
      </div>
    </>
  );
}

export function ExamLandingCTA({ dashboardHref }: { dashboardHref: string }) {
  const { hasSession, onStart } = useStartCta();

  return (
    <Link href={dashboardHref} onClick={onStart}>
      <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
        {hasSession ? "Go to Dashboard" : "Start practicing"}
      </Button>
    </Link>
  );
}
