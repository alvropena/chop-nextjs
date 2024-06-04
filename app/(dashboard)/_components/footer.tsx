import Link from 'next/link'
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <footer className="  py-6">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
                <p className="text-sm">&copy; 2024 Acme Inc. All rights reserved.</p>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <Link href="#" className="" prefetch={false}>
                        <TwitterIcon className="w-5 h-5" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="" prefetch={false}>
                        <FacebookIcon className="w-5 h-5" />
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="" prefetch={false}>
                        <InstagramIcon className="w-5 h-5" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="#" className="" prefetch={false}>
                        <LinkedinIcon className="w-5 h-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
