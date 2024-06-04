"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Component() {
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            name: "Emily, 25",
            bio: "Adventurous spirit looking for a partner in crime!",
            image: "/placeholder.svg?height=400&width=300",
        },
        {
            id: 2,
            name: "Michael, 29",
            bio: "Passionate about travel, food, and good conversation.",
            image: "/placeholder.svg?height=400&width=300",
        },
        {
            id: 3,
            name: "Sarah, 27",
            bio: "Lover of the outdoors and all things cozy.",
            image: "/placeholder.svg?height=400&width=300",
        },
        {
            id: 4,
            name: "David, 31",
            bio: "Intellectual and curious about the world.",
            image: "/placeholder.svg?height=400&width=300",
        },
        {
            id: 5,
            name: "Jessica, 24",
            bio: "Passionate about art, music, and making the world a better place.",
            image: "/placeholder.svg?height=400&width=300",
        },
    ])
    const [currentProfile, setCurrentProfile] = useState(profiles[0])
    const [isSwipingLeft, setIsSwipingLeft] = useState(false)
    const [isSwipingRight, setIsSwipingRight] = useState(false)
    const [page, setPage] = useState(1)
    const handleSwipeLeft = () => {
        setIsSwipingLeft(true)
        setTimeout(() => {
            setIsSwipingLeft(false)
            setCurrentProfile(profiles[Math.floor(Math.random() * profiles.length)])
        }, 300)
    }
    const handleSwipeRight = () => {
        setIsSwipingRight(true)
        setTimeout(() => {
            setIsSwipingRight(false)
            setCurrentProfile(profiles[Math.floor(Math.random() * profiles.length)])
        }, 300)
    }
    const handleScroll = (e: any) => {
        const scrollHeight = e.target.scrollHeight
        const scrollTop = e.target.scrollTop
        const clientHeight = e.target.clientHeight
        if (scrollTop + clientHeight >= scrollHeight) {
            setPage(page + 1)
        }
    }
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto p-4" onScroll={handleScroll}>
                <div className="flex justify-center items-center h-full">
                    <div
                        className={`relative w-[300px] h-[500px] rounded-2xl overflow-hidden transition-transform duration-300 ${isSwipingLeft ? "-translate-x-full opacity-0" : isSwipingRight ? "translate-x-full opacity-0" : ""
                            }`}
                    >
                        <Image
                            src="/placeholder.svg"
                            alt={currentProfile.name}
                            width={300}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                            <h3 className="text-2xl font-bold">{currentProfile.name}</h3>
                            <p className="text-sm">{currentProfile.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-center gap-4">
                <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={handleSwipeLeft}
                >

                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={handleSwipeRight}
                >

                </Button>
            </div>
        </div>
    )
}