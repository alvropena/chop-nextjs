import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export default function CompletionDialog({
  isCongratulationsDialogOpen,
  setIsCongratulationsDialogOpen,
  sessionCount,
}: {
  isCongratulationsDialogOpen: boolean;
  setIsCongratulationsDialogOpen: (open: boolean) => void;
  sessionCount: number;
}) {
  const t = useTranslations("");
  return (
    <AlertDialog
      open={isCongratulationsDialogOpen}
      onOpenChange={setIsCongratulationsDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Congratulations")}</AlertDialogTitle>
          <AlertDialogDescription>
            You have completed your{" "}
            {sessionCount === 0 ? t("first") : sessionCount + 1 + "th"}{" "}
            {t("study")}
            {t("session")}!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setIsCongratulationsDialogOpen(false)}
          >
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
