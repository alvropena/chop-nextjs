"use client"

import * as React from "react"
import { useTheme } from "next-themes"
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
        <Toggle aria-label="Toggle theme" pressed={isDarkMode} onPressedChange={handleToggle}>
            {isDarkMode ? (
                <div>Dark</div>
            ) : (
                <div>Light</div>
            )}
        </Toggle>
    )
}