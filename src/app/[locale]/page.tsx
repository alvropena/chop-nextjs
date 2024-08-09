"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { capitalsData } from "@/data/capitals"
import { ArrowRightIcon, Info } from "lucide-react"
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

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [hintMessage, setHintMessage] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showContinueButton, setShowContinueButton] = useState(false)
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

    try {
      const response = await fetch(`${baseUrl}/api/assignments/check-response?question=${encodeURIComponent(capitalsData[currentIndex].question_text)}&response=${encodeURIComponent(userInput)}`, {
        method: "POST",
      })
      const data = await response.json()
      setFeedbackMessage(data || "No message found in the  response")
      setHintMessage("")  // Clear hint message when feedback is shown
      setShowContinueButton(true)
    } catch (error) {
      setFeedbackMessage("An error occurred. Try again later.")
    }
  }

  const handleHintClick = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/assignments/hint?question=${encodeURIComponent(capitalsData[currentIndex].question_text)}`, {
        method: "POST",
      })
      const data = await response.json()
      setHintMessage(data || "No hint found in the response")
      setFeedbackMessage("")  // Clear feedback message when hint is shown
    } catch (error) {
      setHintMessage("An error occurred. Try again later.")
    }
  }

  const handleContinue = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % capitalsData.length)
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
    }
  }

  const isFormFilled = name.trim() && email.trim() && message.trim()

  return (
    <div className="relative h-screen">
      {/* ModeToggle positioned at the top right */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        {/* Header */}
        <header className="flex flex-col items-center justify-center gap-2 mb-8">
          <Logo />
          <p className="text-lg">Duolingo but for any topic.</p>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center w-full max-w-md">
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Label className="text-xl mb-4 text-center">{capitalsData[currentIndex].question_text}</Label>
              <div className="flex flex-row items-center justify-center gap-2 w-full">
                <Input
                  type="text"
                  placeholder="Enter the capital"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={showContinueButton}  // Disable input after submitting the answer
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={validateAnswer}
                  disabled={!userInput.trim() || showContinueButton}  // Disable button after submitting the answer
                >
                  <ArrowRightIcon className="h-4 w-4" />
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
                <Button variant="secondary" className="gap-1 mt-4" onClick={handleHintClick}>
                  <Info className="h-4 w-4" /> Hint
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
        <footer className="mt-8 text-center text-gray-600">
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
                  disabled={!isFormFilled}
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </footer>
      </div>
    </div>
  )
}
