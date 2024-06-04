import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Component from "./(dashboard)/_components/tinder_replica"
import MenuBar from "./(dashboard)/_components/menu_bar"

export default function Page() {
    return (
        <div className="grid md:grid-cols-[260px_1fr] min-h-screen w-full">
            <div className="bg-neutral-950 hidden md:flex flex-col gap-2 text-white">
                <div className="sticky top-0 p-2">
                    <Button
                        variant="ghost"
                        className="w-full text-left px-2 justify-start p hover:bg-neutral-900 hover:text-neutral-50 gap-2"
                    >
                        <div className="rounded-full bg-white text-black flex items-center justify-center w-7 h-7">
                            {/** <BotIcon className="h-4 w-4" /> **/}
                        </div>
                        <div className="grow text-ellipsis overflow-hidden whitespace-nowrap text-sm">Chop</div>
                        {/** <PenIcon className="h-4 w-4" /> **/}
                    </Button>
                </div>
                <div className="overflow-auto flex-1">
                    <div className="grid gap-1 p-2">
                        <div className="text-stone-500 text-xs font-medium px-2">Today</div>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block bg-neutral-900 hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Airplane Turbulence: Sky&apos;s Rollercoaster
                        </Link>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            How to make a chat app with React
                        </Link>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Cooking recipe for disaster
                        </Link>
                    </div>
                    <div className="grid gap-1 p-2">
                        <div className="text-stone-500 text-xs font-medium px-2">Yesterday</div>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Python functon for Fibonacci sequence
                        </Link>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Five largest lakes in the world
                        </Link>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Weather forecast in Seattle
                        </Link>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Chicken or the egg?
                        </Link>
                        <Link
                            href="#"
                            className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
                            prefetch={false}
                        >
                            Neural networks for dummies
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="sticky top-0 p-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-1 rounded-xl px-3 h-10 data-[state=open]:bg-neutral-100 text-lg">
                                <MenuBar />
                                {/** <ChevronDownIcon className="w-4 h-4 text-neutral-400" /> **/}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="max-w-[300px]">
                            <DropdownMenuItem className="items-start gap-2">
                                {/** <SparklesIcon className="w-4 h-4 mr-2 shrink-0 translate-y-1" /> **/}
                                <div>
                                    <div className="font-medium">GPT-4</div>
                                    <div className="text-stone-600">With DALL-E, browing and analysis. Limit 40 messages / 3 hours</div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="items-start gap-2">
                                {/** <ZapIcon className="w-4 h-4 mr-2 shrink-0 translate-y-1" /> **/}
                                <div>
                                    <div className="font-medium">GPT-3</div>
                                    <div className="text-stone-600">Great for everyday tasks</div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Component />
                <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-white dark:bg-gray-950">
                    <div className="relative">
                        <Textarea
                            placeholder="Type here..."
                            name="message"
                            id="message"
                            rows={1}
                            className="min-h-[48px] rounded-2xl resize-none p-4 border border-gray-200 border-neutral-400 shadow-sm pr-16 dark:border-gray-800"
                        />
                        <Button type="submit" size="icon" className="absolute top-3 right-3 w-8 h-8" disabled>
                            {/** <ArrowUpIcon className="w-4 h-4" /> **/}
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                    <p className="text-xs text-center text-neutral-700 font-medium">
                        Chop can make mistakes. Consider checking important information.
                    </p>
                </div>
            </div>
        </div>
    )
}