export const dynamic = "force-dynamic";

export default function ParentPaySuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-orange-600">TigerTest</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-8 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanks!</h1>
          <p className="text-gray-700 mb-1">
            Your teen now has TigerTest Premium.
          </p>
          <p className="text-sm text-gray-500">
            They&apos;ll see it unlocked next time they open the app. A receipt
            is on its way to your email.
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          You can close this tab.
        </div>
      </div>
    </div>
  );
}
