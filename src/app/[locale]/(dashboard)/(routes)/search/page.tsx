import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {UserAvatar} from '@/components/user-avatar'

export default function SearchPage() {
    return (
        <div className="flex flex-col gap-4">            
            <Input type="text" placeholder="Search" />
            <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold">Recent</h2>
            <Button variant="link">
                Clear All
            </Button>
            </div>
            <UserAvatar />
        </div>
    )
}
