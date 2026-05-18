"use client";

import { useState } from "react";

export function ParentPayCheckoutButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/parent-pay/checkout/${token}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        setError(data.error || "Could not start checkout. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={start}
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-4 px-6 rounded-full text-base transition-colors"
      >
        {loading ? "Loading…" : "Pay $9.99 to unlock"}
      </button>
      {error ? (
        <div className="mt-3 text-sm text-red-600 text-center">{error}</div>
      ) : null}
    </>
  );
}
