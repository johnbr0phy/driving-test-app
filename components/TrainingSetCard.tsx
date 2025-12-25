import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Hexagon, Triangle, Shield, ScrollText } from "lucide-react";

export interface TrainingSet {
  id: number;
  name: string;
  icon: "signs" | "rules" | "safety" | "state";
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

  const getIcon = () => {
    const iconClass = locked
      ? "h-10 w-10 text-gray-300"
      : isComplete
        ? "h-10 w-10 text-green-500"
        : "h-10 w-10 text-orange-500";

    switch (set.icon) {
      case "signs":
        return <Hexagon className={iconClass} />;
      case "rules":
        return <Triangle className={iconClass} />;
      case "safety":
        return <Shield className={iconClass} />;
      case "state":
        return <ScrollText className={iconClass} />;
    }
  };

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
      <CardContent className="p-4 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="h-5 mb-2">
          {getBadge()}
        </div>

        {/* Icon */}
        <div className="mb-2 relative">
          {getIcon()}
          {isComplete && !locked && (
            <CheckCircle2 className="h-4 w-4 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-1 leading-tight">{set.name}</h3>

        {/* Progress */}
        <p className="text-xs">
          {locked ? (
            <span className="text-gray-400">Locked</span>
          ) : (
            <span className={isComplete ? 'text-green-600' : 'text-gray-500'}>
              {set.correctCount}/{set.targetCount}
            </span>
          )}
        </p>
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
