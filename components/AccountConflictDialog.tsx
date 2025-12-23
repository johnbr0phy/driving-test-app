"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AccountConflictDialogProps {
  open: boolean;
  onUseExisting: () => void;
  onCancel: () => void;
  userEmail?: string;
}

export function AccountConflictDialog({
  open,
  onUseExisting,
  onCancel,
  userEmail,
}: AccountConflictDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Existing Account Found</DialogTitle>
          <DialogDescription className="pt-2">
            {userEmail ? (
              <>
                The account <strong>{userEmail}</strong> already has saved progress.
              </>
            ) : (
              "This account already has saved progress."
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Would you like to log in to your existing account, or use a different account to start fresh?
          </p>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 sm:flex-none"
          >
            Use Different Account
          </Button>
          <Button
            onClick={onUseExisting}
            className="flex-1 sm:flex-none bg-black text-white hover:bg-gray-800"
          >
            Log In to Existing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
