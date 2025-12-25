import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export interface TrainingSet {
  id: number;
  name: string;
  correctCount: number;
  targetCount: number;
}

interface TrainingSetCardProps {
  set: TrainingSet;
  locked?: boolean;
}

export function TrainingSetCard({ set, locked = false }: TrainingSetCardProps) {
  const isComplete = set.correctCount >= set.targetCount;
  const progress = Math.min(100, Math.round((set.correctCount / set.targetCount) * 100));

  const getBadge = () => {
    if (locked) {
      return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100 text-xs">Locked</Badge>;
    }
    if (isComplete) {
      return <Badge className="bg-green-500 hover:bg-green-500 text-xs">Complete</Badge>;
    }
    if (set.correctCount > 0) {
      return <Badge className="bg-orange-500 hover:bg-orange-500 text-xs">{progress}%</Badge>;
    }
    return null;
  };

  const cardContent = (
    <Card className={`h-full transition-all ${
      locked
        ? "bg-gray-50 border-gray-200 opacity-60"
        : "hover:shadow-md hover:border-orange-300 cursor-pointer"
    }`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">{set.name}</h3>
            {getBadge()}
          </div>
          <p className="text-xs">
            {locked ? (
              <span className="text-gray-400">Locked</span>
            ) : (
              <span className={isComplete ? 'text-green-600' : 'text-gray-500'}>
                {set.correctCount}/{set.targetCount}
              </span>
            )}
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
    <Link href={`/training?set=${set.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
