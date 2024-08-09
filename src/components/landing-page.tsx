"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Loading from "@/app/[locale]/loading";
import TypingEffect from "@/lib/typing-effect";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function AuthPage() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    const handleSignUp = async () => {
        if (!email) return;

        try {
            // Save the email
            await fetch(`https://api.chop.so/api/email/register-email-notification?email=${encodeURIComponent(email)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Send the thank you email
            // await fetch(
            //   `https://api.chop.so/api/email/send-email?to=${encodeURIComponent(email)}&subject=${encodeURIComponent("Thank You for Signing Up!")}&html_content=${encodeURIComponent(
            //     "<p>Thank you for signing up! We will reach out to you in seven days for our release.</p>"
            //   )}&secret_key=SECRET_KEY`,
            //   {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   }
            // );

            toast({
                title: "Thank you for signing up!",
                description: "Please, check your email.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an issue with signing up. Please try again later.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return (
            <div className="flex flex-col min-h-[100dvh]">
                <main className="flex-1 flex flex-col justify-center items-center text-center py-12 md:py-24 lg:py-32 border-b">
                    <div className="space-y-6 -w-3xl">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-2">
                                <p className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Learn</p>
                                <TypingEffect
                                    texts={[
                                        { word: "soccer", emoji: "⚽️" },
                                        { word: "poker", emoji: "🃏" },
                                        { word: "chemistry", emoji: "🔬" },
                                        { word: "Italian", emoji: "🇮🇹" },
                                    ]}
                                    className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                                />
                            </div>
                            <p className="text-gray-500 text-xl md:text-2xl dark:text-gray-400 mt-2">
                                The first generative learning platform.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button onClick={handleSignUp}>Sign Up</Button>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else {
        return router.push("/home");
    }
}
