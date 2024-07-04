'use client'

import { AvatarDropdownMenu } from '@/app/[locale]/(dashboard)/_components/avatar-dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'

export const NavbarRoutes = () => {
  const pathname = usePathname()
  const router = useRouter()

  return <div className='ml-auto flex gap-x-2'></div>
}
