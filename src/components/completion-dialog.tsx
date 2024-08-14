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
import { useTranslations } from "next-intl"; // Retained from develop

export default function CompletionDialog({
  isCongratulationsDialogOpen,
  setIsCongratulationsDialogOpen,
  //sessionCount, // Retained from staging
}: {
  isCongratulationsDialogOpen: boolean;
  setIsCongratulationsDialogOpen: (open: boolean) => void;
  //sessionCount: number; // Retained from staging
}) {
  const t = useTranslations(""); // Retained from develop

  return (
    <AlertDialog
      open={isCongratulationsDialogOpen}
      onOpenChange={setIsCongratulationsDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Congratulations")}</AlertDialogTitle>{" "}
          {/* Retained from develop */}
          <AlertDialogDescription>
            {t("You_have_completed_a_study_session")}{" "}
            {/* Retained from develop */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setIsCongratulationsDialogOpen(false)}
          >
            {t("Continue")} {/* Retained from develop */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
