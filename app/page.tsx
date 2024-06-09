"use client"

import React, { ChangeEvent, useState } from 'react'
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpIcon, PenIcon } from 'lucide-react'
import Image from 'next/image'
import MenuBar from './(dashboard)/_components/menu_bar'
import Footer from './(dashboard)/_components/footer'
import { Prompt } from '@/types/types'

// Mock function to determine if the user is authenticated
const isAuthenticated = (): boolean => {
    // Replace this logic with your actual authentication logic
    return false; // Example: return true if user is logged in, false otherwise
}

const Hero = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link href="#" className="flex items-center justify-center" prefetch={false}>
                    <span className="">Chop</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <Link href={"/api/auth/login"}>
                        <Button >Sign In</Button>
                    </Link>
                </div>
            </header >
            <main className="flex-1 flex flex-col justify-center items-center text-center py-12 md:py-24 lg:py-32 border-b">
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Learn quicker.</h1>
                    <p className="text-gray-500 text-xl md:text-2xl dark:text-gray-400">
                        The first generative learning platform.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                        <Link
                            href="/api/auth/login"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                            prefetch={false}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div >
    )
}

const LearnPage = () => {
    const [prompt, setPrompt] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value);
    };

    const handleSend = () => {
        if (prompt.trim()) {
            const newPrompt: Prompt = {
                id: Date.now().toString(), // Generating a unique ID based on timestamp
                created_at: new Date().toISOString(), // Current timestamp in ISO format
                text: prompt,
                user_id: "user123" // Example user ID, replace with actual user ID logic
            };

            sendPrompt(newPrompt);
            setPrompt('');
        }
    };

    const sendPrompt = async (promptData: Prompt) => {
        try {
            console.log("Sending prompt:", promptData);
        } catch (error) {
            console.error("Failed to send prompt:", error);
        }
    };

    return (
        <div className="grid min-h-screen w-full">
            <div className="flex flex-col">
                <div className="sticky top-0 p-2 flex flex-row justify-between">
                    <MenuBar />
                    <Button
                        variant="outline"
                        className="text-left px-2 justify-start p hover:bg-neutral-900 hover:text-neutral-50 gap-2"
                    >
                        <PenIcon className="h-4 w-4" />
                        New Chat
                    </Button>
                </div>
                <div className="max-w-2xl flex-1 mx-auto flex flex-col items-start gap-8 px-4">
                </div>
                <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 pb-4">
                    <div className="relative">
                        <Textarea
                            placeholder="Type here..."
                            name="prompt"
                            id="prompt"
                            rows={1}
                            className="min-h-[48px] rounded-2xl resize-none p-4 border shadow-sm pr-16"
                            value={prompt}
                            onChange={handleInputChange}
                        />
                        <Button type="submit" size="icon" className="absolute top-3 right-3 w-8 h-8" onClick={handleSend} disabled={!prompt.trim()}>
                            <ArrowUpIcon className="w-4 h-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function HomePage() {
    return isAuthenticated() ? <LearnPage /> : <Hero />;
}
