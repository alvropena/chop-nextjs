import Image from "next/image";

export const Logo = () => {
    return (
        <a href="/learn">
            <Image
                height={130}
                width={130}
                alt="logo"
                src="/logo.svg"
            />
        </a>
    )
}