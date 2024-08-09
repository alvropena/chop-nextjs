"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, Plus, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";

import {
  createThread,
  getData,
  sendPromptToThread,
  updateOption,
  sendOptionTyped,
} from "@/lib/utils";
import { Logger } from "@/lib/logger";
import { PromptFormData, promptSchema } from "@/zod/validation-schema";
import TypingEffect from "@/lib/typing-effect";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useThreadStore } from "@/providers/thread-store-provider";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { useTranslations } from "next-intl";
import { Option, Thread } from "@/types/prompt";
import axios from "axios";

const TextToSpeechButton = ({ text }: { text: string }) => {
  const speak = () => {
    if ("speechSynthesis" in window) {
      console.log(text);
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support Text to Speech.");
    }
  };

  return (
    <button onClick={speak} className="ml-2">
      <Volume2 className="w-4 h-4" />
    </button>
  );
};

export default function IndividualPromptPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split("/").slice(1)[0];
  const array = pathname.split("/").splice(2);
  const promptId = array[1];
  const { user } = useUser();
  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);
  const t = useTranslations("");
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [stateThread, setstateThread] = useState<
    "CREATE" | "RESPONSE" | "NEW_QUESTION"
  >("RESPONSE");
  const [showNewQuestionButton, setShowNewQuestionButton] = useState(false);
  const {
    question_id,
    threads,
    currentPrompt,
    addThread,
    setThread,
    clearThreads,
    setCurrentPrompt,
    resetStore,
    setQuestionId,
    addOption,
    setThreads,
  } = useThreadStore((state) => state);

  const { user_input_generation } = useSchemaStore((state) => state);

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
          setQuestionId(data.thread[data.thread.length - 1].question.id);
          setstateThread("RESPONSE");

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
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
  });

  const handleSend = async (data: PromptFormData) => {
    if (!data.prompt.trim()) {
      return; // Si el prompt está vacío, no hacer nada
    }

    const newPrompt = {
      text: data.prompt,
      user_id: user?.sub || "unknown",
    };

    try {
      const token = await getData();
      let currentThreadId = threads.length ? threads[0].id : null;

      if (!currentThreadId && stateThread === "CREATE") {
        const response = await createThread(
          token.accessToken,
          newPrompt,
          user_input_generation,
          lang
        );
        currentThreadId = response.thread.id;
        addThread(response.thread);
        setCurrentPrompt(response.prompt);
        setstateThread("RESPONSE");
        setQuestionId(response.thread.question.id);
      } else if (currentThreadId && stateThread === "RESPONSE") {
        const response = await sendOptionTyped(
          token.accessToken,
          question_id ?? 0,
          getValues("prompt"),
          lang
        );

        Logger.info(response);
        updateConversationWithResponse(response);
        addOption(question_id, response as Option);
        setstateThread("NEW_QUESTION");
        await handleNewQuestion();
      }
      reset();
    } catch (error) {
      Logger.error("Failed to send prompt:", error);
      updateConversationWithError("Error: Failed to process the request.");
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
      }
      setQuestionId(response.question_id);
      await handleNewQuestion();
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
        currentPrompt?.id ?? 0,
        user_input_generation,
        lang
      );
      console.log(response);
      setQuestionId(response.thread.question.id);
      addThread(response.thread);
      setShowNewQuestionButton(false); // Hide the button after generating a new question
      setstateThread("RESPONSE");
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
            setstateThread("CREATE");
            setShowNewQuestionButton(false);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
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
            <TypingEffect texts={[{ word: t("Hey_what_do_you_want_to_learn_today?"), emoji: "" }]} />
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
                <TextToSpeechButton text={entry.question.question_text} />
              </div>
              <div className="flex flex-row p-2 items-center">
                <Avatar>
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <p className="ml-2">These are the options for the answer:</p>
              </div>
              <div className="flex flex-col p-2 items-center">
                {entry.question.options
                  .filter((item) => !item.is_typed)
                  .map((option, index) => (
                    <div key={index} className="flex flex-row items-center">
                      <Button
                        onClick={() =>
                          handleOptionClick(option.id, !option.is_selected)
                        }
                        className="text-left px-2 hover:bg-neutral-900 hover:text-neutral-50 gap-2 m-2"
                        disabled={
                          entry.question.options.filter(
                            (item) => item.is_selected
                          ).length > 0
                        }
                      >
                        {option.option_text}
                      </Button>
                    </div>
                  ))}
              </div>
              {entry.question.options.filter((item) => item.is_selected)
                .length > 0 && (
                  <>
                    <div className="flex flex-row justify-end p-2 items-center">
                      <div className="mr-2">
                        {entry.question.options
                          .filter((item) => item.is_selected || item.is_typed)
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
            <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>
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
    </div>
  );
}
