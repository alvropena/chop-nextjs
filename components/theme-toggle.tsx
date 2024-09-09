"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toggle } from "./ui/toggle"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ variant = "toggle" }) {
    const { theme, setTheme } = useTheme()
    const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark")

    const handleToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark"
        setTheme(newTheme)
        setIsDarkMode(!isDarkMode)
    }

    React.useEffect(() => {
        setIsDarkMode(theme === "dark")
    }, [theme])

    if (variant === "switch") {
        return (
            <div className="flex items-center">
                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleToggle} />
            </div>
        )
    }

    return (
        <Toggle
            aria-label="Toggle theme"
            pressed={isDarkMode}
            onPressedChange={handleToggle}
        >
            {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Toggle>
    )
}
