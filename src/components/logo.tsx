import React from 'react'
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/home"}>
            <Image
                height={80}
                width={80}
                alt="logo"
                src={"/logo_d.svg"}
            />
        </Link>
    )
}
