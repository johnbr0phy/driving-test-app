import Link from "next/link";

export default function SchoolNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-gray-900">
              Tiger<span className="text-indigo-600">Test</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-3xl bg-white border-2 border-dashed border-indigo-200 flex items-center justify-center shadow-sm">
                <svg
                  className="w-14 h-14 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              {/* Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            School not found
          </h1>
          <p className="text-gray-500 mb-2">
            This school page doesn&apos;t exist or may have been removed.
          </p>
          <p className="text-sm text-gray-400 mb-10">
            If your instructor sent you this link, ask them to double-check the address.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/schools"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Schools home
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition-colors shadow-sm"
            >
              Practice tests — free
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-8">
            Are you an instructor?{" "}
            <Link href="/schools/create" className="text-indigo-600 hover:underline font-medium">
              Create your school page →
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 px-4 py-5">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-400">
          <Link href="/" className="text-indigo-600 hover:underline font-medium">TigerTest</Link>
          {" "}— Free DMV practice tests
        </div>
      </footer>
    </div>
  );
}
