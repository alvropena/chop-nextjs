import React from 'react'
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/"}>
            <Image
                height={100}
                width={100}
                alt="logo"
                src={"/logo.svg"}
            />
        </Link>
    )
}