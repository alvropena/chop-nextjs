"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { MoonIcon, SunIcon } from "lucide-react"

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
        <Toggle aria-label="Toggle theme" pressed={isDarkMode} onPressedChange={handleToggle}>
            {isDarkMode ? (
                <MoonIcon className="h-4 w-4" />
            ) : (
                <SunIcon className="h-4 w-4" />
            )}
        </Toggle>
    )
}