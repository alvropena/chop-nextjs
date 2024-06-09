import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BellIcon, CreditCardIcon, DownloadIcon, HomeIcon, LineChartIcon, Package2Icon, PackageIcon, SearchIcon, ShoppingCartIcon, UsersIcon } from "lucide-react"
import Image from "next/image"

export default function BillingPage() {
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <Package2Icon className="h-6 w-6" />
                            <span className="">Acme Inc</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <BellIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <HomeIcon className="h-4 w-4" />
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <ShoppingCartIcon className="h-4 w-4" />
                                Billing
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <PackageIcon className="h-4 w-4" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <UsersIcon className="h-4 w-4" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <LineChartIcon className="h-4 w-4" />
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link href="#" className="lg:hidden" prefetch={false}>
                        <Package2Icon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                            >
                                <Image src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center gap-4">
                        <h1 className="font-semibold text-lg md:text-xl">Billing</h1>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                                <Badge variant="success">Paid</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="icon">
                                                    <DownloadIcon className="h-4 w-4" />
                                                    <span className="sr-only">Download</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>May 23, 2023</TableCell>
                                            <TableCell>$49.00</TableCell>
                                            <TableCell>
                                                <Badge variant="success">Paid</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="icon">
                                                    <DownloadIcon className="h-4 w-4" />
                                                    <span className="sr-only">Download</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>April 23, 2023</TableCell>
                                            <TableCell>$49.00</TableCell>
                                            <TableCell>
                                                <Badge variant="success">Paid</Badge>
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead />
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>June 23, 2023</TableCell>
                                            <TableCell>$49.00</TableCell>
                                            <TableCell>Visa ending in 1234</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="icon">
                                                    <DownloadIcon className="h-4 w-4" />
                                                    <span className="sr-only">Download</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>May 23, 2023</TableCell>
                                            <TableCell>$49.00</TableCell>
                                            <TableCell>Visa ending in 1234</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="icon">
                                                    <DownloadIcon className="h-4 w-4" />
                                                    <span className="sr-only">Download</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>April 23, 2023</TableCell>
                                            <TableCell>$49.00</TableCell>
                                            <TableCell>Visa ending in 1234</TableCell>
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
                    </div>
                </main>
            </div>
        </div>
    )
}