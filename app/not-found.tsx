import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-50 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          This page doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-5 rounded-full">
              Go Home
            </Button>
          </Link>
          <Link href="/practice-tests-by-state">
            <Button variant="outline" className="px-6 py-5 rounded-full">
              Browse All States
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
