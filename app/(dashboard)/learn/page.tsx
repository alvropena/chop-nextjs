"use client"

import React, { ChangeEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpIcon, BotIcon, ChevronDownIcon, ClipboardIcon, PenIcon, RefreshCcwIcon, SparkleIcon, ThumbsDownIcon, ThumbsUpIcon, ZapIcon } from 'lucide-react'
import Image from 'next/image'
import { Menubar } from '@/components/ui/menubar'
import MenuBar from '../_components/menu_bar'

export default function LearnPage() {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ sender: string, content: string }[]>([]);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = { sender: "You", content: message };
            const responseMessage = { sender: "Chop", content: "Lorem Ipsum" };

            setMessages(prevMessages => [...prevMessages, newMessage, responseMessage]);
            setMessage('');
        }
    };

    return (
        <div className="grid min-h-screen w-full">
            <div className="flex flex-col">
                <div className="sticky top-0 p-2 flex flex-row justify-between">
                    <MenuBar />
                    <Button
                        variant="ghost"
                        className="text-left px-2 justify-start p hover:bg-neutral-900 hover:text-neutral-50 gap-2"
                    >
                        <PenIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="max-w-2xl flex-1 mx-auto flex flex-col items-start gap-8 px-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Avatar className="border w-6 h-6">
                                <Image src="/placeholder.svg" alt="Image" width={10} height={10} />
                                <AvatarFallback>{msg.sender === "You" ? "YO" : "CP"}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="font-bold">{msg.sender}</div>
                                <div className="prose prose-stone">
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-white dark:bg-gray-950 pb-4">
                    <div className="relative">
                        <Textarea
                            placeholder="Type here..."
                            name="message"
                            id="message"
                            rows={1}
                            className="min-h-[48px] rounded-2xl resize-none p-4 border border-gray-200 shadow-sm pr-16 dark:border-gray-800"
                            value={message}
                            onChange={handleInputChange}
                        />
                        <Button type="submit" size="icon" className="absolute top-3 right-3 w-8 h-8" onClick={handleSend} disabled={!message.trim()}>
                            <ArrowUpIcon className="w-4 h-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
