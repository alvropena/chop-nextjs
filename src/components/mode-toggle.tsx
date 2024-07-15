"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark")

    const handleToggle = () => {
        if (isDarkMode) {
            setTheme("light")
        } else {
            setTheme("dark")
        }
        setIsDarkMode(!isDarkMode)
    }

    return (
        <Toggle aria-label="Toggle theme" pressed={isDarkMode} onPressedChange={handleToggle} variant="outline">
            {isDarkMode ?
                <MoonIcon className="h-9 w-4" />
                :
                <SunIcon className="h-4 w-4" />
            }
        </Toggle>

    )
}
