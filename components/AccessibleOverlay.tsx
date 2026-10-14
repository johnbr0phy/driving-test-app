"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, useRef } from "react";

/** Focus management for existing custom sheets, without changing their layout. */
export function AccessibleOverlay({ onClose, modal = true, children, ...props }: ComponentPropsWithoutRef<typeof Dialog.Content> & {
  onClose: () => void;
  modal?: boolean;
}) {
  const opener = useRef<HTMLElement | null>(null);
  return (
    <Dialog.Root open modal={modal} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Content
        aria-describedby={undefined}
        onInteractOutside={(event) => { if (!modal) event.preventDefault(); }}
        onOpenAutoFocus={() => { opener.current = document.activeElement as HTMLElement; }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (opener.current?.isConnected) opener.current.focus();
        }}
        {...props}
      >
        <Dialog.Title className="sr-only">{props["aria-label"]}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
