// FeedbackDialog.tsx
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function FeedbackDialog({
    isDialogOpen,
    setIsDialogOpen,
    handleFeedbackSubmit,
    isFormFilled,
    isSubmitLoading,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
}) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    onClick={() => setIsDialogOpen(true)}
                    className="mt-4"
                >
                    How we can improve? 🙏
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share your feedback</DialogTitle>
                    <DialogDescription>
                        We would love to hear your thoughts! Please share your feedback
                        below.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Type your message here."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleFeedbackSubmit}
                        disabled={!isFormFilled || isSubmitLoading}
                    >
                        {isSubmitLoading ? (
                            <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                        ) : null}
                        {isSubmitLoading ? "Loading" : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
