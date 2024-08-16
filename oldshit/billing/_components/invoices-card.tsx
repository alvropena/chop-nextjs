import React from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableRow, TableHead, TableCell, TableHeader, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DownloadIcon } from 'lucide-react';

export default function InvoicesCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>June 23, 2023</TableCell>
                            <TableCell>$49.00</TableCell>
                            <TableCell>
                                <Badge>Paid</Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="icon">
                                    <DownloadIcon className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}