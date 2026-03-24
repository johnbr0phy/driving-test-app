import Link from "next/link";
import { CheckCircle2, Gift } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Sent! — TigerTest",
};

export default function GiftSuccessPage() {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-brand rounded-full flex items-center justify-center border-2 border-white">
              <Gift className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Gift sent! 🎉
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your gift is on its way. The recipient will get an email with their
          premium access code — ready to use straight away.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            What happens next
          </h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-light rounded-full flex items-center justify-center text-xs font-bold text-brand shrink-0 mt-0.5">
                1
              </span>
              They get an email with their unlock code
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-light rounded-full flex items-center justify-center text-xs font-bold text-brand shrink-0 mt-0.5">
                2
              </span>
              They visit tigertest.io and create a free account (or log in)
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-light rounded-full flex items-center justify-center text-xs font-bold text-brand shrink-0 mt-0.5">
                3
              </span>
              They enter the code and unlock full premium access instantly
            </li>
          </ol>
        </div>

        <Link
          href="/"
          className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors"
        >
          Back to TigerTest
        </Link>
      </div>
    </div>
  );
}
