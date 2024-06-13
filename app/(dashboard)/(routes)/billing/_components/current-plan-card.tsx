import React from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CurrentPlanCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="font-medium">Pro Plan</div>
                    <div className="font-bold text-2xl">$49/mo</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Billed monthly</div>
                <div className="flex items-center justify-between">
                    <div>Next Billing Date</div>
                    <div>June 23, 2023</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Users</div>
                    <div>5</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Storage</div>
                    <div>500 GB</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Bandwidth</div>
                    <div>Unlimited</div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        Downgrade
                    </Button>
                    <Button variant="outline" size="sm">
                        Cancel
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}