"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useIsMounted } from "../hooks/use-is-mounted";

interface LogoProps {
    height?: number;
    width?: number;
    className?: string;
}

export default function Logo({ className, height = 100, width = 100}:LogoProps) {
    const { theme, systemTheme } = useTheme();
    const isMounted = useIsMounted();

    // Delay rendering until mounted to avoid mismatch between server and client
    if (!isMounted || !theme) {
        // Render the placeholder until the theme is determined
        return <Image className={className} height={height} width={width} alt="logo" src={"/images/logo.svg"} />;
    }

    const getImage = () => {
        if (theme === "system" && systemTheme) {
            return systemTheme === "dark" ? "/images/logo.svg" : "/images/logo_d.svg";
        }
        return theme === "dark" ? "/images/logo.svg" : "/images/logo_d.svg";
    };

    // Set the logo image based on the actual theme
    const LogoImage = getImage();

    return <Image className={className} height={height} width={width} alt="logo" src={LogoImage} />;
}