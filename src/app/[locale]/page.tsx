"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { geography } from "@/data/geography"
import { soccer } from "@/data/soccer"
import { history } from "@/data/history"
import { ArrowRightIcon, Info, LoaderCircle, LogIn } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Logo from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Question } from "@/types/question"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Page() {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [hintMessage, setHintMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [currentData, setCurrentData] = useState(geography); // Default to geography
  const [shuffledData, setShuffledData] = useState<any[]>([]); // Shuffled questions
  const [selectedCategory, setSelectedCategory] = useState("geography"); // Default category
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For feedback dialog
  const [isCongratulationsDialogOpen, setIsCongratulationsDialogOpen] =
    useState(false); // For congratulations dialog
  const [isLoading, setIsLoading] = useState(false);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0); // Track the number of study sessions
  const [isAlertOpen, setIsAlertOpen] = useState(false); // For change topic alert dialog
  const [pendingCategory, setPendingCategory] = useState<string | null>(null); // Track the category user wants to switch to
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const router = useRouter();
  useEffect(() => {
    // Shuffle the questions when the component mounts or when the category changes
    const shuffledQuestions = shuffleArray([...currentData]);
    setShuffledData(shuffledQuestions);
    setCurrentIndex(0);
  }, [currentData]);

  useEffect(() => {
    setSessionCount(0); // Reset session count on page load
  }, []);

  useEffect(() => {
    // Update progress to reflect the completion of ten questions
    setProgress(((questionCount % 10) / 10) * 100);
  }, [questionCount]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "https://api-dev.chop.so";

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
      const response = await fetch(
        `${baseUrl}/api/assignments/check-response?question=${encodeURIComponent(currentData[currentIndex].question_text)}&response=${encodeURIComponent(userInput)}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setFeedbackMessage(data || "No message found in the response");
      setHintMessage(""); // Clear hint message when feedback is shown
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
      const response = await fetch(
        `${baseUrl}/api/assignments/hint?question=${encodeURIComponent(currentData[currentIndex].question_text)}`,
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData.length);
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
  };

  const showToast = (message: string) => {
    toast({
      description: message,
    });
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
        showToast("Thank you for your feedback!");
        setIsDialogOpen(false);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        showToast("An error occurred. Please try again later.");
      }
    } catch (error) {
      showToast("An error occurred. Please try again later.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const isFormFilled = name.trim() && email.trim() && message.trim();

  const handleCategoryClick = (category: string) => {
    if (dontAskAgain) {
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
        setCurrentData(geography);
        break;
      case "history":
        setCurrentData(history);
        break;
      case "soccer":
        setCurrentData(soccer);
        break;
      default:
        setCurrentData(geography);
    }
    setCurrentIndex(0);
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
    setProgress(0); // Reset progress when changing categories
    setQuestionCount(0); // Reset question count when changing categories
  };

  const confirmCategoryChange = () => {
    if (pendingCategory) {
      switchCategory(pendingCategory);
      setPendingCategory(null);
    }
    setIsAlertOpen(false);
  };

  // Handle changing the data based on the selected category
  const handleGeographyClick = () => {
    setCurrentData(geography);
    setCurrentIndex(0);
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
  };

  const handleHistoryClick = () => {
    setCurrentData(history);
    setCurrentIndex(0);
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
  };

  const handleSoccerClick = () => {
    setCurrentData(soccer);
    setCurrentIndex(0);
    setUserInput("");
    setHintMessage("");
    setFeedbackMessage("");
    setShowContinueButton(false);
  };

  return (
    <div className="h-fit min-h-screen flex flex-col p-6">
      {/* Header */}
      <header className="flex flex-row items-center justify-between">
        <Logo />
        <div className="flex flex-row items-center gap-4">
          <ModeToggle />
          <Button
            className="gap-2"
            onClick={() => {
              router.push("/api/auth/login");
            }}
          >
            <LogIn className="h-4 w-4" />
            Log In
          </Button>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow justify-center w-full">
        <main className="flex flex-col items-center w-full max-w-md">
          <p className="text-3xl mb-4">👋 Hey {user?.name}!</p>
          <p className="text-sm mb-4 text-slate-500">
            Select one of the topics from below and start playing.
          </p>
          <div className="flex flex-row gap-4 mb-4">
            <Button
              variant={selectedCategory === "geography" ? "default" : "outline"}
              className="h-6 text-xs"
              onClick={() => handleCategoryClick("geography")}
            >
              🗺️ Geography
            </Button>
            <Button
              variant={selectedCategory === "history" ? "default" : "outline"}
              className="h-6 text-xs"
              onClick={() => handleCategoryClick("history")}
            >
              🏛️ History
            </Button>
            <Button
              variant={selectedCategory === "soccer" ? "default" : "outline"}
              className="h-6 text-xs"
              onClick={() => handleCategoryClick("soccer")}
            >
              ⚽ Soccer
            </Button>
          </div>
          <Progress value={progress} className="w-[100%] mb-4 h-2" />
          <Card className="flex flex-col w-full items-center justify-center h-64">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Label className="text-xl mb-4 text-center">
                {shuffledData[currentIndex]?.question_text}
              </Label>
              <div className="flex flex-row items-center justify-center gap-2 w-full">
                <Input
                  type="text"
                  placeholder="Enter your answer"
                  value={userInput}
                  className="w-80"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={showContinueButton || isLoading} // Disable input during loading
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={validateAnswer}
                  disabled={
                    !userInput.trim() || showContinueButton || isLoading
                  } // Disable button during loading
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin h-4 w-4" />
                  ) : (
                    <ArrowRightIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {!feedbackMessage && hintMessage && (
                <p className="text-center mt-4 text-sm">{hintMessage}</p>
              )}
              {feedbackMessage && (
                <p className="text-center mt-4 text-sm">{feedbackMessage}</p>
              )}
              {!showContinueButton ? (
                <Button
                  variant="secondary"
                  className="gap-1 mt-4"
                  onClick={handleHintClick}
                  disabled={isHintLoading}
                >
                  {isHintLoading ? (
                    <LoaderCircle className="animate-spin h-4 w-4" />
                  ) : (
                    <Info className="h-4 w-4" />
                  )}{" "}
                  {isHintLoading ? "Loading" : "Hint"}
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="mt-4"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Alert Dialog for Changing Topic */}
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Topic?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change the topic? This will lose all
                  your progress in the current session.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-row items-center gap-2">
                <Checkbox id="dontAskAgain" />
                <label
                  htmlFor="dontAskAgain"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Don&apos;t ask me again
                </label>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={confirmCategoryChange}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Feedback Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                onClick={() => setIsDialogOpen(true)}
                className="mt-4"
              >
                How we can improve? 🙏
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share your feedback</DialogTitle>
                <DialogDescription>
                  We would love to hear your thoughts! Please share your
                  feedback below.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleFeedbackSubmit}
                  disabled={!isFormFilled || isSubmitLoading}
                >
                  {isSubmitLoading ? (
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  {isSubmitLoading ? "Loading" : "Submit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Alert Dialog for Study Session Completion */}
          <AlertDialog
            open={isCongratulationsDialogOpen}
            onOpenChange={setIsCongratulationsDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>🎉 Congratulations!</AlertDialogTitle>
                <AlertDialogDescription>
                  You have completed your{" "}
                  {sessionCount === 0 ? "first" : sessionCount + 1 + "th"} study
                  session!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => setIsCongratulationsDialogOpen(false)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
      {/* Footer with Feedback Dialog */}
      <footer className="flex flex-row justify-between items-center">
        <Badge>Beta</Badge>
        <p className="text-xs text-gray-500">
          Chop can make mistakes. Check important info.
        </p>
        <Button
          onClick={() =>
            window.open(
              "https://github.com/alvropena/chop-nextjs.git",
              "_blank"
            )
          }
          variant="link"
          className="text-xs"
        >
          Source
        </Button>
      </footer>
    </div>
  );
}
