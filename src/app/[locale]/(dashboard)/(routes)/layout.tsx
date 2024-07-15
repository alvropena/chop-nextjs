'use client'

import { useState } from "react";
import MobileSiderbar from "../_components/chat-clone/MobileSidebar";
import Sidebar from "../_components/sidebar/sidebar";
import Sidebara from "../_components/chat-clone/Sidebar";

import { ModeToggle } from "@/components/mode-toggle";
import { AvatarDropdownMenu } from "../_components/avatar-dropdown-menu";
import { NotificationsDropdownMenu } from "../_components/notifications-dropdown-menu";
import Navbar from "../_components/sidebar/navbar";
import { MobileSidebar } from "../_components/sidebar/mobile-sidebar";
import { GiveFeedbackDialog } from "../_components/give-feedback-dialog";
import ThemeSwitch from "../../components/ThemeSwitch";



export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <div className="dark hidden flex-shrink-0 bg-gray-100/40 dark:bg-gray-800/40 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col border-r">
          <Sidebara locale={locale} />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-[52px] items-center justify-between gap-4 border-b bg-gray-100/40 px-4 dark:bg-gray-800/40 lg:h-[60px] lg:px-6">
          <div className="flex flex-col">
            <MobileSidebar />
          </div>

          <div className="flex flex-row items-center gap-4">
            {/* Uncomment the below lines if these components are needed */}
            {/* <Button>Upgrade</Button>
                <GiveFeedbackDialog />
                <NotificationsDropdownMenu /> */}
            <ModeToggle />
            <AvatarDropdownMenu />
          </div>
        </header>

        <div className="flex-grow p-4 lg:p-6 overflow-y-auto max-w-full h-fit">
          {children}
        </div>
      </div>
    </main>
  );
}
