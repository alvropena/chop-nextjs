'use client'

import { AvatarDropdownMenu } from '@/components/avatar-dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'

export const NavbarRoutes = () => {
  const pathname = usePathname()
  const router = useRouter()

  return <div className='ml-auto flex gap-x-2'></div>
}
