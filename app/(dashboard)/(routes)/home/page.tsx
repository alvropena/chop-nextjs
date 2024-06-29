"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getData } from "@/lib/utils";
import { Logger } from "@/lib/logger";
import { PromptFormData, promptSchema } from "@/zod/validation-schema";
import TypingEffect from "@/lib/typing-effect";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user } = useUser();
  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
  });

  const handleSend = async (data: PromptFormData) => {
    if (data.prompt.trim()) {
      const newPrompt = {
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        text: data.prompt,
        user_id: "user123",
      };

      // Immediately show the user's prompt
      setConversation((prev) => [
        ...prev,
        { prompt: data.prompt, response: "Loading..." },
      ]);

      reset();

      const token = await getData();
      const response = await sendPrompt(newPrompt, token.accessToken);

      if (response) {
        Logger.info(response);
        setConversation((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1
              ? { prompt: entry.prompt, response: JSON.stringify(response) }
              : entry
          )
        );
      } else {
        setConversation((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1
              ? { prompt: entry.prompt, response: "Error: Failed to load response." }
              : entry
          )
        );
      }
    }
  };

  const sendPrompt = async (
    promptData: { text: string },
    sessionToken: string
  ) => {
    try {
      const url = `${baseUrl}/api/v1/flow?token=${sessionToken}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: promptData.text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      Logger.error("Failed to send prompt:", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-2 flex flex-row justify-end">
        <Button className="text-left px-2 justify-start hover:bg-neutral-900 hover:text-neutral-50 gap-2">
          <Plus size={"16"} />
          New Thread
        </Button>
      </header>
      <main className="flex-1 overflow-auto px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-start gap-8">
          <div className="flex flex-row justify-end p-2 items-center">
            <Avatar>
              <AvatarImage src="" alt="@chop" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <TypingEffect text="Hey, what do you want to learn today?" />
          </div>
          {conversation.map((entry, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-row justify-end p-2 items-center">
                <p className="mr-2">{entry.prompt}</p>
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>{user?.name?.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-row p-2 items-center">
                <Avatar>
                  <AvatarImage src="" alt="@chop" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <TypingEffect text={entry.response} />
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="sticky w-full py-2 flex flex-col gap-1.5 px-4 pb-4">
        <form
          onSubmit={handleSubmit(handleSend)}
          className="relative max-w-2xl max-auto w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(handleSend)();
            }
          }}
        >
          <Textarea
            placeholder="Type here..."
            id="prompt"
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 border shadow-sm pr-16 "
            {...register("prompt")}
          />
          {
            errors.prompt && (
              <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>
            )
          }
          <Button
            type="submit"
            size="icon"
            className="absolute top-3 right-3 w-8 h-8"
            disabled={!isValid}
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div >
    </div >
  );
}
