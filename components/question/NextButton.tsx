import type { ButtonHTMLAttributes, Ref } from "react";

/** The Next button after an answer, shared by v1 training, quizzes and v2 drills. */
export function NextButton({ ref, className = "", ...button }: ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      {...button}
      className={`h-12 w-full rounded-xl bg-brand text-base font-bold text-white transition-colors [@media(hover:hover)]:hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    />
  );
}
