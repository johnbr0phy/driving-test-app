import Link from "next/link";

export default function SchoolNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🏫</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">School not found</h1>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find a driving school at that link. It may have moved or the link might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/schools"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse schools
          </Link>
          <Link
            href="/"
            className="inline-block bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition-colors"
          >
            Go to TigerTest
          </Link>
        </div>
      </div>
    </div>
  );
}
