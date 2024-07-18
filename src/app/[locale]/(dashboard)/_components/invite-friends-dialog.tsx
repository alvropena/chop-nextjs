import { Copy, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function InviteFriendsDialog() {
    const { toast } = useToast();

    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://chop.so/register").then(() => {
            toast({
                title: "Link copied",
                description: "Link copied to clipboard.",
            })
        }).catch((error) => {
            console.error("Failed to copy:", error);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <Share className="mr-2 h-4 w-4" />
                    Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Let&apos; make Chop more fun! Invite your friends over.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://chop.so/join/"
                            readOnly
                        />
                    </div>

                    <Button type="submit" size="sm" className="px-3" variant={"outline"} onClick={() => handleCopyLink()}
                    >
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>

                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
