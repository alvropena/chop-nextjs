"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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

export default function HistoryPage() {
  const { user, error, isLoading } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const pathname = usePathname();
  const array = pathname.split("/").splice(2);
  const promptId = array[0];

  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const tokenData = await getData();
        const asd = 9;
        const response = await axios.get(
          `${baseUrl}/api/v1/prompts/${promptId}?token=${tokenData.accessToken}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        if (response) {
          setConversation([
            ...conversation,
            { prompt: data.text, response: data.questions[0].question_text },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 p-2 flex flex-row justify-end">
        <Button className="text-left px-2 justify-start hover:bg-neutral-900 hover:text-neutral-50 gap-2">
          <Plus size={"16"} />
          New Thread
        </Button>
      </div>
      <div className="flex-1 overflow-auto px-4">
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
    </div>
  );
}
