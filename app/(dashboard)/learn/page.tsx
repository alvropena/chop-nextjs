"use client"

import React, { ChangeEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpIcon, PenIcon } from 'lucide-react'
import MenuBar from '../_components/menu_bar'
import { Prompt } from '@/types/types'

export default function LearnPage() {
    const [prompt, setPrompt] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value);
    };

    const handleSend = () => {
        if (prompt.trim()) {
            const newPrompt: Prompt = {
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                text: prompt,
                user_id: ""
            };

            sendPrompt(newPrompt);
            setPrompt('');
        }
    };

    const sendPrompt = async (promptData: Prompt) => {
        try {
            // console.log("Sending prompt:", promptData);
        } catch (error) {
            // console.error("Failed to send prompt:", error);
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
