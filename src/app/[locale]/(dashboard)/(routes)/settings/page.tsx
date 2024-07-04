import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function SettingsPage() {
  return (
    <div className='p-6'>
      <h1 className='mb-6 text-2xl font-bold'>Settings</h1>

      <Link href={'/api/auth/logout'}>
        <Button variant='outline'>Button</Button>
      </Link>
    </div>
  )
}
