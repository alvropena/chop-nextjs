import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4">

            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Contact
                </h1>
                <Card className="w-full p-6 shadow-lg font-sans">
                    <CardHeader>
                        <CardTitle className="text-2xl">Contact Us</CardTitle>
                        <CardDescription>
                            We would love to hear from you. Please fill out this form and we will get in touch with you shortly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action="mailto:me@alvropena.com" method="post" className="space-y-4">
                            <div className="gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">
                                        Name
                                    </Label>
                                    <Input name="first-name" id="first-name" placeholder="Enter your name" className="shadow-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <Input name="email" id="email" type="email" placeholder="Enter your email" className="shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">
                                    Subject
                                </Label>
                                <Input name="subject" id="subject" placeholder="Enter your subject" className="shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">
                                    Message
                                </Label>
                                <Textarea
                                    name="message"
                                    id="message"
                                    placeholder="Enter your message"
                                    className="min-h-[100px] shadow-sm"
                                />
                            </div>
                            <Button type="submit">
                                Send
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
