"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  createThread,
  getData,
  sendPromptToThread,
  updateOption,
} from "@/lib/utils";
import { Logger } from "@/lib/logger";
import { PromptFormData, promptSchema } from "@/zod/validation-schema";
import TypingEffect from "@/lib/typing-effect";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useThreadStore } from "@/providers/thread-store-provider";

export default function HomePage() {
  const { user } = useUser();
  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [showNewQuestionButton, setShowNewQuestionButton] = useState(false);
  const {
    threads,
    currentPrompt,
    addThread,
    setThread,
    clearThreads,
    setCurrentPrompt,
    resetStore,
  } = useThreadStore((state) => state);


  useEffect(() => {
    return () => {
      resetStore();
    };
  }, [user]);
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
        text: data.prompt,
        user_id: user?.sub || "unknown",
      };

      reset();

      const token = await getData();
      let currentThreadId = threads.length ? threads[0].id : null;

      if (!currentThreadId) {
        try {
          const response = await createThread(token.accessToken, newPrompt);
          currentThreadId = response.thread.id;
          addThread(response.thread);
          setCurrentPrompt(response.prompt);
        } catch (error) {
          Logger.error("Failed to create new thread:", error);
          updateConversationWithError("Error: Failed to create new thread.");
          return;
        }
      } else {
        try {
          const response = await sendPromptToThread(
            token.accessToken,
            currentPrompt?.id ?? 0
          );
          setThread(response.thread);
          Logger.info(response);
          updateConversationWithResponse(response);
        } catch (error) {
          Logger.error("Failed to send prompt:", error);
          updateConversationWithError("Error: Failed to load response.");
        }
      }
    }
  };

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

  const updateConversationWithResponse = (response: any) => {
    setConversation((prev) =>
      prev.map((entry, index) =>
        index === prev.length - 1
          ? { prompt: entry.prompt, response: JSON.stringify(response) }
          : entry
      )
    );
  };

  const updateConversationWithError = (errorMessage: any) => {
    setConversation((prev) =>
      prev.map((entry, index) =>
        index === prev.length - 1
          ? { prompt: entry.prompt, response: errorMessage }
          : entry
      )
    );
  };

  const handleNewQuestion = async () => {
    const token = await getData();
    console.log(currentPrompt);
    try {
      const response = await sendPromptToThread(
        token.accessToken,
        currentPrompt?.id ?? 0
      );
      addThread(response.thread);
      setShowNewQuestionButton(false); // Hide the button after generating a new question
    } catch (error) {
      Logger.error("Failed to create new question:", error);
      updateConversationWithError("Error: Failed to create new question.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 p-2 flex flex-row justify-end">
        <Button
          onClick={() => {
            resetStore();
            setShowNewQuestionButton(false);
          }}
          className="text-left px-2 justify-start hover:bg-neutral-900 hover:text-neutral-50 gap-2"
        >
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
      </main>
      {!currentPrompt && (
        <div className="sticky w-full py-2 flex flex-col gap-1.5 px-4 pb-4">
          <form
            onSubmit={handleSubmit(handleSend)}
            className="relative max-w-2xl mx-auto w-full"
            autoFocus={false}
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
              className="min-h-[48px] rounded-2xl resize-none p-4 border shadow-sm pr-16"
              {...register("prompt")}
            />
            {errors.prompt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.prompt.message}
              </p>
            )}
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
        </div>
      )}
    </div>
  );
}
