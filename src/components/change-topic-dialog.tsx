import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";

export default function ChangeTopicDialog({
  isAlertOpen,
  setIsAlertOpen,
  confirmCategoryChange,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (open: boolean) => void;
  confirmCategoryChange: () => void;
}) {
  const t = useTranslations("");
  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Change_Topic?")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(
              "Are_you_sure_you_want_to_change_the_topic?_This_will_lose_all_your_progress_in_the_current_session"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-row items-center gap-2">
          <Checkbox id="dontAskAgain" />
          <label
            htmlFor="dontAskAgain"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("Dont_ask_me_again")}
          </label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
            {t("Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmCategoryChange}>
            {t("Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
