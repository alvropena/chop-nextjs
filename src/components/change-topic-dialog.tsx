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

export default function ChangeTopicDialog({
    isAlertOpen,
    setIsAlertOpen,
    confirmCategoryChange,
}: {
    isAlertOpen: boolean;
    setIsAlertOpen: (open: boolean) => void;
    confirmCategoryChange: () => void;

}) {
    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change Topic?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to change the topic? This will lose all your
                        progress in the current session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-row items-center gap-2">
                    <Checkbox id="dontAskAgain" />
                    <label
                        htmlFor="dontAskAgain"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Don&apos;t ask me again
                    </label>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirmCategoryChange}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
