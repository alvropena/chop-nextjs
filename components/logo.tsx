"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/use-is-mounted";

export default function Logo() {
    const { theme, systemTheme } = useTheme();
    const isMounted = useIsMounted();

    // Delay rendering until mounted to avoid mismatch between server and client
    if (!isMounted || !theme) {
        // Render the placeholder until the theme is determined
        return <Image height={100} width={100} alt="logo" src={"/logo.svg"} />;
    }

    const getImage = () => {
        if (theme === "system" && systemTheme) {
            return systemTheme === "dark" ? "/logo.svg" : "/logo_d.svg";
        }
        return theme === "dark" ? "/logo.svg" : "/logo_d.svg";
    };

    // Set the logo image based on the actual theme
    const LogoImage = getImage();

    return <Image height={100} width={100} alt="logo" src={LogoImage} />;
}