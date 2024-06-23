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
import { Label } from "@/components/ui/label"

export function InviteFriendsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"}>Invite Friends</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Friends</DialogTitle>
                    <DialogDescription>
                        Make Chop more fun. Invite your friends over.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Copy</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
