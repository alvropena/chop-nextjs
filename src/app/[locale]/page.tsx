"use client"

import React, { useState } from "react"
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

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [hintMessage, setHintMessage] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [currentData, setCurrentData] = useState(geography) // Default to geography
  const [selectedCategory, setSelectedCategory] = useState("geography") // Default category
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isHintLoading, setIsHintLoading] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const baseUrl = "https://api-dev.chop.so"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      validateAnswer()
    }
  }

  const validateAnswer = async () => {
    if (!userInput.trim()) {
      setFeedbackMessage("Please enter an answer.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${baseUrl}/api/assignments/check-response?question=${encodeURIComponent(currentData[currentIndex].question_text)}&response=${encodeURIComponent(userInput)}`, {
        method: "POST",
      })
      const data = await response.json()
      setFeedbackMessage(data || "No message found in the response")
      setHintMessage("")  // Clear hint message when feedback is shown
      setShowContinueButton(true)
    } catch (error) {
      setFeedbackMessage("An error occurred. Try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleHintClick = async () => {
    setIsHintLoading(true)

    try {
      const response = await fetch(`${baseUrl}/api/assignments/hint?question=${encodeURIComponent(currentData[currentIndex].question_text)}`, {
        method: "POST",
      })
      const data = await response.json()
      setHintMessage(data || "No hint found in the response")
      setFeedbackMessage("")  // Clear feedback message when hint is shown
    } catch (error) {
      setHintMessage("An error occurred. Try again later.")
    } finally {
      setIsHintLoading(false)
    }
  }

  const handleContinue = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData.length)
    setUserInput("")
    setHintMessage("")
    setFeedbackMessage("")
    setShowContinueButton(false)
  }

  const showToast = (message: string) => {
    toast({
      description: message,
    })
  }

  const handleFeedbackSubmit = async () => {
    setIsSubmitLoading(true)
    try {
      const response = await fetch("https://api-dev.chop.so/api/feedback/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          name: name.trim(),
          email: email.trim(),
        }),
      })
      if (response.ok) {
        showToast("Thank you for your feedback!")
        setIsDialogOpen(false)
        // Reset the form fields after submission
        setName("")
        setEmail("")
        setMessage("")
      } else {
        showToast("An error occurred. Please try again later.")
      }
    } catch (error) {
      showToast("An error occurred. Please try again later.")
    } finally {
      setIsSubmitLoading(false)
    }
  }

  const isFormFilled = name.trim() && email.trim() && message.trim()

  // Handle changing the data based on the selected category
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    switch (category) {
      case "geography":
        setCurrentData(geography)
        break
      case "history":
        setCurrentData(history)
        break
      case "soccer":
        setCurrentData(soccer)
        break
      default:
        setCurrentData(geography)
    }
    setCurrentIndex(0)
    setUserInput("")
    setHintMessage("")
    setFeedbackMessage("")
    setShowContinueButton(false)
  }

  return (
    <div className="h-fit min-h-screen flex flex-col">
      {/* ModeToggle and Sign In positioned at the top right */}
      <div className="flex flex-row items-center justify-between p-4">
        <div>
          <Badge>Beta</Badge>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          {/* <Button className="gap-2">
            <LogIn className="h-4 w-4" />
            Log In
          </Button> */}
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center items-center">
        {/* Header */}
        <header className="flex flex-col items-center justify-center gap-2 mb-8">
          <Logo />
          <p className="text-lg">Duolingo but for any topic.</p>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center w-full max-w-md">
          <div className="flex flex-row gap-4 mb-4">
            <Button
              variant={selectedCategory === "geography" ? "default" : "outline"}
              className="h-6 text-xs"
              onClick={() => handleCategoryClick("geography")}
            >
              🗺️  Geography
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
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Label className="text-xl mb-4 text-center">{currentData[currentIndex].question_text}</Label>
              <div className="flex flex-row items-center justify-center gap-2 w-full">
                <Input
                  type="text"
                  placeholder="Enter your answer"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={showContinueButton || isLoading}  // Disable input during loading
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={validateAnswer}
                  disabled={!userInput.trim() || showContinueButton || isLoading}  // Disable button during loading
                >
                  {isLoading ? <LoaderCircle className="animate-spin h-4 w-4" /> : <ArrowRightIcon className="h-4 w-4" />}
                </Button>
              </div>
              {/* Display hint message for hint response */}
              {!feedbackMessage && hintMessage && (
                <p className="text-center mt-4 text-sm">{hintMessage}</p>
              )}
              {/* Display feedback message for validation response */}
              {feedbackMessage && (
                <p className="text-center mt-4 text-sm">{feedbackMessage}</p>
              )}
              {/* Hide Hint button and show Continue button after answer is submitted */}
              {!showContinueButton ? (
                <Button variant="secondary" className="gap-1 mt-4" onClick={handleHintClick} disabled={isHintLoading}>
                  {isHintLoading ? <LoaderCircle className="animate-spin h-4 w-4" /> : <Info className="h-4 w-4" />} {isHintLoading ? "Loading" : "Hint"}
                </Button>
              ) : (
                <Button variant="default" className="mt-4" onClick={handleContinue}>
                  Continue
                </Button>
              )}

            </CardContent>
          </Card>
        </main>
        {/* Footer with Feedback Dialog */}
        <footer className="flex flex-col mt-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" onClick={() => setIsDialogOpen(true)}>Tell us what you think!</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share your feedback</DialogTitle>
                <DialogDescription>
                  We would love to hear your thoughts! Please share your feedback below.
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
                  {isSubmitLoading ? <LoaderCircle className="animate-spin h-4 w-4 mr-2" /> : null}
                  {isSubmitLoading ? "Loading" : "Submit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </footer>
      </div>
    </div >
  )
}
