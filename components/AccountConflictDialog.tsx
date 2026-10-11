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
import { useTranslation } from "@/contexts/LanguageContext";

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
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("accountConflict.existingAccountFound")}</DialogTitle>
          <DialogDescription className="pt-2">
            {userEmail ? (
              <>
                <strong>{userEmail}</strong> {t("accountConflict.accountHasProgress")}
              </>
            ) : (
              t("accountConflict.thisAccountHasProgress")
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("accountConflict.wouldYouLikeToLogIn")}
          </p>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 sm:flex-none"
          >
            {t("accountConflict.useDifferentAccount")}
          </Button>
          <Button
            onClick={onUseExisting}
            className="flex-1 sm:flex-none bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            {t("accountConflict.logInToExisting")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
