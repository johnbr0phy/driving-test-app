import type { RefObject } from "react";

/** What every design of the sign-up step gets (components/GuestPromptStep). */
export type DesignProps = {
  /** The visitor's answers on this browser for this exam. */
  n: number;
  /** The heading takes focus when the step replaces a question. */
  headingRef: RefObject<HTMLHeadingElement | null>;
  /** In the app shell: no Google, the email link becomes "Create free account". */
  isNative: boolean;
  busy: boolean;
  onGoogle: () => void;
  signupHref: string;
  onEmail: () => void;
  onLater: () => void;
};
