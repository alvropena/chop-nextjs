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
import Image from "next/image"
import { Logo } from "@/components/logo"

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false) // State to control dialog

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      validateAnswer()
    }
  }

  const showToast = (message: string) => {
    toast({
      description: message,
    })
  }

  const validateAnswer = async () => {
    try {
      //TODO: Change this endpoint to obtain a hint for this question.
      const response = await fetch(`/api/feedback/${currentIndex + 1}`)
      const data = await response.json()

      showToast(data.message)
    } catch (error) {
      showToast("An error occurred. Try again later.")
    } finally {
      setUserInput("")
      setCurrentIndex((prevIndex) => (prevIndex + 1) % capitalsData.length)
    }
  }

  const handleHintClick = async () => {
    try {
      //TODO: Change this endpoint to obtain a hint for this question.
      const response = await fetch(`/api/feedback/${currentIndex + 1}`)
      const data = await response.json()

      showToast(data.message)
    } catch (error) {
      showToast("An error occurred. Try again later.")
    }
  }

  const handleFeedbackSubmit = () => {
    showToast("Thank you for your feedback!")
    setIsDialogOpen(false) // Close the dialog after submission
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      {/* Header */}
      <header className="flex flex-col items-center justify-center gap-2 m">
        <Logo />
        <p className="text-lg">Duolingo but for any topic.</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-md">
        <Card className="shadow-lg w-full">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Label className="text-xl mb-4 text-center">{capitalsData[currentIndex].question_text}</Label>
            <div className="flex flex-row items-center justify-center gap-2 w-full">
              <Input
                type="text"
                placeholder="Enter the capital"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <Button
                variant="default"
                size="icon"
                onClick={validateAnswer}
                disabled={!userInput.trim()}
              >
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="secondary" className="gap-1 mt-4" onClick={handleHintClick}>
              <Info className="h-4 w-4" /> Hint
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer with Feedback Dialog */}
      <footer className="mt-8 text-center text-gray-600">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">Tell us what you think!</Button>
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
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleFeedbackSubmit}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </footer>
    </div>
  )
}
