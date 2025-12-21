import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Target, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ace Your Driving Test
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            200 practice questions tailored to your state
          </p>
          <Link href="/select-state">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center text-white">
          <div>
            <div className="text-4xl font-bold mb-2">50</div>
            <div className="text-blue-100">States Covered</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2,650</div>
            <div className="text-blue-100">Practice Questions</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">200</div>
            <div className="text-blue-100">Questions Per State</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>State-Specific</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Questions tailored to your state&apos;s driving laws and regulations
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>4 Full Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Practice with 4 comprehensive tests of 50 questions each
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your performance and identify areas for improvement
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle>Pass with Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Detailed explanations help you understand every answer
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
