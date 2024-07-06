'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { AvatarDropdownMenu } from '../_components/avatar-dropdown-menu'
import { NotificationsDropdownMenu } from '../_components/notifications-dropdown-menu'
import Navbar from '../_components/sidebar/navbar'
import { MobileSidebar } from '../_components/sidebar/mobile-sidebar'
import { GiveFeedbackDialog } from '../_components/give-feedback-dialog'
import ThemeSwitch from '../../components/ThemeSwitch'

export default function DashboardLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <>
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block lg:w-72 border-r bg-gray-100/40 dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <Navbar locale={locale} />
          </div>
        </div>
        {/* Main content area */}
        <div className="flex flex-col">
          {/* Header */}
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-4 dark:bg-gray-800/40 lg:h-[60px] lg:px-6">
            <div className="flex flex-col">
              <MobileSidebar />
            </div>
            <div className="flex flex-row items-center gap-4">
              {/* Uncomment the below lines if these components are needed */}
              {/* <Button>Upgrade</Button> 
                  <GiveFeedbackDialog />
                  <NotificationsDropdownMenu /> */}
              <ThemeSwitch />
              <AvatarDropdownMenu />
            </div>
          </header>
          {/* Main children content */}
          <main className="flex-grow p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
