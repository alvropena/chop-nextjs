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
import { Textarea } from "@/components/ui/textarea"

export function GiveFeedbackDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>Give Feedback</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Give Feedback</DialogTitle>
                    <DialogDescription>
                        Please, tell us how could we improve.
                    </DialogDescription>
                    <Label>Name</Label>
                    <Input></Input>
                    <Label>Email</Label>
                    <Input></Input>
                    <Label>Message</Label>
                    <Textarea />
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"outline"}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
