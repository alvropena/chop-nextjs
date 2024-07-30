'use client'

import { MobileSidebar } from "../../../../components/sidebar/mobile-sidebar";
import Sidebar from "../../../../components/sidebar/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { AvatarDropdownMenu } from "../../../../components/avatar-dropdown-menu";
import { NotificationsDropdownMenu } from "../../../../components/notifications-dropdown-menu";
import Navbar from "../../../../components/sidebar/navbar";
import { GiveFeedbackDialog } from "../../../../components/give-feedback-dialog";

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <div className="flex-shrink-0  md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col border-r">
          <Navbar locale={locale} />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-[52px] items-center justify-between gap-4 border-b lg:h-[60px] lg:px-6">
          <div className="flex flex-col">
            <MobileSidebar />
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* Uncomment the below lines if these components are needed */}
            {/* <Button>Upgrade</Button>
                <GiveFeedbackDialog />
                <NotificationsDropdownMenu /> */}

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
