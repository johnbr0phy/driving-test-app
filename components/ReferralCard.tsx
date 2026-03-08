"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Check, Share2, MessageCircle } from "lucide-react";

interface ReferralCardProps {
  userId: string | null;
  isPremium: boolean;
}

export function ReferralCard({ userId, isPremium }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  // Generate a short referral code from userId or fallback
  const refCode = userId ? userId.slice(0, 8) : "friend";
  const referralUrl = `https://tigertest.io/?ref=${refCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = referralUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Just passed my DMV practice test on TigerTest! 🐯 Study with me — get 7 days premium free: ${referralUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleSMS = () => {
    const text = encodeURIComponent(
      `Just passed my DMV practice test on TigerTest! 🐯 Get 7 days premium free: ${referralUrl}`
    );
    window.open(`sms:?body=${text}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "TigerTest — Free DMV Practice",
          text: "Just passed my DMV practice test! 🐯 Get 7 days premium free:",
          url: referralUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="mb-6 overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <CardContent className="p-0">
        {/* Header strip */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 flex items-center gap-2">
          <Gift className="h-5 w-5 text-white flex-shrink-0" />
          <span className="text-white font-bold text-sm tracking-wide uppercase">
            Share &amp; Earn — You Both Win
          </span>
        </div>

        <div className="p-5">
          {/* Value prop */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1 text-center bg-white rounded-xl p-3 border border-amber-100 shadow-sm">
              <div className="text-2xl font-black text-orange-500 mb-1">7 days</div>
              <div className="text-xs text-gray-600 font-medium">FREE premium<br />for your friend</div>
            </div>
            <div className="flex items-center text-amber-400 font-black text-lg">+</div>
            <div className="flex-1 text-center bg-white rounded-xl p-3 border border-amber-100 shadow-sm">
              <div className="text-2xl font-black text-green-500 mb-1">7 days</div>
              <div className="text-xs text-gray-600 font-medium">FREE premium<br />added to you</div>
            </div>
          </div>

          {/* Referral link */}
          <div className="bg-white border border-amber-200 rounded-xl p-3 flex items-center gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 mb-0.5 font-medium">Your referral link</div>
              <div className="text-sm font-mono text-gray-700 truncate">{referralUrl}</div>
            </div>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Share buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              className="border-green-200 text-green-700 hover:bg-green-50 font-semibold text-xs h-9"
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSMS}
              className="border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold text-xs h-9"
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNativeShare}
              className="border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-xs h-9"
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              More
            </Button>
          </div>

          {/* Fine print */}
          <p className="text-xs text-gray-400 text-center mt-3">
            Friend gets 7 days free when they sign up · You get 7 days when they activate
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
