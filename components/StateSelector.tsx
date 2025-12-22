"use client";

import { useState } from "react";
import { states } from "@/data/states";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface StateSelectorProps {
  onSelect: (stateCode: string) => void;
  selectedState?: string | null;
}

export function StateSelector({ onSelect, selectedState }: StateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search states..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* State Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        {filteredStates.map((state) => {
          const isSelected = selectedState === state.code;
          return (
            <Card
              key={state.code}
              onClick={() => onSelect(state.code)}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? "border-orange-500 bg-orange-50 border-2"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {state.code}
                </div>
                <div className="text-sm text-gray-700">{state.name}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No states found matching &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  );
}
