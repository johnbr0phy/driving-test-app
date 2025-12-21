import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DrivingTest
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/select-state" className="text-gray-600 hover:text-gray-900">
            Select State
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/progress" className="text-gray-600 hover:text-gray-900">
            Progress
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
