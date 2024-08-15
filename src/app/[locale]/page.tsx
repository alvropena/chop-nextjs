"use client";

import React, { useState, useEffect } from "react";
import { geography } from "@/data/geography";
import { soccer } from "@/data/soccer";
import { history } from "@/data/history";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryButtons from "@/components/category-buttons";
import QuestionCard from "@/components/question-card";
import ChangeTopicDialog from "@/components/change-topic-dialog";
import FeedbackDialog from "@/components/feedback-dialog";
import CompletionDialog from "@/components/completion-dialog";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSchemaStore } from "@/providers/schema-store-provider"; 
import { useParams, usePathname } from "next/navigation"; 
import { useTranslations } from "next-intl"; 

export default function Page() {
  const { toast } = useToast();
  const { remember_skip, setRememberSkip } = useSchemaStore((state) => state); 
  const pathName = usePathname(); 
  const regex = /^\/([^/]+)/; 
  const match: any = pathName.match(regex); 
  const lang: "en" | "es" = match ? match[1] : "en";
  const t = useTranslations("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [hintMessage, setHintMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [currentData, setCurrentData] = useState(geography[lang]); 
  const [shuffledData, setShuffledData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("geography");
  const [isLoading, setIsLoading] = useState(false);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCongratulationsDialogOpen, setIsCongratulationsDialogOpen] =
    useState(false);
  const [progress, setProgress] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = "https://api-dev.chop.so";
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...currentData]);
    setShuffledData(shuffledQuestions);
    setCurrentIndex(0);
  }, [currentData]);

  useEffect(() => {
    setProgress(((questionCount % 10) / 10) * 100);
  }, [questionCount]);

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      validateAnswer();
    }
  };

  const validateAnswer = async () => {
    if (!userInput.trim()) {
      setFeedbackMessage("Please enter an answer.");
      return;
    }
    setIsLoading(true);
    try {
      const currentQuestion = shuffledData[currentIndex]?.question_text;
      const response = await fetch(
        `${baseUrl}/api/assignments/check-response?question=${encodeURIComponent(
          currentQuestion
        )}&response=${encodeURIComponent(userInput)}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setFeedbackMessage(data || "No message found in the response");
      setHintMessage("");
      setShowContinueButton(true);
    } catch (error) {
      setFeedbackMessage("An error occurred. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHintClick = async () => {
    setIsHintLoading(true);
    try {
      const currentQuestion = shuffledData[currentIndex]?.question_text;
      const response = await fetch(
        `${baseUrl}/api/assignments/hint?question=${encodeURIComponent(
          currentQuestion
        )}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setHintMessage(data || "No hint found in the response");
      setFeedbackMessage("");
    } catch (error) {
      setHintMessage("An error occurred. Try again later.");
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleContinue = () => {
    // Increment the current index
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData.length);

    // Increment the question count
    setQuestionCount((prevCount) => {
      const newCount = prevCount + 1;

      // Update progress bar
      setProgress(((newCount % 10) / 10) * 100);

      // Check if it's time to display the CompletionDialog
      if (newCount % 10 === 0) {
        setSessionCount((prevSessionCount) => prevSessionCount + 1);
        setIsCongratulationsDialogOpen(true);
      }

      return newCount;
    });

    // Reset input fields and messages
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
  };

  const handleCategoryClick = (category: string) => {
    if (remember_skip) {
      switchCategory(category);
    } else if (progress > 0) {
      setPendingCategory(category);
      setIsAlertOpen(true);
    } else {
      switchCategory(category);
    }
  };

  const switchCategory = (category: string) => {
    setSelectedCategory(category);
    switch (category) {
      case "geography":
        setCurrentData(geography[lang]); 
        break;
      case "history":
        setCurrentData(history[lang]); 
        break;
      case "soccer":
        setCurrentData(soccer[lang]); 
        break;
      default:
        setCurrentData(geography[lang]);
    setCurrentIndex(0);
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
    setProgress(0);
    setQuestionCount(0);
  };

  const confirmCategoryChange = () => {
    if (pendingCategory) {
      switchCategory(pendingCategory);
      setPendingCategory(null);
      setRememberSkip(true); 
    }
    setIsAlertOpen(false);
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch(
        "https://api-dev.chop.so/api/feedback/send-feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message.trim(),
            name: name.trim(),
            email: email.trim(),
          }),
        }
      );
      if (response.ok) {
        toast({ description: t("Thank_you_for_your_feedback!") }); 
        setIsDialogOpen(false);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast({
          description: t("An_error_ocurred_Please_try_again_later"),
        });
      }
    } catch (error) {
      toast({
        description: t("An_error_ocurred_Please_try_again_later"),
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const isFormFilled =
    name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  return (
    <div className="h-fit min-h-screen flex flex-col p-6">
      <Header />
      <div className="flex flex-col items-center flex-grow justify-center w-full">
        <main className="flex flex-col items-center w-full max-w-md">
          <p className="text-3xl mb-4">
            👋 Hey {user ? user?.name?.split(" ")[0] : ""}!
          </p>
          <p className="text-sm mb-4 text-slate-500">
            {t("Select_one_of_the_topics_from_below_and_start_playing")} 
          </p>
          <CategoryButtons
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <Progress value={progress} className="w-[100%] mb-4 h-2" />
          <QuestionCard
            question={shuffledData[currentIndex]?.question_text}
            userInput={userInput}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            validateAnswer={validateAnswer}
            handleHintClick={handleHintClick}
            handleContinue={handleContinue}
            isLoading={isLoading}
            showContinueButton={showContinueButton}
            hintMessage={hintMessage}
            feedbackMessage={feedbackMessage}
            isHintLoading={isHintLoading}
          />
          <ChangeTopicDialog
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            confirmCategoryChange={confirmCategoryChange}
          />
          <FeedbackDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleFeedbackSubmit={handleFeedbackSubmit}
            isFormFilled={isFormFilled}
            isSubmitLoading={isSubmitLoading}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            message={message}
            setMessage={setMessage}
          />
          <CompletionDialog
            isCongratulationsDialogOpen={isCongratulationsDialogOpen}
            setIsCongratulationsDialogOpen={setIsCongratulationsDialogOpen}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
