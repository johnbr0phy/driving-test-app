import type { Ref } from "react";
import { Button } from "@/components/ui/button";

/** The "Next Question" button in v1's training look (TrainingCard). */
export function NextButton({ ref, onClick, children }: { ref?: Ref<HTMLButtonElement>; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button ref={ref} onClick={onClick} className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200" size="lg">
      {children}
    </Button>
  );
}
