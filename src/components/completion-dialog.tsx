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

export default function CompletionDialog({
    isCongratulationsDialogOpen,
    setIsCongratulationsDialogOpen,
    sessionCount,
}: {
    isCongratulationsDialogOpen: boolean;
    setIsCongratulationsDialogOpen: (open: boolean) => void;
    sessionCount: number;

}) {
    return (
        <AlertDialog
            open={isCongratulationsDialogOpen}
            onOpenChange={setIsCongratulationsDialogOpen}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>🎉 Congratulations!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have completed your{" "}
                        {sessionCount === 0 ? "first" : sessionCount + 1 + "th"} study
                        session!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={() => setIsCongratulationsDialogOpen(false)}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
