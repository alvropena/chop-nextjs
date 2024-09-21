"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useIsMounted } from "../../hooks/use-is-mounted"
import { Toggle } from "../ui/toggle"
import { Switch } from "../ui/switch"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ variant = "toggle" }) {
    const { theme, setTheme, systemTheme } = useTheme();
    const isMounted = useIsMounted();

    const getCurrentTheme = () => {
        if (theme === "system" && systemTheme) {
            return systemTheme;
        }
        return theme;
    };

    const currentTheme = getCurrentTheme();

    const handleToggle = () => {
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    // Render placeholder until mounted to avoid mismatch between server and client
    if ((!isMounted || !theme) ) {
        return variant === "toggle" ? (
            <Toggle aria-label="Toggle theme" onPressedChange={handleToggle}>
                <div className="w-4 h-4" />
            </Toggle>
        ): (
            <div className="flex items-center">
                <div className="w-11 h-6" />
            </div>
        )
    }

    if (variant === "switch") {
        return (
            <div className="flex items-center">
                <Switch id="dark-mode" onCheckedChange={handleToggle} checked={currentTheme === "dark"} />
            </div>
        );
    }

    return (
        <Toggle aria-label="Toggle theme" onPressedChange={handleToggle}>
            {currentTheme === "dark" ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Toggle>
    );
}
