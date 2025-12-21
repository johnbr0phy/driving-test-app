"use client";

import { useState } from "react";
import Link from "next/link";
import { states } from "@/data/states";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function SelectStatePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            Select Your State
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Choose your state to get practice questions specific to your state&apos;s driving laws
          </p>

          {/* Search Input */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for your state..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStates.map((state) => (
              <Link key={state.code} href={`/dashboard?state=${state.code}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {state.code}
                    </div>
                    <div className="text-sm text-gray-600">{state.name}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No states found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
