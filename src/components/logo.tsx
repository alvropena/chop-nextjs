import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Image
            height={180}
            width={180}
            alt="logo"
            src="/logo.svg"
        />
    )
}