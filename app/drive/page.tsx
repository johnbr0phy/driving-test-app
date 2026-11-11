import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/siteUrl";
import { isDriveEnabled } from "@/src/drive/flag";
import { DRIVE_RULES } from "@/src/drive/rules";

// /drive: the five "Drive the Question" scenes. Behind the drive flag
// (src/drive/flag.js): a 404 while it is off.

const title = "Drive the Question: 5 DMV questions you answer by driving | Tigertest";
const description =
  "The five DMV questions people miss most on Tigertest, as short driving scenes. You make the call at the wheel and see what happens. Free, on your phone.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/drive` },
  openGraph: { title, description, url: `${SITE_URL}/drive`, siteName: "Tigertest", type: "website" },
};

export default function DriveIndexPage() {
  if (!isDriveEnabled()) notFound();
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-50">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">New on Tigertest</p>
      <h1 className="mt-1 text-3xl font-bold">Drive the Question</h1>
      <p className="mt-3 text-lg text-gray-700 dark:text-gray-200">
        Five DMV questions that people get wrong more than any others. Here you do not pick A, B, C or D. You drive up to the
        situation, time slows down, and you make the call.
      </p>
      <ol className="mt-8 space-y-3">
        {DRIVE_RULES.map((rule, index) => (
          <li key={rule.slug}>
            <Link
              href={`/drive/${rule.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-orange-400 dark:border-gray-800 dark:bg-gray-900"
            >
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold">{rule.title}</span>
                <span className="block text-sm text-gray-600 dark:text-gray-300">{rule.short}</span>
              </span>
              <span className="shrink-0 text-right text-sm text-gray-600 dark:text-gray-300">
                <span className="block text-base font-bold text-gray-900 dark:text-gray-50">{rule.missRate}%</span>
                miss it
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
        Miss rates come from real answers on Tigertest practice tests. Each scene takes about 20 seconds and is free.{" "}
        <Link className="underline" href="/dmv/dashboard">
          Take the full DMV practice test
        </Link>
        .
      </p>
    </main>
  );
}
