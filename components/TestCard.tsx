import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface TestCardProps {
  testNumber: number;
  status: "not-started" | "in-progress" | "completed";
  score?: number;
  totalQuestions?: number;
  progress?: number;
  bestScore?: number;
  attemptCount?: number;
  locked?: boolean;
  lockMessage?: string;
}

export function TestCard({
  testNumber,
  status,
  totalQuestions = 50,
  progress = 0,
  bestScore,
  locked = false,
}: TestCardProps) {
  const bestPercentage = bestScore ? Math.round((bestScore / totalQuestions) * 100) : 0;

  const getStatusBadge = () => {
    if (locked) {
      return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100 text-xs">Locked</Badge>;
    }

    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Badge className="bg-green-500 hover:bg-green-500 text-xs">Mastered</Badge>;
      } else if (bestPercentage >= 70) {
        return <Badge className="bg-green-500 hover:bg-green-500 text-xs">Passed</Badge>;
      } else {
        return <Badge className="bg-orange-500 hover:bg-orange-500 text-xs">Keep Practicing</Badge>;
      }
    }

    switch (status) {
      case "in-progress":
        return <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs">In Progress</Badge>;
      default:
        return null;
    }
  };

  const getSubtext = () => {
    if (locked) {
      return <span className="text-gray-400">Locked</span>;
    }
    if (status === "in-progress") {
      return <span className="text-yellow-600">{progress}% done</span>;
    }
    if (status === "completed" && bestScore !== undefined) {
      return (
        <span className={bestPercentage >= 70 ? 'text-green-600' : 'text-orange-600'}>
          {bestScore}/{totalQuestions}
        </span>
      );
    }
    return <span className="text-gray-400">50 questions</span>;
  };

  const cardContent = (
    <Card className={`h-full transition-all ${
      locked
        ? "bg-gray-100 border-gray-200 opacity-60"
        : "bg-gray-50 hover:shadow-md hover:border-gray-300 cursor-pointer"
    }`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">Test {testNumber}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-xs">
            {getSubtext()}
          </p>
        </div>
        {!locked && <ChevronRight className="h-5 w-5 text-gray-400" />}
      </CardContent>
    </Card>
  );

  if (locked) {
    return cardContent;
  }

  return (
    <Link href={`/test/${testNumber}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
