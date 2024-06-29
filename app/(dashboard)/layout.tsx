"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { AvatarDropdownMenu } from "./_components/avatar-dropdown-menu";
import { NotificationsDropdownMenu } from "./_components/notifications-dropdown-menu";
import Navbar from "./_components/sidebar/navbar";
import { MobileSidebar } from "./_components/sidebar/mobile-sidebar";
import { GiveFeedbackDialog } from "./_components/give-feedback-dialog";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                        <div className="flex h-full max-h-screen flex-col gap-2">
                            <Navbar />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                            <div className="flex items-center">
                                <MobileSidebar />
                            </div>
                            <div className="flex flex-row gap-4 items-center">
                                {/* <Button>Upgrade</Button> 
                                <GiveFeedbackDialog />
                                <NotificationsDropdownMenu /> */}
                                <ModeToggle />
                                <AvatarDropdownMenu />
                            </div>
                        </header>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}