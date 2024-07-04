"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  getData,
  createThread,
  sendPromptToThread,
  updateOption,
} from "@/lib/utils";
import { Logger } from "@/lib/logger";
import { PromptFormData, promptSchema } from "@/zod/validation-schema";
import TypingEffect from "@/lib/typing-effect";
import { Thread } from "@/types/prompt";
import { useThreadStore } from "@/providers/thread-store-provider";
import { useTranslations } from "next-intl";
import { useSchemaStore } from "@/providers/schema-store-provider";

export default function HistoryPage() {
  const { user } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const pathname = usePathname();
  const lang = pathname.split("/").slice(1)[0];
  const array = pathname.split("/").splice(2);
  const promptId = array[0];
  const router = useRouter();
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [showNewQuestionButton, setShowNewQuestionButton] = useState(false);
  const {
    threads,
    currentPrompt,
    addThread,
    setThread,
    clearThreads,
    setCurrentPrompt,
    setThreads,
    resetStore,
  } = useThreadStore((state) => state);
  const t = useTranslations("");
  const { user_input_generation } = useSchemaStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const tokenData = await getData();
        const response = await axios.get(
          `${baseUrl}/api/v1/threads/history/${promptId}?token=${tokenData.accessToken}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: Thread = response.data;
        if (response) {
          setThreads(data.thread);
          setCurrentPrompt(response.data.prompt);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchProfile();
    }

    return () => {
      resetStore();
    };
  }, [user]);

  const handleOptionClick = async (optionId: number, isSelected: boolean) => {
    const token = await getData();
    try {
      const response = await updateOption(
        optionId,
        token.accessToken,
        isSelected
      );
      Logger.info(response);

      // Disable all options once one is selected
      setOptionsDisabled(true);

      // Update Zustand state with the updated option
      const updatedThread = threads.find((thread) =>
        thread.question.options.some((option) => option.id === optionId)
      );
      if (updatedThread) {
        updatedThread.question.options = updatedThread.question.options.map(
          (option) =>
            option.id === optionId
              ? { ...option, is_selected: isSelected }
              : option
        );
        setThread(updatedThread);
        setShowNewQuestionButton(true);
      }
    } catch (error) {
      Logger.error("Failed to update option:", error);
    }
  };

  const handleNewQuestion = async () => {
    const token = await getData();
    console.log(currentPrompt);
    try {
      const response = await sendPromptToThread(
        token.accessToken,
        currentPrompt?.id ?? 0,
        user_input_generation,

        lang
      );
      addThread(response.thread);
      setShowNewQuestionButton(false); // Hide the button after generating a new question
    } catch (error) {
      Logger.error("Failed to create new question:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 p-2 flex flex-row justify-end">
        <Button
          onClick={() => {
            router.push("/home");
            resetStore();
          }}
          className="text-left px-2 justify-start hover:bg-neutral-900 hover:text-neutral-50 gap-2"
        >
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
            <TypingEffect text={t("Hey_what_do_you_want_to_learn_today?")} />
          </div>
          {currentPrompt && (
            <div key={currentPrompt?.id} className="w-full">
              <div className="flex flex-row justify-end p-2 items-center">
                <p className="mr-2">{currentPrompt?.text}</p>
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>{user?.name?.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}
          {threads.map((entry, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-row p-2 items-center">
                <Avatar>
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <p className="ml-2">{entry.question.question_text}</p>
              </div>
              <div className="flex flex-row p-2 items-center">
                <Avatar>
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <p className="ml-2">These are the options for the answer:</p>
              </div>
              <div className="flex flex-col p-2 items-center">
                {entry.question.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() =>
                      handleOptionClick(option.id, !option.is_selected)
                    }
                    className="text-left px-2 hover:bg-neutral-900 hover:text-neutral-50 gap-2 m-2"
                    disabled={
                      entry.question.options.filter((item) => item.is_selected)
                        .length > 0
                    }
                  >
                    {option.option_text}
                  </Button>
                ))}
              </div>
              {entry.question.options.filter((item) => item.is_selected)
                .length > 0 && (
                <>
                  <div className="flex flex-row justify-end p-2 items-center">
                    <div className="mr-2">
                      {entry.question.options
                        .filter((item) => item.is_selected)
                        .map((a) => (
                          <p key={a.id}>{a.option_text}</p>
                        ))}
                    </div>
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
                    <p className="ml-2">
                      {entry.question.options
                        .filter((itemFiltered) => itemFiltered.is_selected)
                        .map((itemMapped) =>
                          itemMapped.is_correct_answer ? (
                            <p key={itemMapped.id}>Its correct!</p>
                          ) : (
                            <p key={itemMapped.id}>This is incorrect</p>
                          )
                        )}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
          {showNewQuestionButton && (
            <Button
              onClick={handleNewQuestion}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              New Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
