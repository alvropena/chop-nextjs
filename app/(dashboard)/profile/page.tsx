import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
    return (
        <div className="w-full max-w-3xl">

            <div className="items-center gap-4">
                <div className="space-y-1">
                    <Avatar className="items-center justify-center w-20 h-20">
                        <div>AP</div>
                    </Avatar>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Your personal information.</CardDescription>
                </div>
            </div>


            <div className="gap-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value="Alex Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" value="alexdoe99" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Input id="birthday" type="date" value="1990-01-01" />
                    </div>
                    <div className="space-y-2">
                        <Label>Gender</Label>
                        <div className="space-x-4">
                            <Label htmlFor="gender-male" className="cursor-pointer">
                                <Input id="gender-male" type="radio" name="gender" value="male" className="form-radio" />
                                Male
                            </Label>
                            <Label htmlFor="gender-female" className="cursor-pointer">
                                <Input id="gender-female" type="radio" name="gender" value="female" className="form-radio" />
                                Female
                            </Label>
                            <Label htmlFor="gender-other" className="cursor-pointer">
                                <Input id="gender-other" type="radio" name="gender" value="other" className="form-radio" />
                                Other
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Enter your bio" className="min-h-[100px]" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter your location" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter your email" type="email" readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="social">Social</Label>
                        <Input id="social" placeholder="Enter your social media handles" />
                        <div>Enter your social media handles separated by a comma.</div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter your phone number" type="tel" />
                    </div>
                </div>
            </div>

            <Button size="sm">Save</Button>
        </div>
    )
}