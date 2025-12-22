"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Target, Trophy, Zap, BarChart3, Cloud } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 max-w-5xl mx-auto leading-tight">
            Pass your US driving knowledge test
          </h1>
          <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
            Practice with 200 questions per state - completely free
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The more questions you answer, the better you&apos;ll get. Track your progress and watch your pass probability increase with every practice session.
          </p>
          {!loading && (
            <div className="flex gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="text-xl px-12 py-8 bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl border-4 border-gray-900">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button size="lg" className="text-xl px-12 py-8 bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl border-4 border-gray-900">
                    Get Started Free
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg text-white">
            <div className="text-5xl font-bold mb-2">50</div>
            <div className="text-orange-100 text-lg">States Covered</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg text-white">
            <div className="text-5xl font-bold mb-2">200</div>
            <div className="text-orange-100 text-lg">Questions per State</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg text-white">
            <div className="text-5xl font-bold mb-2">100%</div>
            <div className="text-orange-100 text-lg">Free Forever</div>
          </div>
        </div>

        {/* Learning Modes Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Two Ways to Learn</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">Choose the right mode for your learning style</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-orange-900">Training Mode</CardTitle>
                <CardDescription className="text-base">Learn at your own pace</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Instant feedback after each question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>See correct answers and explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Build knowledge without pressure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-orange-900">Practice Tests</CardTitle>
                <CardDescription className="text-base">Simulate the real exam</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>4 full-length 50-question tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Track scores and improvement over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Unlock tests as you score 40+</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Everything You Need</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">All features included - no hidden costs, no premium tiers</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>State-Specific</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Questions tailored to your state&apos;s exact driving laws and regulations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Get Better Every Day</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your pass probability increases with every question you answer. Watch your progress grow in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track attempts, best scores, and average performance across all tests
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Auto-Save Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Never lose your progress - all data syncs automatically to the cloud
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-12 shadow-xl">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-xl text-orange-100 mb-8">Join thousands preparing for their driving test</p>
              <Link href="/signup">
                <Button size="lg" className="text-xl px-12 py-8 bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl border-4 border-gray-900">
                  Start Practicing Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
