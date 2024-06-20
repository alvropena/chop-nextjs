"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, Pencil, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/types/prompt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function HomePage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [sessionToken, setSessionToken] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [conversation, setConversation] = useState<{ prompt: string, response: string }[]>([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("sessionToken");
        if (storedToken) {
            setSessionToken(storedToken);
        }
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value);
    };

    const handleSend = async () => {
        if (prompt.trim()) {
            const newPrompt: Prompt = {
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                text: prompt,
                user_id: "user123",
            };

            // const response = await sendPrompt(newPrompt, sessionToken);
            // if (response) {

            // }
            setConversation([...conversation, { prompt: prompt, response: "Lorem Ipsum" }]);
            setPrompt("");
        }
    };

    const sendPrompt = async (promptData: Prompt, sessionToken: string) => {
        try {
            const url = `${baseUrl}/api/v1/flow/`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({ text: promptData.text }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Response from server:", result);
            return result;
        } catch (error) {
            console.error("Failed to send prompt:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 p-2 flex flex-row justify-end">
                <Button
                    variant="outline"
                    className="text-left px-2 justify-start hover:bg-neutral-900 hover:text-neutral-50 gap-2"
                >
                    New Chat
                </Button>
            </div>
            <div className="flex-1 overflow-auto px-4">
                <div className="max-w-2xl mx-auto flex flex-col items-start gap-8">
                    <div className="flex flex-row justify-end p-2 items-center">
                        <Avatar>
                            <AvatarImage src="" alt="@chop" />
                            <AvatarFallback>CH</AvatarFallback>
                        </Avatar>
                        <p className="ml-2">Hey, what do you want to learn today?</p>
                    </div>
                    {conversation.map((entry, index) => (
                        <div key={index} className="w-full">
                            <div className="flex flex-row justify-end p-2 items-center">
                                <p className="mr-2">{entry.prompt}</p>
                                <Avatar>
                                    <AvatarImage src="" alt="@alvaro" />
                                    <AvatarFallback>AL</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-row p-2 items-center">
                                <Avatar>
                                    <AvatarImage src="" alt="@shadcn" />
                                    <AvatarFallback>CH</AvatarFallback>
                                </Avatar>
                                <p className="ml-2">{entry.response}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sticky bottom-0 w-full py-2 flex flex-col gap-1.5 px-4 pb-4">
                <div className="relative max-w-2xl mx-auto w-full">
                    <Textarea
                        placeholder="Type here..."
                        name="prompt"
                        id="prompt"
                        rows={1}
                        className="min-h-[48px] rounded-2xl resize-none p-4 border shadow-sm pr-16"
                        value={prompt}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute top-3 right-3 w-8 h-8"
                        onClick={handleSend}
                        disabled={!prompt.trim()}
                    >
                        <ArrowUpIcon className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
