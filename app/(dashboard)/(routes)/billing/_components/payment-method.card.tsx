import React from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { CreditCardIcon } from 'lucide-react'

export default function PaymentMethodCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CreditCardIcon className="h-6 w-6" />
                        <div>Visa ending in 1234</div>
                    </div>
                    <Button variant="outline" size="sm">
                        Update
                    </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>Next Charge</div>
                    <div>June 23, 2023</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Total Spent</div>
                    <div>$588.00</div>
                </div>
            </CardContent>
        </Card>
    )
}