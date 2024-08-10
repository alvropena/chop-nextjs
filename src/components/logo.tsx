import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import React from 'react'

export default function Logo() {
    const { theme } = useTheme()
    const logoSrc = theme === "dark" ? "/logo.svg" : "/logo_d.svg";

    return (
        <Link href={"/"}>
            <Image
                height={80}
                width={80}
                alt="logo"
                src={logoSrc}
            />
        </Link>
    )
}
