"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { MoonIcon, SunIcon } from "lucide-react"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

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

    React.useEffect(() => {
        setIsDarkMode(theme === "dark")
    }, [theme])

    return (
        <div className="flex items-center space-x-2">
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleToggle} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
    )
}