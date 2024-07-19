import React from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UpgradePlanCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upgrade Plan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="font-medium">Enterprise Plan</div>
                    <div className="font-bold text-2xl">$99/mo</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Billed monthly</div>
                <div className="flex items-center justify-between">
                    <div>Users</div>
                    <div>Unlimited</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Storage</div>
                    <div>1 TB</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Bandwidth</div>
                    <div>Unlimited</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Priority Support</div>
                    <div>✓</div>
                </div>
                <Button>Upgrade to Enterprise</Button>
            </CardContent>
        </Card>
    )
}