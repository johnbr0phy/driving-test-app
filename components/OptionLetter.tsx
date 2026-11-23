/** Circled answer letter, shared by v1 cards so they match the v2 runner. */
export function OptionLetter({ letter, selected = false, correct = false }: { letter: string; selected?: boolean; correct?: boolean }) {
  const tone = correct
    ? "border-green-600 bg-green-600 text-white"
    : selected
      ? "border-brand bg-brand text-white"
      : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200";
  return (
    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${tone}`}>
      {letter}
    </span>
  );
}
