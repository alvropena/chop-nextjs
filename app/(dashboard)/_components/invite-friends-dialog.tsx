import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CopyIcon } from "lucide-react"


export function InviteFriendsDialog() {
    const { toast } = useToast()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Invite Friends</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Friends</DialogTitle>
                    <DialogDescription>
                        Make Chop more fun. Invite your friends over.
                    </DialogDescription>
                    <div className="flex flex-row">
                        <Input value={"https://chop.so/register"} disabled></Input>
                        <Button size={"icon"} variant={"outline"} onClick={() => {
                            toast({
                                title: "Invitation copied",
                                description: "Share this link with all your friends.",
                            })
                        }}><CopyIcon size={"16"} /></Button>
                    </div>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="submit"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
