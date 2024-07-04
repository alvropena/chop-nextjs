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
    <html>
      <body>
        <div className='grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]'>
          <div className='hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block'>
            <div className='flex h-full max-h-screen flex-col gap-2'>
              <Navbar locale={locale} />
            </div>
          </div>
          <div className='flex flex-col'>
            <header className='flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]'>
              <div className='flex items-center'>
                <MobileSidebar />
              </div>
              <div className='flex flex-row items-center gap-4'>
                {/* <Button>Upgrade</Button> 
                                <GiveFeedbackDialog />
                                <NotificationsDropdownMenu /> */}
                <ThemeSwitch />
                <AvatarDropdownMenu />
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
